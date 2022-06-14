import { twitterdlv2 } from '@bochilteam/scraper'
let handler = async (m, { conn, args, usedPrefix, command }) => {
  return m.reply(`Fitur *Downloader* Sedang Error!`);
    if (!args[0]) throw `uhm. urlnya mana?\n\ncontoh:\n${usedPrefix + command} https://twitter.com/gofoodindonesia/status/1229369819511709697`
    let res = await twitterdlv2(args[0])
    const { url, quality, type } = res[1]
    conn.sendFile(m.chat, url, 'twitter' + (type == 'image' ? '.jpg' : '.mp4'), quality, m)
}
handler.help = ['twitter'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(twitter)$/i
//handler.limit = true

export default handler
