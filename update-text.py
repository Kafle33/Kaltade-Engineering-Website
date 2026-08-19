import os
import glob

files = glob.glob('src/**/*.tsx', recursive=True)

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    content = content.replace('✉️ Notification sent to <strong>kaltadeengineeringservices@gmail.com</strong> &amp; <strong>ai.antigravity11@gmail.com</strong>', '📲 Redirecting to WhatsApp to send your inquiry directly to our team.')
    content = content.replace('✉️ Notification dispatched to <strong>kaltadeengineeringservices@gmail.com</strong> &amp; <strong>ai.antigravity11@gmail.com</strong>', '📲 Redirecting to WhatsApp to send your inquiry directly to our team.')
    content = content.replace('✉️ Notification dispatched to official desk &amp; WhatsApp channel.', '📲 Redirecting to WhatsApp to send your inquiry directly to our team.')
    content = content.replace('Send Instant Copy via WhatsApp', 'Continue to WhatsApp')
    
    # Submit buttons
    content = content.replace('>Submit Consultation Request<', '>Submit via WhatsApp<')
    content = content.replace('>Submit Valuation Request<', '>Submit via WhatsApp<')
    content = content.replace('>Submit Buyer Requirement<', '>Submit via WhatsApp<')
    content = content.replace('>Submit Property Listing<', '>Submit via WhatsApp<')
    content = content.replace('>Submit Inquiry<', '>Submit via WhatsApp<')
    content = content.replace('>Submit Message<', '>Submit via WhatsApp<')

    if content != original:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file}")
