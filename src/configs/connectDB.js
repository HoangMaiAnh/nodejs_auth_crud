import mongoose from "mongoose";

// tạo hàm connect db
const connectDB = async () => {
  try {
    // tạo biến conn -> liên kết địa chỉ uri của db mongoose qua biến trong file env
    const conn = await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // nếu kết nối thành công
    if (conn.connection.readyState === 1) {
      console.log("Connected!");
    }
    // 0: disconnected
    // 1: connected
    // 2: connecting
    // 3: disconnecting
    // 4: uninitialized
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
