import dotenv from "dotenv";
dotenv.config();
import { mongooseConnect } from "./src/db/mongooseConnect";
import app from "./app";

// lắng nghe
const port = process.env.PORT || 3002;
const server = app.listen(port, async () => {
    console.log(`Lắng nghe cổng http://localhost:${port} ...`);
    mongooseConnect();
});
