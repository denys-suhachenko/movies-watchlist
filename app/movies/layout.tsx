export default function MoviesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="h-full">{children}</div>;
}
