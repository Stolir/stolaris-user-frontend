import { Github, Mail, X } from "iconoir-react";
import ContactCard from "../../components/ContactCard/ContactCard";
import TypewriterQuote from "../../components/TypewriterQuote/TypewriterQuote";
import styles from "./ContactPage.module.css";

function ContactPage() {
  return (
    <section className={styles.contactPage}>
      <h1>Let Me Hear From You</h1>

      <ContactCard
        icon={<Mail />}
        link={"mailto:abdelrahmankabdellatif@gmail.com"}
        text={"abdelrahmankabdellatif@gmail.com"}
      />
      <ContactCard
        icon={<X />}
        link={"https://x.com/Stolaris7"}
        text={"Twitter/X"}
      />
      <ContactCard
        icon={<Github />}
        link={"https://github.com/Stolir"}
        text={"Github"}
      />
      <TypewriterQuote
        fullQuote={
          "The great gift of conversation lies less in displaying it ourselves than in drawing it out of others."
        }
        fullAuthor={"Jean de la Bruyère"}
      />
    </section>
  );
}

export default ContactPage;
