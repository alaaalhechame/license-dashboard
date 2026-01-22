export default function LicenseTable({ licenses, onDelete, onToggleStatus }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isExpired = (expiresAt) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };
 
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-white/10">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">License Key</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Product</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Created</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Expires</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {licenses.map((license) => (
              <tr key={license.license_key} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-sm font-mono text-purple-300">{license.license_key}</td>
                <td±ÍÍ9µôÁà´ØÁä´ÐÑáÐµÍ´ÑáÐµÝ¡¥Ñùí±¥¹Í¹ÕÍÑ½µÉ}¹µôð½Ñø(ñÑ±ÍÍ9µôÁà´ØÁä´ÐÑáÐµÍ´ÑáÐµÉä´ÌÀÀùí±¥¹Í¹ÕÍÑ½µÉ}µ¥±ôð½Ñø(ñÑ6Æ74æÖSÒ'ÓbÓBFWB×6ÒFWB×vFR#ç¶Æ6Vç6Rç&öGV7EöæÖWÓÂ÷FCà¢ÇFB6Æ74æÖSÒ'ÓbÓBFWB×6ÒFWBÖw&Ó3#ç¶f÷&ÖDFFRÆ6Vç6Ræ7&VFVEöBÓÂ÷FCà¢ÇFB6Æ74æÖSÒ'ÓbÓBFWB×6ÒFWBÖw&Ó3#à¢Ç7â6Æ74æÖS×¶4W&VBÆ6Vç6RæW&W5öBòwFWB×&VBÓCr¢rwÓà¢¶f÷&ÖDFFRÆ6Vç6RæW&W5öBÐ¢Â÷7ãà¢Â÷FCà¢ÇFB6Æ74æÖSÒ'ÓbÓBFWB×6Ò#à¢Æ'WGFöà¢öæ6Æ6³×²ÓâöåFövvÆU7FGW2Æ6Vç6RÐ¢6Æ74æÖS×²Ó2Ó&÷VæFVBÖgVÆÂFWB×2föçB×6VÖ&öÆBG&ç6FöâÖ6öÆ÷'2G¶Æ6Vç6Ræ5ö7FfRòv&rÖw&VVâÓSó#FWBÖw&VVâÓC÷fW#¦&rÖw&VVâÓSó3r¢v&r×&VBÓSó#FWB×&VBÓC÷fW#¦&r×&VBÓSó3wÒÐ¢à¢¶Æ6Vç6Ræ5ö7FfRòt7FfRr¢tæ7FfRwÐ¢Âö'WGFöãà¢Â÷FCà¢ÇFB6Æ74æÖSÒ'ÓbÓBFWB×6Ò#à¢Æ'WGFöà¢öä6Æ6³×²ÓâöäFVÆWFRÆ6Vç6RæÆ6Vç6Uö¶WÐ¢6Æ74æÖSÒ'FWB×&VBÓC÷fW#§FWB×&VBÓ3G&ç6FöâÖ6öÆ÷'2föçBÖÖVFVÒ ¢à¢FVÆWFP¢Âö'WGFöãà¢Â÷FCà¢Â÷G#à¢2Ð¢Â÷F&öGà¢Â÷F&ÆSà¢ÂöFcà¢¶Æ6Vç6W2æÆVæwFÓÓÒbb¢ÆFb6Æ74æÖSÒ'FWBÖ6VçFW"Ó"FWBÖw&ÓC#à¢æòÆ6Vç6W2f÷VæBâ7&VFR÷W"f'7BÆ6Vç6RFòvWB7F'FVBà¢ÂöFcà¢Ð¢ÂöFcà¢°§
