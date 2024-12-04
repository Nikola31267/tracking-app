import Faq from "./components/Faq";
import Pricing from "./components/Pricing";

export default function Home() {
  return (
    <>
      <div className="min-h-screen">Home</div>
      <Pricing />
      <Faq />
    </>
  );
}
