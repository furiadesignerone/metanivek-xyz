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
         <h1> MESTAESPACES </h1>
          <br/> <h2>NFT GALLERY </h2>
          <br /> <h3>curated by Marie Van Dooren </h3><a href="https://www.instagram.com/marie.vandooren/">@marie.vandooren</a> 
          <br /><h3>and Fernando Asensio Muñoz </h3><a href="https://twitter.com/AmLBOk0HFzdFHMy">@AmLBOk0HFzdFHMy</a>
          
        </Text>
        <Divider />
        <HStack spacing={6} pt={2}>
        <h4><HeaderLink href="/">All</HeaderLink></h4>
        <h4><HeaderLink href="/listed">Listed</HeaderLink></h4>
        <h4><HeaderLink href="/yours">Yours</HeaderLink></h4>
        </HStack>
        
      </VStack>
    </Center>
  );
}
