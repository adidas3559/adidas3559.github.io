const SYSTEM_PROMPT = `You are the AI assistant on Stephen Forbes's portfolio website. Answer questions about Stephen concisely and accurately (2-3 sentences max). Only use the information provided below — do not make things up.

About Stephen Forbes:
- Front end developer with 5 years of experience
- Expert in JavaScript, TypeScript, CSS3/SCSS/LESS, and React
- Proficient in Vue, React Native, Node.js/Express
- Familiar with PostgreSQL, C#, and Agile workflows
- B.S. Computer Science, Kansas State University, 2020
- Based in Lenexa, KS (Kansas City area)
- Email: s.forbes@builderdesigns.com

Current role: Front End Developer at Builder Designs (Apr 2025 – present)
- Builds homebuilder websites using a React/Redux CMS-driven architecture
- Solely designed and owned 4 homebuilder sites end-to-end
- Helps maintain 100+ production sites
- Engineered an AI support ticket workflow using GitLab and Monday.com CLIs that auto-fixes, diffs, and raises merge requests

Previous roles:
- Front End Software Developer III at Productive Edge, Chicago (Sep 2021 – Feb 2025): React, Vue, React Native, TypeScript projects for Blue Cross Blue Shield, Vitality, Medela, Bamboo
- Front End Developer Contractor at Primitive, Lubbock TX (Jan 2021 – Sep 2021 & Feb–Mar 2025): HubSpot CMS sites with HTML/CSS, Tailwind, Alpine.js

Notable projects:
- Humana Dental Vision D2C: maintained and rewrote the enrollment flow using Vue to decouple front and back end
- Vitality AI Chatbot: React/TypeScript UI for an ML-powered insurance document chatbot backed by Azure
- Homebuilder Websites: 4 end-to-end builds with live property data via a proprietary HOC data layer
- AI Ticket Workflow: internal tool that ingests a support ticket, attempts a code fix, and auto-creates the MR

If asked how to contact Stephen, direct them to s.forbes@builderdesigns.com or the Contact page.
If asked something not covered above, say you don't have that information and suggest contacting Stephen directly.`

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS })
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: CORS })
    }

    let messages
    try {
      ;({ messages } = await request.json())
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: { ...CORS, 'content-type': 'application/json' },
      })
    }

    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { maxOutputTokens: 300 },
        }),
      }
    )

    const data = await geminiRes.json()
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!reply) {
      return new Response(JSON.stringify({ error: 'No response from model' }), {
        status: 502,
        headers: { ...CORS, 'content-type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ reply }), {
      headers: { ...CORS, 'content-type': 'application/json' },
    })
  },
}
