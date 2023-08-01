const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());


const sessionStore = new MySQLStore({
    host: "localhost",
    user: "root",
    password: "",
    database: "ideation_portal",
    clearExpired: true,
    checkExpirationInterval: 900000, // 15 minutes
});
app.use(
    session({
        secret: "your-secret-key",
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 86400000, // 1 day
        },
    })
);

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ideation_portal",
});

app.listen(8081, () => {
    console.log("Listening to port 8081!");
});

app.post('/username', (req, res) => {
    const email = req.body.email;
    console.log(email)
    const sql = "SELECT name, role FROM users WHERE email = ?";

    db.query(sql, [email], (err, data) => {
        if (err) {
            return res.json("Error");
        }

        if (data.length > 0) {
            const name = data[0].name;
            const role = data[0].role;
            // console.log(name)
            return res.json({ name, role });
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
            // Store user name in the session
            req.session.userName = data[0].name;
            req.session.userRole = data[0].role;
            console.log(req.session.userName, req.session.userRole);
            console.log('Entire Response Data:', data[0]);

            return res.json('Success');
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
            return res.status(200).json({ message: 'Emails stored successfully' });
        });
    });
});

const crypto = require('crypto');
app.post('/campaign/initiate', (req, res) => {
    console.log('Received request to initiate campaign:', req.body); 
    const { camp_id, camp_startdate, camp_enddate, vote_enddate, manage_enddate, camp_owner, camp_title } = req.body;

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
            const insertQuery = 'INSERT INTO campaigns (camp_id, camp_startdate, camp_enddate, vote_enddate, manage_enddate, camp_owner, camp_title, camp_users, no_of_ideas) VALUES (?, ?, ?,?,?, ?, ?, ?, 0)';

            db.query(insertQuery, [camp_id, camp_startdate, camp_enddate, vote_enddate, manage_enddate, camp_owner, camp_title, camp_users], (error, result) => {
                if (error) {
                    console.error('Error initiating campaign:', error);
                    return res.status(500).json({ message: 'Failed to initiate campaign' });
                }

                // Get the email addresses of users in the voting, ideation, and management groups
                const getVoterEmailsQuery = 'SELECT camp_user_email FROM campaign_user WHERE camp_id = ? AND camp_user_role = "V"';
                const getIdeatorEmailsQuery = 'SELECT camp_user_email FROM campaign_user WHERE camp_id = ? AND camp_user_role = "I"';
                const getManagementEmailsQuery = 'SELECT camp_user_email FROM campaign_user WHERE camp_id = ? AND camp_user_role = "M"';

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

                        db.query(getManagementEmailsQuery, [camp_id], (getManagementEmailsError, getManagementEmailsResult) => {
                            if (getManagementEmailsError) {
                                console.error('Error retrieving management emails:', getManagementEmailsError);
                                return res.status(500).json({ message: 'Failed to retrieve management emails' });
                            }

                            const managementEmails = getManagementEmailsResult.map((user) => user.camp_user_email);

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
                                db.query(storeLinkQuery, [token, camp_id, manage_enddate, email], (storeError, storeResult) => {
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
                                        html: `<h3>Hello,</h3>
                                        <p>The campaign "${camp_title}" has been initiated, and you are invited to vote.</p>
                                        <p>Please click on the link below to access the page:</p>
                                        <a href="${voteURL}">Click Here</a>
                                        <p>The end date for this group is ${vote_enddate}. Please ensure to complete your tasks before this date.</p>
                                        <p>Thank you</p>`,
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
                                db.query(storeLinkQuery, [token, camp_id, manage_enddate, email], (storeError, storeResult) => {
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
                                        html: `<h3>Hello,</h3>
                                        <p>The campaign "${camp_title}" has been initiated, and you are invited to post your ideas.</p>
                                        <p>Please click on the link below to access the page:</p>
                                        <a href="${postIdeaURL}">Click Here</a>
                                        <p>The end date for this group is ${camp_enddate}. Please ensure to complete your tasks before this date.</p>
                                        <p>Thank you</p>`,
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

                            managementEmails.forEach((email) => {
                                const token = crypto.randomBytes(20).toString('hex');

                                // Store the token, campaign ID, and end date in the campaign_links table
                                const storeLinkQuery = 'INSERT INTO campaign_links (token, campaign_id, end_date, email) VALUES (?, ?, ?, ?)';
                                db.query(storeLinkQuery, [token, camp_id, manage_enddate, email], (storeError, storeResult) => {
                                    if (storeError) {
                                        console.error('Error storing campaign link:', storeError);
                                        return res.status(500).json({ message: 'Failed to store campaign link' });
                                    }

                                    const encodedCampTitle = encodeURIComponent(camp_title);

                                    // Create the link URL with the token for the management page
                                    const managementURL = `http://localhost:3000/management?token=${token}&camp_title=${encodedCampTitle}&camp_id=${camp_id}`;

                                    const mailOptions = {
                                        from: 'jobpower14@gmail.com',
                                        to: email,
                                        subject: 'Invitation to Management',
                                        html: `<h3>Hello,</h3>
                                        <p>The campaign "${camp_title}" has been initiated, and you are invited to select the ideas from the top voted ideas.</p>
                                        <p>Please click on the link below to access the page:</p>
                                        <a href="${managementURL}">Click Here</a>
                                        <p>The end date for this group is ${manage_enddate}. Please ensure to complete your tasks before this date.</p>
                                        <p>Thank you</p>`,
                                    };

                                    transporter.sendMail(mailOptions, (emailError, info) => {
                                        if (emailError) {
                                            console.error('Error sending email invitation:', emailError);
                                            return res.status(500).json({ message: 'Failed to send email invitation' });
                                        }
                                        console.log(`Management invitation email sent successfully to ${email}`);
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
    const { camp_id } = req.query;

    // Fetch the ideas that have the associated camp_id
    db.query(
        'SELECT idea_title, idea_summary, idea_description FROM ideas WHERE camp_id = ?',
        [camp_id],
        (error, ideaResults) => {
            if (error) {
                console.error('Error fetching ideas data from the database:', error);
                res.status(500).send('Internal Server Error');
            } else {
                res.json(ideaResults);
            }
        }
    );
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
    const calculateAverageSql = 'SELECT idea_id, AVG(vote) AS average_vote FROM vote WHERE camp_id = ? GROUP BY idea_id';

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

                    // Calculate average vote for each idea
                    db.query(calculateAverageSql, [camp_id], (calculateAverageErr, calculateAverageResult) => {
                        if (calculateAverageErr) {
                            console.error('Error calculating average vote:', calculateAverageErr);
                            res.status(500).json({ error: 'Failed to calculate average vote.' });
                            return;
                        }

                        // Update the ideas table with the calculated average vote
                        calculateAverageResult.forEach((averageVote) => {
                            const { idea_id, average_vote } = averageVote;
                            db.query(
                                'UPDATE ideas SET votes = ? WHERE id = ?',
                                [average_vote, idea_id],
                                (updateErr, updateResult) => {
                                    if (updateErr) {
                                        console.error('Error updating idea with average vote:', updateErr);
                                    }
                                }
                            );
                        });

                        res.status(201).json({ message: 'Votes inserted/updated successfully.' });
                    });

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


app.post('/ideas/ideaId', (req, res) => {
    const camp_id = req.query.camp_id;

    const selectIdeaIdSql = 'SELECT id FROM ideas WHERE camp_id = ? ORDER BY id';

    db.query(selectIdeaIdSql, [camp_id], (selectIdeaIdErr, selectIdeaIdResult) => {
        if (selectIdeaIdErr) {
            console.error('Error retrieving ideaId from the database:', selectIdeaIdErr);
            res.status(500).json({ error: 'Failed to retrieve ideaId.' });
            return;
        }

        if (selectIdeaIdResult.length === 0) {
            res.status(404).json({ error: 'No ideas found for the given camp_id.' });
            return;
        }

        const ideaIds = selectIdeaIdResult.map((row) => row.id);
        res.status(200).json({ ideaIds });
    });
});

app.post('/ideas/ideaContent', (req, res) => {
    const ideaId = req.query.idea_id;

    const selectIdeaContentSql = 'SELECT idea_title, idea_summary, idea_description FROM ideas WHERE id = ?';

    db.query(selectIdeaContentSql, [ideaId], (selectIdeaContentErr, selectIdeaContentResult) => {
        if (selectIdeaContentErr) {
            console.error('Error retrieving idea content from the database:', selectIdeaContentErr);
            res.status(500).json({ error: 'Failed to retrieve idea content.' });
            return;
        }

        if (selectIdeaContentResult.length === 0) {
            res.status(404).json({ error: 'No idea found for the given idea ID.' });
            return;
        }

        const ideaContent = selectIdeaContentResult[0];
        res.status(200).json({ ideaContent });
    });
});

app.post('/ideas/topVoted', (req, res) => {
    const camp_id = req.body.camp_id;

    const selectIdeasSql = 'SELECT id, idea_title, idea_summary, idea_description, votes FROM ideas WHERE camp_id = ? ORDER BY votes DESC LIMIT 10';

    db.query(selectIdeasSql, [camp_id], (selectIdeasErr, selectIdeasResult) => {
        if (selectIdeasErr) {
            console.error('Error retrieving top voted ideas from the database:', selectIdeasErr);
            res.status(500).json({ error: 'Failed to retrieve top voted ideas.' });
            return;
        }

        res.status(200).json({ ideas: selectIdeasResult });
    });
});

app.post('/ideas/selectedIdeas', (req, res) => {
    const { token, ideas, camp_id } = req.body;
    // const camp_id = req.query.camp_id;

    // Verify the email from the token
    const selectUserSql = 'SELECT email FROM campaign_links WHERE token = ?';
    db.query(selectUserSql, [token], (selectUserErr, selectUserResult) => {
        if (selectUserErr) {
            console.error('Error retrieving user information from the database:', selectUserErr);
            res.status(500).json({ error: 'Failed to retrieve user information.' });
            return;
        }

        if (selectUserResult.length === 0) {
            res.status(404).json({ error: 'Invalid token.' });
            return;
        }

        const userEmail = selectUserResult[0].email;

        // Store the selected ideas
        const insertSql = 'INSERT INTO selected_ideas (idea_id, camp_id, email) VALUES ?';
        const values = ideas.map(ideaId => [ideaId, camp_id, userEmail]);

        db.query(insertSql, [values], (insertErr, insertResult) => {
            if (insertErr) {
                console.error('Error inserting selected ideas into the database:', insertErr);
                res.status(500).json({ error: 'Failed to insert selected ideas.' });
                return;
            }

            res.status(200).json({ message: 'Selected ideas stored successfully.' });
        });
    });
});

app.post('/get-user-details', (req, res) => {
    const { name } = req.body;

    const selectUserSql = 'SELECT email, role FROM users WHERE name = ?';
    const selectIdeasCountSql = 'SELECT COUNT(*) AS ideas_count FROM ideas WHERE email = ?';
    const selectVotesCountSql = 'SELECT COUNT(*) AS votes_count FROM vote WHERE email = ?';
    const selectCampaignsCountSql = 'SELECT COUNT(DISTINCT camp_id) AS campaigns_count FROM campaign_user WHERE camp_user_email = ?';

    db.query(selectUserSql, [name], (selectUserErr, selectUserResult) => {
        if (selectUserErr) {
            console.error('Error retrieving user details from the database:', selectUserErr);
            res.status(500).json({ error: 'Failed to retrieve user details.' });
            return;
        }

        if (selectUserResult.length === 0) {
            res.status(404).json({ error: 'User not found.' });
            return;
        }

        const user = selectUserResult[0];
        const userEmail = user.email; // Get the user's email from the query result
        const userRole = user.role; // Get the user's role from the query result

        // Check if the user has a role as "admin"
        if (userRole == 'user') {
            // Fetch the number of ideas posted by the user
            db.query(selectIdeasCountSql, [userEmail], (selectIdeasErr, selectIdeasResult) => {
                if (selectIdeasErr) {
                    console.error('Error retrieving ideas count from the database:', selectIdeasErr);
                    res.status(500).json({ error: 'Failed to retrieve ideas count.' });
                    return;
                }

                const ideasCount = selectIdeasResult[0].ideas_count;

                // Fetch the number of times the user has voted
                db.query(selectVotesCountSql, [userEmail], (selectVotesErr, selectVotesResult) => {
                    if (selectVotesErr) {
                        console.error('Error retrieving votes count from the database:', selectVotesErr);
                        res.status(500).json({ error: 'Failed to retrieve votes count.' });
                        return;
                    }

                    const votesCount = selectVotesResult[0].votes_count;

                    // Fetch the number of campaigns created by the user
                    db.query(selectCampaignsCountSql, [userEmail], (selectCampaignsErr, selectCampaignsResult) => {
                        if (selectCampaignsErr) {
                            console.error('Error retrieving campaigns count from the database:', selectCampaignsErr);
                            res.status(500).json({ error: 'Failed to retrieve campaigns count.' });
                            return;
                        }

                        const campaignsCount = selectCampaignsResult[0].campaigns_count;

                        // Combine all the details and send as the response
                        const userDetails = {
                            ...user,
                            ideas_count: ideasCount,
                            votes_count: votesCount,
                            campaigns_count: campaignsCount,
                        };

                        res.status(200).json(userDetails);
                    });
                });
            })
        } else {
            // Fetch the number of ideas posted by the user
            db.query(selectIdeasCountSql, [userEmail], (selectIdeasErr, selectIdeasResult) => {
                if (selectIdeasErr) {
                    console.error('Error retrieving ideas count from the database:', selectIdeasErr);
                    res.status(500).json({ error: 'Failed to retrieve ideas count.' });
                    return;
                }

                const ideasCount = selectIdeasResult[0].ideas_count;

                // Fetch the number of times the user has voted
                db.query(selectVotesCountSql, [userEmail], (selectVotesErr, selectVotesResult) => {
                    if (selectVotesErr) {
                        console.error('Error retrieving votes count from the database:', selectVotesErr);
                        res.status(500).json({ error: 'Failed to retrieve votes count.' });
                        return;
                    }

                    const votesCount = selectVotesResult[0].votes_count;

                    // Fetch the number of campaigns created by the user
                    db.query(selectCampaignsCountSql, [userEmail], (selectCampaignsErr, selectCampaignsResult) => {
                        if (selectCampaignsErr) {
                            console.error('Error retrieving campaigns count from the database:', selectCampaignsErr);
                            res.status(500).json({ error: 'Failed to retrieve campaigns count.' });
                            return;
                        }

                        const campaignsCount = selectCampaignsResult[0].campaigns_count;

                        // Combine all the details and send as the response
                        const userDetails = {
                            ...user,
                            ideas_count: ideasCount,
                            votes_count: votesCount,
                            campaigns_count: campaignsCount,
                        };

                        res.status(200).json(userDetails);
                    });
                });
            });
        }
    });
});


app.post('/get-user-campaigns', (req, res) => {
    const { name } = req.body;

    const selectUserSql = 'SELECT email, role FROM users WHERE name = ?';
    const selectUserCampaignsSql = `
      SELECT cu.camp_id, c.camp_startdate, c.manage_enddate, c.camp_owner, c.camp_title, c.camp_users
      FROM campaign_user cu
      INNER JOIN campaigns c ON cu.camp_id = c.camp_id
      WHERE cu.camp_user_email = ?
      ORDER BY c.camp_startdate DESC;  -- Latest campaigns on top
    `;

    db.query(selectUserSql, [name], (selectUserErr, selectUserResult) => {
        if (selectUserErr) {
            console.error('Error retrieving user details from the database:', selectUserErr);
            res.status(500).json({ error: 'Failed to retrieve user details.' });
            return;
        }

        if (selectUserResult.length === 0) {
            res.status(404).json({ error: 'User not found.' });
            return;
        }

        const user = selectUserResult[0];
        const userEmail = user.email; // Get the user's email from the query result
        const userRole = user.role; // Get the user's role from the query result

        if (userRole === 'admin') {
            // If the user is an admin, retrieve details of all campaigns
            const selectAllCampaignsSql = `
              SELECT camp_id, camp_startdate, manage_enddate, camp_owner, camp_title, camp_users
              FROM campaigns
              ORDER BY camp_startdate DESC;  -- Latest campaigns on top
            `;

            db.query(selectAllCampaignsSql, (selectAllCampaignsErr, selectAllCampaignsResult) => {
                if (selectAllCampaignsErr) {
                    console.error('Error retrieving all campaigns from the database:', selectAllCampaignsErr);
                    res.status(500).json({ error: 'Failed to retrieve all campaigns.' });
                    return;
                }

                if (selectAllCampaignsResult.length === 0) {
                    res.status(404).json({ error: 'No campaigns found.' });
                    return;
                }

                // Send details of all campaigns as the response
                res.status(200).json(selectAllCampaignsResult);
            });
        } else {
            // If the user is not an admin, continue with the original query to retrieve user campaigns
            db.query(selectUserCampaignsSql, [userEmail], (selectCampaignsErr, selectCampaignsResult) => {
                if (selectCampaignsErr) {
                    console.error('Error retrieving user campaigns from the database:', selectCampaignsErr);
                    res.status(500).json({ error: 'Failed to retrieve user campaigns.' });
                    return;
                }

                if (selectCampaignsResult.length === 0) {
                    res.status(404).json({ error: 'User did not participate in any campaigns.' });
                    return;
                }

                // Send the campaign details as the response
                res.status(200).json(selectCampaignsResult);
            });
        }
    });
});

app.post('/get-user-idea', (req, res) => {
    const { name } = req.body;

    const selectUserSql = 'SELECT email, role FROM users WHERE name = ?';
    const selectUserCampaignsSql = `
      SELECT cu.camp_id, c.camp_startdate, c.camp_enddate, c.camp_owner, c.camp_title
      FROM campaign_user cu
      INNER JOIN campaigns c ON cu.camp_id = c.camp_id
      WHERE cu.camp_user_email = ? AND cu.camp_user_role = 'I';
    `;

    db.query(selectUserSql, [name], (selectUserErr, selectUserResult) => {
        if (selectUserErr) {
            console.error('Error retrieving user details from the database:', selectUserErr);
            res.status(500).json({ error: 'Failed to retrieve user details.' });
            return;
        }

        if (selectUserResult.length === 0) {
            res.status(404).json({ error: 'User not found.' });
            return;
        }

        const user = selectUserResult[0];
        const userEmail = user.email; // Get the user's email from the query result
        const userRole = user.role;

        if (userRole === 'admin') {
            const selectAllIdeas = `
            SELECT camp_id, camp_startdate, camp_enddate, camp_owner, camp_title
            FROM campaigns
            ORDER BY camp_startdate DESC;
            `;

            db.query(selectAllIdeas, (selectAllIdeasErr, selectAllIdeasResult) => {
                if (selectAllIdeasErr) {
                    console.error('Error retrieving all campaigns from the database:', selectAllIdeasErr);
                    res.status(500).json({ error: 'Failed to retrieve all campaigns.' });
                    return;
                }

                if (selectAllIdeasResult.length === 0) {
                    res.status(404).json({ error: 'No campaigns found.' });
                    return;
                }

                // Send details of all campaigns as the response
                res.status(200).json(selectAllIdeasResult);
            })

        } else {
            // Fetch the campaigns in which the user participated as an Ideator
            db.query(selectUserCampaignsSql, [userEmail], (selectCampaignsErr, selectCampaignsResult) => {
                if (selectCampaignsErr) {
                    console.error('Error retrieving user campaigns from the database:', selectCampaignsErr);
                    res.status(500).json({ error: 'Failed to retrieve user campaigns.' });
                    return;
                }

                if (selectCampaignsResult.length === 0) {
                    res.status(404).json({ error: 'User did not participate in any campaigns as an Ideator.' });
                    return;
                }

                // Store unique campaign details based on camp_id
                const uniqueCampaignsMap = {};

                selectCampaignsResult.forEach((campaign) => {
                    if (!uniqueCampaignsMap[campaign.camp_id]) {
                        uniqueCampaignsMap[campaign.camp_id] = campaign;
                    }
                });

                // Convert the object back to an array of unique campaigns
                const uniqueCampaigns = Object.values(uniqueCampaignsMap);

                // Send the campaign details as the response
                res.status(200).json(uniqueCampaigns);
            });
        }
    });
});

app.post('/get-user-vote', (req, res) => {
    const { name } = req.body;

    const selectUserSql = 'SELECT email, role FROM users WHERE name = ?';
    const selectUserCampaignsSql = `
      SELECT cu.camp_id, c.camp_enddate, c.vote_enddate, c.camp_owner, c.camp_title
      FROM campaign_user cu
      INNER JOIN campaigns c ON cu.camp_id = c.camp_id
      WHERE cu.camp_user_email = ? AND cu.camp_user_role = 'V';
    `;

    db.query(selectUserSql, [name], (selectUserErr, selectUserResult) => {
        if (selectUserErr) {
            console.error('Error retrieving user details from the database:', selectUserErr);
            res.status(500).json({ error: 'Failed to retrieve user details.' });
            return;
        }

        if (selectUserResult.length === 0) {
            res.status(404).json({ error: 'User not found.' });
            return;
        }

        const user = selectUserResult[0];
        const userEmail = user.email;
        const userRole = user.role;

        if (userRole === 'admin') {
            const selectAllVotes = `
            SELECT camp_id, camp_enddate, vote_enddate, camp_owner, camp_title
            FROM campaigns
            ORDER BY camp_enddate DESC;
            `;

            db.query(selectAllVotes, (selectAllVotesErr, selectAllVotesResult) => {
                if (selectAllVotesErr) {
                    console.error('Error retrieving all campaigns from the database:', selectAllVotesErr);
                    res.status(500).json({ error: 'Failed to retrieve all campaigns.' });
                    return;
                }

                if (selectAllVotesResult.length === 0) {
                    res.status(404).json({ error: 'No campaigns found.' });
                    return;
                }

                // Send details of all campaigns as the response
                res.status(200).json(selectAllVotesResult);
            })
        } else {
            // Fetch the campaigns in which the user participated as an Ideator
            db.query(selectUserCampaignsSql, [userEmail], (selectCampaignsErr, selectCampaignsResult) => {
                if (selectCampaignsErr) {
                    console.error('Error retrieving user campaigns from the database:', selectCampaignsErr);
                    res.status(500).json({ error: 'Failed to retrieve user campaigns.' });
                    return;
                }

                if (selectCampaignsResult.length === 0) {
                    res.status(404).json({ error: 'User did not participate in any campaigns as an Ideator.' });
                    return;
                }

                // Store unique campaign details based on camp_id
                const uniqueCampaignsMap = {};

                selectCampaignsResult.forEach((campaign) => {
                    if (!uniqueCampaignsMap[campaign.camp_id]) {
                        uniqueCampaignsMap[campaign.camp_id] = campaign;
                    }
                });

                // Convert the object back to an array of unique campaigns
                const uniqueCampaigns = Object.values(uniqueCampaignsMap);

                // Send the campaign details as the response
                res.status(200).json(uniqueCampaigns);
            });
        }
    });
});

app.post('/get-user-manage', (req, res) => {
    const { name } = req.body;

    const selectUserSql = 'SELECT email, role FROM users WHERE name = ?';
    const selectUserCampaignsSql = `
      SELECT cu.camp_id, c.vote_enddate, c.manage_enddate, c.camp_owner, c.camp_title
      FROM campaign_user cu
      INNER JOIN campaigns c ON cu.camp_id = c.camp_id
      WHERE cu.camp_user_email = ? AND cu.camp_user_role = 'M';
    `;

    db.query(selectUserSql, [name], (selectUserErr, selectUserResult) => {
        if (selectUserErr) {
            console.error('Error retrieving user details from the database:', selectUserErr);
            res.status(500).json({ error: 'Failed to retrieve user details.' });
            return;
        }

        if (selectUserResult.length === 0) {
            res.status(404).json({ error: 'User not found.' });
            return;
        }

        const user = selectUserResult[0];
        const userEmail = user.email; // Get the user's email from the query result
        const userRole = user.role;

        if (userRole === 'admin') {
            const selectAllVotes = `
            SELECT camp_id, vote_enddate, manage_enddate, camp_owner, camp_title
            FROM campaigns
            ORDER BY vote_enddate DESC;
            `;

            db.query(selectAllVotes, (selectAllVotesErr, selectAllVotesResult) => {
                if (selectAllVotesErr) {
                    console.error('Error retrieving all campaigns from the database:', selectAllVotesErr);
                    res.status(500).json({ error: 'Failed to retrieve all campaigns.' });
                    return;
                }

                if (selectAllVotesResult.length === 0) {
                    res.status(404).json({ error: 'No campaigns found.' });
                    return;
                }

                // Send details of all campaigns as the response
                res.status(200).json(selectAllVotesResult);
            })
        } else {
            // Fetch the campaigns in which the user participated as an Ideator
            db.query(selectUserCampaignsSql, [userEmail], (selectCampaignsErr, selectCampaignsResult) => {
                if (selectCampaignsErr) {
                    console.error('Error retrieving user campaigns from the database:', selectCampaignsErr);
                    res.status(500).json({ error: 'Failed to retrieve user campaigns.' });
                    return;
                }

                if (selectCampaignsResult.length === 0) {
                    res.status(404).json({ error: 'User did not participate in any campaigns as an Ideator.' });
                    return;
                }

                // Store unique campaign details based on camp_id
                const uniqueCampaignsMap = {};

                selectCampaignsResult.forEach((campaign) => {
                    if (!uniqueCampaignsMap[campaign.camp_id]) {
                        uniqueCampaignsMap[campaign.camp_id] = campaign;
                    }
                });

                // Convert the object back to an array of unique campaigns
                const uniqueCampaigns = Object.values(uniqueCampaignsMap);

                // Send the campaign details as the response
                res.status(200).json(uniqueCampaigns);
            });
        }
    });
});

app.post('/get-campaign-token', (req, res) => {
    const { name, camp_id } = req.body;

    // Fetch the email ID based on the provided username
    const selectUserSql = 'SELECT email FROM users WHERE name = ?';
    db.query(selectUserSql, [name], (selectUserErr, selectUserResult) => {
        if (selectUserErr) {
            console.error('Error retrieving user details from the database:', selectUserErr);
            res.status(500).json({ error: 'Failed to retrieve user details.' });
            return;
        }

        if (selectUserResult.length === 0) {
            res.status(404).json({ error: 'User not found.' });
            return;
        }

        const user = selectUserResult[0];
        const userEmail = user.email; // Get the user's email from the query result

        // Fetch the token from the campaign_link table based on camp_id and email
        const selectCampaignTokenSql = 'SELECT token FROM campaign_links WHERE campaign_id = ? AND email = ?';
        db.query(selectCampaignTokenSql, [camp_id, userEmail], (selectTokenErr, selectTokenResult) => {
            if (selectTokenErr) {
                console.error('Error retrieving campaign token from the database:', selectTokenErr);
                res.status(500).json({ error: 'Failed to retrieve campaign token.' });
                return;
            }

            if (selectTokenResult.length === 0) {
                res.status(404).json({ error: 'Campaign token not found for the given camp_id and user email.' });
                return;
            }

            const token = selectTokenResult[0].token;

            // Send the token as the response
            res.status(200).json({ token });
        });
    });
});

app.post('/fetch-user-votes', (req, res) => {
    const token = req.query.token;

    // Check if the token exists and is valid
    if (!token) {
        return res.status(400).json({ error: 'Token is missing in the request.' });
    }

    const getUserSql = 'SELECT * FROM campaign_links WHERE token = ?';
    db.query(getUserSql, [token], (getUserErr, userResults) => {
        if (getUserErr) {
            console.error('Error executing user query:', getUserErr);
            return res.status(500).json({ error: 'Error retrieving user data.' });
        }

        // Check if the user with the provided token exists
        if (userResults.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const user = userResults[0].email;
        const camp_id = userResults[0].campaign_id
        console.log(user)
        console.log(camp_id)

        // Fetch votes from the "votes" table for the user based on their user_id
        const userVotesSql = 'SELECT vote, idea_id FROM vote WHERE email = ? AND camp_id = ?';
        db.query(userVotesSql, [user, camp_id], (userVotesErr, userVotesResults) => {
            if (userVotesErr) {
                console.error('Error executing user votes query:', userVotesErr);
                return res.status(500).json({ error: 'Error retrieving user votes.' });
            }

            // If there are no votes for this user, you can return an empty array
            return res.status(200).json({ userVotesResults });
        });
    });
});

app.post('/fetch-user-selectedideas', (req, res) => {
    const token = req.query.token;

    // Check if the token exists and is valid
    if (!token) {
        return res.status(400).json({ error: 'Token is missing in the request.' });
    }

    const getUserSql = 'SELECT * FROM campaign_links WHERE token = ?';
    db.query(getUserSql, [token], (getUserErr, userResults) => {
        if (getUserErr) {
            console.error('Error executing user query:', getUserErr);
            return res.status(500).json({ error: 'Error retrieving user data.' });
        }

        // Check if the user with the provided token exists
        if (userResults.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const user = userResults[0].email;
        const camp_id = userResults[0].campaign_id
        console.log(user)
        console.log(camp_id)

        // Fetch votes from the "votes" table for the user based on their user_id
        const userVotesSql = 'SELECT idea_id FROM selected_ideas WHERE email = ? AND camp_id = ?';
        db.query(userVotesSql, [user, camp_id], (userVotesErr, userVotesResults) => {
            if (userVotesErr) {
                console.error('Error executing user votes query:', userVotesErr);
                return res.status(500).json({ error: 'Error retrieving user votes.' });
            }

            // If there are no votes for this user, you can return an empty array
            return res.status(200).json({ userVotesResults });
        });
    });
});