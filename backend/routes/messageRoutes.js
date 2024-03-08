import  express  from "express";
import {sendMessage,getMessage} from "../controllers/messageControllers.js";
import protect from "../middleware/protect.js";
const router = express.Router();

router.post("/send/:id",protect,sendMessage);
router.get('/:id',protect,getMessage);

export default router;