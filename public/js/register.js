// Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");

var $firstName = $("#firstName").val().trim();
var $lastName = $("#lastName").val().trim();
var $userName = $("#userName").val().trim();
var $email = $("#email").val().trim();
var $password = $("#password").val().trim();

// The API object contains methods for each kind of request we'll make
var API = {
//     saveExample: function (example) {
//         return $.ajax({
//             headers: { "Content-Type": "application/json" },
//             type: "POST",
//             url: "api/examples",
//             data: JSON.stringify(example)
//         });
//     },
//     getExamples: function () {
//         return $.ajax({
//             url: "api/examples",
//             type: "GET"
//         });
//     },
//     deleteExample: function (id) {
//         return $.ajax({
//             url: "api/examples/" + id,
//             type: "DELETE"
//         });
    }
// };




// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
    API.getExamples().then(function (data) {
        var $examples = data.map(function (example) {
            var $a = $("<a>")
                .text(example.text)
                .attr("href", "/example/" + example.id);

            var $li = $("<li>")
                .attr({
                    class: "list-group-item",
                    "data-id": example.id
                })
                .append($a);

            var $button = $("<button>")
                .addClass("btn btn-danger float-right delete")
                .text("ｘ");

            $li.append($button);

            return $li;
        });

        $exampleList.empty();
        $exampleList.append($examples);
    });
};