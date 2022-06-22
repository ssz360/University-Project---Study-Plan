import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import UserService from "../../services/user.services";
import { checkEmail } from "../../services/valisdations.service";
import "./login.css"
function LoginPage() {
  let navigate = useNavigate();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const [name, setName] = useState();
  const [surname, setSurname] = useState();

  const [selectedTab, setSelectedTab] = useState('t1');

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

  const onRegisterHandler = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error(`Please enter the username or password.`);
      return;
    }
    if (password.length < 5) {
      toast.error(`Password must be more than 4 characters.`);
      return;
    }

    if (password !== repeatPassword) {
      toast.error(`The two entered password are not the same.`);
      return;
    }

    if (!checkEmail(username)) {
      toast.error(`Please enter a correct email as your username.`);
      return;
    }

    const userSrv = new UserService();
    let result = await userSrv.register(username, password, name, surname);
    if (!result.result) {
      toast.error(result.message);
      return;
    }
    toast.success(`You are successfully registered and will be logged in seconds!`);
    result = await userSrv.login(username, password);
    if (result) {
      setTimeout(() => {
        navigate('/user-panel');
      }, 4000);
    } else {
      toast.error(`Something went wrong, try again please!`);
    }
  }


  return (
    <>

      <div className="login-page">
        <div className="login-wrap">
          <Link to={'/'}>
            <div className="back-text">X</div>
          </Link>
          <div className="login-html">
            <input id="tab-1" type="radio" name="tab" className="sign-in" checked={selectedTab === 't1'} onChange={() => { setSelectedTab('t1') }} /><label htmlFor="tab-1" className="tab cursor-pointer">Sign In</label>
            <input id="tab-2" type="radio" name="tab" className="sign-up" checked={selectedTab === 't2'} onChange={() => { setSelectedTab('t2') }} /><label htmlFor="tab-2" className="tab cursor-pointer">
              <span>Sign Up</span>
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
              <div className="sign-up-htm">
                <div className="group">
                  <label htmlFor="email" className="label">Email Address</label>
                  <input onChange={(e) => setUsername(e.target.value)} id="email" type="text" className="input" />
                </div>
                <div className="group">
                  <label htmlFor="name" className="label">Name</label>
                  <input onChange={(e) => setName(e.target.value)} id="name" type="text" className="input" />
                </div>
                <div className="group">
                  <label htmlFor="surname" className="label">Surname</label>
                  <input onChange={(e) => setSurname(e.target.value)} id="surname" type="text" className="input" />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">Password</label>
                  <input onChange={(e) => setPassword(e.target.value)} id="pass" type="password" className="input" data-type="password" />
                </div>
                <div className="group">
                  <label htmlFor="rpass" className="label">Repeat Password</label>
                  <input onChange={(e) => setRepeatPassword(e.target.value)} id="rpass" type="password" className="input" data-type="password" />
                </div>
                <div className="group">
                  <input onClick={(e) => onRegisterHandler(e)} type="submit" className="button cursor-pointer" value="Sign Up" />
                </div>
                <div className="hr"></div>
                {/* <div className="foot-lnk">
                  <label htmlFor="tab-1">Already Member?</label>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />

    </>
  );


}

export default LoginPage;

