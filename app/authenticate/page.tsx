import { AuthForm } from "./auth-form";

export default async function Authenticate({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const { mode } = await searchParams;
  const authMode = mode === "signup" ? "signup" : "login";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold tracking-tight">
        {authMode === "login" ? "Welcome back" : "Create an account"}
      </h1>
      <p className="mt-2 mb-6 text-sm text-zinc-500">
        {authMode === "login"
          ? "Log in to continue to your notes."
          : "Sign up to start taking notes."}
      </p>
      <AuthForm mode={authMode} />
    </div>
  );
}
