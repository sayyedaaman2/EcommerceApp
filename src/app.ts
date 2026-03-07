import express from 'express';

import corsMiddleware from '@/middleware/cors.middleware';
import { globalErrorHandler } from '@/middleware/error.middleware';
import { notFoundMiddleware } from '@/middleware/notFound.middleware';
import { rateLimiter } from './middleware/rateLimiter.middleware';
import { loggerMiddleware } from '@/middleware/logger.middleware';

import { securityMiddleware } from '@/middleware/security.middleware';

// instance of express
const app = express();

// middlewares
app.use(securityMiddleware);
app.use(loggerMiddleware);
app.use(rateLimiter);
app.use(corsMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
  res.status(200).send({
    message: 'PONG',
    success: true,
  });
});

// Not found middleware
app.use(notFoundMiddleware);
// Global Error Handler
app.use(globalErrorHandler);

export default app;
