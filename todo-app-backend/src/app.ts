import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { corsOptions } from './config/corsConfig';
import { apiRateLimiter } from './config/rateLimitConfig';
import router from './routes/index';
import {  errorHandler } from './middleware/errorMiddleware';
import { notFoundHandler } from './middleware/not-foundMiddleware';
const app = express();

app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }));
app.use(require('cors')(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
app.use(apiRateLimiter);

app.use('/api', router);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
