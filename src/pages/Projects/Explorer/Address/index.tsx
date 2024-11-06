import { useParams } from "react-router-dom"

function AddressInfo() {

    const { address } = useParams<{ address: string }>(); // Retrieve the hash parameter

    return (
        <div>
            <h1>Address Details</h1>
            <p>Address : {address}</p>
            <p>Address Type</p>
        </div>
    )
}

export default AddressInfo