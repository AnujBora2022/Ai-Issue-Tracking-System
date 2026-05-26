import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Topbar from "./components/dashboard/Topbar";
import Sidebar from "./components/dashboard/Sidebar";
import StatsRow from "./components/dashboard/StatsRow";
import MembersTab from "./components/dashboard/MembersTab";
import IssuesTab from "./components/dashboard/IssuesTab.jsx";
import CommentsTab from "./components/dashboard/CommentsTab";
import { ProjectModal, MemberModal, IssueModal } from "./components/dashboard/Modals";
import { UsersIcon, IssueIcon, CommentIcon, FolderIcon } from "./components/dashboard/icons";
import { styles } from "./components/dashboard/styles";

// const API = "http://localhost:5000";
const API = import.meta.env.VITE_API_URL;
const api = () => {
  const token = localStorage.getItem("token");
  return axios.create({ baseURL: API, headers: { Authorization: `Bearer ${token}` } });
};

export default function Dashboard() {
  const navigate = useNavigate();

  const [projects, setProjects]         = useState([]);
  const [selected, setSelected]         = useState(null);
  const [tab, setTab]                   = useState("members");
  const [members, setMembers]           = useState([]);
  const [issues, setIssues]             = useState([]);
  const [comments, setComments]         = useState([]);
  const [activeIssue, setActiveIssue]   = useState(null);
  const [commentText, setCommentText]   = useState("");
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingTab, setLoadingTab]     = useState(false);
  const [submitting, setSubmitting]     = useState(false);
  const [toast, setToast]               = useState(null);
  const [totalComments, setTotalComments] = useState(0);
  const [aiSummary, setAiSummary]       = useState(null);
  const [loadingAI, setLoadingAI]       = useState(false);

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showMemberModal,  setShowMemberModal]  = useState(false);
  const [showIssueModal,   setShowIssueModal]   = useState(false);

  const [newProject, setNewProject] = useState({ projectName: "", description: "" });
  const [newMember,  setNewMember]  = useState({ email: "" });
  const [newIssue,   setNewIssue]   = useState({ title: "", description: "", priority: "Medium", assignedTo: [] });

  const showToast = (msg, type = "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  // ── Load projects on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await api().get("/projects");
        setProjects(res.data);
      } catch (e) {
        if (e?.response?.status === 401) { navigate("/login"); return; }
        showToast("Failed to load projects");
      } finally {
        setLoadingProjects(false);
      }
    })();
  }, []);

  // ── Load tab data
  const loadTab = useCallback(async (project, activeTab) => {
    if (!project) return;
    setLoadingTab(true);
    try {
      if (activeTab === "members") {
        const res = await api().get("/projects");
        const found = res.data.find(p => p._id === project._id);
        setMembers(found?.members || []);
      }
      if (activeTab === "issues") {
        const res = await api().get(`/issues/${project._id}`);
        setIssues(res.data);
      }
      if (activeTab === "comments") {
        const issuesRes = await api().get(`/projects/${project._id}/issues`);
        const list = issuesRes.data || [];
        setIssues(list);
        if (list.length > 0) {
          setActiveIssue(list[0]);
          const commRes = await api().get(`/comments/${list[0]._id}`);
          setComments(commRes.data);
        } else {
          setActiveIssue(null);
          setComments([]);
        }
      }
    } catch {
      showToast(`Failed to load ${activeTab}`);
    } finally {
      setLoadingTab(false);
    }
  }, []);

  // ── Select project
  const selectProject = async (p) => {
    setSelected(p);
    setTab("members");
    setMembers([]); setIssues([]); setComments([]); setActiveIssue(null);
    setLoadingTab(true);
    try {
      const [projectsRes, issuesRes] = await Promise.all([
        api().get("/projects"),
        api().get(`/projects/${p._id}/issues`),
      ]);
      const found = projectsRes.data.find(pr => pr._id === p._id);
      const allIssues = issuesRes.data || [];
      setMembers(found?.members || []);
      setIssues(allIssues);
      if (allIssues.length > 0) {
        const allCommsRes = await Promise.all(
          allIssues.map(iss =>
            api().get(`/comments/${iss._id}`)
              .then(r => ({ issueId: iss._id, comments: r.data || [] }))
              .catch(() => ({ issueId: iss._id, comments: [] }))
          )
        );
        setTotalComments(allCommsRes.reduce((sum, r) => sum + r.comments.length, 0));
        const sorted = [...allCommsRes]
          .filter(r => r.comments.length > 0)
          .sort((a, b) => new Date(b.comments.at(-1).createdAt) - new Date(a.comments.at(-1).createdAt));
        const best = sorted[0] || allCommsRes[0];
        setActiveIssue(allIssues.find(i => i._id === best.issueId));
        setComments(best.comments);
      }
    } catch {
      showToast("Failed to load project data");
    } finally {
      setLoadingTab(false);
    }
  };

  const handleTabChange = (t) => {
    setTab(t);
    loadTab(selected, t);
    if (t === "issues" && members.length === 0) {
      api().get("/projects").then(res => {
        const found = res.data.find(p => p._id === selected._id);
        setMembers(found?.members || []);
      });
    }
  };

  const switchIssueComments = async (issue) => {
    setActiveIssue(issue);
    setLoadingTab(true);
    try {
      const res = await api().get(`/comments/${issue._id}`);
      setComments(res.data);
    } catch { showToast("Failed to load comments"); }
    finally { setLoadingTab(false); }
  };

  // ── CRUD handlers
  const createProject = async () => {
    if (!newProject.projectName.trim()) return;
    setSubmitting(true);
    try {
      const res = await api().post("/projects", newProject);
      setProjects(prev => [...prev, res.data]);
      setNewProject({ projectName: "", description: "" });
      setShowProjectModal(false);
      showToast("Project created!", "success");
    } catch (e) { showToast(e?.response?.data?.message || "Failed to create project"); }
    finally { setSubmitting(false); }
  };

  const deleteProject = async (id, e) => {
    e.stopPropagation();
    try {
      await api().delete(`/projects/${id}`);
      setProjects(prev => prev.filter(p => p._id !== id));
      if (selected?._id === id) setSelected(null);
      showToast("Project deleted", "success");
    } catch (e) { showToast(e?.response?.data?.message || "Failed to delete project"); }
  };

  const addMember = async () => {
    if (!newMember.email.trim()) return;
    setSubmitting(true);
    try {
      const res = await api().post(`/projects/${selected._id}/members`, newMember);
      setMembers(res.data?.members || members);
      setNewMember({ email: "" });
      setShowMemberModal(false);
      showToast("Member added!", "success");
    } catch (e) { showToast(e?.response?.data?.message || "Failed to add member"); }
    finally { setSubmitting(false); }
  };

  const createIssue = async () => {
    if (!newIssue.title.trim()) return;
    setSubmitting(true);
    try {
      const res = await api().post("/issues", { ...newIssue, projectId: selected._id });
      setIssues(prev => [res.data, ...prev]);
      setNewIssue({ title: "", description: "", priority: "Medium", assignedTo: [] });
      setShowIssueModal(false);
      showToast("Issue created!", "success");
    } catch (e) { showToast(e?.response?.data?.message || "Failed to create issue"); }
    finally { setSubmitting(false); }
  };

  const deleteIssue = async (id) => {
    try {
      await api().delete(`/issues/${id}`);
      setIssues(prev => prev.filter(i => i._id !== id));
      showToast("Issue deleted", "success");
    } catch (e) { showToast(e?.response?.data?.message || "Failed to delete issue"); }
  };

  const updateIssueStatus = async (issue, status) => {
    try {
      const res = await api().patch(`/issues/${issue._id}`, { status });
      setIssues(prev => prev.map(i => i._id === issue._id ? res.data : i));
    } catch { showToast("Failed to update issue"); }
  };

  const postComment = async () => {
    if (!commentText.trim() || !activeIssue) return;
    setSubmitting(true);
    try {
      await api().post("/comments", { issueId: activeIssue._id, commentText });
      const commRes = await api().get(`/comments/${activeIssue._id}`);
      setComments(commRes.data);
      setTotalComments(prev => prev + 1);
      setCommentText("");
    } catch (e) { showToast(e?.response?.data?.message || "Failed to post comment"); }
    finally { setSubmitting(false); }
  };

  const deleteComment = async (id) => {
    try {
      await api().delete(`/comments/${id}`);
      setComments(prev => prev.filter(c => c._id !== id));
    } catch { showToast("Failed to delete comment"); }
  };

  const generateSummary = async (issue) => {
    setLoadingAI(true);
    setAiSummary(null);
    try {
      const res = await api().post("/ai/summarize", { issueId: issue._id });
      setAiSummary(res.data);
    } catch { showToast("Failed to generate summary"); }
    finally { setLoadingAI(false); }
  };

  const logout = async () => {
    try { await api().post("/auth/logout"); } catch {}
    localStorage.removeItem("token");
    navigate("/login");
  };

  const openIssueCount = issues.filter(i => i.status === "Todo").length;

  return (
    <>
      <style>{styles}</style>
      <div className="dash-root">

        <Topbar onLogout={logout} />

        <div className="dash-body">

          <Sidebar
            projects={projects}
            selected={selected}
            loadingProjects={loadingProjects}
            onSelect={selectProject}
            onDelete={deleteProject}
            onNewProject={() => setShowProjectModal(true)}
          />

          <main className="main-panel">
            {!selected ? (
              <div className="empty-state">
                <div className="empty-icon"><FolderIcon /></div>
                <h3>Select a project</h3>
                <p>Click any project from the sidebar to manage members, issues, and comments.</p>
              </div>
            ) : (
              <>
                <div className="project-header">
                  <div>
                    <h1 className="project-title">{selected.projectName}</h1>
                    <div className="project-meta">
                      <span className="status-badge status-active">Active</span>
                      <span>{selected.description || "No description"}</span>
                    </div>
                  </div>
                </div>

                <StatsRow
                  membersCount={members.length}
                  openIssuesCount={openIssueCount}
                  totalComments={totalComments}
                />

                <div className="tabs">
                  {[
                    { key: "members",  label: "Members",  icon: <UsersIcon />,   count: members.length },
                    { key: "issues",   label: "Issues",   icon: <IssueIcon />,   count: issues.length },
                    { key: "comments", label: "Comments", icon: <CommentIcon />, count: totalComments },
                  ].map(t => (
                    <button key={t.key} className={`tab-btn ${tab === t.key ? "active" : ""}`} onClick={() => handleTabChange(t.key)}>
                      {t.icon} {t.label} <span className="tab-count">{t.count}</span>
                    </button>
                  ))}
                </div>

                {loadingTab ? (
                  <div className="inline-loader"><span className="spinner-sm" /> Loading…</div>
                ) : (
                  <>
                    {tab === "members" && (
                      <MembersTab members={members} onAddMember={() => setShowMemberModal(true)} />
                    )}
                    {tab === "issues" && (
                      <IssuesTab
                        issues={issues}
                        aiSummary={aiSummary}
                        loadingAI={loadingAI}
                        onNewIssue={() => setShowIssueModal(true)}
                        onUpdateStatus={updateIssueStatus}
                        onDelete={deleteIssue}
                        onGenerateSummary={(issue) => { setAiSummary(null); generateSummary(issue); }}
                        onCloseSummary={() => setAiSummary(null)}
                      />
                    )}
                    {tab === "comments" && (
                      <CommentsTab
                        issues={issues}
                        comments={comments}
                        activeIssue={activeIssue}
                        commentText={commentText}
                        submitting={submitting}
                        onSwitchIssue={switchIssueComments}
                        onCommentChange={setCommentText}
                        onPost={postComment}
                        onDelete={deleteComment}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {showProjectModal && (
        <ProjectModal
          newProject={newProject}
          submitting={submitting}
          onChange={setNewProject}
          onCreate={createProject}
          onClose={() => setShowProjectModal(false)}
        />
      )}
      {showMemberModal && (
        <MemberModal
          newMember={newMember}
          submitting={submitting}
          onChange={setNewMember}
          onAdd={addMember}
          onClose={() => setShowMemberModal(false)}
        />
      )}
      {showIssueModal && (
        <IssueModal
          newIssue={newIssue}
          members={members}
          submitting={submitting}
          onChange={setNewIssue}
          onCreate={createIssue}
          onClose={() => setShowIssueModal(false)}
        />
      )}

      {toast && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}
    </>
  );
}