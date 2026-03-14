export default function StatsRow({ membersCount, openIssuesCount, totalComments }) {
  return (
    <div className="stats-row">
      <div className="stat-card">
        <p className="stat-label">Members</p>
        <p className="stat-value" style={{ color: "#a48aff" }}>{membersCount}</p>
      </div>
      <div className="stat-card">
        <p className="stat-label">Open Issues</p>
        <p className="stat-value" style={{ color: "var(--danger)" }}>{openIssuesCount}</p>
      </div>
      <div className="stat-card">
        <p className="stat-label">Comments</p>
        <p className="stat-value" style={{ color: "var(--success)" }}>{totalComments}</p>
      </div>
    </div>
  );
}