const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const search = require('yt-search');
const settings = require('./settings.json');

const prefix = settings.prefix;

var playlist = [];
var currentDispatcher = null;

let currentVoiceChannel = null;
var voiceChannel = null;

client.commands = new Discord.Collection();

var props = require("./temizle.js");
client.commands.set(props.help.name, props);

props = require("./yardim.js");
client.commands.set(props.help.name, props);

client.on('ready', () => {
    console.log(`${client.user.tag} aktif`);
});

client.on('message', async message => {

    if (message.content === prefix + 'naber') {
        message.reply('Sanane!');
    }

    if (message.author.discriminator === '1141'/* Halil Paşanın Discriminator Değeri*/) {
        if (message.content === 'sa') {
            message.reply('Ooo paşam merhaba hoş geldiniz');
        }

    }

    if (message.content === prefix + 'rip') {
        // Create the attachment using MessageAttachment
        const attachment = new Discord.MessageAttachment('https://i.imgur.com/w3duR07.png');
        // Send the attachment in the message channel with a content
        message.channel.send(`${message.author},`, attachment);
    }

    if (message.content.toLowerCase() === prefix + "tanıtım") {
        message.reply('Ben UNVERTECH yapımı otonom önceden programlanmış,görevleri yerine getirebilen elektro-mekanik bir cihazım.TEŞEKKÜRLER UNVERTECH.');
    }

    if (message.content.toLowerCase() === prefix + "unvertech") {
        message.reply('Biz UNVERTECH olarak 2015 yılında kurulmuş olup günümüze kadar faaliyet gösteren hem oyun alanında,hem programlama alanında büyük başarılara imza atmış bir şirketiz.Bizi tercih ettiğiniz için teşekkür ederiz.');
    }

    if (message.content.startsWith(prefix + "çal ")) {
        try {
            if (message.member.voice.channel) {
                if (voiceChannel === null || message.member.voice.channel.name != currentVoiceChannel) {
                    voiceChannel = await message.member.voice.channel.join();
                    currentVoiceChannel = message.member.voice.channel.name;
                }

                let url = message.content.replace(prefix + "çal ", "");
                if (!validURL(url)) {
                    search(url, async function (err, res) {
                        if (err) {
                            message.channel.send("Bir şeyler yanlış gitti yeniden deneyin");
                            console.log(err);
                        }
                        else if (res.videos && res.videos.length > 0) {
                            let video = res.videos[0];
                            if (currentDispatcher != null)
                                message.channel.send(`${video.title} listeye eklendi`);
                            else
                                message.channel.send(`${video.title} çalınıyor`);

                            Play(video.url, message.member.voice.channel, message.channel);
                        }
                    })
                } else {
                    Play(url, message.member.voice.channel, message.channel);
                }
            } else {
                message.reply('Önce sesli kanala geçmelisiniz!');
            }
        }
        catch (err) {
            console.log("Müzik çalma hata");
            console.log(err);
            console.log(message);
        }
    }

    if (message.content === prefix + "sus") {
        try {
            if (currentDispatcher !== null) {
                currentDispatcher.destroy();
                message.channel.send("Müzik geçildi");
                NextSong();
            }
        } catch (err) {
            console.log("Müzik susturma hata");
            console.log(err);
            console.log(message);
        }
    } 

    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0];
    let args = messageArray.length > 1 ? messageArray[1] : "";

    if (!command.startsWith(prefix)) return;
    let cmd = client.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(client, message, args);

});

function Play(url, textChannel) {
    if (currentDispatcher == null) {
        currentDispatcher = voiceChannel.play(ytdl(url, { filter: 'audioonly' }));
        
        currentDispatcher.on('finish', () => {
            NextSong();
        });
    } else {
        playlist.push({ url, voiceChannel, textChannel });
    }
}

function NextSong() {
    currentDispatcher = null;
    if (playlist.length > 0) {
        var musicInfo = playlist.shift();
        Play(musicInfo.url, musicInfo.voiceChannel, musicInfo.textChannel);
    } else {
        if (voiceChannel !== null) {
            voiceChannel.disconnect();
            voiceChannel = null;
            currentVoiceChannel = null;
        }
    }
}

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