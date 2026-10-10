import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';

export const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const { login, loginAsDemo } = useAppStore();

  const handleDemoAccess = () => {
    loginAsDemo();
    navigate('/app');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot') {
      setMessage('Password reset instructions have been sent to your email.');
      return;
    }

    login(email || 'laksh@cogniva.dev', name || 'Laksh');
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 flex flex-col justify-between p-4 sm:p-6 font-sans">
      {/* Top logo bar */}
      <div className="flex items-center justify-between max-w-6xl w-full mx-auto py-2">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary-600 to-teal-400 flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
            Cogniva
          </span>
        </Link>

        <Link
          to="/"
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-1.5 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Landing</span>
        </Link>
      </div>

      {/* Main Auth Container */}
      <div className="max-w-md w-full mx-auto my-8">
        {/* Prominent Hackathon Judge Demo Callout */}
        <div className="mb-6 p-4 rounded-3xl bg-gradient-to-r from-primary-500/15 via-teal-500/10 to-primary-500/15 border border-primary-500/30 text-center shadow-lg shadow-primary-500/5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3 h-3" />
            Hacktoberfest Judge Fast-Track
          </div>
          <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white mb-1">
            Evaluate Without API Keys
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            Instantly enters the live workspace populated with 12-day streak, 5 full subjects, weak topic analysis, and analytics.
          </p>
          <button
            onClick={handleDemoAccess}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-primary-600 to-brand-500 hover:from-primary-500 hover:to-brand-400 text-white font-bold text-xs shadow-md shadow-primary-500/20 transition group"
          >
            <Sparkles className="w-4 h-4" />
            <span>Try Live Demo (Laksh)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Regular Auth Card */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 sm:p-8 shadow-xl">
          <div className="text-center mb-6">
            <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
              {mode === 'login'
                ? 'Welcome Back'
                : mode === 'signup'
                ? 'Create Your Account'
                : 'Reset Password'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {mode === 'login'
                ? 'Log in to continue your intelligent learning journey'
                : mode === 'signup'
                ? 'Join thousands of students learning with Cogniva'
                : 'Enter your email to receive recovery instructions'}
            </p>
          </div>

          {message && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs text-center font-medium">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Laksh"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="laksh@cogniva.dev"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-xs text-primary-500 hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 text-white font-bold text-xs transition shadow-md mt-2"
            >
              {mode === 'login'
                ? 'Sign In to Workspace'
                : mode === 'signup'
                ? 'Create Free Account'
                : 'Send Recovery Link'}
            </button>
          </form>

          {/* Mode Switcher */}
          <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
            {mode === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button
                  onClick={() => setMode('signup')}
                  className="font-bold text-primary-500 hover:underline ml-1"
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="font-bold text-primary-500 hover:underline ml-1"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer text */}
      <div className="text-center text-xs text-slate-400 py-3">
        Cogniva Open Source • Hacktoberfest Dev Challenge Edition
      </div>
    </div>
  );
};
