import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Buscar...",
}: SearchBarProps) {
  return (
    <div className="flex items-center bg-surface-light dark:bg-surface-dark rounded-lg shadow-md p-2 border border-border-light dark:border-border-dark">
      <div className="pl-3 pr-2 text-text-secondary-light dark:text-text-secondary-dark">
        <Search size={20} />
      </div>
      <input
        className="flex-grow bg-transparent text-text-primary-light dark:text-text-primary-dark placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark focus:outline-none px-2 py-2"
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
