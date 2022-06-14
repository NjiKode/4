let handler = async (m, { conn }) => {
    conn.asahotak = conn.asahotak ? conn.asahotak : {}
    let id = m.chat
    if (!(id in conn.asahotak)) throw false
    let json = conn.asahotak[id][1]
    let ans = json.jawaban
    let clue = ans.replace(/[AIUEO]/gi, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^asah$/i

handler.limit = true

export default handler