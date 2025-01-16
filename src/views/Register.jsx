import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../context/AuthContext'
import InputError from '../components/InputError'

function Register() {
    const {reqErrors, signUp, loading, user, isAuth} = useContext(authContext)
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const navigateTo = useNavigate()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => reset(), [user])

    useEffect(() => {
        if (isAuth) navigateTo('/app')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth])

    return (
        <section className="auth-container">
            <form method="post" className="auth-form" onSubmit={handleSubmit(async values => await signUp(values))}>
                <h3 className="auth-container__title">VidLoader</h3>
                <h2 className="auth-container__form-title">SIGN UP</h2>
                <p className="presentation-text">Create an account with us to upload as many videos as you desire!</p>

                {reqErrors.length !== 0 && (
                    <div className="error-list">
                        {reqErrors.map((error, index) => <InputError key={index} error={error} />)}
                    </div>
                )}
                <div className="input-group">
                    <label htmlFor="username" className="input-label">Let&apos;s start by creating an username</label>
                    <input type="text" id="username" {...register('username', {required: true})} placeholder="i.e rob.jenks_45" />
                    {errors.username && <span className="input-error">An username is required</span>}
                </div>
                <div className="input-group">
                    <label htmlFor="email" className="input-label">Up next, let&apos;s add an email</label>
                    <input type="text" id="email" {...register('email', {required: true})} placeholder="i.e robert.jenks90@example.com" />
                    {errors.email && <span className="input-error">An email is required</span>}
                </div>
                <div className="input-group">
                    <label htmlFor="password" className="input-label">Lastly but not least, let&apos;s add a safe password</label>
                    <input type="password" id="password" {...register('password', {required: true})} placeholder="i.e 0000000000" />
                    {errors.password && <span className="input-error">A password is required</span>}
                </div>
                <input type="submit" value={!loading ? 'Create Account' : 'Loading...'} disabled={loading} />
                <p className="change-signer">Already have an account?<br /> <Link to='/login'>Sign In</Link>!</p>
            </form>
        </section>
    )
}

export default Register