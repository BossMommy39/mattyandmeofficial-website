import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';

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

  const completion = getCompletionPercentage();

  return (
    <>
      <Head>
        <title>MattyIRL Family AI System - Evidence-Based Protocols</title>
        <meta name="description" content="Clinically-validated family AI protocols. Transform ChatGPT into a family-aware assistant with evidence-based setup by healthcare professionals." />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Back Button */}
        <div className="bg-[#f5f1eb] px-6 py-4">
          <div className="max-w-6xl mx-auto">
            <a 
              href="/"
              className="inline-flex items-center gap-2 text-[#214179] hover:text-[#826753] transition-colors font-medium"
            >
              <span>←</span> Back to Home
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

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Form Column */}
            <div className="lg:col-span-2">
              <div className="bg-[#f5f1eb] rounded-lg p-8">
                <h2 className="text-3xl font-bold text-[#826753] mb-8 text-center">
                  Build Your Family AI System
                </h2>
                
                {/* Family Core Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-[#214179] mb-4 border-b-2 border-[#826753] pb-2">
                    Family Snapshot
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Family Name/Nickname *
                      </label>
                      <input 
                        type="text"
                        value={family.name} 
                        onChange={e => updateFamily("name", e.target.value)} 
                        placeholder="The Chaos Crew, Team Johnson, The Survivors"
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#214179] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Ages in the house
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {["0-3","4-6","7-9","10-12","13-15","16-18","Adults"].map(age => (
                          <button 
                            key={age} 
                            type="button"
                            onClick={() => updateFamily("ages", 
                              family.ages.includes(age) 
                                ? family.ages.filter(a => a !== age) 
                                : [...family.ages, age]
                            )}
                            className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                              family.ages.includes(age)
                                ? 'bg-[#214179] text-white border-[#214179]'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-[#214179]'
                            }`}
                          >
                            {age}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Family Vibe *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {VIBES.map(vibe => (
                          <button 
                            key={vibe.label} 
                            type="button"
                            onClick={() => updateFamily("vibe", vibe.label)}
                            className={`p-4 rounded-lg border-2 text-left transition-all ${
                              family.vibe === vibe.label
                                ? 'bg-[#214179] text-white border-[#214179]'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-[#214179]'
                            }`}
                          >
                            <div className="text-2xl mb-2">{vibe.emoji}</div>
                            <div className="font-semibold">{vibe.label}</div>
                            <div className="text-sm opacity-75">{vibe.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Family Motto/Inside Joke <span className="text-gray-500 font-normal">(optional)</span>
                      </label>
                      <input 
                        type="text"
                        value={family.motto} 
                        onChange={e => updateFamily("motto", e.target.value)} 
                        placeholder="We survive on snacks and sarcasm"
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#214179] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Family Members Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-[#214179] mb-4 border-b-2 border-[#826753] pb-2">
                    Family Members *
                  </h3>
                  
                  {/* Existing Members */}
                  {family.members.map((member, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 mb-4 border-l-4 border-[#214179]">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#214179] mb-2">
                            {member.name} ({member.age}, {member.role})
                          </h4>
                          <p className="text-sm text-gray-600 mb-1">
                            <strong>Personality:</strong> {member.personality.join(", ")}
                          </p>
                          {member.superpower && (
                            <p className="text-sm text-gray-600 mb-1">
                              <strong>Superpower:</strong> {member.superpower}
                            </p>
                          )}
                          <p className="text-sm text-gray-600 mb-1">
                            <strong>Communication:</strong> {member.comm}
                          </p>
                          {member.challenge && (
                            <p className="text-sm text-gray-600">
                              <strong>Challenge:</strong> {member.challenge}
                            </p>
                          )}
                        </div>
                        <button 
                          onClick={() => removeMember(idx)}
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Add Member Interface */}
                  {!adding && (
                    <button 
                      type="button" 
                      onClick={() => setAdding(true)}
                      className="bg-[#214179] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#826753] transition-colors"
                    >
                      + Add Family Member
                    </button>
                  )}

                  {/* Add Member Form */}
                  {adding && (
                    <div className="bg-blue-50 border-2 border-[#214179] rounded-lg p-6 mt-4">
                      <h4 className="font-semibold text-[#214179] mb-4">Add New Family Member</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <input 
                          type="text"
                          value={currentMember.name} 
                          onChange={e => setCurrentMember(cm => ({ ...cm, name: e.target.value }))}
                          placeholder="Name"
                          className="p-2 border rounded focus:border-[#214179] focus:outline-none"
                        />
                        <input 
                          type="text"
                          value={currentMember.age} 
                          onChange={e => setCurrentMember(cm => ({ ...cm, age: e.target.value }))}
                          placeholder="Age"
                          className="p-2 border rounded focus:border-[#214179] focus:outline-none"
                        />
                        <select 
                          value={currentMember.role} 
                          onChange={e => setCurrentMember(cm => ({ ...cm, role: e.target.value }))}
                          className="p-2 border rounded focus:border-[#214179] focus:outline-none"
                        >
                          <option>Kid</option>
                          <option>Teen</option>
                          <option>Parent/Guardian</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Personality (pick 2-3)
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {PERSONALITY_TRAITS.map(trait => (
                            <label key={trait} className="flex items-center gap-2 text-sm">
                              <input 
                                type="checkbox"
                                checked={currentMember.personality.includes(trait)}
                                disabled={currentMember.personality.length >= 3 && !currentMember.personality.includes(trait)}
                                onChange={e => setCurrentMember(cm => ({
                                  ...cm,
                                  personality: e.target.checked
                                    ? [...cm.personality, trait]
                                    : cm.personality.filter(p => p !== trait)
                                }))}
                                className="text-[#214179]"
                              />
                              <span>{trait}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input 
                          type="text"
                          value={currentMember.superpower} 
                          onChange={e => setCurrentMember(cm => ({ ...cm, superpower: e.target.value }))}
                          placeholder="Superpower (e.g., Makes everyone laugh)"
                          className="p-2 border rounded focus:border-[#214179] focus:outline-none"
                        />
                        <select 
                          value={currentMember.comm} 
                          onChange={e => setCurrentMember(cm => ({ ...cm, comm: e.target.value }))}
                          className="p-2 border rounded focus:border-[#214179] focus:outline-none"
                        >
                          <option value="">Communication style...</option>
                          {COMMUNICATION_STYLES.map(style => <option key={style} value={style}>{style}</option>)}
                        </select>
                      </div>

                      <input 
                        type="text"
                        value={currentMember.challenge} 
                        onChange={e => setCurrentMember(cm => ({ ...cm, challenge: e.target.value }))}
                        placeholder="Current challenge (optional)"
                        className="w-full p-2 border rounded focus:border-[#214179] focus:outline-none mb-4"
                      />

                      <div className="flex gap-3">
                        <button 
                          type="button" 
                          onClick={addMember}
                          disabled={!currentMember.name || !currentMember.age || !currentMember.comm}
                          className="bg-green-600 text-white px-4 py-2 rounded font-medium hover:bg-green-700 disabled:bg-gray-400"
                        >
                          Add Member
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setAdding(false)}
                          className="bg-gray-500 text-white px-4 py-2 rounded font-medium hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Challenges & Values Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-[#214179] mb-4 border-b-2 border-[#826753] pb-2">
                    Current Challenges & Values
                  </h3>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Top 2 Challenges *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {CHALLENGES.map(challenge => (
                        <button
                          key={challenge.label}
                          type="button"
                          onClick={() => updateFamily("challenges",
                            family.challenges.includes(challenge.label)
                              ? family.challenges.filter(c => c !== challenge.label)
                              : family.challenges.length < 2 
                                ? [...family.challenges, challenge.label]
                                : family.challenges
                          )}
                          disabled={family.challenges.length >= 2 && !family.challenges.includes(challenge.label)}
                          className={`p-3 rounded-lg border-2 text-left transition-all text-sm ${
                            family.challenges.includes(challenge.label)
                              ? 'bg-green-100 border-green-500 text-green-800'
                              : family.challenges.length >= 2
                                ? 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-white border-gray-200 hover:border-[#214179]'
                          }`}
                        >
                          <div className="text-lg mb-1">{challenge.icon}</div>
                          <div className="font-medium">{challenge.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Family Values (pick 2-3) *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {VALUES.map(value => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => updateFamily("values",
                            family.values.includes(value)
                              ? family.values.filter(v => v !== value)
                              : family.values.length < 3 
                                ? [...family.values, value]
                                : family.values
                          )}
                          disabled={family.values.length >= 3 && !family.values.includes(value)}
                          className={`p-2 rounded border-2 text-xs font-medium transition-all ${
                            family.values.includes(value)
                              ? 'bg-purple-100 border-purple-500 text-purple-800'
                              : family.values.length >= 3
                                ? 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-white border-gray-200 hover:border-[#214179]'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <div className="text-center">
                  <button
                    onClick={() => setShowPricing(true)}
                    disabled={!isValid()}
                    className={`px-8 py-4 rounded-lg font-bold text-lg transition-all ${
                      isValid()
                        ? 'bg-[#214179] text-white hover:bg-[#826753] cursor-pointer' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isValid() ? 'Generate My Family AI Script' : 'Complete Required Fields'}
                  </button>
                </div>
              </div>
            </div>

            {/* Preview Column */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-[#214179] mb-4 flex items-center gap-2">
                  <span>🤖</span> Your Family AI Script
                </h3>
                
                {isValid() && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <div className="font-semibold text-green-800 mb-1">✓ Ready to Generate</div>
                    <div className="text-sm text-green-700">
                      This will create a personalized ChatGPT setup for your family.
                    </div>
                  </div>
                )}

                <textarea 
                  readOnly 
                  value={buildScript()}
                  className="w-full h-64 text-xs font-mono bg-white border border-gray-200 rounded p-3 resize-none"
                />

                <button
                  onClick={copyScript}
                  disabled={!isValid()}
                  className={`w-full mt-4 py-2 px-4 rounded font-medium transition-all ${
                    isValid() 
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {copied ? '✓ Copied!' : '📋 Copy Script'}
                </button>

                {isValid() && family.challenges.length > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                    <div className="font-semibold text-blue-800 text-sm mb-2">Sample AI Response:</div>
                    <div className="text-xs text-blue-700 italic">
                      "Hi {family.name}! I see you're dealing with {family.challenges[0].toLowerCase()}. 
                      {family.motto && ` Since your family motto is "${family.motto}," `}
                      let me suggest an approach that fits your {family.vibe.toLowerCase()} style..."
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Modal */}
        {showPricing && isValid() && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold text-[#826753]">Choose Your MattyIRL Package</h2>
                  <button 
                    onClick={() => setShowPricing(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Basic Package - $20 */}
                  <div className="border-2 border-[#214179] rounded-lg p-6 relative">
                    <div className="absolute -top-3 left-4 bg-[#214179] text-white px-3 py-1 rounded text-sm font-semibold">
                      MOST POPULAR
                    </div>
                    <h3 className="text-xl font-bold text-[#214179] mb-2">ChatGPT Setup System</h3>
                    <div className="text-3xl font-bold text-[#826753] mb-4">$20</div>
                    <p className="text-gray-600 mb-6">Perfect for families who want to get started quickly</p>
                    
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Your personalized family AI script (generated above)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Step-by-step setup video (10 minutes)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>30 real family scenarios & responses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Email support for 30 days</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Free script updates (3 months)</span>
                      </li>
         </ul>

                    <button className="w-full bg-[#214179] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#826753] transition-colors">
                      Get Started - $20
                    </button>
                    
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      30-day money-back guarantee
                    </p>
                  </div>

                  {/* Premium Package - $67 */}
                  <div className="border-2 border-[#826753] rounded-lg p-6 relative">
                    <div className="absolute -top-3 left-4 bg-[#826753] text-white px-3 py-1 rounded text-sm font-semibold">
                      COMPLETE SYSTEM
                    </div>
                    <h3 className="text-xl font-bold text-[#826753] mb-2">Full MattyIRL System</h3>
                    <div className="text-3xl font-bold text-[#214179] mb-4">$67</div>
                    <p className="text-gray-600 mb-6">For families who want privacy & advanced features</p>
                    
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span><strong>Everything in Basic Package</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Docker self-hosted setup (complete privacy)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Advanced customization tools</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Priority email support (24-48 hour response)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Monthly group strategy calls with healthcare professionals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Lifetime script updates</span>
                      </li>
                    </ul>

                    <button className="w-full bg-[#826753] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#214179] transition-colors">
                      Get Complete System - $67
                    </button>
                    
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      30-day money-back guarantee
                    </p>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-gray-600 mb-4">
                    <strong>Need help choosing?</strong> 95% of families start with the $20 package and upgrade later.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      <strong>What happens next:</strong> After purchase, you'll receive your personalized setup 
                      within 24 hours, including your family script, video walkthrough, and access to all materials.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Social Proof Section */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-[#826753] mb-8">
              Built by Real Families Who Needed AI That Actually Gets It
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-lg p-6">
                <div className="text-2xl font-bold text-[#214179] mb-2">6+ Months</div>
                <p className="text-gray-600">Real neurospicy family collaboration with AI</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <div className="text-2xl font-bold text-[#214179] mb-2">31 Iterations</div>
                <p className="text-gray-600">Refined through daily family chaos</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <div className="text-2xl font-bold text-[#214179] mb-2">Evidence-Based</div>
                <p className="text-gray-600">Grounded in clinical research, not AI hype</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 max-w-2xl mx-auto">
              <blockquote className="text-lg text-gray-700 italic mb-4">
                "We applied clinical research principles to solve a real problem: how do you make AI actually understand neurospicy families? After 6+ months of daily use with our own kids, we built the system we wish we'd had from day one."
              </blockquote>
              <div className="text-sm text-gray-600">
                <strong>The Matty & Me Team</strong> - Healthcare professionals, researchers, and neurospicy family advocates
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-[#826753] mb-8 text-center">Common Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-semibold text-[#214179] mb-2">Do I need ChatGPT Plus?</h3>
              <p className="text-gray-700 text-sm">ChatGPT Plus ($20/month) works best, but the free version also works with some limitations. We'll show you both setups.</p>
            </div>
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-semibold text-[#214179] mb-2">What if this doesn't work for my family?</h3>
              <p className="text-gray-700 text-sm">30-day money-back guarantee, no questions asked. Some families need different approaches and that's completely fine.</p>
            </div>
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-semibold text-[#214179] mb-2">How is this different from regular ChatGPT?</h3>
              <p className="text-gray-700 text-sm">Regular ChatGPT gives the same response to everyone. MattyIRL adapts automatically to each family member's age, personality, and communication needs.</p>
            </div>
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-semibold text-[#214179] mb-2">Is this safe for children?</h3>
              <p className="text-gray-700 text-sm">Built-in safety protocols ensure age-appropriate responses, but adult supervision is always recommended for young children using any AI system.</p>
            </div>
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-semibold text-[#214179] mb-2">What about the Docker version?</h3>
              <p className="text-gray-700 text-sm">The $67 package includes complete Docker setup for families who want full data privacy and control. Requires basic technical comfort.</p>
            </div>
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-semibold text-[#214179] mb-2">Can I upgrade later?</h3>
              <p className="text-gray-700 text-sm">Absolutely! Most families start with the $20 package and upgrade to the full system once they see the value. We'll credit your original purchase.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#f5f1eb] py-8">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-gray-600 mb-2">
              Built by healthcare professionals with academic and research experience • Evidence-based family AI protocols
            </p>
            <p className="text-sm text-gray-500">
              Zero engagement theater. Real results. Field-tested technology, not startup promises.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
  
