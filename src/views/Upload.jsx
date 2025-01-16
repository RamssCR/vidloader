import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { videoContext } from '../context/index'
import { loadVideo } from '../utils/videoDuration'
import InputError from '../components/InputError'

function Upload() {
    const {
        upload, 
        createVideo, 
        message, 
        setMessage, 
        reqErrors, 
        loadingApp,
        changeLoading
    } = useContext(videoContext)
    const {register, handleSubmit} = useForm()
    const navigateTo = useNavigate()

    useEffect(() => {
        if (message) {
            setTimeout(() => navigateTo('/app'), 1000)
            setTimeout(() => setMessage(''), 1100)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message])

    return (
        <section className="app-container">
            <h1 className="in-app__title">Upload a Video</h1>
            <form method="post" className="video-form" encType="multipart/form-data" onSubmit={handleSubmit(async values => {
                changeLoading()
                const formData = new FormData()
                const { duration } = await loadVideo(values.video[0])

                formData.append('video', values.video[0])
                
                const storagableInformation = {
                    title: values.title,
                    category: values.category,
                    description: values.description,
                    videoName: values.video[0].name.replace(/ /g, '_'),
                    duration: Math.round(duration)
                }
                
                const newVideo = await createVideo(storagableInformation)
                if (newVideo !== 200) return

                await upload(formData)
            })}>
                <h2 className="in-app__form-title">Fill out your video&apos;s information</h2>
                {message && <InputError error={message} />}
                {reqErrors.length !== 0 && (
                    <div className="error-list">
                        {reqErrors.map((error, index) => <InputError key={index} error={error} />)}
                    </div>
                )}
                <article className="in-app__inputs-group">
                    <div className="input-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" {...register('title', {required: true})} placeholder="i.e My first video" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="category">Category</label>
                        <select name="category" {...register('category', {required: true})} id="category">
                            <option value="">-- Select a category for your video --</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Food">Food</option>
                            <option value="Music">Music</option>
                            <option value="Education">Education</option>
                            <option value="Gaming">Gaming</option>
                            <option value="Trending">Trending</option>
                        </select>
                    </div>
                </article>
                <div className="input-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" {...register('description')} rows={5} placeholder="i.e The description of my first video in VidLoader!"></textarea>
                </div>
                <div className="input-group">
                    <label htmlFor="video">Video</label>
                    <input type="file" {...register('video', {required: true})} name="video" id="video" />
                </div>
                <input type="submit" value={!loadingApp ? 'Upload Video' : 'Loading...'} />
            </form>
        </section>
    )
}

export default Upload