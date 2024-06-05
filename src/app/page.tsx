import SearchBar from "./components/SearchBar";

export default function Home() {
  return (
    <main className="max-w-screen-2xl grid place-items-center">
      <div className="w-full">
        <SearchBar />
      </div>
    </main>
  );
}
