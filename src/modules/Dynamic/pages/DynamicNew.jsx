import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const DynamicNew = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const endPoints = useSelector((state) => state.automator.endPoints)
    const apiServerUrl = useSelector((state) => state.automator.apiServerUrl)

    const endPoint = endPoints.find(
        (endpoint) =>
            endpoint.method == "POST" &&
            endpoint.url == `/${pathname.split('/')[1]}`
    )

    const [formData, setFormData] = useState({});

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`${apiServerUrl}${endPoint.url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            // Aquí puedes manejar la respuesta del servidor si es necesario
            const responseData = await response.json()
            console.log('Formulario enviado:', responseData)

            // Navegar a la URL deseada después de enviar el formulario
            toast.success("Datos enviados correctamente!!!")
            navigate(endPoint.url)
        } catch (error) {
            console.error('Error al enviar el formulario:', error)
            // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
        }
    };


    console.log(endPoint.schemas[0].properties)
    return (
        <>
            <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
                Dynamic - New
            </h1>
            <div className="bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden">
                <div className="px-4 py-8 sm:px-10">
                    <div className="relative mt-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300">
                            </div>
                        </div>
                        <div className="relative flex justify-center text-sm leading-5">
                            <span className="px-2 text-gray-500 bg-white">
                                Search criteria
                            </span>
                        </div>
                    </div>
                    <div className="mt-6">
                        <form onSubmit={handleSubmit}>
                            <div className="w-full space-y-6">
                                {endPoint && endPoint.schemas[0].properties && Object.entries(endPoint.schemas[0].properties).map(([propertyName, property]) => (
                                    <div key={propertyName} className="w-full">
                                        <div className="relative">
                                            <input
                                                type={property.type == "integer" ? "Number" : property.format == "date" ? "Date" : "Text"}
                                                id={propertyName}
                                                className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                placeholder={propertyName}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <div>
                                    <span className="block w-full rounded-md shadow-sm">
                                        <button type="submit" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                            Send
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="px-4 py-6 border-t-2 border-gray-200 bg-gray-50 sm:px-10">
                    <p className="text-xs leading-5 text-gray-500">
                        This data are display for information and can change
                    </p>
                </div>
            </div>

        </>

    )
}

export default DynamicNew
