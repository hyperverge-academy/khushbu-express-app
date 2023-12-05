let { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);
async function run() {
  try {
    
    // Get the database and collection on which to run the operation
    const database = client.db("mydb");
    const movies = database.collection("students");
    // Query for a movie that has the title 'The Room'
    const query = { Name: "Khushbu" };
    // const options = {
    //   // Sort matched documents in descending order by rating
    //   sort: { "imdb.rating": -1 },
    //   // Include only the `title` and `imdb` fields in the returned document
    //   projection: { _id: 0, title: 1, imdb: 1 },
    // };
    // Execute query
    const movie = await movies.findOne(query);
    // Print the document returned by findOne()
    console.log(movie);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
