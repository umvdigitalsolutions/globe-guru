"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, MapPin, Package, FileText, Star, Settings, LogOut, ExternalLink, Search, Plus, Pencil, Trash2, RefreshCw, LoaderCircle, ShieldCheck, ArrowRight, Check, X, EyeOff, Menu } from "lucide-react";
import ContentEditor from "./ContentEditor";
import Modal from "./Modal";

const navigation = [["overview", "Overview", LayoutDashboard], ["packages", "Packages", Package], ["destinations", "Destinations", MapPin], ["blogs", "Blog posts", FileText], ["reviews", "Reviews", Star], ["settings", "Settings", Settings]];
const statuses = ["all", "pending", "approved", "hidden"];

async function request(url, options = {}) {
  const response = await fetch(url, { ...options, headers: { "Content-Type": "application/json" }, body: options.body ? JSON.stringify(options.body) : undefined });
  const result = await response.json();
  if (response.status === 401 && url !== "/api/admin/login") window.location.reload();
  if (!response.ok) throw new Error(result.error || "Something went wrong.");
  return result;
}

function date(value) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" }).format(new Date(value));
}

function Login() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError("");
    try { await request("/api/admin/login", { method: "POST", body: Object.fromEntries(new FormData(event.currentTarget)) }); router.refresh(); }
    catch (err) { setError(err.message); setBusy(false); }
  }
  return <div className="admin-login"><div className="admin-login-inner">
    <Image src="/globe.png" alt="GlobeGuru Holidays" width={270} height={180} priority className="admin-login-logo" />
    <h1>Admin sign in</h1><form className="admin-form" onSubmit={submit}>
      <label>Email<input name="email" type="email" autoComplete="username" required autoFocus /></label>
      <label>Password<input name="password" type="password" autoComplete="current-password" required maxLength={256} /></label>
      {error && <p className="admin-error" role="alert">{error}</p>}
      <button disabled={busy} className="admin-button">{busy ? <LoaderCircle size={17} className="animate-spin" /> : <ShieldCheck size={17} />} {busy ? "Signing in..." : "Sign in"}</button>
    </form><Link href="/" className="admin-back-link">Return to website <ArrowRight size={14} /></Link>
  </div></div>;
}

function AccountSettings({ email }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(event) {
    event.preventDefault(); setError("");
    const body = Object.fromEntries(new FormData(event.currentTarget));
    if (body.newPassword !== body.confirmPassword) { setError("New passwords do not match."); return; }
    setBusy(true);
    try { await request("/api/admin/password", { method: "POST", body }); router.refresh(); }
    catch (err) { setError(err.message); setBusy(false); }
  }
  return <section className="admin-settings"><h2>Account</h2><p className="admin-muted">{email}</p><h3>Change password</h3><form className="admin-form" onSubmit={submit}>
    <label>Current password<input type="password" name="currentPassword" autoComplete="current-password" maxLength={256} required /></label>
    <label>New password<input type="password" name="newPassword" autoComplete="new-password" minLength={12} maxLength={256} required /></label>
    <label>Confirm new password<input type="password" name="confirmPassword" autoComplete="new-password" minLength={12} maxLength={256} required /></label>
    {error && <p role="alert" className="admin-error">{error}</p>}
    <button disabled={busy} className="admin-button"><ShieldCheck size={16} />{busy ? "Saving..." : "Update password"}</button>
  </form></section>;
}

function AddReview({ onClose, onSave }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function save(event) {
    event.preventDefault(); setBusy(true); setError("");
    const body = Object.fromEntries(new FormData(event.currentTarget)); body.rating = Number(body.rating);
    try { await request("/api/admin/reviews", { method: "POST", body }); onSave(); }
    catch (err) { setError(err.message); setBusy(false); }
  }
  return <Modal onClose={onClose} busy={busy} labelledBy="review-heading"><section className="admin-editor admin-review-editor"><div className="admin-editor-header"><h2 id="review-heading">Add review</h2><button type="button" className="admin-icon-button" aria-label="Close" title="Close" onClick={onClose} disabled={busy}><X size={20} /></button></div><form className="admin-form" onSubmit={save}>
    <label>Traveler name<input name="name" minLength={2} maxLength={120} required /></label>
    <label>Traveler email<input name="email" type="email" maxLength={254} required /></label>
    <label>Destination<input name="destination" minLength={2} maxLength={200} required /></label>
    <label>Rating<select name="rating" defaultValue="5">{[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} stars</option>)}</select></label>
    <label>Review<textarea name="message" minLength={10} maxLength={2000} rows={5} required /></label>
    {error && <p className="admin-error" role="alert">{error}</p>}
    <div className="admin-editor-footer"><button type="button" className="admin-button-secondary" onClick={onClose} disabled={busy}>Cancel</button><button disabled={busy} className="admin-button"><Plus size={16} />{busy ? "Saving..." : "Publish review"}</button></div>
  </form></section></Modal>;
}

function Dashboard({ admin }) {
  const router = useRouter();
  const [tab, setTab] = useState("overview");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [refresh, setRefresh] = useState(0);
  const [editor, setEditor] = useState(null);
  const [deleteRecord, setDeleteRecord] = useState(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    if (tab === "settings") return;
    let cancelled = false;
    const url = tab === "overview" ? "/api/admin/overview" : tab === "reviews" ? "/api/admin/reviews" : `/api/admin/content/${tab}`;
    request(url).then((result) => { if (!cancelled) { setData(result); setLoading(false); } }).catch((err) => { if (!cancelled) { setError(err.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, [tab, refresh]);

  function navigate(next) { setTab(next); setQuery(""); setFilter("all"); setError(""); setNotice(""); setData(null); setLoading(true); setMobileNav(false); }
  function reload() { setError(""); setLoading(true); setRefresh((n) => n + 1); }
  function saved() { setEditor(null); setDeleteRecord(null); setNotice("Changes saved."); reload(); }
  async function logout() { setBusy(true); try { await request("/api/admin/logout", { method: "POST" }); router.refresh(); } catch (err) { setError(err.message); setBusy(false); } }
  async function moderate(record, status) { setBusy(true); try { await request("/api/admin/reviews", { method: "PATCH", body: { _id: record._id, status } }); saved(); } catch (err) { setError(err.message); } finally { setBusy(false); } }
  async function remove() { setBusy(true); try { await request(tab === "reviews" ? "/api/admin/reviews" : `/api/admin/content/${tab}`, { method: "DELETE", body: { _id: deleteRecord._id } }); saved(); } catch (err) { setError(err.message); } finally { setBusy(false); } }
  const records = (data?.records || []).filter((record) => `${record.title || record.name} ${record.slug || record.destination || record.tag || ""}`.toLowerCase().includes(query.toLowerCase()) && (filter === "all" || (tab === "reviews" ? record.status === filter : filter === "published" ? record.published : !record.published)));
  const label = navigation.find(([key]) => key === tab)[1];

  return <div className="admin-workspace">
    <aside className={`admin-sidebar ${mobileNav ? "admin-sidebar-open" : ""}`}>
      <div className="admin-brand"><Image src="/globe.png" alt="GlobeGuru Holidays" width={180} height={120} priority /><span>Administration</span></div>
      <nav aria-label="Admin navigation">{navigation.map(([key, title, Icon]) => <button key={key} type="button" onClick={() => navigate(key)} className={tab === key ? "active" : ""} aria-current={tab === key ? "page" : undefined}><Icon size={18} />{title}</button>)}</nav>
      <div className="admin-sidebar-bottom"><Link href="/" target="_blank">View website<ExternalLink size={15} /></Link><button type="button" onClick={logout} disabled={busy}><LogOut size={17} /> Sign out</button></div>
    </aside>
    <div className="admin-main"><header className="admin-topbar"><button type="button" className="admin-icon-button admin-menu-button" title="Toggle navigation" aria-label="Toggle navigation" aria-expanded={mobileNav} onClick={() => setMobileNav(!mobileNav)}><Menu size={20} /></button><span>GlobeGuru Holidays</span><span className="admin-account"><ShieldCheck size={15} />{admin.email}</span></header>
      <main className="admin-content"><div className="admin-page-heading"><div><p className="admin-breadcrumb">Workspace / {label}</p><h1>{label}</h1></div><div className="admin-heading-actions">{tab !== "settings" && <button type="button" className="admin-icon-button" onClick={reload} title="Refresh" aria-label="Refresh" disabled={loading}><RefreshCw size={18} className={loading ? "animate-spin" : ""} /></button>}{!["overview", "settings"].includes(tab) && <button type="button" className="admin-button" onClick={() => setEditor({ record: null })}><Plus size={16} />Add {tab === "blogs" ? "post" : tab.slice(0, -1)}</button>}</div></div>
      {notice && <p className="admin-notice" role="status"><Check size={16} />{notice}</p>}{error && <div className="admin-error" role="alert">{error}<button type="button" onClick={reload} className="admin-button-secondary">Try again</button></div>}
      {tab === "settings" ? <AccountSettings email={admin.email} /> : loading ? <div className="admin-loading" role="status"><LoaderCircle size={24} className="animate-spin" />Loading...</div> : !error && tab === "overview" ? <>
        <div className="admin-stats">{[["packages", "Packages", Package], ["destinations", "Destinations", MapPin], ["blogs", "Blog posts", FileText], ["reviews", "Reviews", Star]].map(([key, title, Icon]) => <button key={key} type="button" onClick={() => navigate(key)}><span className={`admin-stat-icon admin-stat-${key}`}><Icon size={20} /></span><span>{title}<strong>{data?.counts[key] || 0}</strong></span><ArrowRight size={15} /></button>)}</div>
        <div className="admin-overview-status"><span><i />MongoDB connected</span></div>
        <div className="admin-section-heading"><h2>Recent reviews</h2><button type="button" onClick={() => navigate("reviews")} className="admin-text-button">All reviews <ArrowRight size={15} /></button></div>
        {data?.counts.pendingReviews > 0 && <p className="admin-muted">{data.counts.pendingReviews} reviews awaiting approval</p>}
        <div className="admin-table-scroll"><table className="admin-table"><thead><tr><th>Traveler</th><th>Destination</th><th>Rating</th><th>Status</th><th>Submitted</th></tr></thead><tbody>{data?.recent.map((record) => <tr key={record._id}><td>{record.name}</td><td>{record.destination}</td><td>{record.rating} / 5</td><td><span className={`admin-badge ${record.status}`}>{record.status}</span></td><td>{date(record.createdAt)}</td></tr>)}</tbody></table></div>{!data?.recent.length && <div className="admin-empty"><Star size={28} /><h3>No reviews yet</h3></div>}
      </> : !error && <>
        <div className="admin-toolbar"><div className="admin-search"><Search size={17} /><input aria-label={`Search ${label}`} placeholder={`Search ${label.toLowerCase()}`} value={query} onChange={(e) => setQuery(e.target.value)} /></div><select aria-label="Filter status" value={filter} onChange={(e) => setFilter(e.target.value)}>{(tab === "reviews" ? statuses : ["all", "published", "draft"]).map((value) => <option key={value} value={value}>{value === "all" ? "All statuses" : value[0].toUpperCase() + value.slice(1)}</option>)}</select><span className="admin-muted">{records.length} records</span></div>
        {tab === "reviews" ? <div className="admin-review-list">{records.map((record) => <article key={record._id} className="admin-review-row"><div><div className="admin-review-header"><strong>{record.name}</strong><span className={`admin-badge ${record.status}`}>{record.status}</span></div><p className="admin-muted">{record.destination} · {date(record.createdAt)} · {record.email}</p><div className="admin-rating" aria-label={`${record.rating} out of 5 stars`}>{Array.from({ length: 5 }, (_, i) => <Star key={i} size={15} fill={i < record.rating ? "currentColor" : "none"} />)}</div><p className="admin-review-message">{record.message}</p></div><div className="admin-row-actions">{record.status !== "approved" && <button type="button" className="admin-button-secondary" onClick={() => moderate(record, "approved")} disabled={busy}><Check size={16} />Approve</button>}{record.status !== "hidden" && <button type="button" className="admin-icon-button" aria-label={`Hide review by ${record.name}`} title="Hide review" onClick={() => moderate(record, "hidden")} disabled={busy}><EyeOff size={17} /></button>}<button type="button" className="admin-icon-button admin-danger" aria-label={`Delete review by ${record.name}`} title="Delete review" onClick={() => setDeleteRecord(record)} disabled={busy}><Trash2 size={17} /></button></div></article>)}</div> : <div className="admin-table-scroll"><table className="admin-table"><thead><tr><th>{tab === "blogs" ? "Post" : "Name"}</th><th>{tab === "packages" ? "Category" : tab === "blogs" ? "Category" : "Location"}</th><th>{tab === "destinations" ? "Price" : tab === "packages" ? "Duration" : "Published"}</th><th>Status</th><th>Order</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>{records.map((record) => <tr key={record._id}><td><div className="admin-record-name">{record.image && <Image src={record.image} alt="" width={44} height={36} className="admin-thumbnail" />}<span><strong>{record.title}</strong><small>{record.slug || record.id}</small></span></div></td><td>{record.tag || record.category || record.location}</td><td>{tab === "destinations" ? record.price : tab === "packages" ? record.days ? `${record.days} days` : "Coming soon" : date(record.date)}</td><td><span className={`admin-badge ${record.published ? "approved" : "pending"}`}>{record.published ? "Published" : "Draft"}</span></td><td>{record.order}</td><td><div className="admin-row-actions"><button type="button" className="admin-icon-button" title="Edit" aria-label={`Edit ${record.title}`} onClick={() => setEditor({ record })}><Pencil size={16} /></button><button type="button" className="admin-icon-button admin-danger" title="Delete" aria-label={`Delete ${record.title}`} onClick={() => setDeleteRecord(record)}><Trash2 size={16} /></button></div></td></tr>)}</tbody></table></div>}
        {!records.length && <div className="admin-empty"><Search size={28} /><h3>{query || filter !== "all" ? "No matching records" : `No ${label.toLowerCase()} yet`}</h3></div>}
      </>}
      </main>
    </div>
    {editor && (tab === "reviews" ? <AddReview onClose={() => setEditor(null)} onSave={saved} /> : <ContentEditor type={tab} record={editor.record} onClose={() => setEditor(null)} onSave={saved} request={request} />)}
    {deleteRecord && <Modal onClose={() => setDeleteRecord(null)} busy={busy} labelledBy="delete-heading"><section className="admin-confirm"><h2 id="delete-heading">Delete {deleteRecord.title || "review"}?</h2><p>This record will be permanently removed.</p><div className="admin-editor-footer"><button type="button" className="admin-button-secondary" onClick={() => setDeleteRecord(null)} disabled={busy}>Cancel</button><button type="button" className="admin-button admin-delete-button" onClick={remove} disabled={busy}><Trash2 size={16} />{busy ? "Deleting..." : "Delete"}</button></div></section></Modal>}
  </div>;
}

export default function AdminPanel({ admin }) {
  return admin ? <Dashboard admin={admin} /> : <Login />;
}
