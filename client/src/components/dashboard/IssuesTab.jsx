import { PlusIcon, TrashIcon } from "./icons";

export default function IssuesTab({ issues, aiSummary, loadingAI, onNewIssue, onUpdateStatus, onDelete, onGenerateSummary, onCloseSummary }) {
  return (
    <>
      <div className="section-header">
        <h2 className="section-title">Issues</h2>
        <button className="btn-primary" onClick={onNewIssue}>
          <PlusIcon /> New Issue
        </button>
      </div>

      {issues.length === 0 ? (
        <p className="no-data">No issues yet. Create one!</p>
      ) : (
        <div className="issues-list">
          {issues.map((issue, i) => (
            <div className="issue-card" key={issue._id} style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="issue-body">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <p className="issue-title" style={{ margin: 0 }}>{issue.title}</p>
                  <span className={`priority-badge p-badge-${(issue.priority || "Medium").toLowerCase()}`}>
                    {issue.priority || "Medium"}
                  </span>
                </div>
                {issue.description && <p className="issue-desc">{issue.description}</p>}
              </div>
              <div className="issue-actions">
                <select
                  className="status-select"
                  value={issue.status || "Todo"}
                  onChange={e => onUpdateStatus(issue, e.target.value)}
                >
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
                <span className={`issue-status-badge is-${(issue.status || "Todo").toLowerCase().replace(" ", "-")}`}>
                  {issue.status || "Todo"}
                </span>
                <button
                  className="btn-ai-summary"
                  onClick={() => onGenerateSummary(issue)}
                  disabled={loadingAI}
                  title="Generate AI Summary"
                >
                  {loadingAI ? <span className="spinner-sm" /> : "✦ AI"}
                </button>
                <button className="icon-btn" onClick={() => onDelete(issue._id)}>
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {aiSummary && (
        <div className="ai-summary-panel">
          <div className="ai-summary-header">
            <span className="ai-badge">✦ AI Summary</span>
            <button className="icon-btn" onClick={onCloseSummary}>✕</button>
          </div>
          <div className="ai-section">
            <p className="ai-section-label">📋 Summary</p>
            <p className="ai-section-text">{aiSummary.summary}</p>
          </div>
          <div className="ai-section">
            <p className="ai-section-label">✅ Action Items</p>
            <ul className="ai-action-list">
              {(aiSummary.actionItems || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="ai-section">
            <p className="ai-section-label">🚀 Next Step</p>
            <p className="ai-section-text ai-next-step">{aiSummary.nextStep}</p>
          </div>
        </div>
      )}
    </>
  );
}