// Updated persona builder component for Matty & Me
// This Next.js page demonstrates how to collect user inputs, generate a
// custom ChatGPT persona script, and render a PayPal hosted button when
// required fields are complete. Replace form fields and `buildPrompt` logic
// as needed for your specific persona generator.

import { useState, useEffect } from 'react';

interface FormState {
  name: string;
  role: string;
  style: string;
  // Add additional properties for your quiz here
}

export default function UpdatedQuiz() {
  const [form, setForm] = useState<FormState>({
    name: '',
    role: '',
    style: '',
  });
  const [result, setResult] = useState('');
  const [ready, setReady] = useState(false);

  // Whenever the form changes, determine if required fields are filled.
  useEffect(() => {
    const { name, role, style } = form;
    const isComplete = Boolean(name && role && style);
    setReady(isComplete);
    if (isComplete) {
      setResult(buildPrompt(form));
    } else {
      setResult('');
    }
  }, [form]);

  // Update form state from inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
              <label className="block mb-2" htmlFor="name">
                Your Name
              </label>
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
              <label className="block mb-2" htmlFor="role">
                Your Role / Profession
              </label>
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
              <label className="block mb-2" htmlFor="style">
                Preferred Communication Style
              </label>
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
            {/* Add any additional inputs here */}
          </form>
          <aside className="bg-gray-900 p-4 rounded">
            <h2 className="text-xl font-semibold mb-4">Your AI Persona Script</h2>
            {ready ? (
              <>
                <pre className="bg-gray-800 p-3 rounded whitespace-pre-wrap text-sm">
                  {result}
                </pre>
                {/* PayPal hosted button appears when ready */}
                <div id="paypal-container-7GJ7VPHQRQA26" className="mt-4"></div>
              </>
            ) : (
              <p className="text-gray-400">
                Fill in the fields to see your script and payment button.
              </p>
            )}
          </aside>
        </div>
      </div>
      {/* Load the PayPal SDK. The script is loaded once after hydration. */}
      <script
        src="https://www.paypal.com/sdk/js?client-id=BAA2JOb3DyIGnXMD1ohWNhAvgM2eUkSZLi8b1AZ2BuzaW0jzFr6riJ7Ex6Fj2RmsL_wzXzLt6lob4H1vYk&components=hosted-buttons&enable-funding=venmo&currency=USD"
      ></script>
      {/* Render the PayPal hosted button only when the form is complete */}
      {ready && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.paypal) {
                paypal.HostedButtons({
                  hostedButtonId: "7GJ7VPHQRQA26",
                }).render("#paypal-container-7GJ7VPHQRQA26");
              }
            `,
          }}
        />
      )}
    </section>
  );
}

/**
 * Build a system prompt for ChatGPT based on the user's answers. Tailor this
 * function to include all the fields collected by your quiz. Keep the prompt
 * concise, actionable and consistent with your brand voice.
 */
function buildPrompt(form: FormState): string {
  const { name, role, style } = form;
  return `You are interacting with ${name}, a ${role}. Please respond in a ${style} tone. Always remember their context and objectives when generating responses.`;
}
