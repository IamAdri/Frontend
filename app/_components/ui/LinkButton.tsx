import Link from "next/link";

type LinkButtonProps = {
  href: string;
  title: string;
};

function LinkButton({ href, title }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className="border p-3 hover:bg-gray-400 hover:text-gray-50"
    >
      {title}
    </Link>
  );
}

export default LinkButton;
