import { PlusIcon } from "./icons";
import { DOT_COLORS, initials } from "./styles";

export default function MembersTab({ members, onAddMember }) {
  return (
    <>
      <div className="section-header">
        <h2 className="section-title">Team Members</h2>
        <button className="btn-primary" onClick={onAddMember}>
          <PlusIcon /> Add Member
        </button>
      </div>
      {members.length === 0 ? (
        <p className="no-data">No members yet. Add someone!</p>
      ) : (
        <div className="members-grid">
          {members.map((m, i) => (
            <div className="member-card" key={m._id || i} style={{ animationDelay: `${i * 0.05}s` }}>
              <div
                className="member-avatar"
                style={{ background: `linear-gradient(135deg,${DOT_COLORS[i % DOT_COLORS.length]},${DOT_COLORS[(i + 2) % DOT_COLORS.length]})` }}
              >
                {initials(m.name || m.email || "")}
              </div>
              <div className="member-info">
                <p className="member-name">{m.name || "User"}</p>
                <p className="member-role">{m.email || ""}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}