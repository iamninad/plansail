import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Footer from "../shared/Footer/Footer";
import Register from "../pages/Register/Register";
import ComponentWrap from "../shared/ComponentWrap/ComponentWrap";
import Dashboard from "../pages/Dashboard/Dashboard";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
import Home from "../pages/Home/Home";
import MyTasks from "../pages/MyTasks/MyTasks";
import Reports from "../pages/Reports/Reports";
import Team from "../pages/Team/Team";
import CreateTask from "../components/CreateTask/CreateTask";

const LayoutRouting = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <>
              <Login />
              {/* <Footer /> */}
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Register />
              {/* <Footer /> */}
            </>
          }
        />
        <Route
          path="/forgetPass"
          element={
            <>
              <ForgetPassword />
              {/* <Footer /> */}
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <ComponentWrap>
                <Dashboard />
              </ComponentWrap>
            </>
          }
        />

        <Route
          path="/mytasks"
          element={
            <>
              <ComponentWrap>
                <MyTasks />
              </ComponentWrap>
            </>
          }
        />
        <Route
          path="/reports"
          element={
            <>
              <ComponentWrap>
                <Reports />
              </ComponentWrap>
            </>
          }
        />
        <Route
          path="/team"
          element={
            <>
              <ComponentWrap>
                <Team />
              </ComponentWrap>
            </>
          }
        />
        <Route
          path="/createtask"
          element={
            <>
              <ComponentWrap>
                <CreateTask />
              </ComponentWrap>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default LayoutRouting;
