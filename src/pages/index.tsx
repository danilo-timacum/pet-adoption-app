import { TaskBar, TableTest, MergedForm, FullTable } from "../components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";

function Page() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={[<TaskBar />, <MergedForm />]} />

          <Route path="tableTest" element={[<TableTest />, <FullTable />]} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default Page;
