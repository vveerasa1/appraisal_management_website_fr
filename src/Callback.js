import { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

export default function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        const idToken = user.signInUserSession.idToken.jwtToken;
        const payload = user.signInUserSession.idToken.payload;
        console.log("User:", payload);
        // Store token in localStorage for ProtectedRoute
        localStorage.setItem("token", idToken);
        navigate('/');
      })
      .catch(err => {
        console.error('Auth error:', err);
        // Redirect to login redirect on auth failure
        navigate('/');
      });
  }, []);

  return <div>Redirecting...</div>;
}
