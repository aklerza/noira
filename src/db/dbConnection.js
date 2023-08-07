const mongoose = require("mongoose")

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Verilənlər bazasına bağlanıldı.")
    })
    .catch((err) => {
        console.log("Verilənlər bazasına bağlanılmadı: ", err);
    })