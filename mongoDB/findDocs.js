let { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);
async function run() {
  try {
    
    // Get the database and collection on which to run the operation
    const database = client.db("mydb");
    const foods = database.collection("students");
    // Query for movies that have a runtime less than 15 minutes
    const query = { healthy: false };
    // const options = {
    //   // Sort returned documents in ascending order by title (A->Z)
    //   sort: { title: 1 },
    //   // Include only the `title` and `imdb` fields in each returned document
    //   projection: { _id: 0, title: 1, imdb: 1 },
    // };
    // Execute query 
    const cursor = foods.find(query);
    // Print a message if no documents were found
    if ((await foods.countDocuments(query)) === 0) {
      console.log("No documents found!");
    }
    // Print returned documents
    for await (const doc of cursor) {
      console.dir(doc);
    }
  } finally {
    await client.close();
  }
}
run().catch(console.dir);