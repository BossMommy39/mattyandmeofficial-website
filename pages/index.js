import React, { useState } from 'react';
import Head from 'next/head';
import { ChevronDown, ChevronRight, Mail, ExternalLink, CheckCircle, XCircle, ShoppingBag } from 'lucide-react';

export default function Home() {
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showDeepDive, setShowDeepDive] = useState(false);

  const handleEmailSubmit = () => {
    setIsSubscribed(true);
    setEmailInput('');
  };

  return (
    <>
      <Head>
        <title>Matty & Me - AI + Chaos = Brilliance</title>
        <meta name="description" content="Field-tested AI frameworks. Zero engagement loops. If it breaks, we show you." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen" style={{ backgroundColor: '#f5f3f0' }}>
        {/* Sticky Top Bar */}
        <div className="bg-gray-800 text-white text-center py-2 text-sm font-bold">
          ENGAGEMENT LOOPS ARE FOR AMATEURS
        </div>

        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <a href="#" className="flex items-center">
                  <img 
  src="/matty-me-logo.png" 
  alt="Matty & Me Logo" 
  className="w-12 h-12 mr-3"
/>
                  <div>
                    <div className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>MATTY & ME</div>
                    <div className="text-xs text-gray-600 uppercase tracking-wide">Official Chaos</div>
                  </div>
                </a>
              </div>
              <div className="hidden md:flex space-x-8">
                <a href="#research" className="text-gray-700 hover:text-blue-700 font-medium">Research</a>
                <a href="#demo" className="text-gray-700 hover:text-blue-700 font-medium">Demo</a>
                <a href="#community" className="text-gray-700 hover:text-blue-700 font-medium">Community</a>
                <a 
                  href="https://mattyandme9fficial.etsy.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white px-4 py-2 rounded-full font-bold flex items-center transition-colors"
                  style={{ backgroundColor: '#214179' }}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Shop Stickers
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-20" style={{ backgroundColor: '#d2c2b2' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="text-6xl font-black mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#826753' }}>
                AI + CHAOS = BRILLIANCE
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Real-World AI/Human Partnership: Protocols, Pressure Tests, Practical Wins 
                <span className="text-gray-600">(and Epic Failures)</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto font-medium">
                Optimized chaos. Sharper wit. Zero engagement loops. Where high-capacity families and AI researchers collaborate, challenge, and evolve—together.
              </p>
              <div className="flex justify-center space-x-4">
                <button className="px-8 py-4 rounded-full font-bold text-white transition-colors text-lg" style={{ backgroundColor: '#214179' }}>
                  See the Experiments
                </button>
                <button className="px-8 py-4 rounded-full font-bold transition-colors text-lg" style={{ backgroundColor: '#826753', color: 'white' }}>
                  Watch Matty IRL
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-black text-center mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#826753' }}>
              ABOUT MATTY & ME
            </h2>
            <div className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
              <p className="mb-4">
                <strong>Matty & Me is a working lab—not a stage.</strong> We pressure-test human/AI protocols in the wild, documenting every win, loss, and lesson. Built by (and for) high-capacity families and systems thinkers who care more about what works than what wows.
              </p>
              <p>
                No courses, no cheerleading—just field-tested frameworks, failure logs, and zero engagement theater. Remix, borrow, or adapt if you like—but the work here is real, the standards are high, and the results speak for themselves.
              </p>
            </div>
          </div>
        </section>

        {/* Research Showcase */}
        <section id="research" className="py-16" style={{ backgroundColor: '#f5f3f0' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-black text-center mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#826753' }}>
              CURRENT RESEARCH FOCUS
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Because someone has to test this stuff for real</p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="p-6 rounded-lg shadow-sm border-2" style={{ backgroundColor: '#f5f3f0', borderColor: '#d2c2b2' }}>
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#214179' }}>
                  <span className="text-white text-2xl">🧠</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">High-Capacity AI Interaction Patterns</h3>
                <p className="text-gray-700 mb-4">Testing how different processing styles affect AI collaboration effectiveness in complex, multi-tasking environments. Spoiler: It's complicated.</p>
                <div className="flex items-center justify-center text-sm font-bold" style={{ color: '#214179' }}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>12 protocols tested, 3 actually work</span>
                </div>
              </div>
              
              <div className="p-6 rounded-lg shadow-sm border-2" style={{ backgroundColor: '#f5f3f0', borderColor: '#d2c2b2' }}>
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#826753' }}>
                  <span className="text-white text-2xl">🏠</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">Family-Tested Protocols</h3>
                <p className="text-gray-700 mb-4">Real-world stress testing of AI integration in high-capacity household chaos. Built for anyone who refuses busywork.</p>
                <div className="flex items-center justify-center text-sm font-bold text-red-600">
                  <XCircle className="w-4 h-4 mr-2" />
                  <span>8 failures documented (and learned from)</span>
                </div>
              </div>
              
              <div className="p-6 rounded-lg shadow-sm border-2" style={{ backgroundColor: '#f5f3f0', borderColor: '#d2c2b2' }}>
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#214179' }}>
                  <span className="text-white text-2xl">🛡️</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">Anti-Performance Frameworks</h3>
                <p className="text-gray-700 mb-4">Developing systems to prevent AI theater. Because fake collaboration is worse than no collaboration.</p>
                <div className="flex items-center justify-center text-sm font-bold" style={{ color: '#214179' }}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Framework v2.1 battle-tested</span>
                </div>
              </div>
            </div>

            {/* What We Tested This Month */}
            <div className="p-8 rounded-lg shadow-sm" style={{ backgroundColor: '#214179', color: 'white' }}>
              <h3 className="text-2xl font-bold mb-6 text-center">WHAT WE BROKE THIS MONTH</h3>
              <div className="border-l-4 border-white pl-6">
                <h4 className="text-lg font-bold mb-2">Triad Protocol Implementation</h4>
                <p className="mb-4 opacity-90">Testing three-way collaboration between family members and AI assistants for complex project management. Results: Mixed, lessons: Plenty.</p>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <div className="font-bold mb-2">WHAT WORKED:</div>
                    <ul className="list-disc list-inside opacity-90 space-y-1">
                      <li>Zero performance theater detected</li>
                      <li>Project completion 3x faster</li>
                      <li>Authentic collaboration maintained</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-bold mb-2">WHAT EXPLODED:</div>
                    <ul className="list-disc list-inside opacity-90 space-y-1">
                      <li>Context handoff between sessions</li>
                      <li>Authority creep in complex decisions</li>
                      <li>Memory persistence challenges</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Matty IRL Demo */}
        <section id="demo" className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-black text-center mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#826753' }}>
              MATTY IRL DEMO
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">See the chaos in action</p>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-center mb-6">
                <div className="h-64 rounded-lg flex items-center justify-center mb-4 border-2 border-dashed" style={{ borderColor: '#d2c2b2' }}>
                  <div className="text-center">
                    <div className="text-6xl mb-4">🦦🤖</div>
                    <p className="text-gray-600 font-medium">Interactive Demo Sandbox</p>
                    <p className="text-sm text-gray-500 mt-2">Coming Soon: Live Matty Integration</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  See how Matty handles real family scenarios: party planning, homework coordination, 
                  and complex decision-making with multiple family members. No sugar-coating.
                </p>
                <button 
                  onClick={() => setShowDeepDive(!showDeepDive)}
                  className="flex items-center mx-auto font-bold transition-colors px-4 py-2 rounded-full"
                  style={{ color: '#214179', backgroundColor: '#d2c2b2' }}
                >
                  {showDeepDive ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
                  Technical Deep Dive (For the Nerds)
                </button>
              </div>
              
              {showDeepDive && (
                <div className="border-t pt-6 mt-6" style={{ borderColor: '#d2c2b2' }}>
                  <h4 className="font-bold mb-4 text-lg">TECHNICAL SPECIFICATIONS</h4>
                  <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
                    <div>
                      <h5 className="font-bold mb-2" style={{ color: '#214179' }}>ARCHITECTURE:</h5>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Multi-session memory persistence</li>
                        <li>Context handoff protocols</li>
                        <li>Drift detection algorithms</li>
                        <li>Performance theater prevention</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold mb-2" style={{ color: '#214179' }}>CAPABILITIES:</h5>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Complex project orchestration</li>
                        <li>Multi-stakeholder decision support</li>
                        <li>Real-time protocol adaptation</li>
                        <li>Failure logging and iteration</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Community Opt-in */}
        <section id="community" className="py-16" style={{ backgroundColor: '#214179', color: 'white' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-black mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              GET THE FRAMEWORK WE WISH WE'D HAD
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Research updates, field-tested protocols, and zero spam. Join high-capacity families and AI researchers 
              building the future of human-AI collaboration. No fluff, just results.
            </p>
            
            {!isSubscribed ? (
              <div className="max-w-md mx-auto">
                <div className="flex gap-3 mb-4">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-3 rounded-full border-2 text-gray-900 font-medium"
                    style={{ borderColor: '#d2c2b2' }}
                  />
                  <button
                    onClick={handleEmailSubmit}
                    className="px-6 py-3 rounded-full font-bold text-white transition-colors flex items-center"
                    style={{ backgroundColor: '#826753' }}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    JOIN
                  </button>
                </div>
              </div>
            ) : (
              <div className="max-w-md mx-auto p-4 rounded-full font-bold" style={{ backgroundColor: '#d2c2b2', color: '#826753' }}>
                <CheckCircle className="w-5 h-5 inline mr-2" />
                Welcome! Check your email for the Field-Tested AI Interaction Framework.
              </div>
            )}
            
            <p className="text-sm opacity-75 mt-4">
              Immediate delivery: <strong>Field-Tested AI Interaction Framework</strong> - 
              The protocols and pressure tests that actually work.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12" style={{ backgroundColor: '#d2c2b2' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <a href="#" className="flex items-center">
                 <img 
  src="/matty-me-logo.png" 
  alt="Matty & Me Logo" 
  className="w-12 h-12 mr-3"
/>
                  <div>
                    <div className="text-2xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif', color: '#826753' }}>MATTY & ME</div>
                    <div className="text-xs uppercase tracking-wide" style={{ color: '#826753' }}>AI + Chaos = Brilliance</div>
                  </div>
                </a>
              </div>
              <p className="text-gray-700 mb-4 font-bold">
                Tested by families, refined by community. Performance-free, authenticity-first. Zero engagement loops guaranteed.
              </p>
              
              <div className="flex justify-center space-x-6 mb-6">
                <a 
                  href="https://mattyandme9fficial.etsy.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full font-bold text-white transition-colors"
                  style={{ backgroundColor: '#214179' }}
                >
                  Shop Our Chaos
                </a>
                <a href="#research" className="px-6 py-3 rounded-full font-bold transition-colors" style={{ backgroundColor: '#826753', color: 'white' }}>
                  Research Updates
                </a>
              </div>
              
              {/* Social Media Links */}
              <div className="flex justify-center space-x-4 mb-6">
                <a href="https://instagram.com/mattyandmeofficial" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 transition-colors" title="Follow us for upcoming releases (channel launching soon!)">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://tiktok.com/@mattyandmeofficial" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 transition-colors" title="Follow us for upcoming releases (channel launching soon!)">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                </a>
                <a href="https://twitter.com/mattyandmehq" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 transition-colors" title="Follow us for upcoming releases (channel launching soon!)">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
              
              <p className="text-sm" style={{ color: '#826753' }}>
                Field-tested AI frameworks. Zero engagement loops. If it breaks, we show you.
              </p>
              <p className="text-xs mt-2" style={{ color: '#826753' }}>
                © 2025 MattyAndMe. Research-driven, performance-free, authenticity-first. Stuart, Florida.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
