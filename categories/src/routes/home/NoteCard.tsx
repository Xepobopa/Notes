import {Badge, Card, Stack} from "react-bootstrap";
import {Link} from "react-router-dom";
// @ts-ignore
import styles from "./NoteLists.module.css";
import React from "react";
import {NoteCardProps} from "./types";

export function NoteCard({id, title, tags}: NoteCardProps) {
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