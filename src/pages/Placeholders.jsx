import React from 'react';
import Layout from '../components/Layout';

const PlaceholderPage = ({ title }) => (
  <Layout title={title}>
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-on-surface">
      <h2 className="text-3xl font-black font-headline mb-4">{title}</h2>
      <p className="text-on-surface-variant">This page is currently under construction. Check back soon!</p>
    </div>
  </Layout>
);


