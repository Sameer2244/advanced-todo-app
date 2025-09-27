import { MongoClient, Db, MongoClientOptions } from "mongodb";

const uri: string = process.env.MONGODB_URI || "";
const options: MongoClientOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
} as MongoClientOptions;

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

// Ensure connection reuse
if (!client) {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export interface DbConnection {
  db: Db;
  client: MongoClient;
}

export async function connectToDatabase(): Promise<DbConnection> {
  const client = await clientPromise;
  const db = client.db("TodoDB");
  return { db, client };
}
