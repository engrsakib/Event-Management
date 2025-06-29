import React from 'react'

export default function AddEvents() {
  return (
    <div>
      <h1>Add New Event</h1>
      <form>
        <div>
          <label htmlFor="eventName">Event Name</label>
          <input type="text" id="eventName" name="eventName" required />
        </div>
        <div>
          <label htmlFor="eventDate">Event Date</label>
          <input type="date" id="eventDate" name="eventDate" required />
        </div>
        <div>
          <label htmlFor="eventLocation">Event Location</label>
          <input type="text" id="eventLocation" name="eventLocation" required />
        </div>
        <button type="submit">Add Event</button>
      </form>
    </div>
  )
}
