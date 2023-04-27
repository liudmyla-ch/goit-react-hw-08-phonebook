import { useAuth } from 'hooks';
import { Navigation } from 'components/navigation/Navigation';
import { AuthNav } from 'components/auth-nav/AuthNav';
import { UserMenu } from 'components/user-menu/UserMenu';

export const AppBar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <header>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};
