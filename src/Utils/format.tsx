import { useAccount } from "wagmi";

export function Address(){
    const { isConnected } = useAccount();
    const { address } = useAccount();
  
  if (isConnected){
    const mainAdr = address; 
  
    const adr1 = mainAdr.slice(0,4);
    const adr2 = mainAdr.slice(-3);
    const adrMidd = '...';

    const fullAddress = adr1 + adrMidd + adr2;  
     
    return fullAddress;
  } 
}
export default Address;
  

