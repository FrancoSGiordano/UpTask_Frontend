import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Project, TeamMember, TeamMemberForm, teamMemberSchema, teamMembersSchema } from "../types";

type TeamAPI = {
    formData : TeamMemberForm,
    projectId : Project['_id'],
    id : TeamMember['_id']
}

export async function findUserByEmail({formData, projectId} : Pick<TeamAPI, 'formData' | 'projectId'>){
    try {
        const url = `/projects/${projectId}/team/find`
        const { data } = await api.post(url, formData)
        const response = teamMemberSchema.safeParse(data)
        if(response.success){
            return response.data
        }  
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error (error.response.data.error)
        }
    }
}

export async function addUserToProject({projectId, id} : Pick<TeamAPI, 'id' | 'projectId'>){
    try {
        const url = `/projects/${projectId}/team`
        const { data } = await api.post<string>(url, {id})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error (error.response.data.error)
        }
    }
}

export async function getProjectTeam(projectId : Project['_id']){
    try {
        const url = `/projects/${projectId}/team`
        const { data } = await api.get(url)
        const response = teamMembersSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error (error.response.data.error)
        }
    }
}

export async function removeUserFromProject({projectId, id} : Pick<TeamAPI, 'id' | 'projectId'>){
    try {
        const url = `/projects/${projectId}/team/${id}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error (error.response.data.error)
        }
    }
}

