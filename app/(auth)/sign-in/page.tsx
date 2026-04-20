import { redirect } from 'next/navigation';

import { LoginForm } from '@/features/auth/ui/LoginForm';
import { getOptionalSession } from '@/lib/dal';

export default async function SignInPage() {
  const session = await getOptionalSession();

  if (session) {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 md:min-h-svh md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  );
}
