import NewPasswordToken from '@/components/auth/NewPasswordToken'
import NewPasswordForm from '@/components/auth/NewPasswordForm'

import { useState } from 'react'
import { ConfirmToken } from '@/types/index'




export default function NewPasswordView() {

  const [token, setToken] = useState<ConfirmToken['token']>('')

  const [isValidToken, setIsValidToken] = useState(false)

  return (
    <>

      <h1 className="text-5xl font-black text-white">Reestablecer Contraseña</h1>

      <p className='text-2xl font-light text-white mt-5'>
        Ingresa el código de 6 dígitos que te enviamos a {' '}
        <span className="text-sky-500 font-bold">tu correo electrónico</span>
      </p>

      {/*Add a conditional rendering to show the NewPasswordToken component if the token is not valid, otherwise show the NewPasswordForm component */}

      {!isValidToken ?
        <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken} />
        :
        <NewPasswordForm token={token} />
      }

    </>
  )
}
