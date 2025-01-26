export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      {children}
    </div>
  );
}
