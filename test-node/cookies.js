const express = require('express')
const cookieParser = require('cookie-parser')
const cookieValidator = require('./cookie')

const app = express()

async function validateCookies (req, res, next) {
  await cookieValidator(req.cookies)
  next()
}

app.use(cookieParser())

app.use(validateCookies)

// error handler
app.use((err, req, res, next) => {
  res.status(400).send(err.message)
})

app.get('/', (req, res) => {
    res.json({
        "firstname": 'khushbu',
        "lastname": 'kumari',
    })
})

app.listen(3000)