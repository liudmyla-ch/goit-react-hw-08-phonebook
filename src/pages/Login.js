import React from 'react';
import { Helmet } from 'react-helmet';
import { LoginForm } from 'components/login-form/LoginForm';

export default function Login() {
  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <LoginForm />
    </div>
  );
}
