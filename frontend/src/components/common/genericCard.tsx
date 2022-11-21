import Link from "next/link";

interface CardProp {
  title: string;
  descripton?: string;
  link: string;
  primary?: boolean;
}

export function GenericCard({ title, descripton, link, primary }: CardProp) {
  return (
    <Link href={`${link}`} className={`bg-none p-5 border rounded-lg shadow-md ${primary ? 'col-span-2' : 'col-span-1 py-10 text-center'}`}>
      <h2 className="text-lg text-black mb-1 font-bold">{title}</h2>
      <span className="text-primary">{descripton}</span>
    </Link>
  );
}
