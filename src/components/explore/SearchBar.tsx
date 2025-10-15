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
    <div className="bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark flex items-center rounded-lg border p-2 shadow-md">
      <div className="text-text-secondary-light dark:text-text-secondary-dark pr-2 pl-3">
        <Search size={20} />
      </div>
      <input
        className="text-text-primary-light dark:text-text-primary-dark placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark flex-grow bg-transparent px-2 py-2 focus:outline-none"
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
