"use client";

import { Smile, Mic, Send } from 'lucide-react';
import { useState } from 'react';

interface MessageInputProps {
  onSend?: (message: string) => void;
}

export function MessageInput({ onSend }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend?.(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 flex items-center gap-3">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Write a message..."
        className="flex-1 text-sm outline-none placeholder-gray-400"
      />
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Smile className="w-5 h-5 text-gray-400" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Mic className="w-5 h-5 text-gray-400" />
        </button>
        <button 
          onClick={handleSend}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Send className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
}
