import "dotenv/config";
import  {connectDB} from "./config/db.js";
//todo : ? import './config/multerConfig.js'
import  './models/index.js'
import app from "./app.js";
import { createAdminUser } from "./config/setup.js";


connectDB()
  .then(async () => {
    await createAdminUser()
    
  })
  .catch((error) => {
    console.error("Database connection error: " + error.message);
    process.exit(1);
  });

  export default app;