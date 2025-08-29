import '../css/login.css'
export function Login(){
    return(
        <>
        <form action="/">
        <div className="name-input">
        <label htmlFor="name">Name</label>
        <input type="text" id='name' required/>
        </div>
         <div className="password-input">
        <label htmlFor="password">Password</label>
        <input type="password" id='password' required/>
        </div>
        <button  className='login-btn'>Login</button>
        </form>
        </>
    )
}