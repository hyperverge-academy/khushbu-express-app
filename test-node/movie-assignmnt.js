const express = require('express')
let{ MongoClient, ObjectId} = require("mongodb")
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`movie app listening on port ${port}`)
})
app.use(bodyParser.json()) 
const uri = "mongodb://127.0.0.1:27017/"

async function insertDB(doc) {
  const client = new MongoClient(uri)
  try {
    const database = client.db("mydb");
    const info = database.collection("movies");
    
    const result = await info.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    return result.insertedId
  } finally {
    await client.close();
  }
}

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



async function findDoc() {
  const client = new MongoClient(uri)
  try {
    const database = client.db("mydb");
    const collections = database.collection("movies");
    const query = {};

    const cursor = collections.find(query);
    
    if ((await collections.countDocuments(query)) === 0) {
      console.log("No documents found!");
    }
    const movie_arr = []
    for await (const doc of cursor) {
      movie_arr.push(doc)
    }
    return movie_arr
  } finally {
    await client.close();
  }
}

app.get('/movies', async(req, res) => {
  const allData=await findDoc()
  res.send(allData)
})



async function updateDoc(id,updateQuery) {
  const client = new MongoClient(uri)
  try {
    const database = client.db("mydb");
    const movies = database.collection("movies");
    const filter = { _id: new ObjectId(id) };
    const updateDoc = { $set:updateQuery };
    console.log(updateQuery)
    const result = await movies.updateOne(filter, updateDoc );
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    );
    return result.modifiedCount
  } finally {
    await client.close();
  }
}

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



async function deletedDoc(id) {
  const client = new MongoClient(uri)
  try {
    const database = client.db("mydb");
    const movies = database.collection("movies");
    const query = { _id: new ObjectId(id) };
    const result = await movies.deleteOne(query);
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  } finally {
    await client.close();
  }
}

app.delete('/movies/:id',(req, res) => {
  const deleteoutput = deletedDoc(req.params.id)
  res.send(deleteoutput)

})