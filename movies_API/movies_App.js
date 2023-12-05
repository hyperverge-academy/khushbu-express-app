const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`movie app listening on port ${port}`)
})
app.use(bodyParser.json()) 

let {insertDB, findDoc, updateDoc, deletedDoc  } = require('./moviesData')

app.post('/movies', async(req, res) => {
    const { movie_title, movie_description, rating} = req.body
    if(!movie_title || !movie_description || !rating){
      res.status(404).send("bad request");
    }
    const movies = req.body
    console.log(movies)
    const mongoDB =await insertDB(movies)
    res.send(mongoDB)
})


app.get('/movies', async(req, res) => {
    const allData=await findDoc()
    res.send(allData)
})


app.put('/movies/:id', (req, res) => {
    const { movie_title, movie_description, rating} = req.body
    let updating={}
    if(movie_title){
      updating.movie_title = movie_title
    }
    if (movie_description){
      updating.movie_description = movie_description
    }
    if (rating){
      updating.rating = rating
    }
    if(!movie_title && !movie_description && !rating){
      res.status(404).send("bad request");
    }
    // console.log(req.body)
    const output =  updateDoc(req.params.id, updating)
    res.send(output)
})


app.delete('/movies/:id',(req, res) => {
    const deleteoutput = deletedDoc(req.params.id)
    res.send(deleteoutput)
})