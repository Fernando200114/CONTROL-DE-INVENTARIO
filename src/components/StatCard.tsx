interface Props {
  title: string;
  value: string;
}

const StatCard = ({ title, value }: Props) => {
  return (
    <div style={{
      background: "#0f172a",
      padding: "20px",
      borderRadius: "12px",
      border: "1px solid #1e293b"
    }}>
      <h4>{title}</h4>
      <p style={{ fontSize: "28px", fontWeight: "bold" }}>{value}</p>
    </div>
  );
};

export default StatCard;
