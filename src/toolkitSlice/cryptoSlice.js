import { createSlice } from "@reduxjs/toolkit";

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    portfolioSumm: {
      totalCost: "134,32",
      diffCost: "+2,38",
      diffPersent: "1,80",
    },
    portfolioLog: [
      {
        changePercent24Hr: "-1.4734142517749821",
        explorer: "https://blockchain.info/",
        id: "bitcoin",
        marketCapUsd: "1168623984715.0398131926033800",
        maxSupply: "21000000.0000000000000000",
        name: "Bitcoin",
        priceUsd: "61978.7875623356291528",
        rank: "1",
        supply: "18855225.0000000000000000",
        symbol: "BTC",
        volumeUsd24Hr: "16921321526.5276370964248556",
        vwap24Hr: "62578.4567265585732598",
      },
      {
        changePercent24Hr: "2.1036932350592146",
        explorer: "https://cardanoexplorer.com/",
        id: "cardano",
        marketCapUsd: "72987608211.0678348466534116",
        maxSupply: "45000000000.0000000000000000",
        name: "Cardano",
        priceUsd: "2.1945766981426763",
        rank: "4",
        supply: "33258171506.5320000000000000",
        symbol: "ADA",
        volumeUsd24Hr: "1107485478.7152608090204394",
        vwap24Hr: "2.1700360900584088",
      },
    ],
  },
  reducers: {
    addCrypto(state, action) {
      state.portfolio.push(action.payload);
    },
    deleteCrypto(state, action) {},
  },
});

export default cryptoSlice.reducer;
export const { addCrypto, deleteCrypto } = cryptoSlice.actions;
