import React from 'react';
import { ArrowRight, BookOpen, Users, Globe } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative w-full min-h-screen bg-slate-900 overflow-hidden font-sans">
      {/* Abstract Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 flex flex-col items-center text-center z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 backdrop-blur-sm mb-8 animate-fade-in-up">
          <span className="flex h-2 w-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
          <span className="text-sm font-medium tracking-wide">Accepting Submissions for Vol. 4</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-8 max-w-4xl animate-fade-in-up animation-delay-150">
          Global Hub for
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 block mt-2">
           Scientific Innovation
          </span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl text-lg md:text-xl text-slate-300 mb-10 animate-fade-in-up animation-delay-300">
          Bridging the gap between groundbreaking research and real-world application. 
          Join a community of forward-thinking scholars and industry leaders.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up animation-delay-450">
          <button className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]">
            <span className="flex items-center gap-2">
              Browse Journals
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <button className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-white border border-slate-700 rounded-lg font-semibold backdrop-blur-md transition-all duration-300">
            Submit Manuscript
          </button>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 border-t border-slate-800/60 pt-10 animate-fade-in-up animation-delay-600">
          <div className="flex flex-col items-center">
             <div className="p-3 bg-blue-500/10 rounded-full mb-3 text-blue-400">
               <BookOpen className="w-6 h-6" />
             </div>
             <span className="text-3xl font-bold text-white">500+</span>
             <span className="text-slate-400 text-sm">Published Papers</span>
          </div>
          
          <div className="flex flex-col items-center">
             <div className="p-3 bg-purple-500/10 rounded-full mb-3 text-purple-400">
               <Users className="w-6 h-6" />
             </div>
             <span className="text-3xl font-bold text-white">50k+</span>
             <span className="text-slate-400 text-sm">Global Readers</span>
          </div>

          <div className="flex flex-col items-center">
             <div className="p-3 bg-indigo-500/10 rounded-full mb-3 text-indigo-400">
               <Globe className="w-6 h-6" />
             </div>
             <span className="text-3xl font-bold text-white">120+</span>
             <span className="text-slate-400 text-sm">Countries Reached</span>
          </div>
          
          <div className="flex flex-col items-center">
             <div className="p-3 bg-teal-500/10 rounded-full mb-3 text-teal-400">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
             </div>
             <span className="text-3xl font-bold text-white">24h</span>
             <span className="text-slate-400 text-sm">Avg. Review Time</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

/* Add these animations to your global CSS or index.css for the blob effects
   @keyframes blob {
     0% { transform: translate(0px, 0px) scale(1); }
     33% { transform: translate(30px, -50px) scale(1.1); }
     66% { transform: translate(-20px, 20px) scale(0.9); }
     100% { transform: translate(0px, 0px) scale(1); }
   }
   .animate-blob {
     animation: blob 7s infinite;
   }
   .animation-delay-2000 {
     animation-delay: 2s;
   }
   .animation-delay-4000 {
     animation-delay: 4s;
   }
*/
