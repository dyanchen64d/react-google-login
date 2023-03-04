import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleCredentialResponse = (res) => {
    const user = jwtDecode(res.credential);
    console.log('Encoded JWT ID token: ', user);
    setUser(user);
    document.getElementById('signIn').hidden = true;
  };

  const signOut = () => {
    setUser(null);
    document.getElementById('signIn').hidden = false;
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: '', // create project on GCP
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(document.getElementById('signIn'), {
      theme: 'outline',
      size: 'large',
    });

    google.accounts.id.prompt();
  }, []);

  return (
    <div className="App">
      {user && (
        <div>
          <img src={user.picture} alt="" />
          <h3>{user.name}</h3>
          <button onClick={signOut}>Sign Out</button>
        </div>
      )}
      <div id="signIn" />
    </div>
  );
}

export default App;
