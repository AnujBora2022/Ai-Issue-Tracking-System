import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  .login-root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0a0a0f;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .login-root::before {
    content: '';
    position: absolute;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(99,57,255,0.18) 0%, transparent 70%);
    top: -120px; left: -120px;
    pointer-events: none;
  }

  .login-root::after {
    content: '';
    position: absolute;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(255,87,159,0.12) 0%, transparent 70%);
    bottom: -80px; right: -80px;
    pointer-events: none;
  }

  .login-card {
    position: relative;
    z-index: 1;
    background: rgba(255,255,255,0.035);
    border: 1px solid rgba(255,255,255,0.08);
    backdrop-filter: blur(24px);
    border-radius: 24px;
    padding: 52px 48px 44px;
    width: 420px;
    box-shadow: 0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(32px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .login-eyebrow {
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #7c5cfc;
    font-weight: 500;
    margin-bottom: 10px;
  }

  .login-title {
    font-family: 'Playfair Display', serif;
    font-size: 34px;
    font-weight: 700;
    color: #f0eeff;
    line-height: 1.15;
    margin-bottom: 8px;
  }

  .login-subtitle {
    font-size: 14px;
    color: rgba(255,255,255,0.38);
    margin-bottom: 36px;
    font-weight: 300;
  }

  .field {
    margin-bottom: 18px;
    animation: fadeIn 0.5s ease both;
  }

  .field:nth-child(1) { animation-delay: 0.1s; }
  .field:nth-child(2) { animation-delay: 0.18s; }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .field label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: rgba(255,255,255,0.5);
    letter-spacing: 0.05em;
    margin-bottom: 8px;
  }

  .input-wrap {
    position: relative;
  }

  .input-wrap svg.field-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255,255,255,0.25);
    pointer-events: none;
    transition: color 0.2s;
  }

  .input-wrap input {
    width: 100%;
    padding: 13px 42px 13px 42px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    color: #f0eeff;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }

  .input-wrap input::placeholder { color: rgba(255,255,255,0.2); }

  .input-wrap input:focus {
    border-color: rgba(124,92,252,0.7);
    background: rgba(124,92,252,0.08);
    box-shadow: 0 0 0 3px rgba(124,92,252,0.12);
  }

  .input-wrap:has(input:focus) svg.field-icon { color: #7c5cfc; }

  .input-wrap input.input-error {
    border-color: rgba(255,87,87,0.6);
    background: rgba(255,87,87,0.06);
  }

  /* Eye toggle button */
  .eye-btn {
    position: absolute;
    right: 13px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: rgba(255,255,255,0.25);
    display: flex;
    align-items: center;
    padding: 2px;
    transition: color 0.2s;
  }
  .eye-btn:hover { color: rgba(255,255,255,0.55); }

  /* Forgot password row */
  .forgot-row {
    display: flex;
    justify-content: flex-end;
    margin-top: -8px;
    margin-bottom: 20px;
  }
  .forgot-row a {
    font-size: 12.5px;
    color: #a48aff;
    text-decoration: none;
    transition: color 0.2s;
  }
  .forgot-row a:hover { color: #c7b4ff; }

  .alert {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 16px;
    border-radius: 12px;
    font-size: 13.5px;
    font-weight: 400;
    margin-bottom: 20px;
    line-height: 1.5;
  }

  .alert-error {
    background: rgba(255,87,87,0.1);
    border: 1px solid rgba(255,87,87,0.25);
    color: #ff7a7a;
    animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  .alert-success {
    background: rgba(52,211,153,0.1);
    border: 1px solid rgba(52,211,153,0.25);
    color: #34d399;
    animation: fadeIn 0.3s ease both;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-6px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }

  .alert-icon { flex-shrink: 0; margin-top: 1px; }

  .btn-submit {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #7c5cfc, #c05cfc);
    border: none;
    border-radius: 12px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.02em;
    position: relative;
    overflow: hidden;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 8px 24px rgba(124,92,252,0.35);
  }

  .btn-submit::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0);
    transition: background 0.2s;
  }

  .btn-submit:hover:not(:disabled)::before { background: rgba(255,255,255,0.08); }
  .btn-submit:active:not(:disabled) { transform: scale(0.98); }
  .btn-submit:disabled { opacity: 0.55; cursor: not-allowed; }

  .btn-inner { display: flex; align-items: center; justify-content: center; gap: 8px; }

  .spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 28px 0 20px;
    color: rgba(255,255,255,0.18);
    font-size: 12px;
  }

  .divider::before, .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.08);
  }

  .signup-link {
    text-align: center;
    font-size: 13.5px;
    color: rgba(255,255,255,0.3);
  }

  .signup-link a {
    color: #a48aff;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }

  .signup-link a:hover { color: #c7b4ff; }
`;

function IconMail() {
  return (
    <svg className="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

function IconLock() {
  return (
    <svg className="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}

function IconEye({ open }) {
  return open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

function AlertIcon({ type }) {
  if (type === "error") return (
    <svg className="alert-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
  return (
    <svg className="alert-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (status) setStatus(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setStatus(null);

    try {
      const res = await axios.post("http://localhost:5000/auth/login", form);
      localStorage.setItem("token", res.data.token);
      setStatus({ type: "success", message: "Logged in successfully! Redirecting…" });
      // Use React Router if available: 
      
      navigate('/dashboard')
      // Or soft redirect without reload:
      // window.history.pushState({}, '', '/dashboard');
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Invalid credentials. Please try again.";
      setStatus({ type: "error", message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="login-root">
        <div className="login-card">
          <p className="login-eyebrow">Welcome back</p>
          <h1 className="login-title">Sign in to<br />your account</h1>
          <p className="login-subtitle">Good to see you again — let's pick up where you left off</p>

          {status && (
            <div className={`alert alert-${status.type}`}>
              <AlertIcon type={status.type} />
              <span>{status.message}</span>
            </div>
          )}

          <div>
            <div className="field">
              <label>Email Address</label>
              <div className="input-wrap">
                <IconMail />
                <input
                  name="email"
                  type="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className={status?.type === "error" ? "input-error" : ""}
                />
              </div>
            </div>

            <div className="field">
              <label>Password</label>
              <div className="input-wrap">
                <IconLock />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className={status?.type === "error" ? "input-error" : ""}
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(v => !v)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <IconEye open={showPassword} />
                </button>
              </div>
            </div>

            <div className="forgot-row">
              <a href="/forgot-password">Forgot password?</a>
            </div>

            <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
              <span className="btn-inner">
                {loading && <span className="spinner" />}
                {loading ? "Signing in…" : "Sign In"}
              </span>
            </button>
          </div>

          <div className="divider">or</div>
          <p className="signup-link">Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </div>
    </>
  );
}