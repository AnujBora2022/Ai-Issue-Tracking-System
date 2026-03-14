// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ProjectCard from "../components/ProjectCard";

// function Dashboard() {

//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const fetchProjects = async () => {
//     try {

//       const token = localStorage.getItem("token");

//       const res = await axios.get(
//         "http://localhost:5000/api/projects",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       setProjects(res.data);

//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>

//       <h2>Dashboard</h2>

//       <h3>Your Projects</h3>

//       {projects.length === 0 ? (
//         <p>No projects yet</p>
//       ) : (
//         <ul>
//           {projects.map((project) => (
//             <ProjectCard key={project._id} project={project} />
//           ))}
//         </ul>
//       )}

//     </div>
//   );
// }

// export default Dashboard;





// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

//   *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

//   :root {
//     --bg: #080810;
//     --surface: rgba(255,255,255,0.04);
//     --border: rgba(255,255,255,0.08);
//     --accent: #7c5cfc;
//     --accent2: #fc5c8a;
//     --text: #e8e4ff;
//     --muted: rgba(255,255,255,0.38);
//     --success: #34d399;
//     --warning: #fbbf24;
//     --danger: #f87171;
//   }

//   body { background: var(--bg); }

//   .dash-root {
//     min-height: 100vh;
//     background: var(--bg);
//     font-family: 'DM Sans', sans-serif;
//     color: var(--text);
//     display: flex;
//     flex-direction: column;
//   }

//   /* ── Topbar ── */
//   .topbar {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 0 32px;
//     height: 64px;
//     border-bottom: 1px solid var(--border);
//     background: rgba(8,8,16,0.85);
//     backdrop-filter: blur(20px);
//     position: sticky;
//     top: 0;
//     z-index: 100;
//   }

//   .topbar-logo {
//     font-family: 'Syne', sans-serif;
//     font-weight: 800;
//     font-size: 20px;
//     background: linear-gradient(135deg, #a48aff, #fc5c8a);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     letter-spacing: -0.02em;
//   }

//   .topbar-right { display: flex; align-items: center; gap: 16px; }

//   .avatar {
//     width: 36px; height: 36px;
//     border-radius: 50%;
//     background: linear-gradient(135deg, var(--accent), var(--accent2));
//     display: flex; align-items: center; justify-content: center;
//     font-family: 'Syne', sans-serif;
//     font-weight: 700; font-size: 13px; color: #fff;
//     cursor: pointer;
//   }

//   /* ── Layout ── */
//   .dash-body {
//     display: flex;
//     flex: 1;
//     overflow: hidden;
//   }

//   /* ── Sidebar ── */
//   .sidebar {
//     width: 280px;
//     min-height: calc(100vh - 64px);
//     border-right: 1px solid var(--border);
//     padding: 24px 16px;
//     display: flex;
//     flex-direction: column;
//     gap: 6px;
//     overflow-y: auto;
//     flex-shrink: 0;
//   }

//   .sidebar-label {
//     font-size: 10px;
//     letter-spacing: 0.16em;
//     text-transform: uppercase;
//     color: var(--muted);
//     padding: 8px 12px 4px;
//     font-weight: 500;
//   }

//   .project-item {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//     padding: 10px 12px;
//     border-radius: 10px;
//     cursor: pointer;
//     transition: background 0.15s;
//     border: 1px solid transparent;
//   }

//   .project-item:hover { background: var(--surface); }
//   .project-item.active {
//     background: rgba(124,92,252,0.12);
//     border-color: rgba(124,92,252,0.25);
//   }

//   .project-dot {
//     width: 8px; height: 8px;
//     border-radius: 50%;
//     flex-shrink: 0;
//   }

//   .project-item-name {
//     font-size: 14px;
//     font-weight: 400;
//     white-space: nowrap;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     flex: 1;
//   }

//   .project-item.active .project-item-name { color: #a48aff; font-weight: 500; }

//   .badge-count {
//     font-size: 11px;
//     background: rgba(255,255,255,0.08);
//     color: var(--muted);
//     padding: 1px 7px;
//     border-radius: 20px;
//   }

//   .new-project-btn {
//     display: flex; align-items: center; gap: 10px;
//     padding: 10px 12px;
//     border-radius: 10px;
//     cursor: pointer;
//     border: 1px dashed rgba(255,255,255,0.12);
//     background: none;
//     color: var(--muted);
//     font-family: 'DM Sans', sans-serif;
//     font-size: 13.5px;
//     width: 100%;
//     margin-top: 8px;
//     transition: border-color 0.2s, color 0.2s;
//   }
//   .new-project-btn:hover { border-color: var(--accent); color: #a48aff; }

//   /* ── Main panel ── */
//   .main-panel {
//     flex: 1;
//     overflow-y: auto;
//     padding: 32px;
//     min-width: 0;
//   }

//   /* ── Empty state ── */
//   .empty-state {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     height: 60vh;
//     gap: 16px;
//     color: var(--muted);
//     text-align: center;
//   }

//   .empty-icon {
//     width: 72px; height: 72px;
//     border-radius: 20px;
//     background: var(--surface);
//     border: 1px solid var(--border);
//     display: flex; align-items: center; justify-content: center;
//     font-size: 28px;
//     margin-bottom: 8px;
//   }

//   .empty-state h3 {
//     font-family: 'Syne', sans-serif;
//     font-size: 20px; font-weight: 700;
//     color: var(--text);
//   }

//   .empty-state p { font-size: 14px; max-width: 280px; line-height: 1.6; }

//   /* ── Project detail ── */
//   .project-header {
//     display: flex;
//     align-items: flex-start;
//     justify-content: space-between;
//     margin-bottom: 32px;
//     animation: fadeUp 0.4s ease both;
//   }

//   @keyframes fadeUp {
//     from { opacity: 0; transform: translateY(16px); }
//     to { opacity: 1; transform: translateY(0); }
//   }

//   .project-title {
//     font-family: 'Syne', sans-serif;
//     font-size: 28px;
//     font-weight: 800;
//     letter-spacing: -0.02em;
//     margin-bottom: 6px;
//   }

//   .project-meta {
//     display: flex; align-items: center; gap: 12px;
//     font-size: 13px; color: var(--muted);
//   }

//   .status-badge {
//     padding: 3px 10px;
//     border-radius: 20px;
//     font-size: 11.5px;
//     font-weight: 500;
//   }

//   .status-active { background: rgba(52,211,153,0.12); color: #34d399; border: 1px solid rgba(52,211,153,0.2); }
//   .status-paused { background: rgba(251,191,36,0.12); color: #fbbf24; border: 1px solid rgba(251,191,36,0.2); }
//   .status-done { background: rgba(124,92,252,0.12); color: #a48aff; border: 1px solid rgba(124,92,252,0.2); }

//   /* ── Tabs ── */
//   .tabs {
//     display: flex;
//     gap: 4px;
//     border-bottom: 1px solid var(--border);
//     margin-bottom: 28px;
//   }

//   .tab-btn {
//     display: flex; align-items: center; gap: 7px;
//     padding: 10px 18px;
//     border: none; background: none;
//     font-family: 'DM Sans', sans-serif;
//     font-size: 13.5px;
//     color: var(--muted);
//     cursor: pointer;
//     border-bottom: 2px solid transparent;
//     margin-bottom: -1px;
//     transition: color 0.2s, border-color 0.2s;
//   }

//   .tab-btn:hover { color: var(--text); }
//   .tab-btn.active { color: #a48aff; border-bottom-color: var(--accent); font-weight: 500; }

//   .tab-count {
//     background: rgba(124,92,252,0.18);
//     color: #a48aff;
//     font-size: 11px;
//     padding: 1px 7px;
//     border-radius: 20px;
//   }

//   /* ── Members ── */
//   .section-header {
//     display: flex; align-items: center; justify-content: space-between;
//     margin-bottom: 20px;
//   }

//   .section-title {
//     font-family: 'Syne', sans-serif;
//     font-size: 16px; font-weight: 700;
//   }

//   .btn-primary {
//     display: flex; align-items: center; gap: 7px;
//     padding: 9px 18px;
//     background: linear-gradient(135deg, #7c5cfc, #c05cfc);
//     border: none; border-radius: 10px;
//     color: #fff; font-family: 'DM Sans', sans-serif;
//     font-size: 13.5px; font-weight: 500;
//     cursor: pointer;
//     box-shadow: 0 4px 16px rgba(124,92,252,0.3);
//     transition: opacity 0.2s, transform 0.15s;
//   }
//   .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
//   .btn-primary:active { transform: scale(0.97); }

//   .btn-secondary {
//     display: flex; align-items: center; gap: 7px;
//     padding: 9px 16px;
//     background: var(--surface);
//     border: 1px solid var(--border); border-radius: 10px;
//     color: var(--text); font-family: 'DM Sans', sans-serif;
//     font-size: 13px; font-weight: 400;
//     cursor: pointer;
//     transition: background 0.2s, border-color 0.2s;
//   }
//   .btn-secondary:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.15); }

//   .members-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
//     gap: 14px;
//   }

//   .member-card {
//     background: var(--surface);
//     border: 1px solid var(--border);
//     border-radius: 14px;
//     padding: 18px;
//     display: flex;
//     align-items: center;
//     gap: 14px;
//     animation: fadeUp 0.3s ease both;
//     transition: border-color 0.2s;
//   }
//   .member-card:hover { border-color: rgba(255,255,255,0.14); }

//   .member-avatar {
//     width: 42px; height: 42px;
//     border-radius: 50%;
//     background: linear-gradient(135deg, #7c5cfc, #fc5c8a);
//     display: flex; align-items: center; justify-content: center;
//     font-family: 'Syne', sans-serif;
//     font-weight: 700; font-size: 15px; color: #fff;
//     flex-shrink: 0;
//   }

//   .member-info { flex: 1; min-width: 0; }
//   .member-name { font-size: 14px; font-weight: 500; margin-bottom: 3px; }
//   .member-role { font-size: 12px; color: var(--muted); }

//   .member-remove {
//     background: none; border: none; cursor: pointer;
//     color: rgba(255,255,255,0.2);
//     transition: color 0.2s;
//     padding: 4px;
//   }
//   .member-remove:hover { color: var(--danger); }

//   /* ── Issues ── */
//   .issues-list { display: flex; flex-direction: column; gap: 10px; }

//   .issue-card {
//     background: var(--surface);
//     border: 1px solid var(--border);
//     border-radius: 12px;
//     padding: 16px 18px;
//     display: flex;
//     align-items: flex-start;
//     gap: 14px;
//     cursor: pointer;
//     animation: fadeUp 0.3s ease both;
//     transition: border-color 0.2s, background 0.2s;
//   }
//   .issue-card:hover { border-color: rgba(255,255,255,0.14); background: rgba(255,255,255,0.05); }

//   .issue-priority {
//     width: 10px; height: 10px;
//     border-radius: 50%;
//     flex-shrink: 0;
//     margin-top: 5px;
//   }
//   .p-high { background: var(--danger); box-shadow: 0 0 8px rgba(248,113,113,0.5); }
//   .p-medium { background: var(--warning); box-shadow: 0 0 8px rgba(251,191,36,0.4); }
//   .p-low { background: var(--success); box-shadow: 0 0 8px rgba(52,211,153,0.4); }

//   .issue-body { flex: 1; min-width: 0; }
//   .issue-title { font-size: 14px; font-weight: 500; margin-bottom: 5px; }
//   .issue-desc { font-size: 12.5px; color: var(--muted); line-height: 1.5; }

//   .issue-tags { display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap; }
//   .issue-tag {
//     padding: 2px 9px;
//     border-radius: 20px;
//     font-size: 11px;
//     background: rgba(255,255,255,0.06);
//     color: var(--muted);
//     border: 1px solid var(--border);
//   }

//   .issue-status {
//     font-size: 11px;
//     padding: 3px 10px;
//     border-radius: 20px;
//     font-weight: 500;
//     flex-shrink: 0;
//   }
//   .is-open { background: rgba(248,113,113,0.12); color: var(--danger); border: 1px solid rgba(248,113,113,0.2); }
//   .is-progress { background: rgba(251,191,36,0.12); color: var(--warning); border: 1px solid rgba(251,191,36,0.2); }
//   .is-closed { background: rgba(52,211,153,0.12); color: var(--success); border: 1px solid rgba(52,211,153,0.2); }

//   /* ── Comments ── */
//   .comments-list { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }

//   .comment-item {
//     display: flex; gap: 14px;
//     animation: fadeUp 0.3s ease both;
//   }

//   .comment-avatar {
//     width: 36px; height: 36px;
//     border-radius: 50%;
//     background: linear-gradient(135deg, #5c8afc, #7c5cfc);
//     display: flex; align-items: center; justify-content: center;
//     font-family: 'Syne', sans-serif;
//     font-weight: 700; font-size: 13px; color: #fff;
//     flex-shrink: 0;
//   }

//   .comment-bubble {
//     flex: 1;
//     background: var(--surface);
//     border: 1px solid var(--border);
//     border-radius: 0 12px 12px 12px;
//     padding: 12px 16px;
//   }

//   .comment-meta {
//     display: flex; align-items: center; gap: 10px;
//     margin-bottom: 6px;
//   }

//   .comment-author { font-size: 13px; font-weight: 500; }
//   .comment-time { font-size: 11.5px; color: var(--muted); }
//   .comment-text { font-size: 13.5px; line-height: 1.6; color: rgba(255,255,255,0.75); }

//   .comment-input-row {
//     display: flex; gap: 12px; align-items: flex-end;
//   }

//   .comment-input {
//     flex: 1;
//     background: var(--surface);
//     border: 1px solid var(--border);
//     border-radius: 12px;
//     padding: 12px 16px;
//     color: var(--text);
//     font-family: 'DM Sans', sans-serif;
//     font-size: 14px;
//     resize: none;
//     outline: none;
//     transition: border-color 0.2s, box-shadow 0.2s;
//     min-height: 48px;
//   }
//   .comment-input::placeholder { color: rgba(255,255,255,0.2); }
//   .comment-input:focus {
//     border-color: rgba(124,92,252,0.6);
//     box-shadow: 0 0 0 3px rgba(124,92,252,0.1);
//   }

//   /* ── Modal ── */
//   .modal-overlay {
//     position: fixed; inset: 0;
//     background: rgba(0,0,0,0.7);
//     backdrop-filter: blur(8px);
//     display: flex; align-items: center; justify-content: center;
//     z-index: 200;
//     animation: fadeIn 0.2s ease;
//   }

//   @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

//   .modal {
//     background: #12121e;
//     border: 1px solid rgba(255,255,255,0.1);
//     border-radius: 20px;
//     padding: 32px;
//     width: 440px;
//     box-shadow: 0 32px 80px rgba(0,0,0,0.6);
//     animation: slideUp 0.3s cubic-bezier(0.16,1,0.3,1) both;
//   }

//   @keyframes slideUp {
//     from { opacity: 0; transform: translateY(24px); }
//     to { opacity: 1; transform: translateY(0); }
//   }

//   .modal-title {
//     font-family: 'Syne', sans-serif;
//     font-size: 20px; font-weight: 700;
//     margin-bottom: 6px;
//   }

//   .modal-sub { font-size: 13.5px; color: var(--muted); margin-bottom: 24px; }

//   .modal-field { margin-bottom: 16px; }
//   .modal-field label {
//     display: block;
//     font-size: 12px; font-weight: 500;
//     color: var(--muted); letter-spacing: 0.05em;
//     margin-bottom: 7px;
//   }

//   .modal-input, .modal-select {
//     width: 100%;
//     background: rgba(255,255,255,0.05);
//     border: 1px solid var(--border);
//     border-radius: 10px;
//     padding: 11px 14px;
//     color: var(--text);
//     font-family: 'DM Sans', sans-serif;
//     font-size: 14px;
//     outline: none;
//     transition: border-color 0.2s, box-shadow 0.2s;
//   }
//   .modal-input:focus, .modal-select:focus {
//     border-color: rgba(124,92,252,0.6);
//     box-shadow: 0 0 0 3px rgba(124,92,252,0.1);
//   }
//   .modal-select option { background: #12121e; }

//   .modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 24px; }

//   /* ── Stats row ── */
//   .stats-row {
//     display: grid;
//     grid-template-columns: repeat(3, 1fr);
//     gap: 14px;
//     margin-bottom: 32px;
//     animation: fadeUp 0.4s ease 0.1s both;
//   }

//   .stat-card {
//     background: var(--surface);
//     border: 1px solid var(--border);
//     border-radius: 14px;
//     padding: 20px;
//   }

//   .stat-label { font-size: 12px; color: var(--muted); margin-bottom: 8px; letter-spacing: 0.04em; }
//   .stat-value {
//     font-family: 'Syne', sans-serif;
//     font-size: 28px; font-weight: 800;
//     letter-spacing: -0.02em;
//   }

//   /* spinner */
//   .spinner {
//     width: 18px; height: 18px;
//     border: 2px solid rgba(255,255,255,0.15);
//     border-top-color: #fff;
//     border-radius: 50%;
//     animation: spin 0.7s linear infinite;
//     display: inline-block;
//   }
//   @keyframes spin { to { transform: rotate(360deg); } }

//   .loading-state {
//     display: flex; align-items: center; justify-content: center;
//     height: 60vh; flex-direction: column; gap: 14px; color: var(--muted);
//   }
// `;

// // ── Colour palette for project dots
// const DOT_COLORS = ["#7c5cfc","#fc5c8a","#5cf8fc","#fbbf24","#34d399","#f87171","#a78bfa"];

// // ── Mock data generators (replace with real API data)
// const MOCK_MEMBERS = [
//   { _id:"m1", name:"Aryan Shah", role:"Owner", email:"aryan@co.com" },
//   { _id:"m2", name:"Priya Mehta", role:"Developer", email:"priya@co.com" },
//   { _id:"m3", name:"Rahul Das", role:"Designer", email:"rahul@co.com" },
// ];
// const MOCK_ISSUES = [
//   { _id:"i1", title:"Fix auth token expiry bug", desc:"Token doesn't refresh after 1h on mobile", priority:"high", status:"open", tags:["bug","auth"] },
//   { _id:"i2", title:"Improve dashboard load time", desc:"Dashboard takes 3s+ on slow connections", priority:"medium", status:"progress", tags:["performance"] },
//   { _id:"i3", title:"Add dark mode toggle", desc:"Users requested a theme switch option", priority:"low", status:"closed", tags:["ui","feature"] },
// ];
// const MOCK_COMMENTS = [
//   { _id:"c1", author:"Aryan Shah", text:"Just pushed a fix for the token refresh. Can someone review?", time:"2h ago" },
//   { _id:"c2", author:"Priya Mehta", text:"Looks good! I'll test it on the staging environment.", time:"1h ago" },
// ];

// // ── Icons
// const Icon = ({ d, size=16 }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     {Array.isArray(d) ? d.map((p,i) => <path key={i} d={p}/>) : <path d={d}/>}
//   </svg>
// );

// const PlusIcon = () => <Icon d="M12 5v14M5 12h14" />;
// const UsersIcon = () => <Icon d={["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2","M23 21v-2a4 4 0 0 0-3-3.87","M16 3.13a4 4 0 0 1 0 7.75"]} />;
// const IssueIcon = () => <Icon d={["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z","M12 8v4","M12 16h.01"]} />;
// const CommentIcon = () => <Icon d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />;
// const XIcon = () => <Icon d="M18 6L6 18M6 6l12 12" size={14} />;
// const SendIcon = () => <Icon d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />;
// const FolderIcon = () => <Icon d={["M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"]} size={20} />;

// export default function Dashboard() {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selected, setSelected] = useState(null);
//   const [tab, setTab] = useState("members");
//   const [members, setMembers] = useState(MOCK_MEMBERS);
//   const [issues, setIssues] = useState(MOCK_ISSUES);
//   const [comments, setComments] = useState(MOCK_COMMENTS);
//   const [commentText, setCommentText] = useState("");
//   const [showMemberModal, setShowMemberModal] = useState(false);
//   const [showIssueModal, setShowIssueModal] = useState(false);
//   const [newMember, setNewMember] = useState({ name:"", email:"", role:"Developer" });
//   const [newIssue, setNewIssue] = useState({ title:"", desc:"", priority:"medium" });

//   useEffect(() => { fetchProjects(); }, []);

//   const fetchProjects = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("http://localhost:5000/api/projects", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setProjects(res.data);
//     } catch {
//       // fallback mock
//       setProjects([
//         { _id:"p1", name:"Nova App", description:"Mobile-first redesign", status:"active" },
//         { _id:"p2", name:"Analytics Engine", description:"Real-time data pipeline", status:"active" },
//         { _id:"p3", name:"Design System", description:"Component library v2", status:"paused" },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const selectProject = (p) => { setSelected(p); setTab("members"); };

//   const addMember = () => {
//     if (!newMember.name || !newMember.email) return;
//     setMembers(prev => [...prev, { _id: Date.now().toString(), ...newMember }]);
//     setNewMember({ name:"", email:"", role:"Developer" });
//     setShowMemberModal(false);
//   };

//   const removeMember = (id) => setMembers(prev => prev.filter(m => m._id !== id));

//   const addIssue = () => {
//     if (!newIssue.title) return;
//     setIssues(prev => [...prev, { _id: Date.now().toString(), ...newIssue, status:"open", tags:[] }]);
//     setNewIssue({ title:"", desc:"", priority:"medium" });
//     setShowIssueModal(false);
//   };

//   const addComment = () => {
//     if (!commentText.trim()) return;
//     setComments(prev => [...prev, { _id: Date.now().toString(), author:"You", text: commentText, time:"just now" }]);
//     setCommentText("");
//   };

//   const initials = (name) => name.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);

//   return (
//     <>
//       <style>{styles}</style>
//       <div className="dash-root">

//         {/* Topbar */}
//         <div className="topbar">
//           <span className="topbar-logo">Projectify</span>
//           <div className="topbar-right">
//             <span style={{fontSize:13,color:"var(--muted)"}}>
//               {new Date().toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short"})}
//             </span>
//             <div className="avatar">YO</div>
//           </div>
//         </div>

//         <div className="dash-body">

//           {/* Sidebar */}
//           <aside className="sidebar">
//             <p className="sidebar-label">Projects</p>
//             {loading ? (
//               <div style={{padding:"20px 12px", color:"var(--muted)", fontSize:13}}>Loading…</div>
//             ) : projects.map((p, i) => (
//               <div
//                 key={p._id}
//                 className={`project-item ${selected?._id === p._id ? "active" : ""}`}
//                 onClick={() => selectProject(p)}
//               >
//                 <span className="project-dot" style={{ background: DOT_COLORS[i % DOT_COLORS.length] }} />
//                 <span className="project-item-name">{p.name}</span>
//               </div>
//             ))}
//             <button className="new-project-btn" onClick={() => alert("Create project coming soon!")}>
//               <PlusIcon /> New Project
//             </button>
//           </aside>

//           {/* Main */}
//           <main className="main-panel">
//             {!selected ? (
//               <div className="empty-state">
//                 <div className="empty-icon"><FolderIcon /></div>
//                 <h3>Select a project</h3>
//                 <p>Click any project from the sidebar to view members, issues, and comments.</p>
//               </div>
//             ) : (
//               <>
//                 {/* Project header */}
//                 <div className="project-header">
//                   <div>
//                     <h1 className="project-title">{selected.name}</h1>
//                     <div className="project-meta">
//                       <span className={`status-badge status-${selected.status || "active"}`}>
//                         {selected.status || "Active"}
//                       </span>
//                       <span>{selected.description || "No description"}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Stats */}
//                 <div className="stats-row">
//                   <div className="stat-card">
//                     <p className="stat-label">Members</p>
//                     <p className="stat-value" style={{color:"#a48aff"}}>{members.length}</p>
//                   </div>
//                   <div className="stat-card">
//                     <p className="stat-label">Open Issues</p>
//                     <p className="stat-value" style={{color:"var(--danger)"}}>{issues.filter(i=>i.status==="open").length}</p>
//                   </div>
//                   <div className="stat-card">
//                     <p className="stat-label">Comments</p>
//                     <p className="stat-value" style={{color:"var(--success)"}}>{comments.length}</p>
//                   </div>
//                 </div>

//                 {/* Tabs */}
//                 <div className="tabs">
//                   {[
//                     { key:"members", label:"Members", icon:<UsersIcon />, count: members.length },
//                     { key:"issues", label:"Issues", icon:<IssueIcon />, count: issues.length },
//                     { key:"comments", label:"Comments", icon:<CommentIcon />, count: comments.length },
//                   ].map(t => (
//                     <button
//                       key={t.key}
//                       className={`tab-btn ${tab === t.key ? "active" : ""}`}
//                       onClick={() => setTab(t.key)}
//                     >
//                       {t.icon} {t.label}
//                       <span className="tab-count">{t.count}</span>
//                     </button>
//                   ))}
//                 </div>

//                 {/* ── Members Tab ── */}
//                 {tab === "members" && (
//                   <>
//                     <div className="section-header">
//                       <h2 className="section-title">Team Members</h2>
//                       <button className="btn-primary" onClick={() => setShowMemberModal(true)}>
//                         <PlusIcon /> Add Member
//                       </button>
//                     </div>
//                     <div className="members-grid">
//                       {members.map((m, i) => (
//                         <div className="member-card" key={m._id} style={{animationDelay:`${i*0.05}s`}}>
//                           <div className="member-avatar" style={{background: `linear-gradient(135deg, ${DOT_COLORS[i%DOT_COLORS.length]}, ${DOT_COLORS[(i+2)%DOT_COLORS.length]})`}}>
//                             {initials(m.name)}
//                           </div>
//                           <div className="member-info">
//                             <p className="member-name">{m.name}</p>
//                             <p className="member-role">{m.role}</p>
//                           </div>
//                           <button className="member-remove" onClick={() => removeMember(m._id)}>
//                             <XIcon />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </>
//                 )}

//                 {/* ── Issues Tab ── */}
//                 {tab === "issues" && (
//                   <>
//                     <div className="section-header">
//                       <h2 className="section-title">Issues</h2>
//                       <button className="btn-primary" onClick={() => setShowIssueModal(true)}>
//                         <PlusIcon /> New Issue
//                       </button>
//                     </div>
//                     <div className="issues-list">
//                       {issues.map((issue, i) => (
//                         <div className="issue-card" key={issue._id} style={{animationDelay:`${i*0.05}s`}}>
//                           <span className={`issue-priority p-${issue.priority}`} />
//                           <div className="issue-body">
//                             <p className="issue-title">{issue.title}</p>
//                             <p className="issue-desc">{issue.desc}</p>
//                             {issue.tags.length > 0 && (
//                               <div className="issue-tags">
//                                 {issue.tags.map(t => <span key={t} className="issue-tag">{t}</span>)}
//                               </div>
//                             )}
//                           </div>
//                           <span className={`issue-status is-${issue.status}`}>
//                             {issue.status === "progress" ? "In Progress" : issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   </>
//                 )}

//                 {/* ── Comments Tab ── */}
//                 {tab === "comments" && (
//                   <>
//                     <div className="section-header">
//                       <h2 className="section-title">Discussion</h2>
//                     </div>
//                     <div className="comments-list">
//                       {comments.map((c, i) => (
//                         <div className="comment-item" key={c._id} style={{animationDelay:`${i*0.05}s`}}>
//                           <div className="comment-avatar" style={{background:`linear-gradient(135deg,${DOT_COLORS[i%DOT_COLORS.length]},${DOT_COLORS[(i+3)%DOT_COLORS.length]})`}}>
//                             {initials(c.author)}
//                           </div>
//                           <div className="comment-bubble">
//                             <div className="comment-meta">
//                               <span className="comment-author">{c.author}</span>
//                               <span className="comment-time">{c.time}</span>
//                             </div>
//                             <p className="comment-text">{c.text}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                     <div className="comment-input-row">
//                       <textarea
//                         className="comment-input"
//                         placeholder="Write a comment…"
//                         value={commentText}
//                         onChange={e => setCommentText(e.target.value)}
//                         onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); addComment(); } }}
//                         rows={2}
//                       />
//                       <button className="btn-primary" onClick={addComment} style={{padding:"11px 16px"}}>
//                         <SendIcon />
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </>
//             )}
//           </main>
//         </div>
//       </div>

//       {/* ── Add Member Modal ── */}
//       {showMemberModal && (
//         <div className="modal-overlay" onClick={() => setShowMemberModal(false)}>
//           <div className="modal" onClick={e => e.stopPropagation()}>
//             <h2 className="modal-title">Add Member</h2>
//             <p className="modal-sub">Invite someone to collaborate on this project.</p>
//             <div className="modal-field">
//               <label>Full Name</label>
//               <input className="modal-input" placeholder="e.g. Priya Sharma"
//                 value={newMember.name} onChange={e => setNewMember({...newMember, name:e.target.value})} />
//             </div>
//             <div className="modal-field">
//               <label>Email Address</label>
//               <input className="modal-input" placeholder="priya@company.com" type="email"
//                 value={newMember.email} onChange={e => setNewMember({...newMember, email:e.target.value})} />
//             </div>
//             <div className="modal-field">
//               <label>Role</label>
//               <select className="modal-select" value={newMember.role} onChange={e => setNewMember({...newMember, role:e.target.value})}>
//                 <option>Developer</option>
//                 <option>Designer</option>
//                 <option>Manager</option>
//                 <option>QA Engineer</option>
//                 <option>Viewer</option>
//               </select>
//             </div>
//             <div className="modal-actions">
//               <button className="btn-secondary" onClick={() => setShowMemberModal(false)}>Cancel</button>
//               <button className="btn-primary" onClick={addMember}><PlusIcon /> Add Member</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ── New Issue Modal ── */}
//       {showIssueModal && (
//         <div className="modal-overlay" onClick={() => setShowIssueModal(false)}>
//           <div className="modal" onClick={e => e.stopPropagation()}>
//             <h2 className="modal-title">Create Issue</h2>
//             <p className="modal-sub">Track a bug, task, or feature request.</p>
//             <div className="modal-field">
//               <label>Issue Title</label>
//               <input className="modal-input" placeholder="e.g. Login page crashes on Safari"
//                 value={newIssue.title} onChange={e => setNewIssue({...newIssue, title:e.target.value})} />
//             </div>
//             <div className="modal-field">
//               <label>Description</label>
//               <input className="modal-input" placeholder="More context…"
//                 value={newIssue.desc} onChange={e => setNewIssue({...newIssue, desc:e.target.value})} />
//             </div>
//             <div className="modal-field">
//               <label>Priority</label>
//               <select className="modal-select" value={newIssue.priority} onChange={e => setNewIssue({...newIssue, priority:e.target.value})}>
//                 <option value="high">🔴 High</option>
//                 <option value="medium">🟡 Medium</option>
//                 <option value="low">🟢 Low</option>
//               </select>
//             </div>
//             <div className="modal-actions">
//               <button className="btn-secondary" onClick={() => setShowIssueModal(false)}>Cancel</button>
//               <button className="btn-primary" onClick={addIssue}><PlusIcon /> Create Issue</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const API = "http://localhost:5000";

// const api = () => {
//   const token = localStorage.getItem("token");
//   return axios.create({
//     baseURL: API,
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

//   *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

//   :root {
//     --bg: #080810;
//     --surface: rgba(255,255,255,0.04);
//     --border: rgba(255,255,255,0.08);
//     --accent: #7c5cfc;
//     --accent2: #fc5c8a;
//     --text: #e8e4ff;
//     --muted: rgba(255,255,255,0.38);
//     --success: #34d399;
//     --warning: #fbbf24;
//     --danger: #f87171;
//   }

//   body { background: var(--bg); }

//   .dash-root {
//     min-height: 100vh;
//     background: var(--bg);
//     font-family: 'DM Sans', sans-serif;
//     color: var(--text);
//     display: flex;
//     flex-direction: column;
//   }

//   .topbar {
//     display: flex; align-items: center; justify-content: space-between;
//     padding: 0 32px; height: 64px;
//     border-bottom: 1px solid var(--border);
//     background: rgba(8,8,16,0.85);
//     backdrop-filter: blur(20px);
//     position: sticky; top: 0; z-index: 100;
//   }

//   .topbar-logo {
//     font-family: 'Syne', sans-serif; font-weight: 800; font-size: 20px;
//     background: linear-gradient(135deg, #a48aff, #fc5c8a);
//     -webkit-background-clip: text; -webkit-text-fill-color: transparent;
//     letter-spacing: -0.02em;
//   }

//   .topbar-right { display: flex; align-items: center; gap: 16px; }

//   .logout-btn {
//     display: flex; align-items: center; gap: 7px;
//     padding: 7px 14px;
//     background: rgba(255,255,255,0.05);
//     border: 1px solid var(--border); border-radius: 8px;
//     color: var(--muted); font-family: 'DM Sans', sans-serif; font-size: 13px;
//     cursor: pointer; transition: color 0.2s, border-color 0.2s;
//   }
//   .logout-btn:hover { color: var(--danger); border-color: rgba(248,113,113,0.3); }

//   .avatar {
//     width: 36px; height: 36px; border-radius: 50%;
//     background: linear-gradient(135deg, var(--accent), var(--accent2));
//     display: flex; align-items: center; justify-content: center;
//     font-family: 'Syne', sans-serif; font-weight: 700; font-size: 13px; color: #fff;
//   }

//   .dash-body { display: flex; flex: 1; overflow: hidden; }

//   .sidebar {
//     width: 280px; min-height: calc(100vh - 64px);
//     border-right: 1px solid var(--border);
//     padding: 24px 16px;
//     display: flex; flex-direction: column; gap: 6px;
//     overflow-y: auto; flex-shrink: 0;
//   }

//   .sidebar-label {
//     font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
//     color: var(--muted); padding: 8px 12px 4px; font-weight: 500;
//   }

//   .project-item {
//     display: flex; align-items: center; gap: 12px;
//     padding: 10px 12px; border-radius: 10px; cursor: pointer;
//     transition: background 0.15s; border: 1px solid transparent;
//   }
//   .project-item:hover { background: var(--surface); }
//   .project-item.active { background: rgba(124,92,252,0.12); border-color: rgba(124,92,252,0.25); }

//   .project-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

//   .project-item-name {
//     font-size: 14px; font-weight: 400;
//     white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1;
//   }
//   .project-item.active .project-item-name { color: #a48aff; font-weight: 500; }

//   .project-item-del {
//     background: none; border: none; cursor: pointer;
//     color: transparent; padding: 2px; transition: color 0.2s; flex-shrink: 0;
//   }
//   .project-item:hover .project-item-del { color: rgba(248,113,113,0.4); }
//   .project-item-del:hover { color: var(--danger) !important; }

//   .new-project-btn {
//     display: flex; align-items: center; gap: 10px;
//     padding: 10px 12px; border-radius: 10px; cursor: pointer;
//     border: 1px dashed rgba(255,255,255,0.12); background: none;
//     color: var(--muted); font-family: 'DM Sans', sans-serif; font-size: 13.5px;
//     width: 100%; margin-top: 8px; transition: border-color 0.2s, color 0.2s;
//   }
//   .new-project-btn:hover { border-color: var(--accent); color: #a48aff; }

//   .main-panel { flex: 1; overflow-y: auto; padding: 32px; min-width: 0; }

//   .empty-state {
//     display: flex; flex-direction: column; align-items: center; justify-content: center;
//     height: 60vh; gap: 16px; color: var(--muted); text-align: center;
//   }
//   .empty-icon {
//     width: 72px; height: 72px; border-radius: 20px;
//     background: var(--surface); border: 1px solid var(--border);
//     display: flex; align-items: center; justify-content: center;
//     font-size: 28px; margin-bottom: 8px;
//   }
//   .empty-state h3 { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; color: var(--text); }
//   .empty-state p { font-size: 14px; max-width: 280px; line-height: 1.6; }

//   .project-header {
//     display: flex; align-items: flex-start; justify-content: space-between;
//     margin-bottom: 32px; animation: fadeUp 0.4s ease both;
//   }

//   @keyframes fadeUp {
//     from { opacity: 0; transform: translateY(16px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }

//   .project-title {
//     font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800;
//     letter-spacing: -0.02em; margin-bottom: 6px;
//   }

//   .project-meta { display: flex; align-items: center; gap: 12px; font-size: 13px; color: var(--muted); }

//   .status-badge { padding: 3px 10px; border-radius: 20px; font-size: 11.5px; font-weight: 500; }
//   .status-active { background: rgba(52,211,153,0.12); color: #34d399; border: 1px solid rgba(52,211,153,0.2); }

//   .stats-row {
//     display: grid; grid-template-columns: repeat(3,1fr); gap: 14px;
//     margin-bottom: 32px; animation: fadeUp 0.4s ease 0.1s both;
//   }
//   .stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 20px; }
//   .stat-label { font-size: 12px; color: var(--muted); margin-bottom: 8px; letter-spacing: 0.04em; }
//   .stat-value { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; letter-spacing: -0.02em; }

//   .tabs { display: flex; gap: 4px; border-bottom: 1px solid var(--border); margin-bottom: 28px; }
//   .tab-btn {
//     display: flex; align-items: center; gap: 7px;
//     padding: 10px 18px; border: none; background: none;
//     font-family: 'DM Sans', sans-serif; font-size: 13.5px; color: var(--muted);
//     cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px;
//     transition: color 0.2s, border-color 0.2s;
//   }
//   .tab-btn:hover { color: var(--text); }
//   .tab-btn.active { color: #a48aff; border-bottom-color: var(--accent); font-weight: 500; }
//   .tab-count { background: rgba(124,92,252,0.18); color: #a48aff; font-size: 11px; padding: 1px 7px; border-radius: 20px; }

//   .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
//   .section-title { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; }

//   .btn-primary {
//     display: flex; align-items: center; gap: 7px; padding: 9px 18px;
//     background: linear-gradient(135deg, #7c5cfc, #c05cfc);
//     border: none; border-radius: 10px; color: #fff;
//     font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 500; cursor: pointer;
//     box-shadow: 0 4px 16px rgba(124,92,252,0.3); transition: opacity 0.2s, transform 0.15s;
//   }
//   .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
//   .btn-primary:active { transform: scale(0.97); }
//   .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

//   .btn-secondary {
//     display: flex; align-items: center; gap: 7px; padding: 9px 16px;
//     background: var(--surface); border: 1px solid var(--border); border-radius: 10px;
//     color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 13px; cursor: pointer;
//     transition: background 0.2s;
//   }
//   .btn-secondary:hover { background: rgba(255,255,255,0.07); }

//   .members-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(220px,1fr)); gap: 14px; }
//   .member-card {
//     background: var(--surface); border: 1px solid var(--border); border-radius: 14px;
//     padding: 18px; display: flex; align-items: center; gap: 14px;
//     animation: fadeUp 0.3s ease both; transition: border-color 0.2s;
//   }
//   .member-card:hover { border-color: rgba(255,255,255,0.14); }
//   .member-avatar {
//     width: 42px; height: 42px; border-radius: 50%;
//     display: flex; align-items: center; justify-content: center;
//     font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15px; color: #fff; flex-shrink: 0;
//   }
//   .member-info { flex: 1; min-width: 0; }
//   .member-name { font-size: 14px; font-weight: 500; margin-bottom: 3px; }
//   .member-role { font-size: 12px; color: var(--muted); }

//   .issues-list { display: flex; flex-direction: column; gap: 10px; }
//   .issue-card {
//     background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
//     padding: 16px 18px; display: flex; align-items: flex-start; gap: 14px;
//     animation: fadeUp 0.3s ease both; transition: border-color 0.2s, background 0.2s;
//   }
//   .issue-card:hover { border-color: rgba(255,255,255,0.14); background: rgba(255,255,255,0.05); }
//   .issue-priority { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; margin-top: 5px; }
//   .p-high   { background: var(--danger);  box-shadow: 0 0 8px rgba(248,113,113,0.5); }
//   .p-medium { background: var(--warning); box-shadow: 0 0 8px rgba(251,191,36,0.4); }
//   .p-low    { background: var(--success); box-shadow: 0 0 8px rgba(52,211,153,0.4); }
//   .issue-body { flex: 1; min-width: 0; }
//   .issue-title { font-size: 14px; font-weight: 500; margin-bottom: 5px; }
//   .issue-desc  { font-size: 12.5px; color: var(--muted); line-height: 1.5; }
//   .issue-actions { display: flex; gap: 8px; flex-shrink: 0; align-items: center; }
//   .status-select {
//     background: rgba(255,255,255,0.04); border: 1px solid var(--border);
//     border-radius: 8px; padding: 3px 8px; color: var(--muted);
//     font-family: 'DM Sans', sans-serif; font-size: 12px; cursor: pointer; outline: none;
//   }
//   .issue-status-badge { font-size: 11px; padding: 3px 10px; border-radius: 20px; font-weight: 500; }
//   .is-open     { background: rgba(248,113,113,0.12); color: var(--danger);  border: 1px solid rgba(248,113,113,0.2); }

//   // .is-progress { background: rgba(251,191,36,0.12);  color: var(--warning); border: 1px solid rgba(251,191,36,0.2); }
//   .is-in-progress { background: rgba(251,191,36,0.12); color: var(--warning); border: 1px solid rgba(251,191,36,0.2); }
//   .is-todo { background: rgba(248,113,113,0.12); color: var(--danger); border: 1px solid rgba(248,113,113,0.2); }
//   .is-done { background: rgba(52,211,153,0.12); color: var(--success); border: 1px solid rgba(52,211,153,0.2); }
//   .priority-badge {
//     font-size: 11px; font-weight: 600;
//     padding: 2px 9px; border-radius: 20px;
//     letter-spacing: 0.04em; flex-shrink: 0;
//   }
//   .p-badge-high     { background: rgba(248,113,113,0.15); color: #f87171; border: 1px solid rgba(248,113,113,0.3); }
//   .p-badge-medium   { background: rgba(251,191,36,0.15);  color: #fbbf24; border: 1px solid rgba(251,191,36,0.3); }
//   .p-badge-low      { background: rgba(52,211,153,0.15);  color: #34d399; border: 1px solid rgba(52,211,153,0.3); }
//   .p-badge-critical { background: rgba(220,38,38,0.2);    color: #ff4444; border: 1px solid rgba(220,38,38,0.4); }
//   .is-resolved { background: rgba(52,211,153,0.12);  color: var(--success); border: 1px solid rgba(52,211,153,0.2); }
//   .is-closed   { background: rgba(124,92,252,0.12);  color: #a48aff;        border: 1px solid rgba(124,92,252,0.2); }
//   .icon-btn { background: none; border: none; cursor: pointer; color: var(--muted); padding: 4px; transition: color 0.2s; }
//   .icon-btn:hover { color: var(--danger); }

//   .comments-list { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
//   .comment-item { display: flex; gap: 14px; animation: fadeUp 0.3s ease both; }
//   .comment-avatar {
//     width: 36px; height: 36px; border-radius: 50%;
//     display: flex; align-items: center; justify-content: center;
//     font-family: 'Syne', sans-serif; font-weight: 700; font-size: 13px; color: #fff; flex-shrink: 0;
//   }
//   .comment-bubble {
//     flex: 1; background: var(--surface); border: 1px solid var(--border);
//     border-radius: 0 12px 12px 12px; padding: 12px 16px;
//   }
//   .comment-meta { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
//   .comment-meta-left { display: flex; align-items: center; gap: 10px; }
//   .comment-author { font-size: 13px; font-weight: 500; }
//   .comment-time   { font-size: 11.5px; color: var(--muted); }
//   .comment-text   { font-size: 13.5px; line-height: 1.6; color: rgba(255,255,255,0.75); }
//   .comment-input-row { display: flex; gap: 12px; align-items: flex-end; }
//   .comment-input {
//     flex: 1; background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
//     padding: 12px 16px; color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 14px;
//     resize: none; outline: none; transition: border-color 0.2s, box-shadow 0.2s; min-height: 48px;
//   }
//   .comment-input::placeholder { color: rgba(255,255,255,0.2); }
//   .comment-input:focus { border-color: rgba(124,92,252,0.6); box-shadow: 0 0 0 3px rgba(124,92,252,0.1); }

//   .modal-overlay {
//     position: fixed; inset: 0; background: rgba(0,0,0,0.7);
//     backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center;
//     z-index: 200; animation: fadeIn 0.2s ease;
//   }
//   @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
//   .modal {
//     background: #12121e; border: 1px solid rgba(255,255,255,0.1);
//     border-radius: 20px; padding: 32px; width: 440px;
//     box-shadow: 0 32px 80px rgba(0,0,0,0.6);
//     animation: slideUp 0.3s cubic-bezier(0.16,1,0.3,1) both;
//   }
//   @keyframes slideUp {
//     from { opacity: 0; transform: translateY(24px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }
//   .modal-title { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; margin-bottom: 6px; }
//   .modal-sub { font-size: 13.5px; color: var(--muted); margin-bottom: 24px; }
//   .modal-field { margin-bottom: 16px; }
//   .modal-field label { display: block; font-size: 12px; font-weight: 500; color: var(--muted); letter-spacing: 0.05em; margin-bottom: 7px; }
//   .modal-input, .modal-select {
//     width: 100%; background: rgba(255,255,255,0.05); border: 1px solid var(--border);
//     border-radius: 10px; padding: 11px 14px; color: var(--text);
//     font-family: 'DM Sans', sans-serif; font-size: 14px; outline: none;
//     transition: border-color 0.2s, box-shadow 0.2s;
//   }
//   .modal-input:focus, .modal-select:focus { border-color: rgba(124,92,252,0.6); box-shadow: 0 0 0 3px rgba(124,92,252,0.1); }
//   .modal-select option { background: #12121e; }
//   .modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 24px; }

//   .toast {
//     position: fixed; bottom: 28px; right: 28px;
//     padding: 13px 20px; border-radius: 12px; font-size: 13.5px; font-weight: 500;
//     box-shadow: 0 8px 32px rgba(0,0,0,0.4); z-index: 300; animation: slideUp 0.3s ease both;
//   }
//   .toast-error   { background: rgba(248,113,113,0.15); border: 1px solid rgba(248,113,113,0.3); color: var(--danger); }
//   .toast-success { background: rgba(52,211,153,0.12);  border: 1px solid rgba(52,211,153,0.25); color: var(--success); }

//   .spinner-sm {
//     width: 14px; height: 14px;
//     border: 2px solid rgba(255,255,255,0.2); border-top-color: #fff;
//     border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block;
//   }
//   @keyframes spin { to { transform: rotate(360deg); } }

//   .inline-loader { display: flex; align-items: center; gap: 10px; padding: 40px 0; color: var(--muted); font-size: 14px; justify-content: center; }
//   .no-data { color: var(--muted); font-size: 14px; padding: 8px 0; }


//   .btn-ai-summary {
//     background: linear-gradient(135deg, #7c3aed, #4f46e5);
//     color: #fff;
//     border: none;
//     border-radius: 8px;
//     padding: 5px 12px;
//     font-size: 12px;
//     font-weight: 600;
//     cursor: pointer;
//     transition: opacity 0.2s;
//     display: flex; align-items: center; gap: 4px;
//   }
//   .btn-ai-summary:hover { opacity: 0.85; }
//   .btn-ai-summary:disabled { opacity: 0.5; cursor: not-allowed; }

//   .ai-summary-panel {
//     margin-top: 20px;
//     background: linear-gradient(135deg, rgba(124,58,237,0.08), rgba(79,70,229,0.06));
//     border: 1px solid rgba(124,58,237,0.3);
//     border-radius: 14px;
//     padding: 20px;
//     animation: fadeUp 0.3s ease;
//   }
//   .ai-summary-header {
//     display: flex; justify-content: space-between; align-items: center;
//     margin-bottom: 16px;
//   }
//   .ai-badge {
//     background: linear-gradient(135deg, #7c3aed, #4f46e5);
//     color: #fff;
//     font-size: 12px; font-weight: 700;
//     padding: 4px 12px; border-radius: 20px;
//     letter-spacing: 0.5px;
//   }
//   .ai-section { margin-bottom: 14px; }
//   .ai-section-label {
//     font-size: 12px; font-weight: 700;
//     color: #a78bfa; margin-bottom: 6px; letter-spacing: 0.4px;
//   }
//   .ai-section-text { font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin: 0; }
//   .ai-action-list {
//     margin: 0; padding-left: 18px;
//     color: var(--text-secondary); font-size: 14px; line-height: 1.8;
//   }
//   .ai-next-step {
//     color: #a78bfa !important;
//     font-weight: 500;
//   }


//   .assign-checkbox-list {
//     display: flex;
//     flex-direction: column;
//     gap: 8px;
//     max-height: 150px;
//     overflow-y: auto;
//     padding: 4px 0;
//   }
//   .assign-checkbox-item {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     font-size: 14px;
//     color: var(--text-secondary);
//     cursor: pointer;
//   }
//   .assign-checkbox-item input[type="checkbox"] {
//     accent-color: #7c3aed;
//     width: 15px;
//     height: 15px;
//     cursor: pointer;
//   }
// `;

// const DOT_COLORS = ["#7c5cfc","#fc5c8a","#5cf8fc","#fbbf24","#34d399","#f87171","#a78bfa"];
// const initials = (name = "") => name.split(" ").map(w => w[0] || "").join("").toUpperCase().slice(0,2) || "?";
// const timeAgo = (d) => {
//   if (!d) return "";
//   const s = Math.floor((Date.now() - new Date(d)) / 1000);
//   if (s < 60) return "just now";
//   if (s < 3600) return `${Math.floor(s/60)}m ago`;
//   if (s < 86400) return `${Math.floor(s/3600)}h ago`;
//   return `${Math.floor(s/86400)}d ago`;
// };

// // ── Icons
// const Ic = ({ d, size=16 }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     {(Array.isArray(d) ? d : [d]).map((p, i) => <path key={i} d={p}/>)}
//   </svg>
// );
// const PlusIcon    = () => <Ic d="M12 5v14M5 12h14"/>;
// const XIcon       = () => <Ic d="M18 6L6 18M6 6l12 12" size={13}/>;
// const SendIcon    = () => <Ic d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>;
// const TrashIcon   = () => <Ic d={["M3 6h18","M19 6l-1 14H6L5 6","M8 6V4h8v2"]} size={14}/>;
// const FolderIcon  = () => <Ic d={["M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"]} size={20}/>;
// const LogoutIcon  = () => <Ic d={["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4","M16 17l5-5-5-5","M21 12H9"]}/>;
// const UsersIcon   = () => <Ic d={["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2","M23 21v-2a4 4 0 0 0-3-3.87","M16 3.13a4 4 0 0 1 0 7.75"]}/>;
// const IssueIcon   = () => <Ic d={["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z","M12 8v4","M12 16h.01"]}/>;
// const CommentIcon = () => <Ic d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>;

// export default function Dashboard() {
//   const navigate = useNavigate();

//   const [projects, setProjects]= useState([]);
//   const [selected, setSelected]= useState(null);
//   const [tab, setTab]= useState("members");
//   const [members, setMembers]= useState([]);
//   const [issues, setIssues]= useState([]);
//   const [comments, setComments]= useState([]);
//   const [activeIssue, setActiveIssue]= useState(null); // issue whose comments are shown
//   const [commentText, setCommentText]= useState("");
//   const [loadingProjects, setLoadingProjects]= useState(true);
//   const [loadingTab, setLoadingTab]= useState(false);
//   const [submitting, setSubmitting]= useState(false);
//   const [toast, setToast]= useState(null);
//   const [totalComments, setTotalComments] = useState(0);
//   const [showProjectModal, setShowProjectModal] = useState(false);
//   const [showMemberModal,  setShowMemberModal]  = useState(false);
//   const [showIssueModal,   setShowIssueModal]   = useState(false);
//   const [newProject, setNewProject] = useState({ projectName:"", description:"" });
//   const [newMember,  setNewMember]  = useState({ email:"" });
//   // const [newIssue, setNewIssue] = useState({ title:"", description:"", priority:"Medium", assignedTo:"" });

//   // REPLACE WITH:
//   const [newIssue, setNewIssue] = useState({ title:"", description:"", priority:"Medium", assignedTo:[] });

//   const [aiSummary, setAiSummary] = useState(null);
//   const [loadingAI, setLoadingAI] = useState(false);

//   const showToast = (msg, type="error") => {
//     setToast({ msg, type });
//     setTimeout(() => setToast(null), 3200);
//   };

//   // ── Load projects on mount
//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await api().get("/projects");          // GET /api/projects
//         setProjects(res.data);
//       } catch (e) {
//         if (e?.response?.status === 401) { navigate("/login"); return; }
//         showToast("Failed to load projects");
//       } finally {
//         setLoadingProjects(false);
//       }
//     })();
//   }, []);

//   // ── Load data for the active tab
//   const loadTab = useCallback(async (project, activeTab) => {
//     if (!project) return;
//     setLoadingTab(true);
//     try {
//       if (activeTab === "members") {
//         // Refresh project to get populated members
//         const res = await api().get("/projects");         // GET /api/projects
//         const found = res.data.find(p => p._id === project._id);
//         setMembers(found?.members || []);
//       }
//       if (activeTab === "issues") {
//         const res = await api().get(`/issues/${project._id}`);  // GET /api/issues/:projectId
//         setIssues(res.data);
//       }
//       if (activeTab === "comments") {
//         const issuesRes = await api().get(`/projects/${project._id}/issues`); // GET /api/projects/:id/issues
//         const list = issuesRes.data || [];
//         setIssues(list);
//         if (list.length > 0) {
//           const first = list[0];
//           setActiveIssue(first);
//           const commRes = await api().get(`/comments/${first._id}`); // GET /api/comments/:issueId
//           setComments(commRes.data);
//         } else {
//           setActiveIssue(null);
//           setComments([]);
//         }
//       }
//     } catch (e) {
//       showToast(`Failed to load ${activeTab}`);
//     } finally {
//       setLoadingTab(false);
//     }
//   }, []);

//   // const selectProject = (p) => {
//   //   setSelected(p);
//   //   setTab("members");
//   //   setMembers([]); setIssues([]); setComments([]); setActiveIssue(null);
//   //   loadTab(p, "members");
//   // };


//   // REPLACE WITH:
//   const selectProject = async (p) => {
//     setSelected(p);
//     setTab("members");
//     setMembers([]); setIssues([]); setComments([]); setActiveIssue(null);
//     setLoadingTab(true);
//     try {
//       const [projectsRes, issuesRes] = await Promise.all([
//         api().get("/projects"),                        // for members
//         api().get(`/projects/${p._id}/issues`),        // for issues count
//       ]);
//       const found = projectsRes.data.find(pr => pr._id === p._id);
//       const allIssues = issuesRes.data || [];
//       setMembers(found?.members || []);
//       setIssues(allIssues);
//       if (allIssues.length > 0) {
//         const allCommsRes = await Promise.all(
//           allIssues.map(iss =>
//             api().get(`/comments/${iss._id}`)
//               .then(r => ({ issueId: iss._id, comments: r.data || [] }))
//               .catch(() => ({ issueId: iss._id, comments: [] }))
//           )
//         );
//         setTotalComments(allCommsRes.reduce((sum, r) => sum + r.comments.length, 0));
//         const sorted = [...allCommsRes]
//           .filter(r => r.comments.length > 0)
//           .sort((a, b) => new Date(b.comments.at(-1).createdAt) - new Date(a.comments.at(-1).createdAt));
//         const best = sorted[0] || allCommsRes[0];
//         setActiveIssue(allIssues.find(i => i._id === best.issueId));
//         setComments(best.comments);
//       }
//     } catch (e) {
//       showToast("Failed to load project data");
//     } finally {
//       setLoadingTab(false);
//     }
//   };

//   const handleTabChange = (t) => {
//     setTab(t);
//     loadTab(selected, t);
//     if (t === "issues" && members.length === 0) {
//       api().get("/projects").then(res => {
//         const found = res.data.find(p => p._id === selected._id);
//         setMembers(found?.members || []);
//       });
//     }
//   };

//   // ── Switch which issue's comments to show
//   const switchIssueComments = async (issue) => {
//     setActiveIssue(issue);
//     setLoadingTab(true);
//     try {
//       const res = await api().get(`/comments/${issue._id}`); // GET /api/comments/:issueId
//       setComments(res.data);
//     } catch { showToast("Failed to load comments"); }
//     finally { setLoadingTab(false); }
//   };

//   // ── Create project   POST /api/projects
//   const createProject = async () => {
//     if (!newProject.projectName.trim()) return;
//     setSubmitting(true);
//     try {
//       const res = await api().post("/projects", newProject);
//       setProjects(prev => [...prev, res.data]);
//       setNewProject({ projectName:"", description:"" });
//       setShowProjectModal(false);
//       showToast("Project created!", "success");
//     } catch (e) { showToast(e?.response?.data?.message || "Failed to create project"); }
//     finally { setSubmitting(false); }
//   };

//   // ── Delete project   DELETE /api/projects/:id
//   const deleteProject = async (id, e) => {
//     e.stopPropagation();
//     try {
//       await api().delete(`/projects/${id}`);
//       setProjects(prev => prev.filter(p => p._id !== id));
//       if (selected?._id === id) setSelected(null);
//       showToast("Project deleted", "success");
//     } catch (e) { showToast(e?.response?.data?.message || "Failed to delete project"); }
//   };

//   // ── Add member   POST /api/projects/:id/members
//   const addMember = async () => {
//     if (!newMember.email.trim()) return;
//     setSubmitting(true);
//     try {
//       const res = await api().post(`/projects/${selected._id}/members`, newMember);
//       setMembers(res.data?.members || members);
//       setNewMember({ email:"" });
//       setShowMemberModal(false);
//       showToast("Member added!", "success");
//     } catch (e) { showToast(e?.response?.data?.message || "Failed to add member"); }
//     finally { setSubmitting(false); }
//   };

//   // ── Create issue   POST /api/issues
//   const createIssue = async () => {
//     if (!newIssue.title.trim()) return;
//     setSubmitting(true);
//     try {
//       const res = await api().post("/issues", { ...newIssue, projectId: selected._id });
//       setIssues(prev => [res.data, ...prev]);
//       // setNewIssue({ title:"", description:"", priority:"Medium", assignedTo:"" });
//       // REPLACE WITH:
//       setNewIssue({ title:"", description:"", priority:"Medium", assignedTo:[] });
//       setShowIssueModal(false);
//       showToast("Issue created!", "success");
//     } catch (e) { showToast(e?.response?.data?.message || "Failed to create issue"); }
//     finally { setSubmitting(false); }
//   };

//   // ── Delete issue   DELETE /api/issues/:id
//   const deleteIssue = async (id) => {
//     try {
//       await api().delete(`/issues/${id}`);
//       setIssues(prev => prev.filter(i => i._id !== id));
//       showToast("Issue deleted", "success");
//     } catch (e) { showToast(e?.response?.data?.message || "Failed to delete issue"); }
//   };

//   // ── Update issue status   PATCH /api/issues/:id
//   const updateIssueStatus = async (issue, status) => {
//     try {
//       const res = await api().patch(`/issues/${issue._id}`, { status });
//       setIssues(prev => prev.map(i => i._id === issue._id ? res.data : i));
//     } catch { showToast("Failed to update issue"); }
//   };

//   // ── Post comment   POST /api/comments
//   const postComment = async () => {
//     if (!commentText.trim() || !activeIssue) return;
//     setSubmitting(true);
//     try {
//       await api().post("/comments", { issueId: activeIssue._id, commentText: commentText });
//       const commRes = await api().get(`/comments/${activeIssue._id}`);
//       setComments(commRes.data);
//       setTotalComments(prev => prev + 1);
//       setCommentText("");
//     } catch (e) { showToast(e?.response?.data?.message || "Failed to post comment"); }
//     finally { setSubmitting(false); }
//   };

//   // ── Delete comment   DELETE /api/comments/:id
//   const deleteComment = async (id) => {
//     try {
//       await api().delete(`/comments/${id}`);
//       setComments(prev => prev.filter(c => c._id !== id));
//     } catch { showToast("Failed to delete comment"); }
//   };

//   // ── Logout   POST /api/auth/logout
//   const logout = async () => {
//     try { await api().post("/auth/logout"); } catch {}
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const openIssueCount = issues.filter(i => i.status === "Todo").length;

//   const generateSummary = async (issue) => {
//     setLoadingAI(true);
//     setAiSummary(null);
//     try {
//       const res = await api().post("/ai/summarize", { issueId: issue._id });
//       setAiSummary(res.data);
//     } catch (e) {
//       showToast("Failed to generate summary");
//     } finally {
//       setLoadingAI(false);
//     }
//   };


//   return (
//     <>
//       <style>{styles}</style>
//       <div className="dash-root">

//         {/* Topbar */}
//         <div className="topbar">
//           <span className="topbar-logo">Projectify</span>
//           <div className="topbar-right">
//             <button className="logout-btn" onClick={logout}><LogoutIcon /> Logout</button>
//             <div className="avatar">ME</div>
//           </div>
//         </div>

//         <div className="dash-body">

//           {/* Sidebar */}
//           <aside className="sidebar">
//             <p className="sidebar-label">Projects</p>
//             {loadingProjects ? (
//               <div className="inline-loader"><span className="spinner-sm"/> Loading…</div>
//             ) : projects.length === 0 ? (
//               <p className="no-data" style={{padding:"12px"}}>No projects yet.</p>
//             ) : projects.map((p, i) => (
//               <div
//                 key={p._id}
//                 className={`project-item ${selected?._id === p._id ? "active" : ""}`}
//                 onClick={() => selectProject(p)}
//               >
//                 <span className="project-dot" style={{ background: DOT_COLORS[i % DOT_COLORS.length] }}/>
//                 <span className="project-item-name">{p.projectName}</span>
//                 <button className="project-item-del" onClick={(e) => deleteProject(p._id, e)}><XIcon /></button>
//               </div>
//             ))}
//             <button className="new-project-btn" onClick={() => setShowProjectModal(true)}>
//               <PlusIcon /> New Project
//             </button>
//           </aside>

//           {/* Main panel */}
//           <main className="main-panel">
//             {!selected ? (
//               <div className="empty-state">
//                 <div className="empty-icon"><FolderIcon /></div>
//                 <h3>Select a project</h3>
//                 <p>Click any project from the sidebar to manage members, issues, and comments.</p>
//               </div>
//             ) : (
//               <>
//                 <div className="project-header">
//                   <div>
//                     <h1 className="project-title">{selected.projectName}</h1>
//                     <div className="project-meta">
//                       <span className="status-badge status-active">Active</span>
//                       <span>{selected.description || "No description"}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="stats-row">
//                   <div className="stat-card">
//                     <p className="stat-label">Members</p>
//                     <p className="stat-value" style={{color:"#a48aff"}}>{members.length}</p>
//                   </div>
//                   <div className="stat-card">
//                     <p className="stat-label">Open Issues</p>
//                     <p className="stat-value" style={{color:"var(--danger)"}}>{openIssueCount}</p>
//                   </div>
//                   <div className="stat-card">
//                     <p className="stat-label">Comments</p>
//                     <p className="stat-value" style={{color:"var(--success)"}}>{totalComments}</p>
//                   </div>
//                 </div>

//                 <div className="tabs">
//                   {[
//                     { key:"members",  label:"Members",  icon:<UsersIcon />,   count: members.length },
//                     { key:"issues",   label:"Issues",   icon:<IssueIcon />,   count: issues.length },
//                     { key:"comments", label:"Comments", icon:<CommentIcon />, count: totalComments },
//                   ].map(t => (
//                     <button key={t.key} className={`tab-btn ${tab===t.key?"active":""}`} onClick={() => handleTabChange(t.key)}>
//                       {t.icon} {t.label} <span className="tab-count">{t.count}</span>
//                     </button>
//                   ))}
//                 </div>

//                 {loadingTab ? (
//                   <div className="inline-loader"><span className="spinner-sm"/> Loading…</div>
//                 ) : (
//                   <>
//                     {/* ── Members tab ── */}
//                     {tab === "members" && (
//                       <>
//                         <div className="section-header">
//                           <h2 className="section-title">Team Members</h2>
//                           <button className="btn-primary" onClick={() => setShowMemberModal(true)}><PlusIcon /> Add Member</button>
//                         </div>
//                         {members.length === 0 ? (
//                           <p className="no-data">No members yet. Add someone!</p>
//                         ) : (
//                           <div className="members-grid">
//                             {members.map((m, i) => (
//                               <div className="member-card" key={m._id || i} style={{animationDelay:`${i*0.05}s`}}>
//                                 <div className="member-avatar" style={{background:`linear-gradient(135deg,${DOT_COLORS[i%DOT_COLORS.length]},${DOT_COLORS[(i+2)%DOT_COLORS.length]})`}}>
//                                   {initials(m.name || m.email || "")}
//                                 </div>
//                                 <div className="member-info">
//                                   <p className="member-name">{m.name || "User"}</p>
//                                   <p className="member-role">{m.email || ""}</p>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </>
//                     )}

//                     {/* ── Issues tab ── */}
//                     {tab === "issues" && (
//                       <>
//                         <div className="section-header">
//                           <h2 className="section-title">Issues</h2>
//                           <button className="btn-primary" onClick={() => setShowIssueModal(true)}><PlusIcon /> New Issue</button>
//                         </div>
//                         {issues.length === 0 ? (
//                           <p className="no-data">No issues yet. Create one!</p>
//                         ) : (
//                           <div className="issues-list">
//                             {issues.map((issue, i) => (
//                               <div className="issue-card" key={issue._id} style={{animationDelay:`${i*0.05}s`}}>
//                                 <div className="issue-body">
//                                   <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:6}}>
//                                     <p className="issue-title" style={{margin:0}}>{issue.title}</p>
//                                     <span className={`priority-badge p-badge-${(issue.priority || "Medium").toLowerCase()}`}>
//                                       {issue.priority || "Medium"}
//                                     </span>
//                                   </div>
//                                   {issue.description && <p className="issue-desc">{issue.description}</p>}
//                                 </div>
//                                 <div className="issue-actions">
//                                   <select
//                                     className="status-select"
//                                     value={issue.status || "Todo"}
//                                     onChange={e => updateIssueStatus(issue, e.target.value)}
//                                   >
//                                     <option value="Todo">Todo</option>
//                                     <option value="In Progress">In Progress</option>
//                                     <option value="Done">Done</option>
//                                   </select>
//                                   <span className={`issue-status-badge is-${(issue.status || "Todo").toLowerCase().replace(" ", "-")}`}>
//                                     {issue.status || "Todo"}
//                                   </span>
//                                   {/* <span className={`issue-status-badge is-${issue.status || "open"}`}>
//                                     {issue.status === "progress" ? "In Progress"
//                                       : (issue.status||"open").charAt(0).toUpperCase()+(issue.status||"open").slice(1)}
//                                   </span> */}
//                                   <button
//                                     className="btn-ai-summary"
//                                     onClick={() => { setAiSummary(null); generateSummary(issue); }}
//                                     disabled={loadingAI}
//                                     title="Generate AI Summary"
//                                   >
//                                     {loadingAI ? <span className="spinner-sm"/> : "✦ AI"}
//                                   </button>
//                                   <button className="icon-btn" onClick={() => deleteIssue(issue._id)}><TrashIcon /></button>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         )}

//                         {aiSummary && (
//                           <div className="ai-summary-panel">
//                             <div className="ai-summary-header">
//                               <span className="ai-badge">✦ AI Summary</span>
//                               <button className="icon-btn" onClick={() => setAiSummary(null)}>✕</button>
//                             </div>
//                             <div className="ai-section">
//                               <p className="ai-section-label">📋 Summary</p>
//                               <p className="ai-section-text">{aiSummary.summary}</p>
//                             </div>
//                             <div className="ai-section">
//                               <p className="ai-section-label">✅ Action Items</p>
//                               <ul className="ai-action-list">
//                                 {(aiSummary.actionItems || []).map((item, i) => (
//                                   <li key={i}>{item}</li>
//                                 ))}
//                               </ul>
//                             </div>
//                             <div className="ai-section">
//                               <p className="ai-section-label">🚀 Next Step</p>
//                               <p className="ai-section-text ai-next-step">{aiSummary.nextStep}</p>
//                             </div>
//                           </div>
//                         )}

//                       </>
//                     )}

//                     {/* ── Comments tab ── */}
//                     {tab === "comments" && (
//                       <>
//                         <div className="section-header">
//                           <h2 className="section-title">Comments</h2>
//                           {issues.length > 0 && (
//                             <select
//                               className="status-select"
//                               style={{fontSize:13,padding:"6px 12px"}}
//                               value={activeIssue?._id || ""}
//                               onChange={e => {
//                                 const iss = issues.find(i => i._id === e.target.value);
//                                 if (iss) switchIssueComments(iss);
//                               }}
//                             >
//                               {issues.map(i => <option key={i._id} value={i._id}>{i.title}</option>)}
//                             </select>
//                           )}
//                         </div>

//                         {issues.length === 0 ? (
//                           <p className="no-data">Create an issue first before commenting.</p>
//                         ) : (
//                           <>
//                             {comments.length === 0 ? (
//                               <p className="no-data" style={{marginBottom:24}}>No comments yet. Start the discussion!</p>
//                             ) : (
//                               <div className="comments-list">
//                                 {comments.map((c, i) => (
//                                   <div className="comment-item" key={c._id} style={{animationDelay:`${i*0.05}s`}}>
//                                     <div className="comment-avatar" style={{background:`linear-gradient(135deg,${DOT_COLORS[i%DOT_COLORS.length]},${DOT_COLORS[(i+3)%DOT_COLORS.length]})`}}>
//                                       {initials(c.userId?.name || "")}
//                                     </div>
//                                     <div className="comment-bubble">
//                                       <div className="comment-meta">
//                                         <div className="comment-meta-left">
//                                           <span className="comment-author">{c.userId?.name || "User"}</span>
//                                           <span className="comment-time">{timeAgo(c.createdAt)}</span>
//                                         </div>
//                                         <button className="icon-btn" onClick={() => deleteComment(c._id)}><TrashIcon /></button>
//                                       </div>
//                                       <p className="comment-text">{c.commentText}</p>
//                                     </div>
//                                   </div>
//                                 ))}
//                               </div>
//                             )}
//                             <div className="comment-input-row">
//                               <textarea
//                                 className="comment-input"
//                                 placeholder="Write a comment… (Enter to send, Shift+Enter for newline)"
//                                 value={commentText}
//                                 onChange={e => setCommentText(e.target.value)}
//                                 onKeyDown={e => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); postComment(); } }}
//                                 rows={2}
//                               />
//                               <button className="btn-primary" onClick={postComment} disabled={submitting} style={{padding:"11px 16px"}}>
//                                 {submitting ? <span className="spinner-sm"/> : <SendIcon />}
//                               </button>
//                             </div>
//                           </>
//                         )}
//                       </>
//                     )}
//                   </>
//                 )}
//               </>
//             )}
//           </main>
//         </div>
//       </div>

//       {/* ── Create Project Modal ── */}
//       {showProjectModal && (
//         <div className="modal-overlay" onClick={() => setShowProjectModal(false)}>
//           <div className="modal" onClick={e => e.stopPropagation()}>
//             <h2 className="modal-title">New Project</h2>
//             <p className="modal-sub">Give your project a name to get started.</p>
//             <div className="modal-field">
//               <label>Project Name</label>
//               <input className="modal-input" placeholder="e.g. Nova App"
//                 value={newProject.projectName} onChange={e => setNewProject({...newProject, projectName:e.target.value})}/>
//             </div>
//             <div className="modal-field">
//               <label>Description</label>
//               <input className="modal-input" placeholder="What's this project about?"
//                 value={newProject.description} onChange={e => setNewProject({...newProject, description:e.target.value})}/>
//             </div>
//             <div className="modal-actions">
//               <button className="btn-secondary" onClick={() => setShowProjectModal(false)}>Cancel</button>
//               <button className="btn-primary" onClick={createProject} disabled={submitting}>
//                 {submitting ? <span className="spinner-sm"/> : <PlusIcon />} Create
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ── Add Member Modal ── */}
//       {showMemberModal && (
//         <div className="modal-overlay" onClick={() => setShowMemberModal(false)}>
//           <div className="modal" onClick={e => e.stopPropagation()}>
//             <h2 className="modal-title">Add Member</h2>
//             <p className="modal-sub">Enter the email of the registered user to add them.</p>
//             <div className="modal-field">
//               <label>Email Address</label>
//               <input className="modal-input" placeholder="user@company.com" type="email"
//                 value={newMember.email} onChange={e => setNewMember({...newMember, email:e.target.value})}/>
//             </div>
//             <div className="modal-actions">
//               <button className="btn-secondary" onClick={() => setShowMemberModal(false)}>Cancel</button>
//               <button className="btn-primary" onClick={addMember} disabled={submitting}>
//                 {submitting ? <span className="spinner-sm"/> : <PlusIcon />} Add
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ── New Issue Modal ── */}
//       {showIssueModal && (
//         <div className="modal-overlay" onClick={() => setShowIssueModal(false)}>
//           <div className="modal" onClick={e => e.stopPropagation()}>
//             <h2 className="modal-title">Create Issue</h2>
//             <p className="modal-sub">Track a bug, task, or feature request.</p>
//             <div className="modal-field">
//               <label>Title</label>
//               <input className="modal-input" placeholder="e.g. Login crashes on Safari"
//                 value={newIssue.title} onChange={e => setNewIssue({...newIssue, title:e.target.value})}/>
//             </div>
//             <div className="modal-field">
//               <label>Description</label>
//               <input className="modal-input" placeholder="More context…"
//                 value={newIssue.description} onChange={e => setNewIssue({...newIssue, description:e.target.value})}/>
//             </div>
//             <div className="modal-field">
//               <label>Priority</label>
//               <select className="modal-select" value={newIssue.priority} onChange={e => setNewIssue({...newIssue, priority:e.target.value})}>
//                 <option value="High">🔴 High</option>
//                 <option value="Medium">🟡 Medium</option>
//                 <option value="Low">🟢 Low</option>
//               </select>
//             </div>
//             {/* <div className="modal-field">
//               <label>Assign To</label>
//               <select className="modal-select" value={newIssue.assignedTo} onChange={e => setNewIssue({...newIssue, assignedTo:e.target.value})}>
//                 <option value="">— Unassigned —</option>
//                 {members.map(m => (
//                   <option key={m._id} value={m._id}>{m.name || m.email}</option>
//                 ))}
//               </select>
//             </div> */}

//             <div className="modal-field">
//               <label>Assign To</label>
//               <div className="assign-checkbox-list">
//                 {members.map(m => (
//                   <label key={m._id} className="assign-checkbox-item">
//                     <input
//                       type="checkbox"
//                       checked={newIssue.assignedTo.includes(m._id)}
//                       onChange={e => {
//                         const updated = e.target.checked
//                           ? [...newIssue.assignedTo, m._id]
//                           : newIssue.assignedTo.filter(id => id !== m._id);
//                         setNewIssue({...newIssue, assignedTo: updated});
//                       }}
//                     />
//                     <span>{m.name || m.email}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             <div className="modal-actions">
//               <button className="btn-secondary" onClick={() => setShowIssueModal(false)}>Cancel</button>
//               <button className="btn-primary" onClick={createIssue} disabled={submitting}>
//                 {submitting ? <span className="spinner-sm"/> : <PlusIcon />} Create
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {toast && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}
//     </>
//   );
// }



