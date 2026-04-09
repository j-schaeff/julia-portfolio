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
            className="wordmark-enter block w-full text-[clamp(3rem,8.9vw,9rem)] leading-[0.86] font-thin [font-family:var(--font-wordmark)]"
            style={{
              fontFeatureSettings: '"ss02" 1, "liga" 0, "dlig" 0',
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
              className="nav-link-item relative inline-flex h-12 min-w-max items-center whitespace-nowrap transition-opacity hover:opacity-90 md:w-full"
            >
              <span className="nav-link-label">{project.name}</span>
            </a>
          ))}
        </nav>
      </aside>

      <div className="pt-6 md:ml-[40vw] md:h-screen md:w-[60vw] md:overflow-y-auto">
        <div className="flex min-h-screen flex-col">
          <main className="flex flex-1 flex-col gap-6 px-6 pb-6">
            <section className="flex max-w-3xl flex-col gap-6 text-neutral-700">
              <p>{home.intro}</p>
              <p>{home.bio}</p>
              <button className="inline-flex w-fit rounded-none bg-neutral-900 p-2 font-bold text-white transition-colors hover:bg-neutral-700">
                get in touch
              </button>
            </section>

            <section className="grid gap-6 text-neutral-900 md:grid-cols-2">
              <div className="flex flex-col gap-6">
                <h2 className="font-bold text-neutral-900">
                  Relevant Work Experience
                </h2>
                <ul className="flex flex-col gap-6">
                  {home.experience?.map((entry) => (
                    <li key={`${entry.years}-${entry.role}`}>
                      {entry.years} {entry.role} @ {entry.company}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-6">
                <h2 className="font-bold text-neutral-900">
                  Education
                </h2>
                <ul className="flex flex-col gap-6">
                  {home.education?.map((entry) => (
                    <li key={`${entry.years}-${entry.degree}`}>
                      {entry.years} {entry.degree} @ {entry.school}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </main>

          <footer className="flex items-center justify-between p-6 text-neutral-600">
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
