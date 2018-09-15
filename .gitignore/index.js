const Discord = require('discord.js'); // Récupération de la bibliothèque discord
const bot = new Discord.Client(); // Création du client bot discord
const prefix = '::'; // Préfixe utiliser pour les commandes

// Création de la base de donnée
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('database.json');
const db = low(adapter); // Base de donnée

bot.on('ready', () => {
    bot.user.setActivity('Imiter le Kraken', {type: 'PLAYING'}); // Assignation du jeu auquel joue au bot
});

bot.on('guildMemberAdd', member =>{
    let role = member.guild.roles.find("name", "Mousse");
    const embed = new Discord.RichEmbed()
    .setTitle('Nouvel Arrivant')
    .setColor(0x000F84)
    .setAuthor("Bienvenue à bord !", message.author.avatarURL)
    .addDescription(`Hey ! Salut à toi ${member} ! Tu es ici sur le serveur dicord de la communauté ${member.guild.name}, tu es invité à lire le #reglement et à faire une petite afin que l'on te connaisse un peu plus !`)
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
        .addField("Préfixe pour utiliser le bot", "Le préfixe à utiliser avec le bot pour toutes les commandes est **::**")
        .addField("::game" , "Les commandes pour s'attribuer ou retirer un jeu, les majuscules ne sont pas prises en compte Exemple: *::game overwatch*")
        .addField("::jeu", "La commande pour afficher les jeux disponibles sur le Discord");
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

    var reussite = 0;

    if(message.content.split(" ")[0] === prefix + "game"){
        listeRole.forEach(function(element){
            if(message.content.toLowerCase() === prefix + "game " + element.toLowerCase()){
                reussite = 1;
                let roleAssign = message.member.guild.roles.find("name", element);
                if(!message.member.roles.find("name", element)){
                    var roleEmbed = new Discord.RichEmbed()
                    .setTitle('Jeu Ajouté')
                    .setColor(0x00a51b)
                    .setAuthor("Assignation des Jeux", message.author.avatarURL)
                    .setDescription(`Bravo ! Tu as été ajouté à la liste des joueurs de **${element}** !!`);
                    message.channel.send(roleEmbed);
                    message.member.addRole(roleAssign);
                }else{
                    var roleEmbed = new Discord.RichEmbed()
                    .setTitle('Jeu Retiré')
                    .setColor(0xdd6300)
                    .setAuthor("Assignation des Jeux", message.author.avatarURL)
                    .setDescription(`Pale sans bleu ! Tu as été retiré de la liste des joueurs de **${element}** !!`);
                    message.channel.send(roleEmbed);
                    message.member.removeRole(roleAssign);
                }
            }else{
                if(reussite === 0){
                    reussite = 2;
                }
            }
        });
    }

    if(reussite === 2){
        var roleEmbed = new Discord.RichEmbed()
        .setTitle('Erreur')
        .setColor(0xfc0043)
        .setAuthor("Assignation des Jeux", message.author.avatarURL)
        .setDescription(`Attention le jeu **${message.content.split(" ")[1]}** n'éxiste pas !! Utilisez la commande **::jeux** pour connaitre les jeux présents sur le discord`);
        message.channel.send(roleEmbed);
    }

    var listeAfficheJeux = "";
    listeRole.forEach(function(element){
        listeAfficheJeux += "\n" + element;
    });
    
    if(message.content === prefix + "jeux"){
        var roleEmbed = new Discord.RichEmbed()
        .setTitle('Jeux Disponibles')
        .setColor(0x000F84)
        .setDescription(`Voici la liste des jeux disponibles sur ${message.guild.name} : ${listeAfficheJeux}`);
        message.channel.send(roleEmbed)
    }
    
});

bot.login(process.env.TOKEN);
