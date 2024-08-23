import { Link } from "react-router-dom"
import ProjectForm from "@/components/projects/ProjectForm"
import { useForm } from "react-hook-form"
import { Project, ProjectFormData } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProject } from "@/api/ProjectAPI"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

type EditProjectFormProps = {
    data: ProjectFormData
    projectId: Project['_id']
}

export default function EditProjectForm({data, projectId} : EditProjectFormProps) {

    const navigate = useNavigate()

    const initialValues : ProjectFormData= {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description
    }

    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})

    const queryClient = useQueryClient() // hook to desactive the cache
    const { mutate } = useMutation({
        mutationFn: updateProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['projects']}) // desactive the cache to update the data - new petition to the server
            queryClient.invalidateQueries({queryKey: ['editProject', projectId]})
            
            toast.success(data)
            navigate('/')
        }
    })

    const handleForm = (formData: ProjectFormData) => {
        const data = {
            formData,
            projectId
        }
        mutate(data)
    }

  return (
    <div className="max-w-3xl mx-auto">
            <h1 className="test-5xl font-black text-center">Editar Proyecto</h1>
            <p className="test-2xl font-light text-center text-gray-500">Llena el formulario para editar el proyecto</p>
            
            <nav className="my-5">
                <Link
                    className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                    to='/'
                >Volver a mis proyectos
                </Link>
            </nav>

            <form
                className="mt-10 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={handleSubmit(handleForm)}
                noValidate
            >
                <ProjectForm 
                    register={register}
                    errors={errors}
                />
                <input
                    type="submit"
                    value="Guardar Cambios"
                    className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors"
                >

                </input>
            </form>
            
        </div>
  )
}
