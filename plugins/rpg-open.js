/*Object.defineProperty(Number.prototype, 'getRan', {
  value: function(z) {
    if (isNaN(z)) {
      return Math.floor(Math.random() * (this+1))
    } else {
      if (z >= this) throw new Error(`Parameters cannot be greater than or equal to the main value`)
      return (Math.floor(Math.random() * (this+1-z))) + z
    }
  },
  enumerable: false
});
Object.defineProperty(Array.prototype, 'getRan', {
  value: function() {
    if (Array.isArray(this[0]) && this[0][0] === true) {
      if (this[0][2]) {
        if (Math.random() * 100 < this[0][1]) return this[1].getRan(this[0][2])
        else return this[2] ? this[2] : 0
      } else if (this[0][2] === null) {
        let newNum = this[1].getRan(this[0][3] ? this[0][3] : 0)
        if (Math.random() * 100 < this[0][1]) return newNum 
        else return this[2] ? this[2] : 0
      } else {
        if (Math.random() * 100 < this[0][1]) return this[1]
        else return this[2] ? this[2] : 0
      }
    } else if (Array.isArray(this[0]) && this[0][0] === false) {
      return this[1].getRan(this[0][1])
    } else if (this[0] === true) {
      let z = [...this]
      z.shift()
      return z.getRan().getRan()
    } else {
      return this[Math.floor(Math.random() * this.length)]
    }
  },
  enumerable: false
});*/

const sleep = (ms) => new Promise(resolve => setTimeout(function () {
    clearTimeout(this)
    resolve()
}, ms))

/* PETUNJUK:
[true,angka+] => mendapatkan angka random dari sebuah array, kemudian akan mendapatkan angka random lagi dari angka yg sudah didapatkan sebelumnya
[[true,angka1],angka2] => 


*/
//chance
const rewards = {
  common: {
    money: 100,
    exp: 70,
    trash: 11,
    potion: [[true, 20],1],
    common: [0,0,0,0,1,0,0,0,0,0],
    uncommon: [0,1,0,0,0,0,0,0,0,0,1,0,0,0]
  },
  uncommon: {
    money: 450,
    exp: 250,
    trash: 50,
    potion: [[true,35,null,1],2],
    diamond: [[true,30,null,1],2],
    common: [0,0,0,1,0,0],
    uncommon: [0,1,0,0,0,0,1,0],
    mythic: [[true,5],1],
    wood: [0,0,1,1,0,0,0],
    rock: [0,0,1,0,0,0,1],
    string: [0,0,1,0,1,0,0]
  },
  mythic: {
    money: 1000,
    exp: 500,
    trash: 100,
    potion: [[true,40,null,1],3],
    diamond: [[true,35,null,1],3],
    common: [0,1,0,0,2,0,0,1,0,1,0],
    uncommon: [0,1,0,0,0,1,0,0,1,0],
    mythic: [0,0,0,0,1,0,0,0,0],
    legendary: [0,0,0,0,0,0,1,0,0,0,0,0],
    wood: [[true,40,null,1],4],//[true,2,0,2,0,2,0,1,0,1,2,0,3,0,1,0,2,0],
    rock: [[true,40,null,1],4],
    string: [[true,40,null,1],4],
    pet: [[true,1],1]
  },
  legendary: {
    money: 2500,
    exp: 1000,
    trash: 225,
    potion: [[true,40,null,1],5],
    diamond: [[true,35,null,1],5],
    common: [[true,35,null,1],4],
    uncommon: [[true,30,null,1],4],
    mythic: [[true,20,null],3],
    legendary: [[true,5],1],
    wood: [[true,45,null,1],5],
    rock: [[true,45,null,1],5],
    string: [[true,45,null,1],5],
    pet: [[true,4,null],1],
    emerald: [[true,1,null],1]
    //emerald: [[true,1,null],1]
  },
}
/*let user = {
  legendary: 100,
  mythic: 10,
  uncommon: 10,
  common: 10
}*/
/*let int = setInterval(() => {
  let a = rewards.mythic.wood.getRan()
  console.log(a);
}, 500)*/

const isNumber = (number) => {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}

let handler = async (m, {conn, command, args, usedPrefix,isROwner}) => {
  //m.reply(`Tunggu sebentar`)
  let user = global.db.data.users[m.sender]
  let listCrate = Object.fromEntries(Object.entries(rewards).filter(([v]) => v && v in user))
  let info = `
Use Format *${usedPrefix}${command} [crate] [count]*
Usage example: *${usedPrefix}${command} common 10*

📍Crate list: 
${Object.keys(listCrate).map((v) => `
${rpg.emoticon(v)}${v}
`.trim()).join('\n')}
`.trim() 
  let type = (args[0] || '').toLowerCase()
  let count = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]),1),1000) : 1) * 1
  let isOver1000 = isNumber(args[1]) && (parseInt(args[1]) >= 1000)
  if (!(type in listCrate)) return m.reply(info)
  if (user[type] < count) return m.reply(`
Your *${rpg.emoticon(type)}${type} crate* is not enough!, you only have ${user[type]} *${rpg.emoticon(type)}${type} crate*
type *${usedPrefix}buy ${type} ${count - user[type]}* to buy
`.trim())
  let crateReward = {}
  for (let i = 0; i < count; i++) {
    for (let [reward, value] of Object.entries(listCrate[type])) {
      const total = value.getRan()
      if (total) {
        user[reward] += total * 1
        crateReward[reward] = (crateReward[reward] || 0) + (total * 1)
      }
    }
  }
  user[type] -= count * 1
  m.reply(`
You have opened *${count}* ${global.rpg.emoticon(type)}${type} crate and got:
${Object.keys(crateReward).filter(v => v && crateReward[v] && !/legendary|pet|mythic|diamond|emerald/i.test(v)).map(reward => `
*${global.rpg.emoticon(reward)}${reward}:* ${crateReward[reward]}
`.trim()).join('\n')}
`.trim())
await sleep(250)
    let diamond = crateReward.diamond, mythic = crateReward.mythic, pet = crateReward.pet, legendary = crateReward.legendary, emerald = crateReward.emerald
    if (mythic || diamond) m.reply(`
Congrats you got a rare item, which is ${diamond ? `*${diamond}* ${rpg.emoticon('diamond')}diamond` : ''}${diamond && mythic ? 'and ' : ''}${mythic ? `*${mythic}* ${rpg.emoticon('mythic')}mythic` : ''}
`.trim())
await sleep(250)
    if (pet || legendary || emerald) m.reply(`
Congrats you got a epic item, which is ${pet ? `*${pet}* ${rpg.emoticon('pet')}pet` : ''}${pet && legendary && emerald ? ', ' : (pet && legendary || legendary && emerald || emerald && pet) ? 'and ' : ''}${legendary ? `*${legendary}* ${rpg.emoticon('legendary')}legendary` : ''}${pet && legendary && emerald ? 'and ' : ''}${emerald ? `*${emerald}* ${rpg.emoticon('emerald')}emerald` : ''}
`.trim())
  
  
}
handler.help = ["open", "gacha"].map(z => `${z} <crate> [jumlah]`)
handler.command = /^(open(chest|crate)?|gacha)$/i
handler.tags = ["rpg"]

handler.exp = 0

//module.exports = handler
export default handler