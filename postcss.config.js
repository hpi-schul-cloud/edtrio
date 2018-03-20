const prod = process.env.NODE_ENV === "production";

module.exports = {
    plugins: {
        autoprefixer: prod ? {} : false,
        cssnano: prod ? {} : false
    }
};