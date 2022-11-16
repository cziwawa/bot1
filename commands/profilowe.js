const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('opis')
    	.setDescription('Zmienia Opis Bota')
	    .addStringOption(option =>
	    	option.setName('tekst')
	    		.setDescription('Tekst Który Będzie Wyświetlany')
	    		.setRequired(true))
        .addStringOption(option =>
        option.setName('typ')
            .setDescription('Rzeczownik Który Będzie Wyświetlany Przed Tekstem')
            .setRequired(true)
            .addChoices(
                { name: 'Rywaluzje w:', value: 'Competing' },
                { name: 'Słucha', value: 'Listening' },
                { name: 'W grze', value: 'Playing' },
                { name: 'Ogląda', value: 'Watching' }
                )),
    async execute(interaction) {
    await interaction.reply({
        content: `Ustawiono Status '${interaction.options.getString('tekst')}', Typ ${interaction.options.get('typ').value}`, ephemeral: true})
    }
};