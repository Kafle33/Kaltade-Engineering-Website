const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  const mailIcon = "\u2709\ufe0f";
  const phoneIcon = "\ud83d\udcf2";

  // Replace text
  content = content.replace(new RegExp(mailIcon + ' Notification (sent|dispatched) to <strong>kaltadeengineeringservices@gmail\\.com</strong> &amp; <strong>ai\\.antigravity11@gmail\\.com</strong>', 'g'), phoneIcon + ' Redirecting to WhatsApp to send your inquiry directly to our team.');
  content = content.replace(new RegExp(mailIcon + ' Notification dispatched to official desk &amp; WhatsApp channel\\.', 'g'), phoneIcon + ' Redirecting to WhatsApp to send your inquiry directly to our team.');
  content = content.replace(/Send Instant Copy via WhatsApp/g, 'Continue to WhatsApp');
  
  // Submit buttons
  content = content.replace(/>\s*Submit Consultation Request\s*</g, '>Submit via WhatsApp<');
  content = content.replace(/>\s*Submit Valuation Request\s*</g, '>Submit via WhatsApp<');
  content = content.replace(/>\s*Submit Buyer Requirement\s*</g, '>Submit via WhatsApp<');
  content = content.replace(/>\s*Submit Property Listing\s*</g, '>Submit via WhatsApp<');
  content = content.replace(/>\s*Submit Inquiry\s*</g, '>Submit via WhatsApp<');
  content = content.replace(/>\s*Submit Message\s*</g, '>Submit via WhatsApp<');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
