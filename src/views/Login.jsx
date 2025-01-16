import { useContext,useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../context/AuthContext'
import InputError from '../components/InputError'

function Login() {
    const {reqErrors, user, loading, isAuth, signIn} = useContext(authContext)
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
            <form method="post" className="auth-form" onSubmit={handleSubmit(async values => await signIn(values))}>
                <h3 className="auth-container__title">VidLoader</h3>
                <h2 className="auth-container__form-title">SIGN IN</h2>
                <p className="presentation-text">Continue where you left at and keep uploading videos!</p>

                {reqErrors.length !== 0 && (
                    <div className="error-list">
                        {reqErrors.map((error, index) => <InputError key={index} error={error} />)}
                    </div>
                )}

                <div className="input-group">
                    <label htmlFor="email" className="input-label">Email</label>
                    <input type="text" id="email" {...register('email', {required: true})} placeholder="i.e robert.jenks90@example.com" />
                    {errors.email && <span className="input-error">An email is required</span>}
                </div>
                <div className="input-group">
                    <label htmlFor="password" className="input-label">Password</label>
                    <input type="password" id="password" {...register('password', {required: true})} placeholder="i.e 0000000000" />
                    {errors.password && <span className="input-error">A password is required</span>}
                </div>
                <input type="submit" value={!loading ? 'Sign In' : 'Loading...'} />
                <p className="change-signer">Don&apos;t have an account?<br /> <Link to='/register'>Sign Up</Link>!</p>
            </form>
        </section>
    )
}

export default Login