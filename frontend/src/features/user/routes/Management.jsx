import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Grid from '@mui/material/Grid'
import { FormControl, Paper } from '@mui/material'

import { AuthContext } from '../../../lib/auth';
import { axiosInstance } from '../../../lib/axios'
import { UserDialog } from '../components/UserDialog'
import * as Resources from './resources'

const Management = () => {
    const { username } = React.useContext(AuthContext);
    const [userList, setUserList] = React.useState([])
    const [viewUserList, setViewUserList] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const [viewUser, setViewUser] = React.useState({})

    React.useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = () => {
        axiosInstance.get('user/getusers')
            .then((res) => {
                if (res.data.result) {
                    let data = res.data.data
                    setUserList(data)
                    setViewUserList(data)
                } else {
                    console.log(res.data)
                    alert('Failed to get user info. Please contact admin.')
                }
            })
    }

    const resetPassword = (username) => {
        if (confirm(`You are going to set the password of user, ${username}.`)) {

            axiosInstance.post('user/changepassword', {
                username: username,
                password: 'P@ssword!'
            })
                .then((res) => {
                    if (res.data.result) {
                        alert('Success. The password is now "P@ssword!". Please ask user to change the password ASAP.')
                    } else {
                        console.log(res.data)
                        alert('Failed to reset password. Please contact admin.')
                    }
                })
        }
    }

    const editUser = (user) => {
        setViewUser(user)
        setOpen(true)
    }

    const editUserRecord = (formJson) => {
        const action = viewUser.username === '' ? 'add' : 'edit'
        axiosInstance.post('user/edituser', {
            data: formJson,
            action: action
        })
            .then((res) => {
                if (res.data.result) {
                    alert(`Success. The user is ${action === 'add' ? 'created' : 'edited'}.`)
                    fetchUser()
                } else {
                    console.log(res.data)
                    alert(`Failed to ${action === 'add' ? 'created' : 'edited'}. Please contact admin.`)
                }
            })
    }

    const deleteUser = (username) => {
        if (confirm(`You are going to delete the user, ${username}. Note that this action cannot be reversed.`)) {
            axiosInstance.post('user/deleteuser', {
                username: username
            })
                .then((res) => {
                    if (res.data.result) {
                        alert('Success. The user is deleted.')
                        fetchUser()
                    } else {
                        console.log(res.data)
                        alert('Failed to reset password. Please contact admin.')
                    }
                })
        }
    }

    return (
        <div style={{ width: '100%' }}>
            <Grid>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <UserDialog open={open} setOpen={setOpen} viewUser={viewUser} setViewUser={setViewUser} editUser={editUserRecord} />
                    <Grid container sx={{ pt: 2, pb: 2 }}>
                        <Grid item xs={2}>Username</Grid>
                        <Grid item xs={2}>Role</Grid>
                        <Grid item xs={5}>Remarks</Grid>
                        <Grid item xs={3}>Actions</Grid>
                    </Grid>
                    {
                        viewUserList.map((user, index) => {
                            return (
                                <Grid container key={user.username} style={{ backgroundColor: index % 2 == 0 ? '#ddd' : '#fff' }}>
                                    <Grid item xs={2} sx={{ pt: 2, pb: 2 }}>
                                        {user.username}
                                    </Grid>
                                    <Grid item xs={2} sx={{ pt: 2, pb: 2 }}>
                                        {Resources.roleList.filter(obj => obj.key === user.role)[0]["value"]}
                                    </Grid>
                                    <Grid item xs={5} sx={{ pt: 2, pb: 2 }}>
                                        {user.remarks}
                                    </Grid>
                                    <Grid item xs={3} sx={{ pt: 2, pb: 2 }}>
                                        <Button onClick={() => { resetPassword(user.username) }}>Reset Password</Button>
                                        <Button onClick={() => { editUser(user) }}>Edit User</Button>
                                        <Button color='warning' disabled={user.username === username} onClick={() => { deleteUser(user.username) }}>Delete User</Button>
                                    </Grid>
                                </Grid>
                            )
                        })
                    }
                </Paper>
            </Grid>
        </div>
    )
}

export { Management }