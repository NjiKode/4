let handler = async (m, { conn, usedPrefix }) => conn.sendButton(m.chat, `“Silahkan chat owner”`, author, ['ඩOwner', `${usedPrefix}owner`], m)

handler.help = ['premium']
handler.tags = ['tools']
handler.command = /^(premium)$/i

export default handler
