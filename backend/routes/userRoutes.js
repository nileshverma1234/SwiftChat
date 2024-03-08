import  express  from "express";
import getUsers from "../controllers/userControllers.js";
import protect from "../middleware/protect.js";

const router = express.Router();

router.get('/',protect,getUsers);

export default router;