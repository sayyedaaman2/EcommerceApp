import express from 'express';

// instance of express
const app = express();

// middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
  res.status(200).send({
    message: 'PONG',
    success: true,
  });
});

export default app;
