import { SendIcon, TrashIcon } from "./icons";
import { DOT_COLORS, initials, timeAgo } from "./styles";

export default function CommentsTab({ issues, comments, activeIssue, commentText, submitting, onSwitchIssue, onCommentChange, onPost, onDelete }) {
  return (
    <>
      <div className="section-header">
        <h2 className="section-title">Comments</h2>
        {issues.length > 0 && (
          <select
            className="status-select"
            style={{ fontSize: 13, padding: "6px 12px" }}
            value={activeIssue?._id || ""}
            onChange={e => {
              const iss = issues.find(i => i._id === e.target.value);
              if (iss) onSwitchIssue(iss);
            }}
          >
            {issues.map(i => <option key={i._id} value={i._id}>{i.title}</option>)}
          </select>
        )}
      </div>

      {issues.length === 0 ? (
        <p className="no-data">Create an issue first before commenting.</p>
      ) : (
        <>
          {comments.length === 0 ? (
            <p className="no-data" style={{ marginBottom: 24 }}>No comments yet. Start the discussion!</p>
          ) : (
            <div className="comments-list">
              {comments.map((c, i) => (
                <div className="comment-item" key={c._id} style={{ animationDelay: `${i * 0.05}s` }}>
                  <div
                    className="comment-avatar"
                    style={{ background: `linear-gradient(135deg,${DOT_COLORS[i % DOT_COLORS.length]},${DOT_COLORS[(i + 3) % DOT_COLORS.length]})` }}
                  >
                    {initials(c.userId?.name || "")}
                  </div>
                  <div className="comment-bubble">
                    <div className="comment-meta">
                      <div className="comment-meta-left">
                        <span className="comment-author">{c.userId?.name || "User"}</span>
                        <span className="comment-time">{timeAgo(c.createdAt)}</span>
                      </div>
                      <button className="icon-btn" onClick={() => onDelete(c._id)}><TrashIcon /></button>
                    </div>
                    <p className="comment-text">{c.commentText}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="comment-input-row">
            <textarea
              className="comment-input"
              placeholder="Write a comment… (Enter to send, Shift+Enter for newline)"
              value={commentText}
              onChange={e => onCommentChange(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onPost(); } }}
              rows={2}
            />
            <button className="btn-primary" onClick={onPost} disabled={submitting} style={{ padding: "11px 16px" }}>
              {submitting ? <span className="spinner-sm" /> : <SendIcon />}
            </button>
          </div>
        </>
      )}
    </>
  );
}