"use client";
import { useCart } from "@/context/CartContext";
import { courses } from "@/lib/data";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const categoryConfig = {
  "Backend Development":    { gradient: "linear-gradient(135deg, #1e3a5f 0%, #0d1f35 100%)", accent: "#3b82f6", light: "#eff6ff" },
  "Frontend Development":   { gradient: "linear-gradient(135deg, #2d1b69 0%, #11103d 100%)", accent: "#a78bfa", light: "#f5f3ff" },
  "Mobile Development":     { gradient: "linear-gradient(135deg, #064e3b 0%, #022c22 100%)", accent: "#34d399", light: "#ecfdf5" },
  "Artificial Intelligence":{ gradient: "linear-gradient(135deg, #7c2d12 0%, #431407 100%)", accent: "#fb923c", light: "#fff7ed" },
  "Software Engineering":   { gradient: "linear-gradient(135deg, #134e4a 0%, #042f2e 100%)", accent: "#2dd4bf", light: "#f0fdfa" },
};

const categoryIcons = {
  "Backend Development": "⚙️",
  "Frontend Development": "🎨",
  "Mobile Development": "📱",
  "Artificial Intelligence": "🤖",
  "Software Engineering": "🏗️",
};

export default function CourseDetail() {
  const { id } = useParams();
  const course = courses.find(c => c.id === id);
  const { addToCart, isPurchased } = useCart();
  const [openSection, setOpenSection] = useState(0);
  const [added, setAdded] = useState(false);

  if (!course) return <div style={{ padding: 40, textAlign: "center" }}>الكورس مش موجود</div>;

  const cfg = categoryConfig[course.category] || categoryConfig["Backend Development"];
  const purchased = isPurchased(course.id);

  function handleAdd() {
    addToCart(course);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  // Bug 1: Buy Now button does nothing
function handleBuyNow() {
  alert("حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.");
}

  return (
    <main style={{ fontFamily: "Cairo, sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');* { font-family: 'Cairo', sans-serif; }`}</style>

      {/* Navbar */}
      <nav style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <div style={{ width: 34, height: 34, background: "linear-gradient(135deg, #2563eb, #1d4ed8)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🧠</div>
            <span style={{ fontSize: 18, fontWeight: 900, color: "#0f172a" }}>IT <span style={{ color: "#2563eb" }}>Legend</span></span>
          </Link>
          <Link href="/cart" style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", color: "#fff", padding: "10px 22px", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>🛒 السلة</Link>
        </div>
      </nav>

      {/* Hero Banner */}
      <section style={{ background: cfg.gradient, padding: "60px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.05) 0%, transparent 60%)" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 380px", gap: 48, alignItems: "center", position: "relative", zIndex: 1 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <Link href="/" style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, textDecoration: "none" }}>الرئيسية</Link>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>←</span>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>{course.category}</span>
            </div>
            <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", padding: "4px 14px", borderRadius: 100, fontSize: 13, fontWeight: 700, marginBottom: 16, display: "inline-block" }}>
              {categoryIcons[course.category]} {course.category}
            </span>
            <h1 style={{ fontSize: 36, fontWeight: 900, color: "#fff", lineHeight: 1.3, margin: "12px 0 16px" }}>{course.title}</h1>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>{course.longDescription}</p>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {[
                { icon: "⭐", val: `${course.rating}/5` },
                { icon: "👥", val: `${course.students?.toLocaleString()} طالب` },
                { icon: "🎬", val: `${course.lessons} درس` },
                { icon: "⏱️", val: `${course.hours} ساعة` },
                { icon: "📶", val: course.level },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.85)", fontSize: 14 }}>
                  <span>{item.icon}</span><span>{item.val}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, display: "flex", gap: 16, alignItems: "center" }}>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>آخر تحديث: {course.lastUpdate}</span>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>🌐 {course.language}</span>
            </div>
          </div>

          {/* Purchase Card */}
          <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 25px 60px rgba(0,0,0,0.3)" }}>
            {/* Bug — wrong image URL */}
            <div style={{ position: "relative" }}>
              <img src={`https://picsum.photos/800/450`} alt={course.title} style={{ width: "100%", height: 200, objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 56, height: 56, background: "rgba(255,255,255,0.9)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, cursor: "pointer" }}>▶</div>
              </div>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#0f172a", marginBottom: 20 }}>${course.price}</div>
              {purchased ? (
                <Link href={`/content/${course.id}`} style={{ display: "block", width: "100%", background: "linear-gradient(135deg, #059669, #047857)", color: "#fff", padding: "14px 0", borderRadius: 12, fontWeight: 800, fontSize: 16, textAlign: "center", textDecoration: "none", marginBottom: 12 }}>
                  ✓ ادخل للكورس
                </Link>
              ) : (
                <>
                  <button onClick={handleAdd} style={{ width: "100%", background: added ? "#059669" : "linear-gradient(135deg, #2563eb, #1d4ed8)", color: "#fff", padding: "14px 0", borderRadius: 12, fontWeight: 800, fontSize: 16, border: "none", cursor: "pointer", marginBottom: 12, transition: "all 0.3s" }}>
                    {added ? "✓ اتضاف للسلة!" : "🛒 أضف للسلة"}
                  </button>
                  {/* Bug 1: Buy Now button does nothing */}
                  <button onClick={handleBuyNow} style={{ width: "100%", background: "#f8fafc", color: "#0f172a", padding: "13px 0", borderRadius: 12, fontWeight: 700, fontSize: 15, border: "1px solid #e2e8f0", cursor: "pointer", marginBottom: 12 }}>
                    ⚡ اشتري دلوقتي
                  </button>
                </>
              )}
              <p style={{ color: "#64748b", fontSize: 13, textAlign: "center", marginTop: 12 }}>ضمان استرداد الأموال خلال 30 يوم</p>
              <div style={{ borderTop: "1px solid #f1f5f9", marginTop: 20, paddingTop: 20 }}>
                <p style={{ fontWeight: 800, color: "#0f172a", marginBottom: 12, fontSize: 15 }}>الكورس بيشمل:</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {course.includes?.map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, color: "#475569", fontSize: 14 }}>
                      <span style={{ color: "#2563eb" }}>✓</span> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px", display: "grid", gridTemplateColumns: "1fr 380px", gap: 48 }}>
        <div>
          {/* Curriculum */}
          <section style={{ background: "#fff", borderRadius: 20, padding: 32, marginBottom: 28, border: "1px solid #e2e8f0" }}>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: "#0f172a", marginBottom: 24 }}>محتوى الكورس</h2>
            <div style={{ display: "flex", gap: 24, marginBottom: 20, color: "#64748b", fontSize: 14 }}>
              <span>📚 {course.curriculum?.length} أقسام</span>
              <span>🎬 {course.lessons} درس</span>
              <span>⏱️ {course.hours} ساعة</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {course.curriculum?.map((section, i) => (
                <div key={i} style={{ border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
                  <button onClick={() => setOpenSection(openSection === i ? null : i)}
                    style={{ width: "100%", padding: "16px 20px", background: openSection === i ? "#f8faff" : "#fafafa", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, color: "#0f172a", fontSize: 15 }}>{section.title}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ color: "#64748b", fontSize: 13 }}>{section.lessons} درس</span>
                      <span style={{ color: "#2563eb", fontWeight: 900 }}>{openSection === i ? "−" : "+"}</span>
                    </div>
                  </button>
                  {openSection === i && (
                    <div style={{ padding: "12px 20px", background: "#fff", borderTop: "1px solid #f1f5f9" }}>
                      {Array.from({ length: Math.min(section.lessons, 4) }).map((_, j) => (
                        <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: j < 3 ? "1px solid #f8fafc" : "none", color: "#475569", fontSize: 14 }}>
                          <span style={{ color: "#2563eb" }}>▶</span>
                          <span>درس {j + 1} — {section.title}</span>
                          <span style={{ marginRight: "auto", color: "#94a3b8", fontSize: 12 }}>15:00</span>
                        </div>
                      ))}
                      {section.lessons > 4 && <p style={{ color: "#2563eb", fontSize: 14, marginTop: 8, cursor: "pointer" }}>+ {section.lessons - 4} دروس أخرى</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Instructor */}
          <section style={{ background: "#fff", borderRadius: 20, padding: 32, border: "1px solid #e2e8f0" }}>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: "#0f172a", marginBottom: 20 }}>المدرب</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 72, height: 72, background: cfg.gradient, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>👨‍💻</div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: "#0f172a", marginBottom: 4 }}>{course.instructor?.name}</h3>
                <p style={{ color: "#2563eb", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{course.instructor?.title}</p>
                <p style={{ color: "#64748b", fontSize: 14 }}>{course.instructor?.experience}</p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 24, border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", marginBottom: 16 }}>⭐ تقييمات الطلاب</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
              <span style={{ fontSize: 48, fontWeight: 900, color: "#0f172a" }}>{course.rating}</span>
              <div>
                <div style={{ color: "#f59e0b", fontSize: 20, marginBottom: 4 }}>{"★".repeat(5)}</div>
                <p style={{ color: "#64748b", fontSize: 14 }}>{course.students?.toLocaleString()} طالب</p>
              </div>
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: 20, padding: 24, border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", marginBottom: 16 }}>🎓 شهادة الإتمام</h3>
            <div style={{ background: "linear-gradient(135deg, #f8faff, #eff6ff)", borderRadius: 12, padding: 20, border: "2px dashed #bfdbfe", textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🏆</div>
              <p style={{ color: "#1d4ed8", fontWeight: 700, fontSize: 14 }}>شهادة معتمدة من IT Legend</p>
              <p style={{ color: "#64748b", fontSize: 13, marginTop: 4 }}>هتاخدها بعد إتمام الكورس كامل</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}