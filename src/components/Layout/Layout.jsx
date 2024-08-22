import React from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';

export default function Layout({ children }) {
  return (
    <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
      <Sidebar />
      <main className="lg:col-span-3 xl:col-span-5 bg-red-100 p-8 h-[100vh] overflow-y-auto">
        <Header />
        {children}
      </main>
    </div>
  );
}
