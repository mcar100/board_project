import { Route, Routes } from "react-router-dom";
import Home from "./pages/board/Home";
import ContentLayout from "./components/Layout/ContentLayout";
import Login from "./pages/user/Login";
import Membership from "./pages/user/Membership";
import Board from "./pages/board/Board";
import Profile from "./pages/user/Profile";
import NotFound from "./pages/NotFound";
import { NavigationProvider } from "./context/NavigationContext";

function App() {
  return (
    <div className="App p-0">
      <NavigationProvider>
        <Routes>
          <Route path="/" element={<ContentLayout />}>
            <Route index element={<Home />} />
            <Route path="boards" element={<Board />} />
            <Route path="boards/:id" element={<Board />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </NavigationProvider>
    </div>
  );
}

export default App;
