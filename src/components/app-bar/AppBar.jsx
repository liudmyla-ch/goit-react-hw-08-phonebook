import React from 'react';
import { useAuth } from 'hooks';
import { Navigation } from 'components/navigation/Navigation';
import { AuthNav } from 'components/auth-nav/AuthNav';
import { UserMenu } from 'components/user-menu/UserMenu';
import styles from './AppBar.module.css';

export const AppBar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <header className={styles.appBar}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};
