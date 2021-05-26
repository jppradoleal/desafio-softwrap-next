import Link from 'next/link'
import {useAuth} from '../utils/auth';

export default function Home() {
  const {user} = useAuth();

  return (
    <div>
      <p>User UID: {user ? user.uid : "No user signed in"}</p>
      <button disabled={!user}>
        <Link href="/authenticated">
          <a>Go to authenticated route</a>
        </Link>
      </button>
      <button disabled={user}>
        <Link href="/login">
          <a>Log in</a>
        </Link>
      </button>
    </div>  
  );
}
