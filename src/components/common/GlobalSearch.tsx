import React, { useState, useEffect, useRef } from 'react';
import { Search, BookOpen, Clock, FileQuestion, Sparkles, Folder, ArrowRight, X } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useNavigate } from 'react-router-dom';

export const GlobalSearch: React.FC = () => {
  const { isGlobalSearchOpen, setGlobalSearchOpen, subjects, flashcards, setAIChatOpen } = useAppStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Listen for Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setGlobalSearchOpen(!isGlobalSearchOpen);
      }
      if (e.key === 'Escape' && isGlobalSearchOpen) {
        setGlobalSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGlobalSearchOpen, setGlobalSearchOpen]);

  useEffect(() => {
    if (isGlobalSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isGlobalSearchOpen]);

  if (!isGlobalSearchOpen) return null;

  const filteredSubjects = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.code.toLowerCase().includes(query.toLowerCase()) ||
      s.topics.some((t) => t.name.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredCards = flashcards.filter(
    (c) =>
      c.question.toLowerCase().includes(query.toLowerCase()) ||
      c.topicName.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const handleSelect = (action: () => void) => {
    action();
    setGlobalSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Search input header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search subjects, topics, flashcards, or quick actions... (Ctrl + K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-0 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono text-slate-400 border border-slate-200 dark:border-slate-800 rounded-md">
            ESC
          </span>
        </div>

        {/* Search results list */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {/* Quick Actions */}
          {query === '' && (
            <div>
              <p className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Quick Actions
              </p>
              <div className="space-y-1">
                <button
                  onClick={() => handleSelect(() => navigate('/app/focus'))}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left text-sm text-slate-700 dark:text-slate-200 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span>Start Pomodoro Focus Session</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => handleSelect(() => navigate('/app/flashcards'))}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left text-sm text-slate-700 dark:text-slate-200 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <span>Review Due Flashcards</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => handleSelect(() => navigate('/app/quizzes'))}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left text-sm text-slate-700 dark:text-slate-200 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
                      <FileQuestion className="w-4 h-4" />
                    </div>
                    <span>Take Adaptive Quiz</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => handleSelect(() => setAIChatOpen(true))}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left text-sm text-slate-700 dark:text-slate-200 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span>Ask Cogniva AI Study Assistant</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
          )}

          {/* Subjects results */}
          {filteredSubjects.length > 0 && (
            <div>
              <p className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Subjects & Topics
              </p>
              <div className="space-y-1">
                {filteredSubjects.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => handleSelect(() => navigate(`/app/subjects?id=${sub.id}`))}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left text-sm text-slate-700 dark:text-slate-200 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-primary-500/10 text-primary-500">
                        <Folder className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">
                          {sub.name} <span className="text-xs text-slate-400">({sub.code})</span>
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                          {sub.topics.map((t) => t.name).join(' • ')}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-primary-500">{sub.progress}%</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Flashcards results */}
          {filteredCards.length > 0 && (
            <div>
              <p className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Flashcards
              </p>
              <div className="space-y-1">
                {filteredCards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => handleSelect(() => navigate('/app/flashcards'))}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left text-sm text-slate-700 dark:text-slate-200 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100 line-clamp-1">
                          {card.question}
                        </p>
                        <p className="text-xs text-slate-400">
                          {card.subjectName} • {card.topicName}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs capitalize px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                      {card.mastery}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && filteredSubjects.length === 0 && filteredCards.length === 0 && (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400 text-sm">
              No matching subjects, topics, or flashcards found for "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
