import AuthForm from '../../components/Forms/AuthForm'

const Register = () => {
  return (
    <AuthForm route='/api/user/register/' method='register'></AuthForm>
  )
}

export default Register