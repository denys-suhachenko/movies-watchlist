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

import { registerAction } from './actions';

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [formState, handleAction] = useActionState(registerAction, {});

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
        </CardHeader>

        <CardContent>
          <form action={handleAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Please enter"
                />
                {formState.fieldErrors?.name && (
                  <p className="text-sm text-red-700">
                    {formState.fieldErrors?.name}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" name="email" placeholder="Please enter" />
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
                  placeholder="Please enter"
                />
                {formState.fieldErrors?.password && (
                  <p className="text-sm text-red-500">
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
                <Button type="submit">Register</Button>

                <FieldDescription className="text-center">
                  Already have an account? <Link href="/sign-in">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
