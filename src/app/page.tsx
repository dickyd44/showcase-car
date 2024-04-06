import { SearchBar } from "@/components";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="home__filters">
        <SearchBar />
      </div>
    </main>
  );
}
