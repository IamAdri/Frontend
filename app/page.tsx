import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-xl font-bold">Welcome to Fullstack CRM</h1>
      <div className="flex gap-7 my-7">
        <Link
          href="/customers"
          className="border p-3 hover:bg-gray-400 hover:text-gray-50"
        >
          Customers
        </Link>
        <Link
          href="/team-members"
          className="border p-3 hover:bg-gray-400 hover:text-gray-50"
        >
          Team members
        </Link>
      </div>
    </div>
  );
}
