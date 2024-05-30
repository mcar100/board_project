import { Route, Routes } from "react-router-dom";
import Home from "./pages/board/Home";
import { ContentLayout } from "./components/Layout/ContentLayout";
import Login from "./pages/user/Login";
import Membership from "./pages/user/Membership";

function App() {
  return (
    <div className="App p-0">
      <Routes>
        <Route path="/" element={<ContentLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/membership" element={<Membership />} />
      </Routes>
    </div>
  );
}

export default App;
