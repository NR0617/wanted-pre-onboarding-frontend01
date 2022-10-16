import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Auth from "./pages/Organisms/Auth/index";
import Todos from "./pages/Organisms/Todos/index";
import Header from "./components/Header";

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route path="/todos" element={<Todos />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
