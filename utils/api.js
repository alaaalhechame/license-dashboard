const API_BASE = '/api/licenses';

export async function getLicenses() {
  const res = await fetch(`${API_BASE}/list`);
  if (!res.ok) throw new Error('Failed to fetch licenses');
  return res.json();
}

export async function createLicense(data) {
  const res = await fetch(`${API_BASE}/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to create license');
  return res.json();
}

export async function updateLicense(licenseKey, data) {
  const res = await fetch(`${API_BASE}/${licenseKey}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update license');
  return res.json();
}

export async function deleteLicense(licenseKey) {
  const res = await fetch(`${API_BASE}/${licenseKey}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete license');
  return res.json();
}

export async function verifyLicense(licenseKey) {
  const res = await fetch(`${API_BASE}/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ license_key: licenseKey })
  });
  if (!res.ok) throw new Error('Failed to verify license');
  return res.json();
}
