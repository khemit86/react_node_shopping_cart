import dotenv from 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import './config/db.js'
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js'

import { errorHandler, notFound } from './middleware/errorMiddleware.js';


const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use('/api/users',userRoutes);
app.use('/api/products',productRoutes);
app.use('/api/orders',orderRoutes);



app.use(notFound);
app.use(errorHandler);


app.listen(port,()=>{

    console.log(`Server running in ${process.env.NODE_ENV} mode on ${port} `)

})




