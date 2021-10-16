import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './header.css';
import logo from '../../asset/live.png';

const Header = () => {
    const [isAuth, setIsAuth] = useState(false)
    const history = useHistory();
    const signout = () => {
        sessionStorage.clear();
        history.push('/login');
    }



    useEffect(() => {
        setIsAuth(sessionStorage.getItem('isAuthenticated'))
        // console.log("isAuth", isAuth)
    }, [isAuth])

    return (
        // <div className='header'>
        //     <nav className="navbar navbar-expand-lg navbar-light bg-info text-dark ">
        //         <div className="container-fluid">
        //             <p className="navbar-brand">Live Score Application</p>
        //             <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        //                 <div className="navbar-nav">
        //                     <nav className="navbar navbar-expand-lg navbar-light">
        //                         <div className="container-fluid">
        //                             <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //                                 <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        //                                 <li className="nav-item">
        //                                         <a href="/home" className="readnow-nav" style={{ textDecoration: 'none', color: 'black' }}>Home</a>
        //                                     </li>
        //                                     <li className="nav-item">
        //                                         <a href="/dashboard" style={{ textDecoration: 'none', color: 'black' }}>Dashboard</a>
        //                                     </li>
        //                                     <li className="nav-item" id="favNav">
        //                                         <a href="/favourite" className="readnow-nav" style={{ textDecoration: 'none', color: 'black' }}>Favourite</a>
        //                                     </li>
        //                                 </ul>
        //                             </div>
        //                         </div>
        //                     </nav>
        //                 </div>
        //             </div>
        //         </div>
        //         {
        //             isAuth ? 
        //                     <button className='btn btn-danger sign-out' style={{ float: 'right', width: '100px' }} onClick={signout}>Sign Out</button>
        //                 : ""
        //         }
        //     </nav>
        // </div>
        <div className='header'>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark nav-view">
                <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand" href="/"><img src={logo} alt="cricket" width="150px" height="70px" /></a>

                <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li class="nav-item active homeNav">
                            <a href="/" className="readnow-nav" style={{ textDecoration: 'none', color: 'whitesmoke' }}>Home</a>
                        </li>
                        <li class="nav-item dashboardNav">
                            <a href="/dashboard" style={{ textDecoration: 'none', color: 'whitesmoke' }}>Dashboard</a>
                        </li>
                        <li class="nav-item" id="favNav">
                            <a href="/favourites" className="readnow-nav" style={{ textDecoration: 'none', color: 'whitesmoke' }}>Favourite</a>
                        </li>
                        {
                            isAuth  ? "" 
                            :
                       
                        <li class="nav-item loginNav" >
                            <a href="/login" className="readnow-nav" style={{ textDecoration: 'none', color: 'whitesmoke' }}>Login</a>
                        </li>
                         }
                    </ul>

                </div>

                {
                    isAuth ?
                        <button className='btn btn-danger sign-out' style={{ float: 'right', width: '100px' }} onClick={signout}>Sign Out</button>
                        : ""
                }
            </nav>
        </div>
    );
};

export default Header;