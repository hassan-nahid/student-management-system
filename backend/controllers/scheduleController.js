import Schedule from "../models/scheduleModel.js";

// Get all schedules
export const getSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find();
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch schedules", error: error.message });
    }
};

export const getSchedulesById = async (req, res) => {
    const { id } = req.params;
    try {
        const schedules = await Schedule.findById(id);
        if (!schedules) {
            return res.status(404).json({ message: "Schedules not found" });
        }
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch schedules", error: error.message });
    }
};

// Get schedules for a specific class
export const getSchedulesByClass = async (req, res) => {
    const { classNumber } = req.params;
    try {
        const schedules = await Schedule.find({ classNumber });
        if (!schedules) {
            return res.status(404).json({ message: "Schedules not found" });
        }
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch schedules", error: error.message });
    }
};

// Add a new schedule

export const addSchedule = async (req, res) => {
    const { classNumber, day, period, subject, teacher, time } = req.body;

    // Validate required fields
    if (!classNumber || !day || !period || !subject || !teacher || !time) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // Creating a new schedule using the received data
        const newSchedule = new Schedule({
            classNumber,
            day,
            periods: [
                {
                    period,
                    subject,
                    teacher,
                    time
                }
            ]
        });

        // Save the new schedule to the database
        await newSchedule.save();

        // Send success response with the newly created schedule
        res.status(201).json({
            message: "Schedule added successfully",
            schedule: newSchedule,
        });
    } catch (error) {
        // Handle errors during the save operation
        res.status(500).json({
            message: "Failed to add schedule",
            error: error.message,
        });
    }
};


// Update a schedule
export const updateSchedule = async (req, res) => {
    const { id } = req.params;
    const { classNumber, day, period, subject, teacher, time } = req.body;

    // Validate required fields
    if (!classNumber || !day || !period || !subject || !teacher || !time) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // Find the schedule by ID
        const schedule = await Schedule.findById(id);
        if (!schedule) {
            return res.status(404).json({ message: "Schedule not found" });
        }

        // Update schedule fields
        schedule.classNumber = classNumber;
        schedule.day = day;

        // Update the `periods` field
        schedule.periods = [
            {
                period,
                subject,
                teacher,
                time,
            },
        ];

        // Save the updated schedule
        const updatedSchedule = await schedule.save();

        // Send success response with the updated schedule
        res.status(200).json({
            message: "Schedule updated successfully",
            schedule: updatedSchedule,
        });
    } catch (error) {
        // Handle errors during the update operation
        res.status(500).json({
            message: "Failed to update schedule",
            error: error.message,
        });
    }
};




// Delete a schedule

export const deleteSchedule = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedSchedule = await Schedule.findByIdAndDelete(id);
        if (!deletedSchedule) {
            return res.status(404).json({ message: "Schedule not found" });
        }
        res.status(200).json({ message: "Schedule deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete schedule", error: error.message });
    }
};
