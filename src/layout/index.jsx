import { useState } from 'react'
import "./style.css"
import Sidebar from './sidebar'
import Topbar from './topbar'

const AppLayout = ({ children }) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className='main-container'>
            <Topbar toggleSidebar={toggleSidebar} />
            <div className='sidebar-content-wrapper'>
                <Sidebar isOpen={isSidebarOpen} />
                <div className='content-container'>
                {children}
                </div>
            </div>
        </div>
    );
};

export default AppLayout;