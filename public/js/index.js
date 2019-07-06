// Get references to page elements
var $firstName = $("#firstName");
var $lastName = $("#lastName");
var $regUserName = $("#regUserName");

var $regEmail = $("#regEmail");

var $regPassword = $("#regPassword");
var $passwordRepeat = $("#regPassword-repeat");
var $userImg = $("#userImg");
// eslint-disable-next-line no-unused-vars
var $regSubmitBtn = $("#registerSubmit");
var $loginSubmitBtn = $("#loginButton");

// The API object contains methods for each kind of request we'll make
var API = {
  createAccount: function(account) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/account/add",
      data: JSON.stringify(account)
    });
  },


  getAccount: function(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function(res) {
        console.log(res);
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });

  },
  deleteAccount: function(id) {
    return $.ajax({
      url: "api/account/" + id,
      type: "DELETE"
    });
  },
  createPost: function(postBody) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      url: "api/posts/add",
      type: "POST",
      data: JSON.stringify(postBody)
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
    userImg: $userImg.val().trim(),
    email: $regEmail.val().trim(),
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
    alert("You must enter your account information!");
    return;
  } else {
    console.log(account);
  }

  API.createAccount(account).then(function() {
    console.table(account);
    // refreshAccount();
  });

  $firstName.val("");
  $lastName.val("");
  $regUserName.val("");
  $regEmail.val("");
  $regPassword.val("");
  $passwordRepeat.val("");
};

var postSubmit = function (event) {
  event.preventDefault();

  var postBody = $("#postTextBox").val().trim();

  var newPost = {
    userId: "userId",
    userImg: "userImg",
    postText: postBody,
  };

  API.createPost(newPost).then(function() {
    console.log(newPost);
  });

  $.post("/api/posts/add", newPost)
    .then(function (data) {
      console.log(data);
    });
};

// Event Listener for post submission
$("#newPostSubmit").on("click", postSubmit);

// Make a new Post
$("#newPostSubmit").on("click", function () {
  var postBody = $("#postTextBox").val().trim();

  console.log("User:", "");
  console.log("UserImg:", "");
  console.log("Post:", postBody);


});


// Add Event Listener to Create an Account
$("#registerAccountSubmit").on("click", registerFormSubmit);

// Add Event Listener to Login
$loginSubmitBtn.on("click", function() {
  event.preventDefault();
  console.log("logging in");
  var email = $("#email")
    .val()
    .trim();
  var password = $("#password")
    .val()
    .trim();
  API.getAccount(email, password);
});

// Make a new Post
$("#newPostSubmit").on("click", function() {
  event.preventDefault();
  var newPost = {
    userId: "userId",
    userImg: "userImg",
    postText: $("#postTextBox")
  };

  $.post("/api/posts/add", newPost).then(function(data) {
    console.log(data);
  });
});