const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();


const MONGODB_URI = "mongodb+srv://churchboy719:biuPVkichqdkSvke@cluster0.mb3rv.mongodb.net/nightclub" 

//const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = { connectDb };
