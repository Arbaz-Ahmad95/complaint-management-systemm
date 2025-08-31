"use client";

import { useState } from 'react';
import { ComplaintFormData } from '@/types';
import { createComplaint } from '@/lib/api';

export default function ComplaintForm() {
  const [formData, setFormData] = useState<ComplaintFormData>({
    title: '',
    description: '',
    category: 'Product',
    priority: 'Medium',
  });

  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      await createComplaint(formData);
      setMessage('Complaint submitted successfully!');
      setFormData({
        title: '',
        description: '',
        category: 'Product',
        priority: 'Medium',
      });
    } catch (error) {
      setMessage('Error submitting complaint. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="complaint-page-container">
      <div className="complaint-form-wrapper">
        {/* Header Card */}
        <div className="header-card">
          <div className="header-content">
            <h1 className="header-title">Complaint Management System</h1>
            <p className="header-description">Submit your complaints and we'll address them promptly</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card stat-card-blue">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
            <div className="stat-card stat-card-green">
              <div className="stat-number">48h</div>
              <div className="stat-label">Response Time</div>
            </div>
            <div className="stat-card stat-card-purple">
              <div className="stat-number">95%</div>
              <div className="stat-label">Resolution Rate</div>
            </div>
          </div>
        </div>

        {/* Complaint Form Card */}
        <div className="form-card">
          <div className="form-header">
            <div className="form-icon">
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="form-title">Submit a Complaint</h2>
            <p className="form-subtitle">We're here to help resolve your issues</p>
          </div>

          {message && (
            <div className={`message-alert ${message.includes('Error') ? 'error-alert' : 'success-alert'}`}>
              <div className="alert-content">
                {message.includes('Error') ? (
                  <svg className="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {message}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="complaint-form">
            {/* Title Field */}
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Complaint Title *
              </label>
              <input
                type="text"
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="form-input"
                placeholder="Brief description of your complaint"
              />
            </div>

            {/* Description Field */}
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Detailed Description *
              </label>
              <textarea
                id="description"
                required
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="form-textarea"
                placeholder="Please provide detailed information about your issue..."
              />
            </div>

            <div className="form-row">
              {/* Category Field */}
              <div className="form-group">
                <label htmlFor="category" className="form-label">
                  Category *
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="form-select"
                >
                  <option value="Product">Product Issue</option>
                  <option value="Service">Service Quality</option>
                  <option value="Support">Customer Support</option>
                  <option value="Billing">Billing Problem</option>
                  <option value="Technical">Technical Issue</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Priority Field */}
              <div className="form-group">
                <label className="form-label">
                  Priority Level *
                </label>
                <div className="priority-options">
                  {['Low', 'Medium', 'High'].map((priority) => (
                    <label key={priority} className="priority-option">
                      <input
                        type="radio"
                        value={priority}
                        checked={formData.priority === priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                        className="priority-input"
                      />
                      <span className="priority-label">
                        <span className={`priority-indicator priority-${priority.toLowerCase()}`}></span>
                        {priority} Priority
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? (
                <span className="button-loading">
                  <svg className="spinner" viewBox="0 0 24 24">
                    <circle className="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Complaint'
              )}
            </button>
          </form>

          {/* Additional Info */}
          <div className="form-footer">
            <div className="footer-info">
              <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Your complaint will be addressed within 24-48 hours
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}