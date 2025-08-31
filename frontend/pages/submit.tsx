"use client";

import ComplaintForm from '@/components/ComplaintForm';
import Layout from '@/components/Layout';

export default function Submit() {
  return (
    <Layout>
      <div className="submit-container">
        <div className="submit-content">
          <ComplaintForm />
        </div>
      </div>
    </Layout>
  );
}