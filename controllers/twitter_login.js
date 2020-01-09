const OAuth = require('oauth');

const User = require('../database/models/user');
const { login, home } = require('./redirect_values');


const cbUrl = process.env.TWITTER_LOGIN_CB;

const consumer = new OAuth.OAuth(
  'https://twitter.com/oauth/request_token',
  'https://twitter.com/oauth/access_token',
  process.env.TWITTER_CONSUMER_KEY,
  process.env.TWITTER_CONSUMER_SECRET,
  '1.0A',
  cbUrl,
  'HMAC-SHA1',
);


exports.getUrl = (req, res) => {
  consumer.getOAuthRequestToken((err, oauthToken, oauthTokenSecret, results) => {
    if (err) {
      console.error(err);
      return;
    }
    req.session.oauthTokenSecret = oauthTokenSecret;
    const authURL = `https://twitter.com/oauth/authenticate?oauth_token=${oauthToken}`;
    res.json({ authURL });
  });
};

exports.cb = (req, res) => {
  const { oauth_token, oauth_verifier } = req.query;
  const { oauthTokenSecret } = req.session;
  consumer.getOAuthAccessToken(
    oauth_token,
    oauthTokenSecret,
    oauth_verifier,
    (err, ouathAccessToken, oauthAccessSecret, result) => {
      consumer.get(
        'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
        ouathAccessToken,
        oauthAccessSecret,
        (userInfoErr, twitterResponse, result) => {
          if (userInfoErr) {
            console.error('twitter error', err);
            return;
          }
          // console.log(twitterResponse);
          const {
            email, name, id_str, profile_image_url_https,
          } = JSON.parse(twitterResponse);

          if (!email && !id_str) {
            res.status(401).redirect(login);
            return;
          }

          const updateOpt = {};
          if (profile_image_url_https) {
            updateOpt.twitterImg = profile_image_url_https;
          }
          if (name && name.length > 8) {
            updateOpt.name = name;
          }

          User.findOneAndUpdate({
            $or: [
              { email },
              { twitterId: id_str },
            ],
          }, updateOpt, { new: true }, async (dbError, dbUser) => {
            console.log(dbUser);
            let user = dbUser;
            if (dbError) {
              console.error(dbError);
              return;
            }
            if (!dbUser) {
              user = await User.create({
                name, email, twitterId: id_str, twitterImg: profile_image_url_https,
              });
            }
            req.session.user = { userId: user.id, name: user.name, email: user.email };
            res.cookie('user', `name=${user.name}&avatar=${user.twitterImg}&userId=${user.id}`);
            res.redirect(home);
          });
        },
      );
    },
  );
};
