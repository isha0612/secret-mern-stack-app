require('dotenv').config();
require('./database/conn');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const authenticate = require('./middleware/authenticate.js');
const register = require('./controllers/register.js');
const login = require('./controllers/login.js');
const { get_secrets, post_secrets } = require('./controllers/secrets.js');
const forgetPassword = require('./controllers/forgetPassword.js');
const resetPassword = require('./controllers/resetPassword.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: function(origin, callback) {
        return callback(null, true);
    },
    credentials: true
}));
app.use(cookieParser());
app.use(helmet());

app.post('/register', register);
app.post('/login', login);
app.get('/secrets', authenticate, get_secrets);
app.post('/secrets', authenticate, post_secrets);
app.post('/forgot-password', forgetPassword);
app.post('/reset-password', authenticate, resetPassword);

app.listen(process.env.PORT, () => {
    console.log('Server running on port ', process.env.PORT);
});