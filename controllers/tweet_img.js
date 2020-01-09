const OAuth = require('oauth');
const multer = require('multer');
const path = require('path');
const Twitter = require('twit');
const fs = require('fs');

const { services } = require('./redirect_values');

const cbUrl = process.env.TWITTER_UPLOAD_CB;

const consumer = new OAuth.OAuth(
  'https://twitter.com/oauth/request_token',
  'https://twitter.com/oauth/access_token',
  process.env.TWITTER_CONSUMER_KEY,
  process.env.TWITTER_CONSUMER_SECRET,
  '1.0A',
  cbUrl,
  'HMAC-SHA1',
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    console.log('multer', file)
    cb(null, Date.now() + file.originalname);
  },
});
exports.multerConfig = multer({ dest: 'uploads\\' });

exports.tweetImgUrl = (req, res) => {
  console.log('req.file');
  //console.log(req.body.status);
  consumer.getOAuthRequestToken((err, oauthToken, oauthTokenSecret, result) => {
    if (err) {
      console.error(err);
      res.json({ err: 'error authenticating' });
      return;
    }
    req.session.oauthTokenSecret = oauthTokenSecret;
    req.session.file = req.file;
    req.session.status = req.body.status;
    const authURL = `https://twitter.com/oauth/authorize?oauth_token=${oauthToken}`;
    res.json({ authURL });
  });
};

exports.tweetImgCb = (req, res) => {
  console.log(req.session);
  const { oauth_token, oauth_verifier } = req.query;
  const { oauthTokenSecret, file, status } = req.session;
  function removeFile(path) {
    fs.unlink(path, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(path, 'has been deleted');
    });
  }
  consumer.getOAuthAccessToken(
    oauth_token,
    oauthTokenSecret,
    oauth_verifier,
    (err, oauthAccessToken, oauthAccessSecret) => {
      const client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token: oauthAccessToken,
        access_token_secret: oauthAccessSecret,
      });
      const filePath = path.join(...file.path.split('/'));
      console.log('filepath', filePath);
      client.postMediaChunked({ file_path: filePath }, (err1, media, response) => {
        if (err1) {
          console.log('postMediaChunkedError', err1);
          removeFile(filePath);
          res.json({ err: err1.message });
          return;
        }
        // console.log(media);
        const statusObj = {
          status,
          media_ids: media.media_id_string,
        };
        client.post('statuses/update', statusObj, (error, tweet, response) => {
          if (error) {
            console.log('statuses/update', error);
            removeFile(filePath);
            res.json({ err: error.message });
            return;
          }
          console.log(tweet);
          removeFile(filePath);
          console.log(tweet.id, tweet.id_str, tweet.user.screen_name);
          res.cookie('new-tweet', `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`);
          res.redirect(services);
        });
      });
    },
  );
};
