// // Default Script
// document.addEventListener('DOMContentLoaded', function () {
//     // Get the URL parameter for the tab
//     const urlParams = new URLSearchParams(window.location.search);
//     const tab = urlParams.get('tab'); // Get 'tab' parameter
//     // Check the value of the 'tab' parameter and show the corresponding tab
//     if (tab) {
//         if (tab === 'panel1') {
//             // Activate 'CREATE PANEL 1:1' tab
//             new bootstrap.Tab(document.getElementById('createpanel1-1-tab')).show();
//         } else if (tab === 'panel') {
//             // Activate 'MY PANELS' tab
//             new bootstrap.Tab(document.getElementById('createpanel-tab')).show();
//         } else if (tab === 'mypanel') {
//             // Activate 'CREATE PANEL' tab
//             new bootstrap.Tab(document.getElementById('mypanel-tab')).show();
//         }
//     }
// });
// $(document).ready(function () {
//     fetchBankDetails();
//     fetchWalletBalance();
// });
// function fetchBankDetails() {
//     $.ajax({
//         url: 'fetch_bank_details.php', // Make sure this path is correct
//         type: 'GET',
//         dataType: 'json',
//         success: function (response) {
//             if (response.success) {
//                 // Update the UI with fetched bank details
//                 $('#bank-name').text(response.data.bank_name);
//                 $('#account-holder-name').text(response.data.account_holder_name);
//                 $('#account-number').text(response.data.account_number);
//                 $('#ifsc-code').text(response.data.ifsc_code);
//                 $('#upi-id').text(response.data.upi_id);
//                 $('#uploaded-qr').attr('src', 'admin/' + response.data.upi_scanner).show();
//             } else {
//                 alert('Error fetching bank details: ' + response.error);
//             }
//         },
//         error: function (xhr) {
//             alert('There was an error fetching the bank details.');
//             console.error(xhr.responseText); // Log the response for debugging
//         }
//     });
// }
// // Function to fetch wallet balance from the server
// function fetchWalletBalance() {
//     $.ajax({
//         url: 'check_wallet_balance.php', // PHP file to fetch the balance
//         type: 'GET',
//         dataType: 'json', // Expect JSON response
//         success: function (response) {
//             if (response.success) {
//                 let walletBalance = parseFloat(response.wallet_balance);
//                 $('.wallet-balance').text(walletBalance.toFixed(2));
//             } else {
//                 $('.wallet-balance').text('0');
//                 console.error(response.error);
//             }
//         },
//         error: function (xhr, status, error) {
//             // Handle AJAX error
//             $('.wallet-balance').text('0');
//             console.error('Error fetching wallet balance:', error);
//         }
//     });
// }
// // Function to fetch panel balance from the server
// function fetchPanelBalance() {
//     // Get the panel ID from the hidden input field
//     const panelId = $('#panel-withdraw-form input[name="panel_id"]').val();
//     // Check if panelId is valid
//     if (!panelId) {
//         console.error('Panel ID is not available.');
//         return;
//     }
//     $.ajax({
//         url: 'check_panel_balance.php', // PHP file to fetch the balance
//         type: 'POST',
//         data: {
//             panel_id: panelId
//         }, // Send the panel ID to the server
//         dataType: 'json', // Expect JSON response
//         success: function (response) {
//             if (response.success) {
//                 // Parse the panel balance and remove unnecessary zeros
//                 let panelBalance = parseFloat(response.panel_balance);
//                 // If the balance is an integer, remove the decimal part
//                 if (panelBalance % 1 === 0) {
//                     panelBalance = panelBalance.toFixed(0);
//                 } else {
//                     panelBalance = panelBalance.toFixed(2); // Keep two decimal places if there are any
//                 }
//                 // Update the panel balance in the modal UI
//                 $('.panel-balance').text(panelBalance);
//             } else {
//                 console.error(response.error);
//             }
//         },
//         error: function (xhr, status, error) {
//             console.error('AJAX error:', error);
//         }
//     });
// }
// // Handle the deposit button click
// $('.panel-deposit').click(function () {
//     var purchaseId = $(this).data('panel-id'); // This is now the purchase ID
//     $('#depositPanelId').val(purchaseId); // Set the purchase ID in the hidden field
// });
// // Handle the deposit form submission
// $('#panel-deposit-form').submit(function (event) {
//     event.preventDefault();
//     const walletBalance = parseFloat($('#panel-deposit-form .wallet-balance').text()) || 0;
//     const depositCoins = parseFloat($('#paneltotal-amt').val().replace('₹', '').trim()) || 0;
//     if (depositCoins > walletBalance) {
//         alert("Insufficient wallet balance for the deposit.");
//         $('#paneldepositModal').modal('hide');
//         $('#depositModal').modal('show');
//         return;
//     }
//     // Proceed with the AJAX request if balance is sufficient
//     var purchaseId = $('#depositPanelId').val();
//     var coins = $('.panel-coins').val();
//     var rate = $('.panel-rate').val();
//     var totalAmount = parseFloat($('#paneltotal-amt').val().replace('₹', '').trim());
//     $.ajax({
//         url: 'panel_deposit.php', // PHP script to process the deposit
//         type: 'POST',
//         data: {
//             purchase_id: purchaseId,
//             coins: coins,
//             rate: rate,
//             totalAmount: totalAmount
//         },
//         success: function (response) {
//             if (response.success) {
//                 alert(response.message);
//                 location.reload(); // Reload the page after deposit
//             } else if (response.error === 'Insufficient wallet balance') {
//                 $('#paneldepositModal').modal('hide');
//                 $('#depositModal').modal('show');
//             } else {
//                 alert("Deposit failed: " + response.error);
//             }
//         },
//         error: function () {
//             alert("There was an error processing your deposit.");
//         }
//     });
// });
// // Handle the withdraw button click
// $('.panel-withdraw').click(function () {
//     var purchaseId = $(this).data('panel-id'); // This is now the purchase ID
//     $('#withdrawPanelId').val(purchaseId); // Set the purchase ID in the hidden field
// });
// $('#panel-withdraw-form').submit(function (event) {
//     event.preventDefault();
//     var purchaseId = $('#withdrawPanelId').val(); // Panel ID
//     var coins = $('#panelwithdrawCoins').val();
//     var rate = $('.panel-rate').val();
//     var totalAmount = parseFloat($('#panelwtotal-amt').val().replace('₹', '').trim());
//     var panel_bal = parseFloat($('.panel-balance').text()) || 0; // Get the panel balance from the displayed value
//     // Check if the entered amount is greater than the available balance
//     // if (totalAmount > panel_bal) {
//     //     alert('Oops! You don’t have enough balance to withdraw');
//     //     return;
//     // }
//     // Check if all values are present
//     if (!purchaseId || isNaN(totalAmount)) {
//         alert('Please provide all the required data.');
//         return;
//     }
//     // Log data being sent for debugging
//     console.log("Sending Data:", {
//         purchase_id: purchaseId,
//         coins: coins,
//         rate: rate,
//         totalAmount: totalAmount
//     });
//     // Proceed with AJAX request
//     $.ajax({
//         url: 'panel_withdraw.php',
//         type: 'POST',
//         data: {
//             purchase_id: purchaseId,
//             coins: coins,
//             rate: rate,
//             totalAmount: totalAmount
//         },
//         dataType: 'json',
//         success: function (response) {
//             if (response.success) {
//                 alert(response.message || "Withdraw request submitted for admin approval.");
//                 location.reload();
//             } else {
//                 alert("Withdraw failed: " + response.error);
//                 console.error("Error response:", response);
//             }
//         },
//         error: function (xhr, status, error) {
//             console.error("AJAX Error:", status, error);
//             console.error("Response:", xhr.responseText);
//             alert("There was an error processing your withdrawal.");
//         }
//     });
// });
// $(document).ready(function () {
//     // Withdraw button click
//     $('#rqst-payment-btn').click(function (event) {
//         event.preventDefault();
//         // Get input value and wallet balance
//         const withdrawCoins = parseFloat($('#withdrawModal .withdraw-coins').val());
//         const walletBalance = parseFloat($('#withdrawModal .wallet-balance').text().replace(/[^0-9.-]+/g, "")); // Clean the currency symbol if any
//         // Check if the withdrawal amount is blank or zero
//         if (isNaN(withdrawCoins) || withdrawCoins <= 0) {
//             alert("Please enter a valid amount to withdraw.");
//             $('#withdrawModal .withdraw-coins').focus();
//             return; // Stop further execution if validation fails
//         }
//         // Display the withdrawal amount
//         const payAmount = withdrawCoins;
//         $('#withdrawModal .withdraw-amount').text(`₹${payAmount}`);
//         // Check if the withdrawal amount is greater than or equal to the wallet balance
//         if (withdrawCoins > walletBalance) {
//             alert("Oops! You don't have enough balance to withdraw");
//             $('#withdrawModal .withdraw-coins').focus();
//             return; // Stop further execution if validation fails
//         }
//         // Hide withdrawal section and show account details section
//         $('#withdraw-section').addClass('d-none');
//         $('#account-details-section').removeClass('d-none');
//     });
//     // Make payment button click for deposit
//     $('#make-payment-btn').click(function (event) {
//         event.preventDefault();
//         const depositCoins = document.getElementById('deposit-coins').value;
//         // Check if the deposit amount is blank or zero
//         if (!depositCoins || depositCoins <= 0) {
//             alert("Please enter a valid amount to deposit.");
//             document.getElementById('deposit-coins').focus();
//             return; // Stop further execution if validation fails
//         }
//         const payAmount = depositCoins ? depositCoins : 0;
//         document.getElementById('pay-amount').textContent = `₹${payAmount}`;
//         document.getElementById('deposit-section').classList.add('d-none');
//         document.getElementById('payment-details-section').classList.remove('d-none');
//     });
// });
// document.querySelector('#payment-details-section .modal-close').addEventListener('click', function (event) {
//     document.getElementById('deposit-section').classList.remove('d-none');
//     document.getElementById('payment-details-section').classList.add('d-none');
// });
// document.querySelector('#account-details-section .modal-close').addEventListener('click', function (event) {
//     document.getElementById('withdraw-section').classList.remove('d-none');
//     document.getElementById('account-details-section').classList.add('d-none');
// });
// document.getElementById('uploadBtn').addEventListener('click', function () {
//     document.getElementById('payment_screenshot').click(); // Simulate a click on the file input
// });
// $(document).ready(function () {
//     $('.deposit').click(function (event) {
//         event.preventDefault();
//         // Check if the button has the 'data-demo' attribute (indicating it's a demo user)
//         var isDemo = $(this).attr('data-demo') === 'true';
//         if (isDemo) {
//             // Show alert if it's a demo user
//             alert('Please log in with your mobile number and OTP to create a panel.');
//             // Redirect to login form after alert (optional)
//             // Replace 'login.php' with the actual login form URL
//             window.location.href = 'logout.php';
//         } else {
//             // Proceed with normal panel creation
//             window.location.href = $(this).attr('href');
//         }
//     });
//     $('.withdraw').click(function (event) {
//         event.preventDefault();
//         // Check if the button has the 'data-demo' attribute (indicating it's a demo user)
//         var isDemo = $(this).attr('data-demo') === 'true';
//         if (isDemo) {
//             // Show alert if it's a demo user
//             alert('Please log in with your mobile number and OTP to create a panel.');
//             // Redirect to login form after alert (optional)
//             // Replace 'login.php' with the actual login form URL
//             window.location.href = 'logout.php';
//         } else {
//             // Proceed with normal panel creation
//             window.location.href = $(this).attr('href');
//         }
//     });
//     $('#deposit-form').on('submit', function (event) {
//         event.preventDefault(); // Prevent form from submitting normally
//         // Check if a screenshot has been uploaded
//         var fileInput = $('#payment_screenshot')[0]; // Access the file input element
//         if (fileInput.files.length === 0) {
//             alert('Please upload a payment screenshot before submitting.');
//             return; // Stop the function if no file is uploaded
//         }
//         // Create FormData object to handle file upload and other form data
//         var formData = new FormData(this);
//         $.ajax({
//             url: 'save_deposit.php', // PHP file that handles form submission
//             type: 'POST',
//             data: formData,
//             contentType: false, // Prevent jQuery from automatically transforming the data into a query string
//             processData: false, // Don't process the files
//             success: function (response) {
//                 // On success, show alert and reload the page
//                 alert(
//                     "Deposited amount once approved by admin will reflect in your wallet."
//                 );
//                 location.reload(); // Reload the page after the alert is closed
//             },
//             error: function () {
//                 alert(
//                     'There was an error processing your deposit. Please try again.'
//                 );
//             }
//         });
//     });
//     $('#withdraw-form').on('submit', function (event) {
//         event.preventDefault(); // Prevent form from submitting normally
//         // Check if form data is valid before submission
//         var formData = new FormData(this);
//         $.ajax({
//             url: 'withdraw.php', // PHP file that handles form submission
//             type: 'POST',
//             data: formData,
//             contentType: false, // Prevent jQuery from automatically transforming the data into a query string
//             processData: false, // Don't process the files
//             success: function (response) {
//                 console.log(response); // Log the server response for debugging
//                 // On success, show alert and reload the page
//                 alert("Withdraw amount will be credited in your bank account.");
//                 location.reload(); // Reload the page after the alert is closed
//             },
//             error: function (xhr, status, error) {
//                 console.error("Error: " + error); // Log any errors
//                 alert(
//                     "There was an error processing your withdraw. Please try again.");
//             }
//         });
//     });
// });
// // Function to calculate total amount
// function panelcalculateTotal() {
//     const coins = parseFloat(document.getElementById('paneldepositCoins').value) || 0;
//     const rate = parseFloat(document.getElementById('rate').value) || 0;
//     const total = coins * rate;
//     // Update total amount
//     document.getElementById('paneltotal-amt').value = `₹${total.toFixed(2)}`;
// }
// // Event listener for input changes
// document.getElementById('paneldepositCoins').addEventListener('input', panelcalculateTotal);
// // Initial calculation on modal open
// $('#paneldepositModal').on('shown.bs.modal', function () {
//     panelcalculateTotal();
// });
// function panelcalculatewTotal() {
//     const coins = parseFloat(document.getElementById('panelwithdrawCoins').value) || 0;
//     const rate = parseFloat(document.getElementById('rate').value) || 0;
//     const total = coins * rate;
//     // Update total amount
//     document.getElementById('panelwtotal-amt').value = `₹${total.toFixed(2)}`;
// }
// // Event listener for input changes
// document.getElementById('panelwithdrawCoins').addEventListener('input', panelcalculatewTotal);
// // Initial calculation on modal open
// $('#panelwithdrawModal').on('shown.bs.modal', function () {
//     panelcalculatewTotal();
// });
// function copyText(elementId) {
//     // Get the text content of the element using its ID
//     const text = document.getElementById(elementId).textContent;
//     navigator.clipboard.writeText(text).then(function () {
//         alert('Copied to clipboard: ' + text);
//     }).catch(function (err) {
//         alert('Failed to copy: ' + err);
//     });
// }
// $(document).ready(function () {
//     // On button click, fetch the WhatsApp number dynamically
//     $('#getWhatsAppBtn').click(function () {
//         console.log('Fetching WhatsApp number...');
//         $.ajax({
//             url: 'fetch_whatsapp.php',
//             type: 'GET',
//             dataType: 'json',
//             success: function (response) {
//                 console.log('AJAX Response:', response);
//                 if (response.success) {
//                     var whatsappNumber = response.data.whatsapp_number;
//                     var whatsappLink = 'https://wa.me/' + whatsappNumber;
//                     console.log('WhatsApp Link:', whatsappLink);
//                     window.open(whatsappLink, '_blank');
//                 } else {
//                     console.error('Error:', response.error);
//                     alert('Error: ' + response.error);
//                 }
//             },
//             error: function (xhr, status, error) {
//                 console.error('AJAX Error:', status, error);
//                 alert('There was an error fetching the WhatsApp number.');
//             }
//         });
//     });
// });
// $(document).ready(function () {
//     $('.panel-deposit').click(function () {
//         var rate = $(this).data('rate'); // Get the rate from the clicked panel's data attribute
//         $('.panel-rate').val(rate); // Set the rate value in the modal's input field
//         var panelId = $(this).data('panel-id'); // Get the panel ID from the clicked panel's data attribute
//         $('#depositPanelId').val(panelId); // Set the panel ID in the hidden input
//     });
//     $('.panel-withdraw').click(function () {
//         var rate = $(this).data('rate'); // Get the rate from the clicked panel's data attribute
//         $('.panel-rate').val(rate); // Set the rate value in the modal's input field
//         var panelId = $(this).data('panel-id'); // Get the panel ID from the clicked panel's data attribute
//         $('#withdrawPanelId').val(panelId); // Set the panel ID in the hidden input
//     });
//     // Reset modal forms and fields when the modal is closed or hidden
//     $('#loginModal, #depositModal, #withdrawModal, #paneldepositModal, #panelwithdrawModal').on('hidden.bs.modal', function () {
//         // Reset all forms within the modal
//         $(this).find('form').trigger('reset');
//         // Hide dynamically shown sections in the login modal
//         $('#otpLoginForm').show();
//         $('#verifyOtpForm').hide();
//         $('#passwordLoginForm').hide();
//         // Hide additional steps in deposit and withdraw modals
//         $('#deposit-section').removeClass('d-none');
//         $('#payment-details-section').addClass('d-none');
//         $('#withdraw-section').removeClass('d-none');
//         $('#account-details-section').addClass('d-none');
//         // Reset balances (clearing any previous loaded balance)
//         $('.panel-balance').text('0'); // Reset panel balance
//     });
//     // Example for resetting QR code and file inputs
//     $('#depositModal').on('hidden.bs.modal', function () {
//         $('#uploaded-qr').hide();
//         $('#payment_screenshot').val(''); // Reset file input
//     });
//     // Fetch wallet balance when the withdrawal modal is opened
//     $('#withdrawModal').on('shown.bs.modal', function () {
//         fetchWalletBalance(); // Fetch balance when the withdrawal modal is opened
//     });
//     // Fetch wallet balance when the deposit modal is opened
//     $('#depositModal').on('shown.bs.modal', function () {
//         fetchWalletBalance(); // Fetch balance when the deposit modal is opened
//     });
//     // Fetch wallet balance when the withdrawal modal is opened
//     $('#panelwithdrawModal').on('shown.bs.modal', function () {
//         fetchPanelBalance(); // Fetch balance when the withdrawal modal is opened
//     });
//     // Fetch wallet balance when the deposit modal is opened
//     $('#paneldepositModal').on('shown.bs.modal', function () {
//         fetchPanelBalance(); // Fetch balance when the deposit modal is opened
//     });
// });


//New Script


document.addEventListener('DOMContentLoaded', function() {

  const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
  });
  try{
    document.getElementById("showRegisterForm").addEventListener("click", function () {
      // Hide the login form
      const loginForm = document.getElementById("passwordLoginForm");
      const registerForm = document.getElementById("registerForm");

      if (loginForm && registerForm) {
          loginForm.style.display = "none";      // Hide login
          registerForm.style.display = "block";  // Show register
      }
    });
  }
  catch(err) {

  }

  
  try{
    // Make payment button click for deposit
    $('#make-payment-btn').click(function (event) {
        event.preventDefault();
        // const depositCoins = document.getElementById('deposit-coins').value;
        // Check if the deposit amount is blank or zero
        // if (!depositCoins || depositCoins <= 0) {
        //     alert("Please enter a valid amount to deposit.");
        //     document.getElementById('deposit-coins').focus();
        //     return; // Stop further execution if validation fails
        // }
        // const payAmount = depositCoins ? depositCoins : 0;
        // document.getElementById('pay-amount').textContent = `₹${payAmount}`;
        document.getElementById('deposit-section').classList.add('d-none');
        document.getElementById('payment-details-section').classList.remove('d-none');
    });
    $('#back-to-deposit').click(function (event) {
        event.preventDefault();
        document.getElementById('deposit-section').classList.remove('d-none');
        document.getElementById('payment-details-section').classList.add('d-none');
    });
  }
  catch(err) {
    
  }

});

