import { getNotes } from "@/lib/api";
import { Metadata } from "next";
import NotesClient from "./Notes.client";

export const metadata: Metadata = {
  title: "Notes Page",
};

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const { notes, totalPages } = await getNotes(
    "",
    1,
    slug[0] === "all" ? undefined : slug[0]
  );
  console.log("slug", slug);

  return (
    <section>
      <NotesClient notes={notes} totalPages={totalPages} />
    </section>
  );
}
