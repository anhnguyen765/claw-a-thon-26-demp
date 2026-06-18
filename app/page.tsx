'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import './home.css'

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 11)
    }, 5000)

    return () => clearInterval(timer)
  }, [autoPlay])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentSlide((prev) => (prev + 1) % 11)
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => (prev - 1 + 11) % 11)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const slides = [
    {
      label: 'Cover',
      gradient: 'radial-gradient(1100px 760px at 24% 6%, rgba(10,132,255,0.22), transparent 62%), radial-gradient(1000px 820px at 86% 96%, rgba(191,90,242,0.20), transparent 62%)',
    },
    { label: 'The Problem' },
    { label: 'The Stress' },
    { label: 'Solutions Fail' },
    { label: 'Introducing' },
    { label: 'How It Works' },
    { label: 'Architecture' },
    { label: 'Example' },
    { label: 'Integration' },
    { label: 'Vision' },
    { label: 'Try It' },
  ]

  return (
    <main className="presentation-container">
      <div className="slide-viewport">
        {currentSlide === 0 && <CoverSlide />}
        {currentSlide === 1 && <ProblemSlide />}
        {currentSlide === 2 && <StressSlide />}
        {currentSlide === 3 && <SolutionsFailSlide />}
        {currentSlide === 4 && <IntroducingSlide />}
        {currentSlide === 5 && <HowItWorksSlide />}
        {currentSlide === 6 && <ArchitectureSlide />}
        {currentSlide === 7 && <ExampleSlide />}
        {currentSlide === 8 && <IntegrationSlide />}
        {currentSlide === 9 && <VisionSlide />}
        {currentSlide === 10 && <TryItSlide />}
      </div>

      <div className="presentation-controls">
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + 11) % 11)}
          className="nav-button"
        >
          ←
        </button>

        <div className="slide-counter">
          {String(currentSlide + 1).padStart(2, '0')} / 11
        </div>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % 11)}
          className="nav-button"
        >
          →
        </button>

        <button
          onClick={() => setAutoPlay(!autoPlay)}
          className={`nav-button ${autoPlay ? 'active' : ''}`}
          title={autoPlay ? 'Pause' : 'Play'}
        >
          {autoPlay ? '⏸' : '▶'}
        </button>

        {currentSlide === 10 && (
          <Link href="/app" className="cta-button">
            Launch App
          </Link>
        )}
      </div>

      <div className="slide-indicators">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`indicator ${idx === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(idx)}
            title={slides[idx].label}
          />
        ))}
      </div>
    </main>
  )
}

function CoverSlide() {
  return (
    <section className="slide cover-slide">
      <div className="fade-in">
        <div className="subtitle">AI Decision Clarity Coach</div>
      </div>
      <h1 className="pop-in">BabyWhy</h1>
      <div className="anim-in">
        <h2>Your AI Product Reflection Coach</h2>
      </div>
      <p className="anim-in">
        Helping Product Owners navigate stakeholder conflicts, decision fatigue, and
        organizational chaos through Socratic AI coaching.
      </p>
      <div className="tagline">
        <span className="blue">Reflect.</span>
        <span className="purple">Challenge.</span>
        <span className="green">Decide.</span>
      </div>
      <div className="footer-text">
        Presented by <span className="highlight">anhnhm3</span> · Team{' '}
        <span className="highlight">2k5Baby</span>
      </div>
    </section>
  )
}

function ProblemSlide() {
  return (
    <section className="slide problem-slide">
      <div className="fade-in">
        <div className="section-label" style={{ color: '#FF6961' }}>
          The Problem
        </div>
      </div>
      <h2>Product Owners Are Burning Out</h2>
      <div className="problem-grid">
        <div className="problem-content">
          <div className="conflict-diagram">
            <div className="actor">Business</div>
            <div className="actor-center">Product Owner</div>
            <div className="actor">Engineering</div>
          </div>
          <div className="challenges">
            {[
              'Stakeholder expectations',
              'Delivery pressure',
              'Compliance requirements',
              'Endless workflows',
              'Organizational politics',
            ].map((challenge) => (
              <div key={challenge} className="challenge-tag">
                {challenge}
              </div>
            ))}
          </div>
        </div>
        <div className="insight-box">
          <div>Current AI tools help teams work faster.</div>
          <div style={{ marginTop: '22px' }}>
            Nobody helps Product Owners <span className="highlight">think clearer.</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function StressSlide() {
  return (
    <section className="slide stress-slide">
      <div className="fade-in">
        <div className="section-label" style={{ color: '#FF9F0A' }}>
          What Causes The Stress?
        </div>
      </div>
      <h2>The Real Problem Is Not Workload</h2>
      <div className="stress-grid">
        <div className="stress-items">
          {[
            'Conflicting priorities',
            'Stakeholder pressure',
            'Decision fatigue',
            'Responsibility without authority',
            'Constant context switching',
            'Workflow-heavy organizations',
          ].map((item, idx) => (
            <div key={idx} className="stress-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6961">
                <path d="M6 6l12 12M18 6L6 18" strokeWidth="2.6" strokeLinecap="round" />
              </svg>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div className="stress-outcome">
          <div className="label">A typical week</div>
          {[
            { label: 'Sales wants', value: 'Feature A' },
            { label: 'Engineering wants', value: 'Tech debt' },
            { label: 'Compliance wants', value: 'Approval steps' },
            { label: 'Leadership wants', value: 'Faster delivery' },
          ].map((item, idx) => (
            <div key={idx} className="week-item">
              <span>{item.label}</span>
              <span className="value">{item.value}</span>
            </div>
          ))}
          <div className="stuck">Product Owner gets stuck in the middle.</div>
        </div>
      </div>
    </section>
  )
}

function SolutionsFailSlide() {
  return (
    <section className="slide solutions-slide">
      <div className="fade-in">
        <div className="section-label" style={{ color: '#64D2FF' }}>
          Existing Solutions Fail
        </div>
      </div>
      <h2>Current AI Tools</h2>
      <div className="solutions-grid">
        <div className="tools-table">
          {[
            { tool: 'ChatGPT', purpose: 'Answer questions' },
            { tool: 'Jira AI', purpose: 'Productivity' },
            { tool: 'Copilot', purpose: 'Coding' },
            { tool: 'Notion AI', purpose: 'Documentation' },
          ].map((item, idx) => (
            <div key={idx} className="tool-row">
              <span className="tool">{item.tool}</span>
              <span className="purpose">{item.purpose}</span>
            </div>
          ))}
        </div>
        <div className="gap-box">
          <div className="gap-ask">They all ask</div>
          <div className="gap-wrong">How can I do more?</div>
          <div className="gap-better">How can I think better?</div>
        </div>
      </div>
    </section>
  )
}

function IntroducingSlide() {
  return (
    <section className="slide introducing-slide">
      <div className="fade-in">
        <div className="section-label" style={{ color: '#BF5AF2' }}>
          Introducing BabyMirror
        </div>
      </div>
      <h2>The First AI Decision Clarity Coach</h2>
      <div className="feature-grid">
        <div className="does-not">
          <div className="label">It does NOT</div>
          {[
            'Validate emotions blindly',
            'Tell users they are always right',
            'Give instant answers',
          ].map((item, idx) => (
            <div key={idx} className="feature">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6961">
                <path d="M6 6l12 12M18 6L6 18" strokeWidth="2.6" strokeLinecap="round" />
              </svg>
              {item}
            </div>
          ))}
        </div>
        <div className="does">
          <div className="label">Instead it</div>
          {[
            'Challenges assumptions',
            'Separates facts from emotions',
            'Maps stakeholder incentives',
            'Reconnects decisions to product outcomes',
          ].map((item, idx) => (
            <div key={idx} className="feature">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5CE08A">
                <path d="M5 13l4 4L19 7" strokeWidth="2.6" strokeLinecap="round" />
              </svg>
              {item}
            </div>
          ))}
          <div className="using">
            Using <span className="highlight">Socratic questioning.</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function HowItWorksSlide() {
  return (
    <section className="slide how-slide">
      <div className="fade-in">
        <div className="section-label" style={{ color: '#64D2FF' }}>
          How It Works
        </div>
      </div>
      <h2>Reflection Flow</h2>
      <div className="flow-diagram">
        {[
          { num: '1', label: 'User Challenge', color: '#64D2FF' },
          { num: '2', label: 'Emotional Analysis', color: 'rgba(255,255,255,0.85)' },
          { num: '3', label: 'Socratic Questioning', color: 'rgba(255,255,255,0.85)' },
          { num: '4', label: 'Stakeholder Mapping', color: 'rgba(255,255,255,0.85)' },
          { num: '5', label: 'Product Vision Alignment', color: 'rgba(255,255,255,0.85)' },
          { num: '6', label: 'Action Design', color: 'rgba(255,255,255,0.85)' },
          { num: '7', label: 'Decision Journal', color: '#5CE08A' },
        ].map((step, idx) => (
          <div key={idx} className="flow-step">
            <div className="step-number" style={{ borderColor: step.color, color: step.color }}>
              {step.num}
            </div>
            <div className="step-label">{step.label}</div>
          </div>
        ))}
      </div>
      <div className="outcomes">
        <div className="outcome">More clarity</div>
        <div className="outcome">Better decisions</div>
        <div className="outcome">Lower mental load</div>
      </div>
    </section>
  )
}

function ArchitectureSlide() {
  return (
    <section className="slide architecture-slide">
      <div className="fade-in">
        <div className="section-label" style={{ color: '#0A84FF' }}>
          AI Agent Architecture
        </div>
      </div>
      <h2>Multi-Agent System</h2>
      <div className="agents-grid">
        {[
          {
            num: '01',
            name: 'Reflection Agent',
            desc: 'Detects emotions hidden inside everyday work situations.',
            color: '#64D2FF',
          },
          {
            num: '02',
            name: 'Socratic Coach',
            desc: 'Challenges assumptions and explores blind spots.',
            color: '#0A84FF',
          },
          {
            num: '03',
            name: 'Stakeholder Analyst',
            desc: 'Maps the goals, fears and incentives of each stakeholder.',
            color: '#BF5AF2',
          },
          {
            num: '04',
            name: 'Product Alignment Agent',
            desc: 'Reconnects decisions to customer value, product vision and business outcomes.',
            color: '#FF9F0A',
          },
          {
            num: '05',
            name: 'Decision Historian',
            desc: 'Tracks decisions and burnout patterns over time.',
            color: '#5CE08A',
          },
        ].map((agent) => (
          <div key={agent.num} className="agent-card">
            <div className="agent-number" style={{ color: agent.color }}>
              {agent.num}
            </div>
            <div className="agent-name">{agent.name}</div>
            <div className="agent-desc">{agent.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ExampleSlide() {
  return (
    <section className="slide example-slide">
      <div className="fade-in">
        <div className="section-label" style={{ color: '#BF5AF2' }}>
          Example Interaction
        </div>
      </div>
      <h2>A Reflection In Action</h2>
      <div className="chat-grid">
        <div className="chat-messages">
          <div className="message user-message">
            <div className="message-label">Product Owner</div>
            Engineering rejected my roadmap proposal again. I think they don't care about business
            priorities.
          </div>
          <div className="message ai-message">
            <div className="message-label">BabyWhy</div>
            <div>What evidence suggests they do not care?</div>
            <div>What evidence contradicts that assumption?</div>
            <div>How would Engineering describe this situation?</div>
            <div>What risks might they be optimizing for?</div>
            <div>What customer outcome is affected by this disagreement?</div>
          </div>
        </div>
        <div className="outcome-box">
          <div className="outcome-label">Outcome</div>
          <div className="emotion">Emotion</div>
          <div className="arrow">↓</div>
          <div className="reflection">Reflection</div>
          <div className="arrow">↓</div>
          <div className="clarity">Clarity</div>
        </div>
      </div>
    </section>
  )
}

function IntegrationSlide() {
  return (
    <section className="slide integration-slide">
      <div className="fade-in">
        <div className="section-label" style={{ color: '#5CE08A' }}>
          ProductOS Integration
        </div>
      </div>
      <h2>Beyond Conversations</h2>
      <div className="integration-grid">
        <div className="integrations">
          <div className="label">Connects to</div>
          {['Jira', 'Confluence', 'Slack', 'Notion', 'Linear'].map((tool) => (
            <div key={tool} className="integration-item">
              {tool}
            </div>
          ))}
        </div>
        <div className="context-box">
          <div>Instead of asking "What happened?"</div>
          <div style={{ marginTop: '16px', fontSize: '34px', fontWeight: '600' }}>
            BabyWhy already knows:
          </div>
          <div className="context-items">
            {['Sprint delays', 'Stakeholder requests', 'Open incidents', 'Roadmap priorities'].map(
              (item) => (
                <div key={item} className="context-item">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5CE08A">
                    <path d="M5 13l4 4L19 7" strokeWidth="2.6" strokeLinecap="round" />
                  </svg>
                  {item}
                </div>
              )
            )}
          </div>
          <div>
            It can coach based on <span className="highlight">real evidence.</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function VisionSlide() {
  return (
    <section className="slide vision-slide">
      <div className="fade-in">
        <div className="section-label" style={{ color: '#BF5AF2' }}>
          Vision
        </div>
      </div>
      <h2>Future Of Product Leadership</h2>
      <div className="vision-grid">
        {[
          { label: 'Today', color: 'rgba(255,255,255,0.7)', text: 'AI helps people execute.' },
          { label: 'Tomorrow', color: '#fff', text: 'AI helps people think.', highlight: true },
        ].map((item) => (
          <div
            key={item.label}
            className={`vision-item ${item.highlight ? 'highlight' : ''}`}
          >
            <div className="vision-label">{item.label}</div>
            <div className="vision-text" style={{ color: item.color }}>
              {item.text}
            </div>
          </div>
        ))}
      </div>
      <div className="transformations">
        {[
          { from: 'Stress', to: 'Reflection' },
          { from: 'Confusion', to: 'Clarity' },
          { from: 'Reaction', to: 'Decision' },
          { from: 'Product Owner', to: 'Product Leader' },
        ].map((item, idx) => (
          <div key={idx} className="transformation">
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>{item.from}</span>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#64D2FF">
              <path d="M5 12h14M13 6l6 6-6 6" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span style={{ fontWeight: '600' }}>{item.to}</span>
          </div>
        ))}
      </div>
      <div className="tagline">
        <span className="blue">Reflect.</span>
        <span className="purple">Challenge.</span>
        <span className="green">Decide.</span>
      </div>
    </section>
  )
}

function TryItSlide() {
  return (
    <section className="slide try-slide">
      <div className="fade-in">
        <div className="section-label" style={{ color: '#5CE08A' }}>
          Try It Yourself
        </div>
      </div>
      <h2>Run BabyWhy Locally</h2>
      <div className="try-grid">
        <div className="steps">
          {[
            {
              num: '1',
              title: 'Clone the repository',
              code: 'git clone https://github.com/anhnguyen765/claw26-2k5Baby',
            },
            {
              num: '2',
              title: 'Launch the local AI agent',
              desc: 'Start the agent and open BabyWhy\'s AI Skills to begin a reflection session.',
            },
            {
              num: '3',
              title: 'Connect knowledge sources — optional',
              tags: ['Jira', 'Confluence', 'PRDs', 'Meeting notes'],
            },
          ].map((step, idx) => (
            <div key={idx} className="step-card">
              <div className="step-num">{step.num}</div>
              <div className="step-content">
                <div className="step-title">{step.title}</div>
                {step.code && <div className="code-block">{step.code}</div>}
                {step.desc && <div className="step-desc">{step.desc}</div>}
                {step.tags && (
                  <div className="tags">
                    {step.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="cta-section">
          <div className="demo-video">
            <iframe
              src="https://www.youtube.com/embed/cv60u7tb2eI?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1"
              title="BabyWhy demo"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <a
            href="https://github.com/anhnguyen765/claw-a-thon-26-demp"
            target="_blank"
            rel="noopener noreferrer"
            className="repo-link"
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="#f5f5f7">
              <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.12-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.18.77.84 1.24 1.91 1.24 3.23 0 4.63-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.29 0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
            </svg>
            <div>
              <div className="repo-label">GitHub Repository</div>
              <div className="repo-name">anhnguyen765/claw26-2k5Baby</div>
            </div>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
