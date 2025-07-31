import React from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert('Login Successful!');
      navigate('/'); // redirect to Home page
    } catch (err) {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/8284/8284405.png"
          alt="App Logo"
          style={styles.logo}
        />
        <h1 style={styles.heading}>Track Your Shows with Ease</h1>
        <p style={styles.subText}>Discover, discuss, and manage your favorite Anime & TV shows.</p>
        <button onClick={handleGoogleLogin} style={styles.button}>
          Sign in with Google
        </button>
      </div>

      {/* About Section */}
      <div style={styles.aboutSection}>
        <h2 style={styles.why}>✨ Why Choose Us?</h2>

        <div style={styles.features}>
          <div style={styles.featureCard}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2272/2272809.png"
              alt="Watchlist"
              style={styles.icon}
            />
            <h3>Watchlist</h3>
            <p>Maintain your watchlist and never miss an episode.</p>
          </div>

          <div style={styles.featureCard}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3603/3603127.png"
              alt="Community"
              style={styles.icon}
            />
            <h3>Community</h3>
            <p>Join communities and discuss your favorite shows.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #141e30, #243b55)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '30px',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    marginBottom: '50px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
  },
  logo: {
    width: '100px',
    marginBottom: '15px',
    borderRadius: '12px',
  },
  heading: {
    fontSize: '24px',
    margin: '10px 0',
  },
  subText: {
    fontSize: '16px',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#4285F4',
    border: 'none',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: '0.3s',
  },
  aboutSection: {
    textAlign: 'center',
    maxWidth: '800px',
    width: '100%',
  },
  why: {
    fontSize: '28px',
    marginBottom: '30px',
  },
  features: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '30px',
  },
  featureCard: {
    width: '250px',
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  },
  icon: {
    width: '60px',
    marginBottom: '15px',
  },
};

export default Login;
