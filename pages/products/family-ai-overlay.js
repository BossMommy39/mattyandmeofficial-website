import { useState } from 'react';
import Head from 'next/head';

export default function ProductPage() {
  const [name, setName] = useState('');
  const [vibe, setVibe] = useState('');

  return (
    <>
      <Head>
        <title>MattyIRL - Dr. Ann</title>
      </Head>

      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h1 className="text-4xl font-bold text-[#826753] mb-8 text-center">
            MattyIRL Family AI System
          </h1>
          
          <div className="bg-[#f5f1eb] rounded-lg p-8 max-w-2xl mx-auto">
            <div className="mb-6">
              <label className="block mb-2 font-semibold">Family Name:</label>
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border rounded"
                placeholder="The Chaos Crew"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-semibold">Family Vibe:</label>
              <select 
                value={vibe}
                onChange={(e) => setVibe(e.target.value)}
                className="w-full p-3 border rounded"
              >
                <option value="">Choose your vibe...</option>
                <option value="structured">Structured & Scheduled</option>
                <option value="flow">Go with the Flow</option>
                <option value="chaos">Organized Chaos</option>
                <option value="survival">Survival Mode</option>
              </select>
            </div>

            <div className="bg-white p-4 rounded mb-6">
              <h3 className="font-semibold mb-2">Your AI Script Preview:</h3>
              <div className="text-sm font-mono bg-gray-100 p-3 rounded">
                {name && vibe ? 
                  `FAMILY: The ${name}\nVIBE: ${vibe}\n\nYou are this family's AI assistant. Adapt to their ${vibe} style.` 
                  : "Complete the form to see your script..."
                }
              </div>
            </div>

            <div className="text-center">
              <button 
                disabled={!name || !vibe}
                className="bg-[#214179] text-white px-8 py-3 rounded-lg font-semibold disabled:bg-gray-400"
              >
                Get Full Setup - $20
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
