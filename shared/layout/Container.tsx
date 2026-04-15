import { cn } from '@/shared/lib/utils';

type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};

export default function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn('mx-auto max-w-7xl px-6 xl:px-4', className)}>
      {children}
    </div>
  );
}
