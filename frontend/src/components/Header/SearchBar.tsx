import { Search } from "react-bootstrap-icons";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  return (
    <div className="relative w-fit-content">
      <Search
        size={15}
        className="absolute top-1/2 transform -translate-y-1/2 left-3 cursor-pointer"
      />

      <Input
        type="text"
        placeholder="Search File/CID"
        className="focus:outline-none px-8 rounded-3xl"
      />
    </div>
  );
};

export default SearchBar;
