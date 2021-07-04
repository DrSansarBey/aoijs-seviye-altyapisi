const Aoijs = require("aoi.js")
const bot = new Aoijs.Bot({
  mobile: true, 
  token: "TOKEN",
  prefix: ["$getServerVar[prefix]"]})

bot.onMessage()
bot.loadCommands(`./commands/`)
 
bot.variables({
  kmt:"false",
  lvl:"0",
  xp:"0",
  log:"0",
  prefix:"c!",
})
//seviye sistemleri
bot.command({
  name:"$alwaysExecute",
  code:`$setUserVar[xp;$sum[$getUserVar[xp];1]]
  $onlyIf[$getServerVar[kmt]!=false;]
`,
  nonPrefixed: true

})  

bot.command({
  name:"$alwaysExecute",
  code:`$setUserVar[xp;$sub[$getUserVar[xp];100]]
$setUserVar[lvl;$sum[$getUserVar[lvl];1]]
<@$authorID> Tebrikler sohbette aktif olduğun için seviye atladın! Yeni seviyen $sum[$getUserVar[lvl];1]
$useChannel[$getServerVar[log]]
$onlyIf[$getUserVar[xp]>101;]
$onlyIf[$getServerVar[kmt]!=false;] 
`,
  nonPrefixed: true
}) 
   
