export const DOT_COLORS = ["#7c5cfc","#fc5c8a","#5cf8fc","#fbbf24","#34d399","#f87171","#a78bfa"];

export const initials = (name = "") =>
  name.split(" ").map(w => w[0] || "").join("").toUpperCase().slice(0, 2) || "?";

export const timeAgo = (d) => {
  if (!d) return "";
  const s = Math.floor((Date.now() - new Date(d)) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
};

export const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --bg: #080810;
    --surface: rgba(255,255,255,0.04);
    --border: rgba(255,255,255,0.08);
    --accent: #7c5cfc;
    --accent2: #fc5c8a;
    --text: #e8e4ff;
    --muted: rgba(255,255,255,0.38);
    --success: #34d399;
    --warning: #fbbf24;
    --danger: #f87171;
  }

  body { background: var(--bg); }

  .dash-root {
    min-height: 100vh; background: var(--bg);
    font-family: 'DM Sans', sans-serif; color: var(--text);
    display: flex; flex-direction: column;
  }

  .topbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 32px; height: 64px;
    border-bottom: 1px solid var(--border);
    background: rgba(8,8,16,0.85); backdrop-filter: blur(20px);
    position: sticky; top: 0; z-index: 100;
  }
  .topbar-logo {
    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 20px;
    background: linear-gradient(135deg, #a48aff, #fc5c8a);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    letter-spacing: -0.02em;
  }
  .topbar-right { display: flex; align-items: center; gap: 16px; }
  .logout-btn {
    display: flex; align-items: center; gap: 7px; padding: 7px 14px;
    background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 8px;
    color: var(--muted); font-family: 'DM Sans', sans-serif; font-size: 13px;
    cursor: pointer; transition: color 0.2s, border-color 0.2s;
  }
  .logout-btn:hover { color: var(--danger); border-color: rgba(248,113,113,0.3); }
  .avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-weight: 700; font-size: 13px; color: #fff;
  }

  .dash-body { display: flex; flex: 1; overflow: hidden; }

  .sidebar {
    width: 280px; min-height: calc(100vh - 64px);
    border-right: 1px solid var(--border); padding: 24px 16px;
    display: flex; flex-direction: column; gap: 6px;
    overflow-y: auto; flex-shrink: 0;
  }
  .sidebar-label {
    font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--muted); padding: 8px 12px 4px; font-weight: 500;
  }
  .project-item {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 12px; border-radius: 10px; cursor: pointer;
    transition: background 0.15s; border: 1px solid transparent;
  }
  .project-item:hover { background: var(--surface); }
  .project-item.active { background: rgba(124,92,252,0.12); border-color: rgba(124,92,252,0.25); }
  .project-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .project-item-name {
    font-size: 14px; font-weight: 400;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1;
  }
  .project-item.active .project-item-name { color: #a48aff; font-weight: 500; }
  .project-item-del {
    background: none; border: none; cursor: pointer;
    color: transparent; padding: 2px; transition: color 0.2s; flex-shrink: 0;
  }
  .project-item:hover .project-item-del { color: rgba(248,113,113,0.4); }
  .project-item-del:hover { color: var(--danger) !important; }
  .new-project-btn {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px; border-radius: 10px; cursor: pointer;
    border: 1px dashed rgba(255,255,255,0.12); background: none;
    color: var(--muted); font-family: 'DM Sans', sans-serif; font-size: 13.5px;
    width: 100%; margin-top: 8px; transition: border-color 0.2s, color 0.2s;
  }
  .new-project-btn:hover { border-color: var(--accent); color: #a48aff; }

  .main-panel { flex: 1; overflow-y: auto; padding: 32px; min-width: 0; }

  .empty-state {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    height: 60vh; gap: 16px; color: var(--muted); text-align: center;
  }
  .empty-icon {
    width: 72px; height: 72px; border-radius: 20px;
    background: var(--surface); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 28px; margin-bottom: 8px;
  }
  .empty-state h3 { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; color: var(--text); }
  .empty-state p { font-size: 14px; max-width: 280px; line-height: 1.6; }

  .project-header {
    display: flex; align-items: flex-start; justify-content: space-between;
    margin-bottom: 32px; animation: fadeUp 0.4s ease both;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .project-title {
    font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800;
    letter-spacing: -0.02em; margin-bottom: 6px;
  }
  .project-meta { display: flex; align-items: center; gap: 12px; font-size: 13px; color: var(--muted); }
  .status-badge { padding: 3px 10px; border-radius: 20px; font-size: 11.5px; font-weight: 500; }
  .status-active { background: rgba(52,211,153,0.12); color: #34d399; border: 1px solid rgba(52,211,153,0.2); }

  .stats-row {
    display: grid; grid-template-columns: repeat(3,1fr); gap: 14px;
    margin-bottom: 32px; animation: fadeUp 0.4s ease 0.1s both;
  }
  .stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 20px; }
  .stat-label { font-size: 12px; color: var(--muted); margin-bottom: 8px; letter-spacing: 0.04em; }
  .stat-value { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; letter-spacing: -0.02em; }

  .tabs { display: flex; gap: 4px; border-bottom: 1px solid var(--border); margin-bottom: 28px; }
  .tab-btn {
    display: flex; align-items: center; gap: 7px;
    padding: 10px 18px; border: none; background: none;
    font-family: 'DM Sans', sans-serif; font-size: 13.5px; color: var(--muted);
    cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px;
    transition: color 0.2s, border-color 0.2s;
  }
  .tab-btn:hover { color: var(--text); }
  .tab-btn.active { color: #a48aff; border-bottom-color: var(--accent); font-weight: 500; }
  .tab-count { background: rgba(124,92,252,0.18); color: #a48aff; font-size: 11px; padding: 1px 7px; border-radius: 20px; }

  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .section-title { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; }

  .btn-primary {
    display: flex; align-items: center; gap: 7px; padding: 9px 18px;
    background: linear-gradient(135deg, #7c5cfc, #c05cfc);
    border: none; border-radius: 10px; color: #fff;
    font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 500; cursor: pointer;
    box-shadow: 0 4px 16px rgba(124,92,252,0.3); transition: opacity 0.2s, transform 0.15s;
  }
  .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
  .btn-primary:active { transform: scale(0.97); }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .btn-secondary {
    display: flex; align-items: center; gap: 7px; padding: 9px 16px;
    background: var(--surface); border: 1px solid var(--border); border-radius: 10px;
    color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 13px; cursor: pointer;
    transition: background 0.2s;
  }
  .btn-secondary:hover { background: rgba(255,255,255,0.07); }

  .members-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(220px,1fr)); gap: 14px; }
  .member-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: 14px;
    padding: 18px; display: flex; align-items: center; gap: 14px;
    animation: fadeUp 0.3s ease both; transition: border-color 0.2s;
  }
  .member-card:hover { border-color: rgba(255,255,255,0.14); }
  .member-avatar {
    width: 42px; height: 42px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15px; color: #fff; flex-shrink: 0;
  }
  .member-info { flex: 1; min-width: 0; }
  .member-name { font-size: 14px; font-weight: 500; margin-bottom: 3px; }
  .member-role { font-size: 12px; color: var(--muted); }

  .issues-list { display: flex; flex-direction: column; gap: 10px; }
  .issue-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
    padding: 16px 18px; display: flex; align-items: flex-start; gap: 14px;
    animation: fadeUp 0.3s ease both; transition: border-color 0.2s, background 0.2s;
  }
  .issue-card:hover { border-color: rgba(255,255,255,0.14); background: rgba(255,255,255,0.05); }
  .issue-body { flex: 1; min-width: 0; }
  .issue-title { font-size: 14px; font-weight: 500; margin-bottom: 5px; }
  .issue-desc  { font-size: 12.5px; color: var(--muted); line-height: 1.5; }
  .issue-actions { display: flex; gap: 8px; flex-shrink: 0; align-items: center; }
  .status-select {
    background: rgba(255,255,255,0.04); border: 1px solid var(--border);
    border-radius: 8px; padding: 3px 8px; color: var(--muted);
    font-family: 'DM Sans', sans-serif; font-size: 12px; cursor: pointer; outline: none;
  }
  .issue-status-badge { font-size: 11px; padding: 3px 10px; border-radius: 20px; font-weight: 500; }
  .is-in-progress { background: rgba(251,191,36,0.12); color: var(--warning); border: 1px solid rgba(251,191,36,0.2); }
  .is-todo { background: rgba(248,113,113,0.12); color: var(--danger); border: 1px solid rgba(248,113,113,0.2); }
  .is-done { background: rgba(52,211,153,0.12); color: var(--success); border: 1px solid rgba(52,211,153,0.2); }
  .priority-badge { font-size: 11px; font-weight: 600; padding: 2px 9px; border-radius: 20px; letter-spacing: 0.04em; flex-shrink: 0; }
  .p-badge-high     { background: rgba(248,113,113,0.15); color: #f87171; border: 1px solid rgba(248,113,113,0.3); }
  .p-badge-medium   { background: rgba(251,191,36,0.15);  color: #fbbf24; border: 1px solid rgba(251,191,36,0.3); }
  .p-badge-low      { background: rgba(52,211,153,0.15);  color: #34d399; border: 1px solid rgba(52,211,153,0.3); }
  .p-badge-critical { background: rgba(220,38,38,0.2);    color: #ff4444; border: 1px solid rgba(220,38,38,0.4); }
  .icon-btn { background: none; border: none; cursor: pointer; color: var(--muted); padding: 4px; transition: color 0.2s; }
  .icon-btn:hover { color: var(--danger); }

  .btn-ai-summary {
    background: linear-gradient(135deg, #7c3aed, #4f46e5); color: #fff;
    border: none; border-radius: 8px; padding: 5px 12px;
    font-size: 12px; font-weight: 600; cursor: pointer; transition: opacity 0.2s;
    display: flex; align-items: center; gap: 4px;
  }
  .btn-ai-summary:hover { opacity: 0.85; }
  .btn-ai-summary:disabled { opacity: 0.5; cursor: not-allowed; }
  .ai-summary-panel {
    margin-top: 20px;
    background: linear-gradient(135deg, rgba(124,58,237,0.08), rgba(79,70,229,0.06));
    border: 1px solid rgba(124,58,237,0.3); border-radius: 14px; padding: 20px;
    animation: fadeUp 0.3s ease;
  }
  .ai-summary-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
  .ai-badge {
    background: linear-gradient(135deg, #7c3aed, #4f46e5); color: #fff;
    font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 20px; letter-spacing: 0.5px;
  }
  .ai-section { margin-bottom: 14px; }
  .ai-section-label { font-size: 12px; font-weight: 700; color: #a78bfa; margin-bottom: 6px; letter-spacing: 0.4px; }
  .ai-section-text { font-size: 14px; color: var(--muted); line-height: 1.6; margin: 0; }
  .ai-action-list { margin: 0; padding-left: 18px; color: var(--muted); font-size: 14px; line-height: 1.8; }
  .ai-next-step { color: #a78bfa !important; font-weight: 500; }

  .comments-list { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
  .comment-item { display: flex; gap: 14px; animation: fadeUp 0.3s ease both; }
  .comment-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-weight: 700; font-size: 13px; color: #fff; flex-shrink: 0;
  }
  .comment-bubble {
    flex: 1; background: var(--surface); border: 1px solid var(--border);
    border-radius: 0 12px 12px 12px; padding: 12px 16px;
  }
  .comment-meta { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
  .comment-meta-left { display: flex; align-items: center; gap: 10px; }
  .comment-author { font-size: 13px; font-weight: 500; }
  .comment-time   { font-size: 11.5px; color: var(--muted); }
  .comment-text   { font-size: 13.5px; line-height: 1.6; color: rgba(255,255,255,0.75); }
  .comment-input-row { display: flex; gap: 12px; align-items: flex-end; }
  .comment-input {
    flex: 1; background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
    padding: 12px 16px; color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 14px;
    resize: none; outline: none; transition: border-color 0.2s, box-shadow 0.2s; min-height: 48px;
  }
  .comment-input::placeholder { color: rgba(255,255,255,0.2); }
  .comment-input:focus { border-color: rgba(124,92,252,0.6); box-shadow: 0 0 0 3px rgba(124,92,252,0.1); }

  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.7);
    backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center;
    z-index: 200; animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .modal {
    background: #12121e; border: 1px solid rgba(255,255,255,0.1);
    border-radius: 20px; padding: 32px; width: 440px;
    box-shadow: 0 32px 80px rgba(0,0,0,0.6);
    animation: slideUp 0.3s cubic-bezier(0.16,1,0.3,1) both;
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .modal-title { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; margin-bottom: 6px; }
  .modal-sub { font-size: 13.5px; color: var(--muted); margin-bottom: 24px; }
  .modal-field { margin-bottom: 16px; }
  .modal-field label { display: block; font-size: 12px; font-weight: 500; color: var(--muted); letter-spacing: 0.05em; margin-bottom: 7px; }
  .modal-input, .modal-select {
    width: 100%; background: rgba(255,255,255,0.05); border: 1px solid var(--border);
    border-radius: 10px; padding: 11px 14px; color: var(--text);
    font-family: 'DM Sans', sans-serif; font-size: 14px; outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .modal-input:focus, .modal-select:focus { border-color: rgba(124,92,252,0.6); box-shadow: 0 0 0 3px rgba(124,92,252,0.1); }
  .modal-select option { background: #12121e; }
  .modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 24px; }

  .assign-checkbox-list { display: flex; flex-direction: column; gap: 8px; max-height: 150px; overflow-y: auto; padding: 4px 0; }
  .assign-checkbox-item { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--muted); cursor: pointer; }
  .assign-checkbox-item input[type="checkbox"] { accent-color: #7c3aed; width: 15px; height: 15px; cursor: pointer; }

  .toast {
    position: fixed; bottom: 28px; right: 28px;
    padding: 13px 20px; border-radius: 12px; font-size: 13.5px; font-weight: 500;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4); z-index: 300; animation: slideUp 0.3s ease both;
  }
  .toast-error   { background: rgba(248,113,113,0.15); border: 1px solid rgba(248,113,113,0.3); color: var(--danger); }
  .toast-success { background: rgba(52,211,153,0.12);  border: 1px solid rgba(52,211,153,0.25); color: var(--success); }

  .spinner-sm {
    width: 14px; height: 14px;
    border: 2px solid rgba(255,255,255,0.2); border-top-color: #fff;
    border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .inline-loader { display: flex; align-items: center; gap: 10px; padding: 40px 0; color: var(--muted); font-size: 14px; justify-content: center; }
  .no-data { color: var(--muted); font-size: 14px; padding: 8px 0; }
`;