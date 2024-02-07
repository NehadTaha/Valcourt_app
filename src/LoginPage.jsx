function LoginPage() {


    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

            <div className="row">
                <div className="col">
                    <div className="d-flex justify-content-center">
                        <h1>Se connecter</h1>
                    </div>
                    <br />
                    <form onSubmit={()=> {}}>
                        <div className="row">
                            <label className='form-label col' htmlFor="email">Courriel:</label>
                            <input className='col' type="email" id="email" required onChange={()=> {}}/>
                        </div>
                        <br />
                        <div className="row">
                            <label className='col form-label' htmlFor="password">Mot de passe:</label>
                            <input className="col" type="password" id="password" required onChange={()=> {}}/>
                        </div>
                        <br />
                        <div className="col d-flex justify-content-center">
                            <button className="btn btn-primary" type="submit">Se connecter</button>
                        </div>
                        <br />
                        <p>Si vous n'avez pas de compte, veuillez <a href="">cliquer ici</a> pour vous inscrire</p>
                    </form>
                </div>
                
            </div>

        </div>
    )
}

export default LoginPage