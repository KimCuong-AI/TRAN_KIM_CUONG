import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Redirect, Route, Router, Switch } from 'react-router-dom';
//thư viện giúp chuyển hướng trang
import { createBrowserHistory } from 'history'
import HomeContent from './pages/Home/HomContent/HomeContent';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Detail from './pages/Detail/Detail';
import Hometemplate from './templates/HomeTemplates/Homtemplate';
import UserTemplate from './templates/UserTemplates/UserTemplate';
import RouteNotFound from './pages/PageNotFound/RouteNotFound';
import { AdminTemplate } from './templates/AdminTemplates/AdminTemplate';
import NguoiDung from './pages/AdminPage/QuanLyNguoiDung/NguoiDung';
import AddNew from './pages/AdminPage/QuanLyFilm/AddNew/AddNew';
import Edit from './pages/AdminPage/QuanLyFilm/Edit/Edit';
import ShowTime from './pages/AdminPage/QuanLyFilm/ShowTime/ShowTime';
import Checkout from './pages/Checkout/Checkout';
import Films from './pages/AdminPage/QuanLyFilm/Films';
import SearchFilm from './pages/SearchFilm/SearchFilm';
import KetQuaTimKiem from './pages/AdminPage/QuanLyNguoiDung/KetQuaTimKiem/KetQuaTimKiem';
import Profile from './pages/Profile/Profile';
import ScrollTransition from './components/ScrollTransition/ScrollTransition';
export const history = createBrowserHistory();
function App() {
  return (
    <Router history={history} >
      <ScrollTransition/>
      <Switch>
        <AdminTemplate exact path='/admin/films' component={Films} />
        <AdminTemplate exact path='/admin/users' component={NguoiDung} />
        <AdminTemplate exact path='/admin/users/search/:id' component={KetQuaTimKiem} />
        <AdminTemplate exact path='/admin/films/addnew' component={AddNew} />
        <AdminTemplate exact path='/admin/films/edit/:id' component={Edit} />
        <AdminTemplate exact path='/admin/films/showtimes/:id/:tenphim' component={ShowTime} />
        <Redirect from='/admin' to='/admin/users' />
        <Route exact path="/checkout/:id" component={Checkout} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <UserTemplate exact path="/profile" component={Profile} />
        <Hometemplate exact component={HomeContent} path="/" />
        <Hometemplate exact component={Detail} path="/detail/:postId" /> 
        <Hometemplate exact component={SearchFilm} path="/searchfilm/:id" />
        <Route exact component={RouteNotFound} /> 
      </Switch>
    </Router>
  );
}
export default App;
