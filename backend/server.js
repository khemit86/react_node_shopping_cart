//import dotenv from 'dotenv/config';
import 'dotenv/config';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import './config/db.js'
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import uploadRouters from './routes/uploadRoutes.js'

import { errorHandler, notFound } from './middleware/errorMiddleware.js';


const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

const corsOptions = {
  origin:'http://localhost:3000',
  allowedHeader:['Content-type'],
  methods:['GET','POST','PUT','DELETE','PATCH','OPTIONS'],
  credentials:true
}

app.use(cors(corsOptions));

app.use('/api/users',userRoutes);
app.use('/api/products',productRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/upload',uploadRouters);

app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use('/uploads', express.static('/var/data/uploads'));
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  const __dirname = path.resolve();
  console.log(path.join(__dirname, '/uploads'));
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
  
}



app.use(notFound);
app.use(errorHandler);


app.listen(port,()=>{

    console.log(`Server running in ${process.env.NODE_ENV} mode on ${port} `)

})




