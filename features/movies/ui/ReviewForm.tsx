'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import { Label } from '@/shared/ui/label';
import { Textarea } from '@/shared/ui/textarea';
import { Button } from '@/shared/ui/button';
import { Rating } from '@/shared/ui/rating';

import { createReviewAction, ActionState } from '../actions';

type ReviewFormProps = {
  movieId: number;
};

const initialState = {
  error: '',
  success: false,
};

export function MovieReviewForm({ movieId }: ReviewFormProps) {
  const [formState, formAction] = useActionState(handleAction, initialState);

  function handleAction(_: ActionState, data: FormData) {
    return createReviewAction(String(movieId), data);
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label>Your rating</Label>
        <Rating name="rating" defaultValue={0} />
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
