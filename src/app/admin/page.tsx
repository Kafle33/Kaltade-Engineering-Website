'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Users,
  Building2,
  FileCheck2,
  Scale,
  RefreshCw,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Tag,
  Save,
  Briefcase,
  Layers,
} from 'lucide-react';
import {
  getLeads,
  updateLeadStatus,
  getProperties,
  updatePropertyStatus,
} from '@/lib/storage';
import { projectsData } from '@/data/projectsData';
import { formatNPR } from '@/lib/utils';
import { Lead, LeadStatus, LeadType, Property, PropertyStatus } from '@/types';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';

const LEAD_STATUS_OPTIONS: LeadStatus[] = [
  'New',
  'Contacted',
  'Site Visit Scheduled',
  'Under Process',
  'Completed',
  'Closed',
];

const PROPERTY_STATUS_OPTIONS: PropertyStatus[] = [
  'Available',
  'Under Negotiation',
  'Sold',
  'Rented',
  'Unavailable',
  'Under Review',
];

const LEAD_TYPE_FILTERS: (LeadType | 'All')[] = [
  'All',
  'Valuation Request',
  'Engineering Consultation',
  'DPR Consultation',
  'Property Inquiry',
  'Property Listing Submission',
  'Buyer Requirement',
  'General Contact',
];

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Active section tab: 'leads' | 'properties'
  const [activeTab, setActiveTab] = useState<'leads' | 'properties'>('leads');

  // Leads Filter & Search state
  const [leadTypeFilter, setLeadTypeFilter] = useState<LeadType | 'All'>('All');
  const [leadStatusFilter, setLeadStatusFilter] = useState<LeadStatus | 'All'>('All');
  const [leadSearchQuery, setLeadSearchQuery] = useState('');
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);

  // Remarks state for editing
  const [remarksEdit, setRemarksEdit] = useState<{ [id: string]: string }>({});
  const [saveNotification, setSaveNotification] = useState<string | null>(null);

  // Properties Filter & Search state
  const [propertyStatusFilter, setPropertyStatusFilter] = useState<PropertyStatus | 'All'>('All');
  const [propertySearchQuery, setPropertySearchQuery] = useState('');

  // Load initial data
  const loadData = () => {
    setIsLoading(true);
    try {
      const storedLeads = getLeads();
      const storedProperties = getProperties();
      setLeads(storedLeads);
      setProperties(storedProperties);

      // Initialize remarks state
      const initialRemarks: { [id: string]: string } = {};
      storedLeads.forEach((l) => {
        initialRemarks[l.id] = l.internalRemarks || '';
      });
      setRemarksEdit(initialRemarks);
    } catch (e) {
      console.error('Failed to load storage data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Summary Metrics calculations
  const totalLeadsCount = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === 'New').length;
  const valuationRequestsCount = leads.filter((l) => l.type === 'Valuation Request').length;
  const availablePropertiesCount = properties.filter((p) => p.status === 'Available').length;
  const publishedProjectsCount = projectsData.length;

  // Handle Lead Status Change
  const handleLeadStatusChange = (leadId: string, newStatus: LeadStatus) => {
    const updated = updateLeadStatus(leadId, newStatus, remarksEdit[leadId]);
    setLeads(updated);
    showNotification(`Lead ${leadId} status changed to ${newStatus}`);
  };

  // Handle Lead Remarks Save
  const handleSaveRemarks = (leadId: string) => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return;
    const updated = updateLeadStatus(leadId, lead.status, remarksEdit[leadId]);
    setLeads(updated);
    showNotification(`Remarks saved for lead ${leadId}`);
  };

  // Handle Property Status Change
  const handlePropertyStatusChange = (propertyId: string, newStatus: PropertyStatus) => {
    const updated = updatePropertyStatus(propertyId, newStatus);
    setProperties(updated);
    showNotification(`Property ${propertyId} status changed to ${newStatus}`);
  };

  const showNotification = (msg: string) => {
    setSaveNotification(msg);
    setTimeout(() => {
      setSaveNotification(null);
    }, 3500);
  };

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesType =
        leadTypeFilter === 'All' || lead.type === leadTypeFilter;
      const matchesStatus =
        leadStatusFilter === 'All' || lead.status === leadStatusFilter;

      const q = leadSearchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        lead.id.toLowerCase().includes(q) ||
        lead.fullName.toLowerCase().includes(q) ||
        lead.phone.toLowerCase().includes(q) ||
        (lead.email && lead.email.toLowerCase().includes(q)) ||
        (lead.location && lead.location.toLowerCase().includes(q)) ||
        (lead.serviceInterest && lead.serviceInterest.toLowerCase().includes(q));

      return matchesType && matchesStatus && matchesQuery;
    });
  }, [leads, leadTypeFilter, leadStatusFilter, leadSearchQuery]);

  // Filtered Properties
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      const matchesStatus =
        propertyStatusFilter === 'All' || prop.status === propertyStatusFilter;

      const q = propertySearchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        prop.id.toLowerCase().includes(q) ||
        prop.title.toLowerCase().includes(q) ||
        prop.type.toLowerCase().includes(q) ||
        prop.location.address.toLowerCase().includes(q) ||
        prop.location.city.toLowerCase().includes(q);

      return matchesStatus && matchesQuery;
    });
  }, [properties, propertyStatusFilter, propertySearchQuery]);

  // Helper for Status Badge styling
  const getLeadStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'New':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">● New</span>;
      case 'Contacted':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-200">Contacted</span>;
      case 'Site Visit Scheduled':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-900 border border-purple-200">Site Visit</span>;
      case 'Under Process':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-900 border border-indigo-200">In Progress</span>;
      case 'Completed':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">Completed</span>;
      case 'Closed':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">Closed</span>;
    }
  };

  const getPropertyStatusBadge = (status: PropertyStatus) => {
    switch (status) {
      case 'Available':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">● Available</span>;
      case 'Under Negotiation':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">Under Negotiation</span>;
      case 'Sold':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">Sold</span>;
      case 'Rented':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">Rented</span>;
      case 'Unavailable':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-200 text-slate-700">Unavailable</span>;
      case 'Under Review':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">Under Review</span>;
    }
  };

  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-slate-100 min-h-screen">
      {/* Toast Notification */}
      {saveNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-navy-950 text-white px-5 py-3 rounded-xl shadow-2xl border border-navy-800 flex items-center gap-3 text-xs font-bold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{saveNotification}</span>
        </div>
      )}

      {/* Admin Portal Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md bg-navy-950 text-white text-[10px] font-extrabold uppercase tracking-wider">
                Internal Management Portal
              </span>
              <span className="text-xs text-slate-400">• Dhangadhi Office</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
              Kaltade Admin Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Real-time monitoring of client inquiries, bank valuation files, engineering requests, and property listings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy-900 text-xs font-bold transition-colors border border-slate-200"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh Data</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold transition-colors shadow-sm"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </Link>
          </div>
        </div>
      </div>

      {/* Summary Metric Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Total Leads */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Total Leads</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-navy-950">
              {totalLeadsCount}
            </div>
            <div className="text-[11px] text-slate-400">All recorded client inquiries</div>
          </div>

          {/* New Leads */}
          <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-amber-800 text-xs font-bold">
              <span>New / Action Required</span>
              <AlertCircle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-600">
              {newLeadsCount}
            </div>
            <div className="text-[11px] text-amber-700 font-medium">Awaiting first contact</div>
          </div>

          {/* Valuation Requests */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Valuation Requests</span>
              <Scale className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-navy-950">
              {valuationRequestsCount}
            </div>
            <div className="text-[11px] text-slate-400">Bank & personal valuations</div>
          </div>

          {/* Active Properties */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Active Properties</span>
              <Building2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-navy-950">
              {availablePropertiesCount}
            </div>
            <div className="text-[11px] text-slate-400">Currently listed for sale/rent</div>
          </div>

          {/* Published Projects */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Published Case Studies</span>
              <Briefcase className="w-4 h-4 text-navy-700" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-navy-950">
              {publishedProjectsCount}
            </div>
            <div className="text-[11px] text-slate-400">DPR, design & valuation work</div>
          </div>
        </div>
      </div>

      {/* Navigation Switch Tabs: Leads vs Properties */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex border-b border-slate-200 bg-white rounded-t-2xl px-6 pt-3">
          <button
            onClick={() => setActiveTab('leads')}
            className={`pb-3 px-4 text-sm font-extrabold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'leads'
                ? 'border-navy-950 text-navy-950'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Leads & Inquiries Management ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('properties')}
            className={`pb-3 px-4 text-sm font-extrabold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'properties'
                ? 'border-navy-950 text-navy-950'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Properties Inventory ({properties.length})</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TAB 1: LEADS MANAGEMENT */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            {/* Search & Filter Controls Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Search Input */}
                <div className="relative w-full md:max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by ID, client name, phone, or location..."
                    value={leadSearchQuery}
                    onChange={(e) => setLeadSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-navy-950 placeholder-slate-400 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 transition-all"
                  />
                  {leadSearchQuery && (
                    <button
                      onClick={() => setLeadSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <span className="text-xs font-bold text-slate-600 whitespace-nowrap">
                    Status Filter:
                  </span>
                  <select
                    value={leadStatusFilter}
                    onChange={(e) => setLeadStatusFilter(e.target.value as any)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-navy-950 bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 cursor-pointer"
                  >
                    <option value="All">All Statuses ({leads.length})</option>
                    {LEAD_STATUS_OPTIONS.map((st) => (
                      <option key={st} value={st}>
                        {st} ({leads.filter((l) => l.status === st).length})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Lead Type Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 scrollbar-none">
                {LEAD_TYPE_FILTERS.map((type) => {
                  const count =
                    type === 'All'
                      ? leads.length
                      : leads.filter((l) => l.type === type).length;
                  const isSelected = leadTypeFilter === type;

                  return (
                    <button
                      key={type}
                      onClick={() => setLeadTypeFilter(type)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-navy-950 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <span>{type}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-navy-950 uppercase tracking-wider font-extrabold text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4">Lead ID</th>
                      <th className="py-3.5 px-4">Client Name</th>
                      <th className="py-3.5 px-4">Lead Type / Interest</th>
                      <th className="py-3.5 px-4">Phone</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLeads.length > 0 ? (
                      filteredLeads.map((lead) => {
                        const isExpanded = expandedLeadId === lead.id;

                        return (
                          <React.Fragment key={lead.id}>
                            <tr
                              className={`hover:bg-slate-50/80 transition-colors ${
                                isExpanded ? 'bg-slate-50/60' : ''
                              }`}
                            >
                              {/* ID */}
                              <td className="py-3 px-4 font-bold text-navy-950 whitespace-nowrap">
                                <span>{lead.id}</span>
                                {lead.urgency === 'Immediate' && (
                                  <span className="ml-1.5 inline-block w-2 h-2 rounded-full bg-rose-500" title="Immediate Urgency" />
                                )}
                              </td>

                              {/* Client Name */}
                              <td className="py-3 px-4 font-semibold text-navy-950 whitespace-nowrap">
                                {lead.fullName}
                              </td>

                              {/* Type */}
                              <td className="py-3 px-4">
                                <div className="font-medium text-slate-900">{lead.type}</div>
                                {lead.serviceInterest && (
                                  <div className="text-[11px] text-slate-500 truncate max-w-xs">
                                    {lead.serviceInterest}
                                  </div>
                                )}
                              </td>

                              {/* Phone */}
                              <td className="py-3 px-4 font-mono text-slate-800 whitespace-nowrap">
                                <a
                                  href={`tel:${lead.phone}`}
                                  className="hover:text-navy-900 hover:underline"
                                >
                                  {lead.phone}
                                </a>
                              </td>

                              {/* Date */}
                              <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                                {lead.date}
                              </td>

                              {/* Status Dropdown */}
                              <td className="py-3 px-4 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  <select
                                    value={lead.status}
                                    onChange={(e) =>
                                      handleLeadStatusChange(lead.id, e.target.value as LeadStatus)
                                    }
                                    className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-navy-950 focus:ring-1 focus:ring-navy-900 cursor-pointer shadow-sm"
                                  >
                                    {LEAD_STATUS_OPTIONS.map((st) => (
                                      <option key={st} value={st}>
                                        {st}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </td>

                              {/* Actions / Expand Button */}
                              <td className="py-3 px-4 text-right whitespace-nowrap">
                                <button
                                  onClick={() =>
                                    setExpandedLeadId(isExpanded ? null : lead.id)
                                  }
                                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-100 hover:bg-navy-900 hover:text-white transition-colors text-xs font-bold text-slate-700"
                                >
                                  <span>{isExpanded ? 'Hide' : 'Details'}</span>
                                  {isExpanded ? (
                                    <ChevronUp className="w-3.5 h-3.5" />
                                  ) : (
                                    <ChevronDown className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </td>
                            </tr>

                            {/* Expandable Lead Details Row */}
                            {isExpanded && (
                              <tr className="bg-slate-50/90 border-b border-slate-200">
                                <td colSpan={7} className="p-6">
                                  <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-sm">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                                      <div>
                                        <h3 className="text-base font-extrabold text-navy-950">
                                          Lead Dossier: {lead.fullName} ({lead.id})
                                        </h3>
                                        <div className="text-xs text-slate-500 mt-0.5 flex flex-wrap items-center gap-4">
                                          <span>Type: <strong className="text-navy-900">{lead.type}</strong></span>
                                          {lead.urgency && <span>Urgency: <strong className="text-amber-700">{lead.urgency}</strong></span>}
                                          <span>Received on: <strong>{lead.date}</strong></span>
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-2">
                                        {getLeadStatusBadge(lead.status)}
                                      </div>
                                    </div>

                                    {/* Lead Info Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                        <div className="text-slate-400 font-semibold mb-1 flex items-center gap-1">
                                          <Phone className="w-3.5 h-3.5" />
                                          <span>Phone Number</span>
                                        </div>
                                        <div className="font-bold text-navy-950">{lead.phone}</div>
                                      </div>

                                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                        <div className="text-slate-400 font-semibold mb-1 flex items-center gap-1">
                                          <Mail className="w-3.5 h-3.5" />
                                          <span>Email Address</span>
                                        </div>
                                        <div className="font-bold text-navy-950 truncate">
                                          {lead.email || 'Not Provided'}
                                        </div>
                                      </div>

                                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                        <div className="text-slate-400 font-semibold mb-1 flex items-center gap-1">
                                          <MapPin className="w-3.5 h-3.5" />
                                          <span>Location / Property</span>
                                        </div>
                                        <div className="font-bold text-navy-950 truncate">
                                          {lead.location || lead.propertyType || 'N/A'}
                                        </div>
                                      </div>

                                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                        <div className="text-slate-400 font-semibold mb-1">
                                          Budget / Valuation Est.
                                        </div>
                                        <div className="font-bold text-navy-950 truncate">
                                          {lead.budget || 'Standard Fee'}
                                        </div>
                                      </div>
                                    </div>

                                    {/* Message Text */}
                                    <div>
                                      <div className="text-xs font-bold text-navy-950 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                                        <MessageSquare className="w-3.5 h-3.5 text-navy-900" />
                                        <span>Client Message & Scope</span>
                                      </div>
                                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs leading-relaxed text-slate-800 font-normal">
                                        {lead.message || 'No additional message provided.'}
                                      </div>
                                    </div>

                                    {/* Internal Remarks Box */}
                                    <div className="pt-2 border-t border-slate-100">
                                      <div className="flex items-center justify-between mb-1.5">
                                        <label className="text-xs font-bold text-navy-950 uppercase tracking-wider">
                                          Internal Engineer & Admin Remarks:
                                        </label>
                                        <span className="text-[11px] text-slate-400">
                                          Notes on inspections, client callback logs, or valuation dates
                                        </span>
                                      </div>
                                      <div className="flex gap-2 items-start">
                                        <textarea
                                          rows={2}
                                          value={remarksEdit[lead.id] || ''}
                                          onChange={(e) =>
                                            setRemarksEdit({
                                              ...remarksEdit,
                                              [lead.id]: e.target.value,
                                            })
                                          }
                                          placeholder="Enter internal notes, site inspection schedule, or status log..."
                                          className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs text-navy-950 bg-white focus:outline-none focus:ring-2 focus:ring-navy-900"
                                        />
                                        <button
                                          onClick={() => handleSaveRemarks(lead.id)}
                                          className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors shrink-0 mt-0.5"
                                        >
                                          <Save className="w-3.5 h-3.5" />
                                          <span>Save Remarks</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-500">
                          <Users className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                          <div className="font-bold text-sm text-navy-950">No leads match your criteria</div>
                          <p className="text-xs text-slate-400 mt-1">
                            Try adjusting your search keywords or type filters.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROPERTY MANAGEMENT */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            {/* Search & Filter Controls Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Search Input */}
                <div className="relative w-full md:max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search properties by ID, title, type, or address..."
                    value={propertySearchQuery}
                    onChange={(e) => setPropertySearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-navy-950 placeholder-slate-400 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 transition-all"
                  />
                  {propertySearchQuery && (
                    <button
                      onClick={() => setPropertySearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <span className="text-xs font-bold text-slate-600 whitespace-nowrap">
                    Status Filter:
                  </span>
                  <select
                    value={propertyStatusFilter}
                    onChange={(e) => setPropertyStatusFilter(e.target.value as any)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-navy-950 bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 cursor-pointer"
                  >
                    <option value="All">All Statuses ({properties.length})</option>
                    {PROPERTY_STATUS_OPTIONS.map((st) => (
                      <option key={st} value={st}>
                        {st} ({properties.filter((p) => p.status === st).length})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Properties Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-navy-950 uppercase tracking-wider font-extrabold text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4">Property ID</th>
                      <th className="py-3.5 px-4">Title & Location</th>
                      <th className="py-3.5 px-4">Type / Category</th>
                      <th className="py-3.5 px-4">Asking Price</th>
                      <th className="py-3.5 px-4">Current Status</th>
                      <th className="py-3.5 px-4 text-right">Status Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProperties.length > 0 ? (
                      filteredProperties.map((prop) => (
                        <tr key={prop.id} className="hover:bg-slate-50/80 transition-colors">
                          {/* ID */}
                          <td className="py-3.5 px-4 font-mono font-bold text-navy-950 whitespace-nowrap">
                            {prop.id}
                          </td>

                          {/* Title & Location */}
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-navy-950 text-sm max-w-sm line-clamp-1">
                              {prop.title}
                            </div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                              <span>{prop.location.address}, {prop.location.city}</span>
                            </div>
                          </td>

                          {/* Type */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="font-semibold text-slate-900">{prop.type}</div>
                            <div className="text-[11px] text-slate-500">{prop.category} • {prop.transactionType}</div>
                          </td>

                          {/* Price */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="font-black text-navy-950 text-sm">
                              {formatNPR(prop.price)}
                            </div>
                            {prop.priceLabel && (
                              <div className="text-[10px] text-amber-700 font-medium">
                                {prop.priceLabel}
                              </div>
                            )}
                          </td>

                          {/* Status Badge */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            {getPropertyStatusBadge(prop.status)}
                          </td>

                          {/* Status Change Dropdown */}
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <select
                              value={prop.status}
                              onChange={(e) =>
                                handlePropertyStatusChange(
                                  prop.id,
                                  e.target.value as PropertyStatus
                                )
                              }
                              className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-navy-950 focus:ring-1 focus:ring-navy-900 cursor-pointer shadow-sm"
                            >
                              {PROPERTY_STATUS_OPTIONS.map((st) => (
                                <option key={st} value={st}>
                                  {st}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-500">
                          <Building2 className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                          <div className="font-bold text-sm text-navy-950">No properties found</div>
                          <p className="text-xs text-slate-400 mt-1">
                            Try adjusting your status filter or search keywords.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
