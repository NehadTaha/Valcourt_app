//Get user tags from database
const getUserTags = async () => {
  try {
    const token = localStorage.getItem("token");
    const userInfoUrl = "http://localhost:8080/userInfo/profile";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
    const response = await fetch(userInfoUrl, options);
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || "Failed to get user tags");
    }
    const tags = responseData.topics;
    console.log("User tags:", tags);
    return tags;
  } catch (error) {
    console.error("Error getting user tags:", error);
    throw error;
  }
};
export default getUserTags;
