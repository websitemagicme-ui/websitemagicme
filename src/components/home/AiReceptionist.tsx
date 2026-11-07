import { useEffect, useMemo, useRef, useState } from 'react';
import { Send, RotateCcw, Bot, User, Sparkles } from 'lucide-react';
import { DEMOS, getDemo, type DemoId } from '@/data/demos';

interface Message {
  role: 'bot' | 'user';
  text: string;
}

const BUSINESS_IDS: DemoId[] = ['blade-and-co', 'luna-beauty', 'olive-and-stone', 'smilepoint', 'proflow-plumbing', 'city-limo'];

const SUGGESTED = [
  'Are you open on Saturday?',
  'How much does your service cost?',
  'Where are you located?',
  'Can I book an appointment?',
];

function findAnswer(input: string, demoId: DemoId): string {
  const demo = getDemo(demoId);
  const q = input.toLowerCase();
  for (const entry of demo.knowledge) {
    if (entry.keywords.some((k) => q.includes(k))) return entry.answer;
  }
  return `I'm not certain about that — let me take a message and someone from ${demo.businessName} will get back to you. You can also call ${demo.preview.phone}.`;
}

export default function AiReceptionist() {
  const [activeBiz, setActiveBiz] = useState<DemoId>('blade-and-co');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const demo = useMemo(() => getDemo(activeBiz), [activeBiz]);

  useEffect(() => {
    setMessages([
      { role: 'bot', text: `Hi! I'm the AI receptionist for ${demo.businessName}. Ask me anything about our hours, services, or booking.` },
    ]);
  }, [activeBiz, demo.businessName]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    setMessages((m) => [...m, { role: 'user', text: trimmed }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const answer = findAnswer(trimmed, activeBiz);
      setMessages((m) => [...m, { role: 'bot', text: answer }]);
      setTyping(false);
    }, 900);
  };

  const reset = () => {
    setMessages([
      { role: 'bot', text: `Hi! I'm the AI receptionist for ${demo.businessName}. Ask me anything about our hours, services, or booking.` },
    ]);
  };

  return (
    <section id="ai-receptionist" className="section-y">
      <div className="mx-auto max-w-7xl container-px">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div>
            <span className="eyebrow">
              <Sparkles size={14} /> AI receptionist
            </span>
            <h2 className="heading-2 mt-4 text-ink-900">Meet your 24/7 AI receptionist.</h2>
            <p className="mt-4 text-lg text-ink-500">
              Your website can answer customer questions about your services, pricing, hours, and
              location — even when you're busy.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Answers instantly, day or night',
                'Trained on your business information',
                'Captures leads and takes messages',
                'Hands off to a human when needed',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-ink-700">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent-400/15 text-accent-600">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-3 py-2 text-xs font-medium text-ink-500">
              <span className="h-1.5 w-1.5 rounded-full bg-warning" />
              Interactive demo — simulated responses, not a live AI service
            </div>
          </div>

          {/* Chat */}
          <div className="card flex flex-col overflow-hidden" style={{ height: 540 }}>
            {/* Business selector */}
            <div className="border-b border-ink-200/70 bg-ink-50/60 px-4 py-3">
              <div className="flex items-center gap-2">
                <Bot size={16} className="text-brand-600" />
                <span className="text-xs font-semibold uppercase tracking-wide text-ink-400">Business</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {BUSINESS_IDS.map((id) => {
                  const d = DEMOS.find((x) => x.id === id)!;
                  return (
                    <button
                      key={id}
                      onClick={() => setActiveBiz(id)}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                        activeBiz === id
                          ? 'bg-brand-600 text-white shadow-soft'
                          : 'border border-ink-200 bg-white text-ink-600 hover:border-ink-300'
                      }`}
                    >
                      {d.businessName}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`flex max-w-[80%] items-start gap-2 ${
                      m.role === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <span
                      className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                        m.role === 'bot' ? 'bg-brand-600 text-white' : 'bg-ink-200 text-ink-700'
                      }`}
                    >
                      {m.role === 'bot' ? <Bot size={14} /> : <User size={14} />}
                    </span>
                    <span
                      className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        m.role === 'bot'
                          ? 'rounded-tl-sm bg-white text-ink-800 shadow-soft'
                          : 'rounded-tr-sm bg-brand-600 text-white'
                      }`}
                    >
                      {m.text}
                    </span>
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-white">
                    <Bot size={14} />
                  </span>
                  <span className="ml-2 inline-flex items-center gap-1 rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-soft">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-ink-400 animate-pulse-soft"
                        style={{ animationDelay: `${i * 200}ms` }}
                      />
                    ))}
                  </span>
                </div>
              )}
            </div>

            {/* Suggested */}
            <div className="flex flex-wrap gap-1.5 border-t border-ink-200/70 px-4 py-2.5">
              {SUGGESTED.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-600 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-ink-200/70 px-3 py-3"
            >
              <button
                type="button"
                onClick={reset}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-700"
                aria-label="Reset conversation"
              >
                <RotateCcw size={16} />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-800 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white transition-all hover:bg-brand-700 disabled:opacity-40"
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
