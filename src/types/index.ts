export type ServiceDivision = 'engineering' | 'valuation' | 'real-estate';

export type PropertyType =
  | 'Land'
  | 'Residential Land'
  | 'Commercial Land'
  | 'Agricultural Land'
  | 'Development Land'
  | 'House'
  | 'Apartment'
  | 'Residential Building'
  | 'Commercial Building'
  | 'Office Space'
  | 'Showroom'
  | 'Industrial Property'
  | 'Rental Property'
  | 'Investment Property';

export type PropertyStatus =
  | 'Available'
  | 'Under Negotiation'
  | 'Sold'
  | 'Rented'
  | 'Unavailable'
  | 'Under Review';

export type TransactionType = 'Sale' | 'Rent' | 'Lease';

export interface Property {
  id: string; // e.g. KAL-RE-0001
  title: string;
  slug: string;
  type: PropertyType;
  category: 'Land' | 'Residential' | 'Commercial' | 'Industrial' | 'Investment';
  transactionType: TransactionType;
  status: PropertyStatus;
  price: number; // in NPR
  priceLabel?: string; // e.g. "NPR 1.85 Cr" or "NPR 35 Lakh / Katha"
  location: {
    address: string;
    city: string;
    district: string;
    province: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
    landmark?: string;
  };
  specifications: {
    landArea?: string; // e.g. "2 Katha 5 Dhur" or "8,500 sq.ft."
    landAreaSqFt?: number;
    buildingAreaSqFt?: number;
    roadWidthFt?: number;
    roadType?: string; // e.g. "Paved / Blacktopped", "Gravel", "Earthen"
    facing?: 'East' | 'West' | 'North' | 'South' | 'North-East' | 'North-West' | 'South-East' | 'South-West';
    frontageFt?: number;
    floors?: number;
    bedrooms?: number;
    bathrooms?: number;
    parkingSpaces?: number;
    yearBuilt?: number;
    developmentPotential?: string;
  };
  features: string[];
  developmentPotential?: string;
  description: string;
  technicalHighlights?: string[];
  images: string[];
  featured?: boolean;
  publishedDate: string;
  documentsVerified?: boolean;
}

export type LeadType =
  | 'Valuation Request'
  | 'Engineering Consultation'
  | 'DPR Consultation'
  | 'Property Inquiry'
  | 'Property Listing Submission'
  | 'Buyer Requirement'
  | 'General Contact';

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Site Visit Scheduled'
  | 'Under Process'
  | 'Completed'
  | 'Closed';

export interface Lead {
  id: string; // e.g. KAL-LD-0042
  type: LeadType;
  fullName: string;
  phone: string;
  email?: string;
  date: string;
  status: LeadStatus;
  serviceInterest?: string;
  propertyId?: string;
  propertyType?: string;
  location?: string;
  budget?: string;
  message?: string;
  internalRemarks?: string;
  urgency?: 'Standard' | 'Urgent' | 'Immediate';
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  slug: string;
  category: 'Valuation' | 'Engineering' | 'Design' | 'DPR' | 'Commercial Real Estate';
  location: string;
  year: string;
  clientType: 'Financial Institution' | 'Corporate Developer' | 'Commercial Enterprise' | 'Private Owner' | 'Institutional Investor';
  shortDescription: string;
  challenge: string;
  approach: string;
  outcome: string;
  servicesDelivered: string[];
  specifications?: {
    label: string;
    value: string;
  }[];
  images: string[];
  featured?: boolean;
}

export interface InsightArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Valuation' | 'Engineering' | 'Real Estate' | 'Land Development' | 'DPR & Feasibility' | 'Legal & Due Diligence';
  summary: string;
  content: string[];
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
  };
  tags: string[];
  featured?: boolean;
  image: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  slug: string;
  division: ServiceDivision;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  keyBenefits: string[];
  deliverables: string[];
  processSteps: {
    stepNumber: string;
    title: string;
    description: string;
  }[];
  targetAudience: string[];
  iconName: string;
}
