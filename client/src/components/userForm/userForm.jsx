import { useContext, useState } from 'react';
import './userForm.css';
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/authContext';

const UserForm = () => {

    const {login, signIn} = useContext(AuthContext);
    const {change} = useParams();
    const [changeForm] = useState(change);

    return(
        <>
            <div className='form-container'>
                <div className='backForm'>
                { changeForm == 'signIn' ? 
                    <form className='form' onSubmit={() => signIn()}>
                        <h3>Sign In</h3>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" placeholder="Nombre" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="mail" className="form-control" placeholder="Correo" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Contraseña" />
                        </div>
                        <div className="form-group">
                            <label>Confirm password</label>
                            <input type="password" className="form-control" placeholder="Confirmar contraseña" />
                        </div>
                        <div className="form-group">
                            <label>Country</label>
                            <input type="text" className="form-control" placeholder="Pais de residencia" />
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input type="text" className="form-control" placeholder="Ciudad" />
                        </div>
                        <div className='form-group-address'>
                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" className="form-control" placeholder="Direccion" />
                            </div>
                            <div className="form-group">
                                <label>Address Number</label>
                                <input type="number" className="form-control" placeholder="Numero" />
                            </div>
                            <div className="form-group mb-3">
                                <label>Postal Code</label>
                                <input type="number" className="form-control" placeholder="Codigo postal" />
                            </div>
                            <div className=' d-flex align-center justify-content-center'>
                                <button className='cancel'><a href="/">Cancel</a></button>
                                <button type="submit" className='sign'>Sign in</button>
                            </div>
                        </div>
                    </form>

                 :

                    <form className='form'>
                         <h3>Get In</h3>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" placeholder="Email" />
                        </div>
                        <div className="form-group mb-3">
                            <label>Password</label>
                            <input type="mail" className="form-control" placeholder="Password" />
                        </div>
                        <div className='d-flex align-center justify-content-center'>
                            <button className='cancel'><a href="/">Cancel</a></button>
                            <button onClick={() => login()} className='sign'>Get in</button>
                        </div>
                    </form>
                }
                </div>
            </div>
        </>
    )
}

export default UserForm;