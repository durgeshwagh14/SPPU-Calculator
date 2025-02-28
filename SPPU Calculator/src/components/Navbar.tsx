import React, { useState } from 'react';
import { Calculator, Home, Info, Menu, X, ChevronDown } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCalcMenuOpen, setIsCalcMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const NavLink = ({ to, icon, children }: { to: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <RouterLink
      to={to}
      className="flex items-center space-x-1 hover:text-indigo-200 transition-colors duration-200"
    >
      {icon}
      <span>{children}</span>
    </RouterLink>
  );

  return (
    <nav className="bg-indigo-600 text-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <RouterLink to="/" className="flex-shrink-0 font-bold text-xl">
            CGPA Calculator
          </RouterLink>
          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-indigo-200 hover:bg-indigo-700 focus:outline-none transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="hidden md:flex space-x-8">
            <NavLink to="/" icon={<Home size={18} />}>Home</NavLink>
            
            <div className="relative group">
              <button
                onClick={() => setIsCalcMenuOpen(!isCalcMenuOpen)}
                className="flex items-center space-x-1 hover:text-indigo-200 transition-colors duration-200"
              >
                <Calculator size={18} />
                <span>Calculators</span>
                <ChevronDown size={18} className="group-hover:rotate-180 transition-transform duration-200" />
              </button>
              
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg overflow-hidden transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-top-left">
                <div className="py-1">
                  <RouterLink to="/percentage-to-cgpa" className="block px-4 py-2 text-gray-800 hover:bg-indigo-50 transition-colors duration-200">
                    Percentage to CGPA
                  </RouterLink>
                  <RouterLink to="/scpa-to-cgpa" className="block px-4 py-2 text-gray-800 hover:bg-indigo-50 transition-colors duration-200">
                    SCPA to CGPA
                  </RouterLink>
                  <RouterLink to="/sgpa-to-percentage" className="block px-4 py-2 text-gray-800 hover:bg-indigo-50 transition-colors duration-200">
                    SGPA to Percentage
                  </RouterLink>
                  <RouterLink to="/final-grade" className="block px-4 py-2 text-gray-800 hover:bg-indigo-50 transition-colors duration-200">
                    Final Grade (SPPU)
                  </RouterLink>
                </div>
              </div>
            </div>

            <NavLink to="/about" icon={<Info size={18} />}>About</NavLink>
          </div>
        </div>

        <div
          className={`${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } md:hidden overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <RouterLink
              to="/"
              className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <Home size={18} />
              <span>Home</span>
            </RouterLink>
            
            <div className="space-y-1 pl-3">
              <div className="px-3 py-2 text-indigo-200 font-medium">Calculators</div>
              <RouterLink
                to="/percentage-to-cgpa"
                className="block px-3 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Percentage to CGPA
              </RouterLink>
              <RouterLink
                to="/scpa-to-cgpa"
                className="block px-3 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                SCPA to CGPA
              </RouterLink>
              <RouterLink
                to="/sgpa-to-percentage"
                className="block px-3 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                SGPA to Percentage
              </RouterLink>
              <RouterLink
                to="/final-grade"
                className="block px-3 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Final Grade (SPPU)
              </RouterLink>
            </div>

            <RouterLink
              to="/about"
              className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <Info size={18} />
              <span>About</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;