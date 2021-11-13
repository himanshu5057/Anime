import express from "express";
import animeModel from "../model/anime.js";

const addReview = async (req, res) => {
    try {
        console.log(req.body);
        const { rating, comment, username, anime_id } = req.body;
        const review = {
            username,
            rating: Number(rating),
            comment,
        };
        let anime = await animeModel.findOne({
            id: anime_id,
        });
        console.log(anime);
        // let newAnime;
        if(anime==null){
            anime=await animeModel.create({
                id:anime_id,
            })
        }
        anime.reviews.push(review);
        anime.numberOfReviews = anime.reviews.length;

        anime.rating =
            anime.reviews.reduce((acc, item) => item.rating + acc, 0) /
            anime.reviews.length;

        await anime.save();
        res.status(200).json({ message: "Reviews added" });
        
    } catch(error) {
        console.log(error);
        res.json({
            result: false,
            msg: "There was a problem in adding the review",
        });
    }
};
const getReviews = async (req, res) => {
	try {
		const allReviews = await animeModel.find({
			id: req.body.anime_id,
		});
        console.log(req.body);
        // console.log(allReviews);
        if(allReviews==null||allReviews.length==0){
            return res.status(200).json({
                review:[],
                rating:0,
                anime_id:req.body.anime_id
            })
        }
        return res.status(200).json({
            review:allReviews[0].reviews,
            rating:allReviews[0].rating,
            anime_id:req.body.anime_id
        })
		// console.log(allReviews);
	} catch (error) {
		console.log(error);
		res.json({
			result: false,
			msg: "There was a problem in fetching the reviews",
		});
	}
};
export {addReview,getReviews};