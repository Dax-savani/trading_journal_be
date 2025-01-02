require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/dbConfigSequelize');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const appRouter = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

sequelize.sync()
    .then(() => {
        console.log('Database synced');
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });

app.use('/', appRouter);

app.use('/', (req, res) => {
    return res.json({
        message: 'Welcome to the Trading Journal API!',
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
