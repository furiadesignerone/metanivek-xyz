import { Center, Link, VStack, Text, HStack, Divider } from "@chakra-ui/react";
import SiteLink from "../SiteLink";

function FooterLink(props) {
  return <SiteLink boldCurrent {...props} />;
}

export default function Footer() {
  return (
    <Center m={4}>
      <VStack>
      <Text align="center" pb={2}>
        <br />
           FOLLOW OUR ACCOUNT ON INSTAGRAM
          <Link color="red" href="https://www.instagram.com/furiadesignerone_digitalart/">
          <br /> view  original source by metanivek </Link>
          <Link color="red" href="https://github.com/metanivek/metanivek-xyz"></Link>
        </Text>
        <HStack>
        </HStack>
      </VStack>
    </Center>
  );
}
