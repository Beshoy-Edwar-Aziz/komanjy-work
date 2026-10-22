// config/db.js
const mongoose = require('mongoose');

let cached = global.mongoose || (global.mongoose = { conn: null, promise: null });
const MONGODB_URI =
  "mongodb+srv://beshoyedwar8_db_user:zIgQRBRjcvKfunqA@cluster0.okugu5m.mongodb.net/?appName=Cluster0";
async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
      dbName:'komanjy'
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectDB;