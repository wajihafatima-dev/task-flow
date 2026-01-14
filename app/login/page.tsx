import LoginForm from "../components/auth/LoginForm";
import AuthLayout from "../layouts/AuthLayout";

export default function Login() {
  return (
       <AuthLayout>
        <LoginForm/>
       </AuthLayout>
  );
}
