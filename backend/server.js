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

                // Get the email addresses of users in the voting and ideation groups
                const getVoterEmailsQuery = 'SELECT camp_user_email FROM campaign_user WHERE camp_id = ? AND camp_user_role = "V"';
                const getIdeatorEmailsQuery = 'SELECT camp_user_email FROM campaign_user WHERE camp_id = ? AND camp_user_role = "I"';

                db.query(getVoterEmailsQuery, [camp_id], (getVoterEmailsError, getVoterEmailsResult) => {
                    if (getVoterEmailsError) {
                        console.error('Error retrieving voter emails:', getVoterEmailsError);
                        return res.status(500).json({ message: 'Failed to retrieve voter emails' });
                    }

                    const voterEmails = getVoterEmailsResult.map((user) => user.camp_user_email);

                    db.query(getIdeatorEmailsQuery, [camp_id], (getIdeatorEmailsError, getIdeatorEmailsResult) => {
                        if (getIdeatorEmailsError) {
                            console.error('Error retrieving ideator emails:', getIdeatorEmailsError);
                            return res.status(500).json({ message: 'Failed to retrieve ideator emails' });
                        }

                        const ideatorEmails = getIdeatorEmailsResult.map((user) => user.camp_user_email);

                        // Generate a unique token for each email recipient and send email invitations
                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'jobpower14@gmail.com',
                                pass: 'xcsdbolaiymfadra',
                            },
                        });

                        voterEmails.forEach((email) => {
                            const token = crypto.randomBytes(20).toString('hex');

                            // Store the token, campaign ID, and end date in the campaign_links table
                            const storeLinkQuery = 'INSERT INTO campaign_links (token, campaign_id, end_date, email) VALUES (?, ?, ?, ?)';
                            db.query(storeLinkQuery, [token, camp_id, camp_enddate, email], (storeError, storeResult) => {
                                if (storeError) {
                                    console.error('Error storing campaign link:', storeError);
                                    return res.status(500).json({ message: 'Failed to store campaign link' });
                                }

                                const encodedCampTitle = encodeURIComponent(camp_title);

                                // Create the link URL with the token for the voting page
                                const voteURL = `http://localhost:3000/vote?token=${token}&camp_title=${encodedCampTitle}&camp_id=${camp_id}`;

                                const mailOptions = {
                                    from: 'jobpower14@gmail.com',
                                    to: email,
                                    subject: 'Invitation to Vote',
                                    text: `The campaign has been initiated, and you are invited to vote. Please click on this link: ${voteURL}`,
                                };

                                transporter.sendMail(mailOptions, (emailError, info) => {
                                    if (emailError) {
                                        console.error('Error sending email invitation:', emailError);
                                        return res.status(500).json({ message: 'Failed to send email invitation' });
                                    }
                                    console.log(`Vote invitation email sent successfully to ${email}`);
                                });
                            });
                        });

                        ideatorEmails.forEach((email) => {
                            const token = crypto.randomBytes(20).toString('hex');

                            // Store the token, campaign ID, and end date in the campaign_links table
                            const storeLinkQuery = 'INSERT INTO campaign_links (token, campaign_id, end_date, email) VALUES (?, ?, ?, ?)';
                            db.query(storeLinkQuery, [token, camp_id, camp_enddate, email], (storeError, storeResult) => {
                                if (storeError) {
                                    console.error('Error storing campaign link:', storeError);
                                    return res.status(500).json({ message: 'Failed to store campaign link' });
                                }

                                const encodedCampTitle = encodeURIComponent(camp_title);

                                // Create the link URL with the token for the ideation page
                                const postIdeaURL = `http://localhost:3000/post-idea?token=${token}&camp_title=${encodedCampTitle}&camp_id=${camp_id}`;

                                const mailOptions = {
                                    from: 'jobpower14@gmail.com',
                                    to: email,
                                    subject: 'Invitation to Post Idea',
                                    text: `The campaign has been initiated, and you can now post your ideas. Please click on this link: ${postIdeaURL}`,
                                };

                                transporter.sendMail(mailOptions, (emailError, info) => {
                                    if (emailError) {
                                        console.error('Error sending email invitation:', emailError);
                                        return res.status(500).json({ message: 'Failed to send email invitation' });
                                    }
                                    console.log(`Idea invitation email sent successfully to ${email}`);
                                });
                            });
                        });

                        console.log('Campaign initiated successfully');
                        return res.status(200).json({ message: 'Emails stored and invitations sent successfully' });
                    });
                });
            });
        });
    });
});


app.post('/ideas/:campaignId/:token', (req, res) => {
    const { idea_title, idea_summary, idea_description } = req.body;
    const campaignId = req.params.campaignId;
    const token = req.params.token;

    const sql = `SELECT email FROM campaign_links WHERE token = ? AND campaign_id = ?`;
    const values = [token, campaignId];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error retrieving email from the database: ' + err.stack);
            res.status(500).json({ error: 'Failed to retrieve email.' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'Invalid token or campaign ID.' });
            return;
        }

        const email = results[0].email;

        const insertSql = `INSERT INTO ideas (email, idea_title, idea_summary, idea_description, camp_id) VALUES (?, ?, ?, ?, ?)`;
        const insertValues = [email, idea_title, idea_summary, idea_description, campaignId];

        db.query(insertSql, insertValues, (insertErr, result) => {
            if (insertErr) {
                console.error('Error inserting the idea into the database: ' + insertErr.stack);
                res.status(500).json({ error: 'Failed to insert the idea.' });
                return;
            }

            res.status(201).json({ message: 'Idea posted successfully.' });
        });
    });
});

app.post('/ideas', (req, res) => {
    const { token } = req.query;

    db.query('SELECT campaign_id FROM campaign_links WHERE token = ?', [token], (error, linkResults) => {
        if (error) {
            console.error('Error fetching campaign link data from the database:', error);
            res.status(500).send('Internal Server Error');
        } else if (linkResults.length === 0) {
            res.status(404).send('Campaign link not found');
        } else {
            const campId = linkResults[0].campaign_id;

            // Fetch the ideas that have the associated camp_id
            db.query(
                'SELECT idea_title, idea_summary, idea_description FROM ideas WHERE camp_id = ?',
                [campId],
                (error, ideaResults) => {
                    if (error) {
                        console.error('Error fetching ideas data from the database:', error);
                        res.status(500).send('Internal Server Error');
                    } else {
                        res.json(ideaResults);
                    }
                }
            );
        }
    });
});


app.post('/ideas/voting', (req, res) => {
    const { votes } = req.body;
    const token = req.query.token;
    const camp_id = req.query.camp_id;

    const selectUserSql = 'SELECT email FROM campaign_links WHERE token = ?';
    const selectIdeaSql = 'SELECT id FROM ideas WHERE camp_id = ?';
    const selectVoteSql = 'SELECT id FROM vote WHERE idea_id = ? AND camp_id = ? AND email = ?';

    const insertSql = 'INSERT INTO vote (idea_id, camp_id, email, vote) VALUES (?, ?, ?, ?)';
    const updateSql = 'UPDATE vote SET vote = ? WHERE idea_id = ? AND camp_id = ? AND email = ?';

    db.query(selectUserSql, [token], (selectUserErr, selectUserResult) => {
        if (selectUserErr) {
            console.error('Error retrieving user information from the database: ' + selectUserErr.stack);
            res.status(500).json({ error: 'Failed to retrieve user information.' });
            return;
        }

        if (selectUserResult.length === 0) {
            res.status(404).json({ error: 'Invalid token.' });
            return;
        }

        const userEmail = selectUserResult[0].email;

        db.query(selectIdeaSql, [camp_id], (selectIdeaErr, selectIdeaResult) => {
            if (selectIdeaErr) {
                console.error('Error retrieving ideas from the database: ' + selectIdeaErr.stack);
                res.status(500).json({ error: 'Failed to retrieve ideas.' });
                return;
            }

            const ideas = selectIdeaResult.map((row) => row.id);

            if (ideas.length !== votes.length) {
                res.status(400).json({ error: 'Number of votes does not match the number of ideas.' });
                return;
            }

            const insertOrUpdateNextVote = (index) => {
                if (index >= votes.length) {
                    // All votes have been inserted or updated
                    res.status(201).json({ message: 'Votes inserted/updated successfully.' });
                    return;
                }

                const vote = votes[index];
                const ideaId = ideas[index];

                db.query(
                    selectVoteSql,
                    [ideaId, camp_id, userEmail],
                    (selectVoteErr, selectVoteResult) => {
                        if (selectVoteErr) {
                            console.error('Error retrieving vote from the database: ' + selectVoteErr.stack);
                            res.status(500).json({ error: 'Failed to retrieve vote.' });
                            return;
                        }

                        if (selectVoteResult.length === 0) {
                            // Insert new vote
                            db.query(
                                insertSql,
                                [ideaId, camp_id, userEmail, vote],
                                (insertErr, insertResult) => {
                                    if (insertErr) {
                                        console.error('Error inserting vote into the database: ' + insertErr.stack);
                                        res.status(500).json({ error: 'Failed to insert vote.' });
                                        return;
                                    }

                                    insertOrUpdateNextVote(index + 1);
                                }
                            );
                        } else {
                            // Update existing vote
                            const voteId = selectVoteResult[0].id;

                            db.query(
                                updateSql,
                                [vote, ideaId, camp_id, userEmail],
                                (updateErr, updateResult) => {
                                    if (updateErr) {
                                        console.error('Error updating vote in the database: ' + updateErr.stack);
                                        res.status(500).json({ error: 'Failed to update vote.' });
                                        return;
                                    }

                                    insertOrUpdateNextVote(index + 1);
                                }
                            );
                        }
                    }
                );
            };

            insertOrUpdateNextVote(0);
        });
    });
});
