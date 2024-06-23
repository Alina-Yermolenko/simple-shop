import './Login.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmail, setIsEmail] = useState(true);
    const [isPassword, setIsPassword] = useState(true);
    const navigate = useNavigate();
    const userData = localStorage.getItem('userData')


    const setUser = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = JSON.stringify({ username: email, password: password });
        setIsEmail(email === 'admin')
        setIsPassword(password === '12345')

        if (email === 'admin' && password === '12345') {
            localStorage.setItem('userData', user);
            navigate('/products')
        }
    }

    useEffect(() => {
        if (userData) {
            navigate('/')
        }
    }, [userData])

    return (
        <div className='login'>
            <form className='login-form' onSubmit={setUser}>
                <div>
                    <input
                        required
                        id="email"
                        name="email"
                        autoComplete="email"
                        placeholder="Email"
                        autoFocus
                        onChange={(event) => {
                            setEmail(event.target.value);
                            setIsEmail(true);
                        }}
                    />
                    {!isEmail && <span className="error-message">Incorrect email entry.</span>}
                </div>
                <div>
                    <input
                        required
                        name="password"
                        type="password"
                        id="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(event) => {
                            setPassword(event.target.value);
                            setIsPassword(true);
                        }}
                    />
                    {!isPassword && <span className="error-message">Incorrect password entry.</span>}
                </div>
                <button
                    type="submit"
                    disabled={!email || !password}
                >
                    Login
                </button>
            </form>
        </div>
    );
}
