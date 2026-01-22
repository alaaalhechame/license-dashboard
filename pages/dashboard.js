import { useState, useEffect } from 'react';
import LicenseTable from '../components/LicenseTable';
import CreateLicenseModal from '../components/CreateLicenseModal';
import { getLicenses, createLicense, deleteLicense, updateLicense } from '../utils/api';

export default function Dashboard() {
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    expired: 0
  });

  useEffect(() => {
    loadLicenses();
  }, []);

  const loadLicenses = async () => {
    try {
      setLoading(true);
      const data = await getLicenses();
      setLicenses(data);
      
      const total = data.length;
      const active = data.filter(l => l.is_active && (!l.expires_at || new Date(l.expires_at) > new Date())).length;
      const expired = data.filter(l => l.expires_at && new Date(l.expires_at) < new Date()).length;
      
      setStats({ total, active, expired });
    } catch (error) {
      console.error('Failed to load licenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (licenseData) => {
    try {
      await createLicense(licenseData);
      setShowModal(false);
      loadLicenses();
    } catch (error) {
      alert('Failed to create license: ' + error.message);
    }
  };

  const handleDelete = async (licenseKey) => {
    if (!confirm('Are you sure you want to delete this license?')) return;
    
    try {
      await deleteLicense(licenseKey);
      loadLicenses();
    } catch (error) {
      alert('Failed to delete license: ' + error.message);
    }
  };

  const handleToggleStatus = async (license) => {
    try {
      await updateLicense(license.license_key, {
        is_active: !license.is_active
      });
      loadLicenses();
    } catch (error) {
      alert('Failed to update license: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            License Dashboard
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all transform hover:scale-105"
          >
            + Create License
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="text-gray-400 text-sm mb-2">Total Licenses</div>
            <div className="text-3xl font-bold text-white">{stats.total}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="text-gray-400 text-sm mb-2">Active</div>
            <div className="text-3xl font-bold text-green-400">{stats.active}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="text-gray-400 text-sm mb-2">Expired</div>
            <div className="text-3xl font-bold text-red-400">{stats.expired}</div>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-white">Loading...</div>
        ) : (
          <LicenseTable
            licenses={licenses}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        )}

        {showModal && (
          <CreateLicenseModal
            onClose={() => setShowModal(false)}
            onCreate={handleCreate}
          />
        )}
      </div>
    </div>
  );
}
