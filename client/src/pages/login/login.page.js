import { Link, useNavigate } from "react-router-dom";
import "./login.css"
function LoginPage() {
  let navigate = useNavigate();

  const onLoginHandler = () => {
    console.log(999);
    navigate('/user-panel');
  }

  return (
    <>

      <div className="login-page">
        <div className="login-wrap">
          <Link to={'/'}>
            <div className="back-text">X</div>
          </Link>
          <div className="login-html">
            <input id="tab-1" type="radio" name="tab" className="sign-in" checked /><label htmlFor="tab-1" className="tab cursor-pointer">Sign In</label>
            <input id="tab-2" type="radio" name="tab" className="sign-up" /><label htmlFor="tab-2" className="tab cursor-pointer">Sign Up</label>
            <div className="login-form">
              <div className="sign-in-htm">
                <div className="group">
                  <label htmlFor="user" className="label">Username</label>
                  <input id="user" type="text" className="input" />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">Password</label>
                  <input id="pass" type="password" className="input" data-type="password" />
                </div>
                <div className="group">
                  <input onClick={() => onLoginHandler()}  type="submit" className="button cursor-pointer" value="Sign In" />
                </div>
                <div className="hr"></div>
                {/* <div className="foot-lnk">
                <a href="#forgot">Forgot Password?</a>
              </div> */}
              </div>
              <div className="sign-up-htm">
                <div className="group">
                  <label htmlFor="user" className="label">Username</label>
                  <input id="user" type="text" className="input" />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">Password</label>
                  <input id="pass" type="password" className="input" data-type="password" />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">Repeat Password</label>
                  <input id="pass" type="password" className="input" data-type="password" />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">Email Address</label>
                  <input id="pass" type="text" className="input" />
                </div>
                <div className="group">
                  <input onClick={() => onLoginHandler()}  type="submit" className="button cursor-pointer" value="Sign Up" />
                </div>
                <div className="hr"></div>
                <div className="foot-lnk">
                  <label htmlFor="tab-1">Already Member?</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );


}

export default LoginPage;

