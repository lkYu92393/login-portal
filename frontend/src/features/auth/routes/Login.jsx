import * as React from 'react';
import { Button, Grid, InputLabel, Paper, TextField } from '@mui/material';
import { AuthContext } from '../../../lib/auth';

export const Login = () => {
    const { login } = React.useContext(AuthContext);
    const [loginInfo, setLoginInfo] = React.useState({
        username: '',
        password: ''
    })

    const handleLoginInfoChange = (event) => {
        const tempValue = {
            ...loginInfo
        }
        tempValue[event.target.id] = event.target.value
        setLoginInfo(tempValue)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Perform login authentication logic here
        if (loginInfo.username && loginInfo.password) {
            const result = await login(loginInfo.username, loginInfo.password)
        }
    };

    return (
        <>
            <Grid sx={{ height: '100vh', width: '100vw', backgroundColor: '#323c59' }}>
                <Grid container justifyContent={'center'} sx={{ pt: { xs: 4, sm: 16 } }}>
                    <Paper sx={{ p: 2 }}>
                        <Grid container justifyContent={'center'}>
                            <h2>Portal Login</h2>
                        </Grid>
                        <form onSubmit={handleSubmit}>
                            <Grid item xs={12}>
                                <InputLabel id="username-label">Username</InputLabel>
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="username"
                                    name="username"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={loginInfo.username}
                                    onChange={handleLoginInfoChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel id="password-label">Password</InputLabel>
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="password"
                                    name="password"
                                    type="password"
                                    fullWidth
                                    variant="standard"
                                    value={loginInfo.password}
                                    onChange={handleLoginInfoChange}
                                />
                            </Grid>
                            <Grid container justifyContent={'center'} sx={{ mt: 2, mb: 2 }}>
                                <Button variant="outlined" type="submit">
                                    Login
                                </Button>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};