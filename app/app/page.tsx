'use client'

import { useState, useRef, useEffect } from 'react'
import './app.css'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function CoachingApp() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content:
        'Hello! I\'m BabyWhy, your AI Decision Clarity Coach. I\'m here to help you navigate complex product decisions with clarity and confidence. What decision or challenge are you thinking about today?',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [reflectionPhase, setReflectionPhase] = useState<
    'challenge' | 'emotion' | 'socratic' | 'mapping' | 'alignment' | 'action' | 'journal'
  >('challenge')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // Simulate AI response with different coaching styles
    setTimeout(() => {
      let assistantContent = ''

      if (reflectionPhase === 'challenge') {
        assistantContent = `Thank you for sharing that. I'm sensing some tension in your challenge. Before we dive deeper, let me ask: **What emotion are you feeling most strongly about this situation?** Is it frustration, anxiety, uncertainty, or something else? Understanding your emotional state will help us navigate this decision more clearly.`
        setReflectionPhase('emotion')
      } else if (reflectionPhase === 'emotion') {
        assistantContent = `I appreciate that clarity. Now, let's challenge some assumptions. Here are some Socratic questions to help us dig deeper:\n\n1. What evidence do you have that supports your current thinking?\n2. What evidence might contradict it?\n3. What would someone who disagrees with you say?\n4. What are you assuming to be true that might not actually be?\n\nTake your time answering these—they often reveal our blind spots.`
        setReflectionPhase('socratic')
      } else if (reflectionPhase === 'socratic') {
        assistantContent = `Excellent. Now let's map the stakeholders. Behind every product decision are people with different incentives.\n\n**Who are the key stakeholders** in this decision? For each one, consider:\n- What do they want?\n- What are they afraid of?\n- How would they describe this situation?\n- What constraints are they optimizing for?\n\nThis helps us move beyond conflict toward mutual understanding.`
        setReflectionPhase('mapping')
      } else if (reflectionPhase === 'mapping') {
        assistantContent = `Great stakeholder analysis. Now let's reconnect your decision to **product outcomes and customer value**.\n\n- How does this decision impact your customers?\n- How does it align with your product vision?\n- What business outcomes are you optimizing for?\n- What are you willing to sacrifice, and what are you not?\n\nKeeping decisions tied to customer outcomes prevents local optimization from becoming strategic debt.`
        setReflectionPhase('alignment')
      } else if (reflectionPhase === 'alignment') {
        assistantContent = `Perfect. Now that we've gained clarity, let's **design your action**.\n\nBased on our conversation, what is ONE clear decision or next step you feel confident making? Not the perfect decision—the clarifying decision that moves you forward.\n\nHow will you communicate this decision? Who needs to understand the reasoning?`
        setReflectionPhase('action')
      } else {
        assistantContent = `Excellent work. I'm saving this reflection to your Decision Journal so you can see patterns over time—what kinds of decisions drain your energy, where you find clarity fastest, and how your decision-making evolves.\n\n**Your reflection summary:**\n- **Challenge:** What you brought up\n- **Clarity gained:** What became clear through our conversation\n- **Decision made:** Your next step\n- **Pattern:** How this connects to your broader product leadership journey\n\nWhat's your next challenge or decision?`
        setReflectionPhase('challenge')
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: assistantContent,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setLoading(false)
    }, 800)
  }

  const phaseColors: Record<string, string> = {
    challenge: '#64D2FF',
    emotion: '#FF6961',
    socratic: '#BF5AF2',
    mapping: '#FF9F0A',
    alignment: '#5CE08A',
    action: '#0A84FF',
    journal: '#64D2FF',
  }

  const phaseLabels: Record<string, string> = {
    challenge: '1. User Challenge',
    emotion: '2. Emotional Analysis',
    socratic: '3. Socratic Questioning',
    mapping: '4. Stakeholder Mapping',
    alignment: '5. Product Vision Alignment',
    action: '6. Action Design',
    journal: '7. Decision Journal',
  }

  return (
    <main className="coaching-app">
      <header className="app-header">
        <div className="app-title">
          <div className="app-logo">BW</div>
          <div>
            <h1>BabyWhy</h1>
            <p>AI Decision Clarity Coach</p>
          </div>
        </div>
        <div className="phase-indicator">
          <div className="phase-label">Reflection Phase</div>
          <div className="phase-name" style={{ color: phaseColors[reflectionPhase] }}>
            {phaseLabels[reflectionPhase]}
          </div>
        </div>
      </header>

      <div className="chat-container">
        <div className="messages-list">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.type}`}>
              <div className="message-content">
                <div className="message-text">{msg.content}</div>
                <div className="message-time">
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="message assistant">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <footer className="app-footer">
        <form onSubmit={handleSendMessage} className="input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Share what's on your mind..."
            disabled={loading}
            className="message-input"
          />
          <button type="submit" disabled={loading || !input.trim()} className="send-button">
            {loading ? 'Thinking...' : 'Send'}
          </button>
        </form>
        <div className="footer-note">
          BabyWhy uses Socratic questioning to help you think clearer, not just faster.
        </div>
      </footer>
    </main>
  )
}
