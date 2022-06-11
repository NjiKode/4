import fetch from 'node-fetch'

let list = ["waifu", "neko", "cuddle", "cry", "hug", "kiss", "lick"]

let handler = async (m, { conn, usedPrefix, args }) => {
    
    let type = (args[0] || '').toLowerCase()
    
    let sections = [
      {
        title: "Select 1 Category",
        rows: [
          {title: "Waifu", rowId: ".anime waifu", description: "Get random waifu image"},
          {title: "Neko", rowId: ".anime neko", description: "Get random neko image"},
          {title: "Cuddle", rowId: ".anime cuddle", description: "Get random anime cuddle image"},
          {title: "Cry", rowId: ".anime cry", description: "Get random anime crying image"},
          {title: "Hug", rowId: ".anime hug", description: "Get random anime hugging image"},
          {title: "Kiss", rowId: ".anime kiss", description: "Get random anime kissing image"},
          {title: "lick", rowId: ".anime lick", description: "Get random anime licking image"},
        ]
      }
    ]
    const listMessage = {
      text: "Please Select One Category!",
      footer: author,
      title: "━━━━「 RANDOM ANIME 」━━━━",
      buttonText: "Click Here!",
      sections
    }
      
    if (list.includes(type)) { 
    
    let res = await fetch(`https://api.waifu.pics/sfw/${type}`)
    if (!res.ok) throw await res.text()
    let json = await res.json()
    if (!json.url) throw 'Error, Silahkan Coba Lagi Nanti!'
    conn.sendButton(m.chat, 'Pecinta kartun!', author, json.url, [[`${type}`, `${usedPrefix}anime ${type}`]], m)
    
    } else {
      
      await conn.sendMessage(m.chat, listMessage)
    }
      
return
}
handler.help = ['anime']
handler.tags = ['internet']
handler.command = /^(anime)$/i
handler.limit = true
//MADE IN ERPAN 1140 BERKOLABORASI DENGAN BTS
export default handler