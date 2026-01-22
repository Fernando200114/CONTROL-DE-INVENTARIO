interface Props {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmModal = ({ open, title, message, onConfirm, onClose }: Props) => {
  if (!open) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }}>
      <div style={{
        background: "#020617",
        padding: "20px",
        borderRadius: "12px",
        width: "300px",
        color: "#fff",
        border: "1px solid #1e293b"
      }}>
        <h3>{title}</h3>
        <p style={{ margin: "10px 0" }}>{message}</p>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button onClick={onClose}>Cancelar</button>
          <button onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
