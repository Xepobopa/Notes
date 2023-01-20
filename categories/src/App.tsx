import React, { useEffect, useState } from "react";
import NewNote from './NewNote';
import NoteList from "./NoteList";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

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
  const [notes, setNotes] = useState<Note[]>([]);
  const [isRefetch, setIsRefetch] = useState<boolean>(false);

  useEffect(() => {
    getNotes();
}, [isRefetch])

  async function getNotes() {
    try {
      const { data, status } = await axios.get<Note[]>('http://localhost:5000/notes');
      setNotes(data);
      console.log(data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error(`${e.code}. ${e.name} - ${e.message}`);
      }
      console.error(e);
    }
  }

function getAvailableTags(notes: Note[]) {
  let res = new Array();
  notes.map(note => note.note.tags.map(e => res.push(e)));
  return res;
}

return (

  <Container className={'my-4'}>
    {/*TODO: create context with notes*/}
    <Button onClick={() => setIsRefetch(!isRefetch)}>Refetch</Button>
    <Routes>
      <Route path="/" element={<NoteList availableTags={getAvailableTags(notes)} notes={notes} />} />
      <Route path='/new' element={<NewNote />} />
      <Route path={'/:id'} element={<NoteLayout notes={notes}/>} >
        <Route index element={<h1>Id</h1>} />
        <Route path={'edit'} element={<h1>Id Edit</h1>} />
      </Route>
      <Route path="*" element={<Navigate to={'/'} />} />
    </Routes>
  </Container>
);
}

export default App;