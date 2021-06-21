import express from 'express';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// products route
import productRoutes from './routes/products.js';
// users route
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

// configuring body parser and cors
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// products route
app.use('/products', productRoutes);
// user route
app.use('/users', userRoutes);

// main server window (HOME)
app.get('/', (req, res) => {
    res.send('Welcome to the Medicine Review Application API');
});

// port number
const PORT = process.env.PORT || 5000;

// mongoose connection
mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
})
    .then(() => app.listen(PORT, () => console.log(`server running on port : ${PORT}`)))
    .catch((err) => console.log(err.message));