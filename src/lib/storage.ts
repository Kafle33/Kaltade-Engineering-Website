import { Lead, Property, PropertyStatus } from '@/types';
import { propertiesData } from '@/data/propertiesData';

const INITIAL_LEADS: Lead[] = [
  {
    id: 'KAL-LD-0042',
    type: 'Valuation Request',
    fullName: 'Shyam Sundar Chaudhary',
    phone: '+977 9858421098',
    email: 'shyam.chaudhary@gmail.com',
    date: '2026-08-17',
    status: 'New',
    serviceInterest: 'Property Valuation for Bank Financing',
    propertyType: 'Commercial Land & 3-Storey Building',
    location: 'Main Road, Dhangadhi-1, Kailali',
    budget: 'Collateral value approx. NPR 4.5 Crore',
    message: 'Require urgent property valuation report for mortgage credit facility with commercial bank. Lalpurja and approved municipal drawings are ready.',
    urgency: 'Immediate',
    internalRemarks: 'Called client to schedule field inspection for tomorrow at 11 AM.'
  },
  {
    id: 'KAL-LD-0041',
    type: 'Buyer Requirement',
    fullName: 'Ramesh Bahadur Singh',
    phone: '+977 9848012345',
    email: 'ramesh.singh.eng@outlook.com',
    date: '2026-08-16',
    status: 'Contacted',
    serviceInterest: 'Property Acquisition Consultancy',
    propertyType: 'Residential Land',
    location: 'Hasanpur or Campus Road, Dhangadhi',
    budget: 'NPR 80 Lakh - 1.2 Crore',
    message: 'Looking for 2 to 3 Katha land with minimum 20 ft paved road access and East or South facing for immediate residential construction.',
    urgency: 'Standard',
    internalRemarks: 'Matched with property KAL-RE-0003. Sent details on WhatsApp.'
  },
  {
    id: 'KAL-LD-0040',
    type: 'Engineering Consultation',
    fullName: 'Dr. Binita Shrestha',
    phone: '+977 9801239876',
    email: 'binita.shrestha.med@gmail.com',
    date: '2026-08-15',
    status: 'Under Process',
    serviceInterest: 'Building Design & Municipal Drawing Approval',
    propertyType: 'Hospital / Polyclinic Building',
    location: 'Near Chauraha, Dhangadhi',
    budget: 'Project construction budget approx. NPR 3 Crore',
    message: 'Need complete architectural planning, structural seismic analysis, and municipal approval (Naxa Paas) for a 4-storey polyclinic.',
    urgency: 'Urgent',
    internalRemarks: 'Architectural concept draft v1 presented. Structural model in progress.'
  },
  {
    id: 'KAL-LD-0039',
    type: 'DPR Consultation',
    fullName: 'Ganga Ram Joshi',
    phone: '+977 9858712399',
    email: 'grjoshi.agro@farwest.np',
    date: '2026-08-14',
    status: 'Site Visit Scheduled',
    serviceInterest: 'DPR for 3,000 MT Cold Storage Plant',
    propertyType: 'Industrial / Agro-Processing',
    location: 'Attariya Industrial Area corridor, Kailali',
    budget: 'Estimated CapEx NPR 8.5 Crore',
    message: 'Need a bankable Detailed Project Report for bank loan syndication and subsidy application.',
    urgency: 'Standard',
    internalRemarks: 'Site visit scheduled for Thursday with structural engineer and financial analyst.'
  },
  {
    id: 'KAL-LD-0038',
    type: 'Property Listing Submission',
    fullName: 'Bikash Rana',
    phone: '+977 9812765432',
    email: 'bikash.rana88@yahoo.com',
    date: '2026-08-12',
    status: 'Completed',
    serviceInterest: 'Commercial Plot Sale Listing',
    propertyType: 'Commercial Land',
    location: 'Main Highway, Dhangadhi',
    budget: 'Asking NPR 3.2 Crore (NPR 80L/Katha)',
    message: 'Want Kaltade to list and provide advisory for sale of our 4 Katha plot. Verified documents available.',
    urgency: 'Standard',
    internalRemarks: 'Property verified, listed as KAL-RE-0001.'
  }
];

const LEADS_STORAGE_KEY = 'kaltade_leads_v1';
const PROPERTIES_STORAGE_KEY = 'kaltade_properties_v1';

export function getLeads(): Lead[] {
  if (typeof window === 'undefined') {
    return INITIAL_LEADS;
  }
  try {
    const stored = localStorage.getItem(LEADS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(INITIAL_LEADS));
      return INITIAL_LEADS;
    }
    return JSON.parse(stored);
  } catch {
    return INITIAL_LEADS;
  }
}

export function saveLead(leadData: Omit<Lead, 'id' | 'date' | 'status'> & Partial<Pick<Lead, 'status'>>): Lead {
  const currentLeads = getLeads();
  const nextNum = currentLeads.length + 43;
  
  // Security Fix: Truncate inputs to prevent storage exhaustion & massive payloads
  const sanitize = (str?: string, max = 500) => str ? str.substring(0, max) : str;
  
  const newLead: Lead = {
    ...leadData,
    fullName: sanitize(leadData.fullName, 100)!,
    phone: sanitize(leadData.phone, 20)!,
    email: sanitize(leadData.email, 100),
    type: sanitize(leadData.type, 100) as any,
    serviceInterest: sanitize(leadData.serviceInterest, 200),
    propertyType: sanitize(leadData.propertyType, 100),
    location: sanitize(leadData.location, 200),
    budget: sanitize(leadData.budget, 100),
    message: sanitize(leadData.message, 2000), // Max 2000 chars for message
    urgency: sanitize(leadData.urgency, 50),
    internalRemarks: sanitize(leadData.internalRemarks, 1000),
    id: `KAL-LD-${String(nextNum).padStart(4, '0')}`,
    date: new Date().toISOString().split('T')[0],
    status: leadData.status || 'New',
  };

  const updated = [newLead, ...currentLeads];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save lead in localStorage', e);
    }
  }
  return newLead;
}

export function updateLeadStatus(id: string, status: Lead['status'], internalRemarks?: string): Lead[] {
  const currentLeads = getLeads();
  const updated = currentLeads.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        status,
        ...(internalRemarks !== undefined ? { internalRemarks } : {})
      };
    }
    return item;
  });

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update lead', e);
    }
  }
  return updated;
}

export function getProperties(): Property[] {
  if (typeof window === 'undefined') {
    return propertiesData;
  }
  try {
    const stored = localStorage.getItem(PROPERTIES_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(PROPERTIES_STORAGE_KEY, JSON.stringify(propertiesData));
      return propertiesData;
    }
    return JSON.parse(stored);
  } catch {
    return propertiesData;
  }
}

export function updatePropertyStatus(id: string, status: PropertyStatus): Property[] {
  const current = getProperties();
  const updated = current.map((p) => (p.id === id ? { ...p, status } : p));
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(PROPERTIES_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update property status', e);
    }
  }
  return updated;
}

export function addProperty(propertyData: Omit<Property, 'id' | 'publishedDate'>): Property {
  const current = getProperties();
  const nextNum = current.length + 1;
  const newProperty: Property = {
    ...propertyData,
    id: `KAL-RE-${String(nextNum).padStart(4, '0')}`,
    publishedDate: new Date().toISOString().split('T')[0]
  };
  const updated = [newProperty, ...current];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(PROPERTIES_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to add property', e);
    }
  }
  return newProperty;
}
