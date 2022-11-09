import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";
import { AppContext } from "../context/UserContext";
import ListUsers from "../page/ListUsers";
import Login from "../page/Login";
import PrivateRoutes from "./PrivateRoutes";

const Main = () => {
  const [user, setUser] = useState();
  const [mounted, setMounted] = useState(false);

  // const navigate = useNavigate();

  useEffect(() => {
    let userCurrent: any = localStorage.getItem("user_token");

    if (userCurrent) {
      userCurrent = JSON.parse(userCurrent);
      setUser(userCurrent);

      // navigate("/listUsers");
    } else {
      // navigate("/login");
    }

    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <AppContext.Provider value={{ user, setUser }}>
          <BrowserRouter>
            <Routes>
              <Route path="" element={<Login />} />
              <Route path="/login" element={<Login />}></Route>
              <Route
                element={
                  <PrivateRoutes
                    isAllowed={user ? true : false}
                    redirectTo={"/login"}
                  />
                }
              >
                <Route path="/listUsers" element={<ListUsers />} />
              </Route>
              <Route path="*" element={"Error 404 page not found"}></Route>
            </Routes>
          </BrowserRouter>
        </AppContext.Provider>
      )}
    </>
  );
};

export default Main;
