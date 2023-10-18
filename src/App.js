import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Todo from './todo';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Todo />} />
      </Routes>
    </Router>
  );
}

export default App;
