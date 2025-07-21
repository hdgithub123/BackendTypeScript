import 'express';
// Extend Express Request interface
declare module 'express-serve-static-core' {
  interface Request {
    result?: any;
    user?: any;
  }
}