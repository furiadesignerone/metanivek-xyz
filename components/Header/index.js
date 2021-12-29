import { Center, Link, VStack, Text, HStack, Divider } from "@chakra-ui/react";
import SiteLink from "../SiteLink";

function HeaderLink(props) {
  return <SiteLink boldCurrent {...props} />;
}

export default function Header() {
  return (
    <Center m={4}>
      <VStack>
        <Text align="center" pb={2}>
          MESTAESPACES
          <br/> NFT GALLERY

          <br /> curated by Marie Van Dooren <Link href="https://www.instagram.com/marie.vandooren/">@marie.vandooren</Link> and Fernando Asensio Muñoz <Link href="https://twitter.com/AmLBOk0HFzdFHMy">@AmLBOk0HFzdFHMy</Link>
          <br />
          <br /> 
          <br /> FOLLOW OUR ACCOUNT ON INSTAGRAM
          <Link color="blue" href="https://www.instagram.com/furiadesignerone_digitalart/">
            view source
          </Link>
        </Text>
        <Divider />
        <HStack spacing={6} pt={2}>
          <HeaderLink href="/">All</HeaderLink>
          <HeaderLink href="/listed">Listed</HeaderLink>
          <HeaderLink href="/yours">Yours</HeaderLink>
        </HStack>
      </VStack>
    </Center>
  );
}
