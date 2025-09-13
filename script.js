document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('paymentForm');

    // Input fields
    const cardNumber = document.getElementById('cardNumber');
    const expiryDate = document.getElementById('expiry');
    const cvv = document.getElementById('cvv');
    const cardName = document.getElementById('cardName');

    // Error fields
    const cardNumberError = document.getElementById('cardError');
    const expiryError = document.getElementById('expiryError');
    const cvvError = document.getElementById('cvvError');
    const nameError = document.getElementById("nameError");

    cardName.addEventListener('input', function(){
        if(this.value){
          this.style.borderColor = "green";
        }
        else{
            this.style.borderColor = "grey";
        }
    })

    // Format card number: XXXX XXXX XXXX XXXX
    cardNumber.addEventListener('input', e => {
        let value = e.target.value.replace(/\D/g, "");
        value = value.substring(0, 16); 
        e.target.value = value.replace(/(.{4})/g, "$1 ").trim(); 
        cardNumber.style.borderColor = "green";
        cardNumberError.style.display = "none";
    });

    // Format expiry date: MM/YY
    expiryDate.addEventListener('input', function(e){
        if(this.value.length > 1){
          this.style.borderColor = "green";
        }
        else{
            this.style.borderColor = "grey";
        }
        let value = e.target.value.replace(/\D/g, "").substring(0,4);
        if(value.length >=3){
            e.target.value =value.substring(0,2) + "/" + value.substring(2,4);
        }
        else{
            e.target.value = value;
        }
    });

    // CVV input
    cvv.addEventListener('input', () => {
        cvvError.style.display = "none";
        cvv.style.borderColor = "green";
    });

    // Final form validation
    form.addEventListener('submit', e => {
        e.preventDefault();
        let valid = true;

        //Card name check
        if(cardName.value.length < 2){
            nameError.style.display = "block";
            cardName.style.borderColor = "red";
            valid = false;
        }

        // Card number check
        const cardValue = cardNumber.value.replace(/\s/g, "");
        if (!/^\d{16}$/.test(cardValue)) {
            cardNumberError.style.display = "block";
            cardNumber.style.borderColor = "red";
            valid = false;
        }

        // Expiry date check
        const [month, year] = expiryDate.value.split("/") || [];
        const now = new Date();
        const currentYear = now.getFullYear() % 100;
        const currentMonth = now.getMonth() + 1;

        if (
            !month || !year ||
            isNaN(month) || isNaN(year) ||
            month < 1 || month > 12 ||
            year < currentYear ||
            (year == currentYear && month < currentMonth)
        ) {
            expiryError.style.display = "block";
            expiryDate.style.borderColor = "red";
            valid = false;
        }

        // CVV check
        if (!/^\d{3,4}$/.test(cvv.value)) {
            cvvError.style.display = "block";
            cvv.style.borderColor = "red";
            valid = false;
        }

        if (valid) {
            const successMessage = document.getElementById('success-message');
            successMessage.style.display = "block";

            setTimeout(() => {
                form.reset();
                document.querySelectorAll('input').forEach(el => el.style.borderColor = "grey");
                successMessage.style.display = "none";
            }, 3000);
        }
    });
});
