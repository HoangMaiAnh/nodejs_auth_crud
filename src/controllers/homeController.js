const getHomePage = (req, res) => {
  return res.render("main", {
    data: {
      title: "home page",
      content: "this is home page",
      page: "home",
    },
  });
};

module.exports = {
  getHomePage,
};
