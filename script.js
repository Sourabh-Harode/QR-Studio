// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    const categories = document.querySelectorAll(".category");
    const urlForm = document.getElementById("url-form");
    const vcardForm = document.getElementById("vcard-form");
    const emailForm = document.getElementById("email-form");
    const smsForm = document.getElementById("sms-form");
    const wifiForm = document.getElementById("wifi-form");
    const socialForm = document.getElementById("social-form");
    const locationForm = document.getElementById("location-form");
    const appstoreForm = document.getElementById("appstore-form");
    const eventForm = document.getElementById("event-form");
    const paymentForm = document.getElementById("payment-form");
    const mecForm = document.getElementById("mecard-form");
    const qrContainer = document.getElementById("qr-code");
  
    // Handle category switching
    categories.forEach(button => {
      button.addEventListener("click", () => {
        categories.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
  
        const selected = button.textContent.trim();
  
        // Hide all forms
        urlForm.style.display = "none";
        vcardForm.style.display = "none";
        emailForm.style.display = "none";
        smsForm.style.display = "none";
        wifiForm.style.display = "none";
        socialForm.style.display = "none";
        locationForm.style.display = "none";
        appstoreForm.style.display = "none";
        eventForm.style.display = "none";
        paymentForm.style.display = "none";
        mecForm.style.display = "none";
        qrContainer.innerHTML = "";
  
        // Show the selected form
        if (selected === "VCARD") {
          vcardForm.style.display = "block";
        } else if (selected === "E-MAIL") {
          emailForm.style.display = "block";
        } else if (selected === "SMS") {
          smsForm.style.display = "block";
        } else if (selected === "WIFI") {
          wifiForm.style.display = "block";
        } else if (selected === "SOCIAL HANDLE") { 
          socialForm.style.display = "block";
        } else if (selected === "URL" || selected === "TEXT") {
          urlForm.style.display = "block";
        } else if (selected === "LOCATION") {
          locationForm.style.display = "block";
        } else if (selected === "APP STORE") {
          appstoreForm.style.display = "block";
        } else if (selected === "EVENT") {
          eventForm.style.display = "block";
        } else if (selected === "PAYMENT") {
          paymentForm.style.display = "block";
        } else if (selected === "ME-CARD") {
          mecForm.style.display = "block";
        } 
      });
    });
  

    // URL QR Code
    const urlInput = document.getElementById("qr-input");
    const generateBtn = document.getElementById("generate-btn");
  
    function generateURLQRCode() {
      qrContainer.innerHTML = "";
      const text = urlInput.value.trim();
      if (!text) return;
  
      new QRCode(qrContainer, {
        text: text,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    }
  
    generateBtn.addEventListener("click", generateURLQRCode);
    urlInput.addEventListener("input", generateURLQRCode);
  
    



    // vCard QR Code
    const vcardBtn = document.getElementById("generate-vcard-btn");
  
    vcardBtn.addEventListener("click", () => {
      qrContainer.innerHTML = "";
  
      const vCard = `
  BEGIN:VCARD
  VERSION:3.0
  N:${get("last-name")};${get("first-name")}
  FN:${get("first-name")} ${get("last-name")}
  TEL;TYPE=cell:${get("mobile")}
  TEL;TYPE=work:${get("phone")}
  TEL;TYPE=fax:${get("fax")}
  EMAIL:${get("email")}
  ORG:${get("company")}
  TITLE:${get("job")}
  ADR:;;${get("street")};${get("city")};${get("state")};${get("zip")};${get("country")}
  URL:${get("website")}
  END:VCARD
      `.trim();
  
      new QRCode(qrContainer, {
        text: vCard,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    });
  


   
    // Email QR Code
    const emailGenerateBtn = document.getElementById("generate-email-btn");
  
    emailGenerateBtn.addEventListener("click", () => {
      qrContainer.innerHTML = "";
  
      const to = document.getElementById("email-to").value.trim();
      const subject = document.getElementById("email-subject").value.trim();
      const body = document.getElementById("email-body").value.trim();
  
      if (!to) return;
  
      const mailtoLink = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
      new QRCode(qrContainer, {
        text: mailtoLink,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    });






    // Helper function to get element values
function get(id) {
    return document.getElementById(id)?.value?.trim() || "";
  }



  
  // Generate SMS QR Code
  const smsBtn = document.getElementById("generate-sms-btn");
  smsBtn?.addEventListener("click", () => {
    qrContainer.innerHTML = "";
    const number = get("sms-number");
    const message = get("sms-message");
    if (!number) return;
    const smsText = `SMSTO:${number}:${message}`;
    new QRCode(qrContainer, {
      text: smsText,
      width: 200,
      height: 200,
      colorDark: "#000",
      colorLight: "#fff",
      correctLevel: QRCode.CorrectLevel.H,
    });
  });
  




  // Generate WiFi QR Code
  const wifiBtn = document.getElementById("generate-wifi-btn");
  wifiBtn?.addEventListener("click", () => {
    qrContainer.innerHTML = "";
    const ssid = get("wifi-ssid");
    const pass = get("wifi-password");
    const enc = get("wifi-encryption");
    if (!ssid) return;
    const wifiText = `WIFI:T:${enc};S:${ssid};P:${pass};;`;
    new QRCode(qrContainer, {
      text: wifiText,
      width: 200,
      height: 200,
      colorDark: "#000",
      colorLight: "#fff",
      correctLevel: QRCode.CorrectLevel.H,
    });
  });
  





  // Generate Social Handle QR Code
  const socialBtn = document.getElementById("generate-social-btn");
  socialBtn?.addEventListener("click", () => {
    qrContainer.innerHTML = "";
    const platform = document.getElementById("social-platform").value;
    const username = get("social-username");
    if (!username) return;
    const socialURL = `${platform}${username}`;
    new QRCode(qrContainer, {
      text: socialURL,
      width: 200,
      height: 200,
      colorDark: "#000",
      colorLight: "#fff",
      correctLevel: QRCode.CorrectLevel.H,
    });
  });





  




  // MECARD QR Code
  document.getElementById("generate-mecard-btn")?.addEventListener("click", () => {
    qrContainer.innerHTML = "";
  
    const mecard = `
  MECARD:N:${get("mecard-name")};
  TEL:${get("mecard-phone")};
  EMAIL:${get("mecard-email")};
  URL:${get("mecard-url")};
  ADR:${get("mecard-address")};
  ;`.trim();
  
    new QRCode(qrContainer, {
      text: mecard,
      width: 200,
      height: 200,
      colorDark: "#000",
      colorLight: "#fff",
      correctLevel: QRCode.CorrectLevel.H,
    });
  });
  




  // Location QR Code
  document.getElementById("generate-location-btn")?.addEventListener("click", () => {
    qrContainer.innerHTML = "";
    const lat = get("location-lat");
    const lng = get("location-lng");
    const geo = `geo:${lat},${lng}`;
  
    new QRCode(qrContainer, {
      text: geo,
      width: 200,
      height: 200,
      colorDark: "#000",
      colorLight: "#fff",
      correctLevel: QRCode.CorrectLevel.H,
    });
  });
  




  // App Store QR Code (just a URL to app link)
  document.getElementById("generate-appstore-btn")?.addEventListener("click", () => {
    qrContainer.innerHTML = "";
    const url = get("appstore-url");
  
    new QRCode(qrContainer, {
      text: url,
      width: 200,
      height: 200,
      colorDark: "#000",
      colorLight: "#fff",
      correctLevel: QRCode.CorrectLevel.H,
    });
  });
  



  // Event QR Code (VEVENT format)
  document.getElementById("generate-event-btn")?.addEventListener("click", () => {
    qrContainer.innerHTML = "";
  
    const start = new Date(get("event-start")).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const end = new Date(get("event-end")).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  
    const ical = `
  BEGIN:VEVENT
  SUMMARY:${get("event-title")}
  DTSTART:${start}
  DTEND:${end}
  LOCATION:${get("event-location")}
  DESCRIPTION:${get("event-description")}
  END:VEVENT
  `.trim();
  
    new QRCode(qrContainer, {
      text: ical,
      width: 200,
      height: 200,
      colorDark: "#000",
      colorLight: "#fff",
      correctLevel: QRCode.CorrectLevel.H,
    });
  });



  
  
  // Payment QR Code (UPI format as example)
  document.getElementById("generate-payment-btn")?.addEventListener("click", () => {
    qrContainer.innerHTML = "";
  
    const upi = `upi://pay?pa=${get("payment-upi")}&pn=${get("payment-name")}&am=${get("payment-amount")}&cu=INR`;
  
    new QRCode(qrContainer, {
      text: upi,
      width: 200,
      height: 200,
      colorDark: "#000",
      colorLight: "#fff",
      correctLevel: QRCode.CorrectLevel.H,
    });
  });
  
  











  
    // Helper
    function get(id) {
      return document.getElementById(id)?.value?.trim() || "";
    }
  });
  