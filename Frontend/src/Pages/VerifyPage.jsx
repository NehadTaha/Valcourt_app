import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function VerifyPage() {
  const navigate = useNavigate();

  const {uniqueString} = useParams()
  console.log('uniqueString: ', uniqueString);

  const [displayMessage, setDisplayMessage] = useState("")

  useEffect(() => {

    const handleSubmit = async () => {

      const verifyUrl = `http://localhost:8080/auth/verify/${uniqueString}`;
      const options = {
        method: "GET",
        headers: {
          "content-type": "application/json",
        }
      };
      try {
        const response = await fetch(verifyUrl, options);
        console.log("response.status: ", response.status);
        const data = await response.json();
        console.log("data: ", data);
        if (response.status === 200) {
          //navigate("/login");
        } else {
          setDisplayMessage(data) // Show error message if verification fails
        }
      } catch (error) {
        console.error("Error verifying account:", error);
      }
    };

    handleSubmit()
  }, [])

  return (
    <div>
      {displayMessage}
    </div>
  );
}

export default VerifyPage;
