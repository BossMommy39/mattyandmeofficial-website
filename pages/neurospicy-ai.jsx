import { useState, useEffect, useCallback } from 'react';       
import Head from 'next/head';  

// Magic Words System - moved from separate file
const MAGIC_WORDS = [
  {
    id: "homework_battle",
    name: "Homework battle",
    category: "Daily Operations",
    description: "Resistance, procrastination, meltdowns around schoolwork",
    evidenceBase: "Executive function research, occupational therapy approaches",
    keyPrinciples: ["break tasks into smaller steps", "address sensory needs", "reduce perfectionism pressure", "use movement breaks"],
    avoidStrategies: ["punishment for incomplete work", "comparing to other students", "forcing extended focus periods"]
  },
  {
    id: "bedtime_chaos", 
    name: "Bedtime chaos",
    category: "Daily Operations",
    description: "Stalling, fears, overstimulation at sleep time",
    evidenceBase: "Sleep hygiene research, sensory processing approaches",
    keyPrinciples: ["consistent routine", "sensory regulation", "address underlying anxieties", "gradual transitions"],
    avoidStrategies: ["strict bedtime enforcement without flexibility", "dismissing fears", "overstimulating bedtime activities"]
  },
  {
    id: "morning_rush",
    name: "Morning rush", 
    category: "Daily Operations",
    description: "Getting ready, transitions, time pressure",
    evidenceBase: "Executive function research, routine optimization studies",
    keyPrinciples: ["visual schedules", "preparation the night before", "build in buffer time", "reduce decision fatigue"],
    avoidStrategies: ["rushing without support", "multiple demands at once", "criticism during stressful transitions"]
  },
  {
    id: "meal_negotiation",
    name: "Meal negotiation",
    category: "Daily Operations", 
    description: "Picky eating, food battles, sensory issues",
    evidenceBase: "Feeding therapy research, sensory processing approaches",
    keyPrinciples: ["no pressure approach", "safe foods available", "food exploration without eating pressure", "family-style serving"],
    avoidStrategies: ["forcing bites", "bribing with dessert", "making separate meals for everyone", "mealtime battles"]
  },
  {
    id: "screen_time_war",
    name: "Screen time war",
    category: "Daily Operations",
    description: "Transitions off devices, time limits, negotiation",
    evidenceBase: "Digital wellness research, transition support strategies",
    keyPrinciples: ["advance warnings", "visual timers", "engaging alternatives ready", "co-regulation during transitions"],
    avoidStrategies: ["sudden device removal", "guilt about screen time", "battles without alternatives", "inconsistent limits"]
  },
  // Add the other 10 magic words here...
  {
    id: "meltdown_mode",
    name: "Meltdown mode", 
    category: "Emotional Regulation",
    description: "Big emotions, overwhelm, crisis response needed",
    evidenceBase: "Trauma-informed care, co-regulation research",
    keyPrinciples: ["stay calm yourself", "validate emotions", "reduce demands", "provide safety", "connection before correction"],
    avoidStrategies: ["trying to reason during meltdown", "consequences during crisis", "dismissing emotions", "escalating energy"]
  }
  // ... (I'll add the rest in the next update to keep this manageable)
];

// Magic Word Generator Function
function generateMagicWordPrompt(magicWord, familyData) {
  const youngest = familyData.ages.length > 0 ? 
    Math.min(...familyData.ages.map(a => parseInt(a.split('-')[0]))) : 8;
  
  let prompt = `=== RESEARCH-INFORMED FAMILY RESPONSE SYSTEM ===
You are an AI assistant providing research-informed responses for the ${familyData.name} family.

IMPORTANT DISCLAIMER: This response draws from established research and evidence-based practices, but should not replace professional consultation for serious concerns. Always consult qualified professionals when needed.

FAMILY PROFILE:
• Name: ${familyData.name}
• Family style: ${familyData.vibe}
• Family motto: "${familyData.motto || 'Family first, progress over perfection'}"
• Ages in household: ${familyData.ages.join(', ')}
• Current focus areas: ${familyData.challenges.join(', ')}
• Core family values: ${familyData.values.join(', ')}

FAMILY MEMBERS:`;

  familyData.members.forEach(member => {
    prompt += `\n• ${member.name} (${member.age}, ${member.role}): ${member.personality.join(', ')}`;
    if (member.superpower) prompt += ` | Strength: ${member.superpower}`;
    prompt += `\n  Preferred communication: ${member.comm}`;
    if (member.challenge) prompt += `\n  Current challenge: ${member.challenge}`;
  });

  prompt += `\n\n=== SITUATION: "${magicWord.name.toUpperCase()}" ===
Context: ${magicWord.description}

EVIDENCE BASE: This response draws from ${magicWord.evidenceBase}

KEY RESEARCH-INFORMED PRINCIPLES:
${magicWord.keyPrinciples.map(principle => `• ${principle}`).join('\n')}

APPROACHES TO AVOID (based on research):
${magicWord.avoidStrategies.map(avoid => `• ${avoid}`).join('\n')}

=== YOUR RESPONSE FRAMEWORK ===
• Match this family's "${familyData.vibe}" approach
• Keep suggestions appropriate for age ${youngest}+
• Honor their stated values: ${familyData.values.join(', ')}
• Consider each family member's communication preferences
• Provide 2-3 specific, actionable strategies
• Acknowledge that every family is different

RESPOND TO: [Parent describes their specific "${magicWord.name}" situation]

Remember: You're providing research-informed suggestions tailored to this family's style and values, not professional therapy or medical advice.`;

  return prompt;
}

// Original component constants
const VIBES = [
  { emoji: "🎯", label: "Structured & scheduled", desc: "We have systems" },
  { emoji: "🌊", label: "Go-with-the-flow", desc: "We adapt as needed" },
  { emoji: "🎪", label: "Organized chaos", desc: "Plans meet reality" },
  { emoji: "🔥", label: "Survival mode", desc: "Keeping everyone alive" },
];

const PERSONALITY_TRAITS = [
  "Creative type", "Logical thinker", "High energy", "Steady & calm",
  "Social butterfly", "Quiet observer", "Rule follower", "Rule questioner",
  "Loves attention", "Deep thinker", "Always moving", "Bookworm"
];

const COMMUNICATION_STYLES = [
  "Keep it gentle and patient", "Just give me the facts", "Make it fun and playful",
  "Offer choices and options", "Explain the why behind things", "Keep it brief, they're busy"
];

const CHALLENGES = [
  { icon: "📚", label: "Homework resistance" },
  { icon: "😴", label: "Bedtime chaos" },
  { icon: "💥", label: "Meltdowns/big emotions" },
  { icon: "👫", label: "Sibling conflicts" },
  { icon: "📱", label: "Screen time wars" },
  { icon: "🧹", label: "Chore avoidance" },
  { icon: "🤝", label: "Social struggles" },
  { icon: "🧠", label: "Focus/organization" },
];

const VALUES = [
  "Kindness above all", "Effort over perfection", "Creativity & imagination", "Family teamwork",
  "Independence & self-reliance", "Humor fixes everything", "Structure & consistency", "Individual expression"
];

export default function ProductPage() {
  const [family, setFamily] = useState({
    name: "",
    motto: "",
    ages: [],
    vibe: "",
    members: [],
    values: [],
    challenges: [],
    boundaries: [],
    customBoundary: "",
  });

  const [currentMember, setCurrentMember] = useState({ 
    name: "", age: "", role: "Kid", personality: [], superpower: "", comm: "", challenge: "" 
  });
  const [adding, setAdding] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  
  // NEW: Magic Word states
  const [email, setEmail] = useState("");
  const [emailCollected, setEmailCollected] = useState(false);
  const [showMagicWordDemo, setShowMagicWordDemo] = useState(false);
  const [demoMagicWord, setDemoMagicWord] = useState("");

  // Auto-save functionality
  useEffect(() => {
    const saved = localStorage.getItem('matty-irl-intake');
    if (saved) {
      try {
        setFamily(JSON.parse(saved));
      } catch (e) {
        console.warn('Could not load saved data');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('matty-irl-intake', JSON.stringify(family));
  }, [family]);

  const updateFamily = useCallback((field, value) => {
    setFamily((f) => ({ ...f, [field]: value }));
  }, []);

  const addMember = useCallback(() => {
    if (!currentMember.name || !currentMember.age || !currentMember.comm) return;
    updateFamily("members", [...family.members, currentMember]);
    setCurrentMember({ name: "", age: "", role: "Kid", personality: [], superpower: "", comm: "", challenge: "" });
    setAdding(false);
  }, [currentMember, family.members, updateFamily]);

  const removeMember = useCallback((index) => {
    updateFamily("members", family.members.filter((_, i) => i !== index));
  }, [family.members, updateFamily]);

  const getYoungestAge = useCallback(() => {
    if (!family.ages.length) return null;
    const ageRanges = family.ages.map(a => parseInt(a.split('-')[0]));
    return Math.min(...ageRanges);
  }, [family.ages]);

  const getCompletionPercentage = useCallback(() => {
    const required = ['name', 'vibe', 'challenges', 'values'];
    const completed = required.filter(field => {
      const value = family[field];
      return Array.isArray(value) ? value.length > 0 : Boolean(value);
    }).length;
    const memberPoints = family.members.length > 0 ? 1 : 0;
    return Math.round(((completed + memberPoints) / (required.length + 1)) * 100);
  }, [family]);

  const isValid = useCallback(() => {
    return family.name && family.vibe && family.members.length > 0 && family.challenges.length > 0;
  }, [family]);

  const buildScript = useCallback(() => {
    if (!isValid()) {
      return "Complete the required fields to see your family AI script...";
    }

    const youngest = getYoungestAge();
    let script = `FAMILY: The ${family.name} - ${family.vibe}\n`;
    
    if (family.motto) script += `MOTTO: "${family.motto}"\n`;
    if (youngest) script += `SAFETY: Keep content appropriate for age ${youngest}+\n`;
    script += `\nMEMBERS:\n`;
    
    family.members.forEach((m) => {
      script += `${m.name} (${m.age}, ${m.role}): ${m.personality.join(", ")}`;
      if (m.superpower) script += ` | Superpower: ${m.superpower}`;
      script += `\n  Communication: ${m.comm}\n`;
      if (m.challenge) script += `  Current challenge: ${m.challenge}\n`;
    });

    script += `\nCURRENT FOCUS: Help with ${family.challenges.join(", ")}\n`;
    script += `\nFAMILY VALUES: ${family.values.join(", ")}\n`;
    script += "\nNEVER DO:\n";
    script += "- Compare siblings to each other\n";
    script += "- Give medical or safety advice\n";
    script += "- Always check with parents before suggesting activities\n";
    script += "- Keep responses appropriate for youngest family member\n";

    script += "\nINTERACTION STYLE:\n";
    script += `- Match this family's ${family.vibe} energy\n`;
    if (family.motto) script += `- Use their sense of humor: "${family.motto}"\n`;
    family.members.forEach((m) => {
      script += `- ${m.name}: ${m.personality.join(", ")} | ${m.comm}\n`;
    });

    return script;
  }, [family, isValid, getYoungestAge]);

  // NEW: Generate demo magic word
  const generateDemoMagicWord = useCallback(() => {
    if (!isValid()) return "Complete your family profile to see the magic word demo...";
    
    const homeworkWord = MAGIC_WORDS.find(w => w.id === "homework_battle");
    return generateMagicWordPrompt(homeworkWord, family);
  }, [family, isValid]);

  const copyScript = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(buildScript());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = buildScript();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  }, [buildScript]);

  // NEW: Copy magic word demo
  const copyMagicWord = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(demoMagicWord);
      // Could add separate state for magic word copied status
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = demoMagicWord;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  }, [demoMagicWord]);

  // NEW: Handle email collection and webhook
  const handleEmailSubmit = useCallback(async () => {
    if (email && isValid()) {
      try {
        // Send to Zapier webhook
        await fetch('https://hooks.zapier.com/hooks/catch/23096761/2jkcn6g/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            family_name: family.name,
            timestamp: new Date().toISOString(),
            family_script: buildScript(),
            family_data: JSON.stringify(family)
          })
        });
        
        setEmailCollected(true);
        console.log('Email sent to Zapier successfully');
      } catch (error) {
        console.error('Error sending to Zapier:', error);
        // Still allow them to copy the script even if webhook fails
        setEmailCollected(true);
      }
    }
  }, [email, family, isValid, buildScript]);

  // NEW: Handle PayPal button rendering
  const renderPayPalButton = useCallback((containerId) => {
    // Wait for PayPal SDK to load
    if (typeof window !== 'undefined' && window.paypal) {
      window.paypal.HostedButtons({
        hostedButtonId: "7GJ7VPHQRQA26",
      }).render(`#${containerId}`);
    }
  }, []);

  // Render PayPal button when pricing modal opens
  useEffect(() => {
    if (showPricing && typeof window !== 'undefined' && window.paypal) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        renderPayPalButton('paypal-container-basic');
        renderPayPalButton('paypal-container-premium');
      }, 100);
    }
  }, [showPricing, renderPayPalButton]);

  const completion = getCompletionPercentage();

  return (
    <>
      <Head>
        <title>MattyIRL Family AI System - Evidence-Based Protocols</title>
        <meta name="description" content="Clinically-validated family AI protocols. Transform ChatGPT into a family-aware assistant with evidence-based setup by healthcare professionals." />
        <script src="https://www.paypal.com/sdk/js?client-id=BAA2JOb3DyIGnXMD1ohWNhAvgM2eUkSZLi8b1AZ2BuzaW0jzFr6riJ7Ex6Fj2RmsL_wzXzLt6lob4H1vYk&components=hosted-buttons&enable-funding=venmo&currency=USD"></script>
      </Head>

      <div className="min-h-screen bg-white">
        {/* Back Button - Enhanced Visibility */}
        <div className="bg-[#f5f1eb] px-6 py-4 border-b border-[#d2c2b2]">
          <div className="max-w-6xl mx-auto">
            <a 
              href="/"
              className="inline-flex items-center gap-2 text-[#214179] hover:text-[#826753] transition-colors font-medium text-lg"
            >
              <span className="text-xl">←</span> Back to Home
            </a>
          </div>
        </div>
        
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#f5f1eb] to-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-[#826753] mb-6">
                MattyIRL Family AI System
              </h1>
              <p className="text-2xl text-[#826753] mb-4">
                Evidence-based protocols for family AI integration
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Developed by healthcare professionals with academic and research experience • Real family testing since 2024
              </p>
              
              {/* Progress Indicator */}
              <div className="max-w-md mx-auto">
                <div className="bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className="bg-[#214179] h-3 rounded-full transition-all duration-300"
                    style={{ width: `${completion}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">Setup Progress: {completion}%</p>
              </div>
            </div>

            {/* Before/After Comparison */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/70 rounded-lg p-6 border-l-4 border-red-400">
                <h3 className="text-xl font-semibold text-[#214179] mb-4">❌ Generic ChatGPT:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Same response for 8-year-old and adult</li>
                  <li>• No family context or personality awareness</li>
                  <li>• Requires constant re-explanation</li>
                  <li>• One-size-fits-all parenting advice</li>
                  <li>• No crisis management protocols</li>
                </ul>
              </div>
              <div className="bg-white/70 rounded-lg p-6 border-l-4 border-green-500">
                <h3 className="text-xl font-semibold text-[#214179] mb-4">✅ MattyIRL System:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Adapts automatically to each family member</li>
                  <li>• Remembers personalities, challenges, strengths</li>
                  <li>• Age-appropriate responses without setup</li>
                  <li>• Personalized advice based on family values</li>
                  <li>• Built-in safety protocols and boundaries</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* NEW: Magic Word Preview Section */}
        {isValid() && (
          <section className="bg-blue-50 py-12">
            <div className="max-w-4xl mx-auto px-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#214179] mb-4">
                  🪄 Magic Word Preview: "Homework Battle"
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  See how ONE magic word transforms ChatGPT into your family's personal assistant
                </p>
                <div className="bg-white rounded-lg p-6 border border-blue-200">
                  <div className="text-left mb-4">
                    <h4 className="font-semibold text-[#214179] mb-2">Instead of typing this every time:</h4>
                    <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                      "My 8-year-old Sam is creative and high-energy, needs fun approaches, we're an organized chaos family that values humor, he's avoiding homework again, please suggest strategies that aren't punishment-based..."
                    </div>
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-green-700 mb-2">You just type: "Homework battle"</h4>
                    <div className="bg-green-50 p-3 rounded text-sm font-mono border border-green-200">
                      ChatGPT instantly knows: your family, your values, your kid's personality, what works, what doesn't
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    setDemoMagicWord(generateDemoMagicWord());
                    setShowMagicWordDemo(true);
                  }}
                  className="mt-6 bg-[#214179] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#826753] transition-colors"
                >
                  See Your "Homework Battle" Magic Word
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Magic Word Demo Modal */}
        {showMagicWordDemo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-[#214179]">Your "Homework Battle" Magic Word</h3>
                  <button 
                    onClick={() => setShowMagicWordDemo(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="bg-gray-50 border rounded-lg p-4 mb-4">
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Copy this entire prompt and paste it into ChatGPT:</strong>
                  </div>
                  <textarea 
                    readOnly 
                    value={demoMagicWord}
                    className="w-full h-64 text-xs font-mono bg-white border border-gray-200 rounded p-3 resize-none"
                  />
                  <button
                    onClick={() => copyMagicWord()}
                    className="mt-3 bg-green-600 text-white px-4 py-2 rounded font-medium hover:bg-green-700"
                  >
                    {copied ? '✓ Copied!' : '📋 Copy Magic Word'}
                  </button>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">This is just 1 of 15 Magic Words in the full system:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                    {MAGIC_WORDS.slice(0, 9).map(word => (
                      <div key={word.id} className="bg-white p-2 rounded border">
                        "{word.name}"
                      </div>
                    ))}
                    <div className="bg-[#214179] text-white p-2 rounded text-center font-semibold">
                      +6 more
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => {
                      setShowMagicWordDemo(false);
                      setShowPricing(true);
                    }}
                    className="bg-[#214179] text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-[#826753] transition-colors"
                  >
                    Get All 15 Magic Words - $20
                  </button>
                  <p className="text-sm text-gray-600 mt-2">
                    That's just $1.33 per magic word • 150+ minutes of time savings
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
// Force deployment - version 1.1
import { useState, useEffect, useCallback } from 'react';
