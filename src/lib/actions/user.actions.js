"use server"

import { connectDB } from "@/DB/connection"
import User from "../models/user.model"
import { revalidatePath } from "next/cache"
import Thread from "../models/thread.model"



export const userUpdate = async ({ userId, path, username, name, image, bio, imageUrlPath }) => {
    try {
        await connectDB()
        const isExist = await User.findOne({ userId: userId })
        console.log(isExist)
        if (isExist) {
            await User.findOneAndUpdate({ _id: isExist._id }, { username: username.toLowerCase(), name, image, bio, imageUrlPath, onboarded: true }, { new: true })
        } else {
            await User.create({ username: username.toLowerCase(), name, image, bio, imageUrlPath, onboarded: true, userId: userId })
        }
        if (path == "/profile/edit") {
            revalidatePath(path)
        }
    } catch (error) {
        console.log(error)
        throw new Error("failed to register user", error.message)
    }
}


export const fetchUser = async (id) => {
    try {
        await connectDB()
        let user;
        user = await User.findOne({ userId: id })
        if (!user) {
            user = await User.findById(id)
        }
        if (!user) throw new Error(" user not found with id =", id)
        return user
    } catch (error) {
        console.log(error)
        throw new Error("failed to fetch user", error.message)
    }
}


export const fetchUserPost = async (id) => {
    try {
        await connectDB()
        const post = await User.findOne({ userId: id }).populate({
            path: "threads", populate: { path: "author", select: "name _id userId image" }
        })
        console.log(post)

        return post
    } catch (error) {
        throw new Error("failed to fetch posts", error.message)
    }
}



export const fetchUsers = async ({ userId, searchString = "", pageNum = 1, pageSize = 20 }) => {
    try {
        await connectDB()
        const skipAmount = (pageNum - 1) * pageSize
        const regex = new RegExp(searchString, "i")
        const query = {
            userId: { $ne: userId }
        }
        if (searchString.trim() !== "") {
            query.$or = [
                { username: { $regex: regex } },
                { name: { $regex: regex } }
            ]
        }
        const users = await User.find(query).sort({ _id: -1 }).skip(skipAmount).limit(pageSize)
        const totalUserCount = await User.countDocuments()
        const isNext = totalUserCount > skipAmount + users.length
        return { users, isNext }
    } catch (error) {
        console.log(error)
        throw new Error("failed to fetch users", error.message)

    }
}



export const getActivity = async (id) => {
    try {
        await connectDB()
        const userthread = await Thread.find({ author: id })
        const childThreads = await userthread.reduce((prev, thread) => {
            return prev.concat(thread.children)
        }, [])
        const replies = await Thread.find({
            _id: { $in: childThreads },
            author: { $ne: id }
        }).populate({
            path: "author",
            select: "name image _id"
        })        
        return replies
    } catch (error) {
        throw new Error("failed to to fetch activity", error.message)
    }
}



