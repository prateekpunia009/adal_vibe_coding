export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  remote: 'remote' | 'onsite' | 'hybrid';
  description: string;
  requirements: string[];
  postedDate: string;
  source: string;
}

export interface Application {
  id: string;
  job: Job;
  status: 'saved' | 'applied' | 'screening' | 'interview' | 'offer' | 'rejected';
  appliedDate?: string;
  notes?: string;
  resumeVersion?: string;
}

export interface Resume {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string;
  experience: string;
  education: string;
}

export const sampleJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    salary: '$150,000 - $200,000',
    type: 'Full-time',
    remote: 'hybrid',
    description: 'We are looking for a Senior Software Engineer to join our team and help build scalable web applications. You will work with a team of talented engineers to develop high-quality software solutions.',
    requirements: ['5+ years of experience', 'React', 'Node.js', 'Python', 'AWS', 'MongoDB'],
    postedDate: '2024-01-15',
    source: 'LinkedIn'
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    location: 'Remote',
    salary: '$120,000 - $160,000',
    type: 'Full-time',
    remote: 'remote',
    description: 'Join our fast-growing startup as a Full Stack Developer. You will be responsible for building and maintaining our web platform using modern technologies.',
    requirements: ['3+ years experience', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker'],
    postedDate: '2024-01-14',
    source: 'Indeed'
  },
  {
    id: '3',
    title: 'Frontend Developer',
    company: 'DesignStudio',
    location: 'New York, NY',
    salary: '$90,000 - $130,000',
    type: 'Full-time',
    remote: 'onsite',
    description: 'Looking for a talented Frontend Developer to create beautiful and responsive user interfaces. Experience with modern JavaScript frameworks is a must.',
    requirements: ['2+ years experience', 'React', 'CSS', 'TypeScript', 'Figma'],
    postedDate: '2024-01-13',
    source: 'Glassdoor'
  },
  {
    id: '4',
    title: 'Backend Engineer',
    company: 'DataFlow',
    location: 'Seattle, WA',
    salary: '$140,000 - $180,000',
    type: 'Full-time',
    remote: 'hybrid',
    description: 'Seeking a Backend Engineer to design and implement scalable API services. You will work with large datasets and ensure system reliability.',
    requirements: ['4+ years experience', 'Python', 'Django', 'PostgreSQL', 'Redis', 'Kubernetes'],
    postedDate: '2024-01-12',
    source: 'LinkedIn'
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Austin, TX',
    salary: '$130,000 - $170,000',
    type: 'Full-time',
    remote: 'remote',
    description: 'Join our DevOps team to build and maintain CI/CD pipelines and cloud infrastructure. Experience with AWS and containerization required.',
    requirements: ['3+ years experience', 'AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
    postedDate: '2024-01-11',
    source: 'Indeed'
  },
  {
    id: '6',
    title: 'Software Engineering Intern',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    salary: '$40 - $50/hour',
    type: 'Internship',
    remote: 'onsite',
    description: 'Summer internship opportunity for computer science students. You will work on real projects and learn from experienced engineers.',
    requirements: ['Currently pursuing CS degree', 'Python', 'Java', 'Git'],
    postedDate: '2024-01-10',
    source: 'LinkedIn'
  }
];

export const defaultResume: Resume = {
  name: 'John Doe',
  email: 'john.doe@email.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  summary: 'Experienced software engineer with 5+ years of experience in building scalable web applications. Proficient in React, Node.js, Python, and cloud technologies. Passionate about clean code and delivering exceptional user experiences.',
  skills: 'JavaScript, TypeScript, React, Node.js, Python, PostgreSQL, MongoDB, AWS, Docker, Git',
  experience: `Senior Software Engineer @ TechCorp (2021 - Present)
• Led development of customer-facing dashboard serving 100K+ users
• Implemented microservices architecture reducing latency by 40%
• Mentored junior developers and conducted code reviews

Software Engineer @ StartupXYZ (2019 - 2021)
• Built RESTful APIs using Node.js and Express
• Developed React frontend components and features
• Collaborated with product team to deliver features on time`,
  education: `Bachelor of Science in Computer Science
University of California, Berkeley
Graduated: 2019`
};

export function calculateATSScore(resume: Resume, job: Job): { score: number; matched: string[]; missing: string[] } {
  const resumeText = `${resume.summary} ${resume.skills} ${resume.experience}`.toLowerCase();
  const jobRequirements = job.requirements.map(r => r.toLowerCase());
  
  const matched: string[] = [];
  const missing: string[] = [];
  
  for (const req of jobRequirements) {
    const keywords = req.split(' ').filter(k => k.length > 2);
    const hasKeyword = keywords.some(kw => resumeText.includes(kw));
    if (hasKeyword) {
      matched.push(req);
    } else {
      missing.push(req);
    }
  }
  
  const score = Math.round((matched.length / jobRequirements.length) * 100);
  
  return {
    score: Math.min(score, 100),
    matched,
    missing
  };
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'saved': return 'var(--text-muted)';
    case 'applied': return 'var(--primary)';
    case 'screening': return 'var(--warning)';
    case 'interview': return 'var(--accent)';
    case 'offer': return 'var(--success)';
    case 'rejected': return 'var(--danger)';
    default: return 'var(--text-muted)';
  }
}
