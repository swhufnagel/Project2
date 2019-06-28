// Get references to page elements
var $firstName = $("#firstName");
var $lastName = $("#lastName");
var $regUserName = $("#regUserName");
var $email = $("#email");
var $regPassword = $("#regPassword");
var $passwordRepeat = $("#regPassword-repeat");
// eslint-disable-next-line no-unused-vars
var $loginSubmitBtn = $("#loginSubmit");
var $regSubmitBtn = $("#registerSubmit");

// The API object contains methods for each kind of request we'll make
var API = {
  createAccount: function(account) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/account",
      data: JSON.stringify(account)
    });
  },
  getAccount: function() {
    return $.ajax({
      url: "api/account",
      type: "GET"
    });
  },
  deleteAccount: function(id) {
    return $.ajax({
      url: "api/account/" + id,
      type: "DELETE"
    });
  }
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var registerFormSubmit = function(event) {
  event.preventDefault();

  var account = {
    firstName: $firstName.val().trim(),
    lastName: $lastName.val().trim(),
    userName: $regUserName.val().trim(),
    email: $email.val().trim(),
    password: $regPassword.val().trim()
  };

  if (
    !(
      account.firstName &&
      account.lastName &&
      account.userName &&
      account.email &&
      account.password
    )
  ) {
    alert("You must enter an your account information!");
    return;
  }

  API.createAccount(account).then(function() {
    console.table(account);
    // refreshAccount();
  });

  $firstName.val("");
  $lastName.val("");
  $regUserName.val("");
  $email.val("");
  $regPassword.val("");
  $passwordRepeat.val("");
};

// Add Event Listener to Create an Account
$regSubmitBtn.on("click", registerFormSubmit);

// Add Event Listener to Login
// $loginSubmitBtn.on("click", );