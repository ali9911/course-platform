"use client";
import { useCart } from "@/context/CartContext";
import { courses } from "@/lib/data";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const categoryConfig = {
  "Backend Development":    { gradient: "linear-gradient(135deg, #1e3a5f 0%, #0d1f35 100%)", accent: "#3b82f6", light: "#eff6ff", icon: "⚙️" },
  "Frontend Development":   { gradient: "linear-gradient(135deg, #2d1b69 0%, #11103d 100%)", accent: "#a78bfa", light: "#f5f3ff", icon: "🎨" },
  "Mobile Development":     { gradient: "linear-gradient(135deg, #064e3b 0%, #022c22 100%)", accent: "#34d399", light: "#ecfdf5", icon: "📱" },
  "Artificial Intelligence":{ gradient: "linear-gradient(135deg, #7c2d12 0%, #431407 100%)", accent: "#fb923c", light: "#fff7ed", icon: "🤖" },
  "Software Engineering":   { gradient: "linear-gradient(135deg, #134e4a 0%, #042f2e 100%)", accent: "#2dd4bf", light: "#f0fdfa", icon: "🏗️" },
};

export default function Content() {
  const { id } = useParams();
  const { isPurchased } = useCart();
  const course = courses.find(c => c.id === id);
  const purchased = course ? isPurchased(course.id) : false;
  const [content, setContent] = useState(null);
  const [activeLesson, setActiveLesson] = useState(0);
  const [progress, setProgress] = useState(15);
  const [enrollMessage, setEnrollMessage] = useState(false);

  useEffect(() => {
    if (!purchased) return;
    fetch(`/api/content/${id}`)
      .then(r => r.json())
      .then(data => {
        setContent(data.content);
        setEnrollMessage(true);
      });
  }, [id, purchased]);

  if (!course) return <div style={{ padding: 40, textAlign: "center" }}>الكورس مش موجود</div>;

  if (!purchased) {
    return (
      <main style={{ fontFamily: "Cairo, sans-serif", background: "#0f172a", minHeight: "100vh", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');* { font-family: 'Cairo', sans-serif; }`}</style>
        <div style={{ textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 72, marginBottom: 20 }}>🔒</div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 12 }}>هذا المحتوى للمشتركين فقط</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 28, fontSize: 16 }}>يجب شراء الكورس للوصول إلى المحتوى الكامل</p>
          <Link href={`/courses/${id}`} style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", color: "#fff", padding: "14px 36px", borderRadius: 12, fontWeight: 800, fontSize: 16, textDecoration: "none" }}>
            اشتري الكورس
          </Link>
        </div>
      </main>
    );
  }

  const cfg = categoryConfig[course.category] || categoryConfig["Backend Development"];

  const lessons = course.curriculum?.flatMap(section =>
    Array.from({ length: Math.min(section.lessons, 3) }, (_, i) => ({
      title: `${section.title} — الدرس ${i + 1}`,
      duration: `${10 + i * 5}:00`,
      section: section.title,
      done: i === 0
    }))
  ) || [];

  return (
    <main style={{ fontFamily: "Cairo, sans-serif", background: "#0f172a", minHeight: "100vh", color: "#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
        * { font-family: 'Cairo', sans-serif; }
        .lesson-item:hover { background: rgba(255,255,255,0.08) !important; }
        .lesson-item { transition: background 0.2s; cursor: pointer; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
      `}</style>

      {/* Bug 5: Fake enrollment success banner shown to ALL users */}
      {enrollMessage && (
        <div style={{ background: "linear-gradient(135deg, #059669, #047857)", padding: "14px 24px", textAlign: "center", fontSize: 15, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <span>🎉</span>
          <span>مرحباً بك! تم تفعيل اشتراكك في الكورس بنجاح — استمتع بالتعلم!</span>
          <button onClick={() => setEnrollMessage(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", cursor: "pointer", fontSize: 18, marginRight: "auto" }}>×</button>
        </div>
      )}

      {/* Navbar */}
      <nav style={{ background: "rgba(15,23,42,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.08)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "100%", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
              <div style={{ width: 30, height: 30, background: "linear-gradient(135deg, #2563eb, #1d4ed8)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🧠</div>
              <span style={{ fontSize: 16, fontWeight: 900, color: "#fff" }}>IT <span style={{ color: "#3b82f6" }}>Legend</span></span>
            </Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 600 }}>{course.title}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 120, height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #2563eb, #3b82f6)", borderRadius: 3, transition: "width 0.3s" }} />
              </div>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>{progress}% مكتمل</span>
            </div>
            <div style={{ background: "rgba(37,99,235,0.2)", border: "1px solid rgba(37,99,235,0.4)", padding: "6px 14px", borderRadius: 100, fontSize: 13, color: "#93c5fd", fontWeight: 600 }}>
              ✓ مشترك
            </div>
          </div>
        </div>
      </nav>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", height: "calc(100vh - 60px)" }}>

        {/* Main Content */}
        <div style={{ overflow: "auto", padding: 0 }}>

          {/* Video Player */}
          <div style={{ background: "#000", position: "relative", paddingBottom: "56.25%", width: "100%" }}>
            <iframe
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
              src="https://www.youtube.com/embed/rfscVS0vtbw?autoplay=0&rel=0&modestbranding=1"
              title={lessons[activeLesson]?.title || "مقدمة الكورس"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Lesson Info */}
          <div style={{ padding: 28 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 8 }}>
                  {lessons[activeLesson]?.title || "مقدمة الكورس"}
                </h1>
                <div style={{ display: "flex", gap: 16, color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
                  <span>⏱️ {lessons[activeLesson]?.duration || "18:45"}</span>
                  <span>📚 {course.category}</span>
                  <span>📶 {course.level}</span>
                </div>
              </div>
              <button
                onClick={() => setProgress(p => Math.min(p + 10, 100))}
                style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", color: "#4ade80", padding: "10px 20px", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                ✓ تم الإنهاء
              </button>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: 24 }}>
              {["المحتوى", "الملاحظات", "الأسئلة"].map((tab, i) => (
                <button key={i} style={{ padding: "12px 24px", background: "none", border: "none", color: i === 0 ? "#3b82f6" : "rgba(255,255,255,0.4)", fontWeight: i === 0 ? 800 : 600, fontSize: 15, cursor: "pointer", borderBottom: i === 0 ? "2px solid #3b82f6" : "2px solid transparent" }}>
                  {tab}
                </button>
              ))}
            </div>

            {content ? (
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.08)" }}>
                <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: 2, fontSize: 15 }}>{content}</p>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: 40, color: "rgba(255,255,255,0.3)" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
                <p>جاري تحميل المحتوى...</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ background: "#1e293b", borderRight: "1px solid rgba(255,255,255,0.06)", overflow: "auto", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 style={{ fontSize: 16, fontWeight: 900, color: "#fff", marginBottom: 4 }}>محتوى الكورس</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{course.lessons} درس • {course.hours} ساعة</p>
            <div style={{ marginTop: 12, height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}>
              <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #2563eb, #3b82f6)", borderRadius: 2, transition: "width 0.3s" }} />
            </div>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 6 }}>{progress}% مكتمل</p>
          </div>

          <div style={{ overflow: "auto", flex: 1 }}>
            {course.curriculum?.map((section, si) => (
              <div key={si}>
                <div style={{ padding: "14px 20px 10px", background: "rgba(0,0,0,0.2)" }}>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{section.title}</p>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, marginTop: 2 }}>{section.lessons} درس</p>
                </div>
                {Array.from({ length: Math.min(section.lessons, 3) }).map((_, li) => {
                  const lessonIndex = si * 3 + li;
                  const isActive = activeLesson === lessonIndex;
                  const isDone = lessonIndex < 2;
                  return (
                    <div key={li} className="lesson-item"
                      onClick={() => setActiveLesson(lessonIndex)}
                      style={{ padding: "12px 20px", display: "flex", alignItems: "center", gap: 12, background: isActive ? "rgba(37,99,235,0.2)" : "transparent", borderRight: isActive ? "3px solid #3b82f6" : "3px solid transparent" }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: isDone ? "rgba(34,197,94,0.2)" : isActive ? "rgba(37,99,235,0.3)" : "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0, border: isDone ? "1px solid rgba(34,197,94,0.4)" : isActive ? "1px solid rgba(37,99,235,0.4)" : "1px solid rgba(255,255,255,0.1)" }}>
                        {isDone ? <span style={{ color: "#4ade80" }}>✓</span> : <span style={{ color: isActive ? "#60a5fa" : "rgba(255,255,255,0.4)" }}>▶</span>}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.65)", fontSize: 13, fontWeight: isActive ? 700 : 500, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          درس {li + 1} — {section.title}
                        </p>
                        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, margin: 0 }}>{10 + li * 5}:00</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div style={{ padding: 20, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.2), rgba(29,78,216,0.2))", borderRadius: 14, padding: 16, border: "1px solid rgba(37,99,235,0.3)", textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>🏆</div>
              <p style={{ color: "#93c5fd", fontWeight: 800, fontSize: 14, marginBottom: 4 }}>خلص الكورس واحصل على شهادتك</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{100 - progress}% باقي للإتمام</p>
              <div style={{ marginTop: 12, height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 2 }}>
                <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #2563eb, #3b82f6)", borderRadius: 2 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}