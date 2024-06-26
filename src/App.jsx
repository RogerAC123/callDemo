import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Bolivia from "./pages/Bolivia";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/bolivia" element={<Bolivia />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
