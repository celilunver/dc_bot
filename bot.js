const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const search = require('yt-search');
const settings = require('./settings.json');

const prefix = settings.prefix;

var currentDispatcher = null;
client.on('ready', () => {
    console.log(`${client.user.tag} aktif`);
});

client.on('message', async message => {
    if (message.content === prefix + 'naber') {
        message.reply('Sanane!');
    }
    if (message.author.discriminator === '1141'/* Halil Paşanın Discriminator Değeri*/) {
        if (message.content ===  'sa') {
            message.reply('Ooo paşam merhaba hoş geldiniz');
        }
        
    }
    if (message.content === prefix + 'rip') {
        // Create the attachment using MessageAttachment
        const attachment = new Discord.MessageAttachment('https://i.imgur.com/w3duR07.png');
        // Send the attachment in the message channel with a content
        message.channel.send(`${message.author},`, attachment);
    }

    if (message.content === prefix + '6mercy') {
        message.reply('Ben murat nam-ı diğer acımasız muro hepinize merhaba.');
	}
	
	 if (message.content.toLowerCase() === prefix + "tanıtım") {
        message.reply('Ben UNVERTECH yapımı otonom önceden programlanmış,görevleri yerine getirebilen elektro-mekanik bir cihazım.TEŞEKKÜRLER UNVERTECH.');
    }
		 if (message.content.toLowerCase() === prefix + "unvertech") {
        message.reply('Biz UNVERTECH olarak 2015 yılında kurulmuş olup günümüze kadar faaliyet gösteren hem oyun alanında,hem programlama alanında büyük başarılara imza atmış bir şirketiz.Bizi tercih ettiğiniz için teşekkür ederiz.');
    }
	
	if (message.content === prefix + '6mercy') {
        message.reply('Ben murat nam-ı diğer acımasız muro hepinize merhaba.');
	}
	
	if (message.content === prefix + 'prosypie') {
        message.reply('Ben emirhan mekanın sahibi hepinize merhaba bizi bilen bilir ADANA ya selam olsun.');
	}
	
	
	
	if (message.content === prefix + 'gxon') {
        message.reply('Ben Hasan Rocket League oynayanlar eklesin 1vs1 atarız Halil PAŞA ya saygılar.');
	}	
	
	if (message.content === prefix + 'paşa') {
        message.reply('Ben Halil nam-ı diğer PAŞA UNVERTECH şirketinin CEO su ve administiratörüyüm herkese saygılar.');
	}	

   if (message.content.startsWith(prefix + "çal ")) {
	   try {
			if (message.member.voice.channel) {
				let url = message.content.replace(prefix+"çal ", "");
				if (!validURL(url)) {
					search(url, async function (err, res) {
						if (err) {
							message.channel.send("Bir şeyler yanlış gitti yeniden deneyin");
							console.log(err);
						}
						else if (res.videos && res.videos.length > 0) {
							let video = res.videos[0];
							const connection = await message.member.voice.channel.join();
							currentDispatcher = connection.play(ytdl(video.url, { filter: 'audioonly' }));
							message.channel.send(`${video.title} çalınıyor`);
						}
					})
				} else {
					const connection = await message.member.voice.channel.join();
					currentDispatcher = connection.play(ytdl(url, { filter: 'audioonly' }));
				}
			} else {
				message.reply('Önce sesli kanala geçmelisiniz!');
			}
		}
		catch(err) {
		  console.log("Müzik çalma hata");
		  console.log(err);
		  console.log(message);
		}
    }

    if (message.content === prefix + "sus") {
		try{
			if (currentDispatcher !== null) {
				currentDispatcher.destroy();
				currentDispatcher = null;
				message.channel.send('Müzik geçildi');
			}
		}catch(err){
		  console.log("Müzik susturma hata");
		  console.log(err);
		  console.log(message);
		}
    }
	
}
);
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

client.login(settings.token);