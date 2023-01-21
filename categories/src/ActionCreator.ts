import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {Note, NoteData} from "./App";

export const fetchAllNotes = createAsyncThunk('notes/fetchAll',
    async (arg, thunkAPI) => {
        try {
            const response = await axios.get<Note[]>('http://localhost:5000/notes');
            return response.data as Note[];
        } catch (e) {
            if (e instanceof Error) return thunkAPI.rejectWithValue(`${e.name}   ${e.message}`);
        }
    });

export const fetchNoteById = createAsyncThunk('notes/fetchById',
    async (id: string, thunkAPI) => {
        try {
            const response = await axios.get<Note>(`http://localhost:5000/notes/${id}`,);
            return response.data as Note;
        } catch (e) {
            if (e instanceof Error) return thunkAPI.rejectWithValue(`${e.name}   ${e.message}`);
        }
    });

export const addNote = createAsyncThunk('notes/add',
    async (note: NoteData, thunkAPI) => {
        try {
            const { data } = await axios<Note>({
                url: "http://localhost:5000/notes",
                method: 'post',
                data: {
                    note,
                }
            })
            console.log(data);
            return data as Note;
        } catch (e) {
            if (e instanceof Error) return thunkAPI.rejectWithValue(`${e.name}   ${e.message}`);
        }
    });

export const changeNoteById = createAsyncThunk('notes/changeById',
    async (note: Note, thunkAPI) => {
        try {
            await axios({
                url: `http://localhost:5000/notes/${note.id}`,
                method: 'put',
                data: {
                    note: note.note,
                }
            });
            return note;
        } catch (e) {
            if (e instanceof Error) return thunkAPI.rejectWithValue(`${e.name}   ${e.message}`);
        }
    });

export const deleteNoteById = createAsyncThunk('notes/deleteById',
    async (id: string, thunkAPI) => {
        try {
            await axios.delete(`http://localhost:5000/notes/${id}`);
            return id;
        } catch (e) {
            if (e instanceof Error) return thunkAPI.rejectWithValue(`${e.name}   ${e.message}`);
        }
    });