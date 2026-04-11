export default function MoviesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="h-full bg-gray-100">{children}</div>;
}
