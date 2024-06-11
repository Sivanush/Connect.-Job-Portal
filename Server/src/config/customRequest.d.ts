import { Request } from 'express';
import { IUser } from '../models/userModel'; // Adjust the import path


  export interface Request {
    user?: IUser;
  }

