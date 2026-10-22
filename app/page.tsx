import DigitalTwin from "./components/digital-twin";

const experience = [
  {
    period: "2021 — NOW",
    role: "Development Team Lead · Data Engineering",
    company: "Nextgen Clearing Ltd",
    note: "Leading data engineering and delivery, with a focus on Trino and open lakehouse architecture.",
    current: true,
  },
  {
    period: "2016 — 2021",
    role: "Software Engineer",
    company: "Nextgen Clearing Ltd",
    note: "Built scripting-led automation for telecom operations.",
    current: false,
  },
  {
    period: "2014 — 2016",
    role: "Software Developer",
    company: "Intelliswift Software, Inc.",
    note: "Developed Perl, Java and shell scripts to collect web data and meet client needs.",
    current: false,
  },
];

const capabilities = [
  {
    number: "01",
    title: "Lakehouse, built to scale.",
    description:
      "I design Trino-powered lakehouses: federated SQL across Parquet, object storage, and multiple databases—without moving the data first.",
    tags: ["Trino", "S3 / MinIO", "Parquet"],
    mark: "↗",
    variant: "lime",
  },
  {
    number: "02",
    title: "From ingestion to insight.",
    description:
      "Monitored Apache NiFi pipelines, FastAPI services, and probabilistic HyperLogLog analytics designed to work at billions of rows.",
    tags: ["Apache NiFi", "FastAPI", "HLL"],
    mark: "⌘",
    variant: "light",
  },
  {
    number: "03",
    title: "Good engineering is a team sport.",
    description:
      "I guide architecture decisions, code reviews, and delivery—and help engineers grow into owners of the systems they build.",
    tags: ["Team leadership", "Perl", "Python"],
    mark: "✳",
    variant: "coral",
  },
];

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? "arrow-icon arrow-icon--diagonal" : "arrow-icon"}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d={diagonal ? "M5 15 15 5M6 5h9v9" : "M3.5 10h12m-5-5 5 5-5 5"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BrandMark() {
  return (
    <a className="brand" href="#home" aria-label="Hemant Mane, home">
      <span className="brand__monogram">H<span>M</span></span>
      <span className="brand__name">HEMANT MANE<span>DATA ENGINEERING / LAKEHOUSE</span></span>
    </a>
  );
}

export default function Home() {
  return (
    <main>
      <div className="hero-shell" id="home">
        <header className="site-header">
          <BrandMark />
          <nav className="nav" aria-label="Main navigation">
            <a href="#about">About</a>
            <a href="#work">What I do</a>
            <a href="#journey">Journey</a>
            <a className="nav__contact" href="#contact">
              Let’s talk <ArrowIcon diagonal />
            </a>
          </nav>
        </header>

        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__copy">
            <p className="eyebrow hero__eyebrow">
              <span className="availability-dot" />
              DATA ENGINEERING TEAM LEAD <span className="eyebrow-divider">/</span> MUMBAI REGION, INDIA
            </p>
            <h1 id="hero-title">
              Data, at scale.
              <br />
              <span>Without</span> <span className="hero__serif">the noise.</span>
            </h1>
            <p className="hero__intro">
              I’m Hemant—a data engineering team lead building lakehouse
              platforms that make large datasets fast, reliable, and simple to query.
            </p>
            <div className="hero__actions">
              <a className="button button--bright" href="#work">
                Explore my work <ArrowIcon />
              </a>
              <a
                className="text-link hero__linkedin"
                href="https://www.linkedin.com/in/hemant-mane"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn <ArrowIcon diagonal />
              </a>
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="hero-art__grain" />
            <div className="hero-art__orb hero-art__orb--outer" />
            <div className="hero-art__orb hero-art__orb--inner" />
            <div className="hero-art__cross hero-art__cross--one" />
            <div className="hero-art__cross hero-art__cross--two" />
            <span className="hero-art__label hero-art__label--top">THOUGHTFUL BY DESIGN</span>
            <span className="hero-art__label hero-art__label--side">SYSTEMS / PEOPLE / PROGRESS</span>
            <div className="hero-art__stamp">
              <span>BUILD</span>
              <span>WHAT</span>
              <span>MATTERS<span className="hero-art__period">.</span></span>
            </div>
            <span className="hero-art__coordinate">DATA ENGINEERING / MUMBAI, INDIA</span>
          </div>

          <div className="hero__foot">
            <span>DATA PLATFORMS, DESIGNED WITH INTENTION.</span>
            <a href="#about">SCROLL TO EXPLORE <span>↓</span></a>
          </div>
        </section>
      </div>

      <section className="intro-section section-pad" id="about" aria-labelledby="about-title">
        <div className="section-label">
          <span className="section-index">01</span>
          <span>A LITTLE ABOUT ME</span>
        </div>
        <div className="intro-section__content">
          <h2 id="about-title">
            Big data should feel <span>a little simpler.</span>
          </h2>
          <div className="intro-section__details">
            <p>
              I’m a data engineering team lead in the Mumbai Metropolitan Region.
              I build platforms that make large datasets fast, reliable, and
              straightforward to query.
            </p>
            <p>
              My work brings together Trino, open lakehouse architecture, and
              reliable ingestion. I also lead architecture decisions, reviews,
              and delivery while helping engineers grow.
            </p>
            <a className="text-link text-link--dark" href="#journey">
              A little more about the journey <ArrowIcon />
            </a>
          </div>
        </div>
        <div className="facts-strip">
          <div className="fact">
            <span className="fact__value">12<span>+</span></span>
            <span className="fact__label">YEARS IN SOFTWARE</span>
          </div>
          <div className="fact">
            <span className="fact__value fact__value--word">Trino + SQL</span>
            <span className="fact__label">FEDERATED DATA QUERYING</span>
          </div>
          <div className="fact">
            <span className="fact__value fact__value--word">Open lakehouse</span>
            <span className="fact__label">S3 / MINIO · PARQUET</span>
          </div>
          <div className="fact fact--last">
            <span className="fact__value fact__value--word">People first</span>
            <span className="fact__label">MENTORSHIP & OWNERSHIP</span>
          </div>
        </div>
      </section>

      <section className="work-section section-pad" id="work" aria-labelledby="work-title">
        <div className="section-label section-label--light">
          <span className="section-index">02</span>
          <span>WHERE I MAKE A DIFFERENCE</span>
        </div>
        <div className="work-heading">
          <h2 id="work-title">The work, <span>at its best.</span></h2>
          <p>A few things I care about building—and building better.</p>
        </div>
        <div className="work-grid">
          {capabilities.map((item) => (
            <article className={`work-card work-card--${item.variant}`} key={item.number}>
              <div className="work-card__top">
                <span className="work-card__number">/ {item.number}</span>
                <span className="work-card__mark" aria-hidden="true">{item.mark}</span>
              </div>
              <div className="work-card__content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className="work-card__bottom">
                <div className="tag-list">
                  {item.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                </div>
                <a
                  href="https://www.linkedin.com/in/hemant-mane"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Connect on LinkedIn to discuss ${item.title}`}
                  className="work-card__link"
                >
                  <ArrowIcon diagonal />
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="work-note">
          These are the challenges I work on every day. <a href="#contact">Have something in mind? Let’s compare notes <ArrowIcon diagonal /></a>
        </p>
      </section>

      <section className="journey-section section-pad" id="journey" aria-labelledby="journey-title">
        <div className="section-label">
          <span className="section-index">03</span>
          <span>THE CAREER JOURNEY</span>
        </div>
        <div className="journey-layout">
          <div className="journey-intro">
            <h2 id="journey-title">Built over time.<br /><span>Better every year.</span></h2>
            <p>
              Three roles, two teams, one steady evolution—from getting into
              the code to bringing people together around what comes next.
            </p>
            <a
              className="text-link text-link--dark"
              href="https://www.linkedin.com/in/hemant-mane"
              target="_blank"
              rel="noreferrer"
            >
              Full profile on LinkedIn <ArrowIcon diagonal />
            </a>
          </div>
          <ol className="timeline">
            {experience.map((job) => (
              <li className={`timeline__item${job.current ? " timeline__item--current" : ""}`} key={job.role}>
                <span className="timeline__dot" aria-hidden="true" />
                <div className="timeline__heading">
                  <div>
                    <h3>{job.role}</h3>
                    <p>{job.company}</p>
                  </div>
                  <span className="timeline__period">{job.period}</span>
                </div>
                <p className="timeline__note">{job.note}</p>
              </li>
            ))}
            <li className="timeline__education">
              <span className="timeline__education-label">THE FOUNDATION</span>
              <span>B.Sc. Information Technology <span className="timeline__separator">/</span> Ramniranjan Jhunjhunwala College <span className="timeline__separator">/</span> 2014</span>
            </li>
          </ol>
        </div>
      </section>

      <section className="toolkit-section" aria-label="Technical toolkit and languages">
        <div className="toolkit__intro">
          <span className="section-index">04</span>
          <h2>The toolkit</h2>
          <p>Tools I use to build modern data platforms.</p>
        </div>
        <div className="toolkit__stack">
          <span>TRINO</span><span>S3 / MINIO</span><span>PARQUET</span><span>HYPERLOGLOG</span><span>APACHE NIFI</span><span>PERL</span><span>PYTHON</span><span>SQL / PL/SQL</span><span>FASTAPI</span><span>CLICKHOUSE</span><span>DUCKDB</span><span>JAVA</span>
        </div>
        <div className="toolkit__extras">
          <div className="toolkit__languages">
            <span className="toolkit__languages-label">LANGUAGES</span>
            <span>English</span><span>Hindi</span><span>Marathi</span>
          </div>
          <div className="toolkit__certifications">
            <span className="toolkit__languages-label">CERTIFICATIONS & COURSES</span>
            <span>AMCAT · Channel Sales Professional</span>
            <span>AMCAT · Collections Specialist</span>
            <span>Level Up: SQL</span>
            <span>GPT-4: The New GPT Release and What You Need to Know</span>
            <span>Communication Within Teams</span>
          </div>
        </div>
      </section>

      <footer className="contact-section" id="contact">
        <div className="contact-section__top">
          <BrandMark />
          <span className="contact-section__note">OPEN DATA PLATFORMS. THOUGHTFUL ENGINEERING.</span>
        </div>
        <div className="contact-main">
          <p className="eyebrow"><span className="availability-dot" /> OPEN TO A GOOD CONVERSATION</p>
          <h2>Let’s make<br /><span>something matter.</span></h2>
          <a
            className="contact-main__link"
            href="https://www.linkedin.com/in/hemant-mane"
            target="_blank"
            rel="noreferrer"
          >
            Connect on LinkedIn <ArrowIcon diagonal />
          </a>
        </div>
        <div className="contact-bottom">
          <span>© HEMANT MANE <span className="contact-bottom__year">2026</span></span>
          <span>MADE WITH INTENTION IN THE MUMBAI METROPOLITAN REGION</span>
          <a href="https://www.linkedin.com/in/hemant-mane" target="_blank" rel="noreferrer">
            LINKEDIN <ArrowIcon diagonal />
          </a>
        </div>
      </footer>
      <DigitalTwin />
    </main>
  );
}
