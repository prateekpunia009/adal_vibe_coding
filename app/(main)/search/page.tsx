'use client'

import { useState } from 'react'
import { sampleJobs, Job, Application } from '@/lib/data'
import { useRouter } from 'next/navigation'

export default function SearchPage() {
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>([])
  const [searched, setSearched] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const [jobType, setJobType] = useState('')
  const [remote, setRemote] = useState('')

  const searchJobs = () => {
    setSearched(true)
    let results = [...sampleJobs]
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(job => 
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.requirements.some(r => r.toLowerCase().includes(query))
      )
    }
    
    if (location) {
      results = results.filter(job => 
        job.location.toLowerCase().includes(location.toLowerCase())
      )
    }
    
    if (jobType) {
      results = results.filter(job => 
        job.type.toLowerCase() === jobType.toLowerCase()
      )
    }
    
    if (remote) {
      results = results.filter(job => job.remote === remote)
    }
    
    setJobs(results)
  }

  const saveJob = (job: Job) => {
    const applications: Application[] = JSON.parse(localStorage.getItem('switchwithai-applications') || '[]')
    const newApp: Application = {
      id: Date.now().toString(),
      job,
      status: 'saved'
    }
    applications.push(newApp)
    localStorage.setItem('switchwithai-applications', JSON.stringify(applications))
    alert('Job saved to applications!')
  }

  const applyToJob = (job: Job) => {
    const applications: Application[] = JSON.parse(localStorage.getItem('switchwithai-applications') || '[]')
    const newApp: Application = {
      id: Date.now().toString(),
      job,
      status: 'applied',
      appliedDate: new Date().toISOString().split('T')[0]
    }
    applications.push(newApp)
    localStorage.setItem('switchwithai-applications', JSON.stringify(applications))
    alert('Application submitted!')
    router.push('/applications')
  }

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Find Jobs</h1>
        <p className="page-subtitle">Search and scrape jobs from multiple sources</p>
      </div>

      <div className="search-bar">
        <div className="search-input-wrapper">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input 
            type="text" 
            className="form-input search-input" 
            placeholder="Job title, keywords, or company"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <input 
          type="text" 
          className="form-input" 
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ width: '200px' }}
        />
        <button className="btn btn-primary" onClick={searchJobs}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          Search
        </button>
      </div>

      <div className="filters">
        <select className="form-select" value={jobType} onChange={(e) => setJobType(e.target.value)}>
          <option value="">All Job Types</option>
          <option value="Full-time">Full Time</option>
          <option value="Part-time">Part Time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
        <select className="form-select" value={remote} onChange={(e) => setRemote(e.target.value)}>
          <option value="">All Locations</option>
          <option value="remote">Remote</option>
          <option value="onsite">On-site</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>

      <div className="job-grid">
        {!searched ? (
          <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <h3>Search for jobs</h3>
            <p>Enter a job title or keyword to get started</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
            <h3>No jobs found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        ) : (
          jobs.map(job => (
            <div key={job.id} className="job-card">
              <div className="job-header">
                <div className="job-logo">{job.company.charAt(0)}</div>
                <div className="job-info">
                  <h3 className="job-title">{job.title}</h3>
                  <p className="job-company">{job.company}</p>
                </div>
              </div>
              <div className="job-meta">
                <span className="job-meta-item">📍 {job.location}</span>
                <span className="job-meta-item">💼 {job.type}</span>
                <span className="job-meta-item">🏠 {job.remote}</span>
              </div>
              <p className="job-description">{job.description}</p>
              <div className="job-footer">
                <span className="job-salary">{job.salary}</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => saveJob(job)}>Save</button>
                  <button className="btn btn-primary btn-sm" onClick={() => applyToJob(job)}>Apply</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}
