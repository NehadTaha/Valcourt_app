import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { topics, municipalities } from "../constants";

function SignUpPage() {

    const navigate = useNavigate()
    
    const [form, setForm] = useState({});
    const [selectedInterests, setSelectedInterests] = useState([]);

    const interests = topics;
    const municipalityText = 'Choisissez votre municipalité'

    // Updates the form
    function handleInputChange(key, newValue) {
        form[key] = newValue;
        setForm(form);
        console.log(form);
    }

    // Validates password security
    function validatePassword(password) {
        const lengthRegex = /[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]{8}[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]*/;
        const lengthTest = lengthRegex.test(password); // true/false

        const upperRegex = /[A-Z]/
        const upperTest = upperRegex.test(password);

        const lowerRegex = /[a-z]/
        const lowerTest = lowerRegex.test(password);

        const numbersRegex = /\d/
        const numbersTest = numbersRegex.test(password);

        const specialRegex = /[!#$%&'*+\/=?^_`{|}~-]/
        const specialTest = specialRegex.test(password);

        return lengthTest && upperTest && lowerTest && numbersTest && specialTest;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(form.town == null || form.town === municipalityText) {
            alert('Indiquez votre municipalité.')
            return
        }

        if(form.password !== form.confirmPassword) {
            alert('Les mots de passe ne sont pas pareils.');
            return;
        }

        // If the password does not pass the test, end the procedure.
        if(!validatePassword(form.password)) {
            alert("Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial (#$%?&*).")
            return;
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
            <div className="row px-5">
                <div className="col">
                    <div className="d-flex justify-content-center">
                        <img width="250" height="100" src="./V2030 transparence.png" alt="" />
                    </div>
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
                            <label className='form-label col-4' >Municipalité:</label>
                            <select className='col' id="municipalité" onChange={(event) => handleInputChange('town', event.target.value, option => option.value)}>
                                    <option>{municipalityText}</option>
                                {municipalities.map((element, index) => (
                                    <option key={index} value={element}>
                                        {element}
                                    </option>
                                ))}
                            </select>
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
                            <select multiple defaultValue={selectedInterests} onChange={(event) => handleInputChange('topics', Array.from(event.target.selectedOptions, option => option.value))}>
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
