let { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);
async function run() {
  try {
    
    // Get the database and collection on which to run the operation
    const database = client.db("mydb");
    const movies = database.collection("students");
    // Create a query for documents where the title contains "The Cat from"
    const query = { Name:"Khushbu" };
    
    // Create the document that will replace the existing document
    const replacement = {
      title: `The Cat from Sector ${Math.floor(Math.random() * 1000) + 1}`,
      name:"donuts"
    };
    // Execute the replace operation
    const result = await movies.replaceOne(query, replacement);
    
    // Print the result 
    console.log(`Modified ${result.modifiedCount} document(s)`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);