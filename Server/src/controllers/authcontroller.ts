import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import crypto from 'crypto';

const createToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists' });
    
    const user = await User.create({ email, password, name });
    const token = createToken(user._id.toString());
    
    res.status(201).json({
      token,
      user: { id: user._id, email, name, role: user.role, avatar: user.avatar }
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = createToken(user._id.toString());
    res.json({
      token,
      user: { id: user._id, email, name: user.name, role: user.role, avatar: user.avatar }
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getMe = async (req: Request, res: Response) => {
  const user = await User.findById(req.user?.id).select('-password');
  res.json({ user });
};

export const updateProfile = async (req: Request, res: Response) => {
  const { name, avatar } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user?.id,
    { name, avatar },
    { new: true }
  ).select('-password');
  res.json({ user });
};
