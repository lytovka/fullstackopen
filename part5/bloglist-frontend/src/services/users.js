import axios from "axios";

const baseUrl = "/api/users";

const getUser = async (name) => {
  const response = await axios.get(baseUrl);
  return response.data.find(user => user.username === name);
};

export default { getUser };