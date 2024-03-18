const mongoose = require("mongoose");

const DB = process.env.DATABASE;
// const DB_LOCAL = process.env.DATABASE_LOCAL;

mongoose.connect(DB)
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.log(err);
    });
