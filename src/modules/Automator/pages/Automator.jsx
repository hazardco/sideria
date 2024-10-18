import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSwaggerData, setApiServerUrl } from "../../../redux/automatorSlice"

const Automator = () => {

    const [url, setUrl] = useState("http://localhost:5173/openapi-biblioteca.json")

    const dispatch = useDispatch()
    const endPoints = useSelector((state) => state.automator.endPoints)

    const handleChange = (event) => {
        setUrl(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(fetchSwaggerData(url))
    }

    return (
        <>
            <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
                Automator
            </h1>
            <div className="flex flex-col items-center w-full my-6 space-y-4 md:space-x-4 md:space-y-0 md:flex-row">

                <div className="bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden">
                    <div className="px-4 py-8 sm:px-10">
                        <div className="relative mt-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300">
                                </div>
                            </div>
                            <div className="relative flex justify-center text-sm leading-5">
                                <span className="px-2 text-gray-500 bg-white">
                                    Search URL
                                </span>
                            </div>
                        </div>
                        <div className="mt-6">
                            <form onSubmit={handleSubmit}>
                                <div className="w-full space-y-6">
                                    <div className="w-full">
                                        <div className=" relative ">
                                            <input type="text"
                                                id="url"
                                                name="url"
                                                value={url}
                                                onChange={handleChange}
                                                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                placeholder="Swagger" />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="block w-full rounded-md shadow-sm">
                                            <button type="submit" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                                Search
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
            </div>

        </>
    )
}

export default Automator