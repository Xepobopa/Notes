import React from 'react';
import {Navigate, Outlet, useOutletContext, useParams} from "react-router-dom";

const NoteLayout = () => {
    const { id } = useParams();
    console.log(id);

     if (!id) return <Navigate to={'/'} replace />

     return <Outlet context={id} />
};

export function useNote() {
    return useOutletContext<string>();
}

export default NoteLayout;