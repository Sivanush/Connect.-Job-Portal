import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/userModel'; // Adjust the import path

const jwtSecret = process.env.JWT_SECRET || 'myjwtsecret'; // Use a secure key and keep it in environment variables

interface CustomRequest extends Request {
  user?: IUser;
}

class AuthMiddleware {
  private jwtSecret: string;

  constructor(jwtSecret: string) {
    this.jwtSecret = jwtSecret;
  }

  public verifyToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return res.status(401).send('Access Denied: No Token Provided!');
    }

    try {
      const decoded = jwt.verify(token, this.jwtSecret) as { id: string };
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).send('Access Denied: Invalid Token!');
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(400).send('Invalid Token');
    }
  };

  public isVerified = (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.user?.is_verified) {
      next();
    } else {
      res.status(403).send('User is Blocked');
    }
  };
}

const authMiddleware = new AuthMiddleware(jwtSecret);

export { authMiddleware };
