import styles from "./AboutMePage.module.css";

function AboutMePage() {
  return (
    <section className={styles.aboutMePage}>
      <section className={styles.mainAuthorInfo}>
        <h1>Abdelrahman Abdellatif</h1>
        <p className={styles.workTitle}>Fullstack Web developer</p>
        <p>
          {
            "Hello! I'm Abdelrahman, a full-stack web developer, though I prefer the back-end. I really enjoy figuring out how things work, especially something I use almost daily like software, and learning to code gave me the opportunity to do just that."
          }
        </p>
      </section>
      <section className={styles.mainDescription}>
        <p>
          {
            'My first experience with programming was when I came across "CS50x", a free introductory course to programming by Harvard. The course had a strong focus on the problem-solving mindset, which not only helped me become a better developer but also shaped how I think about any problem I face.'
          }
        </p>
        <p>
          {
            'One of the fields CS50 explored was web development, and that\'s where my actual journey of learning programming started. I found an open-source full-stack web development course, "The Odin Project", and started it right after finishing CS50. I learned about the basics of web development, deployment, and version control, particularly Git and why it matters.'
          }
        </p>
        <p>
          {
            "Later, I explored the front-end with React, learning about state management, hooks, and component-driven design while also focusing on accessibility and responsiveness. After becoming comfortable with the front-end, I started learning back-end concepts, including routing, databases and storage, authentication and security, RESTful APIs, and system architecture."
          }
        </p>
        <p>
          {
            "While I enjoyed both sides of development, I found myself becoming more drawn to the back-end. Each concept had so much depth and required a genuine understanding of why things work the way they do, not just how to use them."
          }
        </p>
        <p>
          {
            "I've been enjoying this journey, and I still have a long way to go. Programming is a field where you learn and grow constantly, and I like to believe that by learning in this field, not only do you grow your ability to develop and ship software, but you also build and shape a way of thinking that truly changes how you see things."
          }
        </p>
      </section>
    </section>
  );
}

export default AboutMePage;
