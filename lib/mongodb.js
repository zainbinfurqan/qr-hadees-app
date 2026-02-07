import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) throw new Error("Missing Mongo URI");

let client;
let promise;

if (!global._mongo) {
  client = new MongoClient(uri);
  global._mongo = client.connect();
}

promise = global._mongo;

export default promise;