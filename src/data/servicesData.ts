import { ServiceDetail } from '@/types';

export const servicesData: ServiceDetail[] = [
  {
    id: 'property-valuation',
    title: 'Property Valuation & Technical Assessment',
    slug: 'property-valuation',
    division: 'valuation',
    tagline: 'Measure. Assess. Understand.',
    shortDescription: 'Professional valuation and asset assessment of land, residential, commercial, and industrial properties for banks, BFIs, institutions, and property owners.',
    fullDescription: 'Kaltade Engineering Services provides comprehensive, technically rigorous property valuation and assessment services. Our valuations follow standardized engineering methodologies, field verification, municipal document review, and prevailing market analytics to deliver authoritative reports accepted by major financial institutions and corporate clients.',
    keyBenefits: [
      'Institutional standard valuation reports for Banks & BFIs',
      'Precise on-site physical measurement & boundary verification',
      'Thorough assessment of structural integrity and depreciation',
      'Transparent market rate and government rate analysis',
      'Rapid turnaround with uncompromising technical accuracy'
    ],
    deliverables: [
      'Comprehensive Property Valuation Report with site photography',
      'Field Measurement Sheet & Boundary Layout Sketch',
      'Distress Value, Fair Market Value, and Government Valuation breakdown',
      'Access Road, Infrastructure, and Physical Feasibility Assessment',
      'Valuation Certificate signed by accredited engineering professionals'
    ],
    processSteps: [
      {
        stepNumber: '01',
        title: 'Document Review',
        description: 'Verification of Lalpurja (Land Ownership Certificate), Cadastral Blueprints (Naksha/Trace), Municipal Approvals, and Tax Receipts.'
      },
      {
        stepNumber: '02',
        title: 'On-Site Field Inspection',
        description: 'Physical inspection of the land parcel or building, boundary verification, surroundings, and municipal road access.'
      },
      {
        stepNumber: '03',
        title: 'Measurement & Assessment',
        description: 'Exact physical measurement, setback checking, structural component evaluation, and age/depreciation calculation.'
      },
      {
        stepNumber: '04',
        title: 'Market & Technical Analysis',
        description: 'Cross-referencing prevailing market transactions, government minimum valuations, and commercial development potential.'
      },
      {
        stepNumber: '05',
        title: 'Valuation Report Preparation',
        description: 'Compilation of the formal engineering valuation report complete with calculations, photographic evidence, and executive summary.'
      }
    ],
    targetAudience: [
      'Commercial Banks, Development Banks & BFIs',
      'Property Owners & Mortgage Borrowers',
      'Real Estate Investors & Corporate Enterprises',
      'Legal & Financial Advisory Firms'
    ],
    iconName: 'Scale'
  },
  {
    id: 'engineering-consultancy',
    title: 'Engineering Consultancy & Technical Services',
    slug: 'engineering-consultancy',
    division: 'engineering',
    tagline: 'Design. Assess. Plan.',
    shortDescription: 'Comprehensive civil and structural engineering consultancy, building designs, technical documentation, site inspections, and municipal drawing approvals.',
    fullDescription: 'From initial architectural concepts to detailed structural design and construction supervision, Kaltade delivers end-to-end engineering consultancy. We combine modern design codes (Nepal National Building Code - NBC) with practical site conditions in the Terai and hilly regions to ensure safety, efficiency, and aesthetic excellence.',
    keyBenefits: [
      'NBC-compliant earthquake-resistant structural analysis',
      'Modern, climate-responsive architectural floor plans & 3D elevations',
      'Complete municipal approval drawing packages',
      'On-site quality inspection and structural health assessments',
      'Accurate bill of quantities (BOQ) and cost estimation'
    ],
    deliverables: [
      'Architectural Working Drawings (Floor Plans, Elevations, Sections)',
      'Structural Analysis Report & Detailing (RCC / Steel framing)',
      'Plumbing, Electrical, and Sanitation (MEP) Layouts',
      'Municipal Approval (Naxa Paas) Documentation',
      'Detailed Bill of Quantities (BOQ) and Rate Analysis'
    ],
    processSteps: [
      {
        stepNumber: '01',
        title: 'Client Requirement & Site Analysis',
        description: 'Understanding client spatial needs, budget parameters, topography, orientation, and local bylaws.'
      },
      {
        stepNumber: '02',
        title: 'Conceptual Architectural Planning',
        description: 'Iterative floor plan drafting, functional zoning, ventilation optimization, and preliminary 3D modeling.'
      },
      {
        stepNumber: '03',
        title: 'Structural Analysis & Design',
        description: 'Finite element structural modeling under gravity and seismic loads ensuring compliance with Nepal Building Codes.'
      },
      {
        stepNumber: '04',
        title: 'Working Drawings & Municipal Dossier',
        description: 'Finalizing construction-ready structural detailing, MEP plans, and municipal permit documentation.'
      },
      {
        stepNumber: '05',
        title: 'Site Quality Inspection & Supervision',
        description: 'Periodic site visits to ensure construction fidelity to engineering specifications and reinforcement standards.'
      }
    ],
    targetAudience: [
      'Commercial & Residential Building Owners',
      'Developers & Construction Companies',
      'Institutions, Schools, Hotels, and Hospitals',
      'Industrial & Warehouse Operators'
    ],
    iconName: 'DraftingCompass'
  },
  {
    id: 'dpr-preparation',
    title: 'Detailed Project Report (DPR) & Feasibility Studies',
    slug: 'dpr-preparation',
    division: 'engineering',
    tagline: 'Turn an idea into a viable project.',
    shortDescription: 'Bankable Detailed Project Reports, technical feasibility studies, financial viability modeling, and risk frameworks for major investment and infrastructure projects.',
    fullDescription: 'A Detailed Project Report (DPR) is the cornerstone of any capital-intensive venture. Kaltade prepares thorough, bankable DPRs that integrate engineering design, market demand analysis, capital expenditure forecasting, operating model economics, and multi-year financial projections to satisfy institutional investors and banking consortia.',
    keyBenefits: [
      'Bankable reports engineered for loan syndication and institutional financing',
      'Rigorous financial modeling (IRR, NPV, Payback Period, Break-even)',
      'Integrated engineering design and technical specifications',
      'Environmental, social, and regulatory risk mitigation strategy',
      'Actionable milestone-based project execution roadmap'
    ],
    deliverables: [
      'Comprehensive DPR Document with Executive Summary',
      'Technical & Architectural Master Plan',
      'Detailed Capital Cost Estimation & Schedule of Quantities',
      'Financial Model with 5-10 Year Projections (P&L, Cash Flows, Balance Sheet)',
      'Sensitivity Analysis and Risk Matrix'
    ],
    processSteps: [
      {
        stepNumber: '01',
        title: 'Project Concept & Objectives',
        description: 'Defining project scope, target capacity, location rationale, and primary investment milestones.'
      },
      {
        stepNumber: '02',
        title: 'Technical & Site Analysis',
        description: 'Site feasibility, soil conditions, civil design, utility requirements (water, power, access), and technology selection.'
      },
      {
        stepNumber: '03',
        title: 'Market & Demand Analysis',
        description: 'Assessment of regional market dynamics, target consumer segments, pricing structure, and competitor capacity.'
      },
      {
        stepNumber: '04',
        title: 'Cost Estimation & Financial Modeling',
        description: 'Civil and equipment CapEx breakdown, OpEx forecasting, debt-equity structuring, and DCF return metrics.'
      },
      {
        stepNumber: '05',
        title: 'Implementation & Risk Framework',
        description: 'Project schedule Gantt chart, procurement planning, operational risks, and contingency safeguards.'
      }
    ],
    targetAudience: [
      'Hotels, Resorts & Hospitality Developers',
      'Agro-processing, Cold Storage & Industrial Plants',
      'Commercial Malls & Mixed-Use Complex Promoters',
      'Educational & Healthcare Institutions'
    ],
    iconName: 'FileSpreadsheet'
  },
  {
    id: 'real-estate-consultancy',
    title: 'Real Estate Consultancy & Advisory',
    slug: 'real-estate-consultancy',
    division: 'real-estate',
    tagline: 'Find. Evaluate. Decide.',
    shortDescription: 'Professional property advisory for buying, selling, and strategic acquisition of land, commercial properties, and residential assets with engineering diligence.',
    fullDescription: 'Navigating property in Nepal requires more than classified browsing; it demands technical due diligence, access verification, zoning awareness, and realistic market valuation. Kaltade provides advisory services to protect buyers and assist sellers, ensuring decisions are grounded in engineering facts and clear documentation.',
    keyBenefits: [
      'Objective property assessment backed by certified engineering scrutiny',
      'Direct matchmaking between genuine buyers and verified sellers',
      'Precise physical boundary, road width, and setback inspection',
      'Fair market pricing guidance to prevent overpaying or undervaluation',
      'Assistance through transparent, structured processes'
    ],
    deliverables: [
      'Property Assessment & Suitability Report',
      'Comparative Market Analysis (CMA)',
      'Infrastructure & Municipal Road Right-of-Way Check',
      'Transaction Feasibility & Valuation Overview',
      'Dedicated Buyer / Seller Coordination'
    ],
    processSteps: [
      {
        stepNumber: '01',
        title: 'Requirement Definition',
        description: 'Consultation to capture exact budget, land area, road access, facing, and intended property usage.'
      },
      {
        stepNumber: '02',
        title: 'Property Identification & Shortlisting',
        description: 'Screening verified properties in Dhangadhi, Kailali, and surrounding regions matching parameters.'
      },
      {
        stepNumber: '03',
        title: 'Physical & Technical Screening',
        description: 'Conducting preliminary site visits, road measurement, and land topography evaluation.'
      },
      {
        stepNumber: '04',
        title: 'Valuation & Commercial Negotiation',
        description: 'Reviewing realistic property valuation to establish balanced, evidence-based commercial terms.'
      },
      {
        stepNumber: '05',
        title: 'Due Diligence & Finalization',
        description: 'Facilitating technical review of available paperwork prior to formal legal conveyancing.'
      }
    ],
    targetAudience: [
      'Individual Property Buyers & Homebuilders',
      'Landowners & Property Sellers',
      'Commercial Enterprises expanding regional branches',
      'High-Net-Worth Diaspora & Regional Investors'
    ],
    iconName: 'Building2'
  },
  {
    id: 'property-due-diligence',
    title: 'Property Due Diligence & Technical Verification',
    slug: 'property-due-diligence',
    division: 'real-estate',
    tagline: 'Verify before you invest.',
    shortDescription: 'Independent technical due diligence, physical site verification, road right-of-way confirmation, and building structural screening prior to acquisition.',
    fullDescription: 'Avoid costly property disputes and technical surprises. Kaltade performs independent technical due diligence on land parcels and buildings. We cross-examine physical boundaries against cadastral maps (Cadastral Naksha/Trace), verify official municipal road expansions, inspect building permits, and evaluate structural condition.',
    keyBenefits: [
      'Physical boundary vs. Cadastral Trace map discrepancy detection',
      'Municipal road setback and future right-of-way expansion clearance',
      'Building structural health, age, and code violation check',
      'High-tension power line, river setback, and environmental hazard screening',
      'Clear, independent written due diligence report'
    ],
    deliverables: [
      'Comprehensive Technical Due Diligence Report',
      'Physical Survey vs. Naksha Discrepancy Note',
      'Access Road Right-of-Way & Municipal Setback Status',
      'Structural Condition Summary (for built properties)',
      'Development Potential and Risk Highlights'
    ],
    processSteps: [
      {
        stepNumber: '01',
        title: 'Preliminary Document Review',
        description: 'Inspection of Lalpurja, Cadastral Trace map, and municipal approved building drawings.'
      },
      {
        stepNumber: '02',
        title: 'Field Survey & Boundary Check',
        description: 'Precision physical measurement of plot dimensions, frontage, and alignment against surrounding plots.'
      },
      {
        stepNumber: '03',
        title: 'Infrastructure & Road Right-of-Way',
        description: 'Verification of municipal road widths, planned road widening setbacks, and drainage/utility access.'
      },
      {
        stepNumber: '04',
        title: 'Hazard & Restriction Analysis',
        description: 'Assessment of flood risks, river buffers, high-tension electrical clearance, and zoning constraints.'
      },
      {
        stepNumber: '05',
        title: 'Final Due Diligence Brief',
        description: 'Delivery of the technical diligence memorandum outlining findings, risks, and advisory recommendations.'
      }
    ],
    targetAudience: [
      'Prospective Property Buyers & Commercial Acquirers',
      'Institutional Investors & Corporate Developers',
      'Banks & BFIs reviewing collateral integrity',
      'Legal practitioners requiring technical field backing'
    ],
    iconName: 'ShieldCheck'
  },
  {
    id: 'land-development',
    title: 'Land Development & Master Planning Consultancy',
    slug: 'land-development',
    division: 'real-estate',
    tagline: 'Maximize land value through intelligent planning.',
    shortDescription: 'Site feasibility, plotted land subdivision design, road network layout, area utilization optimization, and infrastructure cost estimation.',
    fullDescription: 'Transform raw acreage into well-structured, high-value residential or commercial developments. Kaltade provides engineering-backed land development consultancy, maximizing sellable plot ratios while maintaining optimal access road networks, open green spaces, stormwater drainage, and statutory compliance.',
    keyBenefits: [
      'Optimal plot layout maximizing sellable area while conforming to bylaws',
      'Engineering design for internal roads, storm drainage, and electricity',
      'Topographical assessment and earthwork cut-and-fill optimization',
      'Accurate preliminary infrastructure CapEx estimation',
      'Phased development strategy to align cash inflows with construction'
    ],
    deliverables: [
      'Comprehensive Land Subdivision Master Plan (Plotted Layout)',
      'Plot Dimension Schedule with individual plot areas and facing',
      'Internal Road Network and Drainage Engineering Layouts',
      'Earthwork, Paving, and Infrastructure Cost Estimation',
      'Project Financial Feasibility & Sell-out Revenue Forecast'
    ],
    processSteps: [
      {
        stepNumber: '01',
        title: 'Topographical & Boundary Survey',
        description: 'Accurate total station/physical survey of perimeter, elevation contours, and existing site features.'
      },
      {
        stepNumber: '02',
        title: 'Bylaws & Access Study',
        description: 'Reviewing municipal subdivision norms, minimum road width requirements, and open space mandates.'
      },
      {
        stepNumber: '03',
        title: 'Subdivision Master Planning',
        description: 'Drafting optimal plotted layouts with balanced road hierarchy, plot shapes, and maximum frontage.'
      },
      {
        stepNumber: '04',
        title: 'Infrastructure Engineering & BOQ',
        description: 'Detailing road pavement sections, stormwater culverts, electrical conduit routing, and BOQ.'
      },
      {
        stepNumber: '05',
        title: 'Feasibility & Implementation Phasing',
        description: 'Structuring execution timeline, unit pricing recommendations, and phased infrastructure rollout.'
      }
    ],
    targetAudience: [
      'Large Landowners seeking value multiplication',
      'Real Estate Developers & Plotting Promoters',
      'Agricultural Land conversion investors',
      'Corporate entities developing private campuses'
    ],
    iconName: 'MapPin'
  }
];
