import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-md">
          <p className="font-serif text-8xl font-bold text-[#f0d9c8] mb-4">404</p>
          <h1 className="font-serif text-3xl font-bold text-[#1a1a1a] mb-4">Page Not Found</h1>
          <p className="text-[#6a5a4a] mb-8">
            Looks like this page got freeze-dried out of existence. Let's get you back to something delicious.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#e85d26] text-white font-semibold rounded-full hover:bg-[#d44f1a] hover:scale-105 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e85d26] focus-visible:ring-offset-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}