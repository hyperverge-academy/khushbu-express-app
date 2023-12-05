const express = require('express')
const app = express()
const port = 3000

app.listen(3000, () => {
    console.log(`Example app listening on port ${port}`)
  })


const mw = require('./my-middleware.js')

app.use(mw({ option1: '1', option2: '2' }))