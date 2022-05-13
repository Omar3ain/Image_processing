import  express  from "express";
import imagesRoute from './imagesRoute'

const router = express.Router();

router.get('/', (req , res) => {
    res.send('Hello server')
})

router.use(imagesRoute)

export default  router;
