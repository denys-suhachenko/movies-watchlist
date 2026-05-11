export default function MediaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="h-full">{children}</div>;
}
