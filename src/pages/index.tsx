import { useAccount } from 'wagmi'
import { Account, Connect } from '../components'

function Page() {
  const { isConnected } = useAccount()

  return (
    <>
   
{isConnected && (
  <div id="container">
    <div id="first">
          <button id="home">HOME</button>
          <button id="adopt">ADOPTION BOARD</button>
          </div>
          <div id="connect">
    <Connect/>
    </div>
    <div id="balance">Balance: </div>
    <div id="count">
          <label>Total: </label><br/><br/>
          <label>Adopted: </label><br/><br/>
          <label>For adoption: </label><br/><br/>
          </div>
        <div id="newCount">
        <label>You adopted: </label><br/><br/><label>You submited: </label>
        </div>
         
        </div>
        
)}

{!isConnected && (
        
      <div id="container">
        <div id="first">
          <button id="home">HOME</button>
          <button id="adopt">ADOPTION BOARD</button>
          </div>
          <h2>Pet Adoption</h2>
          <div id="count2">
         
          <label>Total: </label><br/><br/>
          <label>Adopted: </label><br/><br/>
          <label>For adoption: </label><br/><br/>
          </div>
          <div id="notConnect">
  <Connect/> 
  </div>
  </div>
       
)}

    </>
  )
}

export default Page
