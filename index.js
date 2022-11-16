const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, ActivityType } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}


client.once('ready', () => {
});



client.on('interactionCreate', async interaction => {
	const command = client.commands.get(interaction.commandName);

	const { commandName } = interaction;

	if (commandName === 'status') {
		if (interaction.options.get('status').value === 'idle') {
			client.user.setStatus('idle');
		} else if (interaction.options.get('status').value === 'online') {
			client.user.setStatus('online');
		} else if (interaction.options.get('status').value === 'offline') {
			client.user.setStatus('dnd');
		}
	}

	if (commandName === 'opis') {
		if (interaction.options.get('typ').value === 'Competing') {
			client.user.setActivity(interaction.options.getString('tekst'),	 {type: ActivityType.Competing});
		} else if (interaction.options.get('typ').value === 'Listening') {
			client.user.setActivity(interaction.options.getString('tekst'),	 {type: ActivityType.Listening});
		} else if (interaction.options.get('typ').value === 'Playing') {
			client.user.setActivity(interaction.options.getString('tekst'),	 {type: ActivityType.Playing});
		} else if (interaction.options.get('typ').value === 'Watching') {
			client.user.setActivity(interaction.options.getString('tekst'),	 {type: ActivityType.Watching});
		}
	}
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);