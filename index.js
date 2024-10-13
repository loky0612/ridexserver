const express = require('express');
const app = express();
const db = require('./Database/mySql');

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://traveltrove:1234@cluster0.3md4l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('Connected to MongoDB'))
   .catch((err) => console.error('Error connecting to MongoDB', err));

app.use(express.json());
app.use('/',require('./routes/authRoutes'));

app.listen(8000,() => {
    console.log("Server Connected at port 8000");
    db.connect((err) => {
        if (err) throw err;
        console.log("DB connected sucessfully");
    })
})