const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
dotenv.config();

const app = express();


const corsOptions = {
  origin: ['https://tiny-truffle-09ab8e.netlify.app','http://localhost:3000'], // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
// Middleware
app.use(express.json());
app.use(cors(
  corsOptions
));
const PORT = process.env.PORT;
// Connect to MongoDB
const connect = require('./DB/Connection');
connect();

const {auth,menu,order} = require('./Routes/index');
// Routes
app.use('/api/v1/',auth);
app.use('/api/v1/menus',menu);
app.use('/api/v1/orders',order);

app.listen(PORT,()=>{
  console.log("Server is listening on port :",PORT);
})
