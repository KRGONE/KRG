import { sendDiagnosticBookingConfirmation, sendAdminNotification, saveToCRMQueue } from "../src/services/emailService";

export default async function handler(req: any, res: any) {
  // Only allow POST
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

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
    } = req.body || {};

    if (!fullName || !companyName || !businessEmail || !mobileNumber || !industry || !employees || !biggestChallenge) {
      return res.status(400).json({
        success: false,
        error: "All required parameters (Name, Company, Email, Mobile, Industry, Employees, Challenge) must be populated."
      });
    }

    const submissionTime = new Date().toLocaleString("en-US", { timeZone: "UTC" }) + " UTC";
    const submissionDate = new Date().toLocaleDateString("en-US");

    // 1. Send customer confirmation
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

    // 2. Send admin notification
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

    // 3. Save copy for future CRM sync
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
    console.error("[Vercel Serverless SMTP Failure]:", error);
    let errorMessage = error?.message || "Internal Server Error during email transmission.";
    if (errorMessage.includes("GMAIL_USER") || errorMessage.includes("GMAIL_APP_PASSWORD")) {
      errorMessage = "SMTP service is unconfigured. Please configure 'GMAIL_USER' and 'GMAIL_APP_PASSWORD' as Environment Variables in your Vercel Project Settings Dashboard to enable live emails.";
    }
    return res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
}
