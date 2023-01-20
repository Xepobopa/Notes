import React, {useState} from "react";
import {Badge, Button, Card, Col, Form, Row, Stack} from "react-bootstrap";
import {Link} from "react-router-dom";
import ReactSelect from 'react-select';
import {Note, Tag} from "./App";
// @ts-ignore
import styles from './NoteLists.module.css';

type NoteCardProps = {
    id: string;
    title: string;
    tags: Tag[];
}

type NoteListProps = {
    availableTags: Tag[];
    notes: Note[];
}

const NoteList = ({availableTags, notes}: NoteListProps) => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState<string>('');

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
            <Row xs={1} sm={2} lg={3} xl={4} className={'g-3'}>
                {filteredNotes.map(note => (
                    <Col key={note.id}>
                        <NoteCard id={note.id} title={note.note.title} tags={note.note.tags}/>
                    </Col>
                ))}
            </Row>
        </>
    );
}

function NoteCard({id, title, tags}: NoteCardProps) {
    return <Card as={Link} to={`/${id}`} className={`text-reset ${styles.card}`}>
        <Card.Body>
            <Stack gap={2} className={'align-items-center justify-content-center h-100'}>
                <span className={'fs-5'}>{title}</span>
                {tags.length > 0 && (
                    <Stack gap={1} direction={'horizontal'}
                           className={'justify-content-center flex-wrap'}>
                        {tags.map(tag => (
                            <Badge className={'text-truncate'} key={tag.id}>{tag.label}</Badge>
                        ))}
                    </Stack>
                )}
            </Stack>
        </Card.Body>
    </Card>
}

export default NoteList;