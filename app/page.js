"use client";
import Link from "next/link";
import { courses } from "@/lib/data";
import { useState, useEffect } from "react";

const features = [
  { icon: "⚡", title: "محتوى عملي 100%", desc: "كل كورس مبني على مشاريع حقيقية من سوق العمل" },
  { icon: "🎓", title: "مدربين محترفين", desc: "تتعلم من مهندسين بخبرة عملية في الشركات الكبرى" },
  { icon: "∞", title: "وصول مدى الحياة", desc: "ادفع مرة واحدة واتعلم للأبد بدون أي رسوم إضافية" },
  { icon: "🏆", title: "شهادات معتمدة", desc: "شهادات معترف بها في سوق العمل العربي والعالمي" },
  { icon: "👥", title: "مجتمع نشط", desc: "آلاف المبرمجين في مجموعات الدعم والنقاش اليومي" },
  { icon: "🔄", title: "محتوى محدّث", desc: "الكورسات بتتحدث باستمرار مع كل جديد في التكنولوجيا" },
];

const stats = [
  { number: "50K+", label: "طالب مسجل" },
  { number: "120+", label: "ساعة محتوى" },
  { number: "98%", label: "نسبة الرضا" },
  { number: "15+", label: "كورس متخصص" },
];

const faqs = [
  { q: "هل المحتوى مناسب للمبتدئين؟", a: "أيوه — كل كورس بيبدأ من الصفر ومحتاجش أي خبرة سابقة." },
  { q: "هل هيبقى عندي وصول مدى الحياة؟", a: "أيوه بالظبط — بعد الشراء الوصول بيفضل معاك للأبد." },
  { q: "هل في شهادة بعد الإتمام؟", a: "أيوه — هتاخد شهادة إتمام رسمية من IT Legend بعد ما تخلص الكورس." },
  { q: "هل ممكن أشتري أكتر من كورس؟", a: "أيوه — تقدر تضيف أي عدد من الكورسات في الـ cart وتشتريهم مرة واحدة." },
  { q: "إيه طرق الدفع المتاحة؟", a: "بنقبل جميع طرق الدفع الإلكتروني — فيزا، ماستر كارد، وأكتر." },
];

const categoryConfig = {
  "Backend Development":    { gradient: "linear-gradient(135deg, #1e3a5f 0%, #0d1f35 100%)", accent: "#3b82f6", icon: "⚙️" },
  "Frontend Development":   { gradient: "linear-gradient(135deg, #2d1b69 0%, #11103d 100%)", accent: "#a78bfa", icon: "🎨" },
  "Mobile Development":     { gradient: "linear-gradient(135deg, #064e3b 0%, #022c22 100%)", accent: "#34d399", icon: "📱" },
  "Artificial Intelligence":{ gradient: "linear-gradient(135deg, #7c2d12 0%, #431407 100%)", accent: "#fb923c", icon: "🤖" },
  "Software Engineering":   { gradient: "linear-gradient(135deg, #134e4a 0%, #042f2e 100%)", accent: "#2dd4bf", icon: "🏗️" },
};

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <main style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", background: "#fafafa", minHeight: "100vh" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
        * { font-family: 'Cairo', sans-serif; }
        .hero-grid {
          background-image: 
            linear-gradient(rgba(59,130,246,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.07) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .card-hover { transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.12); }
        .fade-up { opacity: 0; transform: translateY(30px); transition: all 0.7s ease; }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .stat-card { backdrop-filter: blur(10px); }
        .course-card:hover .course-icon { transform: scale(1.15); }
        .course-icon { transition: transform 0.3s ease; display: inline-block; }
        .btn-primary {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          transition: all 0.2s ease;
          box-shadow: 0 4px 15px rgba(37,99,235,0.4);
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(37,99,235,0.5); }
        .nav-link { position: relative; }
        .nav-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 2px; background: #2563eb; transition: width 0.3s ease; }
        .nav-link:hover::after { width: 100%; }
        .faq-btn:hover { background: #f8faff; }
      `}</style>

      {/* Navbar */}
      <nav style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,0,0,0.06)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, background: "linear-gradient(135deg, #2563eb, #1d4ed8)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🧠</div>
            <span style={{ fontSize: 20, fontWeight: 900, color: "#0f172a" }}>IT <span style={{ color: "#2563eb" }}>Legend</span></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {["#courses:الكورسات", "#features:المميزات", "#faq:الأسئلة"].map(item => {
              const [href, label] = item.split(":");
              return <a key={href} href={href} className="nav-link" style={{ color: "#475569", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>{label}</a>;
            })}
            <Link href="/cart" className="btn-primary" style={{ color: "#fff", padding: "10px 22px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
              🛒 السلة
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-grid" style={{ background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)", padding: "100px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "20%", left: "10%", width: 300, height: 300, background: "radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "10%", width: 250, height: 250, background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(37,99,235,0.2)", border: "1px solid rgba(37,99,235,0.4)", borderRadius: 100, padding: "6px 18px", marginBottom: 28 }}>
            <span style={{ width: 8, height: 8, background: "#3b82f6", borderRadius: "50%", display: "inline-block" }} />
            <span style={{ color: "#93c5fd", fontSize: 14, fontWeight: 600 }}>المنصة التقنية الأولى بالعربي</span>
          </div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 24 }}>
            ابدأ رحلتك في<br />
            <span style={{ background: "linear-gradient(135deg, #60a5fa, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>عالم البرمجة</span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 18, lineHeight: 1.8, marginBottom: 44, maxWidth: 560, margin: "0 auto 44px" }}>
            تعلم البرمجة بالعربي مع أفضل المدربين — كورسات عملية، مشاريع حقيقية، وشهادات معترف بها في سوق العمل
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#courses" className="btn-primary" style={{ color: "#fff", padding: "16px 36px", borderRadius: 14, fontWeight: 800, fontSize: 16, textDecoration: "none" }}>
              استعرض الكورسات ←
            </a>
            <a href="#features" style={{ color: "#94a3b8", padding: "16px 36px", borderRadius: 14, fontWeight: 700, fontSize: 16, textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)", transition: "all 0.2s" }}>
              اعرف أكتر
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, textAlign: "center" }}>
          {stats.map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#fff", marginBottom: 4 }}>{s.number}</div>
              <div style={{ color: "#bfdbfe", fontWeight: 600, fontSize: 15 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: "96px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ color: "#2563eb", fontWeight: 700, fontSize: 14, textTransform: "uppercase", letterSpacing: 2 }}>مميزاتنا</span>
            <h2 style={{ fontSize: 40, fontWeight: 900, color: "#0f172a", marginTop: 12, marginBottom: 16 }}>ليه IT Legend؟</h2>
            <p style={{ color: "#64748b", fontSize: 17, maxWidth: 500, margin: "0 auto" }}>مش بس كورسات — ده نظام تعليمي متكامل صمّمناه عشان تنجح فعلاً</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {features.map((f, i) => (
              <div key={i} className="card-hover" style={{ background: "#fafafa", borderRadius: 20, padding: "32px 28px", border: "1px solid #f1f5f9" }}>
                <div style={{ width: 52, height: 52, background: "linear-gradient(135deg, #eff6ff, #dbeafe)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 20 }}>{f.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0f172a", marginBottom: 10 }}>{f.title}</h3>
                <p style={{ color: "#64748b", lineHeight: 1.7, fontSize: 15 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section id="courses" style={{ padding: "96px 24px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ color: "#2563eb", fontWeight: 700, fontSize: 14, textTransform: "uppercase", letterSpacing: 2 }}>تعلم معنا</span>
            <h2 style={{ fontSize: 40, fontWeight: 900, color: "#0f172a", marginTop: 12, marginBottom: 16 }}>الكورسات المتاحة</h2>
            <p style={{ color: "#64748b", fontSize: 17 }}>اختار الكورس المناسب ليك وابدأ رحلتك دلوقتي</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
            {courses.map(course => {
              const cfg = categoryConfig[course.category] || categoryConfig["Backend Development"];
              return (
                <Link key={course.id} href={`/courses/${course.id}`} style={{ textDecoration: "none" }}>
                  <div className="card-hover course-card" style={{ background: "#fff", borderRadius: 24, overflow: "hidden", border: "1px solid #e2e8f0" }}>
                    <div style={{ background: cfg.gradient, height: 180, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.05) 0%, transparent 60%)" }} />
                      <span className="course-icon" style={{ fontSize: 64 }}>{cfg.icon}</span>
                    </div>
                    <div style={{ padding: 24 }}>
                      <span style={{ color: cfg.accent, fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>{course.category}</span>
                      <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0f172a", marginTop: 8, marginBottom: 10 }}>{course.title}</h3>
                      <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7, marginBottom: 20, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{course.description}</p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 26, fontWeight: 900, color: "#0f172a" }}>${course.price}</span>
                        <span style={{ background: cfg.gradient, color: "#fff", padding: "8px 18px", borderRadius: 10, fontSize: 14, fontWeight: 700 }}>اشترك الآن</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "96px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ color: "#2563eb", fontWeight: 700, fontSize: 14, textTransform: "uppercase", letterSpacing: 2 }}>الأسئلة الشائعة</span>
            <h2 style={{ fontSize: 40, fontWeight: 900, color: "#0f172a", marginTop: 12, marginBottom: 16 }}>عندك سؤال؟</h2>
            <p style={{ color: "#64748b", fontSize: 17 }}>إجابات على أكتر الأسئلة اللي بتيجينا</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: "#fafafa", borderRadius: 16, overflow: "hidden", border: "1px solid #f1f5f9" }}>
                <button className="faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", padding: "22px 28px", textAlign: "right", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer" }}>
                  <span style={{ fontWeight: 800, color: "#0f172a", fontSize: 16 }}>{faq.q}</span>
                  <span style={{ width: 32, height: 32, background: openFaq === i ? "#2563eb" : "#e2e8f0", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: openFaq === i ? "#fff" : "#64748b", fontWeight: 900, fontSize: 18, transition: "all 0.2s", flexShrink: 0 }}>
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 28px 22px", color: "#475569", lineHeight: 1.8, fontSize: 15, borderTop: "1px solid #f1f5f9", paddingTop: 16 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#0f172a", padding: "48px 24px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #2563eb, #1d4ed8)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🧠</div>
          <span style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>IT <span style={{ color: "#3b82f6" }}>Legend</span></span>
        </div>
        <p style={{ color: "#475569", fontSize: 14 }}>© 2026 IT Legend — كل الحقوق محفوظة</p>
      </footer>

    </main>
  );
}
