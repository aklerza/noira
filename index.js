const express = require("express")
const mongoSanitize = require('express-mongo-sanitize');
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json(), cors());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(
    mongoSanitize({
      replaceWith: '_',
    }),
  );
  
require("dotenv").config()
require("./src/db/dbConnection")

app.get('/', (req, res) => {
    res.json({ message: 'Salam! aklerza`nın inkişaf etdirdiyi api-nin əsas səhifəsinə xoş gəldin. burada maraqlı bir şey yoxdur. əmin ol.' });
})

const router = require('./src/routers')
app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Server ${PORT} portu üzərindən yayımlanır.`);
})