import React, {useEffect, useState} from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import {Button, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NoteLayout from "./NoteLayout";
import NoteList from "./NoteList";
import NewNote from './NewNote';
import {Note as SelectedNote} from "./Note";
import axios from "axios";
import EditNote from "./EditNote";
import {useAppDispatch, useAppSelector} from "./redux";
import {fetchAllNotes} from "./ActionCreator";
import {useDispatch} from "react-redux";

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

const App = () => {
    const [isRefetch, setIsRefetch] = useState<boolean>(false);
    const {notes, isLoading} = useAppSelector((state) => state.note);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllNotes());
        //getNotes();
    }, [isRefetch])

    console.log(notes);

    function getAvailableTags(notes: Note[]) {
        let res = new Array<Tag>();
        notes.map(note => note.note.tags.map(e => res.push(e)));
        const uniqueSet = new Set(res.map(tag => JSON.stringify(tag)));
        return Array.from(uniqueSet).map(tag => JSON.parse(tag));
    }

    return (
        <Container className={'my-4'}>
            <Button onClick={() => setIsRefetch(!isRefetch)}>Refetch</Button>
            <Routes>
                <Route path="/" element={<NoteList availableTags={getAvailableTags(notes)}/>}/>
                <Route path='/new' element={<NewNote/>}/>
                <Route path={'/:id'} element={<NoteLayout/>}>
                    <Route index element={<SelectedNote/>}/>
                    <Route path={'edit'} element={<EditNote />}/>
                </Route>
                <Route path="*" element={<Navigate to={'/'}/>}/>
            </Routes>
        </Container>
    );
}

export default App;