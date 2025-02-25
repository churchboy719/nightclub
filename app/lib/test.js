import { connectDb } from "./path/to/your/mongodb";

(async () => {
  try {
    await connectDb();
    console.log("Mongoose connection successful!");
  } catch (error) {
    console.error("Connection failed:", error);
  }
})();
