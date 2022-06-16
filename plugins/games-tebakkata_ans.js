import similarity from 'similarity'
const threshold = 0.72
export async function before(m, {isOwner}) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*tkata/i.test(m.quoted.text) || /.*(hint|tkata)/i.test(m.text))
        return !0
    this.tebakkata = this.tebakkata ? this.tebakkata : {}
    if (!(id in this.tebakkata))
        return conn.sendButton(m.chat, 'Soal itu telah berakhir', author, ['tebakkata', '/tebakkata'], m)
    let isSurrend = (/(me)?nyerah|surrend(e(r|d))?/.test(m.text) && (m.sender === this.tebakkata[id][4] || isOwner))
    if (m.quoted.id == this.tebakkata[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tebakkata[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebakkata[id][2]
            conn.sendButton(m.chat, `*Benar!*\n+${this.tebakkata[id][2]} XP`, author, ['tebakkata', '/tebakkata'], m)
            clearTimeout(this.tebakkata[id][3])
            delete this.tebakkata[id]
        } else if (isSurrend) {
          await this.sendButton(m.chat, `Yaahh Menyerah :(\nJawaban yg benar adalah *${json.jawaban}*`, author, null, [['Tebak Kata', '.tebakkata']], m)
          clearTimeout(this.tebakkata[id][3])
          delete this.tebakkata[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold)
            m.reply(`*Dikit Lagi!*`)
        else
            m.reply(`*Salah!*`)
    }
    return !0
}
export const exp = 0