const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
   		.setName('status')
		.setDescription('Ustawia Status Bota')
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers)
		.addStringOption(option =>
			option.setName('status')
				.setDescription('Dostępne Opcje')
				.setRequired(true)
				.addChoices(
					{ name: 'Online', value: 'online' },
					{ name: 'Offline', value: 'offline' },
					{ name: 'Nie przeszkadzać', value: 'idle' },
				)),
    async execute(interaction) {
		await interaction.reply({
			content: `Ustawiono Status ${interaction.options.get('status').value}`,
			ephemeral: true
		})
	}
};