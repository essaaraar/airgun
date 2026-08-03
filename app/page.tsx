'use client';

import { useState } from 'react';

type Step = 'landing' | 'council' | 'invite' | 'room';

interface ChatMessage {
  sender: string;
  roleTag: string;
  text: string;
  timestamp: string;
  relativeTime: string;
}

interface TimelineEvent {
  label: string;
  time: string;
}

interface Guest {
  name: string;
  email: string;
  specialty: string;
}

export default function Home() {
  const [step, setStep] = useState<Step>('landing');
  const [missionName, setMissionName] = useState('');
  const [objective, setObjective] = useState('');
  
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

  const missionStartTime = useState(() => Date.now())[0];

  const getAbsoluteTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  };

  const getRelativeTime = () => {
    const diffSeconds = Math.floor((Date.now() - missionStartTime) / 1000);
    const mins = Math.floor(diffSeconds / 60);
    const secs = diffSeconds % 60;
    return `+${mins > 0 ? `${mins}m ` : ''}${secs}s`;
  };

  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([
    { label: 'Mission Initialized', time: getAbsoluteTime() }
  ]);

  const [chatLog, setChatLog] = useState<ChatMessage[]>([
    { sender: 'Maya', roleTag: 'Lead Engineer', text: 'Council assembled. Let’s break down the scope for this mission before inviting any external nodes.', timestamp: getAbsoluteTime(), relativeTime: getRelativeTime() },
    { sender: 'Giselle', roleTag: 'Chief Architect', text: 'Agreed. Ragz, what is the core bottleneck we are trying to clear with this objective?', timestamp: getAbsoluteTime(), relativeTime: getRelativeTime() }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [invitedSpecialists, setInvitedSpecialists] = useState<string[]>([]);
  
  const [guest, setGuest] = useState<Guest | null>(null);
  const [guestNameInput, setGuestNameInput] = useState('');
  const [guestEmailInput, setGuestEmailInput] = useState('');
  const [guestSpecialtyInput, setGuestSpecialtyInput] = useState('');
  const [showGuestModal, setShowGuestModal] = useState(false);

  const [missionVaultItems, setMissionVaultItems] = useState<string[]>([
    'Initial Scope Definition Document',
    'Core Architecture Blueprint (Draft)'
  ]);
  const [newVaultItem, setNewVaultItem] = useState('');

  const availableSpecialists = [
    { name: 'Claude', role: 'Reviewer & Architect', icon: '🧠' },
    { name: 'NotebookLM', role: 'Research Officer', icon: '📚' },
    { name: 'Perplexity', role: 'Live Research Specialist', icon: '🔍' },
    { name: 'Cursor API', role: 'Code Execution Engine', icon: '⚙️' },
    { name: 'Figma AI', role: 'Interface Designer', icon: '🎨' },
  ];

  const addTimelineEvent = (label: string) => {
    setTimelineEvents(prev => [...prev, { label, time: getAbsoluteTime() }]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsgTime = getAbsoluteTime();
    const userRelTime = getRelativeTime();

    setChatLog(prev => [
      ...prev, 
      { sender: 'Ragz', roleTag: 'The Known Stranger', text: inputMessage, timestamp: userMsgTime, relativeTime: userRelTime }
    ]);
    setInputMessage('');

    setTimeout(() => {
      const mayaMsgTime = getAbsoluteTime();
      const mayaRelTime = getRelativeTime();
      setChatLog((prev) => [
        ...prev,
        { sender: 'Maya', roleTag: mayaRole, text: `Execution update received. Continuing to drive objective: "${objective}".`, timestamp: mayaMsgTime, relativeTime: mayaRelTime }
      ]);
    }, 800);
  };

  const toggleSpecialist = (name: string) => {
    if (invitedSpecialists.includes(name)) {
      setInvitedSpecialists(invitedSpecialists.filter(s => s !== name));
    } else {
      setInvitedSpecialists([...invitedSpecialists, name]);
      addTimelineEvent(`${name} Joined Mission Room`);
    }
  };

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestNameInput.trim()) return;

    const newGuest: Guest = {
      name: guestNameInput,
      email: guestEmailInput || 'no-email@provided.com',
      specialty: guestSpecialtyInput || 'Human Advisor'
    };

    // Trigger backend email API route
    try {
      const response = await fetch('/api/invite-guest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newGuest.name,
          email: newGuest.email,
          specialty: newGuest.specialty,
          missionName: missionName || 'Mission',
          objective: objective || 'Autonomous execution'
        }),
      });

      const result = await response.json();
      if (!result.success) {
        console.error("Email dispatch failed:", result.error);
      }
    } catch (err) {
      console.error("Network error sending email:", err);
    }

    setGuest(newGuest);
    addTimelineEvent(`Human Guest Invited: ${newGuest.name} (${newGuest.specialty})`);
    setShowGuestModal(false);
    
    setChatLog(prev => [
      ...prev,
      { 
        sender: 'System', 
        roleTag: 'Access Control', 
        text: `${newGuest.name} has entered Room B for project "${missionName || 'Mission'}". Specialty: ${newGuest.specialty}.`, 
        timestamp: getAbsoluteTime(), 
        relativeTime: getRelativeTime() 
      }
    ]);

    setGuestNameInput('');
    setGuestEmailInput('');
    setGuestSpecialtyInput('');
  };

  const handleKickGuest = () => {
    if (!guest) return;
    const kickedName = guest.name;
    setGuest(null);
    addTimelineEvent(`Human Guest Removed: ${kickedName} by Council Agreement`);
    setChatLog(prev => [
      ...prev,
      { 
        sender: 'System', 
        roleTag: 'Access Control', 
        text: `${kickedName} has been removed from Room B by consensus of the Core Council.`, 
        timestamp: getAbsoluteTime(), 
        relativeTime: getRelativeTime() 
      }
    ]);
  };

  const handleAddVaultItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVaultItem.trim()) return;
    setMissionVaultItems([...missionVaultItems, newVaultItem]);
    addTimelineEvent(`Artifact Added to Mission Vault: ${newVaultItem}`);
    setNewVaultItem('');
  };

  return (
    <main className="min-h-screen bg-black text-neutral-100 flex flex-col justify-between p-8 font-sans selection:bg-neutral-800">
      
      {/* Hardened Zero-White-Background Scrollbar Overrides */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
          background: #000000;
        }
        ::-webkit-scrollbar-track {
          background: #000000;
        }
        ::-webkit-scrollbar-corner {
          background: #000000;
        }
        ::-webkit-scrollbar-thumb {
          background: #262626;
          border-radius: 9999px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #404040;
        }
      `}</style>
      
      {/* Top Bar / Brand Identity */}
      <header className="max-w-4xl w-full mx-auto flex justify-between items-center border-b border-neutral-900 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            AIrGun
          </h1>
          <p className="text-xs text-neutral-500">Personal Founder's Operating System &bull; Flight Recorder Enabled</p>
        </div>
        {step !== 'landing' && (
          <button 
            onClick={() => { setStep('landing'); }}
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

            <div className="space-y-4 bg-neutral-900/40 border border-neutral-900 p-6 rounded-2xl">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Mission Name (Project)</label>
                <input 
                  type="text"
                  placeholder="e.g. Build LIPE"
                  value={missionName}
                  onChange={(e) => setMissionName(e.target.value)}
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Objective</label>
                <textarea 
                  rows={2}
                  placeholder="Describe the ultimate outcome of this mission..."
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors resize-none"
                />
              </div>

              <button 
                onClick={() => {
                  setStep('council');
                  addTimelineEvent('Council Assembled (Room A)');
                }}
                disabled={!missionName.trim()}
                className="w-full mt-2 bg-white text-black font-semibold py-3.5 px-4 rounded-xl text-base hover:bg-neutral-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Assemble Council (Room A)
              </button>

              <div className="pt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm text-neutral-400 border-t border-neutral-900">
                <span>Core Council standing by: Ragz, Giselle, Maya</span>
                <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Status: Ready
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: ROOM A - THE FOUNDER'S COUNCIL */}
        {step === 'council' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-end border-b border-neutral-900 pb-4">
              <div>
                <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">Room A &bull; Founder's Council</span>
                <h2 className="text-2xl font-bold tracking-tight text-white mt-1">{missionName}</h2>
              </div>
              <span className="text-xs text-neutral-500 font-mono">Flight Recorder Active</span>
            </div>

            {/* Permanent Identities & Hats Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-neutral-950 border border-neutral-900 p-5 rounded-2xl">
              
              {/* Ragz */}
              <div className="bg-black p-4 rounded-xl border border-neutral-900 flex flex-col justify-between space-y-2">
                <div>
                  <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Founder</span>
                  <h3 className="font-semibold text-white text-sm mt-0.5">Ragz</h3>
                </div>
                <span className="text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-md text-center font-medium">
                  The Known Stranger
                </span>
              </div>

              {/* Giselle */}
              <div className="bg-black p-4 rounded-xl border border-neutral-900 space-y-2">
                <div>
                  <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">The Architect Who Won't Stop Asking "Why?"</span>
                  <h3 className="font-semibold text-white text-sm mt-0.5">Giselle</h3>
                </div>
                <div className="pt-1">
                  <label className="text-[10px] text-neutral-400 block mb-1">Mission Hat / Specialty:</label>
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

              {/* Maya */}
              <div className="bg-black p-4 rounded-xl border border-neutral-900 space-y-2">
                <div>
                  <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">The Builder Who Says "Ship It... After You Sleep."</span>
                  <h3 className="font-semibold text-white text-sm mt-0.5">Maya</h3>
                </div>
                <div className="pt-1">
                  <label className="text-[10px] text-neutral-400 block mb-1">Mission Hat / Specialty:</label>
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

            {/* Unified Stream Chat Feed with Framed & Padded Container */}
            <div className="bg-black border border-neutral-800/80 rounded-2xl p-6 space-y-6 shadow-xl">
              
              <div className="bg-neutral-950 border border-neutral-900 px-4 py-3 rounded-xl flex items-center justify-between text-xs text-neutral-400">
                <span>Objective: <strong className="text-white">{objective}</strong></span>
                <span className="text-neutral-500 font-mono">Flight Log Feed</span>
              </div>

              {/* Continuous Left-Aligned Stream with generous bottom spacing so text never clips */}
              <div className="space-y-6 max-h-[340px] overflow-y-auto pr-2 pb-2">
                {chatLog.map((msg, idx) => {
                  const isUser = msg.sender === 'Ragz';
                  const isSystem = msg.sender === 'System';
                  return (
                    <div key={idx} className="flex flex-col items-start w-full">
                      <div className="flex items-center justify-between w-full mb-1.5 px-1">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs font-semibold ${isUser ? 'text-emerald-400' : isSystem ? 'text-amber-400 font-mono text-[11px]' : 'text-white'}`}>
                            {msg.sender}
                          </span>
                          <span className="text-[10px] text-neutral-400">({msg.roleTag})</span>
                        </div>
                        {/* Absolute + Relative Time Pill */}
                        <span className="text-[11px] font-mono text-neutral-300 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded-md flex items-center gap-1.5">
                          <span>{msg.timestamp}</span>
                          <span className="text-emerald-400 font-medium">({msg.relativeTime})</span>
                        </span>
                      </div>
                      <div className="text-sm text-neutral-300 text-left pl-1 leading-relaxed w-full">
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              <form onSubmit={handleSendMessage} className="flex items-center gap-3 pt-4 border-t border-neutral-800/80">
                <input 
                  type="text"
                  placeholder="Message the council..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 bg-black border border-neutral-800 rounded-full px-5 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors"
                />
                <button 
                  type="submit"
                  className="bg-white hover:bg-neutral-200 text-black font-semibold px-6 py-3 rounded-full text-sm transition-colors"
                >
                  Send
                </button>
              </form>
            </div>

            {/* Scope Gate Approval */}
            <button 
              onClick={() => {
                setStep('invite');
                addTimelineEvent('Mission Plan Approved by Founder');
              }}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3.5 px-4 rounded-xl text-base transition-colors shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2"
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
                        ? 'bg-neutral-950 border-emerald-500/50 shadow-lg shadow-emerald-500/5' 
                        : 'bg-black border-neutral-900 hover:border-neutral-800'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-2xl">{spec.icon}</span>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-lg border transition-colors ${
                        isInvited 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-black text-neutral-500 border-neutral-800'
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
              onClick={() => {
                setStep('room');
                addTimelineEvent('Entered Mission Execution Room B');
              }}
              className="w-full bg-white text-black font-semibold py-3.5 px-4 rounded-xl text-base hover:bg-neutral-200 transition-colors"
            >
              Enter Mission Room ({invitedSpecialists.length} Specialists Joined{guest ? ' + 1 Guest' : ''})
            </button>
          </div>
        )}

        {/* STEP 4: MISSION ROOM WORKSPACE WITH PERSISTENT STREAM, MISSION VAULT & GUEST CONTROLS */}
        {step === 'room' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-end border-b border-neutral-900 pb-4">
              <div>
                <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">Active Mission Room B &bull; Project: {missionName}</span>
                <h2 className="text-2xl font-bold tracking-tight text-white mt-1">{objective || missionName}</h2>
              </div>
              <span className="text-xs text-neutral-500 font-mono">Flight Recorder Logged</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Left Column: Continuous Chat Stream & Input */}
              <div className="md:col-span-2 bg-black border border-neutral-800/80 rounded-2xl p-6 space-y-6 flex flex-col justify-between shadow-xl">
                
                <div className="bg-neutral-950 border border-neutral-900 px-4 py-3 rounded-xl flex items-center justify-between text-xs text-neutral-400">
                  <span>Active Execution Stream</span>
                  <span className="text-emerald-400 font-mono">Live Room B Chat</span>
                </div>

                {/* Persistent Chat Log Feed with safe bottom padding */}
                <div className="space-y-6 max-h-[340px] overflow-y-auto pr-2 pb-2">
                  {chatLog.map((msg, idx) => {
                    const isUser = msg.sender === 'Ragz';
                    const isSystem = msg.sender === 'System';
                    return (
                      <div key={idx} className="flex flex-col items-start w-full">
                        <div className="flex items-center justify-between w-full mb-1.5 px-1">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-xs font-semibold ${isUser ? 'text-emerald-400' : isSystem ? 'text-amber-400 font-mono text-[11px]' : 'text-white'}`}>
                              {msg.sender}
                            </span>
                            <span className="text-[10px] text-neutral-400">({msg.roleTag})</span>
                          </div>
                          {/* Absolute + Relative Time Pill */}
                          <span className="text-[11px] font-mono text-neutral-300 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded-md flex items-center gap-1.5">
                            <span>{msg.timestamp}</span>
                            <span className="text-emerald-400 font-medium">({msg.relativeTime})</span>
                          </span>
                        </div>
                        <div className="text-sm text-neutral-300 text-left pl-1 leading-relaxed w-full">
                          {msg.text}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Room B Chat Input */}
                <form onSubmit={handleSendMessage} className="flex items-center gap-3 pt-4 border-t border-neutral-800/80">
                  <input 
                    type="text"
                    placeholder="Message the active room crew..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-1 bg-black border border-neutral-800 rounded-full px-5 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors"
                  />
                  <button 
                    type="submit"
                    className="bg-white hover:bg-neutral-200 text-black font-semibold px-6 py-3 rounded-full text-sm transition-colors"
                  >
                    Send
                  </button>
                </form>
              </div>

              {/* Right Column: Crew, Mission Vault, and Flight Recorder */}
              <div className="space-y-4">
                
                {/* Active Council & Crew Panel with Guest Controls */}
                <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-medium uppercase tracking-wider text-neutral-400">Crew in Room</h3>
                    {!guest && (
                      <button 
                        onClick={() => setShowGuestModal(true)}
                        className="text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-md hover:bg-emerald-500/25 transition-colors font-medium"
                      >
                        + Invite Guest
                      </button>
                    )}
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-neutral-900">
                      <span className="text-neutral-300">Ragz</span>
                      <span className="text-emerald-400 font-medium text-[10px]">Founder</span>
                    </div>
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-neutral-900">
                      <span className="text-neutral-300">Giselle</span>
                      <span className="text-emerald-400 font-medium text-[10px]">{gizRole}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-neutral-900">
                      <span className="text-neutral-300">Maya</span>
                      <span className="text-emerald-400 font-medium text-[10px]">{mayaRole}</span>
                    </div>

                    {/* Guest Display if active */}
                    {guest && (
                      <div className="bg-neutral-900/80 border border-amber-500/30 p-2.5 rounded-lg space-y-1.5 my-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-amber-300 font-semibold">{guest.name}</span>
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-mono">Human Guest</span>
                        </div>
                        <p className="text-[10px] text-neutral-400">Purpose: {guest.specialty}</p>
                        <button 
                          onClick={handleKickGuest}
                          className="w-full mt-1 bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-500/30 text-[10px] py-1 rounded transition-colors font-medium"
                        >
                          Kick Out Guest (Consensus)
                        </button>
                      </div>
                    )}

                    {invitedSpecialists.length === 0 ? (
                      <p className="text-xs text-neutral-500 italic pt-1">No AI specialists invited.</p>
                    ) : (
                      invitedSpecialists.map((s, i) => (
                        <div key={i} className="flex items-center justify-between text-xs pt-1">
                          <span className="text-neutral-300">{s}</span>
                          <span className="text-emerald-400 text-[10px]">Active Node</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Mission Vault */}
                <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-5 space-y-3">
                  <h3 className="text-xs font-medium uppercase tracking-wider text-emerald-400 flex items-center justify-between">
                    <span>Mission Vault</span>
                    <span className="text-[10px] text-neutral-500 font-mono">Deliverables</span>
                  </h3>
                  <div className="space-y-1.5 max-h-[120px] overflow-y-auto pr-1">
                    {missionVaultItems.map((item, idx) => (
                      <div key={idx} className="text-xs text-neutral-300 bg-neutral-900/60 border border-neutral-800/80 px-2.5 py-1.5 rounded-lg flex items-center gap-2">
                        <span className="text-emerald-400 text-[10px]">📄</span>
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleAddVaultItem} className="flex gap-2 pt-1">
                    <input 
                      type="text"
                      placeholder="Add deliverable..."
                      value={newVaultItem}
                      onChange={(e) => setNewVaultItem(e.target.value)}
                      className="flex-1 bg-black border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600"
                    />
                    <button type="submit" className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs px-2.5 py-1.5 rounded-lg font-medium transition-colors">
                      +
                    </button>
                  </form>
                </div>

                {/* Flight Recorder Timeline Drawer */}
                <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-5 space-y-3">
                  <h3 className="text-xs font-medium uppercase tracking-wider text-emerald-400 flex items-center justify-between">
                    <span>Flight Recorder</span>
                    <span className="text-[10px] text-neutral-500 font-mono">Telemetry</span>
                  </h3>
                  <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
                    {timelineEvents.map((ev, i) => (
                      <div key={i} className="flex items-center justify-between text-xs border-b border-neutral-900 pb-1.5">
                        <span className="text-neutral-300 truncate max-w-[130px]">{ev.label}</span>
                        <span className="font-mono text-neutral-500">{ev.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>

      {/* Guest Invitation Modal Overlay */}
      {showGuestModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-neutral-900 pb-3">
              <h3 className="font-bold text-white text-base">Invite Human Guest</h3>
              <button onClick={() => setShowGuestModal(false)} className="text-neutral-400 hover:text-white text-sm">✕</button>
            </div>
            <p className="text-xs text-neutral-400">
              Bring a human specialist into Room B for project <strong className="text-white">{missionName}</strong>. They will receive an email invite and stay in this room until removed.
            </p>
            <form onSubmit={handleAddGuest} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-medium text-neutral-400">Guest Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Alex Rivera"
                  value={guestNameInput}
                  onChange={(e) => setGuestNameInput(e.target.value)}
                  className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-neutral-600"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-medium text-neutral-400">Email ID</label>
                <input 
                  type="email" 
                  placeholder="alex@venture.co"
                  value={guestEmailInput}
                  onChange={(e) => setGuestEmailInput(e.target.value)}
                  className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-neutral-600"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-medium text-neutral-400">Specialty / Project Purpose</label>
                <input 
                  type="text" 
                  placeholder="e.g. Legal & Term Sheet Review"
                  value={guestSpecialtyInput}
                  onChange={(e) => setGuestSpecialtyInput(e.target.value)}
                  className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-neutral-600"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setShowGuestModal(false)}
                  className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-medium py-2.5 rounded-xl text-xs transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-white hover:bg-neutral-200 text-black font-semibold py-2.5 rounded-xl text-xs transition-colors"
                >
                  Send Invite & Enter Room B
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer copyright */}
      <footer className="max-w-4xl w-full mx-auto text-center text-sm text-neutral-400 border-t border-neutral-900 pt-4 space-y-1">
        <p>AIrGun OS &bull; Built for Autonomous Founder Execution</p>
        <p className="text-neutral-500 text-xs">Conceived by Ragz. Built with Giselle & Maya.</p>
      </footer>

    </main>
  );
}