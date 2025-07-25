import { useState, useEffect } from 'react';
import Script from 'next/script';

interface FormState {
  name: string;
  role: string;
  style: string;
}

export default function Quiz() {
  const [form, setForm] = useState<FormState>({ name: '', role: '', style: '' });
  const [prompt, setPrompt] = useState('');
  const [ready, setReady] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const { name, role, style } = form;
    const complete = Boolean(name && role && style);
    setReady(complete);
    if (complete) {
      setPrompt(buildPrompt(form));
    } else {
      setPrompt('');
    }
  }, [form]);

  // Render PayPal button once the SDK has loaded and form is complete.
  useEffect(() => {
    if (scriptLoaded && ready) {
      // @ts-ignore
      if (window.paypal) {
        // Clean up any previous button instances
        const container = document.getElementById('paypal-container');
        if (container && container.innerHTML.trim().length === 0) {
          // @ts-ignore
          window.paypal.HostedButtons({
            hostedButtonId: '7GJ7VPHQRQA26',
          }).render('#paypal-container');
        }
      }
    }
  }, [scriptLoaded, ready]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="min-h-screen bg-black text-white py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Build Your AI Persona</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2">Your Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Jane Doe"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 rounded text-black"
              />
            </div>
            <div>
              <label htmlFor="role" className="block mb-2">Your Role / Profession</label>
              <input
                id="role"
                name="role"
                type="text"
                placeholder="Product manager, parent, founder..."
                value={form.role}
                onChange={handleChange}
                className="w-full p-2 rounded text-black"
              />
            </div>
            <div>
              <label htmlFor="style" className="block mb-2">Preferred Communication Style</label>
              <input
                id="style"
                name="style"
                type="text"
                placeholder="Formal, casual, technical..."
                value={form.style}
                onChange={handleChange}
                className="w-full p-2 rounded text-black"
              />
            </div>
          </form>
          <aside className="bg-gray-900 p-4 rounded">
            <h2 className="text-xl font-semibold mb-4">Your AI Persona Script</h2>
            {ready ? (
              <>
                <pre className="bg-gray-800 p-3 rounded whitespace-pre-wrap text-sm">
                  {prompt}
                </pre>
                <div id="paypal-container" className="mt-4"></div>
              </>
            ) : (
              <p className="text-gray-400">Fill in all fields to generate your script and payment button.</p>
            )}
          </aside>
        </div>
      </div>
      {/* PayPal SDK loaded after page interactive */}
      <Script
        src="https://www.paypal.com/sdk/js?client-id=BAA2JOb3DyIGnXMD1ohWNhAvgM2eUkSZLi8b1AZ2BuzaW0jzFr6riJ7Ex6Fj2RmsL_wzXzLt6lob4H1vYk&components=hosted-buttons&enable-funding=venmo&currency=USD"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />
    </section>
  );
}

function buildPrompt(form: FormState): string {
  const { name, role, style } = form;
  return `You are interacting with ${name}, a ${role}. Please respond in a ${style} tone. Always remember their context and objectives when generating responses.`;
}
