import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

// add names for every address to fetch objkts
const addressNames = {
  tz1N3xSSHguSVLYMCeNG7e3oiDfPnc6FnQip: "metanivek",
  tz1aiCXusXLywm3ewXb4Y8X8bsDqWQYmzvLa: "metanivek.words",
  tz1XDQJPCP53mSgwDZiNphTVKGmDJRsTwWUe: "metanivek.x",
};

const fetchAllQuery = {
  query: gql`
    query FetchMyObjkts($addresses: [String!], $include_tags: [String!]) {
      hic_et_nunc_ask(
        where: {
          artist_id: { _in: $addresses }
          status: { _eq: "active" }
          amount_left: { _gt: 0 }
        }
      ) {
        price
        creator_id
        objkt_id
      }
      hic_et_nunc_token(
        where: {
          creator_id: { _in: $addresses }
          token_holders: {
            quantity: { _gt: 0 }
            holder_id: { _neq: "tz1burnburnburnburnburnburnburjAYjjX" }
          }
        }
        order_by: { id: desc }
      ) {
        id
        mime
        creator_id
        title
        artifact_uri
        display_uri
        description
        supply
        token_tags(where: { tag: { tag: { _in: $include_tags } } }) {
          tag {
            tag
          }
        }
        swaps(
          where: { status: { _eq: 0 }, contract_version: { _neq: "1" } }
          order_by: { price: asc }
        ) {
          price
          creator_id
          amount
          amount_left
        }
        token_holders(
          where: {
            quantity: { _gt: 0 }
            holder_id: { _neq: "tz1burnburnburnburnburnburnburjAYjjX" }
          }
        ) {
          holder_id
          quantity
        }
      }
    }
  `,

  variables: {
    addresses: Object.keys(addressNames),
    include_tags: ["poetry", "animation", "sketch4processing"],
  },
};

// default is 1:1, override here
const aspectOverrides = {
  472560: 5 / 4,
  472556: 5 / 4,
  472494: 5 / 4,
  447597: 4 / 5,
  447579: 4 / 5,
  447570: 4 / 5,
  447552: 4 / 5,
  404876: 5 / 4,
  404860: 5 / 4,
  404845: 5 / 4,
  400064: 5 / 4,
  392264: 5 / 4,
  378134: 5 / 4,
  374048: 5 / 4,
  346783: 16 / 9,
  283344: 5 / 4,
  270281: 4 / 5,
  255637: 16 / 9,
  236351: 4 / 5,
  236333: 4 / 5,
  236308: 5 / 4,
  234307: 5 / 4,
  230413: 5 / 4,
  228643: 5 / 4,
  226853: 4 / 5,
  213427: 5 / 4,
  203929: 5 / 4,
  203924: 5 / 4,
  203918: 5 / 4,
  203913: 5 / 4,
  203907: 5 / 4,
  199084: 5 / 4,
  199075: 5 / 4,
  199069: 5 / 4,
  189019: 4 / 5,
};

function gatewayResolver(ipfsUri) {
  // fast public gateway: "https://cf-ipfs.com/ipfs/"
  const gateway = "https://metanivek.mypinata.cloud/ipfs/";
  return ipfsUri && ipfsUri.replace("ipfs://", gateway);
}

function normalizeData(objkts, asks) {
  return objkts.map((i) => {
    const objktAsks = asks
      .filter((a) => a.objkt_id === i.id)
      .map((a) => {
        return { ...a, t: "objkt" };
      });
    const henSwaps = i.swaps.map((s) => {
      return {
        ...s,
        t: "hen",
      };
    });
    const holders = i.token_holders.map((th) => th.holder_id);
    const listings = objktAsks
      .concat(henSwaps)
      .sort((a, b) => a.price - b.price);
    const ownerOnlyHolder = holders.reduce(
      (v, h) => v && h === i.creator_id,
      true
    );
    const soldOut = listings.length <= 0;
    return {
      ...i,
      ownerOnlyHolder,
      aspectRatio: aspectOverrides[i.id] || 1,
      uris: {
        objkt: `https://objkt.com/asset/hicetnunc/${i.id}`,
        hen: `https://hicetnunc.xyz/objkt/${i.id}`,
      },
      artifactUri: gatewayResolver(i.artifact_uri),
      displayUri: gatewayResolver(i.display_uri),
      creatorName: addressNames[i.creator_id] || "unknown address",
      tags: i.token_tags.map((t) => t.tag.tag),
      holders,
      asks: objktAsks,
      listings,
      tags: i.token_tags.map((t) => t.tag.tag),
      totalRemaining: listings.reduce((m, s) => m + s.amount_left, 0),
      soldOut,
      secondary: !soldOut && listings[0].creator_id != i.creator_id,
    };
  });
}

/*
 * exported functions
 */

export async function fetchAllObjkts() {
  const client = new ApolloClient({
    uri: "https://api.hicdex.com/v1/graphql",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query(fetchAllQuery);
  const objkts = normalizeData(
    data["hic_et_nunc_token"],
    data["hic_et_nunc_ask"]
  );
  return objkts;
}

export function filterOwnedObjkts(items, address) {
  return items.filter((item) => {
    return item.holders.includes(address);
  });
}

export function filterListedObjkts(items, address) {
  return items.filter((item) => !item.soldOut);
}

// simple mime handling
// TODO: add support for other types
export function isHtml(item) {
  return item.mime === "application/x-directory";
}
export function isPdf(item) {
  return item.mime === "application/pdf";
}
export function isVideo(item) {
  return item.mime.startsWith("video/");
}
export function isImage(item) {
  return item.mime.startsWith("image/");
}
