import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserPanelPage from './pages/userPanel/userPanel.page';
import MainPage from './pages/mainPage/main.page';
import LoginPage from './pages/login/login.page';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/login"
          element={<LoginPage></LoginPage>}>
        </Route>
        <Route path="/user-panel"
          element={<UserPanelPage></UserPanelPage>}>
        </Route>
        <Route path="/" element={<MainPage></MainPage>}>
        </Route>
      </Routes>
    </Router>
  );


}

export default App;
