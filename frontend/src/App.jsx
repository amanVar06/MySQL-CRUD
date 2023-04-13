import { BrowserRouter, Routes, Route } from "react-router-dom";

import Error from "./pages/Error";
import Add from "./pages/Add";
import Books from "./pages/Books";
import Update from "./pages/Update";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Books />} />
          <Route path="add" element={<Add />} />
          <Route path="update/:bookId" element={<Update />} />
        </Route>
        {/* catch all essentially 404 page*/}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
