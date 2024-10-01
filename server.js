// Importing dependencies
const express = require("express");
const app = express()
const mysql = require('mysql2')
const dotenv = require('dotenv')

// Configuring environment Variables
dotenv.config();

// Creating connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})
     

// Testing the connection
db.connect((err) => {
    // Unsuccessful Connection
    if(err) {
        return console.log("Error connecting to the database: ", err)
    }
    // Successful Connection
    console.log("Successfully connected to MySQL: ", db.threadId)
})



// 1. Retrieve all patients
app.get('', (req, res) => {
    const getPatients = "SELECT * FROM patients"
    db.query(getPatients, (err, data) => {
        // If there is an error
        if(err) {
            return res.status(400).send("Failed to retrieve Patients")
        }
        // If no error
        res.status(200).send(data)
    })
})

// 2. Retrieve all providers
app.get('/providers', (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers";
    db.query(getProviders, (err, data) => {
        // If there is an error
      if (err) {
        return res.status(400).send("Failed to retrieve Providers");
      }
    //   If no error
      res.status(200).send(data);
    });
  });

// 3. Filtering Patients by first name
app.get('/patients/:firstName', (req, res) => {
    const firstName = req.params.firstName;
    const getPatients = "SELECT * FROM patients WHERE first_name = ?";
    db.query(getPatients, [firstName], (err, data) => {
        // If there is an error
      if (err) {
        return res.status(400).send("Failed to retrieve Patients");
      }
    //   If no error
      res.status(200).send(data);
    });
  });

// 4. Retrieve all providers by their specialty
app.get('/providers/:specialty', (req, res) => {
    const specialty = req.params.specialty;
    const getProviders = "SELECT * FROM providers WHERE provider_specialty = ?";
    db.query(getProviders, [specialty], (err, data) => {
        //  If there is an error
      if (err) {
        return res.status(400).send("Failed to retrieve Providers");
      }
    //   If no error
      res.status(200).send(data);
    });
  });


// start and listen to the server
app.listen(3300, () => {
    console.log('server is running on port 3300...')
})
