// config view engine
const configViewEngine = (app) => {
  // set view engine = ejs
  app.set("view engine", "ejs");
  // đường dẫn thư mục chứa view
  app.set("views", "./src/views");
};

export default configViewEngine;
