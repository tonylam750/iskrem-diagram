import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Header() {
  const { signOut, session, users } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const currentUser = users.find((user) => user.id === session?.user?.id);
  console.log(currentUser);

  const handleSignOut = async (e) => {
    e.preventDefault();

    const { success, error } = await signOut();
    if (success) {
      navigate("/signin");
    } else {
      setError(error.message);
    }
  };

  return (
    <>
      <header>
        <div className="header-email" >
          <h2>{session?.user?.email}</h2>
          {error && (
            <div className="error-message" id="signout-error">
              {error}
            </div>
          )}
          <button onClick={handleSignOut} >
            Logg ut
          </button>
        </div>
        <h1>
          <span>Iskrem diagram</span>
        </h1>
      </header>
    </>
  );
};

export default Header;