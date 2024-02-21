import React, { useEffect, useState } from "react";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { useRouter } from "next/router";
import { authorization } from "@/src/helpers/helpers";
import PostsSection from "@/components/PostsSection/PostsSection";

const Topic = () => {
  //autorizacija paleidziama viena karta ir po to kas minute
  const router = useRouter();

  useEffect(() => {
    authorization(router);
    const authInterval = setInterval(() => {
      authorization(router);
    }, 60000);
    return () => clearInterval(authInterval);
  }, []);

  return (
    <PageTemplate>
      <PostsSection />
    </PageTemplate>
  );
};

export default Topic;
