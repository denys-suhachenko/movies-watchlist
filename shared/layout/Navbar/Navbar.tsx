import { getCurrentUser } from '@/lib/dal';
import { logoutAction } from '@/features/auth/ui/actions';

import { NavbarContent } from './NavbarContent';

export default async function Navbar() {
  const user = await getCurrentUser();

  return <NavbarContent user={user} handleLogout={logoutAction} />;
}
