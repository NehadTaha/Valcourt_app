import { wait } from "@testing-library/user-event/dist/utils";
import { useState } from "react";

function SignUpPage() {
    
    const [selectedInterests, setSelectedInterests] = useState([]);

    const interests = ['Art', 'Cooking', 'Cultural', 'French'];

    // Updates the selectedInterests whenever the interests change.
    const handleInterestChange = (e) => {
        const interest = Array.from(e.target.selectedOptions, option => option.value);
        
        setSelectedInterests(interest);

        console.log(interest);
        console.log(selectedInterests);
    };



    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="row">
                <div className="col">
                    <div className="d-flex justify-content-center">
                        <h1>S'incrire</h1>
                    </div>
                    <br />
                    <form onSubmit={() => { }}>
                        <div className="row align-items-center mb-3">
                            <label className='form-label col-4' >Nom:</label>
                            <input className='col' type="text" id="nom" required onChange={() => { }} />
                        </div>
                        <div className="row align-items-center mb-3">
                            <label className='form-label col-4' >Prénom:</label>
                            <input className='col' type="text" id="prénom" required onChange={() => { }} />
                        </div>
                        <div className="row align-items-center mb-3">
                            <label className='form-label col-4' htmlFor="email">Courriel:</label>
                            <input className='col' type="email" id="email" required onChange={() => { }} />
                        </div>
                        <div className="row align-items-center mb-3">
                            <label className='col-4 form-label' htmlFor="password">Mot de passe:</label>
                            <input className="col" type="password" id="password" required onChange={() => { }} />
                        </div>

                        <div className="row align-items-center mb-3">
                            <label className='form-label col-4' htmlFor="listbox">Intérets:</label>
                            <select multiple defaultValue={selectedInterests} onChange={handleInterestChange}>
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
                        <p>Si vous n'avez pas de compte, veuillez <a href="">cliquer ici</a> pour vous inscrire.</p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage
