import User from "../models/userModel";

const addNewUserPage = async (req, res) => {};

const addNewUser = async (req, res) => {};

const userListPage = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Lấy số trang từ query parameter, mặc định là trang 1
  const limit = 5; // Số lượng người dùng trên mỗi trang
  const skip = (page - 1) * limit; // Số lượng người dùng cần bỏ qua

  const totalUsers = await User.countDocuments(); // Tổng số người dùng trong cơ sở dữ liệu
  const totalPages = Math.ceil(totalUsers / limit); // Tổng số trang

  const users = await User.find().skip(skip).limit(limit); // Lấy danh sách người dùng cho trang hiện tại
  res.render("main", {
    data: {
      title: "List users",
      page: "listUser",
      users,
      totalPages,
      currentPage: page,
    },
  });
};

const updateUserPage = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  res.render("main", {
    data: { title: "Update user", page: "updateUser", user },
  });
};

const updateUserByAdmin = async (req, res) => {
  try {
    // gọi id
    const { userId } = req.params;
    // cap nhat user bằng id
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true });

    // chuyển qua trang chi tiết người dùng
    res.redirect(`/detail-user/${user._id}`);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const detailUser = async (req, res) => {
  try {
    // gọi id từ params
    const { userId } = req.params;
    // kiếm người dùng bằng id gọi từ params
    const user = await User.findById(userId);
    // nếu có người dùng thì sẽ render qua trang chi tiết người dùng
    res.render("main", {
      data: { title: "User Detail", page: "detailUser", user },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteUser = async (req, res) => {
  try {
    // 
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.redirect("/list-user");
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  userListPage,
  updateUserPage,
  updateUserByAdmin,
  detailUser,
  deleteUser,
  addNewUserPage,
  addNewUser,
};
