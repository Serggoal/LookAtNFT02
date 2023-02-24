import { useState } from "react";
import NftCard from "../components/nftcards";
import { fetchNFTs } from "../utils/fetchNFTs";

const Explore = () => {

    // const apiKey = "Q5llQ1d3wTHYXi4lRoGYUQYdW2-SJDJo";
    // const endpointMendpoint = "https://eth-mainnet.alchemyapi.io/v2/Q5llQ1d3wTHYXi4lRoGYUQYdW2-SJDJo";
    
    // const apiKeyM = "849TACgZJLrS7Mq6-SKJdpyyX5HZx5Oa";
    // const endpointM = "https://polygon-mainnet.g.alchemy.com/v2/849TACgZJLrS7Mq6-SKJdpyyX5HZx5Oa";

  const [owner, setOwner] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [NFTs, setNFTs] = useState("");
  const [network, setNetwork] = useState("https://eth-mainnet.alchemyapi.io/v2/Q5llQ1d3wTHYXi4lRoGYUQYdW2-SJDJo");

  return (
    <div>
      <header className=" py-24  mb-12 w-full   alchemy">
        <div className="flex-grow flex justify-end mr-12 mb-12"></div>
        <div className="flex flex-col items-center mb-12">
          <div className="mb-16 text-white text-center">
            <h1 className="text-5xl  font-bold font-body mb-2">
              Alchemy NFT Explorer
            </h1>
            <p>An inspector to find NFTs by owner and contract address </p>
          </div>
          <div className="flex flex-col items-center justify-center mb-4 w-2/6 gap-y-2 ">
            <input
              className="border rounded-sm focus:outline-none py-2 px-3 w-full"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder="Insert your wallet address"
            ></input>
            <input
              className="focus:outline-none rounded-sm py-2 px-3 w-full"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              placeholder="Insert NFT Contract address (optional)"
            ></input>
          </div>
          <div className="mb-6 text-white text-center">
          <fieldset onChange={(e) => setNetwork(e.target.value)}>
            <legend>Select network</legend>

            <input
              id="draft"
              class="peer/draft"
              type="radio"
              name="status"
              value="https://eth-mainnet.alchemyapi.io/v2/Q5llQ1d3wTHYXi4lRoGYUQYdW2-SJDJo"
            />
            <label 
            
            for="draft" class="peer-checked/draft:text-sky-500">
              Ethereum
            </label>
            <a>&nbsp;&nbsp;&nbsp;</a>
            <input
              id="published"
              class="peer/published"
              type="radio"
              name="status"
              value="https://polygon-mainnet.g.alchemy.com/v2/849TACgZJLrS7Mq6-SKJdpyyX5HZx5Oa"
            />
            <label for="published" class="peer-checked/published:text-sky-500">
              Polygon
            </label>
          </fieldset>

          </div>

          <div className="w-2/6 flex justify-center">
            <button
              className="py-3 bg-white rounded-sm w-full hover:bg-slate-100"
              onClick={() => {
                fetchNFTs(owner, contractAddress, network, setNFTs);
              }}
            >
              Search
            </button>
          </div>
        </div>
      </header>

      <section className="flex flex-wrap justify-center">
        {NFTs ? (
          NFTs.map((NFT) => {
            return (
              <NftCard
                image={NFT.media[0].gateway}
                id={NFT.id.tokenId}
                title={NFT.title}
                address={NFT.contract.address}
                description={NFT.description}
                attributes={NFT.metadata.attributes}
              ></NftCard>
            );
          })
        ) : (
          <div>No NFTs found</div>
        )}
      </section>
    </div>
  );
};

export default Explore;