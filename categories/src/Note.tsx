import React, {useEffect, useState} from 'react';
import {Row, Col, Badge, Stack, Button, Spinner, Alert} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {useNote} from "./NoteLayout";
import {useAppDispatch, useAppSelector} from "./redux";
import {deleteNoteById, fetchNoteById} from "./ActionCreator";

const Note = () => {
    const id = useNote();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { fetchedNote: selectedNote, isLoading } = useAppSelector((state) => state.note);

    useEffect(() => {
        dispatch(fetchNoteById(id));
    }, []);

    const handlerDeleteNote = (id: string) => {
        dispatch(deleteNoteById(id));
        navigate('..');
    }

    if (isLoading || !selectedNote) {
        return <div className="d-flex justify-content-center mt-5">
            <button className="btn btn-primary" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span className="visually-hidden">Loading...</span>
            </button>
        </div>
    }

    return (
        <div>
            <Row className={'align-items-center mb-4'}>
                <Col>
                    <h1>{selectedNote.note.title}</h1>
                    {selectedNote.note.tags.length > 0 && (
                        <Stack gap={1} direction={'horizontal'}
                               className={'flex-wrap'}>
                            {selectedNote.note.tags.map(tag => (
                                <Badge className={'text-truncate'} key={tag.id}>{tag.label}</Badge>
                            ))}
                        </Stack>
                    )}
                </Col>
                <Col xs='auto'>
                    <Stack gap={2} direction="horizontal">
                        <Link to={`/${selectedNote.id}/edit`}>
                            <Button variant="primary">Edit</Button>
                        </Link>
                        <Button onClick={() => handlerDeleteNote(selectedNote.id)}  variant="outline-danger">Delete</Button>
                        <Link to={'..'}>
                            <Button variant="outline-secondary">Back</Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>
            <ReactMarkdown>
                {selectedNote.note.markdown}
            </ReactMarkdown>
        </div>
    );
};

export {Note};