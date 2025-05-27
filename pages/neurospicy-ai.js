import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';

// Streamlined Magic Words - 15 Essential Scenarios
const MAGIC_WORDS = [
  {
    id: "homework_battle",
    name: "Homework battle",
    category: "Daily Survival",
    keywords: ["homework", "school", "resistance", "procrastination", "meltdown"],
    shortPrompt: true
  },
  {
    id: "bedtime_chaos", 
    name: "Bedtime chaos",
    category: "Daily Survival",
    keywords: ["bedtime", "sleep", "stalling", "fears", "routine"],
    shortPrompt: true
  },
  {
    id: "morning_rush",
    name: "Morning rush", 
    category: "Daily Survival",
    keywords: ["morning", "getting ready", "transitions", "time pressure"],
    shortPrompt: true
  },
  {
    id: "meltdown_mode",
    name: "Meltdown mode", 
    category: "Crisis Support",
    keywords: ["meltdown", "big emotions", "overwhelm", "crisis"],
    shortPrompt: true
  },
  {
    id: "screen_time_war",
    name: "Screen time war",
    category: "Daily Survival",
    keywords: ["screen time", "devices", "transitions", "limits"],
    shortPrompt: true
  },
  {
    id: "sibling_battle",
    name: "Sibling battle",
    category: "Family Dynamics",
    keywords: ["siblings", "fighting", "jealousy", "fairness"],
    shortPrompt: true
  },
  {
    id: "anxiety_spiral",
    name: "Anxiety spiral",
    category: "Emotional Support",
    keywords: ["anxiety", "worry", "fear", "catastrophic thinking"],
    shortPrompt: true
  },
  {
    id: "defiance_mode",
    name: "Defiance mode", 
    category: "Behavior Support",
    keywords: ["defiance", "refusing", "power struggles", "opposition"],
    shortPrompt: true
  },
  {
    id: "social_struggle", 
    name: "Social struggle",
    category: "Social Skills",
    keywords: ["friends", "social", "rejection", "loneliness"],
    shortPrompt: true
  },
  {
    id: "shutdown_mode",
    name: "Shutdown mode",
    category: "Crisis Support", 
    keywords: ["shutdown", "withdrawn", "non-responsive", "overwhelmed"],
    shortPrompt: true
  },
  {
    id: "transition_trouble",
    name: "Transition trouble",
    category: "Daily Survival", 
    keywords: ["transitions", "change", "routine", "inflexibility"],
    shortPrompt: true
  },
  {
    id: "chore_resistance",
    name: "Chore resistance",
    category: "Daily Survival",
    keywords: ["chores", "responsibilities", "avoidance", "executive function"],
    shortPrompt: true
  },
  {
    id: "meal_battles",
    name: "Meal battles",
    category: "Daily Survival", 
    keywords: ["eating", "picky", "food battles", "sensory"],
    shortPrompt: true
  },
  {
    id: "overstimulation_alert",
    name: "Overstimulation alert",
    category: "Crisis Support",
    keywords: ["overstimulation", "sensory overload", "too much"],
    shortPrompt: true
  },
  {
    id: "frustration_explosion", 
    name: "Frustration explosion",
    category: "Emotional Support",
    keywords: ["anger", "frustration", "hitting", "aggressive"],
    shortPrompt: true
  }
];

// Simplified Magic Word Generator - Under 400 tokens
function generateCompactMagicWord(magicWordId, familyName, childName, childAge, familyVibe) {
  const magicWord = MAGIC_WORDS.find(w => w.id === magicWordId);
  if (!magicWord) return "";

  return `=== ${familyName.toUpperCase()} FAMILY AI ===
You're the ${familyName} family AI assistant. You know this family well.

FAMILY: ${familyName} (${familyVibe} style)
FOCUS CHILD: ${childName} (${childAge})

SITUATION: "${magicWord.name.toUpperCase()}"
When I say "${magicWord.name}" you know exactly what's happening with ${childName}.

YOUR RESPONSE:
• Match our ${familyVibe.toLowerCase()} family energy
• Keep suggestions age-appropriate for ${childAge}
• Give 2-3 specific, actionable strategies
• Validate that this is genuinely hard
• No medical advice - suggest professionals when needed

RESPOND TO: [Parent describes the specific ${magicWord.name} situation]

Remember: You know ${childName} and the ${familyName} family dynamics. Be their trusted AI assistant.`;
}

// Minimal form constants
const VIBES = [
  { emoji: "🎯", label: "Structured", desc: "We love systems & routines" },
  { emoji: "🌊", label: "Flexible", desc: "We go with the flow" },
  { emoji: "🎪", label: "Chaotic", desc: "Organized chaos is our thing" },
  { emoji: "🔥", label: "Survival", desc: "Just keeping everyone alive" }
];

const AGES = ["2-4", "5-7", "8-10", "11-13", "14-16", "17+"];
export default function ProductPage() {
  // Minimal state - only what we need for first magic word
  const [familyName, setFamilyName] = useState("");
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [familyVibe, setFamilyVibe] = useState("");
  
  // Demo states
  const [showDemo, setShowDemo] = useState(false);
  const [demoMagicWord, setDemoMagicWord] = useState("");
  const [copied, setCopied] = useState(false);
  
  // Email & purchase states
  const [email, setEmail] = useState("");
  const [showPurchase, setShowPurchase] = useState(false);

  // Auto-save minimal data
  useEffect(() => {
    const saved = localStorage.getItem('matty-family-quick');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setFamilyName(data.familyName || "");
        setChildName(data.childName || "");
        setChildAge(data.childAge || "");
        setFamilyVibe(data.familyVibe || "");
      } catch (e) {
        console.warn('Could not load saved data');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('matty-family-quick', JSON.stringify({
      familyName, childName, childAge, familyVibe
    }));
  }, [familyName, childName, childAge, familyVibe]);

  const isMinimalFormValid = useCallback(() => {
    return familyName && childName && childAge && familyVibe;
  }, [familyName, childName, childAge, familyVibe]);

  const getCompletionPercentage = useCallback(() => {
    let completed = 0;
    if (familyName) completed += 25;
    if (childName) completed += 25;
    if (childAge) completed += 25;
    if (familyVibe) completed += 25;
    return completed;
  }, [familyName, childName, childAge, familyVibe]);

  const generateDemoPrompt = useCallback(() => {
    if (!isMinimalFormValid()) return "Complete the form to see your magic word...";
    return generateCompactMagicWord("homework_battle", familyName, childName, childAge, familyVibe);
  }, [familyName, childName, childAge, familyVibe, isMinimalFormValid]);

  const copyToClipboard = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  }, []);

  const handleEmailSubmit = useCallback(async () => {
    if (email && isMinimalFormValid()) {
      try {
        await fetch('https://hooks.zapier.com/hooks/catch/23096761/2jkcn6g/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            family_name: familyName,
            child_name: childName,
            child_age: childAge,
            family_vibe: familyVibe,
            timestamp: new Date().toISOString(),
            demo_prompt: generateDemoPrompt()
          })
        });
        console.log('Email sent to Zapier successfully');
      } catch (error) {
        console.error('Error sending to Zapier:', error);
      }
    }
  }, [email, familyName, childName, childAge, familyVibe, isMinimalFormValid, generateDemoPrompt]);

  const renderPayPalButton = useCallback(() => {
    if (typeof window !== 'undefined' && window.paypal) {
      window.paypal.HostedButtons({
        hostedButtonId: "7GJ7VPHQRQA26",
      }).render("#paypal-button-container");
    }
  }, []);

  useEffect(() => {
    if (showPurchase && typeof window !== 'undefined' && window.paypal) {
      setTimeout(() => {
        renderPayPalButton();
      }, 100);
    }
  }, [showPurchase, renderPayPalButton]);

  const completion = getCompletionPercentage();
  return (
    <>
      <Head>
        <title>MattyIRL Family Intelligence File - 15 Magic Words for $20</title>
        <meta name="description" content="Transform ChatGPT into your family's personal AI assistant. Get 15 research-backed magic word prompts customized for your family." />
        <script src="https://www.paypal.com/sdk/js?client-id=BAA2JOb3DyIGnXMD1ohWNhAvgM2eUkSZLi8b1AZ2BuzaW0jzFr6riJ7Ex6Fj2RmsL_wzXzLt6lob4H1vYk&components=hosted-buttons&enable-funding=venmo&currency=USD"></script>
      </Head>

      <div className="min-h-screen bg-white">
        {/* Back Button */}
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
        <section className="bg-gradient-to-b from-[#f5f1eb] to-white py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-[#826753] mb-4">
                Family Intelligence File
              </h1>
              <p className="text-xl text-[#826753] mb-4">
                15 Magic Words That Make ChatGPT Understand Your Family
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Stop re-explaining your child every time. Get instant, personalized AI responses.
              </p>
              
              {/* Progress Indicator */}
              <div className="max-w-sm mx-auto">
                <div className="bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-[#214179] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completion}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">Setup: {completion}% complete</p>
              </div>
            </div>

            {/* Value Proposition */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/70 rounded-lg p-6 border-l-4 border-red-400">
                <h3 className="text-lg font-semibold text-[#214179] mb-3">❌ Without Magic Words:</h3>
                <div className="text-sm text-gray-700 space-y-2">
                  <p>"My 8-year-old Sam is creative, high-energy, needs fun approaches, we're a chaotic family that values humor, he's avoiding homework again, please suggest strategies that aren't punishment-based..."</p>
                  <p className="italic text-gray-500">Every. Single. Time.</p>
                </div>
              </div>
              <div className="bg-white/70 rounded-lg p-6 border-l-4 border-green-500">
                <h3 className="text-lg font-semibold text-[#214179] mb-3">✅ With Magic Words:</h3>
                <div className="text-sm text-gray-700 space-y-2">
                  <p className="font-mono bg-green-50 p-2 rounded">"Homework battle"</p>
                  <p className="italic text-green-700">ChatGPT instantly knows your family, your child, your values, and responds perfectly.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Setup Form */}
        <section className="max-w-3xl mx-auto px-6 py-12">
          <div className="bg-[#f5f1eb] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#826753] mb-6 text-center">
              Quick Setup (2 minutes)
            </h2>
            
            <div className="space-y-6">
              {/* Family Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  What should we call your family?
                </label>
                <input 
                  type="text"
                  value={familyName} 
                  onChange={e => setFamilyName(e.target.value)} 
                  placeholder="The Johnson family, Team Chaos, The Survivors..."
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#214179] focus:outline-none text-lg"
                />
              </div>

              {/* Child Focus */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Child's name (we'll focus on them first)
                  </label>
                  <input 
                    type="text"
                    value={childName} 
                    onChange={e => setChildName(e.target.value)} 
                    placeholder="Sam, Alex, Jordan..."
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#214179] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Their age
                  </label>
                  <select 
                    value={childAge} 
                    onChange={e => setChildAge(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#214179] focus:outline-none"
                  >
                    <option value="">Select age...</option>
                    {AGES.map(age => (
                      <option key={age} value={age}>{age} years old</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Family Vibe */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  What's your family vibe?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {VIBES.map(vibe => (
                    <button 
                      key={vibe.label} 
                      type="button"
                      onClick={() => setFamilyVibe(vibe.label)}
                      className={`p-4 rounded-lg border-2 text-center transition-all ${
                        familyVibe === vibe.label
                          ? 'bg-[#214179] text-white border-[#214179]'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-[#214179]'
                      }`}
                    >
                      <div className="text-2xl mb-1">{vibe.emoji}</div>
                      <div className="font-semibold text-sm">{vibe.label}</div>
                      <div className="text-xs opacity-75">{vibe.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Demo Button */}
              <div className="text-center pt-4">
                {isMinimalFormValid() ? (
                  <button
                    onClick={() => {
                      setDemoMagicWord(generateDemoPrompt());
                      setShowDemo(true);
                    }}
                    className="bg-[#214179] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#826753] transition-colors"
                  >
                    🪄 See Your First Magic Word
                  </button>
                ) : (
                  <div className="text-gray-500 text-sm">
                    Complete all fields above to see your magic word preview
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
{/* Magic Word Demo Modal */}
        {showDemo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-[#214179]">
                    🪄 Your "Homework Battle" Magic Word
                  </h3>
                  <button 
                    onClick={() => setShowDemo(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Here's your personalized ChatGPT prompt:
                  </h4>
                  <div className="text-sm text-blue-700 mb-3">
                    Copy this entire text and paste it into ChatGPT, then just type "Homework battle" when it happens!
                  </div>
                  <textarea 
                    readOnly 
                    value={demoMagicWord}
                    className="w-full h-48 text-xs font-mono bg-white border border-gray-200 rounded p-3 resize-none"
                  />
                  <button
                    onClick={() => copyToClipboard(demoMagicWord)}
                    className="mt-3 bg-green-600 text-white px-4 py-2 rounded font-medium hover:bg-green-700"
                  >
                    {copied ? '✓ Copied!' : '📋 Copy This Magic Word'}
                  </button>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-yellow-800 mb-2">This is just 1 of 15 Magic Words!</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm mb-4">
                    {MAGIC_WORDS.slice(0, 8).map(word => (
                      <div key={word.id} className="bg-white p-2 rounded border text-center">
                        "{word.name}"
                      </div>
                    ))}
                    <div className="bg-[#214179] text-white p-2 rounded text-center font-semibold">
                      +7 more
                    </div>
                  </div>
                  <p className="text-yellow-700 text-sm">
                    Get all 15 Magic Words customized for {familyName} and {childName} for just $20!
                  </p>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => {
                      setShowDemo(false);
                      setShowPurchase(true);
                    }}
                    className="bg-[#214179] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#826753] transition-colors mr-4"
                  >
                    Get All 15 Magic Words - $20
                  </button>
                  <button
                    onClick={() => setShowDemo(false)}
                    className="text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Purchase Modal */}
        {showPurchase && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#826753]">
                    Complete Family Intelligence File
                  </h2>
                  <button 
                    onClick={() => setShowPurchase(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="border-2 border-[#214179] rounded-lg p-6 mb-6">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-[#214179] mb-2">
                      15 Magic Words for {familyName}
                    </h3>
                    <div className="text-3xl font-bold text-[#826753] mb-2">$20</div>
                    <p className="text-gray-600">
                      That's just $1.33 per magic word • 150+ minutes of time savings
                    </p>
                  </div>
                  
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>All 15 Magic Word prompts customized for <strong>{childName}</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Works with ChatGPT, Claude, and other AI assistants</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Instant email delivery within 5 minutes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Step-by-step setup guide included</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>30-day money-back guarantee</span>
                    </li>
                  </ul>

                  {/* Email Collection */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email for delivery:
                    </label>
                    <input 
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full p-3 border border-gray-300 rounded focus:border-[#214179] focus:outline-none"
                    />
                  </div>

                  {/* PayPal Button Container */}
                  <div className="w-full">
                    <div id="paypal-button-container" className="w-full"></div>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Secure checkout via PayPal • No PayPal account required
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">What happens next:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p><strong>1.</strong> Complete payment above</p>
                    <p><strong>2.</strong> Check your email in 5 minutes</p>
                    <p><strong>3.</strong> Copy your magic words into ChatGPT</p>
                    <p><strong>4.</strong> Start getting perfect family responses!</p>
                  </div>
                  <p className="text-xs text-blue-600 mt-3">
                    <strong>Questions?</strong> Email us at HQ@mattyandmeofficial.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Social Proof Section */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-[#826753] mb-6">
              Built by Real Neurospicy Families
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg p-4">
                <div className="text-xl font-bold text-[#214179] mb-1">6+ Months</div>
                <p className="text-sm text-gray-600">Real family testing & refinement</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-xl font-bold text-[#214179] mb-1">15 Magic Words</div>
                <p className="text-sm text-gray-600">Cover 95% of daily family challenges</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-xl font-bold text-[#214179] mb-1">Evidence-Based</div>
                <p className="text-sm text-gray-600">Grounded in research, not AI hype</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 max-w-xl mx-auto">
              <blockquote className="text-gray-700 italic mb-3">
                "We built the system we wish we'd had from day one. After 6+ months of daily use with our own neurospicy kids, these magic words actually work."
              </blockquote>
              <div className="text-sm text-gray-600">
                <strong>The Matty & Me Team</strong> - Healthcare professionals & neurospicy family advocates
              </div>
            </div>
          </div>
        </section>
{/* FAQ Section */}
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-[#826753] mb-8 text-center">Quick Questions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold text-[#214179] mb-2 text-sm">Do I need ChatGPT Plus?</h3>
              <p className="text-gray-700 text-xs">ChatGPT Plus works best, but the free version works too. We include setup instructions for both.</p>
            </div>
            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold text-[#214179] mb-2 text-sm">What if this doesn't work for my family?</h3>
              <p className="text-gray-700 text-xs">30-day money-back guarantee, no questions asked. Some families need different approaches.</p>
            </div>
            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold text-[#214179] mb-2 text-sm">How is this different from regular ChatGPT?</h3>
              <p className="text-gray-700 text-xs">Regular ChatGPT gives generic advice. These magic words make it understand YOUR specific child.</p>
            </div>
            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold text-[#214179] mb-2 text-sm">Is this safe for my child?</h3>
              <p className="text-gray-700 text-xs">Built-in safety guidelines ensure age-appropriate responses. Adult supervision recommended for young children.</p>
            </div>
            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold text-[#214179] mb-2 text-sm">Can I add more family members later?</h3>
              <p className="text-gray-700 text-xs">Absolutely! The magic words can be easily customized for siblings and other family members.</p>
            </div>
            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold text-[#214179] mb-2 text-sm">How quickly will I get my magic words?</h3>
              <p className="text-gray-700 text-xs">Instant delivery to your email within 5 minutes of purchase. Check spam folder if needed.</p>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        {isMinimalFormValid() && !showDemo && !showPurchase && (
          <section className="bg-[#214179] py-12">
            <div className="max-w-2xl mx-auto px-6 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Ready to see your first Magic Word?
              </h2>
              <p className="text-blue-100 mb-6">
                You've completed the setup for {familyName}. Let's show you how ChatGPT will understand {childName} perfectly.
              </p>
              <button
                onClick={() => {
                  setDemoMagicWord(generateDemoPrompt());
                  setShowDemo(true);
                }}
                className="bg-[#826753] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#214179] transition-colors"
              >
                🪄 Generate My Magic Word
              </button>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="bg-[#f5f1eb] py-8">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-gray-600 mb-2">
              Built by healthcare professionals and neurospicy family advocates
            </p>
            <p className="text-sm text-gray-500 mb-3">
              Real solutions for real families. No AI hype, just what works.
            </p>
            <p className="text-xs text-gray-500">
              Questions? Email us at <a href="mailto:HQ@mattyandmeofficial.com" className="text-[#214179] hover:underline">HQ@mattyandmeofficial.com</a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
