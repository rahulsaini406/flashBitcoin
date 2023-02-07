const CryptoAccount = require("send-crypto");
const Bitcore = require("bitcore-lib");
const testnet = Bitcore.Networks.testnet;
const net = { "network": "testnet" };

exports.transfer = async (req, res) => {
  try {
    let data = req.body;
    if (data.fromAddress !== "" && data.fromAddress !== null && data.fromAddress !== null ) {
      if (data.toAddress !== "" && data.toAddress !== null && data.toAddress !== null ) {
        if (data.amount !== 0 && data.amount !== null && data.amount !== null && data.amount !== "") {
          const account = new CryptoAccount(data.fromAddress, net);
          const key = Bitcore.PrivateKey.fromWIF(data.toAddress, testnet);
          const recipientAddress = key.toAddress(testnet).toString();
          // const recipientAddress = "mvMmciZivoJfAuvTb94CZcM94yi8zH3Uns";
          // const amount = 0.00001; // in BTC

          const fee = 0.0001;

          const balance = await account.getBalance("BTC");
          console.log(`Current balance: ${balance}`);

          if (balance < Number(data.amount) + fee) {
           
            return  res.status(201).send({ success: false, msg: "You dont have enough balance !", data: "", errors: "" });;
          }
          console.log("data.fromAddress", data.fromAddress, data.toAddress, data.amount)
          const txHash = await account.send(recipientAddress, data.amount, "BTC");
          if(txHash){
            console.log("tx",txHash )
            return  res.status(200).send({ success: true, msg: `${data.amount} BTC Transfer successfull !`, data: txHash, errors: "" });
          }else{
            return   res.status(201).send({ success: false, msg: `Transaction failed!`, data: "", errors: "" });
          }
        } else {
          return res.status(201).send({ success: false, msg: "Please enter valid amount !", data: "", errors: "" });
        }
      } else {
        return res.status(201).send({ success: false, msg: "Please enter valid Recipient's address!", data: "", errors: "" });
      }
    } else {
      return res.status(201).send({ success: false, msg: "Please enter valid sender address!", data: "", errors: "" });
    }

  } catch (err) {
    console.error("catch", err);
    res.status(500).send({ success: false, msg: "Error", data: {}, errors: err });
  }
};
