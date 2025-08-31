"use client";

import { useState, useEffect } from 'react';
import ComplaintTable from '@/components/ComplaintTable';
import Layout from '@/components/Layout';
import { Complaint } from '@/types';
import { getComplaints } from '@/lib/api';

export default function Admin() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      const data = await getComplaints();
      setComplaints(data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="admin-container">
          <div className="admin-content">
            <div className="loading-state">Loading complaints...</div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="admin-container">
        <div className="admin-content">
          <ComplaintTable complaints={complaints} onUpdate={fetchComplaints} />
        </div>
      </div>
    </Layout>
  );
}