'use client';

import { StarIcon } from 'lucide-react';
import { cn } from '../lib/utils';

type RatingProps = {
  name: string;
  defaultValue?: number;
  max?: number;
  size?: 'md' | 'sm';
  disabled?: boolean;
  readonly?: boolean;
};

export function Rating({
  name,
  defaultValue = 0,
  max = 5,
  size = 'md',
  disabled = false,
  readonly = false,
}: RatingProps) {
  return (
    <fieldset disabled={disabled}>
      <legend className="sr-only">Rating</legend>

      <div
        className="group flex flex-row-reverse justify-end data-[readonly=true]:pointer-events-none"
        data-readonly={readonly}
      >
        {Array.from({ length: max }, (_, index) => {
          const value = max - index;

          return (
            <label
              key={value}
              className="text-muted-foreground group-hover:text-muted-foreground cursor-pointer p-px group-data-[readonly=true]:cursor-default hover:text-yellow-500 has-checked:text-yellow-500 group-data-[readonly=true]:has-checked:text-yellow-500 group-hover:[&_svg]:fill-none hover:[&_svg]:fill-current has-checked:[&_svg]:fill-current group-data-[readonly=true]:has-checked:[&_svg]:fill-current hover:[&~label]:text-yellow-500 has-checked:[&~label]:text-yellow-500 group-data-[readonly=true]:has-checked:[&~label]:text-yellow-500 hover:[&~label_svg]:fill-current has-checked:[&~label_svg]:fill-current group-data-[readonly=true]:has-checked:[&~label_svg]:fill-current"
            >
              <input
                type="radio"
                name={name}
                value={value}
                defaultChecked={value === defaultValue}
                readOnly={readonly}
                onClick={(event) => {
                  if (readonly) {
                    event.preventDefault();
                  }
                }}
                className="sr-only"
              />

              <StarIcon
                className={cn(
                  'fill-none stroke-current transition',
                  size === 'md' ? 'size-5' : 'size-4',
                )}
              />
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
