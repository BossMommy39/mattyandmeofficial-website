// Part 1: Magic Words, Utilities, and Intake Setup

import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';

// Magic Words (sample for brevity—expand as needed)
const MAGIC_WORDS = [
  {
    id: "homework_battle",
    name: "Homework battle",
    description: "Resistance, procrastination, meltdowns around schoolwork",
    evidenceBase: "Executive function research, occupational therapy approaches",
    keyPrinciples: [
      "Break tasks into smaller steps",
      "Address sensory needs",
      "Use movement breaks"
    ],
    avoidStrategies: [
      "Punishment for incomplete work",
      "Comparing to other students"
    ],
    keywords: ["homework", "schoolwork", "avoidance"]
  },
  {
    id: "meltdown_mode",
    name: "Meltdown mode",
    description: "Big emotions, overwhelm, crisis response needed",
    evidenceBase: "Trauma-informed care, co-regulation research",
    keyPrinciples: [
      "Stay calm yourself",
      "Validate emotions",
      "Provide safety"
    ],
    avoidStrategies: [
      "Trying to reason during meltdown",
      "Dismissing emotions"
    ],
    keywords: ["meltdown", "crisis", "overwhelm"]
  },
  // ...add more or allow custom user scenario below
];

// Quick lookup by name for custom scenario mapping
const findClosestMagicWord = (input) => {
  const lower = input.toLowerCase();
  // Search for match in keywords, fallback to first if nothing close
  return (
    MAGIC_WORDS.find(
      (w) =>
        w.keywords.some((k) => lower.includes(k)) ||
        lower.includes(w.name.toLowerCase())
    ) || MAGIC_WORDS[0]
  );
};

// Intake: minimal, but expandable
const DEFAULT_FAMILY = {
  name: "",
  challenge: "",
  customScenario: "",
  members: [],
  motto: "",
  vibe: "",
  values: [],
  ages: [],
  // advanced fields not required for preview
};

const PERSONALITY_TRAITS = [
  "Creative", "Logical", "High energy", "Steady", "Social", "Quiet",
  "Rule follower", "Rule breaker", "Imaginative", "Detail-oriented"
];

const VALUES = [
  "Kindness", "Effort over perfection", "Creativity", "Teamwork", "Structure"
];

const VIBES = [
  { emoji: "🎯", label: "Structured" },
  { emoji: "🌊", label: "Flexible" },
  { emoji: "🎪", label: "Organized chaos" },
  { emoji: "🔥", label: "Survival mode" }
];

// Progressive intake: just family name & a challenge needed for instant preview.
// Part 2: Prompt Generation Functions

// Compressed version (default)
function generateMagicWordPrompt(family, magicWord, full = false) {
  const member = family.members[0];
  const youngest = member ? member.age : null;
  const challenge = family.customScenario || family.challenge || magicWord?.name;

  let prompt = `FAMILY: The ${family.name}
CHALLENGE: ${challenge}
${member ? `MEMBER: ${member.name} (${member.age}, ${member.personality?.join(", ")})` : ""}
${family.motto ? `MOTTO: "${family.motto}"` : ""}
VALUES: ${family.values.join(", ")}
VIBE: ${family.vibe}
KEYS: ${magicWord.keyPrinciples.join("; ")}
AVOID: ${magicWord.avoidStrategies.join("; ")}
${youngest ? `Keep advice appropriate for age ${youngest}+.` : ""}
REMEMBER: Not medical or safety advice.`;

  if (!full) return prompt;

  // Expanded (full) version
  prompt += `

EVIDENCE BASE: ${magicWord.evidenceBase}
When responding, always:
- Match the family's "${family.vibe}" energy and values.
- Suggest 2-3 actionable, research-backed strategies.
- Explicitly avoid listed approaches.
- Never offer medical/safety/diagnosis advice (redirect to a professional).

Respond to: [Parent describes specific "${challenge}" scenario here]`;

  return prompt;
}
// Part 3: Main Component - Progressive Intake, Demo, and Unlock

export default function MattyIRLRebuilt() {
  const [family, setFamily] = useState({ ...DEFAULT_FAMILY });
  const [currentMember, setCurrentMember] = useState({ name: "", age: "", personality: [] });
  const [showDemo, setShowDemo] = useState(false);
  const [fullMode, setFullMode] = useState(false);
  const [email, setEmail] = useState("");
  const [showPaywall, setShowPaywall] = useState(false);

  // Minimal "magic moment" is family name + challenge or scenario
  const readyForDemo = family.name && (family.challenge || family.customScenario);

  // Live demo preview
  const magicWord = family.customScenario
    ? findClosestMagicWord(family.customScenario)
    : MAGIC_WORDS.find((w) => w.id === family.challenge) || MAGIC_WORDS[0];
  const demoPrompt = generateMagicWordPrompt(family, magicWord, fullMode);

  // Add member to family
  const addMember = () => {
    if (currentMember.name && currentMember.age) {
      setFamily((f) => ({ ...f, members: [...f.members, currentMember] }));
      setCurrentMember({ name: "", age: "", personality: [] });
    }
  };

  // Editable intake, progressive: unlock more after minimal data
  return (
    <>
      <Head>
        <title>Matty IRL Magic Word Rebuild</title>
        <meta name="description" content="Progressive, research-based AI for families" />
      </Head>
      <div className="min-h-screen bg-white p-6 max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold text-[#826753] mb-8">Matty IRL Magic Word Generator</h1>

        {/* Minimal Intake for Instant Demo */}
        <div className="bg-gray-50 p-6 rounded-lg shadow mb-6">
          <label className="block font-semibold mb-2">Family Name *</label>
          <input
            value={family.name}
            onChange={e => setFamily(f => ({ ...f, name: e.target.value }))}
            className="w-full p-2 border rounded mb-4"
            placeholder="The Johnsons, Team Chaos, etc."
          />

          <label className="block font-semibold mb-2">Describe a challenge *</label>
          <input
            value={family.customScenario}
            onChange={e => setFamily(f => ({ ...f, customScenario: e.target.value }))}
            className="w-full p-2 border rounded mb-4"
            placeholder="e.g., homework meltdowns, morning chaos, sibling fights"
          />

          <button
            disabled={!readyForDemo}
            onClick={() => setShowDemo(true)}
            className={`px-6 py-2 rounded text-white font-semibold ${
              readyForDemo ? "bg-[#214179] hover:bg-[#826753]" : "bg-gray-400"
            }`}
          >
            See My Magic Word Prompt
          </button>
        </div>

        {/* Progressive: Add more for a richer prompt */}
        <div className="bg-blue-50 p-4 rounded mb-6">
          <div className="font-semibold mb-2">Add more details for supercharged prompts (optional)</div>

          {/* Member intake */}
          <div className="flex flex-col md:flex-row gap-3 mb-2">
            <input
              value={currentMember.name}
              onChange={e => setCurrentMember(m => ({ ...m, name: e.target.value }))}
              className="p-2 border rounded"
              placeholder="Member name"
            />
            <input
              value={currentMember.age}
              onChange={e => setCurrentMember(m => ({ ...m, age: e.target.value }))}
              className="p-2 border rounded"
              placeholder="Age"
            />
            <select
              value={currentMember.personality[0] || ""}
              onChange={e => setCurrentMember(m => ({ ...m, personality: [e.target.value] }))}
              className="p-2 border rounded"
            >
              <option value="">Personality...</option>
              {PERSONALITY_TRAITS.map(trait => (
                <option key={trait}>{trait}</option>
              ))}
            </select>
            <button
              onClick={addMember}
              className="bg-green-600 text-white px-3 py-1 rounded"
              disabled={!currentMember.name || !currentMember.age}
            >
              Add
            </button>
          </div>
          <div className="flex gap-2 flex-wrap mb-2">
            {family.members.map((m, i) => (
              <span key={i} className="bg-white border px-2 py-1 rounded">{m.name} ({m.age}, {m.personality[0]})</span>
            ))}
          </div>

          {/* Motto, vibe, values */}
          <input
            value={family.motto}
            onChange={e => setFamily(f => ({ ...f, motto: e.target.value }))}
            className="w-full p-2 border rounded mb-2"
            placeholder="Family motto/inside joke (optional)"
          />
          <div className="flex gap-2 mb-2">
            {VIBES.map(v => (
              <button
                key={v.label}
                className={`px-3 py-1 rounded border ${
                  family.vibe === v.label ? "bg-[#214179] text-white" : ""
                }`}
                onClick={() => setFamily(f => ({ ...f, vibe: v.label }))}
              >
                {v.emoji} {v.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap mb-2">
            {VALUES.map(val => (
              <button
                key={val}
                className={`px-2 py-1 border rounded text-sm ${
                  family.values.includes(val) ? "bg-purple-100 border-purple-500" : ""
                }`}
                onClick={() =>
                  setFamily(f =>
                    f.values.includes(val)
                      ? { ...f, values: f.values.filter(v => v !== val) }
                      : { ...f, values: [...f.values, val].slice(-3) }
                  )
                }
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        {/* Demo Modal */}
        {showDemo && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative">
              <button
                className="absolute right-3 top-3 text-xl"
                onClick={() => setShowDemo(false)}
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-4">Your Magic Word Prompt</h2>
              <label className="block font-semibold mb-2">
                Copy this prompt and paste into ChatGPT or Claude:
              </label>
              <textarea
                readOnly
                value={demoPrompt}
                className="w-full h-48 border rounded p-2 font-mono bg-gray-50 mb-2"
              />
              <div className="flex gap-2 mb-2">
                <button
                  onClick={() => setFullMode(f => !f)}
                  className="px-4 py-2 rounded bg-gray-200"
                >
                  {fullMode ? "Show Short Version" : "Show Full Version"}
                </button>
                <button
                  className="px-4 py-2 rounded bg-[#214179] text-white"
                  onClick={() => navigator.clipboard.writeText(demoPrompt)}
                >
                  Copy Prompt
                </button>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Want all 15 Magic Words personalized?{" "}
                <button
                  className="text-[#214179] underline"
                  onClick={() => {
                    setShowPaywall(true);
                    setShowDemo(false);
                  }}
                >
                  Unlock Full System
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Paywall/Upgrade Modal */}
        {showPaywall && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20 p-4">
            <div className="bg-white rounded-lg max-w-lg w-full p-6 relative">
              <button
                className="absolute right-3 top-3 text-xl"
                onClick={() => setShowPaywall(false)}
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-3">Unlock All Magic Words</h2>
              <p className="mb-3">Get your full set of 15 research-based, family-personalized prompts. $20 – instant delivery by email.</p>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-2 border rounded mb-3"
              />
              <button
                disabled={!email}
                className="w-full py-3 bg-[#214179] text-white rounded font-bold"
                onClick={() => {
                  // TODO: Integrate PayPal/Stripe, send full set by email
                  alert("Purchase flow goes here. (Connect PayPal, then send full prompts by email.)");
                }}
              >
                Buy Now
              </button>
              <div className="mt-2 text-xs text-gray-500 text-center">
                30-day guarantee • Privacy-first • Evidence-based
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
