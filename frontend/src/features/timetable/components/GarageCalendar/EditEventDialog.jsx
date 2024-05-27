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

import { viewStateChoice, locationList, codeList } from './resources'
import { AuthContext } from '../../../../lib/auth'

const todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

const EditEventDialog = ({ open, setOpen, viewEvent }) => {
    const [viewState, setViewState] = React.useState(viewStateChoice.view)
    const { username } = React.useContext(AuthContext)
    const handleClose = () => {
        setOpen(false)
        setViewState(viewStateChoice.view)
    };

    const handleDelete = () => {
        viewEvent.remove()
        setOpen(false)
        setViewState(viewStateChoice.view)
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        viewEvent.setProp('title', formJson.title)
                        viewEvent.setStart(dayjs(formJson.start).format('YYYY-MM-DDTHH:mm:00'))
                        viewEvent.setEnd(dayjs(formJson.end).format('YYYY-MM-DDTHH:mm:00'))
                        viewEvent.setExtendedProp('type', formJson.type)
                        viewEvent.setExtendedProp('location', formJson.location)
                        viewEvent.setExtendedProp('remarks', formJson.remarks)
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Event Info</DialogTitle>
                {
                    viewState === viewStateChoice.view && viewEvent && viewEvent.extendedProps && viewEvent.extendedProps.username === username
                        ?
                        <DialogActions>
                            <Button onClick={() => { setViewState(viewStateChoice.edit) }}>Edit</Button>
                        </DialogActions>
                        : <></>
                }
                <DialogContent>
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
                        defaultValue={viewEvent.title}
                        disabled={viewState === viewStateChoice.view}
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <InputLabel id="garage-type-label">Job Type</InputLabel>
                            <Select
                                labelId="garage-type-label"
                                id="garage-type"
                                name='type'
                                label="Type"
                                defaultValue={viewEvent && viewEvent.extendedProps ? viewEvent.extendedProps.type : codeList[0].id}
                                required
                                disabled={viewState === viewStateChoice.view}
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
                                defaultValue={viewEvent && viewEvent.extendedProps ? viewEvent.extendedProps.location : locationList[0].id}
                                required
                                disabled={viewState === viewStateChoice.view}
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
                                    defaultValue={viewEvent && viewEvent.extendedProps ? dayjs(viewEvent.startStr) : dayjs(todayStr)}
                                    views={['year', 'month', 'day', 'hours', 'minutes']}
                                    disabled={viewState === viewStateChoice.view}
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
                                    defaultValue={viewEvent && viewEvent.extendedProps ? dayjs(viewEvent.endStr) : dayjs(todayStr)}
                                    views={['year', 'month', 'day', 'hours', 'minutes']}
                                    disabled={viewState === viewStateChoice.view}
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
                        defaultValue={viewEvent && viewEvent.extendedProps ? viewEvent.extendedProps.remarks : ''}
                        disabled={viewState === viewStateChoice.view}
                    />
                </DialogContent>
                <DialogActions>
                    {viewState === viewStateChoice.view
                        ? (
                            <Button onClick={handleClose}>Cancel</Button>
                        )
                        : (
                            <>
                                <Button type="submit">Confirm Edit</Button>
                                <Button onClick={handleDelete} color={"warning"}>Delete</Button>
                                <Button onClick={handleClose}>Cancel</Button>
                            </>
                        )}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export { EditEventDialog }