import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold tracking-tight">Welcome to Notes</h1>
      <p className="mt-3 text-zinc-500">
        A simple note-taking app with rich text editing and public sharing.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          href="/authenticate?mode=login"
          className="rounded-md bg-white px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
        >
          Log in
        </Link>
        <Link
          href="/authenticate?mode=signup"
          className="rounded-md border border-zinc-700 px-5 py-2 text-sm font-medium transition-colors hover:bg-zinc-900"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
