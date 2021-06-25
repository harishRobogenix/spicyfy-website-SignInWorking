import withAuth from '../auth/withAuth';
import { useUser } from '../auth/useUser';

const Private = () => {
  const { user, logout } = useUser();

  return (
    <div >
      <div>This is a Private Page this will only be visible for registered users</div>
      {
        user?.email &&
        <div><div><h1>Login Sucessful</h1></div>
          <div>Email: {user.email}</div>
          <button onClick={() => logout()}>Logout</button>
        </div> 
      }
    </div>
  )
}

export default withAuth(Private);