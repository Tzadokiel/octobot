const Discord = require('discord.js'); // Récupération de la bibliothèque discord
const bot = new Discord.Client(); // Création du client bot discord
const prefix = '::'; // Préfixe utiliser pour les commandes

// Création de la base de donnée
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('database.json');
const db = low(adapter); // Base de donnée

bot.on('ready', () => {
    bot.user.setActivity('Prépare la planche', {type: 'PLAYING'}); // Assignation du jeu auquel joue au bot
});

bot.on('guildMemberAdd', member =>{
    let role = member.guild.roles.find("name", "Mousse");
    const embed = new Discord.RichEmbed()
    .setTitle('Nouvel Arrivant')
    .setColor(0x000F84)
    .addField(`Hey ! Bienvenue à bord ${member.user.username} ! Tu es ici sur le serveur dicord de la communauté ${member.guild.name}, tu es invité à lire le #reglement et à faire une petite afin que l'on te connaisse un peu plus !`)
    member.guild.channels.find("name", "accueil").send(embed);
    member.addRole(role);
});

bot.on('message', message => {

    if(!message.content.startsWith(prefix)) return; // Si le message ne commence pas par le préfixe on ignore
    
    if(message.content === prefix + 'ping'){
    message.reply('pong reply'); // Répond avec le nom en @
    message.channel.send('pong channel.send'); // Répond sans le nom
    }

    // Récapitulatif des commandes disponible pour le bot
    if(message.content === prefix + 'help'){
        var helpEmbed = new Discord.RichEmbed()
        .setTitle('Help')
        .setColor(0x000F84)
        .setDescription('Recapitulatif des Commandes d\'Octobot !')
        .addField("Commande Attribution Rank" , "Overwatch ::overwatch");
        message.channel.send(helpEmbed);
    }
});

bot.login(process.env.TOKEN);
