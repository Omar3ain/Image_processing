import express from 'express';
import morgan from 'morgan';
import mainRoute from './routes/mainRoute';


const port:number= 3000

const app = express()

app.use(morgan('dev'))
app.use('/api' , mainRoute)
app.use(express.static('public'))

app.listen(port , () => {
    console.log(`server is running at http://localhost:${port}`)
})