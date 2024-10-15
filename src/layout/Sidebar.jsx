import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { FaCat, FaChair, FaChampagneGlasses, FaChessRook } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";


const Sidebar = () => {

    const [menuItems, setMenuItems] = useState(
        [
            {
                path: "/",
                name: "Automator",
                icon: FaHome
            },

        ]
    )

    const getRandomIcon = () => {
        const icons = [FaCat, FaChair, FaChampagneGlasses, FaChessRook];
        const randomIndex = Math.floor(Math.random() * icons.length);
        return icons[randomIndex];
    }

    const endPoints = useSelector((state) => state.automator.endPoints)

    useEffect(() => {
        const newMenuItems = endPoints
            .filter(endpoint => endpoint.method === "GET" && endpoint.url.split("/").length === 2)
            .map(endpoint => ({
                path: endpoint.url,
                name: endpoint.url.split("/")[1], // Use el segundo segmento de la URL como nombre
                icon: getRandomIcon()
            }))

        setMenuItems(prevItems => [
            ...prevItems, // Mantenemos los elementos existentes en el menú
            ...newMenuItems // Agregamos los nuevos elementos del menú basados en los endpoints filtrados
        ]);
    }, [endPoints]);


    return (
        <div className="relative hidden h-screen shadow-lg lg:block w-80">
            <div className="h-full bg-white dark:bg-gray-700">
                <div className="flex items-center justify-start pt-6 ml-8">
                    <p className="text-xl font-bold dark:text-white">
                        Sider ai
                    </p>
                </div>
                <nav className="mt-6">
                    <div>
                        {
                            menuItems.map((item) => (
                                <Link
                                    key={item.name}
                                    className="flex items-center justify-start w-full p-2 pl-6 my-2 text-gray-800 transition-colors duration-200 border-l-4 border-purple-500 dark:text-white"
                                    to={item.path}>
                                    <span className="text-left">
                                        {React.createElement(item.icon)}
                                    </span>
                                    <span className="mx-2 text-sm font-normal">
                                        {item.name}
                                    </span>
                                </Link>
                            ))
                        }
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar
