import { useState, useMemo } from "react";

export function useFAQSearch(items) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(() => {
    return items.filter(
      (item) =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  return { searchTerm, setSearchTerm, filteredItems };
}
