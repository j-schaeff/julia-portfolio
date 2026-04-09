import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

async function getHomeContent() {
  const filePath = path.join(process.cwd(), "content/home/index.md");
  const raw = await fs.readFile(filePath, "utf8");
  const { data } = matter(raw);
  return data;
}

export default async function Home() {
  const home = await getHomeContent();

  const projects = [
    { name: "Philival", bg: "#91DEFF", text: "#125775" },
    { name: "Spring", bg: "#EB2F67", text: "#6E0E2B" },
    { name: "S+R", bg: "#3D54D4", text: "#071042" },
    { name: "Kräuter Kult", bg: "#9ECC7A", text: "#355919" },
    { name: "Poetry", bg: "#EB352F", text: "#5C0F0F" },
    { name: "Oof", bg: "#807040", text: "#452E16" },
  ];

  return (
    <div className="min-h-screen md:flex">
      <aside className="flex h-auto flex-col justify-between md:fixed md:inset-y-0 md:left-0 md:h-screen md:w-[40vw]">
        <div className="p-6">
          <h1
            className="wordmark-text wordmark-enter leading-[0.86] font-thin [font-family:var(--font-a2z-faucet)]"
            style={{
              fontFeatureSettings:
                '"ss02" 1, "ss02" 1, "ss03" 1, "liga" 0, "dlig" 0',
            }}
          >
            julia schäffler
          </h1>
        </div>
        <nav
          aria-label="Project navigation"
          className="flex w-full overflow-x-auto md:flex-col md:overflow-visible"
        >
          {projects.map((project) => (
            <a
              key={project.name}
              href="#"
              style={{ backgroundColor: project.bg, color: project.text }}
              className="nav-link-item relative inline-flex h-12 min-w-max items-center whitespace-nowrap md:w-full"
            >
              <span className="nav-link-label display-font-features">
                {project.name}
              </span>
            </a>
          ))}
        </nav>
      </aside>

      <div className="md:ml-[40vw] md:h-screen md:w-[60vw] md:overflow-y-auto">
        <div className="flex min-h-screen flex-col">
          <main className="flex flex-1 flex-col gap-6 border-0 px-6 pb-6">
            <section className="site-body-text flex max-w-3xl flex-col gap-6 border-0 py-6">
              <p>{home.intro}</p>
              <p>{home.bio}</p>
              <button
                type="button"
                className="display-font-features inline-flex w-fit rounded-none border-2 border-transparent bg-neutral-900 p-2 text-white outline-none ring-0 transition-[background-color,color] duration-300 [transition-timing-function:ease] hover:bg-white hover:text-black hover:ring-0 focus:outline-none focus-visible:outline-none"
              >
                get in touch
              </button>
            </section>

            <section className="grid gap-6 border-0 pt-6 md:grid-cols-2">
              <div className="flex flex-col gap-4">
                <h2 className="display-font-features">
                  Relevant Work Experience
                </h2>
                <ul className="site-body-text flex flex-col gap-4">
                  {home.experience?.map((entry) => (
                    <li key={`${entry.years}-${entry.role}`}>
                      <div className="flex flex-col gap-1">
                        <p>
                          {entry.years} {entry.role}
                        </p>
                        <p>@ {entry.company}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <h2 className="display-font-features">
                  Education
                </h2>
                <ul className="site-body-text flex flex-col gap-4">
                  {home.education?.map((entry) => (
                    <li key={`${entry.years}-${entry.degree}`}>
                      <div className="flex flex-col gap-1">
                        <p>
                          {entry.years} {entry.degree}
                        </p>
                        <p>{entry.school}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </main>

          <footer className="flex items-center justify-between border-0 p-6 text-neutral-600">
            <a href="#" className="hover:text-neutral-900">
              Instagram
            </a>
            <a href="#" className="hover:text-neutral-900">
              Imprint
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}
