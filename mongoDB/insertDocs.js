let { MongoClient } = require("mongodb")
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);
async function run() {
  try {
    // Get the database and collection on which to run the operation
    const database = client.db("mydb");
    const foods = database.collection("students");
    // Create an array of documents to insert
    const docs = [
      { name: "cake", healthy: false },
      { name: "lettuce", healthy: true },
      { name: "donut", healthy: false }
    ];
    // Prevent additional documents from being inserted if one fails
    const options = { ordered: true };
    // Execute insert operation
    const result = await foods.insertMany(docs, options);
   
    // Print result
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

