import Link from 'next/link'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <Link href="/" className="logo" style={{ textDecoration: 'none' }}>
          <div className="logo-icon">⚡</div>
          <span className="logo-text">SwitchWithAI</span>
        </Link>
        <nav className="nav-menu">
          <Link href="/dashboard" className="nav-item">📊 Dashboard</Link>
          <Link href="/search" className="nav-item">🔍 Find Jobs</Link>
          <Link href="/applications" className="nav-item">📋 Applications</Link>
          <Link href="/resume" className="nav-item">📄 Resume Builder</Link>
        </nav>
      </aside>
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}
