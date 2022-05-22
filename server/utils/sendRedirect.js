const axios = require("axios");
require("dotenv").config();

// Internal function
const customAxios = async (endpoint, method, headers) => {
  // URL base para las peticiones al BackEnd
  const url = endpoint;
  try {
    const response = await axios({
      url,
      method,
      headers,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
// Example props
// endpoint(*): 'accc_auth/login'
// data: { email: params.email, password: params.passwordLogin }
// method: 'POST'
async function sendRedirect(
  endpoint,
  method = "get",
  contentType = "application/json"
) {
  let defaultHeaders = {
    "Content-Type": "application/json",
  };
  const token = process.env.BEARER_TOKEN;
  let response = null;
  try {
    defaultHeaders = {
      ...defaultHeaders,
      Authorization: `Bearer ${token}`,
    };
    response = await customAxios(endpoint, method, defaultHeaders);
  } catch (error) {
    console.error(error);
  }

  return response;
}
module.exports = { sendRedirect };
