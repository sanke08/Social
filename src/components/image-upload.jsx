"use client"

import { CldUploadButton } from 'next-cloudinary'
import React, { useEffect, useState } from 'react'

export default function ImageUpload({ value, onChange, disabled }) {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) {
        return null
    }
    return (
        <div>
            <CldUploadButton 
            onUpload={(res)=>onChange(res.info.secure_url)}
            options={{
                maxHeight: 1,
            }}
                uploadPreset='q5ijttzb'
            >
                
            </CldUploadButton>
        </div>
    )
}
