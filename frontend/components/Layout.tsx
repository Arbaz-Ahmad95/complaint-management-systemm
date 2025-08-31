"use client";

import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout-container">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            <Link href="/" className="logo-link">
              <div className="logo-icon">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="logo-text">ComplaintSystem</span>
            </Link>
          </div>
          <div className="nav-right">
            <Link href="/" className="nav-link">
              Submit Complaint
            </Link>
            <Link href="/admin" className="nav-btn">
              Admin Dashboard
            </Link>
          </div>
        </div>
      </nav>
      <main className="main-content">{children}</main>
    </div>
  );
}