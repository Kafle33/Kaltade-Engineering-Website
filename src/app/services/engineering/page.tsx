'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  Building,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Ruler,
  Layers,
  FileText,
  Hammer,
  HardHat,
  Cpu,
  Zap,
  Activity,
  Check,
  Phone,
  MessageSquare,
  Sparkles,
  Award,
} from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function EngineeringServicesPage() {
  const engineeringPillars = [
    {
      id: 'engineering-consultancy',
      title: 'Engineering Consultancy',
      tagline: 'Structural Integrity & Design Optimization',
      icon: Cpu,
      desc: 'Expert civil and structural engineering advisory for residential buildings, commercial complexes, institutional buildings, and industrial facilities. We perform comprehensive finite element modeling, foundation load calculations, and geotechnical coordination.',
      features: [
        'Advanced finite element structural modeling (ETABS / SAP2000)',
        'Earthquake-resistant reinforced concrete (RCC) and structural steel design',
        'Foundation engineering for varying Terai and hill soil bearing capacities',
        'Cost-effective structural element sizing to prevent material over-design',
      ],
    },
    {
      id: 'building-design',
      title: 'Building Design & Architectural Drawings',
      tagline: 'Functional Aesthetics & Modern Planning',
      icon: Compass,
      desc: 'Complete architectural solutions harmonizing contemporary aesthetics with climate-responsive planning, functional space utilization, and energy efficiency tailored for the Terai and hilly geography of Nepal.',
      features: [
        'Comprehensive architectural floor plans, sections, and elevations',
        'Photorealistic 3D external visualizations and walkthroughs',
        'Integrated Mechanical, Electrical, and Plumbing (MEP) layouts',
        'Vastu-compliant and natural ventilation / daylight optimization',
      ],
    },
    {
      id: 'technical-assessment',
      title: 'Technical Assessment & Structural Audits',
      tagline: 'Safety Evaluation & Asset Longevity',
      icon: Activity,
      desc: 'In-depth diagnostic assessment of existing buildings, structural distress investigation, crack mapping, load capacity verification, and non-destructive testing for renovation, vertical extension, or bank appraisal.',
      features: [
        'Structural health monitoring and crack propagation analysis',
        'Vertical extension and floor addition feasibility audits',
        'Seismic vulnerability and retrofitting advisory',
        'Post-earthquake structural safety certification',
      ],
    },
    {
      id: 'site-inspection',
      title: 'Site Inspection & Quality Supervision',
      tagline: 'On-Site Precision & Code Conformance',
      icon: HardHat,
      desc: 'Rigorous on-site engineering supervision to ensure construction complies strictly with approved structural drawings, material strength standards, reinforcement bar detailing, and safety protocols.',
      features: [
        'Reinforcement bar (rebar) placement and lap length verification before concrete pouring',
        'Concrete mix ratio, slump testing, and curing compliance monitoring',
        'Periodic site visit reports with photographic evidence and rectifications',
        'Contractor work quality evaluation and progress certification',
      ],
    },
    {
      id: 'project-consultancy',
      title: 'Project Consultancy & Municipal Approvals',
      tagline: 'Seamless Statutory Permitting (Naxa Paas)',
      icon: FileText,
      desc: 'End-to-end management of municipal drawing approvals (Naxa Paas) across Dhangadhi Sub-Metropolitan City and municipalities in Sudurpashchim. We ensure 100% statutory compliance with local bylaws.',
      features: [
        'Complete municipal submission drawing sets and structural analysis reports',
        'Strict compliance with municipal setbacks, Ground Coverage, and Floor Area Ratio (FAR)',
        'Soil test documentation and geotechnical report integration',
        'Coordination through municipal engineering departments to final approval certificate',
      ],
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Requirement & Site Analysis',
      desc: 'We analyze your spatial needs, budget, site topography, road access width, soil characteristics, and municipal zoning bylaws.',
      icon: Ruler,
    },
    {
      step: '02',
      title: 'Concept & Architectural Planning',
      desc: 'Drafting functional floor layouts, room zoning, elevations, natural daylight/airflow orientation, and 3D architectural modeling.',
      icon: Compass,
    },
    {
      step: '03',
      title: 'Structural Analysis & NBC Modeling',
      desc: 'Rigorous 3D computer modeling under gravity and seismic forces in compliance with Nepal National Building Code (NBC 105:2020).',
      icon: Cpu,
    },
    {
      step: '04',
      title: 'Working Drawings & Municipal Dossier',
      desc: 'Preparation of structural detailing, bar bending schedules, MEP schematics, and official municipal approval (Naxa Paas) drawings.',
      icon: FileText,
    },
    {
      step: '05',
      title: 'Supervision & Quality Assurance',
      desc: 'On-site engineering inspections at critical stages—foundation, column casting, beam-slab reinforcement—to ensure drawing fidelity.',
      icon: HardHat,
    },
  ];

  const nbcHighlights = [
    {
      code: 'NBC 105:2020',
      title: 'Seismic Design of Buildings in Nepal',
      desc: 'Updated earthquake-resistant engineering standards utilizing response spectrum analysis for high-risk seismic zones across Nepal.',
    },
    {
      code: 'NBC 205:2020 & 201',
      title: 'Mandatory Rules for Reinforced Concrete (RCC)',
      desc: 'Standardized structural framing, ductile detailing of beams and columns, stirrup spacing, and minimum concrete grade compliance.',
    },
    {
      code: 'Municipal Bylaws',
      title: 'Dhangadhi & Regional Building Codes',
      desc: 'Mandatory adherence to road right-of-way setbacks, front/rear/side clearances, rainwater harvesting, and ground coverage limitations.',
    },
    {
      code: 'NBC 206 / 207 / 208',
      title: 'Safety, Plumbing & Electrical Standards',
      desc: 'Sanitary disposal layouts, safe electrical conduit routing, fire exit clearances, and structural life-safety mechanisms.',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 pt-28 sm:pt-32 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy-950 text-white py-16 sm:py-24 mb-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase bg-white/10 text-blue-200 border border-white/15">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                ENGINEERING & TECHNICAL DIVISION
              </span>
              <Badge variant="warning" size="sm">
                NBC Compliant
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Engineering Consultancy, Building Design & Structural Analysis
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              From architectural concepts and NBC 105:2020 seismic analysis to municipal approvals and on-site construction supervision, Kaltade delivers engineering excellence built on technical rigor and safety.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/contact" variant="accent" size="lg">
                Get Engineering Consultation
              </Button>
              <Button href="/services/dpr" variant="white" size="lg">
                View DPR & Feasibility
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
        {/* Visual Process Section */}
        <section>
          <SectionHeader
            eyebrow="OUR WORKFLOW"
            title="The 5-Stage Engineering Process"
            subtitle="A structured, quality-controlled methodology guiding your construction project from raw plot to safe completion."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
            {processSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="relative p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-navy-900/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black font-mono text-navy-300 group-hover:text-navy-900 transition-colors">
                        {step.step}
                      </span>
                      <div className="p-2.5 rounded-xl bg-navy-50 text-navy-900 border border-navy-100 group-hover:bg-navy-900 group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-navy-950 mb-2 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>

                  {idx < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-navy-900 text-white flex items-center justify-center text-[10px] font-bold">
                      →
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 5 Core Pillars Showcase */}
        <section className="space-y-8">
          <SectionHeader
            eyebrow="SPECIALIZED SERVICES"
            title="Comprehensive Engineering Capabilities"
            subtitle="Explore our full spectrum of structural engineering, architectural design, diagnostic audits, and statutory approval services."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {engineeringPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-navy-50 text-navy-900 border border-navy-100 flex items-center justify-center group-hover:bg-navy-900 group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-amber-700 block mb-1 uppercase tracking-wider">
                        {pillar.tagline}
                      </span>
                      <h3 className="text-xl font-bold text-navy-950">
                        {pillar.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {pillar.desc}
                    </p>

                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Key Inclusions:
                      </h4>
                      {pillar.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-100">
                    <Button
                      href="/contact"
                      variant="outline"
                      size="sm"
                      className="w-full justify-between"
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      Inquire About This Service
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* NBC Code Compliance Highlights */}
        <section className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 border border-navy-800 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                SAFETY & STATUTORY EXCELLENCE
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
              Strict Nepal National Building Code (NBC) Compliance
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed mb-10">
              Nepal lies in an active seismic zone. At Kaltade, structural safety is non-negotiable. Every building design, beam-column schedule, and foundation plan strictly adheres to Nepal’s latest building codes and local municipal bylaws.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {nbcHighlights.map((nbc, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-colors"
                >
                  <span className="inline-block px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-bold mb-3 border border-amber-500/30">
                    {nbc.code}
                  </span>
                  <h4 className="text-sm font-bold text-white mb-2">
                    {nbc.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {nbc.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm text-center max-w-4xl mx-auto space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-navy-50 text-navy-900 border border-navy-200 flex items-center justify-center mx-auto">
            <HardHat className="w-7 h-7 text-amber-600" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
            Ready to Start Your Construction or Design Project?
          </h3>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Speak with our civil and structural engineers in Dhangadhi. We review your plot dimensions, municipal bylaws, and architectural needs to deliver reliable, code-compliant designs.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact" variant="accent" size="lg">
              Get Engineering Consultation
            </Button>
            <a
              href="tel:+9779858425256"
              className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-400 text-base px-6 py-3.5 gap-2.5 shadow-sm"
            >
              <Phone className="w-4 h-4 text-amber-600" />
              <span>Call +977-9858425256</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
