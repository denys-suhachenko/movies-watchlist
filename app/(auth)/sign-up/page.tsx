import { redirect } from 'next/navigation';

import { RegisterForm } from '@/features/auth/ui/RegisterForm';
import { getOptionalSession } from '@/lib/dal';

export default async function SignUpPage() {
  const session = await getOptionalSession();

  if (session) {
    redirect('/');
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <RegisterForm />
      </div>
    </div>
  );
}
