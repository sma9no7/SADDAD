document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const card = document.getElementById('creditCard');
    const nameInput = document.getElementById('cardholderName');
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryMonthInput = document.getElementById('expiryMonth');
    const expiryYearInput = document.getElementById('expiryYear');
    const cvvInput = document.getElementById('cardCvv');
  
    const previewName = document.getElementById('previewCardholderName');
    const previewNumber = document.getElementById('previewCardNumber');
    const previewExpiry = document.getElementById('previewCardExpiry');
    const previewCvv = document.getElementById('previewCardCvv');
    const brandLogo = document.getElementById('brandLogo');
  
    const cardForm = document.getElementById('cardForm');
    const loadingScreen = document.getElementById('loadingScreen');
  
    // --- Detect and update card brand ---
    function updateBrand(number) {
      // Remove spaces
      const digits = number.replace(/\s+/g, '');
      let detectedBrand = 'generic'; // default
  
      if (digits.startsWith('4')) {
        detectedBrand = 'visa';
        brandLogo.src = 'visa.png';
      } else if (digits.startsWith('5')) {
        detectedBrand = 'mastercard';
        brandLogo.src = 'mastercard.png';
      } else {
        brandLogo.src = 'generic.png';
      }
  
      return detectedBrand;
    }
  
    // --- CARD PREVIEW UPDATES ---
    nameInput.addEventListener('input', () => {
      previewName.textContent = nameInput.value.toUpperCase() || 'CARDHOLDER NAME';
    });
  
    cardNumberInput.addEventListener('input', () => {
      // Format card number: remove non-digits, then add space every 4 digits
      let formattedNumber = cardNumberInput.value.replace(/\D/g, '');
      formattedNumber = formattedNumber.replace(/(.{4})/g, '$1 ').trim();
      cardNumberInput.value = formattedNumber;
  
      previewNumber.textContent = formattedNumber || '#### #### #### ####';
      // Update the brand logo and get the brand name
      updateBrand(formattedNumber);
    });
  
    // Update Expiry
    function updateExpiry() {
      const mm = expiryMonthInput.value.padStart(2, '0');
      const yy = expiryYearInput.value.padStart(2, '0');
      previewExpiry.textContent = (mm && yy) ? `${mm}/${yy}` : 'MM/YY';
    }
    expiryMonthInput.addEventListener('input', updateExpiry);
    expiryYearInput.addEventListener('input', updateExpiry);
  
    // Flip card when CVV is focused
    cvvInput.addEventListener('focus', () => {
      card.classList.add('flip-card');
    });
    cvvInput.addEventListener('blur', () => {
      previewCvv.textContent = cvvInput.value || '###';
      card.classList.remove('flip-card');
    });
    cvvInput.addEventListener('input', () => {
      previewCvv.textContent = cvvInput.value || '###';
    });
  
    // --- FORM SUBMISSION ---
    cardForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      // 1) Prepare data for Local Storage
      const cardholderName = nameInput.value || '';
      const rawNumber = cardNumberInput.value.replace(/\s+/g, '');
      const last4Digits = rawNumber.slice(-4) || 'XXXX';
      
      // Re-detect the brand (in case user typed the last digit)
      let brand = 'generic';
      if (rawNumber.startsWith('4')) {
        brand = 'visa';
      } else if (rawNumber.startsWith('5')) {
        brand = 'mastercard';
      }
      
      // 2) Store these values in Local Storage
      localStorage.setItem('cardholderName', cardholderName);
      localStorage.setItem('last4Digits', last4Digits);
      localStorage.setItem('cardBrand', brand); // 'visa', 'mastercard', or 'generic'
  
      // 3) Show the loading screen
      loadingScreen.classList.remove('hidden');
  
      // 4) Simulate delay (e.g., 20 seconds if you want)
      setTimeout(() => {
        // 5) Redirect to the OTP page
        window.location.href = 'otp.html';
      }, 20000); // 20 seconds
    });
  });
