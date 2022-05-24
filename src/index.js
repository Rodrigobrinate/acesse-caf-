import ReactDOM from "react-dom/client";
import  App from './App'
import Historic from "./pages/Historic";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import your route components too

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/historic" element={<Historic />}></Route>
    </Routes>
  </BrowserRouter>
);