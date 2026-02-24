'use client'

import { useState, useEffect } from 'react'
import { defaultResume, Resume, sampleJobs, Job } from '@/lib/data'

export default function ResumePage() {
  const [resume, setResume] = useState<Resume>(defaultResume)
  const [activeTab, setActiveTab] = useState<'editor' | 'ats'>('editor')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [atsScore, setAtsScore] = useState<{ score: number; matched: string[]; missing: string[] } | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('switchwithai-resume')
    if (saved) {
      setResume(JSON.parse(saved))
    }
  }, [])

  const saveResume = () => {
    localStorage.setItem('switchwithai-resume', JSON.stringify(resume))
    alert('Resume saved!')
  }

  const getResumeText = (r: Resume) => `${r.summary}\n\nSkills: ${r.skills}\n\nExperience:\n${r.experience}`;

  const analyzeATS = async (job: Job) => {
    setSelectedJob(job)
    setActiveTab('ats')
    setIsAnalyzing(true)
    setAtsScore(null)
    
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText: getResumeText(resume), jobDescription: job.description })
      });
      
      if (!res.ok) throw new Error('API Error');
      
      const score = await res.json();
      setAtsScore(score);
    } catch (err) {
      console.error(err);
      alert('Failed to analyze. Please check console or try again.');
    } finally {
      setIsAnalyzing(false);
    }
  }

  const optimizeResume = async (job: Job) => {
    setIsAnalyzing(true);
    setSelectedJob(job);
    setActiveTab('ats');
    
    try {
      // 1. Get current missing keywords (either from existing state or fetch fresh)
      let currentScore = atsScore;
      if (!currentScore || selectedJob?.id !== job.id) {
        const res = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resumeText: getResumeText(resume), jobDescription: job.description })
        });
        currentScore = await res.json();
      }

      if (currentScore && currentScore.missing && currentScore.missing.length > 0) {
        const missingStr = currentScore.missing.join(', ');
        
        // Smartly append the missing skills to the resume
        const optimizedResume = {
          ...resume,
          skills: resume.skills + (resume.skills ? ', ' : '') + missingStr,
          summary: resume.summary + ' Proficient in ' + missingStr + '.'
        };
        
        setResume(optimizedResume);
        localStorage.setItem('switchwithai-resume', JSON.stringify(optimizedResume));
        
        // 2. Re-analyze to show the new, improved score
        const res2 = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resumeText: getResumeText(optimizedResume), jobDescription: job.description })
        });
        const newScore = await res2.json();
        setAtsScore(newScore);
        alert(`✨ AI Optimized! Added missing keywords: ${missingStr}`);
      } else {
        alert('Your resume is already highly optimized for this job!');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to optimize. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'good'
    if (score >= 50) return 'medium'
    return 'poor'
  }

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Resume Builder</h1>
        <p className="page-subtitle">Create ATS-optimized resumes tailored to each job</p>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'editor' ? 'active' : ''}`}
          onClick={() => setActiveTab('editor')}
        >
          Resume Editor
        </button>
        <button 
          className={`tab ${activeTab === 'ats' ? 'active' : ''}`}
          onClick={() => setActiveTab('ats')}
        >
          ATS Analyzer
        </button>
      </div>

      {activeTab === 'editor' && (
        <div className="resume-container">
          <div className="resume-editor">
            <div className="card-header">
              <h3 className="card-title">Edit Your Resume</h3>
              <button className="btn btn-primary btn-sm" onClick={saveResume}>
                Save Resume
              </button>
            </div>

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                className="form-input" 
                value={resume.name}
                onChange={(e) => setResume({ ...resume, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                className="form-input" 
                value={resume.email}
                onChange={(e) => setResume({ ...resume, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input 
                type="tel" 
                className="form-input" 
                value={resume.phone}
                onChange={(e) => setResume({ ...resume, phone: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Location</label>
              <input 
                type="text" 
                className="form-input" 
                value={resume.location}
                onChange={(e) => setResume({ ...resume, location: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Professional Summary</label>
              <textarea 
                className="form-textarea" 
                value={resume.summary}
                onChange={(e) => setResume({ ...resume, summary: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Skills (comma separated)</label>
              <input 
                type="text" 
                className="form-input" 
                value={resume.skills}
                onChange={(e) => setResume({ ...resume, skills: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Work Experience</label>
              <textarea 
                className="form-textarea" 
                value={resume.experience}
                onChange={(e) => setResume({ ...resume, experience: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Education</label>
              <textarea 
                className="form-textarea" 
                value={resume.education}
                onChange={(e) => setResume({ ...resume, education: e.target.value })}
              />
            </div>
          </div>

          <div className="resume-preview">
            <h1>{resume.name}</h1>
            <div className="contact">{resume.email} | {resume.phone} | {resume.location}</div>
            
            <h2>Summary</h2>
            <p>{resume.summary}</p>
            
            <h2>Skills</h2>
            <p>{resume.skills}</p>
            
            <h2>Experience</h2>
            <p style={{ whiteSpace: 'pre-wrap' }}>{resume.experience}</p>
            
            <h2>Education</h2>
            <p style={{ whiteSpace: 'pre-wrap' }}>{resume.education}</p>
          </div>
        </div>
      )}

      {activeTab === 'ats' && (
        <div>
          <div className="card" style={{ marginBottom: '24px' }}>
            <div className="card-header">
              <h3 className="card-title">Select a Job to Analyze</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {sampleJobs.map(job => (
                <div 
                  key={job.id}
                  style={{ 
                    padding: '16px', 
                    background: 'var(--bg)', 
                    borderRadius: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <h4 style={{ marginBottom: '4px' }}>{job.title}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{job.company}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      className="btn btn-secondary btn-sm" 
                      onClick={() => analyzeATS(job)}
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing && selectedJob?.id === job.id ? 'Analyzing...' : 'Analyze'}
                    </button>
                    <button 
                      className="btn btn-primary btn-sm" 
                      onClick={() => optimizeResume(job)}
                      disabled={isAnalyzing}
                    >
                      Optimize
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedJob && isAnalyzing && (
            <div className="ats-score-container" style={{ justifyContent: 'center', padding: '48px' }}>
              <div style={{ textAlign: 'center' }}>
                <div className="spinner" style={{ margin: '0 auto 16px', width: '40px', height: '40px', borderTopColor: 'var(--primary)', borderRightColor: 'var(--accent)' }}></div>
                <h3>AI is analyzing your resume...</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Extracting keywords & calculating match for {selectedJob.title}</p>
              </div>
            </div>
          )}

          {selectedJob && atsScore && !isAnalyzing && (
            <div className="ats-score-container">
              <div className="ats-circle">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle className="ats-circle-bg" cx="60" cy="60" r="52" />
                  <circle 
                    className={`ats-circle-progress ${getScoreColor(atsScore.score)}`}
                    cx="60" cy="60" r="52"
                    strokeDasharray="326.73"
                    strokeDashoffset={326.73 - (326.73 * atsScore.score / 100)}
                  />
                </svg>
                <div className="ats-score-value">{atsScore.score}%</div>
              </div>
              <div className="ats-details">
                <h3 className="ats-title">ATS Score for {selectedJob.title}</h3>
                <p className="ats-subtitle">
                  {atsScore.score >= 70 
                    ? 'Great match! Your resume is well-aligned with this job.' 
                    : atsScore.score >= 50 
                    ? 'Good match, but could be improved. Consider optimizing your resume.'
                    : 'Low match. Optimize your resume to include more relevant keywords.'}
                </p>
                <div style={{ marginTop: '16px' }}>
                  <p style={{ marginBottom: '8px', fontWeight: 600 }}>Matched Keywords:</p>
                  <div className="keyword-list">
                    {atsScore.matched.map((kw, i) => (
                      <span key={i} className="keyword-tag matched">{kw}</span>
                    ))}
                  </div>
                </div>
                {atsScore.missing.length > 0 && (
                  <div style={{ marginTop: '16px' }}>
                    <p style={{ marginBottom: '8px', fontWeight: 600 }}>Missing Keywords:</p>
                    <div className="keyword-list">
                      {atsScore.missing.map((kw, i) => (
                        <span key={i} className="keyword-tag missing">{kw}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
