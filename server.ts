import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// API Endpoint for sending contact message
app.post("/api/send-message", async (req, res) => {
  const { parentName, studentName, email, programInterest, message } = req.body;

  if (!email || !parentName || !studentName) {
    return res.status(400).json({ error: "Parent name, student name, and email are required." });
  }

  const cleanEmail = email.trim().toLowerCase();
  let emailSentStatus = false;
  let dispatchProvider = "FormSubmit";

  // Method 1: Resend API if key is set
  if (process.env.RESEND_API_KEY) {
    try {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "AI Explorers <onboarding@resend.dev>",
          to: ["aiexplorers916@gmail.com"],
          reply_to: cleanEmail,
          subject: `New AI Explorers Inquiry from ${parentName} (${studentName})`,
          html: `
            <h2>New Inquiry Received from AI Explorers Website</h2>
            <p><strong>Parent Name:</strong> ${parentName}</p>
            <p><strong>Student Name & Grade:</strong> ${studentName}</p>
            <p><strong>Parent Email:</strong> <a href="mailto:${cleanEmail}">${cleanEmail}</a></p>
            <p><strong>Program Interest:</strong> ${programInterest}</p>
            <p><strong>Message:</strong> ${message || 'No custom message provided.'}</p>
          `
        })
      });

      if (resendRes.ok) {
        emailSentStatus = true;
        dispatchProvider = "Resend API";
        console.log(`[EMAIL DISPATCH SUCCESS] Delivered via Resend API to aiexplorers916@gmail.com`);
      }
    } catch (resendErr) {
      console.warn("[RESEND DISPATCH NOTICE]", resendErr);
    }
  }

  // Method 2: Fallback via FormSubmit
  if (!emailSentStatus) {
    try {
      const emailPayload = {
        _subject: `New AI Explorers Inquiry from ${parentName} (${studentName})`,
        _replyto: cleanEmail,
        _template: "table",
        _captcha: "false",
        parent_name: parentName,
        student_name: studentName,
        parent_email: cleanEmail,
        program_interest: programInterest,
        message: message || "No custom message provided.",
        sent_at: new Date().toLocaleString()
      };

      const dispatchResponse = await fetch("https://formsubmit.co/ajax/aiexplorers916@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(emailPayload)
      });

      if (dispatchResponse.ok) {
        emailSentStatus = true;
        dispatchProvider = "FormSubmit";
        console.log(`[EMAIL DISPATCH SUCCESS] Message routed to aiexplorers916@gmail.com via FormSubmit`);
      } else {
        const errText = await dispatchResponse.text();
        console.warn(`[EMAIL DISPATCH NOTICE] FormSubmit status ${dispatchResponse.status}: ${errText}`);
      }
    } catch (err) {
      console.error("[EMAIL DISPATCH ERROR]", err);
    }
  }

  console.log(`==========================================`);
  console.log(`📧 NEW INQUIRY RECEIVED`);
  console.log(`Sender Email: ${cleanEmail}`);
  console.log(`Forwarded Destination: aiexplorers916@gmail.com`);
  console.log(`Parent Name: ${parentName}`);
  console.log(`Student Details: ${studentName}`);
  console.log(`Program Interest: ${programInterest}`);
  console.log(`Message: ${message}`);
  console.log(`Phone Alert: 916-616-9839`);
  console.log(`Dispatch Provider: ${dispatchProvider}`);
  console.log(`==========================================`);

  return res.json({
    success: true,
    emailDispatched: emailSentStatus,
    dispatchProvider,
    targetRecipient: "aiexplorers916@gmail.com",
    timestamp: new Date().toISOString()
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AI Explorers Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
