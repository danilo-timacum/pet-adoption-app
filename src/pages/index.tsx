import { TaskBar, TableTest } from '../components'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { HashRouter } from 'react-router-dom'

function Page() {
 
  
  return (
    <>
    <HashRouter>
      <Routes>
        <Route path='/' element={<TaskBar/>} />
        <Route path='tableTest' element={<TableTest/>} />
      </Routes>
    </HashRouter>
    </>
  )
}

export default Page
