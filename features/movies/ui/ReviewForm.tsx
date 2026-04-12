'use client';

import { useActionState } from 'react';

import { Label } from '@/shared/ui/label';
import { Textarea } from '@/shared/ui/textarea';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

import { createReviewAction, ActionState } from '../actions';
import { useFormStatus } from 'react-dom';

type ReviewFormProps = {
  movieId: number;
};

const initialState = {
  error: '',
  success: false,
};

export function MovieReviewForm({ movieId }: ReviewFormProps) {
  const [formState, formAction] = useActionState(handleAction, initialState);

  function handleAction(prevState: ActionState, data: FormData) {
    return createReviewAction(String(movieId), data);
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="rating">Your rating</Label>
        <Input id="rating" name="rating" type="number" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Add description"
          rows={5}
        />
      </div>

      <div className="text-sm font-medium text-red-500">{formState.error}</div>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      Send Review
    </Button>
  );
}
