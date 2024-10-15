import React from 'react'
import Header from './layout/Header'
import Sidebar from './layout/Sidebar'
import Content from './layout/Content'

const Sideraia = () => {
    return (

        <main className="relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800">
            <div className="flex items-start justify-between">
                <Sidebar />
                <div className="flex flex-col w-full md:space-y-4">
                    <Header />
                    <Content />
                </div>
            </div>
        </main>

    )
}

export default Sideraia
