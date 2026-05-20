"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

const categoryConfig = {
  "Backend Development":    { gradient: "linear-gradient(135deg, #1e3a5f 0%, #0d1f35 100%)", accent: "#3b82f6", icon: "⚙️" },
  "Frontend Development":   { gradient: "linear-gradient(135deg, #2d1b69 0%, #11103d 100%)", accent: "#a78bfa", icon: "🎨" },
  "Mobile Development":     { gradient: "linear-gradient(135deg, #064e3b 0%, #022c22 100%)", accent: "#34d399", icon: "📱" },
  "Artificial Intelligence":{ gradient: "linear-gradient(135deg, #7c2d12 0%, #431407 100%)", accent: "#fb923c", icon: "🤖" },
  "Software Engineering":   { gradient: "linear-gradient(135deg, #134e4a 0%, #042f2e 100%)", accent: "#2dd4bf", icon: "🏗️" },
};

export default function Cart() {
  const { cart, total, removeFromCart } = useCart();

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
          <Link href="/" style={{ color: "#64748b", fontWeight: 600, fontSize: 14, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
            ← العودة للكورسات
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: "#0f172a", marginBottom: 8 }}>🛒 سلة المشتريات</h1>
        <p style={{ color: "#64748b", marginBottom: 40, fontSize: 16 }}>
          {cart.length === 0 ? "السلة فاضية" : `${cart.length} كورس في السلة`}
        </p>

        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 24px", background: "#fff", borderRadius: 24, border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: 72, marginBottom: 20 }}>🎓</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", marginBottom: 12 }}>السلة فاضية!</h2>
            <p style={{ color: "#64748b", marginBottom: 28, fontSize: 16 }}>ابدأ باستعراض الكورسات وأضف اللي يعجبك</p>
            <Link href="/" style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", color: "#fff", padding: "14px 36px", borderRadius: 12, fontWeight: 800, fontSize: 16, textDecoration: "none", boxShadow: "0 4px 15px rgba(37,99,235,0.4)" }}>
              استعرض الكورسات ←
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 32, alignItems: "start" }}>

            {/* Course List */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {cart.map((course, index) => {
                const cfg = categoryConfig[course.category] || categoryConfig["Backend Development"];
                return (
                  <div key={index} style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid #e2e8f0", display: "flex", alignItems: "stretch" }}>
                    <div style={{ background: cfg.gradient, width: 120, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>
                      {cfg.icon}
                    </div>
                    <div style={{ padding: "20px 24px", flex: 1 }}>
                      <span style={{ color: cfg.accent, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{course.category}</span>
                      <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0f172a", margin: "6px 0 8px" }}>{course.title}</h3>
                      <div style={{ display: "flex", gap: 16, color: "#94a3b8", fontSize: 13 }}>
                        <span>🎬 {course.lessons} درس</span>
                        <span>⏱️ {course.hours} ساعة</span>
                        <span>📶 {course.level}</span>
                      </div>
                    </div>
                    <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between", flexShrink: 0 }}>
                      <span style={{ fontSize: 24, fontWeight: 900, color: "#0f172a" }}>${course.price}</span>
                      <button onClick={() => removeFromCart(course.id)}
                        style={{ background: "#fef2f2", color: "#ef4444", border: "none", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                        🗑️ إزالة
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div style={{ background: "#fff", borderRadius: 20, padding: 28, border: "1px solid #e2e8f0", position: "sticky", top: 88 }}>
              <h2 style={{ fontSize: 18, fontWeight: 900, color: "#0f172a", marginBottom: 24 }}>ملخص الطلب</h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
                {cart.map((course, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#475569", fontSize: 14, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{course.title}</span>
                    <span style={{ fontWeight: 700, color: "#0f172a", fontSize: 14 }}>${course.price}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: "2px dashed #e2e8f0", paddingTop: 20, marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: "#0f172a" }}>الإجمالي</span>
                  <span style={{ fontSize: 28, fontWeight: 900, color: "#2563eb" }}>${total}</span>
                </div>
              </div>

              <Link href="/checkout" style={{ display: "block", background: "linear-gradient(135deg, #2563eb, #1d4ed8)", color: "#fff", padding: "16px 0", borderRadius: 14, fontWeight: 800, fontSize: 16, textAlign: "center", textDecoration: "none", marginBottom: 12, boxShadow: "0 4px 15px rgba(37,99,235,0.4)" }}>
                إتمام الشراء ←
              </Link>
              <Link href="/" style={{ display: "block", background: "#f8fafc", color: "#475569", padding: "13px 0", borderRadius: 12, fontWeight: 700, fontSize: 14, textAlign: "center", textDecoration: "none", border: "1px solid #e2e8f0" }}>
                متابعة التسوق
              </Link>

              <div style={{ marginTop: 20, padding: 16, background: "#f0fdf4", borderRadius: 12, border: "1px solid #bbf7d0" }}>
                <p style={{ color: "#166534", fontSize: 13, fontWeight: 600, textAlign: "center" }}>
                  🔒 دفع آمن ومشفر بالكامل
                </p>
              </div>

              <div style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 8 }}>
                {["💳", "🏦", "📱"].map((icon, i) => (
                  <div key={i} style={{ width: 44, height: 28, background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{icon}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}