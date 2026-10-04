import React from 'react';
import { Sparkles, BookOpen, Heart, ExternalLink, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GithubIcon } from '@/components/common/Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-[#090d16]/80 backdrop-blur-md pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary-600 to-teal-400 flex items-center justify-center text-white shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                Cogniva
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Your Intelligent Learning Workspace. Built for the Hacktoberfest Dev Challenge.
              Empowering students to focus, learn, practice, test, and adaptively improve.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-slate-400">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-semibold">
                MIT Licensed
              </span>
              <span>•</span>
              <span>100% Offline-First Capable</span>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Platform & Features
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/app/focus" className="hover:text-primary-500 transition">
                  Pomodoro Focus Engine
                </Link>
              </li>
              <li>
                <Link to="/app/flashcards" className="hover:text-primary-500 transition">
                  Smart Flashcards & SM-2
                </Link>
              </li>
              <li>
                <Link to="/app/quizzes" className="hover:text-primary-500 transition">
                  Adaptive AI Quiz Generator
                </Link>
              </li>
              <li>
                <Link to="/app/analytics" className="hover:text-primary-500 transition">
                  Study Heatmaps & Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Open Source
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary-500 transition flex items-center gap-1.5"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <a
                  href="#why-cogniva"
                  className="hover:text-primary-500 transition flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Documentation</span>
                </a>
              </li>
              <li>
                <span className="flex items-center gap-1.5 text-amber-500 font-semibold">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Hacktoberfest 2026</span>
                </span>
              </li>
              <li>
                <Link to="/auth" className="hover:text-primary-500 transition">
                  About Cogniva
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} Cogniva. Open source educational software.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for the Hacktoberfest Dev Challenge
          </p>
        </div>
      </div>
    </footer>
  );
};
