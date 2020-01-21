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
		from: `Kento Nishi <kento@vikehacks.tech>`,
		to: email,
		subject: "WebDev Meeting",
		html: `
			Hello everyone,
			<br />
			<br />
			WebDev will have a meeting tomorrow at lunch as usual. Make sure you don't miss Sofia's first presentation!
			<br />
			<br />
			Sincerely,
			<br />
			Kento Nishi
			<br />
			Lead Developer
			`
	};
	promises.push(mg.messages().send(data));
});

Promise.all(promises).then(() => {
	console.log("Finished sending all emails");
});