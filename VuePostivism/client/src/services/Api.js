import axios from "axios";
// import store from "@/store/store"

export default () => {
  return axios.create({
    baseURL: "http://localhost:8080/#/"
  });
};
// Get references to page elements
// console.log("loaded");
// var $firstName = $("#firstName");
// var $lastName = $("#lastName");
// var $userName = $("#userName");
// var $email = $("#email");
// var $password = $("#password");
// var $passwordRepeat = $("#password-repeat");
// var $submitBtn = $("#submit");

// // The API object contains methods for each kind of request we'll make
// var API = {
//   createAccount: function(account) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/account",
//       data: JSON.stringify(account)
//     });
//   },
//   getAccount: function() {
//     return $.ajax({
//       url: "api/account",
//       type: "GET"
//     });
//   },
//   deleteAccount: function(id) {
//     return $.ajax({
//       url: "api/account/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var account = {
//     firstName: $firstName.val().trim(),
//     lastName: $lastName.val().trim(),
//     userName: $userName.val().trim(),
//     email: $email.val().trim(),
//     password: $password.val().trim()
//   };

//   if (
//     !(
//       account.firstName &&
//       account.lastName &&
//       account.userName &&
//       account.email &&
//       account.password
//     )
//   ) {
//     alert("You must enter an your account information!");
//     return;
//   }

//   API.createAccount(account).then(function() {
//     console.table(account);
//     // refreshAccount();
//   });

//   $firstName.val("");
//   $lastName.val("");
//   $userName.val("");
//   $email.val("");
//   $password.val("");
//   $passwordRepeat.val("");
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit,function(){
//     console.log("clicked");
// });

// export default API;