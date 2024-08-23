import { Link, Outlet, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '@/components/Logo'
import NavMenu from '@/components/NavMenu'
import { useAuth } from '@/hooks/useAuth'
import { useQueryClient } from '@tanstack/react-query'


export default function AppLayout() {

    // para cerrar sesion

    const queryClient = useQueryClient()
    const logout = () => {
      localStorage.removeItem('AUTH_TOKEN')
      queryClient.invalidateQueries({queryKey: ['user']})
    }

    const { data, isError, isLoading } = useAuth()
    if(isLoading) return 'Cargando...'
    if(isError) return <Navigate to='/auth/login' />

    if(data) return (
        <>
            <header className='bg-sky-500 py-1 px-10'>
                <div className='max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
                    <div className='w-32'>
                        <Link to={'/'}>
                            <Logo />
                        </Link>
                    </div>
                    <div className='block lg:hidden'>
                    <NavMenu
                         
                         name={data.name}
                     />

                    </div>


                    <nav className='hidden lg:flex gap-4'>
                        <Link
                            to='/profile'
                            className='text-white font-semibold hover:text-gray-200'
                        >Perfil</Link>

                        <Link
                            to='/'
                            className='text-white font-semibold hover:text-gray-200'
                        >Mis Proyectos</Link>
                        
                        <Link
                            to={'/'}
                            onClick={logout}
                            className='text-white font-semibold hover:text-gray-200'
                        >Cerrar Sesión</Link>

                    </nav>
                </div>
            </header>

            <section className='max-w-screen-2xl mx-auto mt-2 p-6'>
                <Outlet />
            </section>

            <footer className='py-5'>
                <p className='text-center text-gray-500 text-sm py-4 border-t border-gray-200'>
                © {new Date().getFullYear()} MiProject. Todos los derechos reservados.
                </p>
            </footer>

            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}
