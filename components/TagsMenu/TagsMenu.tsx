import { NoteTag } from "@/types/note";
import css from "./TagsMenu.module.css";
import Link from "next/link";

const tags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];
const TagsMenu = () => {
  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton}>Notes ▾</button>
      <ul className={css.menuList}>
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagsMenu;
