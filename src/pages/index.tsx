import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { AdoptForm }  from "../pages/AdoptForm";

function Page() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
    
          <Route path="tableTest" element={<AdoptForm />}/>
        </Routes>
      </HashRouter>
    </>
  );
}

export default Page;
