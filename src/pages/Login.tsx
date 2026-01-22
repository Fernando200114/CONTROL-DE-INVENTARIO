import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#020617",
      color: "#fff"
    }}>
      <LoginForm />
    </div>
  );
};

export default Login;
