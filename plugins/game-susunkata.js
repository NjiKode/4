import { susunkata } from "@bochilteam/scraper"

let timeout = 120000
let poin = 3999

let handler = async (m, {conn, usedPrefix}) => {
  conn.susunkata = conn.susunkata ? conn.susunkata : {}
  let id = m.chat
  if (id in conn.susunkata) return conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.susunkata[id][0])
  let json = await susunkata()
  let caption = `
${json.soal}
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}skata untuk bantuan
_Reply pesan ini untuk menjawab_
Bonus: ${poin} XP
`.trim()
  conn.susunkata[id] = [
    await conn.sendButton(m.chat, caption, author, null, [["Bantuan", `${usedPrefix}skata`], ["Nyerah", "menyerah"]], m),
    json, poin,
    setTimeout(async () => {
      if (conn.susunkata[id]) await conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, author, null, [["Susun Kata", `${usedPrefix}susunkata`]], conn.susunkata[id][0])
      delete conn.susunkata[id]
    }, timeout), m.sender
  ]
  
}

handler.help = ["susunkata"]
handler.tags = ["game"]
handler.command = /^susunkata/i

export default handler