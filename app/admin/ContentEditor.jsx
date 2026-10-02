"use client";

import { useState } from "react";
import { Save, X, Plus, Trash2, LoaderCircle } from "lucide-react";
import Modal from "./Modal";

const fields = {
  packages: [["title", "Name"], ["id", "Package ID"], ["tag", "Category"], ["days", "Days", "number"], ["image", "Image"], ["desc", "Description", "textarea"], ["points", "Included services", "lines"]],
  destinations: [["title", "Name"], ["slug", "URL slug"], ["image", "Image"], ["location", "Country / region"], ["price", "Starting price"], ["duration", "Duration"], ["bestFor", "Best for"], ["description", "Summary", "textarea"], ["longDescription", "Overview", "textarea"], ["highlights", "Highlights", "lines"], ["inclusions", "Inclusions", "lines"]],
  blogs: [["title", "Title"], ["slug", "URL slug"], ["image", "Cover image"], ["description", "Summary", "textarea"], ["date", "Publish date", "date"], ["category", "Category"], ["readTime", "Reading time"], ["destination", "Destination slug"], ["keywords", "Keywords", "lines"], ["intro", "Introduction", "lines"], ["notice", "Notice", "textarea"], ["relatedPackage", "Related package URL"], ["sourcesTitle", "Sources heading"]],
};

const defaults = {
  packages: { title: "", id: "", tag: "", days: 4, image: "", desc: "", points: [], comingSoon: false },
  destinations: { title: "", slug: "", image: "", location: "", price: "", duration: "", bestFor: "", description: "", longDescription: "", highlights: [], inclusions: [] },
  blogs: { title: "", slug: "", image: "", description: "", date: new Date().toISOString().slice(0, 10), category: "Travel Guides", readTime: "5 min read", destination: "", keywords: [], intro: [], sections: [], notice: "", relatedPackage: "/Packages", sourcesTitle: "Sources", sources: [], related: { title: "Plan your holiday", summary: "", ctaLabel: "View packages", whatsappText: "Hi GlobeGuru, I would like to plan a trip." } },
};

function plain(value) {
  if (typeof value === "string") return value;
  return (value || []).map((item) => typeof item === "string" ? item : item.text).join("");
}

export default function ContentEditor({ type, record, onClose, onSave, request }) {
  const [draft, setDraft] = useState({ ...defaults[type], published: true, order: 0, ...record });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const set = (key, value) => setDraft((old) => ({ ...old, [key]: value }));
  function updateSection(index, section) { set("sections", draft.sections.map((item, i) => i === index ? section : item)); }
  async function save(event) {
    event.preventDefault(); setBusy(true); setError("");
    const body = { ...draft };
    for (const [key, , kind] of fields[type]) {
      if (kind === "lines" && typeof body[key] === "string") body[key] = body[key].split("\n").map((v) => v.trim()).filter(Boolean);
      if (kind === "number") body[key] = body[key] === "" ? null : Number(body[key]);
    }
    body.order = Number(body.order);
    try {
      await request(`/api/admin/content/${type}`, { method: record ? "PUT" : "POST", body });
      onSave();
    } catch (err) { setError(err.message); setBusy(false); }
  }
  return <Modal onClose={onClose} busy={busy} labelledBy="editor-heading">
    <section className="admin-editor">
      <div className="admin-editor-header"><h2 id="editor-heading">{record ? "Edit" : "Add"} {type === "blogs" ? "blog post" : type.slice(0, -1)}</h2><button type="button" className="admin-icon-button" aria-label="Close editor" title="Close" onClick={onClose} disabled={busy}><X size={20} /></button></div>
      <form onSubmit={save} className="admin-form">
        <div className="admin-field-grid">{fields[type].map(([key, label, kind]) => <label key={key} className={kind === "textarea" || kind === "lines" ? "admin-field-wide" : ""}>{label}
          {kind === "textarea" || kind === "lines" ? <textarea rows={kind === "lines" ? 4 : 3} value={Array.isArray(draft[key]) ? draft[key].join("\n") : draft[key] || ""} onChange={(e) => set(key, e.target.value)} required={["desc", "description", "longDescription"].includes(key)} /> : <input type={kind || "text"} value={draft[key] ?? ""} onChange={(e) => set(key, e.target.value)} min={key === "days" ? 1 : undefined} max={key === "days" ? 365 : undefined} required={!["image", "destination", "days"].includes(key) || (key === "image" && type !== "packages")} />}
        </label>)}</div>
        {type === "packages" && <label className="admin-checkbox"><input type="checkbox" checked={draft.comingSoon} onChange={(e) => set("comingSoon", e.target.checked)} /> Coming soon</label>}
        {type === "blogs" && <>
          <div className="admin-section-heading"><h3>Article sections</h3><button type="button" className="admin-button-secondary" onClick={() => set("sections", [...draft.sections, { title: "", blocks: [{ type: "paragraph", children: "" }] }])}><Plus size={16} /> Add section</button></div>
          {draft.sections.map((section, index) => <fieldset key={index} className="admin-article-section">
            <div className="admin-section-heading"><label>Section heading<input value={section.title} required onChange={(e) => updateSection(index, { ...section, title: e.target.value })} /></label><button type="button" className="admin-icon-button" aria-label="Remove section" title="Remove section" onClick={() => set("sections", draft.sections.filter((_, i) => i !== index))}><Trash2 size={16} /></button></div>
            {section.blocks.map((block, blockIndex) => <div key={blockIndex} className="admin-block">
              <div className="admin-section-heading"><select aria-label="Content type" value={block.type} onChange={(e) => updateSection(index, { ...section, blocks: section.blocks.map((b, i) => i === blockIndex ? e.target.value === "paragraph" ? { type: "paragraph", children: b.children || (b.items || []).map(plain).join("\n") } : { type: e.target.value, items: b.items || [b.children || ""] } : b) })}><option value="paragraph">Paragraph</option><option value="list">Bullet list</option><option value="orderedList">Numbered list</option></select><button type="button" className="admin-icon-button" title="Remove block" aria-label="Remove block" onClick={() => updateSection(index, { ...section, blocks: section.blocks.filter((_, i) => i !== blockIndex) })}><X size={16} /></button></div>
              <textarea aria-label={`Section ${index + 1} content ${blockIndex + 1}`} rows={4} value={block.type === "paragraph" ? plain(block.children) : block.items.map(plain).join("\n")} onChange={(e) => updateSection(index, { ...section, blocks: section.blocks.map((b, i) => i !== blockIndex ? b : block.type === "paragraph" ? { ...b, children: e.target.value } : { ...b, items: e.target.value.split("\n") }) })} />
            </div>)}
            <button type="button" className="admin-button-secondary" onClick={() => updateSection(index, { ...section, blocks: [...section.blocks, { type: "paragraph", children: "" }] })}><Plus size={15} /> Add paragraph</button>
          </fieldset>)}
          <h3>Sources</h3>{draft.sources.map((source, index) => <div className="admin-source-row" key={index}><label>Label<input required value={source.label} onChange={(e) => set("sources", draft.sources.map((s, i) => i === index ? { ...s, label: e.target.value } : s))} /></label><label>URL<input required value={source.href} onChange={(e) => set("sources", draft.sources.map((s, i) => i === index ? { ...s, href: e.target.value } : s))} /></label><button type="button" className="admin-icon-button" aria-label="Remove source" title="Remove source" onClick={() => set("sources", draft.sources.filter((_, i) => i !== index))}><X size={16} /></button></div>)}
          <button type="button" className="admin-button-secondary" onClick={() => set("sources", [...draft.sources, { label: "", href: "" }])}><Plus size={15} /> Add source</button>
          <h3>Related holiday</h3><div className="admin-field-grid">{[["title", "Heading"], ["summary", "Summary"], ["ctaLabel", "Button label"], ["whatsappText", "WhatsApp message"]].map(([key, label]) => <label key={key}>{label}<input value={draft.related[key]} onChange={(e) => set("related", { ...draft.related, [key]: e.target.value })} required={key !== "summary"} /></label>)}</div>
        </>}
        <div className="admin-publish-row"><label className="admin-checkbox"><input type="checkbox" checked={draft.published} onChange={(e) => set("published", e.target.checked)} /> Published</label><label>Display order<input type="number" min="0" max="10000" value={draft.order} required onChange={(e) => set("order", e.target.value)} /></label></div>
        {error && <p role="alert" className="admin-error">{error}</p>}
        <div className="admin-editor-footer"><button type="button" onClick={onClose} disabled={busy} className="admin-button-secondary">Cancel</button><button type="submit" disabled={busy} className="admin-button">{busy ? <LoaderCircle size={16} className="animate-spin" /> : <Save size={16} />} Save changes</button></div>
      </form>
    </section>
  </Modal>;
}
