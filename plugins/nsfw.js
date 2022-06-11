import fetch from "node-fetch"


let handler = async (m, {conn, command}) => {
  
  if (command === "nsfwglass") command = "glasses"
  if (command === "nsfwfoot") command = "foot"
  let api = `https://api-yogipw.herokuapp.com/api/nsfw/${command}`
  try {
    let result = await fetch(api).then(a => a.json()).then(b => b.result)
    let buffer = await fetch(result).then(c => c.buffer())
    await conn.sendFile(m.chat, buffer, `nsfw-${command}`, '', m)
  } catch (err) {
    m.reply(`Terjadi Error, Silahkan Coba Lagi!`)
    return console.log(err)
  }
}

handler.help = ["ass", "ahegao", "bdsm", "blowjob", "cuckold", "cum", "ero", "nsfwfoot", "nsfwglass", "hentai", "hentaigif", "jahy", "masturbate", "nsfwneko", "orgy", "panties", "pussy", "yuri", "thighs"]
handler.tags = ["nsfw"]
handler.command = /^ass|ahegao|bdsm|blowjob|cuckold|cum|ero|nsfw(foot|glass|neko)|hentai(gif)?|jahy|masturbate|orgy|panties|pussy|yuri|thighs$/i
handler.nsfw = true
handler.limit = true
handler.level = 10