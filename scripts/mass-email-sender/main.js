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
		subject: "VikeHacks Postponement",
		html: `
			Hello,
			<br />
			<br />
			Thank you for your interest in VikeHacks!
			<br />
			<br />
			Over the past few weeks, it has been brought to our attention that the weekend of VikeHacks (1/19/2020) 
			overlaps with the USACO January contest and the Lynbrook winter formal. To avoid potential scheduling conflicts, 
			VikeHacks has been postponed to February 16th, 2020. Due to this delay, our location is currently unconfirmed – 
			however, we are still planning to host VikeHacks at Lynbrook High School.
			<br />
			<br />
			If you have any questions or concerns, feel free to send us an email at 
			<a href="mailto:organizers@vikehacks.tech">organizers@vikehacks.tech</a>.
			<br />
			<br />
			Hope to see you soon, and happy coding!
			<br />
			<br />
			Sincerely,
			<br />
			Kento Nishi
			<br />
			VikeHacks Organizer and Developer
			<br />
			<a href="mailto:kento@vikehacks.tech">kento@vikehacks.tech</a>
			<br />
			VikeHacks website: <a href="https://vikehacks.tech/">vikehacks.tech</a>
			`
	};
	promises.push(mg.messages().send(data));
});

Promise.all(promises).then(() => {
	console.log("Finished sending all emails");
});