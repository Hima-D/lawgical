"use client";
import Link from 'next/link';
import { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';

const Cases = () => {
  // Example case data (you can fetch real data from an API or database)
  const [cases] = useState([
    { id: 1, title: 'Case #001: Personal Injury', description: 'A case involving personal injury from an accident.', date: '2025-02-10' },
    { id: 2, title: 'Case #002: Corporate Law', description: 'A case regarding breach of contract in a corporate environment.', date: '2025-02-05' },
    { id: 3, title: 'Case #003: Family Law', description: 'A family dispute over inheritance matters.', date: '2025-01-20' },
    // Add more cases as needed
  ]);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header is now used correctly here */}
      <Header />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
        <h1 className="text-4xl font-bold text-center text-white mb-8">Our Cases</h1>
        
        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search cases..."
            className="p-3 w-full sm:w-96 rounded-lg shadow-md border border-gray-600 text-white bg-gray-800"
          />
        </div>

        {/* Cases List */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((caseItem) => (
            <div key={caseItem.id} className="bg-gray-800 shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">{caseItem.title}</h2>
              <p className="text-gray-400 mb-4">{caseItem.description}</p>
              <p className="text-sm text-gray-500 mb-4">Date: {caseItem.date}</p>
              <Link href={`/cases/${caseItem.id}`} className="text-teal-500 hover:text-teal-300 font-semibold">
                View Case Details
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Footer is now used correctly here */}
      <Footer />
    </div>
  );
};

export default Cases;
