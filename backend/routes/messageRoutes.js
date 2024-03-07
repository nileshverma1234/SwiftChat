import  express  from "express";
import sendMessage from "../controllers/messageControllers.js";
const router = express.Router();

router.post("/send/:id",protect,sendMessage);

export default router;