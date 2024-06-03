import news from "./news.json";
import mails from "./mails.json";
import career from "./career.json";
import header from "./header.json";
import common from "./common.json";
import courses from "./courses.json";
import reviews from "./reviews.json";
import services from "./services.json";
import sendMail from "./send-mail.json";
import categories from "./categories.json";

export default {
  ...news,
  ...mails,
  ...career,
  ...header,
  ...common,
  ...courses,
  ...reviews,
  ...services,
  ...sendMail,
  ...categories,
};
