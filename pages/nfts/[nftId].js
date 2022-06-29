import Header from '../../components/Header'
import { useEffect, useMemo, useState } from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { useRouter } from 'next/router'
import NFTImage from '../../components/nft/NFTImage'
import GeneralDetails from '../../components/nft/GeneralDetails'
import ItemActivity from '../../components/nft/ItemActivity'
import Purchase from '../../components/nft/Purchase'

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
}

const Nft = () => {
  const { provider } = useWeb3()
  const [selectedNft, setSelectedNft] = useState()
  const [listings, setListings] = useState([])
  const router = useRouter()

  const nftModule = useMemo(() => {
    if (!provider) return
    const sdk = new ThirdwebSDK(provider.getSigner())
    return sdk.getNFTModule('0x63959cbAAa83806564dC0BF0273CD99de5e892CF')
  }, [provider])

  // get all NFTs in the collection

  useEffect(() => {
    if (!nftModule) return
    ;(async () => {
      const nfts = await nftModule.getAll()

      const selectedNftItem = nfts.find((nft) => nft.id === router.query.nftId)

      setSelectedNft(selectedNftItem)
    })()
  }, [nftModule])

  const marketPlaceModule = useMemo(() => {
    if (!provider) return
    const sdk = new ThirdwebSDK(provider.getSigner())
    return sdk.getMarketplaceModule(
      '0x88B282fAF28B6558b9511892c85ae0E7B3d4a8ec'
    )
  }, [provider])

  useEffect(() => {
    if (!marketPlaceModule) return
    ;(async () => {
      setListings(await marketPlaceModule.getAllListings())
    })()
  }, [marketPlaceModule])

  //   const marketPlaceModule = useMemo(() => {
  //     if (!provider) return

  //     const sdk = new ThirdwebSDK(
  //       provider.getSigner(),
  //       'https://rinkeby.infura.io/v3/a464b9152d8c466c8a94a514fce8e837'
  //     )

  //     return sdk.getMarketplaceModule(
  //       '0x93A771F7ce845C33381f677489cF21a5964EDD0b'
  //     )
  //   }, [provider])

  //   useEffect(() => {
  //     if (!marketPlaceModule) return
  //     ;(async () => {
  //       setListings(await marketPlaceModule.getAllListings())
  //     })()
  //   }, [marketPlaceModule])

  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTImage selectedNft={selectedNft} />
            </div>
            <div className={style.detailsContainer}>
              <GeneralDetails selectedNft={selectedNft} />
              <Purchase
                isListed={router.query.isListed}
                selectedNft={selectedNft}
                listings={listings}
                marketPlaceModule={marketPlaceModule}
              />
            </div>
          </div>
          <ItemActivity />
        </div>
      </div>
    </div>
  )
}

export default Nft
