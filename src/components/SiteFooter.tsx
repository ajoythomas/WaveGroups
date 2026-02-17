import { topContact } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3>Wave Groups</h3>
          <p>Expertise in Telecommunications, Foundation Inspections, Residential and Commercial buildings.</p>
        </div>
        <div>
          <h3>Contact</h3>
          <p>{topContact.address}</p>
          <p>{topContact.phonePrimary}</p>
          <p>{topContact.email}</p>
        </div>
      </div>
    </footer>
  );
}
