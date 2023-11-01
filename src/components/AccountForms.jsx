"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { userUpdate } from '@/lib/actions/user.actions';
import { usePathname, useRouter } from 'next/navigation';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage"
import app from '@/firebase';

export default function AccountForms({ user, btnTitle }) {

  const pathname = usePathname()
  const router = useRouter()
  const [name, setName] = useState(user.name || "")
  const [username, setUsername] = useState(user.username || "")
  const [bio, setBio] = useState(user.bio || "")
  const [image, setImage] = useState(user.image)

  const [uploadimage, setUploadImage] = useState()
  const [imageUrlProgress, setImageUrlProgress] = useState(0)

  const [imageUrlPath, setImageUrlPath] = useState()
  const [imageUrl, setImageUrl] = useState(user.image)

  const [isDisabled, setIsDisabled] = useState(false)
  const [uploadImageDisabled, setUploadImageDisabled] = useState()


  const handleUpload = async (file, urlType) => {
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
          if (urlType === "image") {
            setImageUrl(downloadURL)
            console.log("image", downloadURL)
          }
        })
      },
    );
  }


  const handleImage = async (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const fileReader = new FileReader()
      fileReader.onload = () => {
        if (fileReader.readyState === FileReader.DONE) {
          setImage(fileReader.result)
          // setImageUrl(fileReader.result)
        }
      }
      fileReader.readAsDataURL(file)
      setUploadImage(e.target.files[0])
    }
  }

  const handleSubmit = async () => {
    setIsDisabled(true)
    if (!imageUrlPath && !uploadimage) {
     await  register()
    } else {
      await handleUpload(uploadimage, "image")
    }
  }

  const register = async () => {
      await userUpdate({ userId: user.id, path: pathname, username: username, name: name, image: imageUrl, bio: bio, imageUrlPath: imageUrlPath })
      console.log("user updated")
      if (pathname === "/profile/edit") {
        router.back()
      } else {
        router.push("/")
      }
  }
  // useEffect(() => {
  //   const register = async () => {
  //     if (imageUrl) {
  //       await userUpdate({ userId: user.id, path: pathname, username: username, name: name, image: imageUrl, bio: bio, imageUrlPath: imageUrlPath })
  //       console.log("user updated")
  //       if (pathname === "/profile/edit") {
  //         router.back()
  //       } else {
  //         router.push("/")
  //       }
  //     }
  //   }
  //   register()
  // }, [ ])

  return (
    <div className=' bg-neutral-900 sm:w-[70vw] w-full sm:p-10 px-3 rounded-xl'>
      {/* <div className='flex flex-col items-center gap-4 md:flex-row'>
        <Image src={image} alt='' width={60} height={60} className=' rounded-full aspect-square ' />
        <input type="file" accept='image/*' className=' bg-neutral-500 rounded-xl px-2 py-1 w-[50vw] sm:w-fit' onChange={handleImage} />
      </div> */}
      <div className=' w-full flex flex-col gap-6 mt-10'>
        <div className=' flex flex-col gap-2 '>
          <label>Name :</label>
          <div className=' px-2'>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name...' className=' bg-neutral-950 px-3 py-2 sm:ml-5 rounded-lg w-full' />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <label>Username :</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter Username...' className=' bg-neutral-950 px-3 py-2 sm:ml-5 rounded-lg w-full' />
        </div>
        <div className='flex flex-col  gap-2'>
          <label>Name :</label>
          <textarea placeholder='Bio' value={bio} onChange={(e) => setBio(e.target.value)} className='bg-neutral-950 px-3 py-2 sm:ml-5 rounded-lg w-full' rows={"full"} />
        </div>
      </div>
      {imageUrl && uploadimage ?
        <button onClick={register} disabled={isDisabled} className=' my-5 py-1 px-5 bg-purple-700 rounded-lg w-full hover:bg-purple-600'>Verify </button>
        :
        <button onClick={handleSubmit} disabled={isDisabled} className=' my-5 py-1 px-5 bg-purple-700 rounded-lg w-full hover:bg-purple-600'> {isDisabled ? <>Wait... {Math.round(imageUrlProgress)} % </> : <>Submit </>} </button>
      }
    </div>
  )
}
