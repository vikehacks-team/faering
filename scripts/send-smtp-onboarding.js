const {apiKey, domain, users} = require("./config.json");
var mg = require('mailgun-js')({apiKey, domain});

function deriveAllVariablesFromUser({name, password}) {
    const [firstName] = name.split(" ");
    const username = `${firstName.toLowerCase()}@${domain}`;
    return {
        firstName,
        username,
        password
    }
}

const allTemplateVariables = users.map(deriveAllVariablesFromUser);

async function sendWithTemplateVariables(variables) {
    const {firstName, username} = variables;

    console.info(`Sending email to ${firstName}`);
    return new Promise((resolve, reject) => {
        const data = {
            from: "Aanand Kainth <aanand@vikehacks.tech>",
            to: username,
            subject: "VikeHacks Email Setup",
            template: "smtp-onboarding",
            'h:X-Mailgun-Variables': JSON.stringify(variables)
        };
        mg.messages().send(data, function (error, body) {
            if (error) {
                reject(error);
            }
            resolve(body);
        });
    });
}

Promise.all(allTemplateVariables.map(sendWithTemplateVariables))
    .then(arguments => {
        arguments.forEach(message => {
            console.log(`${message.id} : ${message.message}`);
        });
    })
    .catch(error => {
        console.error(error);
    });