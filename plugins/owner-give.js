const delay = ms => new Promise(resolve => setTimeout(function () {
    clearTimeout(this)
    resolve()
}, ms))

let handler = async (m, {conn, args}) => {
  if (args.length < 3) return m.reply(`Missing Argument`)
  console.log(args)
  m.reply(args)
  let arg
  if (args[0] === "me") arg = m.sender
  else arg = args[0]
  let arg2 = args[1]
  let arg3 = args[2]
  
  let user = global.db.data.users[arg]
  let last = user[arg2]
  delay(500);
  user[arg2] = arg3 
  
  let newUser = global.db.data.users[arg][arg2]
  
  m.reply(`From: ${last}\nTo: ${newUser}`)
  
};

handler.help = ["give"]
handler.command = /^give$/i
//handler.tags = ["advanced"]
handler.rowner = true

export default handler