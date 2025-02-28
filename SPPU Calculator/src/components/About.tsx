import React from 'react';
import { BookOpen, Award, TrendingUp } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          About
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Feature
            icon={<BookOpen className="w-12 h-12 text-indigo-600" />}
            title="Easy to Use"
            description="Simple and intuitive interface designed for students to quickly calculate their CGPA."
          />
          <Feature
            icon={<Award className="w-12 h-12 text-indigo-600" />}
            title="Accurate Results"
            description="Get precise calculations based on your institution's grading system."
          />
          <Feature
            icon={<TrendingUp className="w-12 h-12 text-indigo-600" />}
            title="Track Progress"
            description="Monitor your academic performance and set goals for improvement."
          />
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}