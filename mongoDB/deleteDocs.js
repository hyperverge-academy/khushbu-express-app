// Delete multiple documents
let { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db("mydb");
    const movies = database.collection("students");
    /* Delete all documents that match the specified regular
    expression in the title field from the "movies" collection */
    const query = { title: { $regex: "Santa" } };
    const result = await movies.deleteMany(query);
    // Print the number of deleted documents
    console.log("Deleted " + result.deletedCount + " documents");
  } finally {
    // Close the connection after the operation completes
    await client.close();
  }
}
// Run the program and print any thrown exceptions
run().catch(console.dir);