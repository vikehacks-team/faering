const mailgun = require("mailgun-js");
const DOMAIN = "vikehacks.tech";
var fs = require('fs');

var jsonConfiguration = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const mg = mailgun({
	apiKey: process.env.MailgunApiKey,
	domain: "vikehacks.tech"
});

var promises = [];
jsonConfiguration.emails.forEach(email => {
	const data = {
		from: `Michael Peng <michael@vikehacks.tech>`,
		to: email,
		subject: "VikeHacks Update",
		html: `
			Hello everyone,
			<br><br>
			Thank you all very much for your interest in Vikehacks. Due to unfortunate circumstances, the date and location of VikeHacks still remains unconfirmed at this time. We will be keeping you up to date by email once the details are confirmed.
			<br><br>
			If you have any questions, please feel free to contact us at michael@vikehacks.tech.
			<br><br>
			Thanks,<br>
			Vikehacks Organizers
			`
	};
	promises.push(mg.messages().send(data));
});

Promise.all(promises).then(() => {
	console.log("Finished sending all emails");
});