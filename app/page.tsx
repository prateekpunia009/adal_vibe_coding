'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // State for the interactive Magic Apply Demo
  const [demoText, setDemoText] = useState("We are looking for a Senior Frontend Engineer. You should have 4+ years of experience building scalable web apps with React, TypeScript, and Next.js.");
  const [demoState, setDemoState] = useState<'idle' | 'analyzing' | 'done'>('idle');

  const handleMagicApply = () => {
    setDemoState('analyzing');
    // Simulate AI inference time for the demo
    setTimeout(() => {
      setDemoState('done');
    }, 1800);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)', overflowX: 'hidden' }}>
      
      {/* Background Effects */}
      <div style={{ position: 'fixed', top: '-20%', left: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(10, 10, 15, 0) 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', top: '20%', right: '-10%', width: '40%', height: '60%', background: 'radial-gradient(circle, rgba(34, 211, 238, 0.1) 0%, rgba(10, 10, 15, 0) 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />

      {/* Navbar */}
      <header style={{ 
        padding: '16px 48px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        background: 'rgba(10, 10, 15, 0.6)', 
        backdropFilter: 'blur(20px)', 
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        position: 'fixed', 
        width: '100%', 
        zIndex: 100 
      }}>
        <div className="logo" style={{ margin: 0 }}>
          <div className="logo-icon" style={{ boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)' }}>⚡</div>
          <span className="logo-text">SwitchWithAI</span>
        </div>
        <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <Link href="#how-it-works" className="nav-link">How it works</Link>
          <Link href="#features" className="nav-link">Features</Link>
          <Link href="/dashboard" className="btn btn-primary" style={{ padding: '10px 24px' }}>Try Demo as Guest</Link>
        </nav>
      </header>

      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        
        {/* HERO SECTION */}
        <section style={{ padding: '160px 24px 80px', maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '64px', minHeight: '90vh' }}>
          <div style={{ flex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '6px 16px', borderRadius: '30px',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '24px'
              }}
            >
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 10px var(--success)' }} />
              SwitchWithAI AI is now in public beta
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: '4.5rem', fontWeight: 700, marginBottom: '24px', lineHeight: 1.05, letterSpacing: '-0.03em' }}
            >
              Land your dream job. <br />
              <span style={{ background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 30px rgba(99, 102, 241, 0.3))' }}>
                Without the stress.
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '500px', lineHeight: 1.6 }}
            >
              Your AI career copilot. Optimize your resume for ATS, automate job applications, and track your entire pipeline in one beautiful workspace.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
            >
              <Link href="/dashboard" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem', borderRadius: '12px', boxShadow: '0 8px 30px rgba(99, 102, 241, 0.3)' }}>
                Enter the Dashboard →
              </Link>
            </motion.div>
          </div>

          {/* Hero Visual (Interactive Magic Apply Demo) */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
            style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(34,211,238,0.2))', filter: 'blur(70px)', borderRadius: '50%' }} />
            
            <div style={{ 
              width: '100%', maxWidth: '440px',
              background: 'rgba(18, 18, 26, 0.8)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '24px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.4)', position: 'relative', zIndex: 10 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>✨</div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Interactive Demo</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Experience "Magic Apply"</p>
                  </div>
                </div>
                {demoState === 'done' && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ padding: '4px 12px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600 }}>96% ATS Match</motion.span>
                )}
              </div>
              
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Paste a job description:</p>
              <textarea 
                value={demoText}
                onChange={(e) => setDemoText(e.target.value)}
                style={{ width: '100%', height: '110px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '20px', resize: 'none', fontFamily: 'inherit', lineHeight: 1.5 }}
              />

              {demoState === 'idle' && (
                <button onClick={handleMagicApply} style={{ width: '100%', padding: '14px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)', fontSize: '1rem' }}>
                  Magic Apply (1-Click)
                </button>
              )}

              {demoState === 'analyzing' && (
                <div style={{ width: '100%', padding: '14px', background: 'var(--surface-elevated)', color: 'var(--text-secondary)', border: '1px solid var(--border)', borderRadius: '12px', textAlign: 'center', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: '1rem' }}>
                  <div className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px', borderTopColor: 'var(--primary)', borderRightColor: 'transparent' }}></div>
                  Auto-tailoring resume...
                </div>
              )}

              {demoState === 'done' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px', marginBottom: '16px' }}>
                    <p style={{ fontSize: '0.875rem', color: 'var(--success)', margin: '0 0 12px 0', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ background: 'var(--success)', color: '#000', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>✓</span> 
                      Added missing keywords
                    </p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span className="mock-tag highlight">React</span>
                      <span className="mock-tag highlight">TypeScript</span>
                      <span className="mock-tag highlight">Next.js</span>
                    </div>
                  </div>
                  <button onClick={() => setDemoState('idle')} style={{ width: '100%', padding: '12px', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border)', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>
                    Reset Demo
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </section>

        {/* LOGO CLOUD */}
        <section style={{ padding: '40px 24px', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '32px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Powered by Next.js, Framer Motion, and Advanced LLMs
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '64px', flexWrap: 'wrap', opacity: 0.5, filter: 'grayscale(100%)' }}>
            {['OpenAI', 'Vercel', 'React', 'TypeScript', 'Tailwind'].map(company => (
              <h3 key={company} style={{ fontSize: '1.5rem', margin: 0, fontFamily: 'Outfit' }}>{company}</h3>
            ))}
          </div>
        </section>

        {/* PUNCHY PROBLEM / SOLUTION */}
        <section id="how-it-works" style={{ padding: '120px 24px', maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '16px', lineHeight: 1.1 }}>From 45 minutes per application<br/><span style={{ color: 'var(--accent)' }}>to 3 seconds.</span></h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>We transformed a fragmented, frustrating process into a streamlined engine.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)', borderRadius: '24px', padding: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', color: 'var(--danger)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</div>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>The Old Way</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <li className="comparison-item">Generic resumes get rejected by ATS bots</li>
                <li className="comparison-item">Hours wasted rewriting bullet points</li>
                <li className="comparison-item">Losing track of applications in messy spreadsheets</li>
                <li className="comparison-item">Missing follow-ups and interview dates</li>
              </ul>
            </div>

            <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '24px', padding: '40px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'var(--success)', opacity: 0.1, filter: 'blur(40px)', borderRadius: '50%' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', color: 'var(--success)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>With SwitchWithAI</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <li className="comparison-item success">AI crafts ATS-optimized resumes instantly</li>
                <li className="comparison-item success">1-Click autofill for any job application</li>
                <li className="comparison-item success">Visual Kanban board to track everything</li>
                <li className="comparison-item success">Smart reminders for interviews and follow-ups</li>
              </ul>
            </div>
          </div>
        </section>

        {/* DEEP DIVE FEATURES */}
        <section id="features" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '160px' }}>
            
            {/* Feature 1 */}
            <div className="feature-row">
              <div className="feature-content">
                <div className="feature-icon-wrapper">🎯</div>
                <h2>Beat the ATS Algorithms</h2>
                <p>Upload your base resume once. Our AI scans the job description, analyzes the required keywords, and instantly generates a tailored resume that scores 80%+ on Applicant Tracking Systems.</p>
                <ul className="feature-bullets">
                  <li>Real-time keyword gap analysis</li>
                  <li>Smart rephrasing for impact</li>
                  <li>Multiple resume versions saved automatically</li>
                </ul>
              </div>
              <div className="feature-visual">
                <div className="visual-card">
                  <div style={{ padding: '20px', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <span>Missing Keywords</span>
                      <span style={{ color: 'var(--danger)' }}>Action Required</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span className="mock-tag missing">Kubernetes</span>
                      <span className="mock-tag missing">GraphQL</span>
                      <span className="mock-tag missing">System Architecture</span>
                    </div>
                  </div>
                  <div style={{ padding: '20px', background: 'rgba(99, 102, 241, 0.05)' }}>
                    <button style={{ width: '100%', padding: '12px', background: 'var(--gradient)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <span>✨</span> Auto-Optimize Resume
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="feature-row reverse">
              <div className="feature-content">
                <div className="feature-icon-wrapper">📊</div>
                <h2>Visual Application Pipeline</h2>
                <p>Never lose track of a job again. Our beautifully designed Kanban board lets you drag and drop applications as they progress through the hiring stages.</p>
                <ul className="feature-bullets">
                  <li>Customizable pipeline stages</li>
                  <li>Track salaries, locations, and notes</li>
                  <li>Analytics on application conversion rates</li>
                </ul>
              </div>
              <div className="feature-visual">
                <div className="visual-card kanban-mockup">
                  <div className="kanban-col">
                    <div className="col-header"><span className="dot applied"></span> Applied</div>
                    <div className="col-card">Stripe - Frontend</div>
                    <div className="col-card">Vercel - Engineer</div>
                  </div>
                  <div className="kanban-col highlight-col">
                    <div className="col-header"><span className="dot interview"></span> Interview</div>
                    <motion.div 
                      initial={{ y: -20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="col-card active-card"
                    >
                      Google - SWE
                      <div className="card-badge">Tomorrow</div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* CTA SECTION */}
        <section style={{ padding: '120px 24px', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(99,102,241,0.1), transparent)', pointerEvents: 'none' }} />
          <div style={{ 
            maxWidth: '800px', margin: '0 auto', textAlign: 'center', 
            background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.1)', 
            borderRadius: '32px', padding: '80px 40px', position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '300px', height: '100px', background: 'var(--primary)', filter: 'blur(80px)', opacity: 0.3 }} />
            
            <h2 style={{ fontSize: '3rem', marginBottom: '24px', position: 'relative', zIndex: 1 }}>Ready to accelerate your career?</h2>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '40px', position: 'relative', zIndex: 1 }}>
              Join thousands of job seekers who are landing interviews faster with SwitchWithAI.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ position: 'relative', zIndex: 1, display: 'inline-block' }}>
              <Link href="/dashboard" className="btn btn-primary" style={{ padding: '20px 48px', fontSize: '1.25rem', borderRadius: '16px', boxShadow: '0 10px 40px rgba(99, 102, 241, 0.4)' }}>
                Get Started for Free
              </Link>
            </motion.div>
            <p style={{ marginTop: '24px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>No credit card required.</p>
          </div>
        </section>

      </main>
      
      <footer style={{ padding: '64px 48px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'var(--bg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo" style={{ margin: 0 }}>
          <div className="logo-icon" style={{ width: '24px', height: '24px', fontSize: '12px' }}>⚡</div>
          <span className="logo-text" style={{ fontSize: '1.25rem' }}>SwitchWithAI</span>
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          © 2026 SwitchWithAI Inc. All rights reserved.
        </div>
      </footer>

      {/* Embedded CSS for Landing Page specific components */}
      <style dangerouslySetInnerHTML={{__html: `
        .nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          transition: color 0.2s;
        }
        .nav-link:hover {
          color: var(--text-primary);
        }
        .mock-tag {
          padding: 4px 12px;
          background: var(--surface-elevated);
          border-radius: 6px;
          font-size: 0.75rem;
          color: var(--text-secondary);
          border: 1px solid var(--border);
        }
        .mock-tag.highlight {
          background: rgba(34, 211, 238, 0.1);
          color: var(--accent);
          border-color: rgba(34, 211, 238, 0.2);
        }
        .mock-tag.missing {
          background: rgba(239, 68, 68, 0.1);
          color: var(--danger);
          border-color: rgba(239, 68, 68, 0.2);
        }
        .comparison-item {
          color: var(--text-secondary);
          font-size: 1.05rem;
          display: flex;
          align-items: center;
        }
        .comparison-item::before {
          content: "—";
          margin-right: 12px;
          color: var(--danger);
          opacity: 0.5;
        }
        .comparison-item.success::before {
          content: "→";
          color: var(--success);
          opacity: 1;
        }
        .feature-row {
          display: flex;
          align-items: center;
          gap: 80px;
        }
        .feature-row.reverse {
          flex-direction: row-reverse;
        }
        .feature-content {
          flex: 1;
        }
        .feature-icon-wrapper {
          width: 56px; height: 56px;
          background: var(--surface-elevated);
          border: 1px solid var(--border);
          border-radius: 16px;
          display: flex; alignItems: center; justify-content: center;
          font-size: 24px;
          margin-bottom: 24px;
        }
        .feature-content h2 {
          fontSize: 2.5rem;
          margin-bottom: 20px;
        }
        .feature-content p {
          color: var(--text-secondary);
          font-size: 1.1rem;
          line-height: 1.7;
          margin-bottom: 32px;
        }
        .feature-bullets {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 16px;
        }
        .feature-bullets li {
          display: flex; align-items: center; gap: 12px;
          color: var(--text-primary); font-weight: 500;
        }
        .feature-bullets li::before {
          content: "✓";
          color: var(--accent);
          background: rgba(34, 211, 238, 0.1);
          width: 24px; height: 24px; border-radius: 50%;
          display: flex; alignItems: center; justify-content: center;
          font-size: 12px;
        }
        .feature-visual {
          flex: 1;
        }
        .visual-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .kanban-mockup {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          padding: 24px;
          background: #0f0f13;
        }
        .kanban-col {
          background: var(--bg);
          border-radius: 12px;
          padding: 16px;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .kanban-col.highlight-col {
          border-color: rgba(34, 211, 238, 0.3);
          background: rgba(34, 211, 238, 0.02);
        }
        .col-header {
          font-size: 0.875rem; font-weight: 600; color: var(--text-secondary);
          margin-bottom: 16px; display: flex; align-items: center; gap: 8px;
        }
        .dot { width: 8px; height: 8px; border-radius: 50%; }
        .dot.applied { background: var(--primary); }
        .dot.interview { background: var(--accent); boxShadow: 0 0 10px var(--accent); }
        .col-card {
          background: var(--surface-elevated);
          padding: 12px; border-radius: 8px; font-size: 0.875rem;
          margin-bottom: 8px; border: 1px solid var(--border);
        }
        .active-card {
          border-color: var(--accent);
          box-shadow: 0 4px 12px rgba(34, 211, 238, 0.1);
        }
        .card-badge {
          display: inline-block; margin-top: 8px; padding: 2px 8px;
          background: rgba(34, 211, 238, 0.1); color: var(--accent);
          border-radius: 4px; font-size: 0.7rem;
        }
        
        .spinner {
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @media (max-width: 900px) {
          .feature-row, .feature-row.reverse {
            flex-direction: column;
            gap: 40px;
          }
        }
      `}} />
    </div>
  )
}
