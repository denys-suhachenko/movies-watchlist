import UserForm from '@/features/profile/ui/UserForm';
import Container from '@/shared/layout/Container';
import { getCurrentUser } from '@/lib/dal';

export default async function ProfilePage() {
  const user = await getCurrentUser();

  return (
    <Container className="w-full py-6">
      <h1 className="mb-8 text-3xl font-bold">Profile</h1>
      <UserForm user={user} />
    </Container>
  );
}
