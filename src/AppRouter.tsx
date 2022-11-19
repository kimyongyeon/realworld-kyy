import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Footer } from './component/Footer';
import Header from './component/Header';
import RequireAuth from './component/RequireAuth';
import List from './container/article/List';
import { Write } from './container/article/Write';
import Home from './container/main/Home';
import { Login } from './container/user/Login';
import { Profile } from './container/user/Profile';
import { Register } from './container/user/Register';
import { Settings } from './container/user/Settings';

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/main/*" element={<Home />} />
          <Route path="/article/*" element={<List />} />
          <Route path="/login/*" element={<Login />} />
          <Route
            path="/register/*"
            element={
              <RequireAuth>
                <Register />
              </RequireAuth>
            }
          />
          <Route
            path="/settings/*"
            element={
              <RequireAuth>
                <Settings />
              </RequireAuth>
            }
          />
          <Route
            path="/profile/*"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/article/detail"
            element={
              <RequireAuth>
                <Write />
              </RequireAuth>
            }
          />
          <Route path="/" element={<Navigate replace to="/main" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};
export default AppRouter;
