import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const data = await kv.get(`license:${id}`);
      
      if (!data) {
        return res.status(404).json({ 
          success: false, 
          error: 'License not found' 
        });
      }

      const license = typeof data === 'string' ? JSON.parse(data) : data;
      
      return res.status(200).json({ 
        success: true, 
        license 
      });

    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }

  if (req.method === 'PUT') {
    try {
      const data = await kv.get(`license:${id}`);
      
      if (!data) {
        return res.status(404).json({ 
          success: false, 
          error: 'License not found' 
        });
      }

      const license = typeof data === 'string' ? JSON.parse(data) : data;
      const updates = req.body;

      const updatedLicense = {
        ...license,
        ...updates,
        license_key: id,
        updated_at: new Date().toISOString()
      };

      await kv.set(`license:${id}`, JSON.stringify(updatedLicense));

      return res.status(200).json({ 
        success: true, 
        license: updatedLicense 
      });

    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const exists = await kv.get(`license:${id}`);
      
      if (!exists) {
        return res.status(404).json({ 
          success: false, 
          error: 'License not found' 
        });
      }

      await kv.del(`license:${id}`);
      await kv.srem('licenses:all', id);

      return res.status(200).json({ 
        success: true, 
        message: 'License deleted' 
      });

    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
