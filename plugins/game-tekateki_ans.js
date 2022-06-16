import similarity from 'similarity'
const threshold = 0.72
export async function before(m, {isOwner}) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*teka/i.test(m.quoted.text) || /.*(teka|bantuan)/i.test(m.text))
        return !0
    this.tekateki = this.tekateki ? this.tekateki : {}
    if (!(id in this.tekateki))
        return m.reply('Soal itu telah berakhir')
    let isSurrend = (/(me)?nyerah|surrend(e(r|d))?/.test(m.text) && (m.sender === this.tekateki[id][4] || isOwner))
    if (m.quoted.id == this.tekateki[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tekateki[id][1]))
        if (m.text.toLowerCase().replace(/ -/g, "") == json.jawaban.toLowerCase().trim().replace(/ -/g, "")) {
            global.db.data.users[m.sender].exp += this.tekateki[id][2]
            await this.sendButton(m.chat, `*Benar!* +${this.tekateki[id][2]} XP`, author, null, [['Teka Teki', '.tekateki']], m)
            clearTimeout(this.tekateki[id][3])
            delete this.tekateki[id]
        } else if (isSurrend) {
          await this.sendButton(m.chat, `Yaahh Menyerah :(\nJawaban yg benar adalah *${json.jawaban}*`, author, null, [['Teka Teki', '.tekateki']], m)
          clearTimeout(this.tekateki[id][3])
          delete this.tekateki[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold)
            m.reply(`*Dikit Lagi!*`)
        else
            m.reply(`*Salah!*`)
    }
    return !0
}
export const exp = 0