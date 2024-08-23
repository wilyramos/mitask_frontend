import { Link, useNavigate} from "react-router-dom"
import {useForm} from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import ProjectForm from "@/components/projects/ProjectForm"
import { ProjectFormData } from "@/types/index"
import { createProject } from "@/api/ProjectAPI"

export default function CreateProjectView() {

    const navigate = useNavigate()

    const initialValues : ProjectFormData= {
        "projectName": "",
        "clientName": "",
        "description": ""
    }
    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})

    const {mutate} = useMutation({
        mutationFn: createProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            navigate('/')
        }
    })

    const handleForm = (formData : ProjectFormData) => mutate(formData)
    
  return (

    <>
        <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-black text-center">Crear Proyecto</h1>
            <p className="text-2xl font-light text-center text-gray-500">Llena el formulario para crear el proyecto</p>
            
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
                    value="Crear Proyecto"
                    className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors"

                >
                </input>
            </form>
            
        </div>

    </>
  )
}
