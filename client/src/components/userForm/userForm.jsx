import { useContext, useState } from 'react';
import './userForm.css';
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/authContext';

const UserForm = () => {

    const {loginContext, signInContext} = useContext(AuthContext);
    const {change} = useParams();
    const [changeForm] = useState(change);

    const signIn = (e) => {
        e.preventDefault();
        const data = {
            username: e.target.elements.username.value,
            mail: e.target.elements.mail.value,
            password: e.target.elements.password.value,
            confirmPassword: e.target.elements.confirmPassword.value,
            country: e.target.elements.country.value,
            city: e.target.elements.city.value,
            address: e.target.elements.address.value,
            addressNumber: e.target.elements.addressNumber.value,
            cPostal: e.target.elements.cPostal.value
        }
        signInContext(data);
    }

    const login = (e) => {
        e.preventDefault();
        const data = {
            mail: e.target.elements.mail.value,
            password: e.target.elements.password.value,
        }
        loginContext(data);
    }

    return(
        <>
            <div className='form-container'>
                <div className='backForm'>
                { changeForm == 'signIn' ? 
                    <form className='form' onSubmit={(e) => signIn(e)}>
                        <h3>Sign In</h3>
                        <div className='d-flex justify-content-center justify-content-between'>
                            <div className='w-100 m-3'>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input type="text" className="form-control" placeholder="Nombre" name="username" />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="mail" className="form-control" placeholder="Correo" name="mail" />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" placeholder="Contraseña" name="password" />
                                </div>
                                <div className="form-group">
                                    <label>Confirm password</label>
                                    <input type="password" className="form-control" placeholder="Confirmar contraseña" name="confirmPassword" />
                                </div>
                        
                                <div className="form-group">
                                    <label>Country</label>
                                    <input type="text" className="form-control" placeholder="Pais de residencia" name="country" />
                                </div>
                                <div className="form-group">
                                    <label>City</label>
                                    <input type="text" className="form-control" placeholder="Ciudad" name="city" />
                                </div>
                            </div>
                            <div className='w-100 m-3'>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input type="text" className="form-control" placeholder="Direccion" name="address" />
                                </div>
                                <div className="form-group">
                                    <label>Address Number</label>
                                    <input type="number" className="form-control" placeholder="Numero" name="addressNumber" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Postal Code</label>
                                    <input type="number" className="form-control" placeholder="Codigo postal" name="cPostal" />
                                </div>
                            </div>
                        </div>
                                <div className=' d-flex align-center justify-content-center mt-3'>
                                    <button className='cancel'><a href="/">Cancel</a></button>
                                    <button type="submit" className='sign'>Sign in</button>
                                </div>
                    </form>

                 :

                    <form className='form' onSubmit={(e) => login(e)}>
                         <h3>Get In</h3>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" placeholder="Email" name="mail" />
                        </div>
                        <div className="form-group mb-3">
                            <label>Password</label>
                            <input type="mail" className="form-control" placeholder="Password" name="password" />
                        </div>
                        <div className='d-flex align-center justify-content-center'>
                            <button className='cancel'><a href="/">Cancel</a></button>
                            <button type='submit' className='sign'>Get in</button>
                        </div>
                    </form>
                }
                </div>
            </div>
        </>
    )
}

export default UserForm;