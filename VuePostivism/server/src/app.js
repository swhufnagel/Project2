var express = require('express');
var bodyParser = require('express');
var cors = require('cors');
var morgan = require('morgan');

var app = express();
var PORT = process.env.PORT || 8080;
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) =>{
    res.send({
        message: "message"
    })
});

app.listen(PORT, () =>{
    console.log("listening on ", PORT);
});

module.exports = app;