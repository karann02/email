import React from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import EmailEditor from "./components/EmailEditor";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyNavbar from './components/MyNavbar.js';
import Contact from './components/Contact.js';
// import Marketing from './components/Marketing.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <MyNavbar />
          <Routes>
            <Route path="/" element={<Contact />} />
            <Route path="/marketing" element={<EmailEditor />} />
          </Routes>
        </header>

      </div>
    </Router>
  );
}

export default App;
