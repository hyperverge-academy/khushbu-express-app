// Delete a document
let { MongoClient} = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string
const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db("mydb");
    const movies = database.collection("students");
    /* Delete the first document in the "movies" collection that matches
    the specified query document */
    const query = { title: "The Cat from Sector 900" };
    const result = await movies.deleteOne(query);
    /* Print a message that indicates whether the operation deleted a
    document */
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  } finally {
    // Close the connection after the operation completes
    await client.close();
  }
}
// Run the program and print any thrown exceptions
run().catch(console.dir);