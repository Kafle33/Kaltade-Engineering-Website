'use client';

import React, { useState } from 'react';
import { Calculator, ArrowRightLeft, Ruler, RefreshCw, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '@/ui/SectionHeader';
import { sqFtToTeraiUnits, sqFtToHillyUnits } from '@/lib/utils';

export function LandConverterWidget() {
  const [activeSystem, setActiveSystem] = useState<'terai' | 'hilly' | 'sqft'>('terai');

  // Terai inputs
  const [bigha, setBigha] = useState<string>('0');
  const [katha, setKatha] = useState<string>('2');
  const [dhur, setDhur] = useState<string>('0');

  // Hilly inputs
  const [ropani, setRopani] = useState<string>('0');
  const [aana, setAana] = useState<string>('0');
  const [paisa, setPaisa] = useState<string>('0');
  const [daam, setDaam] = useState<string>('0');

  // Direct Sq.Ft input
  const [directSqFt, setDirectSqFt] = useState<string>('7290');

  // Compute total Sq. Feet based on active system
  let totalSqFt = 0;

  if (activeSystem === 'terai') {
    const b = parseFloat(bigha) || 0;
    const k = parseFloat(katha) || 0;
    const d = parseFloat(dhur) || 0;
    totalSqFt = b * 72900 + k * 3645 + d * 182.25;
  } else if (activeSystem === 'hilly') {
    const r = parseFloat(ropani) || 0;
    const a = parseFloat(aana) || 0;
    const p = parseFloat(paisa) || 0;
    const dm = parseFloat(daam) || 0;
    totalSqFt = r * 5476 + a * 342.25 + p * 85.5625 + dm * 21.39;
  } else {
    totalSqFt = parseFloat(directSqFt) || 0;
  }

  const teraiResult = sqFtToTeraiUnits(totalSqFt);
  const hillyResult = sqFtToHillyUnits(totalSqFt);
  const sqMeters = (totalSqFt * 0.092903).toFixed(2);

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="INTERACTIVE PROPERTY TOOL"
          title="Nepal Land Area Measurement Converter"
          subtitle="Instantly convert between the Terai System (Bigha-Katha-Dhur), the Hilly System (Ropani-Aana-Paisa-Daam), and Square Feet / Square Meters."
          align="center"
        />

        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
          {/* Mode Switcher Tabs */}
          <div className="flex items-center justify-center gap-2 mb-8 p-1.5 bg-slate-100 rounded-2xl max-w-md mx-auto">
            <button
              onClick={() => setActiveSystem('terai')}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeSystem === 'terai'
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              Terai (Bigha-Katha)
            </button>
            <button
              onClick={() => setActiveSystem('hilly')}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeSystem === 'hilly'
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              Hilly (Ropani-Aana)
            </button>
            <button
              onClick={() => setActiveSystem('sqft')}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeSystem === 'sqft'
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              Sq. Feet / Meters
            </button>
          </div>

          {/* Dynamic Inputs Area */}
          <div className="mb-8">
            {activeSystem === 'terai' && (
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Bigha (1 = 20 Katha)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={bigha}
                    onChange={(e) => setBigha(e.target.value)}
                    className="w-full px-4 py-3 text-lg font-bold border border-slate-300 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Katha (1 = 20 Dhur)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={katha}
                    onChange={(e) => setKatha(e.target.value)}
                    className="w-full px-4 py-3 text-lg font-bold border border-slate-300 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Dhur
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={dhur}
                    onChange={(e) => setDhur(e.target.value)}
                    className="w-full px-4 py-3 text-lg font-bold border border-slate-300 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none bg-slate-50"
                  />
                </div>
              </div>
            )}

            {activeSystem === 'hilly' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Ropani (1 = 16 Aana)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={ropani}
                    onChange={(e) => setRopani(e.target.value)}
                    className="w-full px-4 py-3 text-lg font-bold border border-slate-300 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Aana (1 = 4 Paisa)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={aana}
                    onChange={(e) => setAana(e.target.value)}
                    className="w-full px-4 py-3 text-lg font-bold border border-slate-300 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Paisa (1 = 4 Daam)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={paisa}
                    onChange={(e) => setPaisa(e.target.value)}
                    className="w-full px-4 py-3 text-lg font-bold border border-slate-300 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Daam
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={daam}
                    onChange={(e) => setDaam(e.target.value)}
                    className="w-full px-4 py-3 text-lg font-bold border border-slate-300 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none bg-slate-50"
                  />
                </div>
              </div>
            )}

            {activeSystem === 'sqft' && (
              <div className="max-w-md mx-auto">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Total Area in Square Feet (sq.ft.)
                </label>
                <input
                  type="number"
                  min="0"
                  value={directSqFt}
                  onChange={(e) => setDirectSqFt(e.target.value)}
                  className="w-full px-4 py-3 text-xl font-bold border border-slate-300 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none bg-slate-50"
                />
              </div>
            )}
          </div>

          {/* Results Display Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-navy-950 text-white border border-navy-800 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-navy-800">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                Equivalent Standard Conversions
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Survey Standard of Nepal
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
              {/* Terai Equivalent */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[11px] uppercase tracking-wider text-blue-300 font-bold mb-1">
                  Terai System (Dhangadhi)
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-white">
                  {teraiResult.label}
                </div>
              </div>

              {/* Hilly Equivalent */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[11px] uppercase tracking-wider text-blue-300 font-bold mb-1">
                  Hilly System (Kathmandu)
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-white">
                  {hillyResult.label}
                </div>
              </div>

              {/* Square Feet */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[11px] uppercase tracking-wider text-blue-300 font-bold mb-1">
                  Square Feet
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-amber-400">
                  {totalSqFt.toLocaleString('en-US', { maximumFractionDigits: 1 })} sq.ft.
                </div>
              </div>

              {/* Square Meters */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[11px] uppercase tracking-wider text-blue-300 font-bold mb-1">
                  Square Meters (m²)
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-emerald-400">
                  {parseFloat(sqMeters).toLocaleString('en-US')} m²
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400 text-center">
              💡 <em>In Far-Western Nepal (Kailali/Kanchanpur), land transactions primarily use Katha and Dhur. 1 Katha = 3,645 sq.ft.</em>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
