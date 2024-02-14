import "dotenv/config";
import { connectDB } from "./config/db.js";
import app from "./app.js";

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error: " + error.message);
    process.exit(1);
  });
