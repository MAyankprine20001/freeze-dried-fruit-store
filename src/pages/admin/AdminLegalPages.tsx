import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  ArrowDown, ArrowUp, ChevronDown, ChevronRight, ExternalLink, FileText, Loader2, Plus,
  RotateCcw, Save, Shield, Trash2,
} from "lucide-react";
import { legalApi } from "../../api/legal.api";
import {
  DEFAULT_LEGAL,
  type LegalItem,
  type LegalPageContent,
  type LegalSection,
  type LegalSlug,
} from "../../data/legalDefaults";
import { LEGAL_COLORS, LEGAL_ICONS, legalIcon } from "../../components/legal/legalIcons";

const PAGES: { slug: LegalSlug; label: string; path: string; icon: typeof Shield }[] = [
  { slug: "privacy", label: "Privacy Policy", path: "/privacy", icon: Shield },
  { slug: "terms", label: "Terms of Service", path: "/terms", icon: FileText },
];

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v));

function move<T>(list: T[], from: number, to: number): T[] {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  const [x] = next.splice(from, 1);
  next.splice(to, 0, x);
  return next;
}

const inputCls =
  "w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-[#D4A017]/20 focus:border-[#D4A017] outline-none transition-colors";
const labelCls = "block text-xs font-bold text-gray-700 mb-1";
const iconBtn =
  "p-1.5 rounded-md text-gray-400 hover:text-gray-800 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors";

/** Textarea that grows with its content, so long paragraphs are easy to read while editing. */
function AutoTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const ref = React.useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight + 2}px`;
  }, [props.value]);
  return <textarea ref={ref} rows={2} {...props} className={`${inputCls} resize-none leading-relaxed ${props.className ?? ""}`} />;
}

export default function AdminLegalPages() {
  const queryClient = useQueryClient();
  const [slug, setSlug] = useState<LegalSlug>("privacy");
  const [page, setPage] = useState<LegalPageContent | null>(null);
  const [isCustom, setIsCustom] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [openSections, setOpenSections] = useState<Set<number>>(new Set());

  const current = PAGES.find((p) => p.slug === slug)!;

  useEffect(() => {
    let cancelled = false;
    setPage(null);
    setOpenSections(new Set());
    legalApi
      .get(slug)
      .then((saved) => {
        if (cancelled) return;
        setPage(clone(saved ?? DEFAULT_LEGAL[slug]));
        setIsCustom(!!saved);
        setDirty(false);
      })
      .catch(() => {
        if (cancelled) return;
        toast.error("Could not load the saved page. Showing the default text.");
        setPage(clone(DEFAULT_LEGAL[slug]));
        setIsCustom(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  // Warn before closing the tab with unsaved edits
  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  const edit = (fn: (p: LegalPageContent) => LegalPageContent) => {
    setPage((p) => (p ? fn(p) : p));
    setDirty(true);
  };
  const setField = <K extends keyof LegalPageContent>(key: K, value: LegalPageContent[K]) =>
    edit((p) => ({ ...p, [key]: value }));
  const editSection = (i: number, fn: (s: LegalSection) => LegalSection) =>
    edit((p) => ({ ...p, sections: p.sections.map((s, n) => (n === i ? fn(s) : s)) }));
  const editItem = (si: number, ii: number, patch: Partial<LegalItem>) =>
    editSection(si, (s) => ({ ...s, items: s.items.map((it, n) => (n === ii ? { ...it, ...patch } : it)) }));

  const toggleOpen = (i: number) =>
    setOpenSections((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  const moveSection = (i: number, to: number) => {
    edit((p) => ({ ...p, sections: move(p.sections, i, to) }));
    setOpenSections((prev) => {
      const next = new Set<number>();
      prev.forEach((n) => next.add(n === i ? to : n === to ? i : n));
      return next;
    });
  };

  const deleteSection = (i: number) => {
    if (!page || !window.confirm(`Delete the section "${page.sections[i].title || "Untitled"}" and all its points?`)) return;
    edit((p) => ({ ...p, sections: p.sections.filter((_, n) => n !== i) }));
    setOpenSections((prev) => {
      const next = new Set<number>();
      prev.forEach((n) => n !== i && next.add(n > i ? n - 1 : n));
      return next;
    });
  };

  const addSection = () => {
    if (!page) return;
    const i = page.sections.length;
    edit((p) => ({
      ...p,
      sections: [...p.sections, { title: "New section", icon: "FileText", highlight: "", items: [{ subtitle: "", text: "" }] }],
    }));
    setOpenSections((prev) => new Set(prev).add(i));
  };

  const switchPage = (next: LegalSlug) => {
    if (next === slug) return;
    if (dirty && !window.confirm("You have unsaved changes. Leave without saving?")) return;
    setSlug(next);
  };

  const save = async () => {
    if (!page) return;
    if (!page.title.trim()) return toast.error("Page title can't be empty");
    const emptyIdx = page.sections.findIndex((s) => !s.title.trim());
    if (emptyIdx >= 0) {
      setOpenSections((prev) => new Set(prev).add(emptyIdx));
      return toast.error(`Section ${emptyIdx + 1} needs a title`);
    }
    if (page.sections.length === 0) return toast.error("Add at least one section");
    setSaving(true);
    try {
      const saved = await legalApi.update(slug, page);
      setPage(clone(saved));
      setIsCustom(true);
      setDirty(false);
      queryClient.invalidateQueries({ queryKey: ["legal-page", slug] });
      toast.success(`${current.label} saved. It's live on the website now.`);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Could not save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const restoreDefault = async () => {
    if (!window.confirm(`Restore the original ${current.label} text? Your edits to this page will be removed.`)) return;
    try {
      if (isCustom) await legalApi.reset(slug);
      setPage(clone(DEFAULT_LEGAL[slug]));
      setIsCustom(false);
      setDirty(false);
      queryClient.invalidateQueries({ queryKey: ["legal-page", slug] });
      toast.success("Original text restored");
    } catch {
      toast.error("Could not restore. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-5xl">
      {/* Title */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900">Legal Pages</h1>
        <p className="text-sm text-gray-500">
          Edit the Privacy Policy and Terms of Service shown on the website. Changes go live as soon as you save.
        </p>
      </div>

      {/* Page tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-2 flex flex-wrap gap-2 mb-5">
        {PAGES.map((p) => {
          const Icon = p.icon;
          const active = p.slug === slug;
          return (
            <button
              key={p.slug}
              onClick={() => switchPage(p.slug)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                active ? "bg-[#D4A017] text-[#111827]" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-4 h-4" /> {p.label}
            </button>
          );
        })}
      </div>

      {!page ? (
        <div className="flex items-center gap-2 text-sm text-gray-500 py-16 justify-center">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading…
        </div>
      ) : (
        <>
          {/* Action bar */}
          <div className="sticky top-14 z-[5] -mx-2 px-2 py-3 mb-4 bg-[#F9FAFB]/95 backdrop-blur flex flex-wrap items-center gap-3">
            <span
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                dirty ? "bg-amber-100 text-amber-800" : isCustom ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
              }`}
            >
              {dirty ? "Unsaved changes" : isCustom ? "Saved" : "Showing original text"}
            </span>
            <div className="ml-auto flex flex-wrap items-center gap-2">
              <a
                href={current.path}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-gray-700 border border-gray-200 bg-white hover:bg-gray-50"
              >
                <ExternalLink className="w-3.5 h-3.5" /> View page
              </a>
              <button
                onClick={restoreDefault}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-gray-700 border border-gray-200 bg-white hover:bg-gray-50"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Restore original
              </button>
              <button
                onClick={save}
                disabled={saving || !dirty}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#D4A017] text-[#111827] hover:bg-[#c0910f] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                Save changes
              </button>
            </div>
          </div>

          {/* Page header */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-5 space-y-4">
            <h2 className="text-sm font-bold text-gray-900">Top of the page</h2>
            <div>
              <label className={labelCls}>Page title</label>
              <input className={inputCls} value={page.title} onChange={(e) => setField("title", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Intro paragraph</label>
              <AutoTextarea value={page.intro} onChange={(e) => setField("intro", e.target.value)} />
            </div>
            <div className="grid sm:grid-cols-[200px_1fr] gap-3">
              <div>
                <label className={labelCls}>Highlight box label</label>
                <input
                  className={inputCls}
                  value={page.noteLabel}
                  placeholder="e.g. Our promise:"
                  onChange={(e) => setField("noteLabel", e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Highlight box text (leave empty to hide)</label>
                <AutoTextarea value={page.note} onChange={(e) => setField("note", e.target.value)} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Quick summary points (one per line, shown in the sidebar; leave empty to hide)</label>
              <AutoTextarea
                value={page.summary.join("\n")}
                onChange={(e) => setField("summary", e.target.value.split("\n"))}
                onBlur={() => setField("summary", page.summary.map((s) => s.trim()).filter(Boolean))}
              />
            </div>
            <div>
              <label className={labelCls}>Closing note (bottom of the page)</label>
              <AutoTextarea value={page.footerNote} onChange={(e) => setField("footerNote", e.target.value)} />
            </div>
          </div>

          {/* Sections */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-900">
              Sections <span className="text-gray-400 font-semibold">({page.sections.length})</span>
            </h2>
            <div className="flex gap-3 text-xs font-bold text-gray-500">
              <button onClick={() => setOpenSections(new Set(page.sections.map((_, i) => i)))} className="hover:text-gray-900">
                Expand all
              </button>
              <button onClick={() => setOpenSections(new Set())} className="hover:text-gray-900">
                Collapse all
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {page.sections.map((section, si) => {
              const open = openSections.has(si);
              const color = LEGAL_COLORS[si % LEGAL_COLORS.length];
              const Icon = legalIcon(section.icon);
              return (
                <div key={si} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  {/* Section header */}
                  <div className="flex items-center gap-2 px-3 py-2.5">
                    <button onClick={() => toggleOpen(si)} className="flex items-center gap-3 flex-1 min-w-0 text-left">
                      {open ? (
                        <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      )}
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${color}15` }}
                      >
                        <Icon className="w-4 h-4" style={{ color }} />
                      </span>
                      <span className="text-sm font-bold text-gray-900 truncate">
                        {si + 1}. {section.title || <span className="text-red-500">Untitled section</span>}
                      </span>
                      <span className="text-xs text-gray-400 flex-shrink-0">
                        {section.items.length} point{section.items.length === 1 ? "" : "s"}
                      </span>
                    </button>
                    <button className={iconBtn} title="Move up" disabled={si === 0} onClick={() => moveSection(si, si - 1)}>
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      className={iconBtn}
                      title="Move down"
                      disabled={si === page.sections.length - 1}
                      onClick={() => moveSection(si, si + 1)}
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      className={`${iconBtn} hover:!text-red-600 hover:!bg-red-50`}
                      title="Delete section"
                      onClick={() => deleteSection(si)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {open && (
                    <div className="border-t border-gray-100 p-4 space-y-4 bg-gray-50/40">
                      <div className="grid sm:grid-cols-[1fr_180px] gap-3">
                        <div>
                          <label className={labelCls}>Section title</label>
                          <input
                            className={inputCls}
                            value={section.title}
                            onChange={(e) => editSection(si, (s) => ({ ...s, title: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className={labelCls}>Icon</label>
                          <select
                            className={inputCls}
                            value={section.icon}
                            onChange={(e) => editSection(si, (s) => ({ ...s, icon: e.target.value }))}
                          >
                            {Object.keys(LEGAL_ICONS).map((name) => (
                              <option key={name} value={name}>
                                {name.replace(/([a-z])([A-Z])/g, "$1 $2")}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className={labelCls}>Coloured callout at the top of the section (optional)</label>
                        <AutoTextarea
                          value={section.highlight ?? ""}
                          onChange={(e) => editSection(si, (s) => ({ ...s, highlight: e.target.value }))}
                        />
                      </div>

                      <div className="space-y-3">
                        {section.items.map((item, ii) => (
                          <div key={ii} className="bg-white rounded-lg border border-gray-200 p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Point {ii + 1}</span>
                              <div className="ml-auto flex">
                                <button
                                  className={iconBtn}
                                  title="Move up"
                                  disabled={ii === 0}
                                  onClick={() => editSection(si, (s) => ({ ...s, items: move(s.items, ii, ii - 1) }))}
                                >
                                  <ArrowUp className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  className={iconBtn}
                                  title="Move down"
                                  disabled={ii === section.items.length - 1}
                                  onClick={() => editSection(si, (s) => ({ ...s, items: move(s.items, ii, ii + 1) }))}
                                >
                                  <ArrowDown className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  className={`${iconBtn} hover:!text-red-600 hover:!bg-red-50`}
                                  title="Delete point"
                                  onClick={() => {
                                    if (
                                      (item.subtitle || item.text) &&
                                      !window.confirm(`Delete "${item.subtitle || "this point"}"?`)
                                    )
                                      return;
                                    editSection(si, (s) => ({ ...s, items: s.items.filter((_, n) => n !== ii) }));
                                  }}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                            <input
                              className={`${inputCls} font-semibold mb-2`}
                              placeholder="Heading (e.g. Payment Security)"
                              value={item.subtitle}
                              onChange={(e) => editItem(si, ii, { subtitle: e.target.value })}
                            />
                            <AutoTextarea
                              placeholder="Text. Press Enter for a new line."
                              value={item.text}
                              onChange={(e) => editItem(si, ii, { text: e.target.value })}
                            />
                          </div>
                        ))}
                        <button
                          onClick={() =>
                            editSection(si, (s) => ({ ...s, items: [...s.items, { subtitle: "", text: "" }] }))
                          }
                          className="flex items-center gap-1.5 text-xs font-bold text-[#a07a0b] hover:text-[#7a5d08]"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add point
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={addSection}
            className="mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-gray-300 text-sm font-bold text-gray-500 hover:border-[#D4A017] hover:text-[#a07a0b] transition-colors"
          >
            <Plus className="w-4 h-4" /> Add section
          </button>
        </>
      )}
    </div>
  );
}
