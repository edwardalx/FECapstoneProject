import "../css/login.css";
export function Login() {
  return (
    <>
      <form action="/" className="flex flex-col items-center justify-center gap-4 mt-10">
      <div className="flex flex-col item-center justify-center gap-4 mt-10">
        <div className="flex sm:flex">
          <label htmlFor="name"className="ml-8">Name</label>
          <input type="text" id="name"className="border" required autoComplete="name"/>
        </div>
        <div className="flex sm:flex">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" className="border" autoComplete="current-password" required />
        </div>
      </div>
        
        <button className="bg-[rgba(233,69,151,0.712)] w-[80px] rounded-[25px] hover:bg-[rgba(233,69,151,0.5)] font-bold " >Login</button>
      </form>
    </>
  );
}
