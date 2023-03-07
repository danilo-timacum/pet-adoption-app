import { useAccount } from "wagmi";

    const { isConnected } = useAccount();
    const { address } = useAccount();
    
    let fullAddress
    let mainAdr; 

  if (isConnected){
    const mainAdr = address; 
  
    const adr1 = mainAdr.slice(0,4);
    const adr2 = mainAdr.slice(-3);
    const adrMidd = '...';
    fullAddress = adr1 + adrMidd + adr2;
  
  } 


  

