import Cookies from "js-cookie";
import axios from "axios";
import "dotenv/config";

const authorization = async (router) => {
  const jwtToken = Cookies.get("jwt_token");
  if (!jwtToken) {
    console.log("not authorized (no JWT token)");
    router.push("/logIn");
  } else {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/validate`,
        { headers: { authorization: jwtToken } }
      );
      console.log("authorized", response.status);
    } catch (err) {
      console.log(
        "not authorized (expired token)",
        err.response.status,
        "removing token"
      );
      Cookies.remove("jwt_token");
      router.push("/logIn");
    }
  }
};

export { authorization };
