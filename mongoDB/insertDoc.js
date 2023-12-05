
let{ MongoClient} = require("mongodb") 
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://127.0.0.1:27017/";
// Create a new client and connect to MongoDB
const client = new MongoClient(uri);
async function run() {
  try {
    // Connect to the "insertDB" database and access its "haiku" collection
    const database = client.db("mydb");
    const info = database.collection("students");
    
    // Create a document to insert
    const doc = {
      Name: "Khushbu",
      content: "No bytes, no problem. Just insert a document, in MongoDB",
      age: 20,
      qualification: "12th pass"
    }
    // Insert the defined document into the "haiku" collection
    const result = await info.insertOne(doc);
    // Print the ID of the inserted document
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
     // Close the MongoDB client connection
    await client.close();
  }
}
// Run the function and handle any errors
run().catch(console.dir);