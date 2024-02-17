import React, { useEffect } from "react";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import axios from "axios";
import Cookies from "js-cookie";

const MyPosts = () => {
  // const headers = {
  //   authorization: Cookies.get("jwt_token"),
  // };
  // const fetchUserPosts = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/posts/user/${userId}`,
  //       {
  //         headers: headers,
  //       }
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {
  //   fetchUserPosts();
  // }, []);

  return <PageTemplate></PageTemplate>;
};

export default MyPosts;
