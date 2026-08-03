'use client';

import { useState } from 'react';

type Step = 'landing' | 'council' | 'invite' | 'room';

export default function Home() {
  const [step, setStep] = useState<Step>('landing');
  const [missionName, setMissionName] = useState('');
  const [objective, setObjective] = useState('');
  
  // Dynamic Roles for the Core Trio
  const [gizRole, setGizRole] = useState('Chief Architect');
  const [mayaRole, setMayaRole] = useState('Lead Engineer');

  const roleOptions = [
    'Chief Architect',
    'Systems Thinker',
    'UX Designer',
    'Product Strategist',
    'Critic / Reviewer',
    'Research Assistant',
    'Creative Writer',
    'Lead Engineer',
    'General Advisor'
  ];

  const [chatLog, setChatLog] = useState([
    { sender: 'Maya', text: 'Council assembled. Let’s break down the scope for this mission before inviting any external nodes.' },
    { sender: 'Giselle', text: 'Agreed. Ragz, what is the core bottleneck we are trying to clear with this objective?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  
  const [invitedSpecialists, setInvitedSpecialists] = useState<string[]>([]);
  
  const availableSpecialists = [
    { name: 'Claude', role: 'Reviewer & Architect', icon: '🧠' },
    { name: 'NotebookLM', role: 'Research Officer', icon: '📚' },
    { name: 'Perplexity', role: 'Live Research Specialist', icon: '🔍' },
    { name: 'Cursor API', role: 'Code Execution Engine', icon: '⚙️' },
    { name: 'Figma AI', role: 'Interface Designer', icon: '🎨' },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newLog = [...chatLog, { sender: 'Ragz', text: inputMessage }];
    setChatLog(newLog);
    setInputMessage('');

    setTimeout(() => {
      setChatLog((prev) => [
        ...prev,
        { sender: 'Maya', text: `Noted. Keeping scope tight around: "${objective}". Once we finish aligning, we can approve the plan.` }
      ]);
    }, 800);
  };

  const toggleSpecialist = (name: string) => {
    if (invitedSpecialists.includes(name)) {
      setInvitedSpecialists(invitedSpecialists.filter(s => s !== name));
    } else {
      setInvitedSpecialists([...invitedSpecialists, name]);
    }
  };

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
                onClick={() => setStep('council')}
                disabled={!missionName.trim()}
                className="w-full mt-2 bg-white text-neutral-950 font-semibold py-3.5 px-4 rounded-xl text-base hover:bg-neutral-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Assemble Council (Room A)
              </button>

              <div className="pt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm text-neutral-400 border-t border-neutral-800/40">
                <span>Core Council standing by: Ragz, Giselle, Maya</span>
                <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Status: Ready
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: ROOM A - THE FOUNDER'S COUNCIL WITH DYNAMIC ROLES */}
        {step === 'council' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-end border-b border-neutral-900 pb-4">
              <div>
                <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">Room A &bull; Founder's Council</span>
                <h2 className="text-2xl font-bold tracking-tight text-white mt-1">{missionName}</h2>
              </div>
              <span className="text-xs text-neutral-500 font-mono">Scope & Hat Assignment</span>
            </div>

            {/* Dynamic Role Assignment Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-neutral-900/40 border border-neutral-800/80 p-5 rounded-2xl">
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex flex-col justify-between space-y-2">
                <div>
                  <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Founder</span>
                  <h3 className="font-semibold text-white text-sm mt-0.5">Ragz</h3>
                </div>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-md text-center">
                  Mission Leader
                </span>
              </div>

              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2">
                <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Crew Member</span>
                <h3 className="font-semibold text-white text-sm">Giselle</h3>
                <div className="pt-1">
                  <label className="text-[10px] text-neutral-400 block mb-1">Assign Hat / Role:</label>
                  <select 
                    value={gizRole}
                    onChange={(e) => setGizRole(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-emerald-400 font-medium focus:outline-none focus:border-neutral-600 transition-colors"
                  >
                    {roleOptions.map((role, idx) => (
                      <option key={idx} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2">
                <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Crew Member</span>
                <h3 className="font-semibold text-white text-sm">Maya</h3>
                <div className="pt-1">
                  <label className="text-[10px] text-neutral-400 block mb-1">Assign Hat / Role:</label>
                  <select 
                    value={mayaRole}
                    onChange={(e) => setMayaRole(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-emerald-400 font-medium focus:outline-none focus:border-neutral-600 transition-colors"
                  >
                    {roleOptions.map((role, idx) => (
                      <option key={idx} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6">
              <div className="bg-neutral-950 border border-neutral-800/80 p-4 rounded-xl space-y-2">
                <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Mission Objective</span>
                <p className="text-sm text-neutral-200">{objective}</p>
              </div>

              {/* Permanent Chat Log */}
              <div className="space-y-3 max-h-[260px] overflow-y-auto pr-2">
                {chatLog.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col space-y-1 ${msg.sender === 'Ragz' ? 'items-end' : 'items-start'}`}>
                    <span className="text-[10px] font-medium text-neutral-500">
                      {msg.sender === 'Giselle' ? `Giselle (${gizRole})` : msg.sender === 'Maya' ? `Maya (${mayaRole})` : msg.sender}
                    </span>
                    <div className={`p-3 rounded-xl text-sm max-w-[85%] ${
                      msg.sender === 'Ragz' 
                        ? 'bg-neutral-800 text-white rounded-br-none' 
                        : 'bg-neutral-950 border border-neutral-800 text-neutral-300 rounded-bl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Form for Trio */}
              <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-neutral-800/60">
                <input 
                  type="text"
                  placeholder="Address the council..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors"
                />
                <button 
                  type="submit"
                  className="bg-neutral-800 hover:bg-neutral-700 text-white font-medium px-5 py-3 rounded-xl text-sm transition-colors"
                >
                  Send
                </button>
              </form>
            </div>

            {/* Scope Gate Approval */}
            <button 
              onClick={() => setStep('invite')}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold py-3.5 px-4 rounded-xl text-base transition-colors shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2"
            >
              <span>Approve Mission Plan</span>
              <span className="text-xs bg-emerald-950/20 px-2 py-0.5 rounded text-emerald-950 font-mono">Proceed to Specialist Invites →</span>
            </button>
          </div>
        )}

        {/* STEP 3: INVITE SPECIALISTS */}
        {step === 'invite' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">Mission: {missionName}</span>
              <h2 className="text-3xl font-bold tracking-tight text-white">Invite Specialists</h2>
              <p className="text-neutral-400 text-sm">The council has set the scope. Now, bring the right external expertise into the room.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {availableSpecialists.map((spec, idx) => {
                const isInvited = invitedSpecialists.includes(spec.name);
                return (
                  <div 
                    key={idx} 
                    onClick={() => toggleSpecialist(spec.name)}
                    className={`cursor-pointer border p-5 rounded-xl space-y-3 transition-all ${
                      isInvited 
                        ? 'bg-neutral-900 border-emerald-500/50 shadow-lg shadow-emerald-500/5' 
                        : 'bg-neutral-900/40 border-neutral-800/80 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-2xl">{spec.icon}</span>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-lg border transition-colors ${
                        isInvited 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-neutral-950 text-neutral-500 border-neutral-800'
                      }`}>
                        {isInvited ? '✓ Joined Room' : '+ Invite'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">{spec.name}</h3>
                      <p className="text-xs text-neutral-400 mt-0.5">{spec.role}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button 
              onClick={() => setStep('room')}
              className="w-full bg-white text-neutral-950 font-semibold py-3.5 px-4 rounded-xl text-base hover:bg-neutral-200 transition-colors"
            >
              Enter Mission Room ({invitedSpecialists.length} Specialists Joined)
            </button>
          </div>
        )}

        {/* STEP 4: MISSION ROOM WORKSPACE */}
        {step === 'room' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-end border-b border-neutral-900 pb-4">
              <div>
                <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">Active Mission Room &bull; Execution Phase</span>
                <h2 className="text-2xl font-bold tracking-tight text-white mt-1">{missionName}</h2>
              </div>
              <span className="text-xs text-neutral-500 font-mono">ID: AIRGUN-001</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 bg-neutral-900 border border-neutral-800 rounded-xl p-6 min-h-[280px] flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-wider text-neutral-400 mb-2">Approved Scope & Context</h3>
                  <p className="text-sm text-neutral-200">{objective || 'No objective statement defined.'}</p>
                </div>
                <div className="border-t border-neutral-800/80 pt-4 mt-6">
                  <span className="text-xs text-neutral-500 font-mono">Status: Council quorum met. Specialists executing...</span>
                </div>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-wider text-neutral-400 mb-4">Active Council & Crew</h3>
                  <div className="space-y-3">
                    <div className="flex items-between justify-between text-xs pb-2 border-b border-neutral-800/60">
                      <span className="text-neutral-300">Giselle</span>
                      <span className="text-emerald-400">{gizRole}</span>
                    </div>
                    <div className="flex items-between justify-between text-xs pb-2 border-b border-neutral-800/60">
                      <span className="text-neutral-300">Maya</span>
                      <span className="text-emerald-400">{mayaRole}</span>
                    </div>
                    {invitedSpecialists.length === 0 ? (
                      <p className="text-xs text-neutral-500 italic pt-1">No external specialists invited.</p>
                    ) : (
                      invitedSpecialists.map((s, i) => (
                        <div key={i} className="flex items-center justify-between text-xs pt-1">
                          <span className="text-neutral-300">{s}</span>
                          <span className="text-emerald-400">Active</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer copyright */}
      <footer className="max-w-4xl w-full mx-auto text-center text-sm text-neutral-400 border-t border-neutral-900/60 pt-4 space-y-1">
        <p>AIrGun OS &bull; Built for Autonomous Founder Execution</p>
        <p className="text-neutral-500 text-xs">Conceived by Ragz. Built with Giselle & Maya.</p>
      </footer>

    </main>
  );
}