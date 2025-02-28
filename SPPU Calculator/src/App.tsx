import React from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import CGPACalculator from './components/CGPACalculator';
import { About } from './components/About';
import { PercentageToCGPA } from './components/calculators/PercentageToCGPA';
import { SCPAtoCGPA } from './components/calculators/SCPAtoCGPA';
import { SGPAtoPercentage } from './components/calculators/SGPAtoPercentage';
import { FinalGrade } from './components/calculators/FinalGrade';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={
              <>
                <Home />
                <CGPACalculator />
                <About />
              </>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/percentage-to-cgpa" element={<PercentageToCGPA />} />
            <Route path="/scpa-to-cgpa" element={<SCPAtoCGPA />} />
            <Route path="/sgpa-to-percentage" element={<SGPAtoPercentage />} />
            <Route path="/final-grade" element={<FinalGrade />} />
          </Routes>
        </main>
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} CGPA Calculator. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;