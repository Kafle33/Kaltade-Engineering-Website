import { Lead, Property, PropertyStatus } from '@/types';
import { propertiesData } from '@/data/propertiesData';

// Purely static mockup for form reference IDs
export function saveLead(leadData: Omit<Lead, 'id' | 'date' | 'status'> & Partial<Pick<Lead, 'status'>>): Lead {
  const randomId = Math.floor(Math.random() * 10000);
  return {
    ...leadData,
    id: `KAL-LD-${String(randomId).padStart(4, '0')}`,
    date: new Date().toISOString().split('T')[0],
    status: leadData.status || 'New',
  };
}

export function updateLeadStatus(id: string, status: Lead['status'], internalRemarks?: string): Lead[] {
  return [];
}

export function getProperties(): Property[] {
  // Purely static: return the hardcoded data directly
  return propertiesData;
}

export function updatePropertyStatus(id: string, status: PropertyStatus): Property[] {
  return propertiesData;
}

export function addProperty(propertyData: Omit<Property, 'id' | 'publishedDate'>): Property {
  return propertiesData[0];
}
