"use client";

import { useState } from "react";
import css from "./page.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import { getNotes, NotesResponse } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import NoteForm from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";
import EmptyState from "@/components/EmptyState/EmptyState";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";

const useToggle = (): [boolean, () => void, () => void] => {
  const [isOpen, setIsOpen] = useState(false);
  return [isOpen, () => setIsOpen(true), () => setIsOpen(false)];
};

export default function NotesClient({ notes, totalPages }: NotesResponse) {
  const [isModalOpen, openModal, closeModal] = useToggle();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const updateSearchQuery = useDebouncedCallback((newQuery: string) => {
    setSearchQuery(newQuery);
    setPage(1);
  }, 300);

  const { data, isLoading } = useQuery({
    queryKey: ["notes", searchQuery, page],
    queryFn: () => getNotes(searchQuery, page),
    initialData: { notes, totalPages },
    placeholderData: keepPreviousData,
  });

  const currentTotalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={updateSearchQuery} />
        {currentTotalPages > 1 && (
          <Pagination
            totalPages={currentTotalPages}
            page={page}
            onPageChange={setPage}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {data && data.notes.length === 0 && (
        <EmptyState message="No notes found." />
      )}
      {data && !isLoading && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onSuccess={closeModal} onCancel={closeModal} />
        </Modal>
      )}
    </div>
  );
}
