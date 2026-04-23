'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

import { loginAction } from './actions';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const params = useSearchParams();
  const [formState, handleAction] = useActionState(loginAction, {});

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
        </CardHeader>

        <CardContent>
          <form action={handleAction}>
            <input
              type="hidden"
              name="callbackUrl"
              value={params.get('from') || '/'}
            />

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Please enter"
                />
                {formState.fieldErrors?.email && (
                  <p className="text-sm text-red-700">
                    {formState.fieldErrors?.email}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Please enter"
                />
                {formState.fieldErrors?.password && (
                  <p className="text-sm text-red-700">
                    {formState.fieldErrors?.password}
                  </p>
                )}
              </Field>

              {formState.error && (
                <Field>
                  <p className="text-center text-sm text-red-600">
                    {formState.error}
                  </p>
                </Field>
              )}

              <Field className="gap-6">
                <Button type="submit">Login</Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{' '}
                  <Link href="/sign-up">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
