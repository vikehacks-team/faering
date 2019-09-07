const mailgun = require("mailgun-js");
const DOMAIN = "vikehacks.tech";
var fs = require('fs');

var jsonConfiguration = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const mg = mailgun({ 
	apiKey: process.env.mailgun-api-key, 
	domain: "vikehacks.tech" 
});
const variables = {
	recipient_first_name: jsonConfiguration.recipient_first_name,
	your_first_name: jsonConfiguration.your_first_name,
	your_role: jsonConfiguration.your_role,
	hackathon_month: jsonConfiguration.hackathon_month,
	reasons_paragraph: jsonConfiguration.reasons_paragraph,
	your_full_name: jsonConfiguration.your_full_name
};
const data = {
	from: "Kento Nishi <kento@vikehacks.tech>",
	to: "kento@vikehacks.tech",
	subject: "Hackathon Sponsorship",
	template: "sponsor_email",
	'h:X-Mailgun-Variables': JSON.stringify(variables)
};
mg.messages().send(data, function (error, body) {
	console.log(body);
});