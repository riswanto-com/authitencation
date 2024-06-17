const express = require('express');
const cors = require("cors");
const app = express();
require('dotenv').config({
    path: './.env'
});
global.__basedir = __dirname;
app.use(cors());
app.use(express.json({
    limit: '100mb'
}));
app.use(express.urlencoded({
    extended: true
}));
require('./src/routers')(app)
const PORT = process.env.APP_PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});