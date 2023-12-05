let{ MongoClient, ObjectId} = require("mongodb")
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

module.exports = {insertDB, findDoc, updateDoc, deletedDoc}