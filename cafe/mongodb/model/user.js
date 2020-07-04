module.exports = function(mongoose) {
    return new mongoose.Schema({
        id: Number,
        name: String
    });
};