import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  ArrowRight,
  Maximize2,
  Minimize2,
  Trash2,
  BookOpen,
  Clock,
  FileQuestion,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { aiService } from '@/services/aiService';
import { AIChatMessage } from '@/types';
import { useNavigate } from 'react-router-dom';

const SUGGESTED_PROMPTS = [
  'Explain deadlock like I\'m a beginner',
  'Create 10 flashcards about DBMS',
  'Quiz me on operating systems',
  'Explain my quiz mistakes',
  'Create a 7-day study plan',
];

export const AIChatDrawer: React.FC = () => {
  const { isAIChatOpen, setAIChatOpen, startPomodoro } = useAppStore();
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      content:
        "👋 Hi Alex! I'm **Cogniva AI**, your intelligent learning co-pilot. I analyze your quiz accuracies and spaced-repetition cards.\n\nAsk me to simplify tough CS concepts, diagnose test mistakes, or generate customized study sessions!",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAIChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAIChatOpen]);

  if (!isAIChatOpen) return null;

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isTyping) return;

    const userMsg: AIChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: textToSend,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await aiService.askCogniva(textToSend, {
        currentSubject: 'DBMS',
        weakTopics: ['SQL Joins', 'Graphs'],
      });

      const assistantMsg: AIChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        content: res.response,
        timestamp: new Date().toISOString(),
        suggestedAction: res.suggestedAction,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          content: 'Sorry, I hit a temporary snag generating that response. Please try again!',
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleActionClick = (action: any) => {
    if (action.type === 'start_pomodoro') {
      startPomodoro('sub-dbms', 'DBMS', action.payload?.topic || 'SQL Joins', 'Remedial focus session');
      setAIChatOpen(false);
      navigate('/app/focus');
    } else if (action.type === 'create_quiz') {
      setAIChatOpen(false);
      navigate('/app/quizzes');
    } else if (action.type === 'create_cards') {
      setAIChatOpen(false);
      navigate('/app/flashcards');
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex items-stretch animate-in slide-in-from-right duration-200">
      {/* Backdrop */}
      <div
        onClick={() => setAIChatOpen(false)}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm -z-10"
      />

      <div
        className={`bg-white dark:bg-[#0c101c] border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col transition-all duration-200 ${
          isExpanded ? 'w-screen md:w-[650px]' : 'w-screen sm:w-[460px]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-primary-600 to-teal-400 text-white shadow-md shadow-primary-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                Cogniva AI
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-semibold border border-emerald-500/20">
                  Ready
                </span>
              </h3>
              <p className="text-xs text-slate-400">Intelligent Study Co-Pilot</p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition hidden sm:block"
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() =>
                setMessages([
                  {
                    id: 'new-chat',
                    sender: 'assistant',
                    content: 'Chat refreshed. How can I assist your study session now?',
                    timestamp: new Date().toISOString(),
                  },
                ])
              }
              className="p-1.5 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Clear chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setAIChatOpen(false)}
              className="p-1.5 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message history */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-3 text-sm ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-white ${
                    isUser ? 'bg-primary-600' : 'bg-gradient-to-tr from-primary-600 to-teal-500'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[85%] rounded-2xl p-4 leading-relaxed ${
                    isUser
                      ? 'bg-primary-600 text-white rounded-tr-none'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 rounded-tl-none shadow-sm'
                  }`}
                >
                  <div className="whitespace-pre-line text-xs sm:text-sm">{m.content}</div>

                  {/* Interactive Action Recommendation button if returned */}
                  {m.suggestedAction && (
                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                      <button
                        onClick={() => handleActionClick(m.suggestedAction)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-primary-500/10 hover:bg-primary-500/20 text-primary-600 dark:text-primary-300 font-semibold text-xs border border-primary-500/30 transition group"
                      >
                        <div className="flex items-center gap-2">
                          {m.suggestedAction.type === 'start_pomodoro' && (
                            <Clock className="w-3.5 h-3.5 text-emerald-500" />
                          )}
                          {m.suggestedAction.type === 'create_quiz' && (
                            <FileQuestion className="w-3.5 h-3.5 text-amber-500" />
                          )}
                          {m.suggestedAction.type === 'create_cards' && (
                            <BookOpen className="w-3.5 h-3.5 text-teal-400" />
                          )}
                          <span>{m.suggestedAction.label}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-primary-600 to-teal-500 flex items-center justify-center text-white shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-bounce [animation-delay:0.15s]" />
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested prompts carousel */}
        <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/30 dark:bg-slate-900/30">
          <p className="text-[11px] font-semibold text-slate-400 mb-1.5">Suggested Prompts</p>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-2.5 py-1 text-xs rounded-lg bg-slate-200/60 dark:bg-slate-800 hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-primary-300 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700/60 transition"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input box */}
        <div className="p-3.5 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0c101c]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything (e.g. explain SQL Joins)..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white disabled:opacity-40 disabled:cursor-not-allowed transition shadow-md shadow-primary-500/20"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
