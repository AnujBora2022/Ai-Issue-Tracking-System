const Ic = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {(Array.isArray(d) ? d : [d]).map((p, i) => <path key={i} d={p} />)}
  </svg>
);

export const PlusIcon    = () => <Ic d="M12 5v14M5 12h14" />;
export const XIcon       = () => <Ic d="M18 6L6 18M6 6l12 12" size={13} />;
export const SendIcon    = () => <Ic d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />;
export const TrashIcon   = () => <Ic d={["M3 6h18", "M19 6l-1 14H6L5 6", "M8 6V4h8v2"]} size={14} />;
export const FolderIcon  = () => <Ic d={["M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"]} size={20} />;
export const LogoutIcon  = () => <Ic d={["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", "M16 17l5-5-5-5", "M21 12H9"]} />;
export const UsersIcon   = () => <Ic d={["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "M23 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75"]} />;
export const IssueIcon   = () => <Ic d={["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", "M12 8v4", "M12 16h.01"]} />;
export const CommentIcon = () => <Ic d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />;