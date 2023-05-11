const { OAuth2Client } = require("google-auth-library");
const {
  googleClientId,
  googleClientSecret,
  googleRedirectUri,
} = require("../configs/environment");
const client = new OAuth2Client(googleClientId, googleClientSecret, googleRedirectUri);

exports.getUserInfo = async (accessToken) => {
  const userInfo = await client.verifyIdToken({
    idToken: accessToken,
    audience: googleClientId,
  });
  return userInfo.payload;
};
