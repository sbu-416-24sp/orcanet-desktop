import SearchBar from "./SearchBar.tsx";
import TimeBar from "./TimeBar.tsx";

export default function Header() {
  return (
    <div className="flex justify-between items-center mb-3 animate__animated animate__fadeInUp">
      <SearchBar />
      <TimeBar />
    </div>
  );
}
