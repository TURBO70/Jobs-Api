require('dotenv').config();
require('express-async-errors');
const express = require('express')
const app = express()

const {db}=require('./config/db.config');
const authenticationUser=require('./middleware/auth');

const userRouter=require('./routes/user.routes');
const jobRouter=require('./routes/jobs.routes');


const notFoundMiddleware=require('./middleware/not-found');
const errorHandlerMiddleware=require('./middleware/error-handler.middleware');

app.use(express.json());


app.use('/user', userRouter);
app.use('/jobs', authenticationUser, jobRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
db();

const port = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))