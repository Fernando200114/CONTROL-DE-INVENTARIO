import type { ReactNode } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: Props) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position:"fixed", top:0, left:0, width:"100%", height:"100%",
      background:"rgba(0,0,0,0.6)", display:"flex", justifyContent:"center", alignItems:"center"
    }}>
      <div style={{ background:"#0f172a", padding:"20px", borderRadius:"12px", minWidth:"300px", color:"#fff" }}>
        <h3>{title}</h3>
        <div>{children}</div>
        <button onClick={onClose} style={{
          marginTop:"15px", padding:"8px 16px", borderRadius:"8px", background:"#2563eb", border:"none", color:"#fff", cursor:"pointer"
        }}>Cerrar</button>
      </div>
    </div>
  );
};

export default Modal;
