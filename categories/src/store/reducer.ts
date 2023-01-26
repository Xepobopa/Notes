import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchAllNotes, addNote, changeNoteById, fetchNoteById, deleteNoteById} from "./ActionCreator";
import {Notes} from "./types";
import {Note} from "../types";

const initialState: Notes = {
    notes: [],
    isLoading: false,
    error: '',
    fetchedNote: undefined,
}

export const NoteSlice = createSlice({
    name: 'Note',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchAllNotes.pending.type, (state) => {
                state.isLoading = true;
                state.fetchedNote = undefined;
            })
            .addCase(fetchAllNotes.fulfilled.type, (state, action: PayloadAction<Note[]>) => {
                state.isLoading = false;
                state.error = '';
                state.notes = action.payload;
                state.fetchedNote = undefined;
            })
            .addCase(fetchAllNotes.rejected.type, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.error = action.payload;
                state.fetchedNote = undefined;
            })

            .addCase(addNote.fulfilled.type, (state, action: PayloadAction<Note>) => {
                state.notes.push(action.payload);
                state.fetchedNote = undefined;
            })

            .addCase(fetchNoteById.fulfilled.type, (state, action: PayloadAction<Note>) => {
                state.fetchedNote = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchNoteById.pending.type, state => {
                state.isLoading = true;
            })
            .addCase(fetchNoteById.rejected.type, (state, action:PayloadAction<string>) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(changeNoteById.fulfilled.type, (state, action: PayloadAction<Note>) => {
                state.notes.map(note => {
                    if (note.id === action.payload.id) {
                        note.note = action.payload.note;
                    }
                })
                state.fetchedNote = action.payload;
                //state.notes[state.notes.findIndex((note) => note.id === action.payload.id)].note = action.payload.note;
            })

            .addCase(deleteNoteById.fulfilled.type, (state, action: PayloadAction<string>) => {
                state.notes = state.notes.filter((note) => {
                    return note.id !== action.payload;
                })
                state.fetchedNote = undefined;
            })

            .addDefaultCase((state, action) => {
                    // throw new Error('Default case corrupted (reducer.ts)');
            })

    }
});

export default NoteSlice.reducer;