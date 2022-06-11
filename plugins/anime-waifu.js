import fetch from 'node-fetch'

let list = ["waifu", "neko", "cuddle", "cry", "hug", "kiss", "lick"]

let handler = async (m, { conn, usedPrefix, args }) => {
    
    let type = (args[0] || '').toLowerCase()
    
    let sections = [
      {
        title: "Select 1 Category",
        rows: [
          {title: "Waifu", rowId: ".anime waifu"},
          {title: "Neko", rowId: ".anime neko"},
          {title: "Cuddle", rowId: ".anime cuddle"},
          {title: "Cry", rowId: ".anime cry"},
          {title: "Hug", rowId: ".anime hug"},
          {title: "Kiss", rowId: ".anime kiss"},
          {title: "lick", rowId: ".anime lick"},
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
    let buffer = await fetch(json.url).then(a => a.buffer())
    conn.sendButton(m.chat, 'Pecinta kartun!', author, buffer, [[`${type}`, `${usedPrefix}anime ${type}`]], m)
    
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