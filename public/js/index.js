// Create Account Fields
var $firstName = $("#firstName");
var $lastName = $("#lastName");
var $regUserName = $("#regUserName");
var $regEmail = $("#regEmail");
var $regPassword = $("#regPassword");
var $passwordRepeat = $("#regPassword-repeat");
var $userImg = $("#userImg");

// User Login fields
var $email = $("#email");
var $password = $("#password");

// eslint-disable-next-line no-unused-vars
var $regSubmitBtn = $("#registerAccountSubmit");
var $loginSubmitBtn = $("#loginButton");

// The API object contains methods for each kind of request we'll make
var API = {
  createAccount: function (account) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/account/add",
      data: JSON.stringify(account)
    });
  },


  getAccount: function(account) {

    $.post("/api/login", {
      email: account.email,
      password: account.password
    })

      .then(function() {
        window.location.replace("/");

        // If there's an error, log the error
      })
      .catch(function (err) {
        console.alert("Invalid Email/Password Combination!");
        console.log(err);
      });
  },
  deleteAccount: function (id) {
    return $.ajax({
      url: "api/account/" + id,
      type: "DELETE"
    });
  },
  createPost: function (postBody) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      url: "api/post/add",
      type: "POST",
      data: JSON.stringify(postBody)
    });
  }
};


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Register Account Button Process~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
    $firstName.val("");
    $lastName.val("");
    $regUserName.val("");
    $regEmail.val("");
    $regPassword.val("");
    $passwordRepeat.val("");
    console.table(account);

  });
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Login to your account button~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var loginAccount = function(event) {
  event.preventDefault();

  var account = {
    email: $email.val().trim(),
    password: $password.val().trim()
  };


  if (!(account.email && account.password)) {
    alert("You must enter your account information!");
    return;
  }

  API.getAccount(account).then(function() {
    $email.val("");
    $password.val("");
    console.table(account);
  });
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ New Post Submit ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$(document).on("click", "#newPostSubmit", function() {

  event.preventDefault();

  var postText = $("#postTextBox")
    .val()
    .trim();

  var newPost = {
    text: postText,

    image: "userImg", // This still needs to be linked from login
    likes: 0,
    dislikes: 0,
    userLoginUserId: parseInt(localStorage.getItem("userId")) // This also needs to be linked from login

  };
  console.log("NEW post:", newPost);
  // $.post("/api/post/add", newPost).then(function (data) {
  //   console.log("submitted data:", data);
  //   var postId = data.postId;
  //   console.log(postId);
  //   location.reload();
  // });

  $.ajax({
    type: "POST",
    url: "/api/post/add",
    data: newPost
  }).then(function(data) {
    console.log("submitted data:", data);
    var postId = data.postId;
    console.log(postId);
    location.reload();
  });

  // newPostDOM(postText);
  // Clear form data
  $("#postTextBox").val("");
});

// Add Event Listener to Create an Account
$regSubmitBtn.on("click", registerFormSubmit);

// Add Event Listener to Login
$loginSubmitBtn.on("click", loginAccount);

