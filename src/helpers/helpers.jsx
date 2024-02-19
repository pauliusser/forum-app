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
const convertDate = (timestampStr) => {
  // Create a Date object with the timestamp string
  const timestamp = new Date(timestampStr);

  // Get the components of the date and time
  const year = timestamp.getFullYear();
  const month = timestamp.getMonth() + 1; // January is 0, so add 1
  const day = timestamp.getDate();
  const hours = timestamp.getHours();
  const minutes = timestamp.getMinutes();
  const seconds = timestamp.getSeconds();

  const addZero = (number) => {
    if (number < 10) {
      return "0" + number;
    }
    return number;
  };

  const date = `${year}.${addZero(month)}.${addZero(day)}`;
  const time = `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;

  // Format the date and time as needed
  return {
    date: date,
    time: time,
  };
};

export { authorization, convertDate };
