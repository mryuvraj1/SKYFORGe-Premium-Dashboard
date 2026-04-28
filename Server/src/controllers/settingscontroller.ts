import { Request, Response } from 'express';
import Settings from '../models/Settings';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

// Get all settings
export const getSettings = async (req: Request, res: Response) => {
  const settings = await Settings.find();
  const settingsObj: any = {};
  settings.forEach(s => { settingsObj[s.key] = s.value; });
  res.json(settingsObj);
};

// Update general settings (logo, name, email)
export const updateGeneralSettings = async (req: Request, res: Response) => {
  const { siteName, siteEmail, sitePhone, siteAddress } = req.body;
  
  if (siteName) await Settings.findOneAndUpdate({ key: 'siteName' }, { value: siteName }, { upsert: true });
  if (siteEmail) await Settings.findOneAndUpdate({ key: 'siteEmail' }, { value: siteEmail }, { upsert: true });
  if (sitePhone) await Settings.findOneAndUpdate({ key: 'sitePhone' }, { value: sitePhone }, { upsert: true });
  if (siteAddress) await Settings.findOneAndUpdate({ key: 'siteAddress' }, { value: siteAddress }, { upsert: true });
  
  res.json({ success: true, message: 'Settings updated' });
};

// Upload logo
const storage = multer.memoryStorage();
export const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

export const uploadLogo = async (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  
  const uploadDir = path.join(__dirname, '../../uploads');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  
  const filename = `logo-${Date.now()}.png`;
  const filepath = path.join(uploadDir, filename);
  
  await sharp(req.file.buffer).resize(200, 200).png().toFile(filepath);
  
  const logoUrl = `/uploads/${filename}`;
  await Settings.findOneAndUpdate({ key: 'logoUrl' }, { value: logoUrl }, { upsert: true });
  
  res.json({ success: true, logoUrl });
};

// Get dashboard name
export const getDashboardName = async (req: Request, res: Response) => {
  let setting = await Settings.findOne({ key: 'dashboardName' });
  if (!setting) setting = { value: 'My Dashboard' };
  res.json({ dashboardName: setting.value });
};

// Update dashboard name
export const updateDashboardName = async (req: Request, res: Response) => {
  const { dashboardName } = req.body;
  await Settings.findOneAndUpdate(
    { key: 'dashboardName' },
    { key: 'dashboardName', value: dashboardName, updatedAt: new Date() },
    { upsert: true }
  );
  res.json({ success: true, dashboardName });
};

// Update admin password
export const updateAdminPassword = async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  const User = require('../models/User').default;
  
  const admin = await User.findOne({ role: 'admin' });
  if (!admin) return res.status(404).json({ error: 'Admin not found' });
  
  const isValid = await admin.comparePassword(currentPassword);
  if (!isValid) return res.status(401).json({ error: 'Current password is incorrect' });
  
  admin.password = newPassword;
  await admin.save();
  
  res.json({ success: true, message: 'Password updated successfully' });
};
