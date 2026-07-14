import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { getBookingConfirmationEmail } from "./src/emails/bookingConfirmation";
import { getAdminNotificationEmail } from "./src/emails/adminNotification";

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

      // Check for SMTP Credentials before proceeding (Lazy load + safe fail)
      const gmailUser = process.env.GMAIL_USER;
      const gmailPass = process.env.GMAIL_APP_PASSWORD ? process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, "") : undefined;
      const notificationEmail = process.env.NOTIFICATION_EMAIL || "enquiry.krgone@gmail.com";

      if (!gmailUser || !gmailPass) {
        console.warn("[SMTP CONFIG ERROR]: GMAIL_USER or GMAIL_APP_PASSWORD is not set in environment variables.");
        // We will output a descriptive client message for local previewing/debugging so they know they need to set up keys
        return res.status(503).json({
          success: false,
          error: "SMTP service is currently unconfigured. To send emails, please populate GMAIL_USER and GMAIL_APP_PASSWORD environment variables in your workspace settings."
        });
      }

      // 2. Lazy Initialization of SMTP Transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailPass
        }
      });

      // Verify connection config
      await transporter.verify();

      // Collect some request environment details for notification telemetry
      const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "Unknown IP";
      const userAgent = req.headers["user-agent"] || "Unknown User Agent";
      const submissionTime = new Date().toLocaleString("en-US", { timeZone: "UTC" }) + " UTC";
      const submissionDate = new Date().toLocaleDateString("en-US");

      // 3. Construct HTML for Customer Email using the newly styled blueprint
      const customerEmailHtml = getBookingConfirmationEmail({
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

      // 4. Construct HTML for KRGONE Notification Email (To Admin) using our brand layout
      const adminEmailHtml = getAdminNotificationEmail({
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

      // 5. Fire Emails
      // Send Customer Confirmation
      await transporter.sendMail({
        from: `"KRGONE Platform" <${gmailUser}>`,
        to: businessEmail,
        subject: "Thank You for Booking Your Business Growth Diagnostic",
        html: customerEmailHtml
      });

      // Send Admin Notification
      await transporter.sendMail({
        from: `"KRGONE System Notification" <${gmailUser}>`,
        to: notificationEmail,
        subject: `New Business Growth Diagnostic Booking - ${companyName}`,
        html: adminEmailHtml
      });

      return res.status(200).json({
        success: true,
        message: "Diagnostic booking emails sent successfully."
      });

    } catch (error: any) {
      console.error("[SMTP RUNTIME FAILURE]:", error);
      return res.status(500).json({
        success: false,
        error: "SMTP runtime transmission failed. " + (error?.message || "Please check server application logs.")
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
