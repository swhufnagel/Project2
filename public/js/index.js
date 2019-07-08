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


  getAccount: function (email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function () {
        window.location.replace("/home");
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

$("#homeButt").on("click", function () {
  event.preventDefault();
  console.log("home");
  //if a user is not logged in the home button will bring them to login screen and if they are logged in
  //it will bring them to the home screen
  var loggedIn = false;
  if (loggedIn === false) {
    window.location.href = "/";
  } else {
    window.location.href = "/home";
  }
});
// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var registerFormSubmit = function (event) {
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

  API.createAccount(account).then(function (data) {
    console.table(account);
    console.log(data)
    // refreshAccount();
  });

  $firstName.val("");
  $lastName.val("");
  $regUserName.val("");
  $regEmail.val("");
  $regPassword.val("");
  $passwordRepeat.val("");
};


// Add Event Listener to Create an Account
$("#registerAccountSubmit").on("click", registerFormSubmit);

// Add Event Listener to Login
$loginSubmitBtn.on("click", function () {
  event.preventDefault();
  var email = $("#email")
    .val()
    .trim();
  var password = $("#password")
    .val()
    .trim();
  API.getAccount(email, password);
});
// Make a new Post
var newPostDOM = function (postText) {
  console.log("adding this ", postText);
  var newPost = $("<div>", { id: postId, class: "post" });
  $(newPost).append($("#testPost").html());
  $("#postText").text(postText);
  $("#postContainer").append(newPost);
};
$(document).on("click", "#newPostSubmit", function () {
  event.preventDefault();

  var postText = $("#postTextBox").val().trim();

  event.preventDefault();
  var newPost = {
    text: postText,
    // eslint-disable-next-line no-multi-spaces
    image: "userImg",   // This still needs to be linked from login
    likes: 0,
    dislikes: 0,
    userLoginUserId: parseInt(localStorage.getItem("userId"))     // This also needs to be linked from login
  };
  console.log(newPost);
  $.post("/api/post/add", newPost).then(function (data) {
    console.log("submitted data:", data);
    var postId = data.postId;
    console.log(postId);
  });
  // newPostDOM(postText);
  // Clear form data
  $("#postTextBox").val("");
});
