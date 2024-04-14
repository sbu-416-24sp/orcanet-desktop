import { Button } from "../shadcn/components/ui/button";
import { Input } from "../shadcn/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ onChange }: SearchBarProps) {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Hash"
        className="w-full"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
