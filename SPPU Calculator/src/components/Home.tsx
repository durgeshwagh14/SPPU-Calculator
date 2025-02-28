import React from 'react';
import { GraduationCap } from 'lucide-react';

export function Home() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <GraduationCap className="w-20 h-20 mx-auto text-indigo-600 mb-8" />
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Calculate Your CGPA with Ease
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Our CGPA Calculator helps you track your academic progress accurately and efficiently.
          Simply input your grades and credit hours to instantly calculate your Cumulative Grade Point Average.
        </p>
        <a
          href="#calculator"
          className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          Get Started
          <span className="ml-2">→</span>
        </a>
      </div>
    </section>
  );
}