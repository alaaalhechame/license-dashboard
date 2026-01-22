import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
        return res.status(200).end();
  }

  if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
        const { license_key, device_id } = req.body;

      if (!license_key) {
              return res.status(400).json({ 
                                                  success: false, 
                        error: 'License key required' 
              });
      }

      const data = await kv.get(`license:${license_key}`);

      if (!data) {
              return res.status(404).json({ 
                                                  success: false, 
                        error: 'License not found' 
              });
      }

      const license = typeof data === 'string' ? JSON.parse(data) : data;

      if (!license.is_active) {
              return res.status(403).json({ 
                                                  success: false, 
                        error: 'License is inactive' 
              });
      }

      if (license.expires_at && new Date(license.expires_at) < new Date()) {
              return res.status(403).json({ 
                                                  success: false, 
                        error: 'License expired' 
              });
      }

      if (device_id) {
              const devices = license.devices || [];

          if (!devices.includes(device_id)) {
                    if (devices.length >= license.max_devices) {
                                return res.status(403).json({ 
                                                                        success: false, 
                                              error: 'Maximum devices reached' 
                                });
                    }


                devices.push(device_id);
                    license.devices = devices;
                    await kv.set(`license:${license_key}`, JSON.stringify(license));
          }
      }

      return res.status(200).json({ 
                                        success: true, 
              license 
      });

  } catch (error) {
        console.error('Verify license error:', error);
        return res.status(500).json({ 
                                          success: false, 
                error: error.message 
        });
  }
}
