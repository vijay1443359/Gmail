var nodemailer = require('nodemailer');
var { google } = require('googleapis');

var CLIENT_ID = '594336522595-ekufr1s8fvbnssmp3ldovt3hm57i931c.apps.googleusercontent.com';
var CLEINT_SECRET = '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';
var REDIRECT_URI = 'https://developers.google.com/oauthplayground';
var REFRESH_TOKEN = '1//048FkCu4haLhKCgYIARAAGAQSNwF-L9IrCgX4ov1wmZ2LeumwM9ghAZ_8bkfSRRRO8NteXupV2G7LxCNNk8I4KYiFrTeV3uSTHug';

var oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(from_ID,to_ID) {
  try {
    var accessToken = await oAuth2Client.getAccessToken();

    var transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: from_ID,
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    // let d=document.getElementById('name').value;
    // console.log(d);
    var mailOptions = {
      from: from_ID,
      to: to_ID,
      subject: 'Hello from gmail using API',
      text: 'Hello from gmail using API',
      html: '<h1>Hello from gmail email using API</h1>',
    };

    var result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

const from_ID="vijay1443359@gmail.com"
const to_ID="vijay1443359@gmail.com"

  sendMail(from_ID,to_ID)
  .then((result) => {
    console.log('Email sent...', result)
  })
  .catch((error) => console.log(error.message));

