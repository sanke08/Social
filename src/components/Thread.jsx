"use client"
import { createThread } from '@/lib/actions/thread.actioin'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from "next/image"
import app from '@/firebase'

export default function Thread({ userId }) {

    const pathname = usePathname()
    const router = useRouter()
    const [text, setText] = useState("")
    const [image, setImage] = useState()
    const [Uploadimage, setUploadImage] = useState()
    const [imageUrlPath, setImageUrlPath] = useState()
    const [imageUrlProgress, setImageUrlProgress] = useState(0)
    const [imageUrl, setImageUrl] = useState()
    const [isDisable, setisDisable] = useState(false)

    const submit = async () => {
        if (!text || !text.length > 5 || !userId) return
        setisDisable(true)
        if (Uploadimage) {
            await handleUpload(Uploadimage)
        } else {
            await createThread({ text, author: userId, communityId: null, path: pathname, imageUrl: imageUrl, imageUrlPath: imageUrlPath })
            router.push("/")
        }
    }

    const handleImage = async (e) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            const fileReader = new FileReader()
            fileReader.onload = () => {
                if (fileReader.readyState === FileReader.DONE) {
                    setImage(fileReader.result)
                }
            }
            fileReader.readAsDataURL(file)
            setUploadImage(e.target.files[0])
        }
    }




    const handleUpload = async (file) => {
        const storage = getStorage(app);
        let storageRef
        const imagepath = `profile/${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}-${file.name}`
        await setImageUrlPath(imagepath)
        storageRef = await ref(storage, imagepath);

        const uploadTask = uploadBytesResumable(storageRef, file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageUrlProgress(progress)
                switch (snapshot.state) {
                    case 'paused':
                        console.log("paused")
                        break;
                    case 'running':
                        console.log(progress)
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                console.log(error)
            },
            async () => {
                // Upload completed successfully, now we can get the download URL
                await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageUrl(downloadURL)
                    console.log("image", downloadURL)
                })
            },
        )
    }

    useEffect(() => {
        async function create() {
            if (imageUrl && imageUrlProgress == 100) {
                await createThread({ text, author: userId, communityId: null, path: pathname, imageUrl: imageUrl, imageUrlPath: imageUrlPath })
                router.push("/")
            }
        }
        create()
    }, [imageUrl])

    return (
        <div className=' p-5 h-full flex flex-col items-center'>
            <p className=' font-bold text-3xl w-full'>
                Create Thread
            </p>
            <div className=' lg:flex justify-between w-full'>
                <div className=' w-full flex flex-col items-center'>
                    <div className=' bg-neutral-800 relative w-[60vw] sm:w-[30vw] md:w-[20vw] mt-10 aspect-square '>
                        <Image src={image} alt="" fill className=" object-contain" />
                    </div>
                    <input type="file" onChange={handleImage} className=' px-4 py-2 rounded-lg bg-neutral-800 cursor-pointer mt-10' />
                </div>
                <div className=' w-full'>
                    <p className=' mt-10 w-full'>
                        content
                    </p>
                    <textarea value={text} onChange={(e) => setText(e.target.value)} className=' w-full bg-neutral-900 resize-none sm:h-[40vh] h-[25vh] rounded-xl border-none p-5' />
                    <button onClick={submit} disabled={isDisable} className=' w-full bg-purple-700 py-2 rounded-xl hover:bg-purple-950 mt-5 transition'>{isDisable ? <>Wait {Math.round(imageUrlProgress)} % </> : <>Submit</>}   </button>
                </div>
            </div>
        </div>
    )
}
