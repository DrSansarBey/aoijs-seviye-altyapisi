const Aoijs = require("aoi.js")
const bot = new Aoijs.Bot({
  mobile: true, 
  token: "TOKEN",
  prefix: ["$getServerVar[prefix]"]})

bot.onMessage()
bot.loadCommands(`./commands/`)
//vaiableler 
bot.variables({kmt:"false",
lvl:"0",
xp:"0",
log:"0",
prefix:"c!",})
//seviye sistemleri
bot.command({name:"$alwaysExecute",
code:`$setUserVar[xp;$sum[$getUserVar[xp];1]]
$onlyIf[$getServerVar[kmt]!=false;]`,
nonPrefixed: true})  

bot.command({name:"$alwaysExecute",
code:`$setUserVar[xp;$sub[$getUserVar[xp];100]]
$setUserVar[lvl;$sum[$getUserVar[lvl];1]]
<@$authorID> Tebrikler sohbette aktif olduğun için seviye atladın! Yeni seviyen $sum[$getUserVar[lvl];1]
$useChannel[$getServerVar[log]]
$onlyIf[$getUserVar[xp]>101;]
$onlyIf[$getServerVar[kmt]!=false;]`,
nonPrefixed: true}) 
//komutlar
bot.command({name: "seviye-log",
code: `$setServerVar[log;$replaceText[$replaceText[$message;ayarla;$mentionedChannels[1;yes];1];sıfırla;;1]] 
Seviye sistemi başarı ile $replaceText[$replaceText[$message;aç;açıldı;1];kapat;kapatıldı;1] !
$replaceText[$replaceText[$message;aç;Seviye log <#$mentionsChannels[1;yes] olarak ayarlandı.;1];sıfırla;Seviye log sıfırlandı. ;1]
$argsCheck[>1;Seviye logu ayarlayacak mıyım sıfırlayacak mıyım?]
$onlyIf[$hasPerms[$authorID;admin]!=false;Bu komutu lullanmak için \`Yönetici\` yetkin olmalı!]`})  
bot.command({name: "seviye",
code: `$setServerVar[kmt;$replaceText[$replaceText[$message;aç;true;1];kapat;false;1]] 
Seviye sistemi başarı ile $replaceText[$replaceText[$message;aç;açıldı;1];kapat;kapatıldı;1]!
$argsCheck[>1;Sistemi açacak mıyım kapatacak mıyım?]
$onlyIf[$hasPerms[$authorID;admin]!=false;Bu komutu lullanmak için \`Yönetici\` yetkin olmalı!]`}) 
bot.command({name:"rank",
code:`$title[Seviye kartı]$description[<@$mentioned[1;yes]>'nın Seviye kartı
Seviye: $getUserVar[lvl;$mentioned[1;yes]]
xp: $getUserVar[xp;$mentioned[1;yes]]]`})
