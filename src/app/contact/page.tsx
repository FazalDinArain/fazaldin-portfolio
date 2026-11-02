import { ContactChannelIcon } from "@/components/ContactChannelIcon";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/config/site";
import { hrefDisplay } from "@/lib/href-display";
import { seoMeta } from "@/config/seo-meta";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: seoMeta.contactTitle,
  description: seoMeta.contactDescription,
  path: "/contact/",
  keywords: ["contact", "hire software engineer", "Laravel", "NestJS"],
});

const contactChannels = [
  {
    kind: "phone" as const,
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phone.replace(/\s/g, "")}`,
    external: false,
  },
  {
    kind: "email" as const,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    external: false,
  },
  {
    kind: "linkedin" as const,
    label: "Linkedin",
    value: hrefDisplay(site.linkedin),
    href: site.linkedin,
    external: true,
  },
  {
    kind: "github" as const,
    label: "Github",
    value: hrefDisplay(site.github),
    href: site.github,
    external: true,
  },
] as const;

export default function ContactPage() {
  return (
    <main className="page-container contact-page">
      <header className="page-header">
        <h1 className="page-title">Contact</h1>
        <p className="page-intro mb-0">
          Reach out for opportunities, collaborations, or technical challenges. I
          read every message and usually reply within a few days.
        </p>
      </header>

      <section className="contact-channels" aria-label="Contact links">
        <div className="contact-channels-grid">
          {contactChannels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              className="contact-channel-card"
              {...(channel.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <div className="contact-channel-row">
                <span className="contact-channel-icon">
                  <ContactChannelIcon kind={channel.kind} />
                </span>
                <span className="contact-channel-label">{channel.label}</span>
              </div>
              <span className="contact-channel-value">{channel.value}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="contact-form-section" aria-labelledby="form-heading">
        <h2 id="form-heading" className="section-heading">
          Send a message
        </h2>
        <div className="form-panel">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
