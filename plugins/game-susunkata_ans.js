import similarity from 'similarity'
const threshold = 0.72
export async function before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*skata/i.test(m.quoted.text) || /.*(skata|bantuan)/i.test(m.text))
        return !0
    this.susunkata = this.susunkata ? this.susunkata : {}
    if (!(id in this.susunkata))
        return m.reply('Soal itu telah berakhir')
    if (m.quoted.id == this.susunkata[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.susunkata[id][1]))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.susunkata[id][2]
            await this.sendButton(m.chat, `*Benar!* +${this.susunkata[id][2]} XP`, author, null, [['Susun Kata', '.susunkata']], m)
            clearTimeout(this.susunkata[id][3])
            delete this.susunkata[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold)
            m.reply(`*Dikit Lagi!*`)
        else
            m.reply(`*Salah!*`)
    }
    return !0
}
export const exp = 0