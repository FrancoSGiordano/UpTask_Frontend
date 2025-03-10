import { deleteNote } from "@/api/NoteAPI"
import { useAuth } from "@/hooks/useAuth"
import { Note } from "@/types/index"
import { formatDateTime } from "@/utils/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

type NoteDetailProps = {
    note: Note
}

export default function NoteDetail({note}: NoteDetailProps) {
    const {data, isLoading} = useAuth()

    const params = useParams()
    const projectId = params.projectId!

    const canDelete = useMemo(() => note.createdBy._id === data?._id, [data])

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['task', note.task]
            })
            toast.success(data)
        }
    })

    const handleClick = (noteId : Note['_id']) => {
        const data = {
            noteId,
            projectId,
            taskId: note.task
        }
        mutate(data)
    }

    if(isLoading) return 'Cargando...'

    return (
        <div className="p-3 flex justify-between items-center">
            <div>
                <p>
                    {note.content} por: <span className="font-bold">{note.createdBy.name}</span>
                </p>
                <p className="text-xs text-slate-500">
                    {formatDateTime(note.createdAt)}
                </p>
            </div>

            {canDelete && 
                <button
                    type='button'
                    onClick={() => handleClick(note._id)}
                    className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors"
                >
                    Eliminar
                </button>
            }
    
        </div>
  )
}
