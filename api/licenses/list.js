import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
        return res.status(200).end();
  }

  if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
        const licenseKeys = await kv.smembers('licenses:all') || [];
        const licenses = [];

      for (const key of licenseKeys) {
              const data = await kv.get(`license:${key}`);
              if (data) {
                        const license = typeof data === 'string' ? JSON.parse(data) : data;
                        licenses.push(license);
              }
      }

      licenses.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      return res.status(200).json({ 
                                        success: true, 
              licenses,
              total: licenses.length 
      });

  } catch (error) {
        console.error('List licenses error:', error);
        return res.status(500).json({ 
                                          success: false, 
                error: error.message 
        });
  }
}
