const translations = require('./translations');

const getLang = (req) => {
  return req.cookies?.lang || req.query.lang || 'en';
};

const getTranslations = (req) => {
  const lang = getLang(req);
  return {
    t: translations[lang],
    lang,
    translations
  };
};

module.exports = {
  getLang,
  getTranslations
}; 