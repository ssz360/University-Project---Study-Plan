import { Link, useNavigate } from "react-router-dom";
import UserService from "../../services/user.services";

const userSrv = new UserService();
function Navbar() {
  const navigation = useNavigate();
  const user = userSrv.getUserData();

  function onLogout() {
    const result = userSrv.logout();
    if (result) {
      navigation('/');
    }
  }

  return (
    <>
      <nav className="bg-gray-800">
        <div className="max-w-full mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
              </button>
            </div>
            <Link to={userSrv.isUserLoggedIn() ? '/user-panel' : '/'}>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img className="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
                  <img className="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow" />
                </div>
              </div>
            </Link>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {
                userSrv.isUserLoggedIn() ?
                  <>
                    <div className="ml-3 relative">
                      <div className="text-white">
                        <span>Hello {user.name + ' ' + user.surname}</span>
                        <button onClick={onLogout} className="bg-gray-600 ml-5 px-2 py-1 rounded-md text-white font-semibold tracking-wide cursor-pointer">Log out</button>
                      </div>
                    </div>

                  </>
                  :
                  <>
                    <Link to={'/login'}>
                      <button className="bg-green-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Login / Register</button>
                    </Link>
                  </>
              }
            </div>
          </div>
        </div>
      </nav>
    </>);
}

export default Navbar;
