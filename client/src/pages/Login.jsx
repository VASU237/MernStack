import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../Store/Auth";
export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const naviGate=useNavigate();
  const {storeTokenInLS} = useAuth(); 

  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // handle form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch(`http://localhost:3000/api/auth/login` , {
      method : "POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify(user),
    })

    console.log("Responec of Login page" , response);

    if (response.ok) {
      const responceData = await response.json();
      alert("login Successfully");
      storeTokenInLS(responceData.token);
      setUser({
      email: "",
      password: "",});
      naviGate("/");

    }else{
      alert("wrong pAssword");
      console.log("error inside Response");
    }
    } catch (error) {
      console.log(error)
    }
  };



  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/register.png"
                  alt="a nurse with a cute look"
                  width="400"
                  height="500"
                />
              </div>
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
  