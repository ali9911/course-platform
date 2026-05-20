"use client";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const categoryConfig = {
  "Backend Development":    { gradient: "linear-gradient(135deg, #1e3a5f 0%, #0d1f35 100%)", icon: "⚙️" },
  "Frontend Development":   { gradient: "linear-gradient(135deg, #2d1b69 0%, #11103d 100%)", icon: "🎨" },
  "Mobile Development":     { gradient: "linear-gradient(135deg, #064e3b 0%, #022c22 100%)", icon: "📱" },
  "Artificial Intelligence":{ gradient: "linear-gradient(135deg, #7c2d12 0%, #431407 100%)", icon: "🤖" },
  "Software Engineering":   { gradient: "linear-gradient(135deg, #134e4a 0%, #042f2e 100%)", icon: "🏗️" },
};

export default function Checkout() {
  const { cart, total, completePurchase } = useCart();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  async function handleSubmit() {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        courseIds: cart.map(c => c.id),
        total
      })
    });
    const data = await res.json();
    if (data.success) {
      completePurchase(cart.map(c => c.id));
      router.push(`/content/${cart[0]?.id}`);
    }
    setLoading(false);
  }

  if (cart.length === 0) {
    return (
      <main style={{ fontFamily: "Cairo, sans-serif", background: "#f8fafc", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');`}</style>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 72, marginBottom: 20 }}>🛒</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", marginBottom: 12 }}>السلة فاضية</h2>
          <Link href="/" style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", color: "#fff", padding: "14px 36px", borderRadius: 12, fontWeight: 800, textDecoration: "none" }}>
            استعرض الكورسات
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ fontFamily: "Cairo, sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
        * { font-family: 'Cairo', sans-serif; }
        .input-field:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
        .input-field { transition: all 0.2s; }
      `}</style>

      {/* Navbar */}
      <nav style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <div style={{ width: 34, height: 34, background: "linear-gradient(135deg, #2563eb, #1d4ed8)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🧠</div>
            <span style={{ fontSize: 18, fontWeight: 900, color: "#0f172a" }}>IT <span style={{ color: "#2563eb" }}>Legend</span></span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#64748b", fontSize: 14 }}>
            🔒 دفع آمن ومشفر
          </div>
        </div>
      </nav>

      {/* Steps */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "16px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 0 }}>
          {[{ n: 1, label: "السلة" }, { n: 2, label: "بياناتك" }, { n: 3, label: "تأكيد" }].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: step >= s.n ? "linear-gradient(135deg, #2563eb, #1d4ed8)" : "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: step >= s.n ? "#fff" : "#94a3b8" }}>
                  {step > s.n ? "✓" : s.n}
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: step >= s.n ? "#0f172a" : "#94a3b8" }}>{s.label}</span>
              </div>
              {i < 2 && <div style={{ width: 60, height: 2, background: step > s.n ? "#2563eb" : "#e2e8f0", margin: "0 12px" }} />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px", display: "grid", gridTemplateColumns: "1fr 360px", gap: 32, alignItems: "start" }}>

        {/* Form */}
        <div>
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, border: "1px solid #e2e8f0", marginBottom: 20 }}>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: "#0f172a", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 36, height: 36, background: "linear-gradient(135deg, #2563eb, #1d4ed8)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16 }}>👤</span>
              بياناتك الشخصية
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label style={{ display: "block", fontWeight: 700, color: "#374151", fontSize: 14, marginBottom: 8 }}>الاسم الكامل *</label>
                <input
                  type="text"
                  placeholder="اكتب اسمك هنا"
                  value={name}
                  onChange={e => { setName(e.target.value); setStep(2); }}
                  className="input-field"
                  style={{ width: "100%", border: "2px solid #e2e8f0", borderRadius: 12, padding: "14px 16px", fontSize: 15, background: "#fafafa", boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 700, color: "#374151", fontSize: 14, marginBottom: 8 }}>البريد الإلكتروني *</label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setStep(2); }}
                  className="input-field"
                  style={{ width: "100%", border: "2px solid #e2e8f0", borderRadius: 12, padding: "14px 16px", fontSize: 15, background: "#fafafa", boxSizing: "border-box" }}
                />
              </div>
            </div>
          </div>

          <div style={{ background: "#fff", borderRadius: 20, padding: 32, border: "1px solid #e2e8f0" }}>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: "#0f172a", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 36, height: 36, background: "linear-gradient(135deg, #2563eb, #1d4ed8)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16 }}>💳</span>
              بيانات الدفع
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label style={{ display: "block", fontWeight: 700, color: "#374151", fontSize: 14, marginBottom: 8 }}>رقم البطاقة</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="input-field"
                  style={{ width: "100%", border: "2px solid #e2e8f0", borderRadius: 12, padding: "14px 16px", fontSize: 15, background: "#fafafa", boxSizing: "border-box" }}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontWeight: 700, color: "#374151", fontSize: 14, marginBottom: 8 }}>تاريخ الانتهاء</label>
                  <input type="text" placeholder="MM/YY" className="input-field"
                    style={{ width: "100%", border: "2px solid #e2e8f0", borderRadius: 12, padding: "14px 16px", fontSize: 15, background: "#fafafa", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 700, color: "#374151", fontSize: 14, marginBottom: 8 }}>CVV</label>
                  <input type="text" placeholder="123" className="input-field"
                    style={{ width: "100%", border: "2px solid #e2e8f0", borderRadius: 12, padding: "14px 16px", fontSize: 15, background: "#fafafa", boxSizing: "border-box" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div style={{ position: "sticky", top: 88 }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 28, border: "1px solid #e2e8f0", marginBottom: 16 }}>
            <h2 style={{ fontSize: 17, fontWeight: 900, color: "#0f172a", marginBottom: 20 }}>ملخص الطلب</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
              {cart.map((course, i) => {
                const cfg = categoryConfig[course.category] || categoryConfig["Backend Development"];
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 44, height: 44, background: cfg.gradient, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                      {cfg.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{course.title}</p>
                      <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>{course.lessons} درس • {course.hours} ساعة</p>
                    </div>
                    <span style={{ fontWeight: 800, color: "#0f172a", fontSize: 15, flexShrink: 0 }}>${course.price}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ borderTop: "2px dashed #e2e8f0", paddingTop: 16, marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: "#64748b", fontSize: 14 }}>المجموع الفرعي</span>
                <span style={{ fontWeight: 700, fontSize: 14 }}>${total}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: "#64748b", fontSize: 14 }}>الخصم</span>
                <span style={{ color: "#16a34a", fontWeight: 700, fontSize: 14 }}>$0</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #f1f5f9", paddingTop: 12, marginTop: 8 }}>
                <span style={{ fontWeight: 800, fontSize: 16, color: "#0f172a" }}>الإجمالي</span>
                <span style={{ fontWeight: 900, fontSize: 24, color: "#2563eb" }}>${total}</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{ width: "100%", background: loading ? "#94a3b8" : "linear-gradient(135deg, #2563eb, #1d4ed8)", color: "#fff", padding: "16px 0", borderRadius: 14, fontWeight: 800, fontSize: 16, border: "none", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 4px 15px rgba(37,99,235,0.4)", marginBottom: 12 }}
            >
              {loading ? "⏳ جاري المعالجة..." : `🔒 إتمام الشراء — $${total}`}
            </button>

            <div style={{ background: "#f0fdf4", borderRadius: 12, padding: 14, border: "1px solid #bbf7d0", textAlign: "center" }}>
              <p style={{ color: "#166534", fontSize: 13, fontWeight: 600, margin: 0 }}>✓ ضمان استرداد الأموال خلال 30 يوم</p>
            </div>
          </div>

          <div style={{ background: "#fff", borderRadius: 16, padding: 20, border: "1px solid #e2e8f0" }}>
            <p style={{ fontWeight: 800, color: "#0f172a", fontSize: 14, marginBottom: 14, textAlign: "center" }}>بعد الشراء هتاخد فوراً</p>
            {["وصول فوري لكل محتوى الكورس", "شهادة إتمام معتمدة", "وصول مدى الحياة بدون رسوم", "دعم مباشر من المدرب"].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, color: "#475569", fontSize: 13 }}>
                <span style={{ color: "#2563eb", fontWeight: 900 }}>✓</span> {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}