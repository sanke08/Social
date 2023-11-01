"use client"
import React from 'react'
import { MoreVertical, Trash } from 'lucide-react'

export default function Edit({ postId }) {
    const handleDelete = async () => {
        alert(postId)
    }
    return (
        <button onClick={handleDelete}>
            <Trash size={20} />
        </button>
    )
}
