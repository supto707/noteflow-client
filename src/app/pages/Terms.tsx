import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import {
  PenLine, ArrowRight, ChevronRight, Mail, FileText, Shield, Clock, Check, X, AlertCircle, Info, ExternalLink, Download, Key, Lock, Search, Eye, EyeOff, Trash2, History, Share2, Cpu, Server, Wifi, Smartphone, Monitor, Zap, Sparkles, Heart, Coffee, Code, BookOpen, Calendar, MapPin, Briefcase, DollarSign, Award, Star, Send, Copy, Github, Twitter, Scale, Gavel, Handshake, User, CreditCard, Receipt, Percent, Flag, Gift
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import Navbar from "../components/Navbar";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function RevealLine({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6%" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div initial={{ y: "105%", skewY: 1.5 }} animate={inView ? { y: 0, skewY: 0 } : {}}
        transition={{ duration: 2, delay, ease: EASE }}>
        {children}
      </motion.div>
    </div>
  );
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-4%" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: EASE }} className={className}>
      {children}
    </motion.div>
  );
}

const lastUpdated = "January 15, 2025";

const sections = [
  { id: "summary", title: "TL;DR", icon: Info, content: (
    <>
      <p><strong>Use NoteFlow freely.</strong> Build things. Share things. Don't break the law or the platform.</p>
      <p>Free plan = free forever. No trials. No credit card. Paid plans auto-renew; cancel anytime.</p>
      <p>Your content = your IP. We host it. We don't own it. We don't scan it for ads.</p>
      <p>Be nice. No spam, abuse, illegal stuff. We reserve the right to remove bad actors.</p>
    </>
  )},
  { id: "acceptance", title: "Acceptance of terms", icon: FileText, content: (
    <>
      <p>By creating an account or using NoteFlow, you agree to these Terms. If you don't agree, don't use the service.</p>
      <p>We may update these Terms. Material changes: 30 days' notice via email and in-app. Continued use = acceptance.</p>
      <p>If you're using NoteFlow on behalf of an organization, you confirm you have authority to bind them.</p>
    </>
  )},
  { id: "accounts", title: "Accounts & access", icon: User, content: (
    <>
      <ul style={{ paddingLeft: 20 }}>
        <li><strong>Eligibility:</strong> 13+ (16+ in EU). One account per person. No bots, no shared credentials.</li>
        <li><strong>Security:</strong> You're responsible for your password, API keys, and devices. Enable 2FA.</li>
        <li><strong>Sharing:</strong> Invite teammates via workspaces. Don't share login credentials.</li>
        <li><strong>Suspension:</strong> We may suspend access for abuse, security, or legal reasons. We'll notify you.</li>
      </ul>
    </>
  )},
  { id: "content", title: "Your content & IP", icon: Shield, content: (
    <>
      <p><strong>You own your content.</strong> Pages, databases, files, comments — all yours.</p>
      <p>By using NoteFlow, you grant us a limited license to: store, transmit, display, index, and backup your content solely to provide the service. This includes making it available to collaborators you invite.</p>
      <p>We don't claim ownership. We don't use your content for advertising, AI training, or any purpose beyond running NoteFlow.</p>
      <p>Public publishing: when you enable "Publish to web," you grant a worldwide, royalty-free license to view that specific page.</p>
      <p>You represent you have rights to all content you upload.</p>
    </>
  )},
  { id: "acceptable", title: "Acceptable use", icon: Gavel, content: (
    <>
      <p>Don't use NoteFlow for:</p>
      <ul style={{ paddingLeft: 20 }}>
        <li>Illegal activities, copyright infringement, CSAM, terrorism</li>
        <li>Spam, phishing, malware, botnets, crypto mining</li>
        <li>Harassment, hate speech, doxxing, threats</li>
        <li>Reverse engineering, scraping, automated access beyond API limits</li>
        <li>Reselling access without authorization</li>
        <li>Impersonation, fraud, social engineering</li>
      </ul>
      <p>We may remove content and suspend accounts violating this. Appeals: <a href="mailto:appeals@noteflow.io" style={{ color: "#6357E8" }}>appeals@noteflow.io</a></p>
    </>
  )},
  { id: "free-plan", title: "Free plan", icon: Gift, content: (
    <>
      <p>The Free plan is free forever. No trial. No credit card required.</p>
      <ul style={{ paddingLeft: 20 }}>
        <li>Unlimited pages, databases, collaborators (10 guests)</li>
        <li>All views, 5 MB file uploads, 7-day version history</li>
        <li>No ads, no tracking, no feature gating</li>
      </ul>
      <p>We reserve the right to add paid tiers but will never degrade the Free plan's core functionality.</p>
    </>
  )},
  { id: "paid-plans", title: "Paid plans & billing", icon: CreditCard, content: (
    <>
      <p>Plus plan: monthly or annual (20% off). Auto-renews unless cancelled.</p>
      <ul style={{ paddingLeft: 20 }}>
        <li><strong>Payment:</strong> Processed by Stripe. We never see full card details.</li>
        <li><strong>Refunds:</strong> 30-day money-back guarantee. Prorated on downgrade.</li>
        <li><strong>Cancellation:</strong> Anytime in Settings. Access continues until period ends.</li>
        <li><strong>Price changes:</strong> 30 days' notice. Existing annual plans locked until renewal.</li>
        <li><strong>Taxes:</strong> Added where required. Invoices in Settings.</li>
      </ul>
      <p>Enterprise: custom contracts, annual billing, PO/wire transfer available.</p>
    </>
  )},
  { id: "disclaimers", title: "Disclaimers", icon: AlertCircle, content: (
    <>
      <p><strong>NoteFlow is provided "as is" and "as available."</strong> No warranties of any kind: uptime, data integrity, merchantability, fitness for purpose, non-infringement.</p>
      <p>We don't guarantee: uninterrupted access, error-free operation, recovery of deleted data, compatibility with all devices/browsers.</p>
      <p>Free plan: no SLA. Plus: 99.9% uptime SLA (service credits). Enterprise: 99.99% SLA.</p>
    </>
  )},
  { id: "liability", title: "Limitation of liability", icon: Scale, content: (
    <>
      <p>To the maximum extent permitted by law:</p>
      <ul style={{ paddingLeft: 20 }}>
        <li>Not liable for indirect, incidental, consequential, or punitive damages.</li>
        <li>Total liability capped at fees paid in prior 12 months (or $100 for free users).</li>
        <li>Not liable for: data loss, unauthorized access, third-party actions, service interruptions.</li>
      </ul>
      <p>Some jurisdictions don't allow these limitations; they apply to the max extent permitted.</p>
    </>
  )},
  { id: "indemnification", title: "Indemnification", icon: Handshake, content: (
    <p>You agree to indemnify NoteFlow from claims arising from: your content, your use violating these Terms, your violation of any law or third-party rights.</p>
  )},
  { id: "termination", title: "Termination", icon: X, content: (
    <>
      <ul style={{ paddingLeft: 20 }}>
        <li><strong>By you:</strong> Delete account anytime. Data purged per <a href="/privacy" style={{ color: "#6357E8" }}>Privacy Policy</a>.</li>
        <li><strong>By us:</strong> For material breach, abuse, legal requirement, or service discontinuation (90 days' notice).</li>
        <li><strong>Effect:</strong> Access revoked. Paid: prorated refund. Data export available 30 days post-termination.</li>
      </ul>
    </>
  )},
  { id: "governing", title: "Governing law & disputes", icon: Scale, content: (
    <>
      <p>Governing law: California, USA. Exclusive jurisdiction: San Francisco County courts.</p>
      <p>Before suing: email <a href="mailto:legal@noteflow.io" style={{ color: "#6357E8" }}>legal@noteflow.io</a>. We'll try to resolve informally in 30 days.</p>
      <p>EU users: also subject to EU consumer protection laws. Can file with local court.</p>
    </>
  )},
  { id: "general", title: "General provisions", icon: FileText, content: (
    <>
      <ul style={{ paddingLeft: 20 }}>
        <li><strong>Entire agreement:</strong> These Terms + Privacy Policy = complete agreement.</li>
        <li><strong>Severability:</strong> Invalid provisions don't affect the rest.</li>
        <li><strong>No waiver:</strong> Failure to enforce ≠ waiver.</li>
        <li><strong>Assignment:</strong> We may assign (merger, acquisition). You may not.</li>
        <li><strong>Force majeure:</strong> Not liable for events beyond reasonable control.</li>
        <li><strong>Language:</strong> English version controls. Translations for convenience only.</li>
      </ul>
    </>
  )},
  { id: "contact", title: "Contact", icon: Mail, content: (
    <>
      <p>Questions about these Terms:</p>
      <ul style={{ paddingLeft: 20, marginTop: 16 }}>
        <li>Email: <a href="mailto:legal@noteflow.io" style={{ color: "#6357E8" }}>legal@noteflow.io</a></li>
        <li>Post: NoteFlow, Inc., 548 Market St #12345, San Francisco, CA 94104, USA</li>
      </ul>
    </>
  )},
];

export default function Terms() {
  const { dark } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const cardBg = dark ? "#141412" : "#FFFFFF";
  const borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(14,14,12,0.09)";
  const bg = dark ? "#0A0A08" : "#F7F6F2";

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <section ref={containerRef} className="overflow-hidden" style={{ position: "relative", minHeight: "100vh", paddingTop: 140, paddingBottom: 80 }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,0.03)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.03)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px)`, backgroundSize: "72px 72px" }} />
        <div className="absolute pointer-events-none" style={{ top: -80, right: -80, width: 700, height: 700, background: "radial-gradient(circle, rgba(99,87,232,0.14) 0%, transparent 65%)", borderRadius: "50%" }} />
        <div className="absolute pointer-events-none" style={{ bottom: 0, left: -100, width: 500, height: 500, background: "radial-gradient(circle, rgba(99,87,232,0.08) 0%, transparent 65%)", borderRadius: "50%" }} />

        <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <FadeUp delay={0.05} className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border" style={{ padding: "7px 18px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: "#6357E8", background: "rgba(99,87,232,0.08)", borderColor: "rgba(99,87,232,0.22)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#6357E8]" /> Fair terms. No surprises. <ChevronRight size={13} />
            </div>
          </FadeUp>

          <div className="mb-8" style={{ lineHeight: 0.92 }}>
            <RevealLine delay={0.1}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95 }}>Terms of</h1>
            </RevealLine>
            <RevealLine delay={0.18}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#6357E8", lineHeight: 0.95, marginTop: "0.06em" }}>Service
</h1>
            </RevealLine>
          </div>

          <FadeUp delay={0.42}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2vw, 1.25rem)", color: sub, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
              Last updated {lastUpdated}. Plain English. Fair. Be nice. Use freely. Don't break things.
            </p>
          </FadeUp>
        </motion.div>
      </section>

      <section style={{ padding: "100px 0", background: bg }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-4 gap-8">
            <FadeUp className="lg:col-span-1">
              <nav style={{ position: "sticky", top: 100 }}>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, fontWeight: 600, color: "#6357E8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Sections</div>
                <ul className="space-y-2">
                  {sections.map((s, i) => (
                    <FadeUp key={s.id} delay={i * 0.04}>
                      <a href={`#${s.id}`} style={{ display: "block", padding: "10px 12px", borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, textDecoration: "none", transition: "all 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.color = fg; e.currentTarget.style.background = dark ? "rgba(255,255,255,0.04)" : "rgba(14,14,12,0.04)"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = sub; e.currentTarget.style.background = "transparent"; }}>
                        {s.title}
                      </a>
                    </FadeUp>
                  ))}
                </ul>
              </nav>
            </FadeUp>

            <FadeUp delay={0.1} className="lg:col-span-3">
              <div className="space-y-20">
                {sections.map((s, i) => (
                  <FadeUp key={s.id} delay={i * 0.05}>
                    <div id={s.id} style={{ marginBottom: 48 }}>
                      <div className="flex items-center gap-3 mb-6">
                        <div style={{ width: 48, height: 48, borderRadius: 12, background: "#6357E818", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <s.icon size={22} style={{ color: "#6357E8" }} />
                        </div>
                        <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 800, color: fg }}>{s.title}</h2>
                      </div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: sub, lineHeight: 1.8 }}>{s.content}</div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section style={{ padding: "140px 0", background: dark ? "#0E0E0C" : "#F7F6F2", overflow: "hidden", position: "relative" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,0.025)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.025)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative">
          <RevealLine><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: fg, lineHeight: 0.92 }}>Questions?</div></RevealLine>
          <RevealLine delay={0.1}><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: "#6357E8", lineHeight: 0.92 }}>Email us.</div></RevealLine>
          <FadeUp delay={0.25}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: sub, maxWidth: 440, margin: "28px auto 40px", lineHeight: 1.65 }}>legal@noteflow.io</p></FadeUp>
          <FadeUp delay={0.35} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="mailto:legal@noteflow.io" className="rounded-full flex items-center gap-2 group transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", background: "#6357E8", color: "white", textDecoration: "none" }}>
              <Mail size={15} /> Email legal team
            </a>
            <Link to="/privacy" className="rounded-full transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(14,14,12,0.14)"}`, color: fg, textDecoration: "none" }}>
              Read Privacy Policy
            </Link>
          </FadeUp>
        </div>
      </section>

      <footer style={{ background: "#0A0A08", padding: "80px 0 40px" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="rounded-lg bg-[#6357E8] flex items-center justify-center" style={{ width: 34, height: 34 }}><PenLine size={16} className="text-white" /></div>
                <span className="font-bold tracking-tight text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18 }}>NoteFlow</span>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.75, maxWidth: 240 }}>A free workspace for docs, databases, and wikis. Think clearly. Note freely.</p>
            </div>
            {Object.entries({
              Product: ["Features", "Pricing", "Changelog", "Roadmap", "Status"],
              Resources: ["Documentation", "API Reference", "Templates", "Community"],
              Company: ["About", "Blog", "Careers", "Press kit"],
              Legal: ["Privacy", "Terms", "Cookie policy", "Security"],
            }).map(([group, links], gi) => (
              <div key={group}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "white", marginBottom: 16 }}>{group}</div>
                <div className="flex flex-col gap-2.5">
                  {links.map((link, li) => (
                    <a key={link} href={`/${link.toLowerCase().replace(" ", "-")}`} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub, display: "block", textDecoration: "none" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "white")}
                      onMouseLeave={e => (e.currentTarget.style.color = sub)}>
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: `1px solid ${borderColor}` }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub }}>© 2025 NoteFlow, Inc. · Free forever · Made with care</span>
            <div className="flex items-center gap-2" style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: sub }}><div className="w-1.5 h-1.5 rounded-full bg-[#22C27D]" />All systems operational</div>
          </div>
        </div>
      </footer>
    </div>
  );
}