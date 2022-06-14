import { tekateki } from "@bochilteam/scraper"

let timeout = 120000
let poin = 4999

let handler = async (m, {conn, usedPrefix}) => {
  conn.tekateki = conn.tekateki ? conn.tekateki : {}
  let id = m.chat
  if (id in conn.tekateki) return conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tekateki[id][0])
  let json = await tekateki()
  let caption = `
${json.soal}
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}calo untuk bantuan
Bonus: ${poin} XP
`.trim()
  conn.tekateki[id] = [
    await conn.sendButton(m.chat, caption, author, null, [["Bantuan", `${usedPrefix}teka`]], m),
    json, poin,
    setTimeout(async () => {
      if (conn.tekateki[id]) await conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, author, null, [["Teka Teki", `${usedPrefix}tekateki`]], conn.tekateki[id][0])
      delete conn.tekateki[id]
    }, timeout)
  ]
  
}

handler.help = ["tekateki"]
handler.tags = ["game"]
handler.command = /^tekateki/i

export default handler