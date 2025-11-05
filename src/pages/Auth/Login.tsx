import AuthForm from "../../components/Forms/AuthForm"
const Login = () => {
  return (
    <AuthForm route="/api/token/" method="login"></AuthForm>
  )
}

export default Login