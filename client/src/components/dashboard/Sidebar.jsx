import { PlusIcon, XIcon } from "./icons";
import { DOT_COLORS } from "./styles";

export default function Sidebar({ projects, selected, loadingProjects, onSelect, onDelete, onNewProject }) {
  return (
    <aside className="sidebar">
      <p className="sidebar-label">Projects</p>
      {loadingProjects ? (
        <div className="inline-loader"><span className="spinner-sm" /> Loading…</div>
      ) : projects.length === 0 ? (
        <p className="no-data" style={{ padding: "12px" }}>No projects yet.</p>
      ) : projects.map((p, i) => (
        <div
          key={p._id}
          className={`project-item ${selected?._id === p._id ? "active" : ""}`}
          onClick={() => onSelect(p)}
        >
          <span className="project-dot" style={{ background: DOT_COLORS[i % DOT_COLORS.length] }} />
          <span className="project-item-name">{p.projectName}</span>
          <button className="project-item-del" onClick={(e) => onDelete(p._id, e)}>
            <XIcon />
          </button>
        </div>
      ))}
      <button className="new-project-btn" onClick={onNewProject}>
        <PlusIcon /> New Project
      </button>
    </aside>
  );
}