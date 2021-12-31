import { VStack } from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import { fetchAllItemsHoc } from "../lib/pages";

const Home = ({ items }) => {
  return (
    <VStack>
      <Header />
      <Gallery items={items} collectable={true} />
      <Footer />
    </VStack>
  );
};
export default fetchAllItemsHoc(Home);
export { getStaticProps } from "../lib/pages";
