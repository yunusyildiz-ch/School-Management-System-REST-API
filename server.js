import "dotenv/config";
import  {connectDB} from "./config/db.js";
import  './models/index.js'
import app from "./app.js";
import { createAdminUser } from "./config/setup.js";

const port = process.env.PORT || 3000;

connectDB()
  .then(async () => {
    await createAdminUser()
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
    
  })
  .catch((error) => {
    console.error("Database connection error: " + error.message);
    process.exit(1);
  });
