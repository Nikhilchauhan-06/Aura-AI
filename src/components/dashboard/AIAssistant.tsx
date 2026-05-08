import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Loader2, Minimize2, Maximize2, Sparkles } from 'lucide-react';
import { ai, MODELS } from '../../lib/gemini';
import { cn } from '../../lib/utils';
import { DashboardState } from '../../types/dashboard';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIAssistantProps {
  currentDashboardData?: DashboardState;
}

export function AIAssistant({ currentDashboardData }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am Aura, your executive intelligence assistant. How can I help you analyze your business performance today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const dataSummary = currentDashboardData ? 
        `Active KPIs: ${currentDashboardData.kpis.map(k => `${k.label}: ${k.value}`).join(', ')}` : 
        "No current dashboard data loaded.";

      const response = await ai.models.generateContent({
        model: MODELS.flash,
        contents: `Dashboard Context: ${dataSummary}\n\nUser Question: ${userMessage}`,
        config: {
          systemInstruction: "You are Aura, a premium executive business intelligence assistant. Your goal is to provide concise, data-driven insights based on the provided dashboard context. If context is missing, help them upload data. Highlight growth opportunities.",
        }
      });

      const assistantMessage = response.text || "I apologize, I'm having trouble processing that data right now. Please try again.";
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "An error occurred while connecting to the intelligence engine." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl shadow-blue-500/20 flex items-center justify-center z-[100] group overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {isOpen ? <Minimize2 className="text-white w-7 h-7" /> : <Sparkles className="text-white w-7 h-7" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-28 right-8 w-[400px] h-[600px] glass-dark rounded-[32px] shadow-2xl flex flex-col z-[100] overflow-hidden border border-white/10"
          >
            {/* Header */}
            <div className="p-6 border-bottom border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                  <Sparkles className="text-white w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Aura Intelligence</h3>
                  <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Optimal Efficiency
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
            >
              {messages.map((msg, i) => (
                <div key={i} className={cn(
                  "flex font-sans",
                  msg.role === 'user' ? "justify-end" : "justify-start"
                )}>
                  <div className={cn(
                    "max-w-[80%] p-4 rounded-2xl",
                    msg.role === 'user' 
                      ? "bg-blue-600/20 text-blue-50 border border-blue-500/10 rounded-tr-none" 
                      : "bg-white/5 text-zinc-100 border border-white/5 rounded-tl-none"
                  )}>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5">
                    <Loader2 className="w-5 h-5 text-zinc-500 animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/5 bg-white/5">
              <div className="relative">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask for an executive insight..."
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-zinc-600"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center hover:bg-blue-400 disabled:bg-zinc-800 disabled:text-zinc-600 transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[10px] text-zinc-600 mt-4 text-center">
                Aura AI can make mistakes. Verify critical business decisions.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
