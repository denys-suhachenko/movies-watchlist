'use client';

import { useActionState } from 'react';

import { Button } from '@/shared/ui/button';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

import { updateUserAction } from '../actions';
import { User } from '../types';

type UserFormProps = {
  user?: User | null;
};

export default function UserForm({ user }: UserFormProps) {
  const [formState, handleAction] = useActionState(updateUserAction, {});

  return (
    <form action={handleAction}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <FieldContent>
            <Input
              id="name"
              name="name"
              type="text"
              defaultValue={user?.name || ''}
              placeholder="Enter your name"
              autoComplete="name"
            />
            <FieldDescription>Your public display name.</FieldDescription>
            {formState.fieldErrors?.name && (
              <p className="text-destructive text-sm">
                {formState.fieldErrors.name}
              </p>
            )}
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <FieldContent>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={user?.email}
              placeholder="Enter your email"
              autoComplete="email"
            />
            <FieldDescription>This email is used for sign in.</FieldDescription>
            {formState.fieldErrors?.email && (
              <p className="text-destructive text-sm">
                {formState.fieldErrors.email}
              </p>
            )}
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <FieldContent>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="new-password"
            />
            <FieldDescription>Choose a strong password.</FieldDescription>
            {formState.fieldErrors?.password && (
              <p className="text-destructive text-sm">
                {formState.fieldErrors.password}
              </p>
            )}
          </FieldContent>
        </Field>

        {formState.error && (
          <p className="text-destructive text-sm">{formState.error}</p>
        )}

        {formState.success && (
          <p className="text-sm text-green-600">
            Profile updated successfully.
          </p>
        )}

        <Button type="submit" className="w-full sm:w-fit">
          Save changes
        </Button>
      </FieldGroup>
    </form>
  );
}
