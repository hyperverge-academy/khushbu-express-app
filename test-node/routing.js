const express = require('express')
const app = express()

// respond with "hello world" when a GET request is made to the homepage
// app.get('/', (req, res) => {
//   res.send('hello world')
// })

app.listen(3000, () => {
    console.log(`Example app listening on port.`)
})


//Route methods

// GET method route
// app.get('/', (req, res) => {
//     res.send('GET request to the homepage')
//   })
  
// POST method route
app.post('/', (req, res) => {
  res.send('POST request to the homepage')
})

  
app.all('/secret', (req, res, next) => {
  res.send('testing all methods.')
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})


//Route paths
  
// app.get('/', (req, res) => {
//   res.send('root')
// })

  
// app.get('/about', (req, res) => {
//   res.send('about')
// })

  
// app.get('/random.text', (req, res) => {
//   res.send('random.text')
// })
 
 
// app.get('/ab*cd', (req, res) => {
//   res.send('ab*cd')
// })


//Route parameters

// app.get('/users/:userId/books/:bookId', (req, res) => {
//   res.send(req.params)
// })

// app.get('/flights/:from-:to', (req, res) => {
//   res.send(req.params)
// })
  

//Route handlers

//A single callback function can handle a route. For example:
// app.get('/example/a', (req, res) => {
//   res.send('Hello from A!')
// })

//More than one callback function can handle a route (make sure you specify the next object). For example:
// app.get('/example/b', (req, res, next) => {
//   console.log('the response will be sent by the next function ...')
//   next()
// }, (req, res) => {
//   res.send('Hello from B!')
// })


//An array of callback functions can handle a route. For example:

// const cb0 = function (req, res, next) {
//   console.log('CB0')
//   next()
// }

// const cb1 = function (req, res, next) {
//   console.log('CB1')
//   next()
// }

// const cb2 = function (req, res) {
//   res.send('Hello from C!')
// }

// app.get('/example/c', [cb0, cb1, cb2])


//A combination of independent functions and arrays of functions can handle a route. For example:

// const cb0 = function (req, res, next) {
//   console.log('CB0')
//   next()
// }

// const cb1 = function (req, res, next) {
//   console.log('CB1')
//   next()
// }

// app.get('/example/d', [cb0, cb1], (req, res, next) => {
//   console.log('the response will be sent by the next function ...')
//   next()
// }, (req, res) => {
//   res.send('Hello from D!')
// })


//app.route()

// app.route('/book')
//   .get((req, res) => {
//     res.send('Get a random book')
//   })
//   .post((req, res) => {
//     res.send('Add a book')
//   })
//   .put((req, res) => {
//     res.send('Update the book')
//   })


//express.Router

const birds = require('./birds')

// ...

app.use('/birds', birds)
















