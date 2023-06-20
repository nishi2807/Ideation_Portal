const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const crypto = require('crypto');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "registeration"
})

app.listen(8081, () => {
    console.log("Listening to port 8081!")
})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)"
    console.log(encryptData(req.body.password, secretKey))
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    })

    // const name = req.body.name;
    // const email = req.body.email;
    // let password = req.body.password;

    // bcrypt.genSalt(10, (err, salt) => {
    //     if (err) {
    //         console.error('Error generating salt:', err);
    //         return res.json("Error");
    //     }

    //     bcrypt.hash(password.toString(), salt, (err, hashedPassword) => {
    //         if (err) {
    //             console.error('Error hashing password:', err);
    //             return res.json("Error");
    //         }

    //         const values = [[name, email, hashedPassword]];
    //         db.query(sql, values, (err, data) => {
    //             if (err) {
    //                 console.error('Error executing query:', err);
    //                 return res.json("Error");
    //             }
    //             console.log('Query executed successfully:', data);
    //             return res.json(data);
    //         });
    //     });
    // });

    // bcrypt.hash(password.toString(), 10, function(err, hashedPassword) {
    //     if (err) {
    //       console.error('Error hashing password:', err);
    //       return;
    //     }

    //     // Store the hashed password in your database or use it as needed
    //     console.log('Hashed password:', hashedPassword);
    //   });
});

app.post('/username', (req, res) => {
    const email = req.body.email;
    console.log(email)
    const sql = "SELECT name FROM login WHERE email = ?";

    db.query(sql, [email], (err, data) => {
        if (err) {
            return res.json("Error");
        }

        if (data.length > 0) {
            const name = data[0].name;
            // console.log(name)
            return res.json({ name });
        } else {
            return res.json("User not found");
        }
    });
});


app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = (?)";
    const email = req.body.email;
    let password = req.body.password;

    console.log(email,password)

    db.query(sql, [email], (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.json("Error");
        }

        if (data.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Failed");
        }

        // const hashedPassword = data[0].password; // Convert to string
        // // console.log("password:", password);
        // // console.log("hashedPassword:", hashedPassword);

        // bcrypt.compare(password, hashedPassword, function(err, result) {
        //     if (err) {
        //       console.error('Error comparing passwords:', err);
        //       return;
        //     }

        //     if (result) {
        //       console.log('Passwords match!');
        //       return res.json("Success")
        //     } else {
        //       console.log('Passwords do not match.');
        //     }
        // });

        // bcrypt.compare(password, hashedPassword, (err, isMatch) => {
        //     if (err) {
        //         console.error('Error comparing passwords:', err);
        //         return res.json("Error");
        //     }

        //     if (isMatch) {
        //         // Passwords match, login successful
        //         console.log("Success");
        //         return res.json("Success");
        //     } else {
        //         // Passwords do not match
        //         console.log("Failed to login")
        //         return res.json("Failed");
        //     }
        // });
    });
});
