import { Navigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjectById } from "@/api/ProjectAPI"
import EditProjectForm from "@/components/projects/EditProjectForm"
import { useAuth } from "@/hooks/useAuth"
import { isManager } from "@/utils/policies"


export default function EditProjectView() {

    const { data: user, isLoading: authLoading} = useAuth()

    const params = useParams()
    const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => getProjectById(projectId),
        retry: false
      })


    if(isLoading && authLoading) return 'Cargando...'
    if(isError) return <Navigate to='/404'/>
    
    if (data && user) return (
        <>  
            {isManager(data.manager, user._id) ? 
                <EditProjectForm
                    data={data}
                    projectId={projectId}
                />
                :
                <Navigate to='/404'/>
            }
            
        </>
        
        
    )
}
