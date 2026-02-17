import Link from "next/link";
import { navItems, topContact } from "@/content/site";

export function SiteHeader() {
  return (
    <header>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>{topContact.phonePrimary}</span>
          <a href={`mailto:${topContact.email}`}>{topContact.email}</a>
        </div>
      </div>
      <div className="nav-shell">
        <div className="container nav-inner">
          <Link className="brand" href="/">
            wave groups
          </Link>
          <nav>
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
