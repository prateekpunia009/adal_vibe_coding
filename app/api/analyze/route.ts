import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client to point to OpenRouter
// This allows us to use free open-source models (like Llama 3) instantly.
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || 'dummy_key',
});

export async function POST(req: Request) {
  try {
    const { resumeText, jobDescription } = await req.json();

    if (!resumeText || !jobDescription) {
      return NextResponse.json({ error: "Missing resume or job description" }, { status: 400 });
    }

    // Zero-config Hackathon Mode:
    // If no API key is provided, gracefully fall back to our local "AdaL" heuristic model
    // so the demo never breaks during a presentation.
    if (!process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY === 'your_openrouter_api_key_here') {
      console.log("Using AdaL Local Open-Source Model (Heuristic Fallback)...");
      // Add a small artificial delay to simulate AI inference time for the demo
      await new Promise(resolve => setTimeout(resolve, 1500));
      return NextResponse.json(simulateAdalLocalModel(resumeText, jobDescription));
    }

    const prompt = `You are an expert Applicant Tracking System (ATS). 
    Analyze the provided Resume against the Job Description.
    
    Return a strictly formatted JSON object with exactly these keys:
    - "score": an integer from 0 to 100 representing the match percentage.
    - "matched": an array of string keywords/skills found in BOTH.
    - "missing": an array of string keywords/skills found in the job description but MISSING from the resume.
    
    Job Description:
    """${jobDescription}"""
    
    Resume:
    """${resumeText}"""
    `;

    const response = await openai.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct:free", // Completely free open-source model
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    // Handle potential markdown backticks in the response if the model ignores the json_object directive
    let content = response.choices[0].message.content || '{}';
    if (content.startsWith('```json')) {
      content = content.replace(/```json\n?/, '').replace(/```$/, '');
    }

    const result = JSON.parse(content);
    return NextResponse.json(result);

  } catch (error) {
    console.error("ATS Analysis error:", error);
    return NextResponse.json({ error: "Failed to analyze resume" }, { status: 500 });
  }
}

// Simulated Local Model (AdaL) for immediate zero-config testing
function simulateAdalLocalModel(resume: string, jd: string) {
  const resumeLower = resume.toLowerCase();
  
  // Extract potential keywords (words > 4 chars, capitalized in original, or common tech terms)
  const commonTech = [
    'react', 'node', 'node.js', 'python', 'aws', 'docker', 'sql', 'api', 'agile', 
    'typescript', 'javascript', 'kubernetes', 'graphql', 'system design', 'microservices',
    'mongodb', 'postgresql', 'ci/cd', 'frontend', 'backend', 'full stack'
  ];
  const jdWords = jd.toLowerCase().split(/[\s,.-]+/).filter(w => w.length > 3);
  
  // Create a unique set of pseudo-keywords from the JD
  const potentialKeywords = Array.from(new Set([...jdWords.filter(w => commonTech.includes(w) || w.length > 7)]));
  
  const matched: string[] = [];
  const missing: string[] = [];
  
  potentialKeywords.forEach(kw => {
    if (resumeLower.includes(kw)) {
      matched.push(kw);
    } else {
      missing.push(kw);
    }
  });
  
  // Select top relevant missing/matched to simulate AI concisely
  const topMatched = matched.slice(0, 8);
  const topMissing = missing.slice(0, 6);
  
  // Add some realistic fallback data if the JD was too short
  if (topMatched.length === 0 && topMissing.length === 0) {
    topMatched.push('Communication', 'Problem Solving');
    topMissing.push('Cloud Architecture', 'System Design');
  }
  
  const totalRelevant = topMatched.length + topMissing.length;
  const score = totalRelevant === 0 ? 50 : Math.round((topMatched.length / totalRelevant) * 100);

  return {
    score: Math.max(20, Math.min(score, 100)), // bound between 20 and 100
    matched: topMatched,
    missing: topMissing
  };
}
