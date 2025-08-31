"use client";

import { useState } from 'react';
import { updateComplaint, deleteComplaint } from '@/lib/api';
import { Complaint } from '@/types';

interface ComplaintTableProps {
  complaints: Complaint[];
  onUpdate: () => void;
}

export default function ComplaintTable({ complaints, onUpdate }: ComplaintTableProps) {
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [message, setMessage] = useState('');

  const filteredComplaints = complaints.filter(complaint => {
    return (statusFilter === 'All' || complaint.status === statusFilter) &&
           (priorityFilter === 'All' || complaint.priority === priorityFilter);
  });

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateComplaint(id, { status: newStatus });
      setMessage('Status updated successfully');
      onUpdate();
    } catch (error) {
      setMessage('Error updating status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this complaint?')) return;
    
    try {
      await deleteComplaint(id);
      setMessage('Complaint deleted successfully');
      onUpdate();
    } catch (error) {
      setMessage('Error deleting complaint');
    }
  };

  return (
    <div className="complaint-table-container">
      <h2 className="table-title">Complaint Management</h2>
      
      {message && (
        <div className={`message-alert ${message.includes('Error') ? 'error-alert' : 'success-alert'}`}>
          {message}
        </div>
      )}
      
      <div className="filter-container">
        <div className="filter-group">
          <label className="filter-label">Status Filter</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label className="filter-label">Priority Filter</label>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="filter-select"
          >
            <option value="All">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>
      
      <div className="table-wrapper">
        <table className="data-table">
          <thead className="table-header">
            <tr>
              <th className="table-heading">Title</th>
              <th className="table-heading">Category</th>
              <th className="table-heading">Priority</th>
              <th className="table-heading">Date Submitted</th>
              <th className="table-heading">Status</th>
              <th className="table-heading">Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {filteredComplaints.map((complaint) => (
              <tr key={complaint._id} className="table-row">
                <td className="table-cell table-cell-title">{complaint.title}</td>
                <td className="table-cell">{complaint.category}</td>
                <td className="table-cell">
                  <span className={`priority-badge priority-${complaint.priority.toLowerCase()}`}>
                    {complaint.priority}
                  </span>
                </td>
                <td className="table-cell">
                  {new Date(complaint.dateSubmitted).toLocaleDateString()}
                </td>
                <td className="table-cell">
                  <select
                    value={complaint.status}
                    onChange={(e) => handleStatusChange(complaint._id!, e.target.value)}
                    className="status-select"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
                <td className="table-cell">
                  <button
                    onClick={() => handleDelete(complaint._id!)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredComplaints.length === 0 && (
          <div className="empty-state">
            No complaints found
          </div>
        )}
      </div>
    </div>
  );
}