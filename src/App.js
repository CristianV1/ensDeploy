import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ArchivedNotes from "./components/pages/archivedNotes/ArchivedNotes";

import ActiveNotes from "./components/pages/activeNotes/ActiveNotes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/archived" element={<ArchivedNotes />} />

        <Route path="/" element={<ActiveNotes />}></Route>
      </Routes>
    </div>
  );
}

export default App;
