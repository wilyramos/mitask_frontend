import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h1
        className="font-black text-center text-4xl text-white"
      >
        La página que buscas no está aquí.

      </h1>
      <p className="mt-10 text-center text-white">
        Tal vez quieras volver a {' '}
        <Link
          className="text-sky-500"
          to={'/'}>Proyectos</Link>
      </p>


    </>
  )
}
