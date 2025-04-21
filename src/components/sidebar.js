import React, {  useState } from 'react';
import './Sidebar.css'; // Reverted to regular CSS file
import { useNavigate } from 'react-router-dom';
function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigation = useNavigate();
    const [profileData, setProfileData] = useState();
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const Token = localStorage.getItem('token');
    const handlefetching = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/getuser', {
                method: 'get',
                headers: {
                    'Content-type': 'application/json',
                    'authorization': `bearer ${Token}`
                }
            });

            const result = await res.json();
            console.log('result is : ',result);

            if (res.ok) {
                setProfileData(result);
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        navigation('/home');
    }

    return (
        <>
            {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
           
                <button onClick={toggleSidebar} className={`profile_btn sidebar-toggle ${isOpen ? 'open_nav' : ''}`}>
                    <i onClick={handlefetching} className="fa-solid fa-user"></i>
                </button>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className='sidebar_container'>
                    {profileData && (
                        <nav className='nav_profile'>
                            <ul className='list_nav'>
                                <i className="fa-regular fa-user"></i>
                                <li>{profileData.user.name}</li>
                                <li>{profileData.user.email}</li>
                            </ul>
                        </nav>
                    )}
                    <div className='logout_btn_container'>
                        <h5 onClick={handleLogout} className='logout_btn'><i class="fa-solid fa-arrow-right-from-bracket"></i>Log Out</h5>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
