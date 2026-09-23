import React, { useState } from 'react';
import { useCases } from '../context/CaseContext';
import { Settings, ShieldCheck, Database, Cpu, Lock, RotateCcw, Check, Sparkles } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { resetToDefaultData, cases } = useCases();
  const [minConfidence, setMinConfidence] = useState(0.85);
  const [piiSanitizerActive, setPiiSanitizerActive] = useState(true);
  const [emergencyBypassActive, setEmergencyBypassActive] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Settings className="w-5 h-5 text-brand-600" /> Platform & Agent Operational Settings
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure multi-agent confidence thresholds, statutory privacy guardrails, and model failover priorities.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" /> Settings successfully updated and applied to the live orchestrator!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Model Cluster Status */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-600" />
            Inference & Multi-Model Failover Cluster
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Primary Engine</span>
              <span className="font-bold text-slate-900">GPT-4o / Claude 3.5</span>
              <span className="text-emerald-600 font-mono text-[10px] block mt-0.5">● Connected (320ms)</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Secondary Failover</span>
              <span className="font-bold text-slate-900">Gemini 1.5 Flash</span>
              <span className="text-emerald-600 font-mono text-[10px] block mt-0.5">● Ready</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">On-Prem Sensitive</span>
              <span className="font-bold text-slate-900">Ollama Llama 3.3 70B</span>
              <span className="text-blue-600 font-mono text-[10px] block mt-0.5">● GPU Standby</span>
            </div>
          </div>
        </div>

        {/* Confidence Thresholds */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            Autonomous Routing Confidence Gates
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between font-semibold text-slate-700">
              <span>Minimum Auto-Routing Confidence Threshold:</span>
              <span className="font-mono text-purple-700 font-bold">{Math.round(minConfidence * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="0.99"
              step="0.01"
              value={minConfidence}
              onChange={e => setMinConfidence(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <p className="text-[11px] text-slate-500">
              Any AI classification scoring below {Math.round(minConfidence * 100)}% will automatically be placed into the Department Human Review Queue with a low-confidence badge.
            </p>
          </div>
        </div>

        {/* Safety & Compliance Toggles */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            DPDP Act & Safety Guardrails
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
              <div>
                <span className="font-bold text-slate-900 block">Microsoft Presidio PII Masking</span>
                <span className="text-slate-500 text-[11px]">
                  Sanitizes Aadhaar, PAN, SSN, bank account numbers, and phone digits before prompt dispatch.
                </span>
              </div>
              <input
                type="checkbox"
                checked={piiSanitizerActive}
                onChange={e => setPiiSanitizerActive(e.target.checked)}
                className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
              <div>
                <span className="font-bold text-slate-900 block">Immediate Crisis / Harassment Bypass</span>
                <span className="text-slate-500 text-[11px]">
                  Directly routes self-harm or physical threat triggers to Campus Security & Counseling SMS alerts.
                </span>
              </div>
              <input
                type="checkbox"
                checked={emergencyBypassActive}
                onChange={e => setEmergencyBypassActive(e.target.checked)}
                className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
              />
            </label>
          </div>
        </div>

        {/* Save and Reset */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset sample database to default state?')) {
                resetToDefaultData();
              }
            }}
            className="px-4 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" /> Reset Mock Database ({cases.length} records)
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg text-xs shadow transition-colors flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" /> Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
};
