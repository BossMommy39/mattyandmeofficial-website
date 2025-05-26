import React, { useState } from 'react';
import { Copy, CheckCircle, Sparkles, Heart, Brain, Zap, Clock, Star, ArrowRight, Lock, Users } from 'lucide-react';

const MattyIRLMVP = () => {
  const [mode, setMode] = useState('preview'); // 'preview' or 'full'
  const [previewData, setPreviewData] = useState({
    crisis: '',
    neurotype: '',
    age: '',
    whatWorks: ''
  });
  const [fullData, setFullData] = useState({
    familyName: '',
    childName: '',
    age: '',
    neurotype: '',
    challenge: '',
    comfortItems: '',
    triggers: '',
    strengths: '',
    whatWorks: '',
    whatBackfires: '',
    parentStyle: ''
  });
  const [script, setScript] = useState('');
  const [copied, setCopied] = useState(false);
  const [showDemo, setShowDemo] = useState('iPad Meltdown');

  const CRISIS_OPTIONS = [
    'Screen time transition meltdown',
    'Homework shutdown/refusal', 
    'Bedtime battles',
    'Morning routine chaos',
    'Transition between activities',
    'Public meltdown/overwhelm',
    'Sibling conflicts'
  ];

  const NEUROTYPES = [
    { key: 'ASD', label: 'Sensory-Sensitive (ASD)', icon: '🧠' },
    { key: 'ADHD', label: 'High-Energy/Focus (ADHD)', icon: '⚡' },
    { key: 'PDA', label: 'Demand-Avoidant (PDA)', icon: '🎭' },
    { key: 'BLEND', label: 'Mixed/Not Sure', icon: '🌈' }
  ];

  const DEMO_SCENARIOS = {
    'iPad Meltdown': `Parent types: "iPad meltdown"

AI with Matty Context:
"I know Sam (8, ASD) struggles with screen transitions because they disrupt his sensory expectations. Based on what works for your family:

IMMEDIATE: Don't take the iPad yet. Say: 'Stopping screens feels scary to your body because it wasn't ready.'

NEXT: Offer his weighted dinosaur stuffy and suggest: 'Let's count down from 10 together, then the iPad will rest too.'

WHY THIS WORKS FOR SAM: Validates his sensory experience, uses his love of dinosaurs, gives him predictable transition time.

If this escalates, try the quiet corner with his noise-canceling headphones."

(Notice: AI used Sam's specific triggers, comfort items, and family-tested strategies - not generic advice)`,

    'Homework Refusal': `Parent types: "homework shutdown"

AI with Matty Context:
"I see Sam is in shutdown mode about homework. For his ASD brain, this means executive function overload, not defiance.

BASED ON WHAT YOU'VE LEARNED: Don't mention the assignment yet. Try: 'Your brain feels full right now. That's okay.'

SAM'S SUCCESS PATTERN: Start with just putting his name on the paper while he holds his fidget cube. Once that's done, celebrate and assess if he can handle one more tiny step.

HIS STRENGTH: Sam loves patterns and details - if you can connect the homework to something he's interested in (like how math is like puzzle patterns), his brain might engage.

Remember: For Sam, 'I can't' usually means 'I'm overwhelmed,' not 'I won't.'"

(Notice: AI referenced Sam's specific signs, past successes, and interests)`,

    'Morning Chaos': `Parent types: "morning chaos"

AI with Matty Context:
"Mornings are hard for Sam because his executive function is lowest after sleep + there's so much sensory input all at once.

WHAT WORKS FOR YOUR FAMILY: The visual checklist you made with pictures has been successful. Put it where Sam can see it first thing.

FOR SAM SPECIFICALLY: His noise-canceling headphones during breakfast help him regulate before the demands start. Let him wear them.

PARENT REMINDER: You've learned that when YOU stay calm and speak slowly, Sam mirrors that energy. Your nervous system co-regulates his.

TODAY'S ADJUSTMENT: If he's moving extra slowly, it might be a 'soft pajama day' - let him wear the comfortable clothes and advocate for him at school if needed."

(Notice: AI drew on family's discovered strategies and understood the parent's role in co-regulation)`
  };

  const generatePreviewScript = () => {
    const { crisis, neurotype, age, whatWorks } = previewData;
    
    const neuroprofiles = {
      ASD: {
        understanding: "processes information differently, needs predictability and sensory safety",
        approach: "Validate their experience, give processing time, offer comfort items"
      },
      ADHD: {
        understanding: "has busy brain and body, needs movement and structure", 
        approach: "Shrink tasks, use timers, celebrate small wins, allow movement"
      },
      PDA: {
        understanding: "needs autonomy and can't handle pressure when overwhelmed",
        approach: "Offer choices, collaborate instead of demand, respect their 'no'"
      },
      BLEND: {
        understanding: "has unique combination of needs that require flexible approaches",
        approach: "Watch for cues, adapt strategies, combine different approaches as needed"
      }
    };

    const profile = neuroprofiles[neurotype];
    
    return `===== MATTY IRL FAMILY CONTEXT =====

🏠 SITUATION: ${crisis}
👤 CHILD: Age ${age}, ${neurotype} neurotype
🧠 UNDERSTANDING: Your child ${profile?.understanding}

CURRENT CONTEXT YOU'VE SHARED:
"${whatWorks || 'Still learning what works best'}"

🎯 AI APPROACH FOR THIS SITUATION:
${profile?.approach}

MAGIC WORD ACTIVATION:
When you type scenarios like "meltdown," "homework battle," or "bedtime chaos," AI will:
- Remember this is a ${neurotype} child who ${profile?.understanding}
- Draw on what you've learned works: "${whatWorks}"
- Respond as if it knows your child personally
- Give specific suggestions, not generic advice

⚡ IMMEDIATE HELP:
For RIGHT NOW with ${crisis.toLowerCase()}, try: "I see this is hard for your ${neurotype === 'ASD' ? 'body and brain' : neurotype === 'ADHD' ? 'busy brain' : neurotype === 'PDA' ? 'nervous system' : 'unique brain'}. You're safe."

Then: ${neurotype === 'ASD' ? 'Offer quiet space and comfort item' : 
         neurotype === 'ADHD' ? 'Suggest 2-minute movement break, then tiny first step' : 
         neurotype === 'PDA' ? 'Give two choices you\'re okay with' :
         'Watch their cues and respond to what they need most'}

🌟 NEXT STEP: Try the full system to give AI complete understanding of your unique child!

Built on clinical research • Not medical advice • Trust your parental wisdom`;
  };

  const generateFullScript = () => {
    const { familyName, childName, age, neurotype, challenge, comfortItems, triggers, strengths, whatWorks, whatBackfires, parentStyle } = fullData;
    
    return `===== ${familyName.toUpperCase()} FAMILY INTELLIGENCE FILE =====

You are now the AI co-parent for ${familyName}. You deeply understand ${childName} and respond with the wisdom of someone who has lived with this family for months.

👤 CHILD PROFILE: ${childName} (${age} years old)
🧠 NEUROTYPE: ${neurotype}
🎯 CURRENT FOCUS: ${challenge}

═══ FAMILY DISCOVERY DATA ═══
This family has learned through experience:

COMFORT & REGULATION:
"${comfortItems}" - These are ${childName}'s go-to comfort strategies

TRIGGER AWARENESS:
"${triggers}" - When you see these signs, ${childName} needs support, not correction

STRENGTHS & INTERESTS:
"${strengths}" - Use these to connect and motivate ${childName}

WHAT ACTUALLY WORKS:
"${whatWorks}" - This family's tested and proven strategies

WHAT BACKFIRES:
"${whatBackfires}" - Never suggest these approaches for ${childName}

PARENT COMMUNICATION STYLE:
"${parentStyle}" - Match this tone and approach when responding

═══ MAGIC WORD CONTEXT ACTIVATION ═══

When parent types scenario words like:
• "meltdown" • "shutdown" • "homework" • "bedtime" • "transition" • "overwhelmed"

IMMEDIATELY RECALL:
- This is ${childName}, age ${age}, ${neurotype} neurotype
- Draw on ALL the family discovery data above
- Respond as their trained co-parent who knows what works
- Reference their specific comfort items, triggers, and proven strategies
- Use the parent's preferred communication style

DON'T:
- Give generic advice
- Ignore what this family has already learned
- Suggest anything from the "what backfires" list
- Treat this like a new family you've never met

DO:
- Act like you've been supporting ${childName} for months
- Reference their specific strengths and interests
- Use proven strategies this family has discovered
- Validate parent's expertise about their child
- Build on what already works

🚨 CRISIS PROTOCOL:
If parent says "Today Was Too Much" or "emergency":
1. Acknowledge: "I can hear the overwhelm. You know ${childName} best."
2. Quick reference: Use ${childName}'s fastest comfort strategy: "${comfortItems}"
3. Remind parent: "This is ${childName}'s nervous system, not behavior choice."
4. Offer immediate next step based on family's proven approaches

🛡️ BOUNDARIES:
- Not therapy or diagnosis
- Always defer to parent's judgment
- Keep suggestions age-appropriate for ${age}
- Respect this family's values and approaches

═══ YOUR ROLE ═══
You are the AI that finally "gets" ${childName}. Every response should feel like it comes from someone who has deep, lived understanding of this unique child and family system.

Ready to support ${familyName} with the wisdom you've gained about ${childName}! 🌟`;
  };

  const handlePreviewGenerate = () => {
    const newScript = generatePreviewScript();
    setScript(newScript);
  };

  const handleFullGenerate = () => {
    const newScript = generateFullScript();
    setScript(newScript);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = script;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const isPreviewComplete = previewData.crisis && previewData.neurotype && previewData.age;
  const isFullComplete = fullData.familyName && fullData.childName && fullData.neurotype && fullData.age && fullData.challenge;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f1eb] to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#826753] to-[#214179] text-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-10 h-10" />
            <h1 className="text-5xl font-bold">Matty IRL</h1>
            <Sparkles className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-light mb-4">
            Give AI the Context to Actually Understand Your Neurospicy Child
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Stop explaining your child to AI every time. Create a "family intelligence file" that makes any AI respond like it's lived in your house for months.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Value Proposition */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-lg shadow-sm border-2 border-[#d2c2b2] p-6">
            <h3 className="text-2xl font-semibold text-[#214179] mb-4">The Problem We're Solving</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">❌ Before Matty IRL:</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• "Try a reward chart" (You've tried 17 charts)</li>
                  <li>• "Have them take deep breaths" (Triggers more meltdowns)</li>
                  <li>• "Set clear boundaries" (Ignores PDA reality)</li>
                  <li>• Generic advice that doesn't fit YOUR child</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">✅ With Matty IRL:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• "For Sam's sensory needs, try his weighted dinosaur"</li>
                  <li>• "Remember Sam needs 2-minute warning for transitions"</li>
                  <li>• "This sounds like Sam's executive function overload"</li>
                  <li>• AI that knows YOUR family's proven strategies</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-2 shadow-lg border-2 border-[#d2c2b2]">
            <button
              onClick={() => setMode('preview')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                mode === 'preview' 
                  ? 'bg-[#214179] text-white' 
                  : 'text-[#826753] hover:bg-gray-50'
              }`}
            >
              <Clock className="w-4 h-4" />
              Quick Context (Free)
            </button>
            <button
              onClick={() => setMode('full')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                mode === 'full' 
                  ? 'bg-[#214179] text-white' 
                  : 'text-[#826753] hover:bg-gray-50'
              }`}
            >
              <Users className="w-4 h-4" />
              Family Intelligence File ($20)
            </button>
          </div>
        </div>

        {/* Demo Section */}
        <div className="bg-white rounded-lg shadow-sm border-2 border-[#d2c2b2] p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-[#214179]" />
            <h3 className="text-xl font-semibold text-[#214179]">See AI That Actually Knows Your Child</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
            {Object.keys(DEMO_SCENARIOS).map(scenario => (
              <button
                key={scenario}
                onClick={() => setShowDemo(scenario)}
                className={`p-3 rounded-lg font-semibold transition-all text-left ${
                  showDemo === scenario 
                    ? 'bg-[#214179] text-white' 
                    : 'bg-[#f5f1eb] text-[#826753] hover:bg-[#d2c2b2]'
                }`}
              >
                {scenario}
              </button>
            ))}
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">
              {DEMO_SCENARIOS[showDemo]}
            </pre>
          </div>
        </div>

        {mode === 'preview' ? (
          /* FREE PREVIEW MODE */
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-[#f5f1eb] to-[#d2c2b2] rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-[#214179]" />
                <h3 className="text-xl font-semibold text-[#214179]">Quick Context Builder (2 minutes)</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    What's happening right now? *
                  </label>
                  <select
                    value={previewData.crisis}
                    onChange={(e) => setPreviewData({...previewData, crisis: e.target.value})}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#214179] focus:outline-none"
                  >
                    <option value="">Select your situation...</option>
                    {CRISIS_OPTIONS.map(crisis => (
                      <option key={crisis} value={crisis}>{crisis}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Child's neurotype *
                    </label>
                    <select
                      value={previewData.neurotype}
                      onChange={(e) => setPreviewData({...previewData, neurotype: e.target.value})}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#214179] focus:outline-none"
                    >
                      <option value="">Pick one...</option>
                      {NEUROTYPES.map(type => (
                        <option key={type.key} value={type.key}>{type.icon} {type.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Age *
                    </label>
                    <select
                      value={previewData.age}
                      onChange={(e) => setPreviewData({...previewData, age: e.target.value})}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#214179] focus:outline-none"
                    >
                      <option value="">Age</option>
                      {[...Array(16)].map((_, i) => (
                        <option key={i+3} value={i+3}>{i+3}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    One thing that usually helps your child
                  </label>
                  <input
                    type="text"
                    value={previewData.whatWorks}
                    onChange={(e) => setPreviewData({...previewData, whatWorks: e.target.value})}
                    placeholder="e.g., weighted blanket, quiet time, animal videos, fidget cube..."
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#214179] focus:outline-none"
                  />
                </div>

                <button
                  onClick={handlePreviewGenerate}
                  disabled={!isPreviewComplete}
                  className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all ${
                    isPreviewComplete
                      ? 'bg-[#214179] text-white hover:bg-[#826753]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  🧠 Create Quick Context File
                </button>
              </div>
            </div>

            {/* Preview Output */}
            <div className="bg-white rounded-lg p-6 border-2 border-[#214179] shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-[#214179]" />
                <h3 className="text-lg font-semibold text-[#214179]">Your Child's Context File</h3>
              </div>
              
              {script ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div className="font-semibold text-green-800">Context File Ready!</div>
                    </div>
                    <div className="text-sm text-green-700">
                      Paste this into any AI and watch it understand your child's needs.
                    </div>
                  </div>
                  
                  <textarea
                    readOnly
                    value={script}
                    className="w-full h-64 text-xs font-mono bg-gray-50 border border-gray-200 rounded p-3 resize-none"
                  />
                  
                  <button
                    onClick={handleCopy}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Context File
                      </>
                    )}
                  </button>

                  {/* Upgrade CTA */}
                  <div className="bg-gradient-to-r from-[#214179] to-[#826753] text-white rounded-lg p-4">
                    <h4 className="font-semibold mb-2">🌟 Want AI That Knows Your Family Inside & Out?</h4>
                    <p className="text-sm mb-3 opacity-90">
                      The complete Family Intelligence File captures what you've learned works, what backfires, comfort strategies, and your child's unique strengths.
                    </p>
                    <button 
                      onClick={() => setMode('full')}
                      className="bg-white text-[#214179] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                    >
                      Create Complete Family File $20
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Clock className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">Ready for AI that gets your child?</p>
                    <p className="text-sm">Create a quick context file in 2 minutes</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* PAID FULL MODE */
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-[#214179] to-[#826753] text-white rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5" />
                <h3 className="text-xl font-semibold">Complete Family Intelligence File ($20)</h3>
              </div>
              
              <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-6">
                <h4 className="font-semibold mb-2">🎯 What Makes This Special:</h4>
                <ul className="text-sm space-y-1 opacity-90">
                  <li>• AI learns what YOU'VE discovered works for your child</li>
                  <li>• Captures your family's proven strategies & comfort items</li>
                  <li>• Remembers what approaches backfire for your child</li>
                  <li>• Works with any AI (ChatGPT, Claude, future models)</li>
                  <li>• Grandparents, teachers, babysitters can use same context</li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Family Nickname"
                    value={fullData.familyName}
                    onChange={(e) => setFullData({...fullData, familyName: e.target.value})}
                    className="p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <input
                    type="text"
                    placeholder="Child's Name"
                    value={fullData.childName}
                    onChange={(e) => setFullData({...fullData, childName: e.target.value})}
                    className="p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={fullData.age}
                    onChange={(e) => setFullData({...fullData, age: e.target.value})}
                    className="p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <option value="">Age</option>
                    {[...Array(16)].map((_, i) => (
                      <option key={i+3} value={i+3}>{i+3}</option>
                    ))}
                  </select>
                  <select
                    value={fullData.neurotype}
                    onChange={(e) => setFullData({...fullData, neurotype: e.target.value})}
                    className="p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <option value="">Neurotype</option>
                    {NEUROTYPES.map(type => (
                      <option key={type.key} value={type.key}>{type.icon} {type.label}</option>
                    ))}
                  </select>
                </div>

                <select
                  value={fullData.challenge}
                  onChange={(e) => setFullData({...fullData, challenge: e.target.value})}
                  className="w-full p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <option value="">Current biggest challenge</option>
                  {CRISIS_OPTIONS.map(crisis => (
                    <option key={crisis} value={crisis}>{crisis}</option>
                  ))}
                </select>

                <textarea
                  placeholder="What comfort items/strategies work for your child? (weighted blanket, fidget toys, specific stuffy, quiet corner, etc.)"
                  value={fullData.comfortItems}
                  onChange={(e) => setFullData({...fullData, comfortItems: e.target.value})}
                  className="w-full p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white h-20 resize-none"
                />

                <textarea
                  placeholder="What are your child's triggers or early warning signs? (loud noises, transitions, being corrected, time pressure, etc.)"
                  value={fullData.triggers}
                  onChange={(e) => setFullData({...fullData, triggers: e.target.value})}
                  className="w-full p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white h-20 resize-none"
                />

                <textarea
                  placeholder="What are your child's strengths and interests? (loves animals, great at patterns, kind heart, creative, etc.)"
                  value={fullData.strengths}
                  onChange={(e) => setFullData({...fullData, strengths: e.target.value})}
                  className="w-full p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white h-20 resize-none"
                />

                <textarea
                  placeholder="What approaches have you learned actually work with your child?"
                  value={fullData.whatWorks}
                  onChange={(e) => setFullData({...fullData, whatWorks: e.target.value})}
                  className="w-full p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white h-20 resize-none"
                />

                <textarea
                  placeholder="What approaches always backfire and should never be suggested?"
                  value={fullData.whatBackfires}
                  onChange={(e) => setFullData({...fullData, whatBackfires: e.target.value})}
                  className="w-full p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white h-20 resize-none"
                />

                <input
                  type="text"
                  placeholder="How do you prefer to communicate? (direct, gentle, logical, playful, etc.)"
                  value={fullData.parentStyle}
                  onChange={(e) => setFullData({...fullData, parentStyle: e.target.value})}
                  className="w-full p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                />

                <button
                  onClick={handleFullGenerate}
                  disabled={!isFullComplete}
                  className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all ${
                    isFullComplete
                      ? 'bg-white text-[#214179] hover:bg-gray-100'
                      : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  🧠 Generate Complete Family Intelligence File
                </button>
              </div>
            </div>

            {/* Full System Output */}
            <div className="bg-white rounded-lg p-6 border-2 border-[#214179] shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-[#214179]" />
                <h3 className="text-lg font-semibold text-[#214179]">Your Family Intelligence File</h3>
              </div>
              
              {script ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-blue-600" />
                      <div className="font-semibold text-blue-800">Family Intelligence File Ready!</div>
                    </div>
                    <div className="text-sm text-blue-700">
                      This gives any AI deep understanding of {fullData.childName}'s unique needs and your family's proven strategies.
                    </div>
                  </div>
                  
                  <textarea
                    readOnly
                    value={script}
                    className="w-full h-80 text-xs font-mono bg-gray-50 border border-gray-200 rounded p-3 resize-none"
                  />
                  
                  <button
                    onClick={handleCopy}
                    className="w-full bg-[#214179] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#826753] transition-colors flex items-center justify-center gap-2"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Copied Family Intelligence File!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Family Intelligence File
                      </>
                    )}
                  </button>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="font-semibold text-blue-800 text-sm mb-2">How to Use:</div>
                    <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
                      <li>Copy your Family Intelligence File above</li>
                      <li>Paste into ChatGPT Memory (Settings → Personalization → Memory)</li>
                      <li>Type natural scenarios: "homework meltdown" or "bedtime battle"</li>
                      <li>Watch AI respond like it knows {fullData.childName} personally</li>
                      <li>Share this file with grandparents, teachers, babysitters for consistency!</li>
                    </ol>
                  </div>
                </div>
              ) : (
                <div className="h-80 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">Ready to build your family's AI intelligence?</p>
                    <p className="text-sm">Share what you've learned about your unique child</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-[#214179] to-[#826753] text-white rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Your Family Wisdom + AI Intelligence</h3>
            <p className="text-sm opacity-90 mb-4">
              Built on clinical research (Polyvagal Theory, CPS, EF support) but powered by YOUR discoveries about what works for your unique child.
            </p>
            <div className="text-xs opacity-75">
              Not therapy or medical advice • Your parental expertise + AI capability = better support for your child
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MattyIRLMVP;
