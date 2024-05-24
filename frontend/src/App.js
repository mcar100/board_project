import { Route, Routes } from "react-router-dom";
import Home from "./pages/board/Home";
import { ContentLayout } from "./components/Layout/ContentLayout";
import LoginForm from "./pages/user/LoginForm";

function App() {
  return (
    <div className="App p-0">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/"
          element={
            <ContentLayout>
              <Home />
            </ContentLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
