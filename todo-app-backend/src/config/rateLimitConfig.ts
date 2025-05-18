import { RateLimitRequestHandler } from 'express-rate-limit';

export const apiRateLimiter: RateLimitRequestHandler = require('express-rate-limit')({
  windowMs: 15 * 60 * 1000,  
  max: 100,                 
  standardHeaders: true,    
  legacyHeaders: false,     
});
