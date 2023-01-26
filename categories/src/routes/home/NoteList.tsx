import React, {useState} from "react";
import {Button, Col, Form, Row, Stack} from "react-bootstrap";
import {Link} from "react-router-dom";
import ReactSelect from 'react-select';
// @ts-ignore
import styles from './NoteLists.module.css';
import {useAppSelector} from "../../store/redux";
import {NoteCard} from "./NoteCard";
import {NoteListProps} from "./types";
import {Tag} from "../../types";


const NoteList = ({availableTags}: NoteListProps) => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState<string>('');
    const {notes, isLoading} = useAppSelector((state) => state.note);

    const filteredNotes = notes.filter(note => (title === ''
            || note.note.title.toLowerCase().includes(title.toLowerCase()))
        && (tags.length === 0 || tags.every(tag => note.note.tags.some(
            noteTag => noteTag.id === tag.id))));

    return (
        <>
            <Row className={'align-items-center mb-4'}>
                <Col>
                    <h1>Notes</h1>
                </Col>
                <Col xs='auto'>
                    <Stack gap={2} direction="horizontal">
                        <Link to={"new"}>
                            <Button variant="primary">Create</Button>
                        </Link>
                        <Button variant="outline-secondary">Edit Tags</Button>
                    </Stack>
                </Col>
            </Row>
            <Form>
                <Row className="mb-4">
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={title}
                                          onChange={e => setTitle(e.currentTarget.value)}></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <ReactSelect value={tags.map((tag) => {
                                return {label: tag.label, value: tag.id}
                            })}
                                         onChange={tags => {
                                             setTags(tags.map(tag => {
                                                 return {label: tag.label, id: tag.value}
                                             }))
                                         }}
                                         options={availableTags.map((tag) => {
                                             return {label: tag.label, value: tag.id}
                                         })}
                                         isMulti/>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            {isLoading
                ?  <div className="d-flex justify-content-center mt-5">
                    <button className="btn btn-primary" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span className="visually-hidden">Loading...</span>
                    </button>
                    </div>
                :   <Row xs={1} sm={2} lg={3} xl={4} className={'g-3'}>
                    {filteredNotes.map(note => (
                        <Col key={note.id}>
                            <NoteCard id={note.id} title={note.note.title} tags={note.note.tags}/>
                        </Col>
                    ))}
                    </Row>}
        </>
    );
}

export default NoteList;