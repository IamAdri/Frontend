import Link from "next/link";
import LinkButton from "./_components/ui/LinkButton";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-xl font-bold">Welcome to Fullstack CRM</h1>
      <div className="flex gap-7 my-7">
        <LinkButton href="/customers" title="Customers" />
        <LinkButton href="/team-members" title="Team members" />
      </div>
    </div>
  );
}
