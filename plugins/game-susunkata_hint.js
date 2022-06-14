let handler = async (m, { conn }) => {
    conn.susunkata = conn.susunkata ? conn.susunkata : {}
    let id = m.chat
    if (!(id in conn.susunkata)) throw false
    let json = conn.susunkata[id][1]
    let clue = json.tipe//ans.replace(/[AIUEO]/gi, '_')
    m.reply(`Petunjuk: Jawabannya terkait dengan *\`${clue}\`*`)
}
handler.command = /^skata$/i

handler.limit = true

export default handler