import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { topics } from "../constants";

function SignUpPage() {

    const navigate = useNavigate()
    
    const [form, setForm] = useState({});
    const [selectedInterests, setSelectedInterests] = useState([]);

    const interests = topics;

    // Updates the form
    function handleInputChange(key, newValue) {
        form[key] = newValue;
        setForm(form);
        console.log(form);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            console.log('Les mots de passe ne sont pas pareils.');
        }


        const registerUrl = 'http://localhost:8080/auth/register';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                
            },
            body: JSON.stringify(form)
        }
        const response = await fetch(registerUrl, options);

        console.log('response.status: ', response.status);
        const data = await response.json();
        console.log('data: ', data);
    }

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="row">
                <div className="col">
                    <div className="d-flex justify-content-center">
                        <h1>S'inscrire</h1>
                    </div>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <div className="row align-items-center mb-3">
                            <label className='form-label col-4' >Prénom:</label>
                            <input className='col' type="text" id="prénom" required onChange={(event) => handleInputChange('firstName', event.target.value)} />
                        </div>
                        <div className="row align-items-center mb-3">
                            <label className='form-label col-4' >Nom:</label>
                            <input className='col' type="text" id="nom" required onChange={(event) => handleInputChange('lastName', event.target.value)} />
                        </div>
                        <div className="row align-items-center mb-3">
                            <label className='form-label col-4' >Ville:</label>
                            <input className='col' type="text" id="ville" onChange={(event) => handleInputChange('town', event.target.value)} />
                        </div>
                        <div className="row align-items-center mb-3">
                            <label className='form-label col-4' htmlFor="email">Courriel:</label>
                            <input className='col' type="email" id="email" required onChange={(event) => handleInputChange('email', event.target.value)} />
                        </div>
                        <div className="row align-items-center mb-3">
                            <label className='col-4 form-label' htmlFor="password">Mot de passe:</label>
                            <input className="col" type="password" id="password" required onChange={(event) => handleInputChange('password', event.target.value)} />
                        </div>
                        <div className="row align-items-center mb-3">
                            <label className='col-4 form-label' htmlFor="password">Confirmez votre mot de passe:</label>
                            <input className="col" type="password" id="password" required onChange={(event) => handleInputChange('confirmPassword', event.target.value)} />
                        </div>

                        <div className="row align-items-center mb-3">
                            <label className='form-label col-4' htmlFor="listbox">Intérets:</label>
                            <select multiple defaultValue={selectedInterests} onChange={(event) => handleInputChange(handleInputChange('topics', Array.from(event.target.selectedOptions, option => option.value)))}>
                                {interests.map((interest, index) => (
                                    <option key={index} value={interest}>
                                        {interest}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="col d-flex justify-content-center">
                            <button className="btn btn-primary" type="submit">S'inscrire</button>
                        </div>
                        <br />
                        <p>Vous avez déjà un compte? Veuillez <a href="" onClick={()=>{navigate('/login')}}>cliquer ici</a> pour vous connecter.</p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage
