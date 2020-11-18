/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LoginComponent from '../Components/login-component/login-component';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const history = useHistory();

  const handleLogIn = () => {
    history.push('/home');
    history.go(0);
  };

  useEffect(() => {
    if (sessionStorage.getItem('username')) {
      handleLogIn();
    }
  }, [username]);
  return (
    <LoginComponent
      setUsername={setUsername}
      callbackToParent={() => {}}
    />

  );
}
