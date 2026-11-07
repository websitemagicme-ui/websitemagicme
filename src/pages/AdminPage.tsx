import { Link, useLocation } from 'react-router-dom';
import { Loader2, LogOut, LayoutDashboard, Inbox, ArrowLeft, ClipboardList } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed';

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: 'bg-brand-100 text-brand-700',
  contacted: 'bg-warning/15 text-warning',
  qualified: 'bg-accent-400/15 text-accent-600',
  closed: 'bg-ink-200 text-ink-600',
};

type Tab = 'inquiries' | 'requests' | 'support';

interface Inquiry {
  id: string;
  full_name: string;
  email: string;
  business_name: string | null;
  service: string | null;
  google_business_url: string | null;
  message: string;
  status: LeadStatus;
  created_at: string;
}

interface SupportTicket {
  id: string;
  full_name: string;
  email: string;
  business_name: string | null;
  request_type: string;
  current_website: string | null;
  message: string;
  screenshot_paths: string[];
  status: LeadStatus;
  created_at: string;
}

interface WebsiteRequest {
  id: string;
  selected_design: string | null;
  business_name: string;
  industry: string | null;
  location: string | null;
  existing_url: string | null;
  business_description: string | null;
  services_offered: string | null;
  business_hours: string | null;
  preferred_colors: string | null;
  website_goals: string | null;
  features: string[] | null;
  full_name: string;
  email: string;
  phone: string | null;
  preferred_contact: string | null;
  selected_plan: string | null;
  zero_upfront: boolean | null;
  setup_price: string | null;
  monthly_price: string | null;
  status: LeadStatus;
  created_at: string;
}

export default function AdminPage() {
  const { session, loading, signOut } = useAuth();
  const [tab, setTab] = useState<Tab>('inquiries');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [requests, setRequests] = useState<WebsiteRequest[]>([]);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchData = async () => {
    if (!supabase) {
      setFetchError('Database not configured.');
      setFetchLoading(false);
      return;
    }
    setFetchLoading(true);
    try {
      const [inq, req, tickets] = await Promise.all([
        supabase.from('inquiries').select('*').order('created_at', { ascending: false }),
        supabase.from('website_requests').select('*').order('created_at', { ascending: false }),
        supabase.from('support_tickets').select('*').order('created_at', { ascending: false }),
      ]);
      if (inq.error) throw inq.error;
      if (req.error) throw req.error;
      if (tickets.error) throw tickets.error;
      setInquiries((inq.data ?? []) as Inquiry[]);
      setRequests((req.data ?? []) as WebsiteRequest[]);
      setSupportTickets((tickets.data ?? []) as SupportTicket[]);
    } catch (err) {
      setFetchError(err instanceof Error ? err.message : 'Failed to load leads.');
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    if (session) fetchData();
  }, [session]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-brand-600" size={28} />
      </div>
    );
  }

  if (!session) {
    return <AdminLogin />;
  }

  const updateStatus = async (table: Tab, id: string, status: LeadStatus) => {
    if (!supabase) return;
    await supabase.from(table).update({ status }).eq('id', id);
    fetchData();
  };

  const deleteLead = async (table: Tab, id: string) => {
    if (!supabase) return;
    await supabase.from(table).delete().eq('id', id);
    setSelectedId(null);
    fetchData();
  };

  const currentList = tab === 'inquiries' ? inquiries : tab === 'requests' ? requests : supportTickets;
  const selectedItem = currentList.find((item) => item.id === selectedId);

  return (
    <div className="min-h-screen bg-ink-50/50">
      {/* Admin header */}
      <div className="border-b border-ink-200/70 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
              <LayoutDashboard size={18} />
            </span>
            <div>
              <h1 className="text-base font-semibold text-ink-900">Admin Dashboard</h1>
              <p className="text-xs text-ink-500">Manage your leads and project requests</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="hidden items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900 sm:flex">
              <ArrowLeft size={15} /> View site
            </Link>
            <button onClick={signOut} className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 px-3 py-2 text-sm font-medium text-ink-600 hover:bg-ink-50">
              <LogOut size={15} /> Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <StatCard label="Inquiries" value={inquiries.length} icon={Inbox} />
          <StatCard label="Website Requests" value={requests.length} icon={LayoutDashboard} />
          <StatCard label="Support Tickets" value={supportTickets.length} icon={ClipboardList} />
          <StatCard label="New Leads" value={[...inquiries, ...requests, ...supportTickets].filter((i) => i.status === 'new').length} icon={Inbox} />
          <StatCard label="Closed" value={[...inquiries, ...requests, ...supportTickets].filter((i) => i.status === 'closed').length} icon={Inbox} />
        </div>

        {/* Tabs */}
        <div className="mt-6 flex gap-2 border-b border-ink-200">
          {(['inquiries', 'requests', 'support'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setSelectedId(null); }}
              className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                tab === t ? 'border-brand-600 text-brand-700' : 'border-transparent text-ink-500 hover:text-ink-800'
              }`}
            >
              {t === 'inquiries' ? `Contact Inquiries (${inquiries.length})` : t === 'requests' ? `Website Requests (${requests.length})` : `Support Tickets (${supportTickets.length})`}
            </button>
          ))}
        </div>

        {fetchError && (
          <div className="mt-4 rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">{fetchError}</div>
        )}

        {fetchLoading ? (
          <div className="flex py-16 items-center justify-center"><Loader2 className="animate-spin text-brand-600" size={24} /></div>
        ) : currentList.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed border-ink-200 py-16 text-center text-sm text-ink-400">
            No {tab === 'inquiries' ? 'inquiries' : tab === 'requests' ? 'requests' : 'support tickets'} yet.
          </div>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            {/* List */}
            <div className="space-y-3">
              {currentList.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`block w-full rounded-xl border bg-white p-4 text-left transition-all hover:shadow-soft ${
                    selectedId === item.id ? 'border-brand-400 ring-1 ring-brand-200' : 'border-ink-200/70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink-900">{item.full_name}</p>
                      <p className="truncate text-xs text-ink-500">{item.email}</p>
                      {tab === 'inquiries' && (item as Inquiry).business_name && (
                        <p className="mt-1 text-xs text-ink-400">{(item as Inquiry).business_name}</p>
                      )}
                      {tab === 'requests' && (
                        <p className="mt-1 text-xs text-ink-400">
                          {(item as WebsiteRequest).business_name} · {(item as WebsiteRequest).selected_plan}
                        </p>
                      )}
                      {tab === 'support' && (item as SupportTicket).business_name && (
                        <p className="mt-1 text-xs text-ink-400">{(item as SupportTicket).business_name}</p>
                      )}
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[item.status]}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-ink-400">{new Date(item.created_at).toLocaleString()}</p>
                </button>
              ))}
            </div>

            {/* Detail panel */}
            <div className="lg:sticky lg:top-20 lg:self-start">
              {selectedItem ? (
                <div className="card p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-ink-900">Lead Details</h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[selectedItem.status]}`}>
                      {selectedItem.status}
                    </span>
                  </div>

                  {tab === 'inquiries' ? (
                    <InquiryDetail item={selectedItem as Inquiry} />
                  ) : tab === 'requests' ? (
                    <RequestDetail item={selectedItem as WebsiteRequest} />
                  ) : (
                    <SupportDetail item={selectedItem as SupportTicket} />
                  )}

                  {/* Status controls */}
                  <div className="mt-5 border-t border-ink-100 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Update Status</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {(['new', 'contacted', 'qualified', 'closed'] as LeadStatus[]).map((s) => (
                        <button
                          key={s}
                          onClick={() => updateStatus(tab, selectedItem.id, s)}
                          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                            selectedItem.status === s
                              ? 'bg-brand-600 text-white'
                              : 'border border-ink-200 bg-white text-ink-600 hover:border-ink-300'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => deleteLead(tab, selectedItem.id)}
                      className="mt-3 w-full rounded-lg border border-error/30 px-3 py-2 text-xs font-medium text-error transition-colors hover:bg-error/5"
                    >
                      Delete lead
                    </button>
                  </div>
                </div>
              ) : (
                <div className="card p-8 text-center text-sm text-ink-400">
                  Select a lead to view details.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminLogin() {
  const { signIn, signUp } = useAuth();
  const location = useLocation();
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>(location.pathname === '/admin/signup' ? 'sign-up' : 'sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (mode === 'sign-up') {
      const result = await signUp(email, password);
      setLoading(false);
      if (result.error) {
        setError(result.error);
      } else {
        setMessage(result.needsConfirmation
          ? 'Account created. Check your email to confirm it, then sign in.'
          : 'Account created. You can now use the admin dashboard.');
        setMode('sign-in');
      }
      return;
    }

    const result = await signIn(email, password);
    setLoading(false);
    if (result.error) setError(result.error);
  };

  const isSignUp = mode === 'sign-up';

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-50/50 px-5">
      <div className="w-full max-w-sm">
        <div className="card p-7">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white shadow-soft">
            <LayoutDashboard size={20} />
          </span>
          <h1 className="mt-5 text-xl font-semibold text-ink-900">{isSignUp ? 'Create Admin Account' : 'Admin Sign In'}</h1>
          <p className="mt-1 text-sm text-ink-500">Manage contact leads and website requests.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink-800">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input mt-1.5" placeholder="admin@websitemagic.me" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-800">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input mt-1.5" placeholder="At least 6 characters" minLength={6} required />
            </div>
            {error && <p className="text-xs text-error">{error}</p>}
            {message && <p className="rounded-lg bg-accent-400/10 px-3 py-2.5 text-xs text-accent-700">{message}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? <><Loader2 size={16} className="animate-spin" /> {isSignUp ? 'Creating account...' : 'Signing in...'}</> : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <button
            type="button"
            onClick={() => { setMode(isSignUp ? 'sign-in' : 'sign-up'); setError(null); setMessage(null); }}
            className="mt-5 w-full rounded-lg border border-brand-200 bg-brand-50 px-3 py-2.5 text-center text-sm font-semibold text-brand-700 transition-colors hover:border-brand-300 hover:bg-brand-100 hover:text-brand-800"
          >
            {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Create one'}
          </button>
          <Link to="/" className="mt-4 inline-flex items-center gap-1.5 text-xs text-ink-400 hover:text-ink-700">
            <ArrowLeft size={14} /> Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon }: { label: string; value: number; icon: typeof Inbox }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-400">{label}</span>
        <Icon size={16} className="text-ink-300" />
      </div>
      <p className="mt-2 text-2xl font-bold text-ink-900">{value}</p>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div className="flex gap-2 border-b border-ink-100 py-2">
      <span className="w-28 shrink-0 text-xs font-medium text-ink-400">{label}</span>
      <span className="flex-1 text-xs text-ink-700">{value}</span>
    </div>
  );
}

function InquiryDetail({ item }: { item: Inquiry }) {
  return (
    <div className="mt-3">
      <DetailRow label="Name" value={item.full_name} />
      <DetailRow label="Email" value={item.email} />
      <DetailRow label="Business" value={item.business_name} />
      <DetailRow label="Topic" value={item.service} />
      <DetailRow label="Google Business" value={item.google_business_url} />
      <div className="border-b border-ink-100 py-2">
        <span className="block text-xs font-medium text-ink-400">Message</span>
        <p className="mt-1 text-xs text-ink-700">{item.message}</p>
      </div>
    </div>
  );
}

function SupportDetail({ item }: { item: SupportTicket }) {
  const [screenshotUrls, setScreenshotUrls] = useState<string[]>([]);

  useEffect(() => {
    let active = true;
    const loadScreenshots = async () => {
      if (!supabase || item.screenshot_paths.length === 0) return;
      const client = supabase;
      const results = await Promise.all(item.screenshot_paths.map((path) => client.storage.from('support-screenshots').createSignedUrl(path, 3600)));
      if (active) setScreenshotUrls(results.flatMap((result) => result.data?.signedUrl ? [result.data.signedUrl] : []));
    };
    loadScreenshots();
    return () => { active = false; };
  }, [item.id, item.screenshot_paths]);

  return (
    <div className="mt-3">
      <DetailRow label="Name" value={item.full_name} />
      <DetailRow label="Email" value={item.email} />
      <DetailRow label="Business" value={item.business_name} />
      <DetailRow label="Request" value={item.request_type} />
      <DetailRow label="Website" value={item.current_website} />
      {item.screenshot_paths.length > 0 && (
        <div className="border-b border-ink-100 py-2">
          <span className="block text-xs font-medium text-ink-400">Screenshots</span>
          <div className="mt-1 flex flex-wrap gap-2">
            {screenshotUrls.map((url, index) => (
              <a key={url} href={url} target="_blank" rel="noreferrer" className="rounded-lg bg-brand-50 px-2.5 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-100">
                View screenshot {index + 1}
              </a>
            ))}
          </div>
        </div>
      )}
      <div className="border-b border-ink-100 py-2">
        <span className="block text-xs font-medium text-ink-400">Details</span>
        <p className="mt-1 text-xs text-ink-700">{item.message}</p>
      </div>
    </div>
  );
}

function RequestDetail({ item }: { item: WebsiteRequest }) {
  return (
    <div className="mt-3">
      <DetailRow label="Name" value={item.full_name} />
      <DetailRow label="Email" value={item.email} />
      <DetailRow label="Phone" value={item.phone} />
      <DetailRow label="Contact pref" value={item.preferred_contact} />
      <DetailRow label="Business" value={item.business_name} />
      <DetailRow label="Industry" value={item.industry} />
      <DetailRow label="Location" value={item.location} />
      <DetailRow label="Existing URL" value={item.existing_url} />
      <DetailRow label="Design" value={item.selected_design} />
      <DetailRow label="Plan" value={item.selected_plan} />
      <DetailRow label="Setup" value={item.zero_upfront ? '$0 (waived)' : item.setup_price} />
      <DetailRow label="Monthly" value={item.monthly_price} />
      <DetailRow label="$0 upfront" value={item.zero_upfront ? 'Yes' : 'No'} />
      <DetailRow label="Services" value={item.services_offered} />
      <DetailRow label="Hours" value={item.business_hours} />
      <DetailRow label="Colors" value={item.preferred_colors} />
      <DetailRow label="Goals" value={item.website_goals} />
      {item.features && item.features.length > 0 && (
        <div className="border-b border-ink-100 py-2">
          <span className="block text-xs font-medium text-ink-400">Features</span>
          <div className="mt-1 flex flex-wrap gap-1">
            {item.features.map((f) => (
              <span key={f} className="rounded-md bg-brand-50 px-2 py-0.5 text-xs text-brand-700">{f}</span>
            ))}
          </div>
        </div>
      )}
      {item.business_description && (
        <div className="py-2">
          <span className="block text-xs font-medium text-ink-400">Description</span>
          <p className="mt-1 text-xs text-ink-700">{item.business_description}</p>
        </div>
      )}
    </div>
  );
}
