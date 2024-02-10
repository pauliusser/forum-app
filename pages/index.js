import styles from "@/styles/Home.module.css";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import TopicsSection from "@/components/TopicsSection/TopicsSection";
// import "dotenv/config";

export default function Home() {
  return (
    <PageTemplate>
      <TopicsSection />
    </PageTemplate>
  );
}
