// hàm gọi trang about
const getAboutPage = (req, res) => {
  // render trang main, gửi data cho view (trang about)
  return res.render("main", {
    data: { title: "about page", content: "this is about page", page: "about" },
  });
};

module.exports = {
  getAboutPage,
};
