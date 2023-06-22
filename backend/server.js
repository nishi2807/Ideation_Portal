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

// app.post('/signup', (req, res) => {
//     const sql = "INSERT INTO users (`name`, `email`, `password`) VALUES (?)"
//     console.log(encryptData(req.body.password, secretKey))
//     const values = [
//         req.body.name,
//         req.body.email,
//         req.body.password
//     ]
//     db.query(sql, [values], (err, data) => {
//         if (err) {
//             return res.json("Error");
//         }
//         return res.json(data);
//     })

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
// });

app.post('/username', (req, res) => {
    const email = req.body.email;
    console.log(email)
    const sql = "SELECT name FROM users WHERE email = ?";

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
    const sql = "SELECT * FROM users WHERE `email` = (?)";
    const email = req.body.email;
    let password = req.body.password;

    console.log(email, password)

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
    });
});

// app.post('/campaign/emails', (req, res) => {
//     const { camp_id, camp_user_email } = req.body;
//     console.log(camp_user_email)

//     const emails = camp_user_email.split(',').map(email => [camp_id, email.trim()]);

//     const sql = 'INSERT INTO campaign_user (camp_id, camp_user_email) VALUES ?';

//     db.query(sql, [emails], (error, result) => {
//       if (error) {
//         console.error('Error inserting emails:', error);
//         return res.status(500).json({ message: 'Failed to store emails' });
//       }

//       console.log('Emails stored successfully');
//       return res.status(200).json({ message: 'Emails stored successfully' });
//     });
//   });

app.post('/campaign/emails', (req, res) => {
    const { camp_id, camp_user_email } = req.body;

    // Split the camp_user_emails string into an array of individual email addresses
    const emails = camp_user_email.split(',').map(email => email.trim());

    // Check if the emails are already registered in the users table
    const checkEmailsQuery = 'SELECT email FROM users WHERE email IN (?)';

    db.query(checkEmailsQuery, [emails], (checkError, checkResult) => {
        if (checkError) {
            console.error('Error checking emails:', checkError);
            return res.status(500).json({ message: 'Failed to check emails' });
        }

        const registeredEmails = checkResult.map(row => row.email);

        const unregisteredEmails = emails.filter(email => !registeredEmails.includes(email));

        if (unregisteredEmails.length > 0) {
            console.log('Unregistered emails:', unregisteredEmails);
            return res.status(400).json({ message: 'Unregistered emails found', unregistered: unregisteredEmails });
        }

        // Store the emails in the campaign_user table
        const storeEmailsQuery = 'INSERT INTO campaign_user (camp_id, camp_user_email) VALUES ?';
        const values = emails.map(email => [camp_id, email]);

        db.query(storeEmailsQuery, [values], (storeError, storeResult) => {
            if (storeError) {
                console.error('Error storing emails:', storeError);
                return res.status(500).json({ message: 'Failed to store emails' });
            }

            console.log('Emails stored successfully');
            return res.status(200).json({ message: 'Emails stored successfully' });
        });
    });
});

app.post('/campaign/initiate', (req, res) => {
    const { camp_id, camp_startdate, camp_enddate, camp_owner, camp_title } = req.body;

    // Check if camp_id exists in the campaign_user table
    const checkCampIdQuery = 'SELECT camp_id FROM campaign_user WHERE camp_id = ?';
    db.query(checkCampIdQuery, [camp_id], (checkError, checkResult) => {
        if (checkError) {
            console.error('Error checking camp_id:', checkError);
            return res.status(500).json({ message: 'Failed to check camp_id' });
        }

        if (checkResult.length === 0) {
            console.log('Campaign ID does not exist in campaign_user table');
            return res.status(400).json({ message: 'Campaign ID does not exist in campaign_user table' });
        }

        // Count the number of camp_users associated with the camp_id
        const countCampUsersQuery = 'SELECT COUNT(*) AS camp_user_email FROM campaign_user WHERE camp_id = ?';
        db.query(countCampUsersQuery, [camp_id], (countError, countResult) => {
            if (countError) {
                console.error('Error counting camp_user_email:', countError);
                return res.status(500).json({ message: 'Failed to count camp_user_email' });
            }

            const camp_users = countResult[0].camp_user_email;

            // Insert a new campaign into the campaigns table with camp_users count
            const insertQuery = 'INSERT INTO campaigns (camp_id, camp_startdate, camp_enddate, camp_owner, camp_title, camp_users, no_of_ideas) VALUES (?, ?, ?, ?, ?, ?, 0)';

            db.query(insertQuery, [camp_id, camp_startdate, camp_enddate, camp_owner, camp_title, camp_users], (error, result) => {
                if (error) {
                    console.error('Error initiating campaign:', error);
                    return res.status(500).json({ message: 'Failed to initiate campaign' });
                }

                console.log('Campaign initiated successfully');
                return res.status(200).json({ message: 'Campaign initiated successfully' });
            });
        });
    });
});



