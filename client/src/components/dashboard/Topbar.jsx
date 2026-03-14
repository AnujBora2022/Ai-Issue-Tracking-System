import { LogoutIcon } from "./icons";

export default function Topbar({ onLogout }) {
  return (
    <div className="topbar">
      <span className="topbar-logo">Projectify</span>
      <div className="topbar-right">
        <button className="logout-btn" onClick={onLogout}>
          <LogoutIcon /> Logout
        </button>
        <div className="avatar">ME</div>
      </div>
    </div>
  );
}