const mailgun = require("mailgun-js");
const DOMAIN = "vikehacks.tech";
var fs = require('fs');

var jsonConfiguration = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const mg = mailgun({
	apiKey: process.env.MailgunApiKey,
	domain: "vikehacks.tech"
});

var promises = [];
jsonConfiguration.emails.forEach(emailConfiguration => {
	const variables = {
		your_first_name: jsonConfiguration.your_first_name,
		your_role: jsonConfiguration.your_role,
		hackathon_month: jsonConfiguration.hackathon_month,
		reasons_paragraph: emailConfiguration.reasons_paragraph,
		recipient_first_name: emailConfiguration.recipient_first_name,
		your_full_name: jsonConfiguration.your_full_name,
		date: jsonConfiguration.date
	}
	const data = {
		from: `${jsonConfiguration.your_full_name} <${jsonConfiguration.your_vikehacks_email}>`,
		to: emailConfiguration.recipient_email,
		subject: "Hackathon Sponsorship",
		template: "sponsor_email",
		'h:X-Mailgun-Variables': JSON.stringify(variables)
	};
	promises.push(mg.messages().send(data));
});

Promise.all(promises).then(() => {
	console.log("Finished sending all emails");
});