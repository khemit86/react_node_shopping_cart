import { Link, useParams } from "react-router-dom";


const OrderScreen = ()=>{
    const {id:orderId}  = useParams();
    console.log(orderId);

    return(
        <>
        hii
        </>
    )
}

export default OrderScreen;