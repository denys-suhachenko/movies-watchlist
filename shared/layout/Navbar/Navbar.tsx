import { getCurrentUser } from '@/lib/dal';

import { NavbarContent } from './NavbarContent';

export default async function Navbar() {
  const user = await getCurrentUser();

  return <NavbarContent user={user} />;
}
