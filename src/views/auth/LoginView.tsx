import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authenticateUser } from "@/api/AuthAPI";


export default function LoginView() {

    const initialValues: UserLoginForm = {
        email: '',
        password: '',
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const navigate = useNavigate()

    const { mutate } = useMutation({
        mutationFn: authenticateUser,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            navigate('/')
        }
    })

    const handleLogin = (formData: UserLoginForm) => mutate(formData)

    return (
        <>
            <p className="text-2xl font-light text-white mt-5">
                Planear proyecto con MiProject {''}
                <span className=" text-blue-600 font-bold"> iniciando sesion en el formulario</span>
            </p>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-6 p-10 bg-white border rounded-xl"
                noValidate
            >
                <div className="flex flex-col gap-5 ">
                    <label
                        className="font-normal text-2xl "
                    >Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full p-3  border-gray-300 border rounded-xl"
                        {...register("email", {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5 ">
                    <label
                        className="font-normal text-2xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full p-3  border-gray-300 border rounded-xl"
                        {...register("password", {
                            required: "El Password es obligatorio",
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Iniciar Sesión'
                    className="bg-sky-600 hover:bg-sky-700 w-full p-3  text-white font-black  text-xl cursor-pointer border rounded-xl"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-5">
                <Link
                    to="/auth/register"
                    className="text-center text-white font-normal"
                >
                    No tienes cuenta? Crear una
                </Link>

                <Link
                    to="/auth/forgot-password"
                    className="text-center text-white font-normal"
                >
                    Olvidaste tu contraseña?
                </Link>
            </nav>

        </>
    )
}