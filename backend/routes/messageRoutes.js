import  express  from "express";
import sendMessage from "../controllers/messageControllers.js";
import protect from "../middleware/protect.js";
const router = express.Router();

router.post("/send/:id",protect,sendMessage);

export default router;