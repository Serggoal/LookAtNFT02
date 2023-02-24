// Go to www.alchemy.com and create an account to grab your own api key!
// const apiKey = "Q5llQ1d3wTHYXi4lRoGYUQYdW2-SJDJo";
// const endpointMendpoint = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`;





export const fetchNFTs = async (owner, contractAddress, network, setNFTs, retryAttempt) => {
    if (retryAttempt === 5) {
        return;
    }
    if (owner) {
        let data;
        try {
            if (contractAddress) {
                data = await fetch(`${network}/getNFTs?owner=${owner}&contractAddresses%5B%5D=${contractAddress}`).then(data => data.json())
            } else {
                data = await fetch(`${network}/getNFTs?owner=${owner}`).then(data => data.json())
            }
        } catch (e) {
            fetchNFTs(network, owner, contractAddress, setNFTs, retryAttempt+1)
        }

        setNFTs(data.ownedNfts)
        return data
    }
}