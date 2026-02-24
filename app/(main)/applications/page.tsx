'use client'

import { useState, useEffect } from 'react'
import { Application } from '@/lib/data'

const columns = [
  { id: 'saved', label: 'Saved', color: 'saved' },
  { id: 'applied', label: 'Applied', color: 'applied' },
  { id: 'screening', label: 'Screening', color: 'screening' },
  { id: 'interview', label: 'Interview', color: 'interview' },
  { id: 'offer', label: 'Offer', color: 'offer' },
  { id: 'rejected', label: 'Rejected', color: 'rejected' }
]

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [draggedItem, setDraggedItem] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('switchwithai-applications')
    if (saved) {
      setApplications(JSON.parse(saved))
    }
  }, [])

  const updateStatus = (appId: string, newStatus: Application['status']) => {
    const updated = applications.map(app => 
      app.id === appId ? { ...app, status: newStatus } : app
    )
    setApplications(updated)
    localStorage.setItem('switchwithai-applications', JSON.stringify(updated))
  }

  const deleteApplication = (appId: string) => {
    const updated = applications.filter(app => app.id !== appId)
    setApplications(updated)
    localStorage.setItem('switchwithai-applications', JSON.stringify(updated))
  }

  const getAppsByStatus = (status: string) => {
    return applications.filter(app => app.status === status)
  }

  const handleDragStart = (appId: string) => {
    setDraggedItem(appId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (status: Application['status']) => {
    if (draggedItem) {
      updateStatus(draggedItem, status)
      setDraggedItem(null)
    }
  }

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Applications</h1>
        <p className="page-subtitle">Track and manage your job applications</p>
      </div>

      <div className="kanban-board">
        {columns.map(column => (
          <div 
            key={column.id} 
            className="kanban-column"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(column.id as Application['status'])}
          >
            <div className="kanban-header">
              <div className="kanban-title">
                <span className={`kanban-dot ${column.color}`}></span>
                {column.label}
              </div>
              <span className="kanban-count">{getAppsByStatus(column.id).length}</span>
            </div>
            <div className="kanban-items">
              {getAppsByStatus(column.id).map(app => (
                <div 
                  key={app.id} 
                  className="kanban-item"
                  draggable
                  onDragStart={() => handleDragStart(app.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', marginBottom: '4px' }}>{app.job.title}</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{app.job.company}</p>
                    </div>
                    <button 
                      onClick={() => deleteApplication(app.id)}
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
                    >
                      ×
                    </button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{app.job.location}</span>
                    <span style={{ color: 'var(--success)', fontSize: '0.75rem', fontWeight: 600 }}>{app.job.salary}</span>
                  </div>
                  {app.appliedDate && (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '8px' }}>
                      Applied: {app.appliedDate}
                    </p>
                  )}
                </div>
              ))}
              {getAppsByStatus(column.id).length === 0 && (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  No applications
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
