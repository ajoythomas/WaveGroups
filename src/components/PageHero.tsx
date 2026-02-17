import Link from "next/link";

export function PageHero({ title }: { title: string }) {
  return (
    <section className="page-hero">
      <div className="container page-hero-inner">
        <h1>{title}</h1>
        <p>
          <Link href="/">Wave Groups</Link> &gt; {title}
        </p>
      </div>
    </section>
  );
}
