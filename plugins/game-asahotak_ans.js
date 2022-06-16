import similarity from 'similarity'
const threshold = 0.72
export async function before(m, {isOwner}) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*asah/i.test(m.quoted.text) || /.*(asah|bantuan)/i.test(m.text))
        return !0
    this.asahotak = this.asahotak ? this.asahotak : {}
    if (!(id in this.asahotak))
        return m.reply('Soal itu telah berakhir')
    let isSurrend = (/(me)?nyerah|surrend(e(r|d))?/i.test(m.text) && (m.sender === this.asahotak[id][4] || isOwner))
    if (m.quoted.id == this.asahotak[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.asahotak[id][1]))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.asahotak[id][2]
            await this.sendButton(m.chat, `*Benar!* +${this.asahotak[id][2]} XP`, author, null, [['Asah Otak', '.asahotak']], m)
            clearTimeout(this.asahotak[id][3])
            delete this.asahotak[id]
        } else if (isSurrend) {
          await this.sendButton(m.chat, `Yaahh Menyerah :(\nJawaban yg benar adalah *${json.jawaban}*`, author, null, [['Asah Otak', '.asahotak']], m)
          clearTimeout(this.asahotak[id][3])
          delete this.asahotak[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold)
            m.reply(`*Dikit Lagi!*`)
        else
            m.reply(`*Salah!*`)
    }
    return !0
}
export const exp = 0