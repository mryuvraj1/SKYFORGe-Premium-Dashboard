import React, { useState } from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import toast from 'react-hot-toast';

export const SettingsPanel: React.FC = () => {
  const { siteName, siteEmail, sitePhone, logoUrl, dashboardName, updateGeneralSettings, updateDashboardName, uploadLogo } = useSettings();
  
  const [formData, setFormData] = useState({ siteName, siteEmail, sitePhone });
  const [newDashboardName, setNewDashboardName] = useState(dashboardName);
  const [editing, setEditing] = useState(false);

  const handleGeneralSave = async () => {
    await updateGeneralSettings(formData);
    toast.success('Settings updated');
  };

  const handleDashboardNameSave = async () => {
    await updateDashboardName(newDashboardName);
    setEditing(false);
    toast.success('Dashboard name updated');
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadLogo(file);
      toast.success('Logo uploaded');
    }
  };

  return (
    <div className="space-y-6">
      {/* Site Settings */}
      <div className="bg-cardbg rounded-2xl p-6">
        <h2 className="text-xl font-bold text-primary mb-4">General Settings</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Site Name</label>
            <input
              type="text"
              value={formData.siteName}
              onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
              className="w-full p-3 bg-darkbg border border-gray-700 rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm mb-1">Site Email</label>
            <input
              type="email"
              value={formData.siteEmail}
              onChange={(e) => setFormData({ ...formData, siteEmail: e.target.value })}
              className="w-full p-3 bg-darkbg border border-gray-700 rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm mb-1">Site Phone</label>
            <input
              type="tel"
              value={formData.sitePhone}
              onChange={(e) => setFormData({ ...formData, sitePhone: e.target.value })}
              className="w-full p-3 bg-darkbg border border-gray-700 rounded-lg"
            />
          </div>
          
          <button onClick={handleGeneralSave} className="glow-btn">Save Changes</button>
        </div>
      </div>

      {/* Logo Upload */}
      <div className="bg-cardbg rounded-2xl p-6">
        <h2 className="text-xl font-bold text-primary mb-4">Site Logo</h2>
        {logoUrl && (
          <img src={logoUrl} alt="Logo" className="h-16 w-auto mb-4" />
        )}
        <input type="file" accept="image/*" onChange={handleLogoUpload} className="block" />
      </div>

      {/* Dashboard Name */}
      <div className="bg-cardbg rounded-2xl p-6">
        <h2 className="text-xl font-bold text-primary mb-4">Dashboard Name</h2>
        {editing ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={newDashboardName}
              onChange={(e) => setNewDashboardName(e.target.value)}
              className="flex-1 p-3 bg-darkbg border border-gray-700 rounded-lg"
            />
            <button onClick={handleDashboardNameSave} className="glow-btn small">Save</button>
            <button onClick={() => setEditing(false)} className="glow-btn secondary small">Cancel</button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <span className="text-xl">{dashboardName}</span>
            <button onClick={() => setEditing(true)} className="glow-btn small">Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};
