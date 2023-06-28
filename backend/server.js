const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
// const bcrypt = require("bcrypt");
// const crypto = require('crypto');
const nodemailer = require("nodemailer");

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

app.post('/campaign/emails', (req, res) => {
    const { camp_id, camp_user_email, camp_user_role } = req.body;

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
        const storeEmailsQuery = 'INSERT INTO campaign_user (camp_id, camp_user_email, camp_user_role) VALUES ?';
        const values = emails.map(email => [camp_id, email, camp_user_role]);

        db.query(storeEmailsQuery, [values], (storeError, storeResult) => {
            if (storeError) {
                console.error('Error storing emails:', storeError);
                return res.status(500).json({ message: 'Failed to store emails' });
            }

            console.log('Emails stored successfully');

            // Send email invitations to the participants
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'jobpower14@gmail.com',
                    pass: 'xcsdbolaiymfadra'
                }
            });

            const mailOptionsI = {
                from: 'jobpower14@gmail.com',
                to: emails,
                subject: camp_user_role == 'I' ? "Welcome to Ideation Group" : camp_user_role == 'V' ? "Welcome to Voting Group" : "Welcome to Management Group",
                text: camp_user_role == 'I' ? "You are invited to participate in the campaign. We will send you the participation link as soon as the campaign is initiated." : camp_user_role == 'V' ? "You are invited to participate in the campaign. We will send you the participation link as soon as the campaign is initiated." : "You are invited to participate in the campaign. We will send you the participation link as soon as the campaign is initiated."
            };

            transporter.sendMail(mailOptionsI, (emailError, info) => {
                if (emailError) {
                    console.error('Error sending email invitations:', emailError);
                    return res.status(500).json({ message: 'Failed to send email invitations' });
                }

                console.log('Email invitations sent successfully');
                return res.status(200).json({ message: 'Emails stored and invitations sent successfully' });
            });
        });
    });
});

const crypto = require('crypto'); // Import the crypto module

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

                // Generate a unique token for the campaign
                const token = crypto.randomBytes(20).toString('hex');

                // Store the token, campaign ID, and end date in a separate table or database
                const storeLinkQuery = 'INSERT INTO campaign_links (token, campaign_id, end_date) VALUES (?, ?, ?)';
                db.query(storeLinkQuery, [token, camp_id, camp_enddate], (storeError, storeResult) => {
                    if (storeError) {
                        console.error('Error storing campaign link:', storeError);
                        return res.status(500).json({ message: 'Failed to store campaign link' });
                    }

                    // Create the link URL
                    const postIdeaURL = `http://localhost:3000/post-idea?token=${token}`;

                    console.log('Campaign initiated successfully');
                    console.log('Post-Idea URL:', postIdeaURL);

                    // Get the email addresses of users in the ideation group
                    const getUserEmailsQuery = 'SELECT camp_user_email FROM campaign_user WHERE camp_id = ? AND camp_user_role = "I"';
                    db.query(getUserEmailsQuery, [camp_id], (getEmailsError, getEmailsResult) => {
                        if (getEmailsError) {
                            console.error('Error retrieving user emails:', getEmailsError);
                            return res.status(500).json({ message: 'Failed to retrieve user emails' });
                        }

                        const emails = getEmailsResult.map(user => user.camp_user_email);

                        // Send email invitations to the participants
                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'jobpower14@gmail.com',
                                pass: 'xcsdbolaiymfadra'
                            }
                        });

                        const mailOptionsI = {
                            from: 'jobpower14@gmail.com',
                            to: emails.join(', '),
                            subject: 'Invitation to post your Idea',
                            text: `The campaign has been initiated and now you can post your ideas. Please click on this link: ${postIdeaURL}`
                        };

                        transporter.sendMail(mailOptionsI, (emailError, info) => {
                            if (emailError) {
                                console.error('Error sending email invitations:', emailError);
                                return res.status(500).json({ message: 'Failed to send email invitations' });
                            }

                            console.log('Email invitations sent successfully');
                            return res.status(200).json({ message: 'Emails stored and invitations sent successfully' });
                        });
                    });
                });
            });
        });
    });
});

