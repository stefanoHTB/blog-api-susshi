import { Request, Response } from "express";
import BlogPost from "../models/BlogPost";

const { S3Client, PutObjectCommand, GetObjectCommand, } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAcessKey = process.env.SECRET_ACCESS_KEY

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAcessKey
    },
    region: bucketRegion
})


// Create a new blog post
export const createBlogPost = async (req: Request, res: Response) => {
    // console.log(req.file.buffer)
    // console.log(req.body)

    // if(!req.body?.description || !req.body?.ownerId) {
    //     return res.status(400).json({'meesage': 'fields required'})
    // }

    try {
        const imageString = uuidv4();

        const { title, content, author, category } = req.body;
        const newBlogPost = new BlogPost({ title, content, author, category });
        await newBlogPost.save();
        res.status(201).json(newBlogPost);
      } catch (error) {
        res.status(500).json({ error: "Could not create blog post" });
      }
};

// Get all blog posts
export const getAllBlogPosts = async (_req: Request, res: Response) => {
    try {
        const blogPosts = await BlogPost.find();
        res.status(200).json(blogPosts);
      } catch (error) {
        res.status(500).json({ error: "Could not fetch blog posts" });
      }
};

// Get a single blog post by ID
export const getBlogPostById = async (req: Request, res: Response) => {

};

// Update a blog post by ID
export const updateBlogPost = async (req: Request, res: Response) => {

};

// Delete a blog post by ID
export const deleteBlogPost = async (req: Request, res: Response) => {

};



