import morgan, { StreamOptions } from 'morgan';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { logger } from '../utils/logger';

dotenv.config(); // Load environment variables

// Function to determine the format based on the environment
const format = (): string => {
  return process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
};

// Stream options for logging
const stream: StreamOptions = {
  write: (message: string) => {
    logger.info(message.trim()); // Log the message using your custom logger
  },
};

// Skip logging if the status code is below 400 in production
const skip = (_: Request, res: Response): boolean => {
  if (process.env.NODE_ENV === 'production') {
    return res.statusCode < 400;
  }
  return false;
};

// Morgan middleware configuration
const morganMiddleware = morgan(format(), { stream, skip });

export { morganMiddleware };
