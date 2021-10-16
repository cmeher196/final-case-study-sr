import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ShowAlert from '../alert/showalert.component';
import Footer from '../footer/footer.component';
import Header from '../header/header';
import './register.style.css';
function Register(props) {

    // const [username,setUsername] = useState('');
    // const [firstname,setFisrtname] = useState('');
    // const [lastname,setLastname] = useState('');
    // const [email,setEmail] = useState('');
    // const [password,setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [registerData, setRegisterData] = useState({
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    // const [errorText, setErrorText] = useState("");
    const [isUserExists, setIsUserExists] = useState(false);
    const history = useHistory();
    const registerURL = `http://localhost:8082/api/v1/user/register`

    const [alert, setAlert] = useState({
        show: false,
        variant: '',
        heading: '',
        message: ''
    });

    const handleSignUp = e => {

        e.preventDefault();

        if (validateForm()) {
            if (registerData.password === confirmPassword) {
                // console.log('registerData', registerData)
                setIsUserExists(false);
                axios.post(registerURL, registerData)
                    .then(res => {
                        // console.log('res', res);
                        history.push('/login');
                    }).catch(err => {
                        setIsUserExists(true);
                        setAlert({
                            ...alert,
                            show: true,
                            variant: 'danger',
                            heading: 'Error',
                            message: 'Username already exist'
                        });
                        // console.log(err?.response?.data);
                        // //  alert(err)
                        // setErrorText(err?.response?.data);
                    });
            }
            else {
                setIsUserExists(true);
                // alert('mismatch password')
                setAlert({
                    ...alert,
                    show:true,
                    variant:'danger',
                    heading:'Error',
                    message:'Password Mismatch'
                })
                // setErrorText('Mismatch password')
            }
        }
        // else{

        //     alert('form not validated!!');
        // }
        // else{
        //     alert('password mismatch!!')
        // }
    }


    const validateForm = () => {
        // console.log("on blur");
        // let fields = registerData;
        const { userId, firstName, lastName, email, password } = registerData;
        // console.log('userId', registerData.firstName);

        let errors = {};
        let formIsValid = true;

        if (!firstName) {
            formIsValid = false;
            errors["firstname"] = "*Please enter your username.";
        }

        if (typeof firstName !== undefined) {
            // console.log("type of firstname", typeof registerData.firstName);
            if (!firstName.match(/^[a-zA-Z]*$/)) {
                formIsValid = false;
                errors["firstName"] = "*Please enter alphabet characters only.";
                // console.log(errors);
            }
        }

        if (!lastName) {
            formIsValid = false;
            errors["firstname"] = "*Please enter your username.";
        }

        if (typeof lastName !== undefined) {
            // console.log("type of firstname", typeof registerData.firstName);
            if (!lastName.match(/^[a-zA-Z]*$/)) {
                formIsValid = false;
                errors["lastName"] = "*Please enter alphabet characters only.";
                // console.log(errors);
            }
        }

        if (!userId) {
            formIsValid = false;
            errors["userId"] = "*Please enter your username.";
        }

        if (typeof userId !== "undefined") {
            if (!userId.match(/^[a-zA-Z0-9]*$/)) {
                formIsValid = false;
                errors["username"] = "*Please enter alphabet characters only and numbers.";
            }
        }

        if (!email) {
            formIsValid = false;
            errors["emailid"] = "*Please enter your email-ID.";
        }

        if (typeof email !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(email)) {
                formIsValid = false;
                errors["emailId"] = "*Please enter valid email-ID.";
            }
        }

        if (!password) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }

        if (typeof password !== "undefined") {
            if (!password.match(/^((?!.*[\s])(?=.*\d).{6,15})/)) {
                formIsValid = false;
                errors["password"] = "*Please enter one lower and numeric char min 6 length password.";
            }
        }

        setErrors(errors)
        return formIsValid;
    }

    const closeAlert = () => {
        setAlert({
            ...alert,
            show: false,
            variant: '',
            heading: '',
            message: ''
        });
    }

    return (
        <div>
            <Header />

            <div className="main">
                <div className="container">
                    {
                        isUserExists ?
                            <ShowAlert
                                show={alert.show}
                                variant={alert.variant}
                                heading={alert.heading}
                                message={alert.message}
                                closeAlert={closeAlert}
                            />
                            :
                            ""
                    }
                    <div className="title">Registration</div>
                    <div className="content">
                        <form onSubmit={e => handleSignUp(e)}>
                            <div className="user-details">
                                <div className="input-box">
                                    <span className="details">First Name</span>
                                    <input id='fname' type="text" placeholder="Enter your firstname" required onChange={e => setRegisterData({ ...registerData, firstName: e.target.value })} />
                                    <div className="errorMsg">{errors.firstName}</div>
                                </div>


                                <div className="input-box">
                                    <span className="details">Last Name</span>
                                    <input id='lname' type="text" placeholder="Enter your lastname" required onChange={e => setRegisterData({ ...registerData, lastName: e.target.value })} />
                                    <div className="errorMsg">{errors.lastName}</div>
                                </div>
                                <div className="input-box">
                                    <span className="details">Email</span>
                                    <input id='email' type="email" placeholder="Enter your email" required onChange={e => setRegisterData({ ...registerData, email: e.target.value })} />
                                    <div className="errorMsg">{errors.emailId}</div>
                                </div>
                                {/* <div className="input-box">
                                <span className="details">Phone Number</span>
                                <input type="text" placeholder="Enter your number" required />
                            </div> */}
                                <div className="input-box">
                                    <span className="details">Username</span>
                                    <input id='userId'
                                        type="text"
                                        placeholder="Enter your username"
                                        required
                                        // onBlur={validateForm}
                                        onChange={e => setRegisterData({ ...registerData, userId: e.target.value })} />
                                    <div className="errorMsg">{errors.username}</div>
                                </div>
                                <div className="input-box">
                                    <span className="details">Password</span>
                                    <input id='pass' type="password" placeholder="Enter your password" required onChange={e => setRegisterData({ ...registerData, password: e.target.value })} />
                                    <div className="errorMsg">{errors.password}</div>
                                </div>
                                <div className="input-box">
                                    <span className="details">Confirm Password</span>
                                    <input id='cpass' type="password" placeholder="Confirm your password" required onChange={e => setConfirmPassword(e.target.value)} />
                                </div>
                            </div>

                            <div className="signup-link">Already a member? <Link to='/login'>Login now</Link></div>

                            <div className="button">
                                <input
                                    // disabled= {validateForm ? false : true}
                                    id='registerBtn'
                                    type="submit"
                                    value="Register" />
                            </div>
                        </form>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default Register;