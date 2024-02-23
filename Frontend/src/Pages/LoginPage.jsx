import { useState } from "react";

function LoginPage() {

    // Holds the login information
    const [form, setForm] = useState({});

    function handleInputChange(key, newValue) {
        form[key] = newValue;
        setForm(form);
        console.log(form);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginUrl = 'http://localhost:8080/auth/login';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                
            },
            body: JSON.stringify(form)
        }
        const response = await fetch(loginUrl, options);

        console.log('response.status: ', response.status);
        const data = await response.json();
        console.log('data: ', data);
    }
    
    
    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="row">
                <div className="col">
                    <div className="d-flex justify-content-center">
                        <h1>Se connecter</h1>
                    </div>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <div className="row align-items-center mb-3">
                            <label className='form-label col-4' htmlFor="email">Courriel:</label>
                            <input className='col' type="email" id="email" required onChange={(event) => handleInputChange('email', event.target.value)} />
                        </div>
                        <div className="row align-items-center mb-3">
                            <label className='col-4 form-label' htmlFor="password">Mot de passe:</label>
                            <input className="col" type="password" id="password" required onChange={(event) => handleInputChange('password', event.target.value)} />
                        </div>
                        <div className="col d-flex justify-content-center">
                            <button className="btn btn-primary" type="submit">Se connecter</button>
                        </div>
                        <br />
                        <p>Si vous n'avez pas de compte, veuillez <a href="">cliquer ici</a> pour vous inscrire.</p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
