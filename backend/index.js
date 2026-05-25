import"dotenv/config";
import express from "express";
import cors from "cors";
import taskRoutes from "./routes/tasks.js";
import mongoose from "mongoose";

//---------------- VARIABLES -----------------
const port = 3000;
const app = express();  // use Express.js framework to do...


//-------------------- MIDDLEWARE ------------------
app.use(express.json());
app.use(cors());   //allows API requests to be made from other locations


//-------------------- API ROUTES ------------------
app.use("/", taskRoutes);

//-------------- API STARTUP ----------------

// IIFE - Immediately Invoked Function Expression
(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { autoIndex: false});
        console.log("✅ Database connected");

        await mongoose.syncIndexes();
        console.log("✅ Indexes synched");

        app.listen(port, () => {
        console.log(`✅ To Do App is live on port: ${port}`);
    })
    } catch (error) {
        console.error("❌ Failed to start server: ", error);
        process.exit(1);
    }
})();
