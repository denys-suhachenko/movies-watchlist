import Container from '@/components/layout/Container';

export default function MoviesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-gray-100">
      <Container className="py-6">{children}</Container>
    </div>
  );
}
