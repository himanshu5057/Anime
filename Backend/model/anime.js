import  mongoose  from "mongoose"; 
const review = mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// const review = mongoose.model("review", UserSchema);
const animeSchema = mongoose.Schema({
	id: { type: String, required: true },
  rating: { type: Number },
  reviews: [review],
  numberOfReviews: { type: String },
});

const anime=mongoose.model("anime",animeSchema);
export default anime;