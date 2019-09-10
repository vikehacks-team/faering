const mailgun = require("mailgun-js");
var fs = require('fs');
var http = require('http');
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
const DOMAIN = "vikehacks.tech";
var app = express();
app.use("/sponsorship-sender",bodyParser.json());


app.post('/sponsorship-sender', function (req, res) {
	var jsonConfiguration = JSON.parse(fs.readFileSync('config.json', 'utf8'));
	const mg = mailgun({ 
		apiKey: process.env.MailgunApiKey, 
		domain: "vikehacks.tech" 
	});
	const variables = {
		recipient_first_name: jsonConfiguration.recipient_first_name,
		your_first_name: jsonConfiguration.your_first_name,
		your_role: jsonConfiguration.your_role,
		hackathon_month: jsonConfiguration.hackathon_month,
		reasons_paragraph: jsonConfiguration.reasons_paragraph,
		your_full_name: jsonConfiguration.your_full_name
	}
	const data = {
		from: `${jsonConfiguration.your_full_name} <${jsonConfiguration.your_vikehacks_email}>`,
		to: jsonConfiguration.recipient_email,
		subject: "Hackathon Sponsorship",
		template: "sponsor_email",
		'h:X-Mailgun-Variables': JSON.stringify(variables)
	};
	mg.messages().send(data, function (error, body) {
		console.log(body);
	});
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT || 8000, () =>
    console.log(`Server listening on port ${process.env.PORT || 8000}!`)
);