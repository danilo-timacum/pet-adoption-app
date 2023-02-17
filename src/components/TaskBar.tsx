import { useAccount } from 'wagmi'
import { Account, Connect, Label, Balance } from '../components'
import ABI from './Abi.json'
import { useContractReads } from 'wagmi'

export function TaskBar() {
    const { isConnected } = useAccount();
    const { address } = useAccount();

    const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        address: '0x25d01F0bc600690A11E44D593C34265d50eAEAb3',
        abi: ABI,
        functionName: 'userStats',
        args: [address],
        },
      
        {
          address: '0x25d01F0bc600690A11E44D593C34265d50eAEAb3',
          abi: ABI,
          functionName: 'totalPets'
          },

      {
        address: '0x25d01F0bc600690A11E44D593C34265d50eAEAb3',
        abi: ABI,
        functionName: 'adopted'
        },
  
        {
          address: '0x25d01F0bc600690A11E44D593C34265d50eAEAb3',
          abi: ABI,
          functionName: 'availablePets'
          },

  ],
    })

return(
    <> 
        <Label/>
        {!isConnected && (
              
                  <div className="container">
                     <br/>
                      <h2>Pet Adoption</h2>
                      <div className="count2">
                   
                      <label>Total: {Number(data?.[1])} {isLoading && (<p>loading...</p>)} {isError && (<p>ERROR!</p>)}</label><br/><br/>
                      <label>Adopted: {Number(data?.[2])}</label><br/><br/>
                      <label>For adoption: {Number(data?.[3])}</label><br/><br/>
                    
                      </div>
                      <div className="notConnect">
                           <Connect/>

              </div>
              </div>
                  
            )}

            {isConnected && ( 
            <div className="container">
                    <div className="connect">
              <Connect/>
              </div>
             
              <div className="balance"><Balance/></div>
              <div className="count">
                    <label>Total: {Number(data?.[1])}</label><br/><br/>
                    <label>Adopted:  {Number(data?.[2])}</label><br/><br/>
                    <label>For adoption: {Number(data?.[3])}</label><br/><br/>
                    </div>
                  <div className="newCount">
                  <label>You adopted: {Number(data?.[0]?.hasAdopted)}</label><br/><br/><label>You submited: {Number(data?.[0]?.petsAdded)}</label>
                  </div>
                   
                  </div>
                  
          )}

          </>
          
          )    
}