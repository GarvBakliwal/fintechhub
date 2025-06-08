import { Request, Response, NextFunction, RequestHandler } from 'express';
import { verifyToken } from '../lib/jwt';

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authenticate: RequestHandler = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  console.log('[AUTH MIDDLEWARE] Authorization Header:', authHeader);

  if (!authHeader?.startsWith('Bearer ')) {
    console.log('[AUTH MIDDLEWARE] Invalid or missing Bearer token');
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const token = authHeader.split(' ')[1];
    const payload: any = verifyToken(token);
    console.log('[AUTH MIDDLEWARE] Decoded JWT Payload:', payload);
    req.userId = payload.userId;
    next();
  } catch (err) {
    console.error('[AUTH MIDDLEWARE] Token verification failed:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authenticate;