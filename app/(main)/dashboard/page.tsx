'use client'

import { useState, useEffect } from 'react'
import { sampleJobs, Application } from '@/lib/data'

export default function Dashboard() {
  const [applications, setApplications] = useState<Application[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('switchwithai-applications')
    if (saved) {
      setApplications(JSON.parse(saved))
    }
  }, [])

  const stats = {
    total: applications.length,
    applied: applications.filter(a => a.status === 'applied' || a.status === 'screening' || a.status === 'interview' || a.status === 'offer').length,
    interviews: applications.filter(a => a.status === 'interview' || a.status === 'offer').length,
    offers: applications.filter(a => a.status === 'offer').length
  }

  const getFunnelData = () => {
    const total = applications.length || 1
    return [
      { label: 'Saved', count: applications.filter(a => a.status === 'saved').length, percent: (applications.filter(a => a.status === 'saved').length / total) * 100 },
      { label: 'Applied', count: applications.filter(a => a.status === 'applied').length, percent: (applications.filter(a => a.status === 'applied').length / total) * 100 },
      { label: 'Screening', count: applications.filter(a => a.status === 'screening').length, percent: (applications.filter(a => a.status === 'screening').length / total) * 100 },
      { label: 'Interview', count: applications.filter(a => a.status === 'interview').length, percent: (applications.filter(a => a.status === 'interview').length / total) * 100 },
      { label: 'Offer', count: applications.filter(a => a.status === 'offer').length, percent: (applications.filter(a => a.status === 'offer').length / total) * 100 },
    ]
  }

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Track your job search progress</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon primary">📋</div>
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Applications</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success">✓</div>
          <div className="stat-value">{stats.applied}</div>
          <div className="stat-label">Applied</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon accent">🎯</div>
          <div className="stat-value">{stats.interviews}</div>
          <div className="stat-label">Interviews</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success">🏆</div>
          <div className="stat-value">{stats.offers}</div>
          <div className="stat-label">Offers</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Application Funnel</h3>
        </div>
        <div className="funnel-chart">
          {getFunnelData().map((item, index) => (
            <div key={index} className="funnel-item">
              <span className="funnel-label">{item.label}</span>
              <div className="funnel-bar-container">
                <div 
                  className={`funnel-bar ${item.label.toLowerCase()}`} 
                  style={{ width: `${Math.max(item.percent, 5)}%` }}
                >
                  {item.count}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Recent Applications</h3>
          <a href="/applications" className="btn btn-secondary btn-sm">View All</a>
        </div>
        {applications.length === 0 ? (
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <h3>No applications yet</h3>
            <p>Start by searching for jobs and applying!</p>
          </div>
        ) : (
          <div>
            {applications.slice(0, 5).map(app => (
              <div key={app.id} style={{ padding: '16px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ marginBottom: '4px' }}>{app.job.title}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{app.job.company}</p>
                  </div>
                  <span className={`keyword-tag ${app.status === 'offer' ? 'matched' : app.status === 'rejected' ? 'missing' : ''}`} 
                    style={{ background: app.status === 'offer' ? 'rgba(16, 185, 129, 0.2)' : app.status === 'rejected' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(99, 102, 241, 0.2)', 
                    color: app.status === 'offer' ? 'var(--success)' : app.status === 'rejected' ? 'var(--danger)' : 'var(--primary)' }}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
