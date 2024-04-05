const updateUserInformation = async (data, shortToken = "") => {
  try {
    let token = localStorage.getItem("token")
    //const token = shortToken;

    if(shortToken !== "") {
      token = shortToken
    }

    const userInfoUrl = "http://localhost:8080/userInfo/profile";
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(userInfoUrl, options);
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(
        responseData.message || "Failed to update user information"
      );
    }
    return responseData;
  } catch (error) {
    console.error("Error updating user info:", error);
    throw error;
  }
};
export default updateUserInformation;
