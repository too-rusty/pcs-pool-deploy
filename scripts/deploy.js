const Token1 = artifacts.require("Token1")
const Token2 = artifacts.require("Token2")
const Factory = artifacts.require("IPancakeFactory")
const Router = artifacts.require("IPancakeRouter")
const Pair = artifacts.require("IPancakePair")

const FACTORY = "0xB7926C0430Afb07AA7DEfDE6DA862aE0Bde767bc"
const ROUTER_ADDR = "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3"

module.exports = async done => {
    const token1 = await Token1.new()
    const token2 = await Token2.new()
    const factory = await Factory.at(FACTORY)
    const router = await Router.at(ROUTER_ADDR)
    
    const [admin,_] = await web3.eth.getAccounts()
    console.log("admin acc", admin)
    console.log("tokens deployed at: ", token1.address, token2.address)

    await token1.approve(ROUTER_ADDR, 1_000_000)
    await token2.approve(ROUTER_ADDR, 1_000_000)

    const lptoken_addr = await factory.createPair.call(token1.address, token2.address)
    let pair
    try {
        const tx = await router.addLiquidity(
            token1.address,
            token2.address,
            1_000_000,
            1_000_000,
            1_000_000,
            1_000_000,
            admin,
            Math.floor(Date.now() / 1000 + 2 * 60) // 2 min deadline
        )
        console.log("TX", tx)
        pair = await Pair.at(lptoken_addr)
        console.log(`pair address ${lptoken_addr}`)
    } catch (e) {
        console.log(`error: ${e}`)
    }

    console.log("balance of admin", await pair.balanceOf(admin))

    done()
}