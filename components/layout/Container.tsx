import { cn } from '@/lib/utils';

type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};

export default function Container({ className, children }: ContainerProps) {
  return <div className={cn('mx-auto max-w-7xl', className)}>{children}</div>;
}
