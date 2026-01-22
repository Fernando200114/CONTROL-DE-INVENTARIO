interface Props {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

const Button = ({ label, onClick, type = "button" }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: "10px 16px",
        background: "#2563eb",
        color: "#fff",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer"
      }}
    >
      {label}
    </button>
  );
};

export default Button;
