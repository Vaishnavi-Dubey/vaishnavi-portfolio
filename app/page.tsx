import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import GithubStats from "@/components/GithubStats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { fetchPortfolioRepos, DEFAULT_GITHUB_USERNAME } from "@/lib/github";

export const revalidate = 60;

export default async function Home() {
  const { repos, syncedAt } = await fetchPortfolioRepos(DEFAULT_GITHUB_USERNAME);

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects repos={repos} syncedAt={syncedAt} />
      <GithubStats username={DEFAULT_GITHUB_USERNAME} />
      <Contact />
      <Footer />
    </>
  );
}
