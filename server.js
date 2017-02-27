var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contacts']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactList', function (req, res) {

    /*person1 = {
     name: "Purushoth",
     email: "purushoth.h13@gmail.com",
     phone: "9876543211"
     }

     var contactList = [person1];
     res.json(contactList);*/
    db.contacts.find(function (err, docs) {
        // console.log(docs);
        res.json(docs);
    });
});

app.post('/addContact', function (req, res) {
    //console.log(req.body);
    db.contacts.insert(req.body, function (err, doc) {
        res.json(doc);
    });
});

app.delete('/deleteContact/:id', function (req, res) {
    var id = req.params.id;
    db.contacts.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

app.get('/editContact/:id', function (req, res) {
    var id = req.params.id;
    db.contacts.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        console.log(doc);
        res.json(doc);
    });
});

app.put('/updateContact/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.contacts.findAndModify({
        query: {_id: mongojs.ObjectId(id)},
        update: {$set: {name: req.body.name, email: req.body.email, phone: req.body.phone}},
        new: true
    }, function (err, doc) {
        console.log(doc);
        res.json(doc);
    });
});



app.listen(3000);
console.log("Server running on port 3000");