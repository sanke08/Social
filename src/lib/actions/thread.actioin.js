"use server"
import { connectDB } from "@/DB/connection"
import Thread from "../models/thread.model"
import User from "../models/user.model"
import { revalidatePath } from "next/cache"

export const createThread = async ({ text, author, communityId, path, imageUrl = "", imageUrlPath = "" }) => {
    try {
        await connectDB()
        const createThread = await Thread.create({ text, author, communityId: null, imageUrl: imageUrl, imageUrlPath: imageUrlPath })
        // update user

        await User.findByIdAndUpdate(author, {
            $push: { threads: createThread._id }
        })
        revalidatePath(path)
        return createThread
    } catch (error) {
        throw new Error("Couldn't create thread", error.message)
    }
}


export const fetchPost = async (pageNo = 1, pageSize = 20) => {
    try {
        await connectDB()
        // fetch post that has no parent post
        const postCount = await Thread.countDocuments({
            parentId: {
                $in: [null, undefined]
            }
        })
        const skippage = (pageNo - 1) * pageSize
        const post = await Thread.find({ parentId: { $in: [null, undefined] } }).sort({ _id: -1 }).skip(skippage).limit(pageSize)
            .populate("author")
            .populate({
                path: "children",
                populate: {
                    path: "author", model: User, select: "_id name parentId image"
                }
            })
        const isNext = postCount > skippage + post.length;
        return { post, isNext}
    } catch (error) {
        console.log(error)
        throw new Error("Couldn't fetch post", error.message)
    }
}




export const fetchthreadById = async (id) => {
    try {
        await connectDB()

        const thread = await Thread.findById(id)
            .populate({ path: "author", select: "_id name userId image" })
            .populate({
                path: "children", populate: [
                    {
                        path: "author", select: "_id name parentId image"
                    },
                    {
                        path: "children", populate: {
                            path: "author", select: "_id name parentId image"
                        }
                    }
                ]
            })
        return thread
    } catch (error) {
        throw new Error("couldnt feth thread by id", error.message)
    }
}



export const addComment = async (threadId, comment, userId, path) => {
    try {
        await connectDB()
        // find parent thread
        const isExistThread = await Thread.findById(threadId)
        if (!isExistThread) throw new Error("Thread not found")
        // create commented thread
        const commentThread = await Thread.create({ text: comment, author: userId, parentId: threadId })
        // add comment id to isexisted threds children
        isExistThread.children.push(commentThread._id)
        isExistThread.save()

    } catch (error) {
        throw new Error("Failed to add comment", error.message)
    }
}


export const addLike = async ({ postId, userClerkId }) => {
    try {
        await connectDB()
        const thread = await Thread.findById(postId)
        if (!thread.liked.includes(userClerkId)) {
            await thread.liked.push(userClerkId)
            thread.save()
        } else {
            await thread.liked.remove(userClerkId)
            thread.save()
        }
        return { success: true, liked: thread.liked }
    } catch (error) {
        throw new Error("Failed to add like", error.message)
    }
}
