'use client';

import { useState } from 'react';

type Step = 'landing' | 'crew' | 'room';

export default function Home() {
  const [step, setStep] = useState<Step>('landing');
  const [missionName, setMissionName] = useState('');
  const [objective, setObjective] = useState('');

  const crewMembers = [
    { role: 'Architect', desc: 'System structure & flow', icon: '🧠' },
    { role: 'Builder', desc: 'Code & implementation', icon: '⚙️' },
    { role: 'Critic', desc: 'Stress-testing & logic', icon: '🔍' },
    { role: 'Researcher', desc: 'Context & fact retrieval', icon: '📚' },
    { role: 'Designer', desc: 'Interface & experience', icon: '🎨' },
  ];

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between p-8 font-sans selection:bg-neutral-800">
      
      {/* Top Bar / Brand Identity */}
      <header className="max-w-4xl w-full mx-auto flex justify-between items-center border-b border-neutral-900 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            AIrGun
          </h1>
          <p className="text-xs text-neutral-500">Personal Founder's Operating System</p>
        </div>
        {step !== 'landing' && (
          <button 
            onClick={() => setStep('landing')}
            className="text-xs text-neutral-400 hover:text-white transition-colors border border-neutral-800 px-3 py-1.5 rounded-lg bg-neutral-900"
          >
            ← Reset Mission
          </button>
        )}
      </header>

      {/* Main Container */}
      <div className="max-w-4xl w-full mx-auto my-auto py-12">
        
        {/* STEP 1: LANDING & MISSION INPUT */}
        {step === 'landing' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="space-y-2">
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                What mission are we launching today?
              </h2>
              <p className="text-neutral-400 text-sm">
                Initialize a structural objective for your autonomous AI crew.
              </p>
            </div>

            <div className="space-y-4 bg-neutral-900/50 border border-neutral-800/80 p-6 rounded-2xl backdrop-blur-sm">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300 uppercase tracking-wider">Mission Name</label>
                <input 
                  type="text"
                  placeholder="e.g. Build LIPE"
                  value={missionName}
                  onChange={(e) => setMissionName(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300 uppercase tracking-wider">Objective</label>
                <textarea 
                  rows={2}
                  placeholder="Describe the ultimate outcome of this mission..."
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors resize-none"
                />
              </div>

              <button 
                onClick={() => setStep('crew')}
                disabled={!missionName.trim()}
                className="w-full mt-2 bg-white text-neutral-950 font-semibold py-3 px-4 rounded-xl text-sm hover:bg-neutral-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Assemble Crew
              </button>

              {/* Subtle Roster Indicator */}
              <div className="pt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-neutral-500 border-t border-neutral-800/40">
                <span>Crew standing by: Architect, Builder, Critic, Researcher, Designer</span>
                <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Status: Ready
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: CREW ASSEMBLY */}
        {step === 'crew' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">Mission: {missionName}</span>
              <h2 className="text-3xl font-bold tracking-tight text-white">The crew assembles.</h2>
              <p className="text-neutral-400 text-sm">All specialist nodes are locked, loaded, and standing by for execution.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {crewMembers.map((member, idx) => (
                <div key={idx} className="bg-neutral-900 border border-neutral-800/80 p-5 rounded-xl space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl">{member.icon}</span>
                    <span className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      <span className="w-1 h-1 rounded-full bg-emerald-400"></span> Ready
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">{member.role}</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">{member.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setStep('room')}
              className="w-full bg-white text-neutral-950 font-semibold py-3 px-4 rounded-xl text-sm hover:bg-neutral-200 transition-colors"
            >
              Begin Analysis
            </button>
          </div>
        )}

        {/* STEP 3: MISSION ROOM WORKSPACE */}
        {step === 'room' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-end border-b border-neutral-900 pb-4">
              <div>
                <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">Active Mission Room</span>
                <h2 className="text-2xl font-bold tracking-tight text-white mt-1">{missionName}</h2>
              </div>
              <span className="text-xs text-neutral-500 font-mono">ID: AIRGUN-001</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 bg-neutral-900 border border-neutral-800 rounded-xl p-6 min-h-[280px] flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-wider text-neutral-400 mb-2">Objective Context</h3>
                  <p className="text-sm text-neutral-200">{objective || 'No objective statement defined.'}</p>
                </div>
                <div className="border-t border-neutral-800/80 pt-4 mt-6">
                  <span className="text-xs text-neutral-500 font-mono">Status: Awaiting agent synthesis...</span>
                </div>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-wider text-neutral-400 mb-4">Crew Roster</h3>
                  <div className="space-y-3">
                    {crewMembers.map((m, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <span className="text-neutral-300 flex items-center gap-2"><span>{m.icon}</span> {m.role}</span>
                        <span className="text-emerald-400">Standby</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer copyright */}
      <footer className="max-w-4xl w-full mx-auto text-center text-xs text-neutral-500 border-t border-neutral-900/60 pt-4 space-y-1">
        <p>AIrGun OS &bull; Built for Autonomous Founder Execution</p>
        <p className="text-neutral-600 text-[11px]">Conceived by Ragz. Built with Giz & Maya.</p>
      </footer>

    </main>
  );
}