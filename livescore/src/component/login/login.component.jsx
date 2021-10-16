import React, { useState } from 'react';
import './login.style.css';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer.component';
import ShowAlert from '../alert/showalert.component';

const Login = props => {

    const loginUrl = `http://localhost:8082/api/v1/user/login`
    const [userId,setUserId] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
    const [errorText, setErrorText] = useState('');
    const [alert,setAlert] = useState({
        show:false,
        variant:'',
        heading:'',
        message:''
    });
    const handleLogin = e =>{
        e.preventDefault();
        if(password.length > 0)
        {
            // setIsPasswordCorrect(true);
            axios.post(loginUrl,{
              userId,
              password
            },{
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(res=>{
                setIsPasswordCorrect(true);
                // console.log("user respones",res)
                sessionStorage.setItem('userId', res.data[0]);
                sessionStorage.setItem('token', res.data[1]);
                sessionStorage.setItem('isAuthenticated','true')
                res.data[0] === userId ? history.push('/') : history.push('/login');
            })
                .catch(e=>{
                    // console.log(e);
                    // setErrorText(e?.response.data);
                    setIsPasswordCorrect(false)
                    setAlert({
                        ...alert,
                        show:true,
                        variant:'danger',
                        heading:'Error',
                        message:'Username doesnt exist / password wrong'
                    })
                    
                })
        }
        else{
            // setErrorText("Password mismatch");

            setIsPasswordCorrect(false);
            setAlert({
                ...alert,
                show:true,
                variant:'danger',
                heading:'Error',
                message:'Password wrong'
            })
        }
    }

    const errorAlert = (
            <div class="alert alert-danger" role="alert">
                <span>{errorText}</span>
            </div>
    )

    const closeAlert=()=>{
        setAlert({
            ...alert,
            show:false,
            variant:'',
            heading:'',
            message:''
        });
    }

    return (
        <div>
            <Header />
       
        <div className="main-login">
            
            <div className="wrapper-login">
                {
                    isPasswordCorrect? ""  
                    : 
                    <ShowAlert 
                        show={alert.show}
                        variant={alert.variant}
                        heading={alert.heading}
                        message={alert.message}
                        closeAlert={closeAlert}
                    />
                }
                <div className="title">Login Form</div>
                <form onSubmit={e=>handleLogin(e)}>
                    <div className="field">
                        <input id='username' type="text" required onChange={e=>setUserId(e.target.value)}/>
                        <label>User Id</label>
                    </div>
                    <div className="field">
                        <input id='password' type="password" required onChange={e=>setPassword(e.target.value)} />
                        <label>Password</label>
                    </div>

                    {/* <div className="content">
                        <div className="checkbox">
                            <input type="checkbox" id="remember-me" />
                            <label for="remember-me">Remember me</label>
                        </div>
                        <div className="pass-link"><a href="#">Forgot password?</a></div>
                    </div> */}
                    <div className="field">
                        <input id='loginbtn' type="submit" value="Login" />
                    </div>
                    <div className="signup-link">Not a member? <Link to='/register'>Signup now</Link></div>
                </form>
            </div>
           
        </div>
        <Footer />
        </div>
    )
}

export default Login;