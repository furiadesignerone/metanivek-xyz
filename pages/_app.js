import { ChakraProvider } from "@chakra-ui/react";
import { Box, extendTheme } from "@chakra-ui/react";
import Head from "next/head";

const customTheme = extendTheme({
  config: { initialColorMode: "light", useSystemColorMode: true },
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: 'white',
        color: 'white',
      },
      // styles for the `a`
      a: {
        color: 'red.100',
        _hover: {
          textDecoration: 'underline',
        },
      },
        // styles for the `h1`
      h1: {
        fontWeight: 'bold',
        fontSize:'6xl',
        color: 'red.500',

      },
           // styles for the `h2`
      h2: {
        color: 'red.500',
        fontSize:'3xl',
      },
             // styles for the `h3`
      h3: {
        color: 'red.300',
      },
         // styles for the `Link`
      h4: {
          color: 'red.500',
      },
    },
  },
  components: {
    Modal: {
      baseStyle: {
        dialogContainer: {
          //  work around mobile safari bug https://github.com/chakra-ui/chakra-ui/issues/4680
          "@supports(height: -webkit-fill-available)": {},
        },
      },
    },
  },
  colors: {
    gray: {
      neutral: "#fafafa",
    },
  },
  shadows: {
    dark: {
      base: "0 1px 3px 0 rgba(255, 255, 255, 0.01), 0 0px 2px 0 rgba(255, 255, 255, 0.1)",
    },
  },
});

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Metaespaces NFT gallery</title>
      </Head>
      <ChakraProvider theme={customTheme}>
        <Box px={[4, 4, 4, 8]}>
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
      
    </>
  );
}
