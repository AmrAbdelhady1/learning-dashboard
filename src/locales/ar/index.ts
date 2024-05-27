import news from "./news.json";
import career from "./career.json";
import header from "./header.json";
import common from "./common.json";
import reviews from "./reviews.json";
import services from "./services.json";
import categories from "./categories.json";

export default {
  ...news,
  ...career,
  ...header,
  ...common,
  ...reviews,
  ...services,
  ...categories,
};
