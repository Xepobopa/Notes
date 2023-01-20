import React from 'react';
import {Note} from "./App";
import {Navigate, Outlet, useOutlet, useOutletContext, useParams} from "react-router-dom";

const NoteLayout = (notes: Note[]) => {
    const { id } = useParams();
    const note = notes.find(note => note.id === id);

     if (note === null) return <Navigate to={'/'} replace />

     return <Outlet context={note} />
};

export function useNote() {
    return useOutletContext<Note>();
}

export default NoteLayout;