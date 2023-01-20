import React from "react";
import { useState } from "react";
import { NoteData, Tag, Note } from './App';
import CreatableReactSelect from "react-select/creatable";
import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

type NoteFormProps = {
    onSubmit: (data: NoteData) => void;
}

const NoteForm = () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const navigate = useNavigate();

    async function postNote(note: NoteData) {
        try {
            const { status } = await axios({
                url: 'http://localhost:5000/notes',
                method: 'post',
                data: {
                    note
                }
            });
        } catch (e) {
            if (axios.isAxiosError(e)){
                console.error(`${e.name} - ${e.message}`);
            }
            console.log(e);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const note = {
            title: formData.get('title') as string,
            markdown: formData.get('body') as string,
            tags: tags
        } as NoteData;
        await postNote(note);
        navigate('..');
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control required name="title" type="text" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect value={tags.map((tag) => {
                                return { label: tag.label, value: tag.id }
                            })}
                            onChange={tags => {
                                setTags(tags.map(tag => {
                                    return { label: tag.label, id: tag.value }
                                }))
                            }} isMulti />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="markdown">
                    <Form.Label>Body</Form.Label>
                    <Form.Control required as="textarea" name="body" rows={15} />
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