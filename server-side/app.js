const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.set('strictQuery', true);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  });

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on Port ${PORT}`)
})