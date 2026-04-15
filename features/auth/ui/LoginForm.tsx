'use client';

import { useActionState } from 'react';
import Link from 'next/link';

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
  const [formState, handleAction] = useActionState(loginAction, {});

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
        </CardHeader>

        <CardContent>
          <form action={handleAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Please enter"
                  className="rounded-sm"
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
                  className="rounded-sm"
                />
                {formState.fieldErrors?.password && (
                  <p className="text-sm text-red-700">
                    {formState.fieldErrors?.password}
                  </p>
                )}
              </Field>

              <Field>
                {formState.error && (
                  <p className="text-center text-sm text-red-600">
                    {formState.error}
                  </p>
                )}
              </Field>

              <Field>
                <Button type="submit" className="rounded-sm">
                  Login
                </Button>

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
