import React, {useEffect} from "react";
import { useState } from "react";
import CreatableReactSelect from "react-select/creatable";
import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../store/redux";
import {addNote, changeNoteById} from "../store/ActionCreator";
import {Note, NoteData, Tag} from "../types";

const NoteForm = () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { fetchedNote: note } = useAppSelector(state => state.note);

    useEffect(() => {
      setTags(note ? note.note.tags : []);
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const newNote = {
            title: formData.get('title') as string,
            markdown: formData.get('body') as string,
            tags: tags
        } as NoteData;

        note ? dispatch(changeNoteById({id: note.id, note: newNote} as Note)) : dispatch(addNote(newNote));

        navigate('..');
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control required name="title" type="text" defaultValue={note ? note.note.title : ""}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect
                                value={tags.map((tag) => {
                                    return { label: tag.label, value: tag.id }
                                })}
                                onChange={tags => {
                                    setTags(tags.map(tag => {
                                        return { label: tag.label, id: tag.value }
                                    }))
                                }}
                                isMulti />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="markdown">
                    <Form.Label>Body</Form.Label>
                    <Form.Control required as="textarea" name="body" rows={15} defaultValue={note ? note.note.markdown : ''}/>
                </Form.Group>
                <Stack direction="horizontal" gap={2} className="justify-content-end">
                    <Button type="submit">Save</Button>
                    <Link to='..'>
                        <Button type="button" variant="outline-secondary">Cancel</Button>
                    </Link>
                </Stack>
            </Stack>
        </Form>
    );
}

export default NoteForm;