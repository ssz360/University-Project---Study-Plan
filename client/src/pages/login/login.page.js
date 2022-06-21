import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import UserService from "../../services/user.services";
import { checkEmail } from "../../services/valisdations.service";
import "./login.css"
function LoginPage() {
  let navigate = useNavigate();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const onLoginHandler = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error(`Please enter the username or password.`);
      return;
    }
    if (password.length < 5) {
      toast.error(`Password must be more than 4 characters.`);
      return;
    }

    if (!checkEmail(username)) {
      toast.error(`Please enter a correct email as your username.`);
      return;
    }

    const userSrv = new UserService();
    const result = await userSrv.login(username, password);
    if (result) {
      navigate('/user-panel');
    } else {
      toast.error(`Username or password is incorrect!`);
    }
  }

  useEffect(() => {
    // setPassword('testpassword');
    // setUsername('user1@gmail.com');
  })

  return (
    <>

      <div className="login-page">
        <div className="login-wrap">
          <Link to={'/'}>
            <div className="back-text">X</div>
          </Link>
          <div className="login-html">
            <input id="tab-1" type="radio" name="tab" className="sign-in" checked onChange={() => { }} /><label htmlFor="tab-1" className="tab cursor-pointer">Sign In</label>
            <input id="tab-2" type="radio" name="tab" className="sign-up" /><label htmlFor="tab-2" className="tab cursor-pointer">
              {/* <span>Sign Up</span> */}
            </label>
            <div className="login-form">
              <div className="sign-in-htm">
                <div className="group">
                  <label htmlFor="user" className="label">Username</label>
                  <input onChange={(e) => setUsername(e.target.value)} defaultValue={username} id="user" type="text" className="input" />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">Password</label>
                  <input onChange={(e) => setPassword(e.target.value)} defaultValue={password} id="pass" type="password" className="input" data-type="password" />
                </div>
                <div className="group">
                  <input onClick={(e) => onLoginHandler(e)} type="submit" className="button cursor-pointer" value="Sign In" />
                </div>
                <div className="hr"></div>
                {/* <div className="foot-lnk">
                <a href="#forgot">Forgot Password?</a>
              </div> */}
              </div>
              {/* <div className="sign-up-htm">
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
                  <input onClick={() => onLoginHandler()} type="submit" className="button cursor-pointer" value="Sign Up" />
                </div>
                <div className="hr"></div>
                <div className="foot-lnk">
                  <label htmlFor="tab-1">Already Member?</label>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />

    </>
  );


}

export default LoginPage;

