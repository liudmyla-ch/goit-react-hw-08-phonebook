import React from 'react';
import { Helmet } from 'react-helmet';
import { RegisterForm } from 'components/register-form/RegisterForm';

export default function Register() {
  return (
    <div>
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <RegisterForm />
    </div>
  );
}
