/* Update multiple documents */
let { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string
const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);
async function run() {
  try {
    // Get the "movies" collection in the "sample_mflix" database
    const database = client.db("mydb");
    const info = database.collection("students");
    // Create a filter to update all movies with a 'G' rating
    const filter = { Name: "Khushbu" };
    // Create an update document specifying the change to make
    const updateDoc = {
      $set: {
        Graduation: "pursuing",
      },
    };
    // Update the documents that match the specified filter
    const result = await info.updateMany(filter, updateDoc);
    console.log(`Updated ${result.modifiedCount} documents`);
  } finally {
    // Close the database connection on completion or error
    await client.close();
  }
}
run().catch(console.dir);