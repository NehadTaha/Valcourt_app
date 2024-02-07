function LoginPage() {


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            
            <div >
            <h1>Se connecter</h1>
            <form onSubmit={()=> {}}>
                <div>
                    <label className='form-label' htmlFor="email">Courriel:</label>
                    <input type="email" id="email" required onChange={()=> {}}/>
                </div>
                <br />
                <label className='form-label' htmlFor="password">Mot de passe:</label>
                <input type="password" id="password" required onChange={()=> {}}/>
                <br />
                <button className="btn btn-primary" type="submit">Se connecter</button>
            </form>
            <br />
            
            </div>

        </div>
    )
}

export default LoginPage