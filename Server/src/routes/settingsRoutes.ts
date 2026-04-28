import express from 'express';
import { auth, admin } from '../middleware/auth';
import { 
  getSettings, 
  updateGeneralSettings, 
  uploadLogo, 
  upload,
  getDashboardName,
  updateDashboardName,
  updateAdminPassword
} from '../controllers/settingsController';

const router = express.Router();

router.get('/', getSettings);
router.get('/dashboard-name', getDashboardName);
router.put('/general', auth, admin, updateGeneralSettings);
router.put('/dashboard-name', auth, admin, updateDashboardName);
router.put('/admin-password', auth, admin, updateAdminPassword);
router.post('/upload-logo', auth, admin, upload.single('logo'), uploadLogo);

export default router;
