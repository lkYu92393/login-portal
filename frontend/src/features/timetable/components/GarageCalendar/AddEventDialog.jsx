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

import { locationList, codeList } from './resources'

const todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

const AddEventDialog = ({ open, setOpen, addEvent }) => {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Add Event
            </Button> */}
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        addEvent(formJson);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Create</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create booking, please fill in the necessary information below.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="title"
                        name="title"
                        label="Event Title"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <InputLabel id="garage-type-label">Job Type</InputLabel>
                            <Select
                                labelId="garage-type-label"
                                id="garage-type"
                                name='type'
                                label="Type"
                                defaultValue={codeList[0].id}
                                required
                            >
                                {codeList.map((obj, index) => {
                                    return (
                                        <MenuItem key={obj.id} value={obj.id}>{obj.title}</MenuItem>
                                    )
                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel id="garage-location-label">Location</InputLabel>
                            <Select
                                labelId="garage-location-label"
                                id="garage-location"
                                name='location'
                                label="Location"
                                defaultValue={locationList[0].id}
                                required
                            >
                                {locationList.map((obj, index) => {
                                    return (
                                        <MenuItem key={obj.id} value={obj.id}>{obj.title}</MenuItem>
                                    )
                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    ampm={false}
                                    label="Start Time"
                                    id="start"
                                    name="start"
                                    defaultValue={dayjs(todayStr)}
                                    views={['year', 'month', 'day', 'hours', 'minutes']}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    ampm={false}
                                    label="End Time"
                                    id="end"
                                    name="end"
                                    defaultValue={dayjs(todayStr)}
                                    views={['year', 'month', 'day', 'hours', 'minutes']}
                                />
                            </LocalizationProvider>
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
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export { AddEventDialog }