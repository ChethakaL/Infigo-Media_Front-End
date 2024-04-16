import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';
import SchedulePosting from "../components/SchedulePosting"; // Make sure to install react-modal if not already done

// import '@fullcalendar/core/main.css';
// import '@fullcalendar/daygrid/main.css';

// Define your modal styles
const customModalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        backgroundColor: '#FFF', // Change this to any non-transparent color you prefer
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px', // Optionally add some border radius
        padding: '20px', // Add some padding inside the modal
        border: '1px solid #CCC', // Optionally add a border
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optionally add a shadow effect
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 1000,
    }
};


// Ensure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function Scheduler() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    // Define your event colors
    const eventColors = {
        '1-10': 'color-scale-1',
        '11-20': 'color-scale-2',
        '21-30': 'color-scale-3',
        '31+': 'color-scale-4',
    };

    // Randomly assign event colors for demonstration purposes
    const events = Array.from({ length: 30 }, (_, index) => {
        const randomCount = Math.floor(Math.random() * 4) + 1;
        return {
            title: `${randomCount * 10} interactions`,
            date: new Date(2024, 3, index + 1), // April 2024, days 1-30
            color: eventColors[`${randomCount * 10}`],
        };
    });

    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr);
        setModalIsOpen(true);
    };

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                dateClick={handleDateClick}
            />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={customModalStyles}
                contentLabel="Selected Date"
            >
                {/* Render the SchedulePosting component inside the modal */}
                <SchedulePosting closeModal={() => setModalIsOpen(false)} selectedDate={selectedDate} />
            </Modal>
        </div>
    );
}

export default Scheduler;
