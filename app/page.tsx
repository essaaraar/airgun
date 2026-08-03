const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsgTime = getAbsoluteTime();
    const userRelTime = getRelativeTime();
    const currentInput = inputMessage;

    setChatLog(prev => [
      ...prev, 
      { sender: 'Ragz', roleTag: 'The Known Stranger', text: currentInput, timestamp: userMsgTime, relativeTime: userRelTime }
    ]);
    setInputMessage('');

    try {
      const response = await fetch('/api/council', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentInput,
          missionName: missionName || 'Mission',
          objective: objective || 'Autonomous execution',
          gizRole,
          mayaRole
        }),
      });

      const result = await response.json();
      if (result.success && result.responses) {
        setChatLog(prev => [
          ...prev,
          ...result.responses.map((r: any) => ({
            sender: r.sender,
            roleTag: r.roleTag,
            text: r.text,
            timestamp: getAbsoluteTime(),
            relativeTime: getRelativeTime()
          }))
        ]);
      }
    } catch (err) {
      console.error("Council API connection error:", err);
    }
  };