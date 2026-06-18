# BabyWhy - AI Decision Clarity Coach

An AI-powered coaching platform that helps Product Owners navigate complex decisions through Socratic questioning and structured reflection.

## What is BabyWhy?

BabyWhy is built for Product Owners drowning in stakeholder conflicts, decision fatigue, and organizational chaos. Instead of helping you do more, BabyWhy helps you **think clearer**.

### The Seven-Stage Reflection Flow

1. **User Challenge** — Share what's weighing on your mind
2. **Emotional Analysis** — Understand the emotions driving your perspective
3. **Socratic Questioning** — Challenge assumptions and explore blind spots
4. **Stakeholder Mapping** — Map goals, fears, and incentives of key players
5. **Product Vision Alignment** — Reconnect decisions to customer value and outcomes
6. **Action Design** — Design your next clear, confident step
7. **Decision Journal** — Track patterns in your decision-making over time

## Features

- 🤖 **Multi-Agent AI System** — Five specialized coaching agents working together
- 🧠 **Socratic Questioning** — AI that challenges assumptions rather than validating emotions
- 📊 **Stakeholder Analysis** — Map organizational incentives automatically
- 🎯 **Outcome Alignment** — Keep decisions tied to customer value
- 📓 **Decision Journal** — Track patterns and growth in your decision-making
- 🔗 **Integration Ready** — Connect to Jira, Confluence, Slack, Notion, Linear

## Tech Stack

- **Framework:** Next.js 15 with TypeScript
- **Styling:** CSS3 with animations
- **AI:** Claude API for Socratic coaching
- **State:** React hooks + Zustand ready
- **Deployment:** Vercel ready

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/anhnguyen765/claw-a-thon-26-demp.git
cd claw-a-thon-26-demp

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local
```

### Running Locally

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

## Project Structure

```
claw-a-thon-26-demp/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Presentation deck (home page)
│   ├── home.css             # Presentation styles
│   ├── globals.css          # Global styles
│   └── app/
│       ├── page.tsx         # Coaching interface
│       └── app.css          # Coaching styles
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## Pages

### Presentation Deck (`/`)
An interactive 11-slide presentation introducing BabyWhy:
- The problem (Product Owner burnout)
- Root causes (conflicting priorities, decision fatigue)
- How existing AI tools fail
- BabyWhy's Socratic approach
- Multi-agent architecture
- Integration capabilities
- Vision for the future of Product Leadership

**Navigation:**
- Arrow keys: Previous/Next slide
- Click indicators: Jump to slide
- Play button: Auto-advance slides

### Coaching Interface (`/app`)
Live AI coaching session with:
- Real-time conversation
- Phase-based reflection
- Emotional analysis
- Stakeholder mapping
- Action design
- Decision journaling

## AI Agents

BabyWhy uses five specialized agents:

1. **Reflection Agent** — Detects emotions hidden in work situations
2. **Socratic Coach** — Challenges assumptions and explores blind spots
3. **Stakeholder Analyst** — Maps goals, fears, and incentives
4. **Product Alignment Agent** — Ties decisions to customer value and outcomes
5. **Decision Historian** — Tracks patterns and burnout signals over time

## Deployment

### Deploy to Vercel

```bash
# Push to GitHub (if not already done)
git push origin main

# Deploy via Vercel CLI
npx vercel

# Or connect GitHub repo to Vercel dashboard
# https://vercel.com/new
```

### Environment Variables

Required for AI coaching:
```
ANTHROPIC_API_KEY=your_api_key_here
```

Optional for integrations:
```
JIRA_API_TOKEN=...
SLACK_BOT_TOKEN=...
NOTION_API_KEY=...
```

## Usage Example

1. **Start a session** — Go to `/app` and share your decision challenge
2. **Emotional clarity** — BabyWhy helps you name and understand what you're feeling
3. **Socratic exploration** — Answer questions that reveal hidden assumptions
4. **Stakeholder context** — Map who wants what and why
5. **Decision clarity** — Connect back to customer outcomes
6. **Action design** — Define your next step with confidence
7. **Journal reflection** — Review the pattern of how you've made decisions

## Building on BabyWhy

### Add API Integration

```typescript
// lib/agents/reflection-agent.ts
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function reflectOnChallenge(challenge: string) {
  const response = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `As a Reflection Agent, analyze the emotions in this challenge: ${challenge}`,
      },
    ],
  })
  return response
}
```

### Add Stakeholder Integration

```typescript
// lib/integrations/jira.ts
export async function getStakeholdersFromJira(projectId: string) {
  // Connect to Jira API to extract stakeholder info
  // Map to BabyWhy's stakeholder model
}
```

### Extend Decision Journal

```typescript
// lib/journal/decision-historian.ts
export interface DecisionEntry {
  id: string
  challenge: string
  emotion: string
  stakeholders: Stakeholder[]
  decision: string
  outcome?: string
  reflection?: string
  createdAt: Date
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Authors

- **anhnhm3** (Product Lead)
- **Team 2k5Baby**

Presented at Claw-a-thon 26

## License

MIT

## Support

For questions or feedback:
- 📧 Email: anhnhm3@vng.com.vn
- 🐙 GitHub: [@anhnguyen765](https://github.com/anhnguyen765)
