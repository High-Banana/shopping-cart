import { useState } from "react";

export default function useCloseForm() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  function handleFormClose(event) {
    event.preventDefault();
    setTimeout(() => setIsFormOpen(false), 100);
  }

  return { isFormOpen, setIsFormOpen, handleFormClose };
}
