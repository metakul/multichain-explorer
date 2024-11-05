import { useParams } from "react-router-dom"

function Transaction() {

  const { hash } = useParams<{ hash: string }>(); // Retrieve the hash parameter
    
  return (
      <div>
          <h1>Transaction Details</h1>
          <p>Transaction Hash: {hash}</p>
      </div>
  )
}

export default Transaction