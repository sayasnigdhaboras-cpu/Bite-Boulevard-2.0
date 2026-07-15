import React, { useState, useRef, useEffect } from 'react';
import { askChatbot } from '../rag/ragService';

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{sender: 'user' | 'bot', text: string}[]>([
    { sender: 'bot', text: 'Welcome to Bite Boulevard. How may I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Simulate network delay
    setTimeout(async () => {
      const response = await askChatbot(userMsg);
      setMessages(prev => [...prev, { sender: 'bot', text: response }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform z-50 editorial-shadow"
      >
        <span className="material-symbols-outlined text-3xl">
          {isOpen ? 'close' : 'chat'}
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-surface-container-high rounded-2xl ghost-border overflow-hidden flex flex-col shadow-2xl z-50 transform transition-all duration-300 ease-out h-[500px]">
          {/* Header */}
          <div className="bg-surface-container-highest p-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
              <h3 className="font-serif font-bold text-on-surface">Concierge AI</h3>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-on-primary rounded-tr-sm' 
                      : 'bg-surface-container-highest text-on-surface rounded-tl-sm ghost-border'
                  }`}
                >
                  <p className="text-sm leading-relaxed font-sans">{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-surface-container-highest text-on-surface rounded-2xl rounded-tl-sm p-3 ghost-border">
                  <div className="flex gap-1 items-center h-4">
                    <span className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/10 bg-surface-container">
            <div className="flex items-center gap-2">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about our menu..."
                className="flex-1 bg-surface-container-highest text-on-surface placeholder:text-on-surface-variant border-none rounded-full py-2 px-4 text-sm focus:ring-1 focus:ring-primary outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">send</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
