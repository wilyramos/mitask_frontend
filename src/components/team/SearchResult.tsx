import { TeamMember } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addUserToProject } from "@/api/TeamAPI"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

type SearchResultProps = {
    user: TeamMember,
    reset: () => void
}

export default function SearchResult({user, reset} : SearchResultProps) {
    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            navigate(location.pathname, { replace: true }) // replace the current URL
            queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]})
        }
    })

    const handleAddUserToProject = async () => {
        const data = {
            projectId, 
            id: user._id
        }
        mutate(data)
    }

  return (
    <>
        <p className="mt-10 text-center font-bold px-5">Resultado: </p>
        <div className="flex justify-between items-center">
            <p>{user.name}</p>
            <button
                className="text-indigo-500 hover:bg-blue-200 px-8 py-3 font-bold cursor-pointer rounded-lg"
                onClick={handleAddUserToProject}

            >
                Agregar al proyecto
            </button>
        </div>
    </>

    )
}
