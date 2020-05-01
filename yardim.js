const Discord = require("discord.js")

exports.run = function (client, message, arg) {
    const embed = new Discord.MessageEmbed();
    let info = "Yardım Paneli \n Komutlar \n\n"

        + "**!naber** \n"
        + "bot'un halini hatrını sormanızı sağlar\n\n"

        + "**!rip** \n"
        + "RİP\n\n"

        + "**!tanıtım** \n"
        + "Kendimi tanıtırım\n\n"

        + "**!unvertech** \n"
        + "Unvertech şirketini tanıtırım\n\n"

        + "**!çal** \n"
        + "Müzik listesine şarkı ekler ve oynatır. Link yada aradıgınız sarkı kelimelerini yazabilirsiniz\n\n"

        + "**!temizle [ADET]** \n"
        + "Belirtilen miktarda mesajı siler.\n\n";

    message.channel.send(embed.setDescription(info));
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['yardim'],
    permLevel: 2
};

exports.help = {
    name: 'yardım',
    description: 'Yardım bilgileri.',
    usage: '!yardım'
};