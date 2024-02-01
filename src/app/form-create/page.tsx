import React from 'react'
import CreateForm from '../components/CreateForm'

function FormCreatePage() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3 py-2 flex items-center justify-center flex-col">
        <h2 className="text-2xl text-black font-bold mb-4">Criar Dispositivo</h2>
        <CreateForm />
      </div>
    </div>
  )
}

export default FormCreatePage