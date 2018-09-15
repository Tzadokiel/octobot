
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
    .addField(`Hey ! Bienvenue à bord ${member} ! Tu es ici sur le serveur dicord de la communauté ${member.guild.name}, tu es invité à lire le #reglement et à faire une petite afin que l'on te connaisse un peu plus !`)
    member.guild.channels.find("name", "accueil").send(embed);
    member.addRole(role);
});

bot.on('message', message => {

    if(!message.content.startsWith(prefix) || message.author.bot) return; // Si le message ne commence pas par le préfixe ou que c'est le bot on ignore

    // Récapitulatif des commandes disponible pour le bot
    if(message.content === prefix + 'help'){
        var helpEmbed = new Discord.RichEmbed()
        .setTitle('Help')
        .setColor(0x000F84)
        .setDescription('Recapitulatif des Commandes d\'Octobot !')
        .addField("Commande Attribution Rank" , "Overwatch ::overwatch");
        message.channel.send(helpEmbed);
    }

    // Aquisition et perte des ranks
        var listeRole = [
            "Rocket League",
            "League of Legend",
            "For Honor",
            "Overwatch",
            "PUBG",
            "Paladin",
            "Fortnite",
            "World of Warcraft",
            "CSGO",
            "Brawlhalla",
            "Battlefield 1",
            "Monster Hunter World",
            "Hearthstone",
            "GTA V",
            "Rainbow 6 : Siege",
            "War Thunder",
            "Mousse"
        ];

        listeRole.forEach(function(element){
            if(message.content.toLowerCase() === prefix + "role " + element.toLowerCase()){
                let roleAssign = message.member.guild.roles.find("name", element);
                
                if(!message.member.roles.find("name", element)){
                    var roleEmbed = new Discord.RichEmbed()
                    .setTitle('Auto-Assignation Rôle')
                    .setColor(0x00a51b)
                    .setAuthor(":: role", message.author.avatarURL)
                    .setDescription(`Bravo ! Tu as été ajouté à la liste des joueurs de **${element}** !!`);
                    message.channel.send(roleEmbed);
                    message.member.addRole(roleAssign);
                }else{
                    var roleEmbed = new Discord.RichEmbed()
                    .setTitle('Auto-Assignation Rôle')
                    .setColor(0xfc0043)
                    .setAuthor(":: role", message.author.avatarURL)
                    .setDescription(`Pale sans bleu ! Tu as été retiré de la liste des joueurs de **${element}** !!`);
                    message.channel.send(roleEmbed);
                    message.member.removeRole(roleAssign);
                }
            }
        });
});

bot.login(process.env.TOKEN);
