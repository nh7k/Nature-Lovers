// ===== EMAIL HANDLING WITH EMAILJS =====

// ===== EMAILJS CONFIGURATION =====
const EMAIL_CONFIG = {
  serviceId: "service_ou1vn29", // ✅ Gmail service ID
  templateIds: {
    registration: "template_ldll353", // ✅ Registration form template ID
    contact: "template_k3qv2no", // ✅ Contact Us template ID
  },
  publicKey: "6wTYPQmayMyXl2Imt", // ✅ Your public key (with quotes)
  recipientEmail: "heerasaw14@gmail.com", // ✅ Where the email will go
};

// ===== INITIALIZE EMAILJS =====
function initEmailJS() {
  try {
    // Initialize EmailJS with public key from environment or default
    const publicKey = window.EMAILJS_PUBLIC_KEY || EMAIL_CONFIG.publicKey;
    emailjs.init(publicKey);
    console.log("EmailJS initialized successfully");
    return true;
  } catch (error) {
    console.error("Failed to initialize EmailJS:", error);
    return false;
  }
}

// ===== SEND REGISTRATION EMAIL =====
async function sendRegistrationEmail(form) {
  if (!form) {
    throw new Error("Form element is required");
  }

  try {
    const formData = new FormData(form);

    // Prepare template parameters
    const templateParams = {
      to_email: EMAIL_CONFIG.recipientEmail,
      from_name: formData.get("fullName"),
      from_email: formData.get("email"),
      phone: formData.get("phone"),
      services: formData.getAll("services").join(", "),
      plant_types: formData.getAll("plantTypes").join(", "),
      address: formData.get("address") || "Not provided",
      message: formData.get("message") || "No additional details provided",
      contact_time: formData.get("contactTime") || "No preference",
      newsletter: formData.get("newsletter") ? "Yes" : "No",
      submission_date: new Date().toLocaleString(),
      subject: "New Registration - Nature Lovers",
    };

    // Send email via EmailJS
    const serviceId = window.EMAILJS_SERVICE_ID || EMAIL_CONFIG.serviceId;
    const templateId =
      window.EMAILJS_REGISTRATION_TEMPLATE_ID ||
      EMAIL_CONFIG.templateIds.registration;

    const response = await emailjs.send(serviceId, templateId, templateParams);

    if (response.status === 200) {
      console.log("Registration email sent successfully");
      return response;
    } else {
      throw new Error(`EmailJS response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error sending registration email:", error);
    throw error;
  }
}

// ===== SEND CONTACT EMAIL =====
async function sendContactEmail(form) {
  if (!form) {
    throw new Error("Form element is required");
  }

  try {
    const formData = new FormData(form);

    // Prepare template parameters
    const templateParams = {
      to_email: EMAIL_CONFIG.recipientEmail,
      from_name: `${formData.get("firstName")} ${formData.get("lastName")}`,
      from_email: formData.get("email"),
      phone: formData.get("phone") || "Not provided",
      subject: formData.get("subject"),
      message: formData.get("message"),
      preferred_contact: formData.get("preferredContact") || "Email",
      submission_date: new Date().toLocaleString(),
      email_subject: `Nature Lovers Contact: ${formData.get("subject")}`,
    };

    // Send email via EmailJS
    const serviceId = window.EMAILJS_SERVICE_ID || EMAIL_CONFIG.serviceId;
    const templateId =
      window.EMAILJS_CONTACT_TEMPLATE_ID || EMAIL_CONFIG.templateIds.contact;

    const response = await emailjs.send(serviceId, templateId, templateParams);

    if (response.status === 200) {
      console.log("Contact email sent successfully");
      return response;
    } else {
      throw new Error(`EmailJS response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error sending contact email:", error);
    throw error;
  }
}

// ===== FALLBACK EMAIL METHODS =====
function createRegistrationEmailBody(formData) {
  let body = `New Registration from Nature Lovers Website\n\n`;
  body += `=== CUSTOMER INFORMATION ===\n`;
  body += `Name: ${formData.get("fullName")}\n`;
  body += `Email: ${formData.get("email")}\n`;
  body += `Phone: ${formData.get("phone")}\n\n`;

  const services = formData.getAll("services");
  if (services.length > 0) {
    body += `=== SELECTED SERVICES ===\n`;
    services.forEach((service) => (body += `• ${service}\n`));
    body += `\n`;
  }

  const plantTypes = formData.getAll("plantTypes");
  if (plantTypes.length > 0) {
    body += `=== PLANT PREFERENCES ===\n`;
    plantTypes.forEach((plant) => (body += `• ${plant}\n`));
    body += `\n`;
  }

  if (formData.get("address")) {
    body += `=== ADDRESS ===\n${formData.get("address")}\n\n`;
  }

  if (formData.get("message")) {
    body += `=== ADDITIONAL DETAILS ===\n${formData.get("message")}\n\n`;
  }

  body += `=== PREFERENCES ===\n`;
  body += `Contact Time: ${formData.get("contactTime")}\n`;
  body += `Newsletter: ${formData.get("newsletter") ? "Yes" : "No"}\n\n`;

  body += `=== SUBMISSION INFO ===\n`;
  body += `Date: ${new Date().toLocaleString()}\n`;
  body += `Source: Nature Lovers Website\n`;

  return body;
}

function createContactEmailBody(formData) {
  let body = `New Contact Form Submission from Nature Lovers Website\n\n`;
  body += `=== CONTACT INFORMATION ===\n`;
  body += `Name: ${formData.get("firstName")} ${formData.get("lastName")}\n`;
  body += `Email: ${formData.get("email")}\n`;
  if (formData.get("phone")) {
    body += `Phone: ${formData.get("phone")}\n`;
  }
  body += `\n=== INQUIRY DETAILS ===\n`;
  body += `Subject: ${formData.get("subject")}\n`;
  body += `Preferred Contact: ${formData.get("preferredContact")}\n\n`;
  body += `=== MESSAGE ===\n${formData.get("message")}\n\n`;
  body += `=== SUBMISSION INFO ===\n`;
  body += `Date: ${new Date().toLocaleString()}\n`;
  body += `Source: Nature Lovers Website Contact Form\n`;

  return body;
}

// ===== MAILTO FALLBACK =====
function sendRegistrationEmailFallback(formData) {
  const subject = encodeURIComponent("Nature Lovers Registration");
  const body = encodeURIComponent(createRegistrationEmailBody(formData));
  const mailtoLink = `mailto:${EMAIL_CONFIG.recipientEmail}?subject=${subject}&body=${body}`;

  window.open(mailtoLink, "_blank");
  return Promise.resolve();
}

function sendContactEmailFallback(formData) {
  const subject = encodeURIComponent(
    `Nature Lovers Contact: ${formData.get("subject")}`
  );
  const body = encodeURIComponent(createContactEmailBody(formData));
  const mailtoLink = `mailto:${EMAIL_CONFIG.recipientEmail}?subject=${subject}&body=${body}`;

  window.open(mailtoLink, "_blank");
  return Promise.resolve();
}

// ===== MAIN EMAIL FUNCTIONS WITH FALLBACK =====
async function sendRegistrationEmailWithFallback(form) {
  const formData = new FormData(form);

  // Try EmailJS first
  if (typeof emailjs !== "undefined") {
    try {
      return await sendRegistrationEmail(form);
    } catch (error) {
      console.warn("EmailJS failed, falling back to mailto:", error);
    }
  }

  // Fallback to mailto
  return sendRegistrationEmailFallback(formData);
}

async function sendContactEmailWithFallback(form) {
  const formData = new FormData(form);

  // Try EmailJS first
  if (typeof emailjs !== "undefined") {
    try {
      return await sendContactEmail(form);
    } catch (error) {
      console.warn("EmailJS failed, falling back to mailto:", error);
    }
  }

  // Fallback to mailto
  return sendContactEmailFallback(formData);
}

// ===== EMAIL SERVICE STATUS CHECK =====
function checkEmailServiceStatus() {
  return {
    emailjs: typeof emailjs !== "undefined",
    publicKey: !!(
      window.EMAILJS_PUBLIC_KEY ||
      EMAIL_CONFIG.publicKey !== "YOUR_EMAILJS_PUBLIC_KEY"
    ),
    serviceId: !!(window.EMAILJS_SERVICE_ID || EMAIL_CONFIG.serviceId),
    templates: {
      registration: !!(
        window.EMAILJS_REGISTRATION_TEMPLATE_ID ||
        EMAIL_CONFIG.templateIds.registration
      ),
      contact: !!(
        window.EMAILJS_CONTACT_TEMPLATE_ID || EMAIL_CONFIG.templateIds.contact
      ),
    },
  };
}

// ===== INITIALIZE EMAIL SERVICE =====
function initEmailService() {
  const status = checkEmailServiceStatus();

  if (status.emailjs) {
    const initialized = initEmailJS();
    if (initialized) {
      console.log("Email service ready with EmailJS");
    } else {
      console.warn("EmailJS initialization failed, will use mailto fallback");
    }
  } else {
    console.log("EmailJS not available, will use mailto fallback");
  }

  // Make email functions globally available
  window.sendRegistrationEmail = sendRegistrationEmailWithFallback;
  window.sendContactEmail = sendContactEmailWithFallback;

  return status;
}

// ===== AUTO-INITIALIZE ON DOM CONTENT LOADED =====
document.addEventListener("DOMContentLoaded", function () {
  try {
    // Small delay to ensure EmailJS script is loaded
    setTimeout(() => {
      initEmailService();
    }, 100);
  } catch (error) {
    console.error("Error initializing email service:", error);

    // Ensure fallback functions are still available
    window.sendRegistrationEmail = sendRegistrationEmailWithFallback;
    window.sendContactEmail = sendContactEmailWithFallback;
  }
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initEmailService,
    sendRegistrationEmail,
    sendContactEmail,
    checkEmailServiceStatus,
    createRegistrationEmailBody,
    createContactEmailBody,
  };
}
