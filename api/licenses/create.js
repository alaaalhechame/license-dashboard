import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
        return res.status(200).end();
  }

  if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
  }
    try {
          const { client_name, governorate_name, phone, type, parent_id, max_devices, expires_at } = req.body;

      const prefix = type === 'MASTER' ? 'M' : 'S';
          const timestamp = Date.now().toString(36).toUpperCase();
          const random = Math.random().toString(36).substring(2, 6).toUpperCase();
          const license_key = `${prefix}-${timestamp}-${random}`;

      const licenseData = {
              license_key,
              client_name,
              governorate_name,
              phone,
              type: type || 'MASTER',
              parent_id: parent_id || null,
              max_devices: parseInt(max_devices) || 3,
              is_active: true,
              created_at: new Date().toISOString(),
              expires_at: expires_at || null,
              devices: []
      };

      await kv.set(`license:${license_key}`, JSON.stringify(licenseData));
          await kv.sadd('licenses:all', license_key);

      return res.status(200).json({ 
                                        success: true, 
              license_key,
              data: licenseData 
      });

    } catch (error) {
          console.error('Create license error:', error);
          return res.status(500).json({ 
                                            success: false, 
                  error: error.message 
          });
    }
}
