import React, { useState, useRef } from 'react'
import { MdOutlineKeyboardBackspace } from "react-icons/md"
import { useNavigate } from 'react-router-dom'
import { FiPlusSquare } from "react-icons/fi"
import VideoPlayer from '../components/VideoPlayer'
import axios from 'axios'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setPostData } from '../redux/postSlice'
import { setCurrentUserStory } from '../redux/storySlice'
import { setLoopData } from '../redux/loopSlice'
import { ClipLoader } from 'react-spinners'

function Upload() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const mediaInput = useRef()

  const { postData } = useSelector(state => state.post)
  const { loopData } = useSelector(state => state.loop)

  const [uploadType, setUploadType] = useState("post")
  const [frontendMedia, setFrontendMedia] = useState(null)
  const [backendMedia, setBackendMedia] = useState(null)
  const [mediaType, setMediaType] = useState("")
  const [caption, setCaption] = useState("")
  const [loading, setLoading] = useState(false)

  // Handle file selection
  const handleMedia = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.type.includes("image")) {
      setMediaType("image")
    } else {
      setMediaType("video")
    }

    setBackendMedia(file)
    setFrontendMedia(URL.createObjectURL(file))
  }

  // Reusable upload function
  const uploadRequest = async (url, formData, successCallback) => {
    try {
      const result = await axios.post(url, formData, {
        withCredentials: true,
      })

      successCallback(result.data)
      navigate("/")

    } catch (error) {
      console.log("Upload Error:", error.response?.data || error.message)
      alert(error.response?.data?.message || "Upload failed")
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = () => {

    if (!backendMedia) {
      alert("Please select media first")
      return
    }

    setLoading(true)

    const formData = new FormData()
    formData.append("media", backendMedia)

    if (uploadType !== "story") {
      formData.append("caption", caption)
    }

    if (uploadType !== "loop") {
      formData.append("mediaType", mediaType)
    }

    if (uploadType === "post") {
      uploadRequest(
        `${serverUrl}/api/post/upload`,
        formData,
        (data) => dispatch(setPostData([...postData, data]))
      )
    }

    else if (uploadType === "story") {
      uploadRequest(
        `${serverUrl}/api/story/upload`,
        formData,
        (data) => dispatch(setCurrentUserStory(data))
      )
    }

    else {
      uploadRequest(
        `${serverUrl}/api/loop/upload`,
        formData,
        (data) => dispatch(setLoopData([...loopData, data]))
      )
    }
  }

  return (
    <div className='w-full h-[100vh] bg-black flex flex-col items-center'>

      {/* Header */}
      <div className='w-full h-[80px] flex items-center gap-[20px] px-[20px]'>
        <MdOutlineKeyboardBackspace
          className='text-white cursor-pointer w-[25px] h-[25px]'
          onClick={() => navigate(`/`)}
        />
        <h1 className='text-white text-[20px] font-semibold'>Upload Media</h1>
      </div>

      {/* Upload Type Selector */}
      <div className='w-[90%] max-w-[600px] h-[80px] bg-white rounded-full flex justify-around items-center gap-[10px]'>

        {["post", "story", "loop"].map(type => (
          <div
            key={type}
            onClick={() => setUploadType(type)}
            className={`${uploadType === type ? "bg-black text-white shadow-2xl shadow-black" : ""}
            w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold
            hover:bg-black rounded-full hover:text-white cursor-pointer`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </div>
        ))}

      </div>

      {/* Media Upload Area */}
      {!frontendMedia && (
        <div
          className='w-[80%] max-w-[500px] h-[250px] bg-[#0e1316] border-gray-800 border-2 flex flex-col items-center justify-center gap-[8px] mt-[15vh] rounded-2xl cursor-pointer hover:bg-[#353a3d]'
          onClick={() => mediaInput.current.click()}
        >
          <input
            type="file"
            accept={uploadType === "loop" ? "video/*" : ""}
            hidden
            ref={mediaInput}
            onChange={handleMedia}
          />
          <FiPlusSquare className='text-white w-[25px] h-[25px]' />
          <div className='text-white text-[19px] font-semibold'>
            Upload {uploadType}
          </div>
        </div>
      )}

      {/* Preview */}
      {frontendMedia && (
        <div className='w-[80%] max-w-[500px] mt-[10vh] flex flex-col items-center'>

          {mediaType === "image" && (
            <img src={frontendMedia} alt="" className='h-[200px] rounded-2xl' />
          )}

          {mediaType === "video" && (
            <VideoPlayer media={frontendMedia} />
          )}

          {uploadType !== "story" && (
            <input
              type='text'
              className='w-full border-b-gray-400 border-b-2 outline-none px-[10px] py-[5px] text-white mt-[20px] bg-transparent'
              placeholder='Write caption'
              onChange={(e) => setCaption(e.target.value)}
              value={caption}
            />
          )}
        </div>
      )}

      {/* Upload Button */}
      {frontendMedia && (
        <button
          className='px-[10px] w-[60%] max-w-[400px] py-[5px] h-[50px] bg-white mt-[50px] cursor-pointer rounded-2xl'
          onClick={handleUpload}
          disabled={loading}
        >
          {loading
            ? <ClipLoader size={25} color='black' />
            : `Upload ${uploadType}`
          }
        </button>
      )}

    </div>
  )
}

export default Upload