import { PlusIcon } from "./icons";

export function ProjectModal({ newProject, submitting, onChange, onCreate, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">New Project</h2>
        <p className="modal-sub">Give your project a name to get started.</p>
        <div className="modal-field">
          <label>Project Name</label>
          <input className="modal-input" placeholder="e.g. Nova App"
            value={newProject.projectName}
            onChange={e => onChange({ ...newProject, projectName: e.target.value })} />
        </div>
        <div className="modal-field">
          <label>Description</label>
          <input className="modal-input" placeholder="What's this project about?"
            value={newProject.description}
            onChange={e => onChange({ ...newProject, description: e.target.value })} />
        </div>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={onCreate} disabled={submitting}>
            {submitting ? <span className="spinner-sm" /> : <PlusIcon />} Create
          </button>
        </div>
      </div>
    </div>
  );
}

export function MemberModal({ newMember, submitting, onChange, onAdd, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">Add Member</h2>
        <p className="modal-sub">Enter the email of the registered user to add them.</p>
        <div className="modal-field">
          <label>Email Address</label>
          <input className="modal-input" placeholder="user@company.com" type="email"
            value={newMember.email}
            onChange={e => onChange({ ...newMember, email: e.target.value })} />
        </div>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={onAdd} disabled={submitting}>
            {submitting ? <span className="spinner-sm" /> : <PlusIcon />} Add
          </button>
        </div>
      </div>
    </div>
  );
}

export function IssueModal({ newIssue, members, submitting, onChange, onCreate, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">Create Issue</h2>
        <p className="modal-sub">Track a bug, task, or feature request.</p>
        <div className="modal-field">
          <label>Title</label>
          <input className="modal-input" placeholder="e.g. Login crashes on Safari"
            value={newIssue.title}
            onChange={e => onChange({ ...newIssue, title: e.target.value })} />
        </div>
        <div className="modal-field">
          <label>Description</label>
          <input className="modal-input" placeholder="More context…"
            value={newIssue.description}
            onChange={e => onChange({ ...newIssue, description: e.target.value })} />
        </div>
        <div className="modal-field">
          <label>Priority</label>
          <select className="modal-select" value={newIssue.priority}
            onChange={e => onChange({ ...newIssue, priority: e.target.value })}>
            <option value="High">🔴 High</option>
            <option value="Medium">🟡 Medium</option>
            <option value="Low">🟢 Low</option>
          </select>
        </div>
        <div className="modal-field">
          <label>Assign To</label>
          <div className="assign-checkbox-list">
            {members.map(m => (
              <label key={m._id} className="assign-checkbox-item">
                <input
                  type="checkbox"
                  checked={newIssue.assignedTo.includes(m._id)}
                  onChange={e => {
                    const updated = e.target.checked
                      ? [...newIssue.assignedTo, m._id]
                      : newIssue.assignedTo.filter(id => id !== m._id);
                    onChange({ ...newIssue, assignedTo: updated });
                  }}
                />
                <span>{m.name || m.email}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={onCreate} disabled={submitting}>
            {submitting ? <span className="spinner-sm" /> : <PlusIcon />} Create
          </button>
        </div>
      </div>
    </div>
  );
}