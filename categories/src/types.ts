export type Note = {
    id: string;
    note: NoteData;
};

export type NoteData = {
    title: string;
    markdown: string;
    tags: Tag[];
}

export type Tag = {
    id: string;
    label: string;
}