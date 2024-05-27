import * as React from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import scrollGridPlugin from '@fullcalendar/scrollgrid'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
import dayjs from 'dayjs'

import timeGridPlugin from '@fullcalendar/timegrid'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'

import { AuthContext } from '../../../../lib/auth'
import { axiosInstance } from '../../../../lib/axios'
import { locationList, typeColor } from './resources'
import { AddEventDialog } from './AddEventDialog'
import { EditEventDialog } from './EditEventDialog'
import { EventDialog } from './EventDialog'

// https://codepen.io/pen?&editors=001

export function GarageCalendar() {
    const calendarRef = React.useRef(null)
    const [addOpen, setAddOpen] = React.useState(false)
    const [editOpen, setEditOpen] = React.useState(false)
    const [viewEvent, setViewEvent] = React.useState({})
    const [currentEvents, setCurrentEvents] = React.useState([])
    const { username, role } = React.useContext(AuthContext)


    React.useEffect(() => {
        axiosInstance.post('timetable/getevent')
            .then((res) => {
                if (res.data.result) {
                    let data = res.data.data
                    setCurrentEvents(data.map(obj => {
                        return {
                            ...obj,
                            start: dayjs(obj.start).format('YYYY-MM-DDTHH:mm:00'),
                            end: dayjs(obj.end).format('YYYY-MM-DDTHH:mm:00'),
                            resourceId: obj.location,
                            color: typeColor(obj.type)
                        }
                    }))
                } else {
                    console.log(res.data)
                    alert('Failed to get events. Please contact admin.')
                }
            })
    }, [])

    // function handleDateSelect(selectInfo) {
    //     let title = prompt('Please enter a new title for your event')
    //     let calendarApi = selectInfo.view.calendar

    //     calendarApi.unselect() // clear date selection

    //     if (title) {
    //         calendarApi.addEvent({
    //             id: createEventId(),
    //             title,
    //             start: selectInfo.startStr,
    //             end: selectInfo.endStr,
    //             allDay: selectInfo.allDay
    //         })
    //     }
    // }

    function handleEventClick(clickInfo) {
        console.log(clickInfo.event)
        setEditOpen(true)
        setViewEvent(clickInfo.event)
    }

    function addEvent(formJson) {
        let data = {
            ...formJson,
            start: dayjs(formJson.start).format('YYYY-MM-DDTHH:mm:00'),
            end: dayjs(formJson.end).format('YYYY-MM-DDTHH:mm:00')
        }
        axiosInstance.post('timetable/addevent', data)
            .then((res) => {
                if (res.data.result) {
                    const calendarApi = calendarRef.current.getApi()
                    calendarApi.addEvent({
                        id: res.data.data.id,
                        title: formJson.title,
                        start: dayjs(formJson.start).format('YYYY-MM-DDTHH:mm:00'),
                        end: dayjs(formJson.end).format('YYYY-MM-DDTHH:mm:00'),
                        type: formJson.type,
                        location: formJson.location,
                        remarks: formJson.remarks,
                        resourceId: formJson.location,
                        username: username,
                        color: typeColor(formJson.type),
                        allDay: false
                    })
                } else {
                    alert('Failed to add events. Please contact admin.')
                }
            })
    }

    function handleEventChange(changeInfo) {
        const event = {
            ...changeInfo.event.extendedProps,
            id: changeInfo.event.id,
            title: changeInfo.event.title,
            start: changeInfo.event.startStr,
            end: changeInfo.event.endStr,
            location: changeInfo.event.getResources()[0].id
        }
        if (username === event.username) {
            axiosInstance.post('timetable/changeevent', event)
                .then((res) => {
                    if (!res.data.result) {
                        changeInfo.revert()
                    }
                })
                .catch((res) => {
                    changeInfo.revert()
                })
        } else {
            changeInfo.revert()
            alert(`This event is created by ${event.username} and it can only be modified by the same person.`)
        }
    }

    function handleEventRemove(removeInfo) {
        axiosInstance.post('timetable/removeevent', { id: removeInfo.event.id })
            .then((res) => {
                if (!res.data.result) {
                    removeInfo.revert()
                }
            })
            .catch((res) => {
                removeInfo.revert()
            })
    }

    function handleEvents(events) {
        setCurrentEvents(events)
    }

    function handleDateClick(dateClickInfo) {
        const calendarApi = calendarRef.current.getApi()
        calendarApi.changeView('resourceTimeGridDay', dateClickInfo.date)
    }

    if (currentEvents.length === 0) {
        return <></>
    }

    return (
        <>
            <AddEventDialog open={addOpen} setOpen={setAddOpen} addEvent={addEvent} />
            <EditEventDialog open={editOpen} setOpen={setEditOpen} viewEvent={viewEvent} />
            <FullCalendar
                schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
                ref={calendarRef}
                plugins={[dayGridPlugin, interactionPlugin, resourceTimeGridPlugin, scrollGridPlugin]}
                customButtons={{
                    addEventButton: {
                        text: "Add Event",
                        click: function () {
                            if (role === 100) {
                                setAddOpen(true)
                            } else {
                                alert("Only manager can add event.")
                            }
                        }
                    }
                }}
                headerToolbar={{
                    left: 'prev next dayGridMonth resourceTimeGridDay',
                    center: 'title',
                    right: 'addEventButton today'
                }}
                resourceGroupField={'location'}
                resources={locationList}
                initialView='resourceTimeGridDay'
                stickyFooterScrollbar={true}
                dayMinWidth={100}
                height={'100vh'}

                allDaySlot={false}

                editable={role === 100}
                selectable={false}
                eventOverlap={false}

                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                initialEvents={currentEvents} // alternatively, use the `events` setting to fetch from a feed
                dateClick={handleDateClick}
                // select={handleDateSelect}
                eventContent={renderEventContent} // custom render function
                eventClick={handleEventClick}
                eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                // eventAdd={function(){}}
                eventChange={handleEventChange}
                eventRemove={handleEventRemove}
            /* you can update a remote database when these fire:
            */
            />
        </>
    )
}

function renderEventContent(eventInfo) {
    if (eventInfo.view.type === 'dayGridMonth') {

        return (
            <div style={{backgroundColor: eventInfo.backgroundColor}}>
                <div>{eventInfo.timeText} - {eventInfo.event.title}</div>
                <div>{eventInfo.event.extendedProps.remarks}</div>
            </div>
        )
    } else {
        
    return (
        <>
            <div>{eventInfo.timeText} - {eventInfo.event.title}</div>
            <div>{eventInfo.event.extendedProps.remarks}</div>
        </>
    )
    }
}
