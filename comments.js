// Create web server to handle comments requests
// Comments are stored in a JSON file
// Comments are retrieved from the JSON file and sent as a response to the client

// Import required modules
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

// Create web server
var app = express();

// Set up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Set up a route to handle GET requests for comments
app.get('/comments', function(req, res) {
    // Read the comments from the JSON file
    fs.readFile('comments.json', function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send('An error occurred');
        } else {
            // Send the comments as a response
            res.send(data);
        }
    });
});

// Set up a route to handle POST requests for comments
app.post('/comments', function(req, res) {
    // Read the comments from the JSON file
    fs.readFile('comments.json', function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send('An error occurred');
        } else {
            // Parse the comments
            var comments = JSON.parse(data);
            // Add the new comment to the comments array
            comments.push(req.body);
            // Write the comments back to the JSON file
            fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
                if(err) {
                    console.log(err);
                    res.status(500).send('An error occurred');
                } else {
                    // Send a success response
                    res.send('Comment added');
                }
            });
        }
    });
});

// Start the server
app.listen(3000, function() {
    console.log('Server is running on http://localhost:3000');
});