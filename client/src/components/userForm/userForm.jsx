import './userForm.css';

const UserForm = () => {
    return(
        <>
            <div className='form-container'>
                <form className='form'>
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
                        <input type="password" className="form-control" placeholder="<PASSWORD>" />
                    </div>
                    <div className="form-group">
                        <label>Confirm password</label>
                        <input type="password" className="form-control" placeholder="<PASSWORD>" />
                    </div>
                    <div className="form-group">
                        <label>Country</label>
                        <input type="text" className="form-control" placeholder="Nombre" />
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input type="text" className="form-control" placeholder="Correo" />
                    </div>
                    <div className='form-group-address'>
                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" className="form-control" placeholder="<PASSWORD>" />
                        </div>
                        <div className="form-group">
                            <label>Address Number</label>
                            <input type="number" className="form-control" placeholder="<PASSWORD>" />
                        </div>
                        <div className="form-group">
                            <label>Postal Code</label>
                            <input type="number" className="form-control" placeholder="<PASSWORD>" />
                        </div>
                    </div>
                </form>


                <form className='form'>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="mail" className="form-control" placeholder="Password" />
                    </div>
                </form>
            </div>
        </>
    )
}

export default UserForm;