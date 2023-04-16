import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Reading from "./pages/Reading";
import ToRead from "./pages/ToRead";
import Read from "./pages/Read";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/reading">Reading</Link></li>
          <li><Link to="/toread">To Read</Link></li>
          <li><Link to="/read">Read</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/reading" element={<Reading />}></Route>
        <Route path="/toread" element={<ToRead />}></Route>
        <Route path="/read" element={<Read />}></Route>
      </Routes>
    </div>
  );
}

export default App;
