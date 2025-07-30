import React from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

const LoginButton = ({ user }) => {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Login error", err);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="mb-4">
      {user ? (
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 text-white rounded">
          Logout
        </button>
      ) : (
        <button onClick={handleLogin} className="bg-green-600 px-3 py-1 text-white rounded">
          Login with Google
        </button>
      )}
    </div>
  );
};

export default LoginButton;
