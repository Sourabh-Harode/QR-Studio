    document.addEventListener("DOMContentLoaded", () => {
    const categories = document.querySelectorAll(".category");
    const formMap = {
      "URL": "url-form",
      "TEXT": "url-form",
      "VCARD": "vcard-form",
      "E-MAIL": "email-form",
      "SMS": "sms-form",
      "WIFI": "wifi-form",
      "SOCIAL HANDLE": "social-form",
      "LOCATION": "location-form",
      "APP STORE": "appstore-form",
      "EVENT": "event-form",
      "PAYMENT": "payment-form",
      "ME-CARD": "mecard-form",
      "PRODUCT": "product-form",
      "WHATSAPP": "whatsapp-form",
      "TELEGRAM": "telegram-form",
      "EVENT RVSP": "rsvp-form",
      "CONTACT GROUP": "contact-group-form",
      "GOOGLE REVIEW": "google-review-form",
      "BOOKING LINK": "booking-form",
      "STORE INFO": "store-info-form",
    };
    const qrContainer = document.getElementById("qr-code");
    const downloadBtn = document.getElementById("download-btn");
    const colorTypeSelect = document.getElementById("color-type");
    const color1Input = document.getElementById("color-1");
    const color2Input = document.getElementById("color-2");
    
  
  
    // category switching
    categories.forEach(button => {
      button.addEventListener("click", () => {
        categories.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
  
        const selected = button.textContent.trim();
  
        // Hide all forms
        Object.values(formMap).forEach(id => {
          const form = document.getElementById(id);
          if (form) form.style.display = "none";
        });
        qrContainer.innerHTML = "";
        downloadBtn.style.display = "none";
  
        // Show the selected form
        const selectedFormId = formMap[selected];
        if (selectedFormId) {
          const form = document.getElementById(selectedFormId);
          if (form) form.style.display = "block";
        }
      });
    });
  
    const get = id => document.getElementById(id)?.value?.trim() || "";




  

 


    // QR code generation 
    const createQRCode = text => {
      if (!text) return;
      qrContainer.innerHTML = "";
  
      const colorType = colorTypeSelect?.value || "solid";
      const color1 = color1Input?.value || "#000000";
      const color2 = color2Input?.value || "#000000";
      
  
      if (colorType === "gradient") {
        const qr = qrcode(0, 'H');
        qr.addData(text);
        qr.make();
  
        const size = 10;
        const count = qr.getModuleCount();
        const canvasSize = size * count;
  
        const canvas = document.createElement("canvas");
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        const ctx = canvas.getContext("2d");
  
        const gradient = ctx.createLinearGradient(0, 0, canvasSize, canvasSize);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvasSize, canvasSize);
        ctx.fillStyle = gradient;
  
        for (let row = 0; row < count; row++) {
          for (let col = 0; col < count; col++) {
            if (qr.isDark(row, col)) {
              ctx.fillRect(col * size, row * size, size, size);
            }
          }
        }
  
        qrContainer.appendChild(canvas);
      } else {
        new QRCode(qrContainer, {
          text,
          width: 200,
          height: 200,
          colorDark: color1,
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H
        });
      }
      
  
      setTimeout(() => downloadBtn.style.display = "inline-block", 100);
    };
  
    // Download QR code as image
    downloadBtn?.addEventListener("click", () => {
      const img = qrContainer.querySelector("canvas") || qrContainer.querySelector("img");
      if (!img) return;
      const link = document.createElement("a");
      link.href = img.toDataURL ? img.toDataURL("image/png") : img.src;
      link.download = "qr-code.png";
      link.click();
    });
  
    // URL QR Code
    const urlInput = document.getElementById("qr-input");
    const generateBtn = document.getElementById("generate-btn");
    generateBtn?.addEventListener("click", () => createQRCode(get("qr-input")));
    urlInput?.addEventListener("input", () => createQRCode(get("qr-input")));
 
    
  
    // vCard QR Code
    document.getElementById("generate-vcard-btn")?.addEventListener("click", () => {
      const vCard = `BEGIN:VCARD\nVERSION:3.0\nN:${get("last-name")};${get("first-name")}\nFN:${get("first-name")} ${get("last-name")}\nTEL;TYPE=cell:${get("mobile")}\nTEL;TYPE=work:${get("phone")}\nTEL;TYPE=fax:${get("fax")}\nEMAIL:${get("email")}\nORG:${get("company")}\nTITLE:${get("job")}\nADR:;;${get("street")};${get("city")};${get("state")};${get("zip")};${get("country")}\nURL:${get("website")}\nEND:VCARD`;
      createQRCode(vCard);
    });
  
    // Email QR Code
    document.getElementById("generate-email-btn")?.addEventListener("click", () => {
      const to = get("email-to");
      if (!to) return;
      const subject = get("email-subject");
      const body = get("email-body");
      const mailtoLink = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      createQRCode(mailtoLink);
    });
  
    // SMS QR Code
    document.getElementById("generate-sms-btn")?.addEventListener("click", () => {
      const number = get("sms-number");
      if (!number) return;
      const message = get("sms-message");
      const smsText = `SMSTO:${number}:${message}`;
      createQRCode(smsText);
    });

    // Store Info QR Code
    document.getElementById("generate-store-info-btn")?.addEventListener("click", () => {
      const storeName = get("store-name");
      const storeAddress = get("store-address");
      const storePhone = get("store-phone");
      const storeWebsite = get("store-website");
      const storeInfoText = `Store Name: ${storeName}\nAddress: ${storeAddress}\nPhone: ${storePhone}\nWebsite: ${storeWebsite}`;
      createQRCode(storeInfoText);
    });
  
    // WiFi QR Code
    document.getElementById("generate-wifi-btn")?.addEventListener("click", () => {
      const ssid = get("wifi-ssid");
      if (!ssid) return;
      const pass = get("wifi-password");
      const enc = get("wifi-encryption");
      const wifiText = `WIFI:T:${enc};S:${ssid};P:${pass};;`;
      createQRCode(wifiText);
    });
  
    // Social QR Code
    document.getElementById("generate-social-btn")?.addEventListener("click", () => {
      const username = get("social-username");
      if (!username) return;
      const platform = get("social-platform");
      createQRCode(`${platform}${username}`);
    });
  
    // MECARD QR Code
    document.getElementById("generate-mecard-btn")?.addEventListener("click", () => {
      const mecard = `MECARD:N:${get("mecard-name")};TEL:${get("mecard-phone")};EMAIL:${get("mecard-email")};URL:${get("mecard-url")};ADR:${get("mecard-address")};;`;
      createQRCode(mecard);
    });
  
    // Location QR Code
    document.getElementById("generate-location-btn")?.addEventListener("click", () => {
      const lat = get("location-lat");
      const lng = get("location-lng");
      createQRCode(`geo:${lat},${lng}`);
    });

    // Google Review QR Code
    document.getElementById("generate-google-review-btn")?.addEventListener("click", () => {
      const placeId = get("google-review-place-id");
      const reviewText = get("google-review-text");
      createQRCode(`https://search.google.com/local/writereview?placeid=${placeId}&reviewtext=${encodeURIComponent(reviewText)}`);
    });

    // Booking QR Code
    document.getElementById("generate-booking-btn")?.addEventListener("click", () => {
      const bookingUrl = get("booking-url");
      const bookingText = get("booking-text");
      createQRCode(`https://www.booking.com/review/${bookingUrl}?text=${encodeURIComponent(bookingText)}`);
    });

    // RVSP QR Code
    document.getElementById("generate-rsvp-btn")?.addEventListener("click", () => {
      const rsvpUrl = get("rsvp-url");
      const rsvpText = get("rsvp-text");
      createQRCode(`https://www.eventbrite.com/e/${rsvpUrl}?text=${encodeURIComponent(rsvpText)}`);
    });

    // Contact Group QR Code
    document.getElementById("generate-contact-group-btn")?.addEventListener("click", () => {
      const groupName = get("contact-group-name");
      const groupMembers = get("contact-group-members").split(",").map(member => member.trim());
      const contactGroupText = `BEGIN:VCARD\nVERSION:3.0\nFN:${groupName}\n${groupMembers.map(member => `N:${member}`).join("\n")}\nEND:VCARD`;
      createQRCode(contactGroupText);
    });
  
    // App Store QR Code
    document.getElementById("generate-appstore-btn")?.addEventListener("click", () => {
      createQRCode(get("appstore-url"));
    });
  
    // Event QR Code
    document.getElementById("generate-event-btn")?.addEventListener("click", () => {
      const start = new Date(get("event-start")).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
      const end = new Date(get("event-end")).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
      const ical = `BEGIN:VEVENT\nSUMMARY:${get("event-title")}\nDTSTART:${start}\nDTEND:${end}\nLOCATION:${get("event-location")}\nDESCRIPTION:${get("event-description")}\nEND:VEVENT`;
      createQRCode(ical);
    });

    // Product QR Code
    document.getElementById("generate-product-btn")?.addEventListener("click", () => {
      const product = `Product Name: ${get("product-name")}\nPrice: ${get("product-price")}\nDescription: ${get("product-description")}`;
      createQRCode(product);
    });

    // WhatsApp QR Code
    document.getElementById("generate-whatsapp-btn")?.addEventListener("click", () => {
      const number = get("whatsapp-number");
      const message = get("whatsapp-message");
      const whatsappText = `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(message)}`;
      createQRCode(whatsappText);
    });
    // Telegram QR Code
    document.getElementById("generate-telegram-btn")?.addEventListener("click", () => {
      const username = get("telegram-username");
      const message = get("telegram-message");
      const telegramText = `https://t.me/${username}?text=${encodeURIComponent(message)}`;
      createQRCode(telegramText);
    });
  
    
   // Payment QR Code
   document.getElementById("generate-payment-btn")?.addEventListener("click", () => {
    const method = get("payment-method");
    let data = "";

    if (method === "upi") {
      data = `upi://pay?pa=${encodeURIComponent(get("upi-id"))}&pn=${encodeURIComponent(get("payment-name"))}&cu=INR`;
      const note = get("payment-message");
      if (note) data += `&tn=${encodeURIComponent(note)}`;
    } else if (method === "bank") {
      data = `Bank Account: ${get("account-number")}\nIFSC Code: ${get("ifsc")}\nAccount Holder: ${get("account-name")}`;
      const note = get("payment-message");
      if (note) data += `\nNote: ${note}`;
    }

    createQRCode(data);
  });


  




  });
  

  // Reset QR code
  document.getElementById("reset-btn")?.addEventListener("click", () => {
    const input = document.getElementById("qr-input");
    if (input) input.value = "";
  
    // Clear QR code output
    document.getElementById("qr-code").innerHTML = "";
  
    
  
    // Reset color settings
    const colorType = document.getElementById("color-type");
    const color1 = document.getElementById("color-1");
    const color2 = document.getElementById("color-2");
  
    if (colorType) colorType.value = "solid";
    if (color1) color1.value = "#000000";
    if (color2) color2.value = "#000000";
  });
  
    // Clear form fields
  function clearFormFields(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
  
    const inputs = form.querySelectorAll("input, textarea, select");
    inputs.forEach(input => {
      if (input.type === "checkbox" || input.type === "radio") {
        input.checked = false;
      } else if (input.tagName === "SELECT") {
        input.selectedIndex = 0;
      } else {
        input.value = "";
      }
    });
  
    // Clear QR output and hide download button
    document.getElementById("qr-code").innerHTML = "";
    document.getElementById("download-btn").style.display = "none";
  
  }
  
  // Clear buttons for specific forms
  document.getElementById("clear-vcard-btn")?.addEventListener("click", () => clearFormFields("vcard-form"));
  document.getElementById("clear-email-btn")?.addEventListener("click", () => clearFormFields("email-form"));
  document.getElementById("clear-sms-btn")?.addEventListener("click", () => clearFormFields("sms-form"));
  document.getElementById("clear-wifi-btn")?.addEventListener("click", () => clearFormFields("wifi-form"));
  document.getElementById("clear-social-btn")?.addEventListener("click", () => clearFormFields("social-form"));
  document.getElementById("clear-location-btn")?.addEventListener("click", () => clearFormFields("location-form"));
  document.getElementById("clear-appstore-btn")?.addEventListener("click", () => clearFormFields("appstore-form"));
  document.getElementById("clear-event-btn")?.addEventListener("click", () => clearFormFields("event-form"));
  document.getElementById("clear-payment-btn")?.addEventListener("click", () => clearFormFields("payment-form"));
  document.getElementById("clear-mecard-btn")?.addEventListener("click", () => clearFormFields("mecard-form"));
  



 // Dark mode toggle
const toggleSwitch = document.getElementById('dark-mode-toggle');

// Apply saved mode on load
document.addEventListener("DOMContentLoaded", () => {
  const darkMode = localStorage.getItem("darkMode");
  if (darkMode === "enabled") {
    document.body.classList.add("dark-mode");
    if (toggleSwitch) toggleSwitch.checked = true;
  }
});

// Toggle and save mode
if (toggleSwitch) {
  toggleSwitch.addEventListener("change", () => {
    if (toggleSwitch.checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  });
}

