import PageTemplate from "@/components/PageTemplate/PageTemplate";
import TopicsSection from "@/components/TopicsSection/TopicsSection";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { authorization } from "@/src/helpers/helpers";

export default function Home() {
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
      <TopicsSection />
    </PageTemplate>
  );
}
