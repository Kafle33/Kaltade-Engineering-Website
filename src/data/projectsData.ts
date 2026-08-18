import { ProjectCaseStudy } from '@/types';

export const projectsData: ProjectCaseStudy[] = [
  {
    id: 'PRJ-VAL-01',
    title: 'Comprehensive Asset Valuation for Commercial Banking Collateral',
    slug: 'asset-valuation-commercial-banking-collateral-kailali',
    category: 'Valuation',
    location: 'Dhangadhi & Kailali District, Nepal',
    year: '2025',
    clientType: 'Financial Institution',
    shortDescription: 'Technical property inspection, boundary verification, and valuation report for multi-acre commercial and industrial properties submitted for banking credit facilities.',
    challenge: 'The client required an urgent, exhaustive valuation of several complex collateral parcels involving mixed commercial land, multi-storey RCC structures, and industrial sheds with irregular cadastral boundaries and differing municipal setback requirements.',
    approach: 'Our engineering valuation team performed on-site field surveys with precision electronic distance measurement, cross-referenced cadastral maps against physical occupation, evaluated structural condition and depreciation, and conducted thorough market rate analyses across surrounding transactions.',
    outcome: 'Delivered a standardized, mathematically verified valuation dossier detailing distress value, fair market value, and statutory government rates, enabling the financial institution to make prudent credit decisions within strict deadlines.',
    servicesDelivered: [
      'Field Boundary Measurement & Survey',
      'RCC & Steel Structural Assessment',
      'Cadastral Map (Trace) Alignment Review',
      'Comparative Market Analysis (CMA)',
      'Formal Engineering Valuation Report'
    ],
    specifications: [
      { label: 'Asset Type', value: 'Commercial Land & Multi-Storey Building' },
      { label: 'Evaluation Method', value: 'Cost Approach & Market Comparison' },
      { label: 'Inspection Scope', value: 'Physical Site, Structural, Municipal Setbacks' },
      { label: 'Deliverable', value: 'Complete Bank-Format Valuation Dossier' }
    ],
    images: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true
  },
  {
    id: 'PRJ-DPR-02',
    title: 'Detailed Project Report (DPR) for Modern Agro-Processing & Cold Storage Facility',
    slug: 'dpr-agro-processing-cold-storage-facility-sudurpashchim',
    category: 'DPR',
    location: 'Kailali, Sudurpashchim Province',
    year: '2025',
    clientType: 'Corporate Developer',
    shortDescription: 'Formulation of a bankable Detailed Project Report, including architectural master planning, technical specifications, CapEx budgeting, and 10-year financial feasibility modeling.',
    challenge: 'The developer aimed to secure institutional consortium financing and government capital subsidies for a 5,000 MT multi-chamber cold storage and agro-processing plant, requiring extensive technical validation and robust financial viability projections.',
    approach: 'We developed complete civil, structural, thermal insulation, and MEP architectural designs, estimated detailed bill of quantities (BOQ), conducted regional agricultural yield and demand forecasting, and structured comprehensive discounted cash flow (DCF) financial models.',
    outcome: 'Successfully formulated a bankable DPR that met all compliance guidelines of commercial banks and regulatory authorities, accelerating the project financing approval process.',
    servicesDelivered: [
      'Architectural & Engineering Master Planning',
      'Capacity & Thermal Engineering Assessment',
      'Detailed CapEx & OpEx Cost Estimation',
      '10-Year Financial Modeling (IRR, NPV, DSCR)',
      'Risk Mitigation & Implementation Schedule'
    ],
    specifications: [
      { label: 'Facility Capacity', value: '5,000 Metric Tonnes Multi-Chamber' },
      { label: 'Project Scope', value: 'Civil, Thermal, Electrical, Financial' },
      { label: 'Financial Metrics', value: 'Project IRR, Sensitivity Analysis, Payback' },
      { label: 'Document Type', value: 'Comprehensive Bankable DPR' }
    ],
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true
  },
  {
    id: 'PRJ-ENG-03',
    title: 'Architectural & Structural Engineering Design of 5-Storey Commercial Complex',
    slug: 'architectural-structural-engineering-5-storey-commercial-complex',
    category: 'Design',
    location: 'Dhangadhi, Kailali',
    year: '2024',
    clientType: 'Commercial Enterprise',
    shortDescription: 'Full-phase architectural planning, earthquake-resistant structural analysis (NBC compliant), MEP engineering, and municipal building permit documentation.',
    challenge: 'Designing a modern, energy-efficient commercial complex on a prime highway-adjacent corner plot with specific zoning height limits, parking requirements, and challenging subsoil conditions.',
    approach: 'Utilized advanced 3D building modeling and finite element seismic response spectrum analysis. Designed deep isolated/mat footings, optimized column layouts to create column-free retail showroom spans, and integrated modern glass-facade aesthetic treatments.',
    outcome: 'Obtained prompt municipal building approval (Naxa Paas) and provided clear structural drawings enabling flawless on-site execution on schedule and within budget.',
    servicesDelivered: [
      'Architectural Concept & 3D Visualization',
      'Structural Analysis & Detailing (NBC 105:2020)',
      'Plumbing & Electrical Engineering (MEP)',
      'Municipal Approval Documentation',
      'Site Supervision & Quality Assurance'
    ],
    specifications: [
      { label: 'Built-up Area', value: '18,500 sq.ft.' },
      { label: 'Structural Type', value: 'Earthquake-Resistant RCC Frame' },
      { label: 'Floors', value: 'Basement + 5 Floors' },
      { label: 'Compliance', value: 'Nepal National Building Code (NBC)' }
    ],
    images: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true
  },
  {
    id: 'PRJ-DEV-04',
    title: 'Land Subdivision & Development Master Plan for Residential Neighborhood',
    slug: 'land-subdivision-development-master-plan-residential-kailali',
    category: 'Commercial Real Estate',
    location: 'Kailali District, Nepal',
    year: '2024',
    clientType: 'Corporate Developer',
    shortDescription: 'Topographical land survey, subdivision layout design, internal road network planning, and infrastructure cost estimation for a multi-acre plotted residential community.',
    challenge: 'Transforming an irregular 8-Bigha raw land parcel into an orderly, legally compliant residential subdivision while maximizing sellable plot ratios and ensuring effective stormwater drainage.',
    approach: 'Conducted detailed total station surveys and contour mapping. Designed an interconnected 24-foot and 20-foot road network with open green reserves, designed concrete culvert drainage gradients, and produced individual plot dimension tables with optimal orientation.',
    outcome: 'Delivered an engineered master plan with 72% sellable area efficiency, fully compliant with municipal plotting bylaws, creating substantial value enhancement for the landowners.',
    servicesDelivered: [
      'Contour & Boundary Field Survey',
      'Subdivision Master Planning & Layout',
      'Internal Road & Drainage Engineering',
      'Statutory Setback & Open Space Optimization',
      'Infrastructure BOQ & Phasing Plan'
    ],
    specifications: [
      { label: 'Total Land Area', value: '8 Bigha (approx. 5,83,200 sq.ft.)' },
      { label: 'Plot Count', value: '64 Individual Residential Plots' },
      { label: 'Road Widths', value: '24 ft Primary, 20 ft Secondary' },
      { label: 'Infrastructure', value: 'Integrated Storm Drainage & Electrical' }
    ],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false
  }
];
