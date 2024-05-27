import * as React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs'

const todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

const userRoleList = [
    { id: 50, title: 'User' },
    { id: 100, title: 'Admin' }
]

const UserDialog = ({ open, setOpen, viewUser, setViewUser, editUser }) => {
    const handleClickOpen = () => {
        setViewUser({
            username: '',
            role: 50,
            remarks: ''
        })
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add User
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        editUser(formJson);
                        handleClose();
                    },
                }}
                sx={{p:4}}
            >
                <DialogTitle>
                    {
                        viewUser.username === '' ? 'Add User' : 'Edit User'
                    }
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="username"
                        name="username"
                        label="Username"
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={viewUser.username}
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <InputLabel id="garage-type-label">Role</InputLabel>
                            <Select
                                labelId="role"
                                id="role"
                                name='role'
                                label="Role"
                                defaultValue={viewUser.role}
                                required
                            >
                                {userRoleList.map((obj, index) => {
                                    return (
                                        <MenuItem key={obj.id} value={obj.id}>{obj.title}</MenuItem>
                                    )
                                })}
                            </Select>
                        </Grid>
                    </Grid>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="remarks"
                        name="remarks"
                        label="Remarks"
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={viewUser.remarks}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {
                        viewUser.username === ''
                            ? <Button type="submit" value="add">Add User</Button>
                            : <Button type="submit" value="edit">Confirm Change</Button>
                    }
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export { UserDialog }