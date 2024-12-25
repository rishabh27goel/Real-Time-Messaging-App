import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./db/index.js";
dotenv.config();

(async () => {
  try {
    const databaseInstance = await connectDB();
    console.log("Database connected successfully : ", databaseInstance.connection.host);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log("App is running at port : ", PORT);
    });
  }
  catch(error) {
    console.error("Error while starting the server : ", error.message);
    process.exit(1);
  }
})();