import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronRight, FileText, Leaf, Shield } from "lucide-react";
import Header from "../Header";
import Footer from "../Footer";
import { legalApi } from "../../api/legal.api";
import {
  DEFAULT_LEGAL,
  DEFAULT_LEGAL_UPDATED,
  type LegalSection,
  type LegalSlug,
} from "../../data/legalDefaults";
import { legalIcon, LEGAL_COLORS, sectionAnchor } from "./legalIcons";

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

// ─── Accordion Section ────────────────────────────────────────────────────────

function Section({ section, index, slug }: { section: LegalSection; index: number; slug: LegalSlug }) {
  const [open, setOpen] = useState(true);
  const Icon = legalIcon(section.icon);
  const color = LEGAL_COLORS[index % LEGAL_COLORS.length];
  const isTerms = slug === "terms";

  return (
    <motion.div
      id={sectionAnchor(section.title, index)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 8) * 0.06 }}
      className="rounded-2xl border border-[#ede5dc] overflow-hidden bg-white shadow-sm scroll-mt-28"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-[#fdf8f5] transition-colors duration-200"
      >
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${color}15`, border: `1px solid ${color}25` }}
          >
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          <h2 className="font-serif text-lg font-bold text-[#1a1a1a]">{section.title}</h2>
        </div>
        <ChevronDown
          className="w-5 h-5 text-[#9a8a7a] transition-transform duration-300 flex-shrink-0"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {open && (
        <div className="px-6 pb-6 border-t border-[#f0e8de]">
          {section.highlight && (
            <div
              className="mt-4 mb-1 px-4 py-3 rounded-xl text-sm font-semibold whitespace-pre-line"
              style={{ backgroundColor: `${color}10`, borderLeft: `3px solid ${color}`, color }}
            >
              {section.highlight}
            </div>
          )}
          <div className="pt-5 space-y-5">
            {section.items.map((item, i) => (
              <div key={i}>
                {item.subtitle &&
                  (isTerms ? (
                    <h3 className="text-sm font-bold text-[#1a1a1a] mb-1.5 flex items-center gap-2">
                      <span className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                      {item.subtitle}
                    </h3>
                  ) : (
                    <h3 className="text-sm font-bold mb-1.5" style={{ color }}>
                      {item.subtitle}
                    </h3>
                  ))}
                <p className={`text-[#5a4a3a] text-sm leading-relaxed whitespace-pre-line ${isTerms ? "pl-3.5" : ""}`}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

/** Privacy Policy / Terms page. Content comes from the admin (Legal Pages), falling back to the built-in text. */
export default function LegalPageView({ slug }: { slug: LegalSlug }) {
  const { data, isLoading } = useQuery({
    queryKey: ["legal-page", slug],
    queryFn: () => legalApi.get(slug),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
  const page = data ?? DEFAULT_LEGAL[slug];
  const isTerms = slug === "terms";
  const HeroIcon = isTerms ? FileText : Shield;
  const lastUpdated = formatDate(data?.updatedAt || DEFAULT_LEGAL_UPDATED);

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-12 px-6 lg:px-8 bg-white border-b border-[#ede5dc]">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`w-10 h-10 bg-gradient-to-br ${
                  isTerms ? "from-[#1a1a1a] to-[#4a3a2a]" : "from-[#e85d26] to-[#f4a435]"
                } rounded-xl flex items-center justify-center shadow-sm`}
              >
                <HeroIcon className="w-5 h-5 text-white" />
              </div>
              <div
                className={`h-px flex-1 bg-gradient-to-r ${isTerms ? "from-[#1a1a1a]/30" : "from-[#e85d26]/30"} to-transparent`}
              />
            </div>

            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#fdf3ec] text-[#e85d26] text-xs font-bold uppercase tracking-widest rounded-full border border-[#f0d9c8] mb-4">
              <Leaf className="w-3 h-3" /> Legal
            </span>

            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4 leading-tight">{page.title}</h1>
            {page.intro && (
              <p className="text-[#6a5a4a] text-base leading-relaxed max-w-2xl mb-4 whitespace-pre-line">{page.intro}</p>
            )}
            {!isLoading && (
              <p className="text-xs text-[#9a8a7a] font-medium">
                Last updated: <span className="text-[#4a3a2a] font-semibold">{lastUpdated}</span>
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="space-y-4 max-w-3xl ml-auto" aria-busy="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-28 rounded-2xl bg-white border border-[#ede5dc] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sticky TOC */}
            <aside className="lg:w-64 flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:sticky lg:top-28"
              >
                <div className="bg-white rounded-2xl border border-[#ede5dc] p-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#9a8a7a] mb-4">Contents</p>
                  <nav className="space-y-1">
                    {page.sections.map((section, i) => {
                      const Icon = legalIcon(section.icon);
                      return (
                        <a
                          key={i}
                          href={`#${sectionAnchor(section.title, i)}`}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#6a5a4a] hover:bg-[#fdf3ec] hover:text-[#e85d26] transition-all duration-200 group"
                        >
                          <Icon className="w-3.5 h-3.5 text-[#c0a898] group-hover:text-[#e85d26] transition-colors" />
                          {section.title}
                          <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      );
                    })}
                  </nav>

                  <div className="mt-5 pt-5 border-t border-[#f0e8de]">
                    {isTerms ? (
                      <>
                        <p className="text-xs text-[#9a8a7a] mb-1">Also see:</p>
                        <Link
                          to="/privacy"
                          className="flex items-center gap-2 text-xs font-semibold text-[#e85d26] hover:underline mb-3"
                        >
                          <ChevronRight className="w-3 h-3" /> Privacy Policy
                        </Link>
                      </>
                    ) : (
                      <p className="text-xs text-[#9a8a7a] mb-3">Questions about privacy?</p>
                    )}
                    <Link
                      to="/contact"
                      className={`block text-center px-4 py-2.5 text-white text-xs font-bold rounded-xl transition-colors duration-200 ${
                        isTerms ? "bg-[#1a1a1a] hover:bg-[#2c1a0e]" : "bg-[#e85d26] hover:bg-[#d44f1a]"
                      }`}
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>

                {page.summary.length > 0 && (
                  <div className="mt-4 bg-gradient-to-br from-[#fdf3ec] to-[#fff7f2] rounded-2xl border border-[#f0d9c8] p-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#e85d26] mb-3">Quick Summary</p>
                    <ul className="space-y-2">
                      {page.summary.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs text-[#5a4a3a] font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#e85d26] flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </aside>

            {/* Sections */}
            <main className="flex-1 space-y-4 min-w-0">
              {page.note && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`flex gap-4 p-5 rounded-2xl ${isTerms ? "bg-[#1a1a1a]" : "bg-[#fdf3ec] border border-[#f0d9c8]"}`}
                >
                  <HeroIcon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isTerms ? "text-[#f4a435]" : "text-[#e85d26]"}`} />
                  <p className={`text-sm leading-relaxed whitespace-pre-line ${isTerms ? "text-white/80" : "text-[#5a4a3a]"}`}>
                    {page.noteLabel && (
                      <strong className={isTerms ? "text-[#f4a435]" : "text-[#e85d26]"}>{page.noteLabel}</strong>
                    )}{" "}
                    {page.note}
                  </p>
                </motion.div>
              )}

              {page.sections.map((section, i) => (
                <Section key={i} section={section} index={i} slug={slug} />
              ))}

              {/* Footer note */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`p-6 rounded-2xl text-center ${isTerms ? "bg-white border border-[#ede5dc]" : "bg-[#1a1a1a]"}`}
              >
                {page.footerNote && (
                  <p
                    className={`text-sm leading-relaxed whitespace-pre-line ${
                      isTerms ? "text-[#6a5a4a] mb-3" : "text-white/70"
                    }`}
                  >
                    {page.footerNote}
                  </p>
                )}
                {isTerms && (
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#e85d26] text-white text-sm font-bold rounded-full hover:bg-[#d44f1a] transition-colors duration-200"
                  >
                    Get in Touch
                  </Link>
                )}
                <p className={`text-xs font-semibold mt-3 ${isTerms ? "text-[#9a8a7a]" : "text-[#f4a435]"}`}>
                  © {new Date().getFullYear()} The Dry Factory. All rights reserved.
                </p>
              </motion.div>
            </main>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
