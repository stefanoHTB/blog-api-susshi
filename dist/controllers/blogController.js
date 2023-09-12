"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogPost = exports.updateBlogPost = exports.getBlogPostById = exports.getAllBlogPosts = exports.createBlogPost = void 0;
const BlogPost_1 = __importDefault(require("../models/BlogPost"));
const { S3Client, PutObjectCommand, GetObjectCommand, } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAcessKey = process.env.SECRET_ACCESS_KEY;
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAcessKey
    },
    region: bucketRegion
});
const createBlogPost = async (req, res) => {
    try {
        const imageString = uuidv4();
        const { title, content, author, category } = req.body;
        const newBlogPost = new BlogPost_1.default({ title, content, author, category });
        await newBlogPost.save();
        res.status(201).json(newBlogPost);
    }
    catch (error) {
        res.status(500).json({ error: "Could not create blog post" });
    }
};
exports.createBlogPost = createBlogPost;
const getAllBlogPosts = async (_req, res) => {
    try {
        const blogPosts = await BlogPost_1.default.find();
        res.status(200).json(blogPosts);
    }
    catch (error) {
        res.status(500).json({ error: "Could not fetch blog posts" });
    }
};
exports.getAllBlogPosts = getAllBlogPosts;
const getBlogPostById = async (req, res) => {
};
exports.getBlogPostById = getBlogPostById;
const updateBlogPost = async (req, res) => {
};
exports.updateBlogPost = updateBlogPost;
const deleteBlogPost = async (req, res) => {
};
exports.deleteBlogPost = deleteBlogPost;
//# sourceMappingURL=blogController.js.map