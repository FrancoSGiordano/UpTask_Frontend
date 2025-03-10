import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Note, NoteFormData, Project, Task } from "../types";

type NoteAPI = {
    projectId : Project['_id']
    taskId: Task['_id']
    formData: NoteFormData,
    noteId: Note['_id']
}

export async function createNote({projectId, taskId, formData} : Pick<NoteAPI, 'formData' | 'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteNote({projectId, taskId, noteId} : Pick<NoteAPI, 'taskId' | 'projectId' | 'noteId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

