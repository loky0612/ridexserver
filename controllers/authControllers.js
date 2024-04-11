const db = require('../Database/mySql');

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "ridexcarrentals@gmail.com",
        pass: "dnsr vssl rvaw dmat",
    },
});


const test = (req, res) => {
    res.json("Test Working");
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({
                error: "Enter the Email and password",
            });
        }

        let sql = "SELECT * FROM users WHERE email = ?";
        db.query(sql, [email], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    error: 'Internal Server Error',
                });
            }

            if (result.length === 0) {
                return res.json({
                    error: "User does not exist",
                });
            }

            const user = result[0];

            if (user.password === password) {
                res.send(user);
                console.log("Login Successful:", user);
            } else {
                res.json({
                    error: "Username or password is incorrect",
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};

const addUser = (req, res) => {
    const { name, email, password, aadhar } = req.body;
    let sql = "INSERT into users (  name, email, password, aadhar ) VALUES (?,?,?,?)";
    let values = [name, email, password, aadhar];
    try {
        db.query(sql, values, (err) => {
            if (err) throw err;
            res.json("User added to DB Sucessfully")
            console.log("User added to DB sucessfully");
        })
    } catch (error) {
        console.log(error);
        res.json("Error occured while adding record");
    }
}


const changeStatus = (req, res) => {
    const { email, car, name, aadhar, carName } = req.body;
    try {
        let sql = `UPDATE users SET ${car} = 'verify' WHERE email = ?;`;
        db.query(sql, [email], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json("Error");
            };

            function generateTransactionID(length) {
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let transactionID = '';
                for (let i = 0; i < length; i++) {
                    const randomIndex = Math.floor(Math.random() * characters.length);
                    transactionID += characters[randomIndex];
                }
                return transactionID;
            }

            function getRandomArea() {
                const areas = [
                    "Adyar", 
                    "Anna Nagar", 
                    "T. Nagar", 
                    "Mylapore", 
                    "Velachery", 
                    "Nungambakkam", 
                    "Chrompet", 
                    "Guindy", 
                    "Tambaram", 
                    "Kodambakkam"
                ];
                const randomIndex = Math.floor(Math.random() * areas.length);
                return areas[randomIndex];
            }
            
            const area = getRandomArea();
            
            const sendto = email;
            const transactionID = generateTransactionID(10);
            const registrationSuccessMail = {
                from: {
                    name : 'Ridex Car Rentals',
                    address: "ridexcarrentals@gmail.com", 
                }, 
                to: sendto,
                subject: "Subject: Payment Successfull !",
                html:
                    "<p>Dear " +
                    name +
                    `,<br><br>We are excited to inform you that your rental registration for ${carName} is successfully completed and we received the payment !, and you are now officially a member of our Ridex Community! Welcome aboard!<br><br>Here is your Registraion Details: <br><br> Name: ${name}<br> Email : ${email}<br> Transaction ID : ${transactionID} <br> Aadhar Number : ${aadhar}<br>Venue: ${area}<br><br>If you have any questions, encounter any issues, or need assistance with anything related to Ridex Car Rentals, please feel free to reach out to our dedicated support team at <a href='mailto:ridexcarrentals@gmail.com'>ridexcarrentals@gmail.com</a>.<br><br>Warm regards,<br>Ridex Car Rentals</p>`
            };

            transporter.sendMail(registrationSuccessMail, (err, info) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Registration successful");
                    res.status(200).json("Status change success");
                }
            });
        });

    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error");
    }
};




module.exports = {
    test,
    loginUser,
    addUser,
    changeStatus
}
