import React from 'react'

const LoginForm = ({ handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password }) => {

    return (
        <>
            <div>
                <h1>Sign in</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text" value={username} placeholder="username" onChange={handleUsernameChange} />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            name="Password"
                            onChange={handlePasswordChange}
                            placeholder="password"
                        />
                    </div>
                    <button type="submit">Sign in</button>
                </form>
            </div>
        </>
    )
}

export default LoginForm