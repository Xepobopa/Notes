import {Note} from "../types";


export interface Notes {
    notes: Note[];
    isLoading: boolean;
    error: string;
    fetchedNote: Note | undefined;
}