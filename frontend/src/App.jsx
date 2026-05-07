import { BrowserRouter, Routes, Route } from "react-router-dom";

import Portfolio from "@/pages/Portfolio";
import { Toaster } from "@/components/ui/sonner";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="bottom-right" theme="dark" />
    </div>
  );
}

export default App;
