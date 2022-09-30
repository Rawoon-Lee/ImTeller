//import
import { coinContract } from './CoinABI'
import { cardAddress, cardContract } from './CardABI'
import { web3, marketContract } from './MarketABI'
import dealABI from './DealABI'

//mint
export const createCard = async (walletAddress: string, image: any) => {
  const admin = '0x3f317D1680B8B60da4323bbB1328a8F0DD44edfb'
  const wallet = walletAddress
  const tokenURI = image
  const approvalToPay = await coinContract.methods.approve(cardAddress, 10).send({ from: wallet })
  let token_id: any
  if (approvalToPay.status) {
    token_id = await cardContract.methods.create(tokenURI).send({ from: wallet })
  }
  console.log(token_id.events.Transfer.returnValues.tokenId)
}

//new Deal
export const sellCard = async (
  walletAddress: string,
  image: any,
  token_id: any,
  wantedPrice: any,
) => {
  // 'wallet은 유저의 account Address'
  const wallet = walletAddress
  // '판매할 카드 url'
  const tokenURL = image
  //'판매할 카드의 token Id'
  const tokenId = 12
  // '판매가격'
  const price = 10
  console.log('거래 등록')
  const dealCA = await marketContract.methods.createDeal(tokenId, price).send({ from: wallet })
  console.log('거래 등록 완료')
  console.log('deal', dealCA)
  const contract_id = dealCA.events.NewDeal.address
  await cardContract.methods.setApprovalForAll(contract_id, true).send({ from: wallet })

  //   await cardContract.methods.transferFrom(wallet, contract_id, tokenId).send({ from: wallet })
}

//Card 구매
export const purchaseCard = async (dealId: any, walletAddress: any, wantedPrice: any) => {
  //   const dealCA = '내가 살 카드의 거래 CA'
  const dealCA = dealId
  const dealInstance = new web3.eth.Contract(dealABI, dealCA)
  //   const wallet = 'wallet은 유저의 account Address'
  const wallet = walletAddress
  //   const price = '해당 카드 가격'
  const price = wantedPrice
  console.log('구매 시작')
  const approvalToPay = await coinContract.methods.approve(dealCA, price).send({ from: wallet })
  console.log('권한 허용')
  if (approvalToPay.status) {
    return await dealInstance.methods.purchase().send({ from: wallet })
  }
}

//판매 취소
export const cancelDeal = async () => {
  const dealCA = '내가 살 카드의 거래 CA'
  const dealInstance = new web3.eth.Contract(dealABI, dealCA)
  const wallet = 'wallet은 유저의 account Address'

  return await dealInstance.methods.cancelDeal().send({ from: wallet })
}
