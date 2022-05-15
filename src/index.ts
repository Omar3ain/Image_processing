import express from 'express';
import morgan from 'morgan';
import mainRoute from './routes/mainRoute';
import process from 'process';

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(morgan('dev'));
app.use(express.static('public'));

// main route for the app
app.use('/api', mainRoute);

// listening to the server
app.listen(port || 3000, () => {
  console.log(`server is running at http://localhost:${port}`);
});

export default app;
