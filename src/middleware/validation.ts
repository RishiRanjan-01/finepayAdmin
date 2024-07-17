import { Request, Response, NextFunction } from 'express';

// Regular expression for validating a 10-digit numeric mobile number
const mobileRegex = /^\d{10}$/;

// Regular expression for validating an email address
const emailRegex = /^\S+@\S+\.\S+$/;

// Middleware function to validate mobile number format
export const validateMobile = (req: Request, res: Response, next: NextFunction) => {
  const { mobile } = req.body;
  if (!mobileRegex.test(mobile)) {
    return res.status(400).send('Invalid mobile number format');
  }
  next();
};

// Middleware function to validate email format
export const validateEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  if (!emailRegex.test(email)) {
    return res.status(400).send('Invalid email format');
  }
  next();
};
