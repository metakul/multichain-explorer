import { useParams } from "react-router-dom"

function SingleBlock() {

    const { block } = useParams<{ block: string }>(); // Retrieve the hash parameter

    return (
        <div>
            <h1>Block Details</h1>
            <p>Block Number: {block}</p>
        </div>
    )
}

export default SingleBlock