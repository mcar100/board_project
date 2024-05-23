import { Route, Routes } from "react-router-dom";
import Home from "./pages/board/Home";
import Layout from "./pages/common/Layout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
