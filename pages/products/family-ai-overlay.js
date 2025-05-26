import { useState } from 'react';
import Head from 'next/head';

export default function ProductPage() {
  const [family, setFamily] = useState({
    name: "",
    vibe: "",
    members: [],
    challenges: [],
    values: []
  });

  const [showPricing, setShowPricing] = useState(false);

  const isValid = () => {
    return family.name && family.vibe && family.members.length > 0;
  };

  const buildScript = () => {
    if (!isValid()) {
      return "Complete the form to see your family AI script...";
    }

    let script = `FAMILY: The ${family.name} - ${family.vibe}\n\n`;
    script += "MEMBERS:\n";
    family.members.forEach((m) => {
      script += `- ${m.name} (${m.age}): ${m.personality}\n`;
    });
    script += `\nCURRENT FOCUS: Help with ${family.challenges.join(", ")}\n`;
    script += `\nFAMILY VALUES: ${family.values.join(", ")}\n`;
    script += "\nNEVER DO:\n";
    script += "- Compare siblings to each other\n";
    script += "- Give medical advice\n";
    script += "- Always check with parents before suggesting activities\n";

    return script;
  };

  const addMember = (name, age, personality) => {
    if (name && age && personality) {
      setFamily(prev => ({
        ...prev,
        members: [...prev.members, { name, age, personality }]
      }));
    }
  };

  return (
    <>
      <Head>
        <title>MattyIRL Family AI System - Dr. Ann</title>
        <meta name="description" content="Evidence-based family AI protocols by Dr. Ann, PharmD" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#f5f1eb] to-white py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold text-[#826753] mb-6">
              MattyIRL Family AI System
            </h1>
            <p className="text-2xl text-[#826753] mb-4">
              Evidence-based protocols for family AI integration
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Developed by <strong>Dr. Ann</strong> (PharmD, published researcher)
            </p>
          </div>
        </section>

        {/* Main Form */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Form */}
            <div className="bg-[#f5f1eb] rounded-lg p-8">
              <h2 className="text-3xl font-bold text-[#826753] mb-8">
                Build Your Family AI System
              </h2>
              
              {/* Family Name */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Family Name/Nickname *
                </label>
                <input 
                  type="text"
                  value={family.name} 
                  onChange={e => setFamily(prev => ({ ...prev, name: e.target.value }))} 
                  placeholder="The Chaos Crew, Team Johnson"
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#214179] focus:outline-none"
                />
              </div>

              {/* Family Vibe */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Family Vibe *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { emoji: "🎯", label: "Structured & scheduled" },
                    { emoji: "🌊", label: "Go-with-the-flow" },
                    { emoji: "🎪", label: "Organized chaos" },
                    { emoji: "🔥", label: "Survival mode" }
                  ].map(vibe => (
                    <button 
                      key={vibe.label} 
                      type="button"
                      onClick={() => setFamily(prev => ({ ...prev, vibe: vibe.label }))}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        family.vibe === vibe.label
                          ? 'bg-[#214179] text-white border-[#214179]'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-[#214179]'
                      }`}
                    >
                      <div className="text-2xl mb-2">{vibe.emoji}</div>
                      <div className="font-semibold">{vibe.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add Family Members */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#214179] mb-4">
                  Family Members *
                </h3>
                
                {/* Simple Add Member Form */}
                <div className="bg-white rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <input 
                      id="memberName"
                      type="text"
                      placeholder="Name"
                      className="p-2 border rounded focus:border-[#214179] focus:outline-none"
                    />
                    <input 
                      id="memberAge"
                      type="text"
                      placeholder="Age"
                      className="p-2 border rounded focus:border-[#214179] focus:outline-none"
                    />
                    <input 
                      id="memberPersonality"
                      type="text"
                      placeholder="Personality"
                      className="p-2 border rounded focus:border-[#214179] focus:outline-none"
                    />
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      const name = document.getElementById('memberName').value;
                      const age = document.getElementById('memberAge').value;
                      const personality = document.getElementById('memberPersonality').value;
                      addMember(name, age, personality);
                      document.getElementById('memberName').value = '';
                      document.getElementById('memberAge').value = '';
                      document.getElementById('memberPersonality').value = '';
                    }}
                    className="bg-[#214179] text-white px-4 py-2 rounded hover:bg-[#826753]"
                  >
                    Add Member
                  </button>
                </div>

                {/* Display Members */}
                {family.members.map((member, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-3 mb-2 border-l-4 border-[#214179]">
                    <strong>{member.name}</strong> ({member.age}): {member.personality}
                  </div>
                ))}
              </div>

              {/* Challenges */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Top Challenges (pick 2)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Homework resistance", "Bedtime chaos", "Meltdowns", "Sibling conflicts",
                    "Screen time wars", "Chore avoidance", "Social struggles", "Focus issues"
                  ].map(challenge => (
                    <button
                      key={challenge}
                      type="button"
                      onClick={() => {
                        setFamily(prev => ({
                          ...prev,
                          challenges: prev.challenges.includes(challenge)
                            ? prev.challenges.filter(c => c !== challenge)
                            : prev.challenges.length < 2 
                              ? [...prev.challenges, challenge]
                              : prev.challenges
                        }));
                      }}
                      className={`p-2 text-sm rounded border-2 transition-all ${
                        family.challenges.includes(challenge)
                          ? 'bg-green-100 border-green-500 text-green-800'
                          : 'bg-white border-gray-200 hover:border-[#214179]'
                      }`}
                    >
                      {challenge}
                    </button>
                  ))}
                </div>
              </div>

              {/* Values */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Family Values (pick 3)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Kindness", "Achievement", "Creativity", "Teamwork",
                    "Independence", "Humor", "Structure", "Expression"
                  ].map(value => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => {
                        setFamily(prev => ({
                          ...prev,
                          values: prev.values.includes(value)
                            ? prev.values.filter(v => v !== value)
                            : prev.values.length < 3 
                              ? [...prev.values, value]
                              : prev.values
                        }));
                      }}
                      className={`p-2 text-sm rounded border-2 transition-all ${
                        family.values.includes(value)
                          ? 'bg-purple-100 border-purple-500 text-purple-800'
                          : 'bg-white border-gray-200 hover:border-[#214179]'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
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

            {/* Preview */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#214179] mb-4">
                🤖 Your Family AI Script Preview
              </h3>
              
              <textarea 
                readOnly 
                value={buildScript()}
                className="w-full h-64 text-xs font-mono bg-white border border-gray-200 rounded p-3"
              />

              <button
                onClick={() => navigator.clipboard.writeText(buildScript())}
                disabled={!isValid()}
                className={`w-full mt-4 py-2 px-4 rounded font-medium transition-all ${
                  isValid() 
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                📋 Copy Script
              </button>
            </div>
          </div>
        </section>

        {/* Pricing Modal */}
        {showPricing && isValid() && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-[#826753]">Choose Your Package</h2>
                <button 
                  onClick={() => setShowPricing(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* $20 Package */}
                <div className="border-2 border-[#214179] rounded-lg p-6">
                  <h3 className="text-xl font-bold text-[#214179] mb-2">ChatGPT Setup</h3>
                  <div className="text-3xl font-bold text-[#826753] mb-4">$20</div>
                  
                  <ul className="space-y-2 mb-6 text-sm">
                    <li>✓ Your personalized family script</li>
                    <li>✓ Setup video (10 minutes)</li>
                    <li>✓ 30 real scenarios</li>
                    <li>✓ Email support (30 days)</li>
                  </ul>

                  {/* PayPal Button */}
                  <button className="w-full bg-[#214179] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#826753]">
                    Buy Now - $20
                  </button>
                </div>

                {/* $67 Package */}
                <div className="border-2 border-[#826753] rounded-lg p-6">
                  <h3 className="text-xl font-bold text-[#826753] mb-2">Complete System</h3>
                  <div className="text-3xl font-bold text-[#214179] mb-4">$67</div>
                  
                  <ul className="space-y-2 mb-6 text-sm">
                    <li>✓ Everything in basic package</li>
                    <li>✓ Docker self-hosted setup</li>
                    <li>✓ Advanced customization</li>
                    <li>✓ Priority support</li>
                    <li>✓ Monthly strategy calls</li>
                  </ul>

                  {/* PayPal Button */}
                  <button className="w-full bg-[#826753] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#214179]">
                    Buy Complete System - $67
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-[#f5f1eb] py-8">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-gray-600">
              Built by <strong>Dr. Ann</strong> (PharmD, published researcher) • Evidence-based family AI protocols
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
