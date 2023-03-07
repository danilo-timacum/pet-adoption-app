import { useState } from "react";
import{ TaskBar, MergedForm } from "../components";

export function Home(){
   const [runReads, setRunReads] = useState(false);
return(
    <>
    <TaskBar runReads={runReads} setRunReads={setRunReads}/>
    <MergedForm setRunReads={setRunReads}/>
    </>
)
}
export default Home;