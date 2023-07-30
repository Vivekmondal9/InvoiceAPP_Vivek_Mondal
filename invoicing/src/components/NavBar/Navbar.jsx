import { useEffect } from 'react'
import './Navbar.css'
import { json, useNavigate } from 'react-router-dom'

export default function Navbar() {


  const navigate = useNavigate()

  function login() {
    navigate("/login")

  }

  function register() {
    navigate("/register")
  }

  let logindetails
  logindetails = localStorage.getItem("access_token");
  

// useEffect(()=>{
//   setTimeout(()=>{
//     localStorage.removeItem("token")
//     window.location.reload()
//   },10000)
// },logindetails)



  function logout() {
    localStorage.removeItem("access_token");
    navigate("/login")
    window.location.reload()


  }


  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Invoice App
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {logindetails &&
                <a className="nav-link active" aria-current="page" href="/">
                  Invoices
                </a>
              }
              {!logindetails &&
                <a className="nav-link in-active" aria-current="page" href="/login">
                  Invoices
                </a>
              }

            </li>
            <li className="nav-item">
              {logindetails &&
                <a className="nav-link" href="/newInvoice">
                  New Invoice
                </a>
              }
              {!logindetails &&
                <a className="nav-link" href="/login">
                  New Invoice
                </a>
              }
            </li>
          </ul>
        </div>
      </div>
      <div className='registration-sec'>
        {!logindetails &&
          (
            <><button type="button" class="btn btn-primary" onClick={login}>Login</button>
              <button type="button" class="btn btn-info" onClick={register}>Register</button></>
          )}
        {logindetails &&

          (<>
            <button type="button" class="btn btn-primary" onClick={logout}>Logout</button>
          </>)}

      </div>
    </nav>
  )
}
