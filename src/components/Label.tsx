import { Link } from "react-router-dom";



export function Label() {
  

    return (
        <>
         <div className="first">
            
            <Link to='/'><button className="home">HOME</button></Link>
            <Link to='tableTest'><button className="adopt">ADOPTION BOARD</button></Link> 
                    
                    </div>
        </>
    )
}
