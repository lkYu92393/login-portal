import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Grid from '@mui/material/Grid'
import { FormControl, Paper } from '@mui/material'

import { axiosInstance } from '../../../lib/axios'
import * as Resources from './resources'

const UserProfile = () => {
    const [profile, setProfile] = React.useState({})
    const [showChangePW, setShowChangePW] = React.useState(false)
    const [password, setPassword] = React.useState('')

    const changePassword = () => {
        axiosInstance.post('user/changepassword', {
            username: profile.username,
            password: password
        })
            .then((res) => {
                if (res.data.result) {
                    let data = res.data.data
                    alert('Success. Proceeding to reload current page.')
                    location.reload()
                } else {
                    alert('Failed to change password. Please contact admin.')
                }
            })
    }

    React.useEffect(() => {
        axiosInstance.post('user/userinfo')
            .then((res) => {
                if (res.data.result) {
                    let data = res.data.data
                    setProfile(data)
                } else {
                    alert('Failed to get info. Please contact admin.')
                }
            })
    }, [])

    if (Object.keys(profile).length === 0) {
        return <></>
    }

    return (
        <div style={{ width: '100%' }}>
            <Grid>
                <Paper sx={{ p: 2 }}>
                    <Grid container>
                        <Grid item xs={2}>
                            Username:
                        </Grid>
                        <Grid item xs={2}>
                            {profile.username}
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={2}>
                            Role:
                        </Grid>
                        <Grid item xs={2}>
                            {Resources.roleList.filter(obj => obj.key === profile.role)[0]["value"]}
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={2}>
                            Remarks:
                        </Grid>
                        <Grid item xs={4}>
                            {profile.remarks}
                        </Grid>
                    </Grid>
                    {
                        !showChangePW
                            ? <Button color='warning' onClick={() => { setShowChangePW(true) }}>Change Password</Button>
                            : (
                                <FormControl>
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        id="password"
                                        name="password"
                                        label="New password"
                                        type="password"
                                        fullWidth
                                        variant="standard"
                                        value={password}
                                        onChange={(event) => {setPassword(event.target.value)}}
                                    />
                                    <Button color='primary' onClick={() => { changePassword() }}>Confirm Change</Button>
                                </FormControl>
                            )
                    }
                </Paper>
            </Grid>
        </div>
    )
}

export { UserProfile }