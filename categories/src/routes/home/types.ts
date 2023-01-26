import {Tag} from "../../types";

export type NoteListProps = {
    availableTags: Tag[];
}

export type NoteCardProps = {
    id: string;
    title: string;
    tags: Tag[];
}