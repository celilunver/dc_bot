exports.run = function (client, message, count) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Bu Komutu Kullanmak İçin İzniniz Yok!");
    if (!count) return message.channel.send(`**Lütfen Silinicek Mesaj Miktarını Yazın.!**`);
	try {
        message.channel.bulkDelete(count).then(() => {
            message.channel.send(`${count} Adet Mesajı Sildim. `).then(msg => msg.delete(count));
		})
    } catch (e) {
        console.log("Mesaj silme hatası: " + e);
	}
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['sil', 'temizle', 'süpür'],
    permLevel: 2
};

exports.help = {
    name: 'temizle',
    description: 'Belirlenen miktarda mesajı siler.',
    usage: 'temizle <silinicek mesaj sayısı>'
};