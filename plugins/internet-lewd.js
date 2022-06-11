// lewd
import fetch from 'node-fetch'

let handler = async(m, { conn }) => {
    let img = await fetch(`https://storage.caliph71.xyz/img/lewd/${gr()+'.png'}`).then(a => a.buffer())
    await conn.sendFile(m.chat, img, 'lewn.png', '', m)
}
handler.help = ['lewd']
handler.tags = ['nsfw']
handler.command = /^lewd$/i
handler.nsfw = true
handler.limit = true
handler.level = 5
export default handler
function gr() {
  return Math.floor(Math.random() * 400) + 10;
}
