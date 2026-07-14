import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { sendDiagnosticBookingConfirmation, sendAdminNotification, saveToCRMQueue } from "./src/services/emailService";

// Load environment variables
dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();
  
  // Parse incoming JSON request payloads
  app.use(express.json());

  // ---------------------------------------------------------------------------
  // API ENDPOINTS
  // ---------------------------------------------------------------------------

  // 1. Health Probe
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // 2. Business Growth Diagnostic Booking Processor
  app.post("/api/book-diagnostic", async (req, res) => {
    try {
      const {
        fullName,
        designation = "Executive",
        companyName,
        companyWebsite = "None Provided",
        businessEmail,
        mobileNumber,
        state = "Not Disclosed",
        city = "Not Disclosed",
        country = "India",
        industry,
        employees,
        revenue = "Not Disclosed",
        stage = "Not Disclosed",
        preferredContact = "Email",
        preferredDate = "To be scheduled",
        preferredTime = "To be scheduled",
        timezone = "IST",
        biggestChallenge,
        additionalInfo = "None Provided"
      } = req.body;

      // 1. Validate inputs server-side
      if (!fullName || !companyName || !businessEmail || !mobileNumber || !industry || !employees || !biggestChallenge) {
        return res.status(400).json({
          success: false,
          error: "All required parameters (Name, Company, Email, Mobile, Industry, Employees, Challenge) must be populated."
        });
      }

      const submissionTime = new Date().toLocaleString("en-US", { timeZone: "UTC" }) + " UTC";
      const submissionDate = new Date().toLocaleDateString("en-US");

      // 2. Fire Customer Confirmation Email
      await sendDiagnosticBookingConfirmation({
        customerName: fullName,
        companyName,
        businessEmail,
        mobileNumber,
        industry,
        employees,
        businessStage: stage,
        biggestChallenge,
        submissionDate,
        submissionTime,
      });

      // 3. Fire Admin Notification Email
      await sendAdminNotification({
        fullName,
        designation,
        companyName,
        businessEmail,
        mobileNumber,
        state,
        city,
        industry,
        companyWebsite,
        employees,
        annualRevenue: revenue,
        businessStage: stage,
        preferredContactMethod: preferredContact,
        biggestChallenge,
        additionalInfo,
        submissionDate,
        submissionTime,
      });

      // 4. Archive for future CRM / Marketing CDP synchronization
      await saveToCRMQueue({
        fullName,
        designation,
        companyName,
        businessEmail,
        mobileNumber,
        state,
        city,
        industry,
        companyWebsite,
        employees,
        annualRevenue: revenue,
        businessStage: stage,
        preferredContactMethod: preferredContact,
        biggestChallenge,
        additionalInfo,
        submissionDate,
        submissionTime,
      });

      return res.status(200).json({
        success: true,
        message: "Diagnostic booking emails sent successfully."
      });

    } catch (error: any) {
      console.error("[SMTP RUNTIME FAILURE]:", error);
      return res.status(500).json({
        success: false,
        error: error?.message || "Internal server error during email transmission."
      });
    }
  });

  // ---------------------------------------------------------------------------
  // VITE & STATIC ASSET ROUTING
  // ---------------------------------------------------------------------------

  if (process.env.NODE_ENV !== "production") {
    // Mount Vite dev server in middleware mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("[DevServer] Vite development middleware mounted.");
  } else {
    // Serve production static assets compiled under dist/
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("[ProdServer] Static production paths active.");
  }

  // Bind to Port and Interface
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`KRGONE Server active on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("FATAL: Failed to bootstrap Express custom stack.", err);
  process.exit(1);
});
