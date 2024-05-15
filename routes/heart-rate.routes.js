const express = require('express');
const heartRateController = require('../controller/heart-rate.controller')
const heartApiRuoter = express.Router();
const db = require("../model");
const Patient = db.patient;
heartApiRuoter.post('/heart-rate', async (req, res) => {
    try {
        const payload = req.body;
        const { HEART_RATE } = payload?.clinical_data;
        const hearData = HEART_RATE.data;
        hearData.sort(function(s,e) { return new Date(s.on_date) - new Date(e.on_date)});
        let groupedMeasurements = heartRateController.groupMeasurementsByIntervalWithMinMax(hearData)
        let patientData = {
            patient_id: payload.patient_id,
            orgid: payload.orgId,
            createdat: new Date(),
            clinical_data:HEART_RATE,
            analyze_data: groupedMeasurements,
        }
        // Saving data to database
       let patientResult = await Patient.create(patientData)
       console.log('Database ID:',patientResult.id)
       let response = payload?.clinical_data;
       response.PROCESSED_HEART_RATE = groupedMeasurements
       res.status(200).json({ message: 'Heart rate data saved successfully', clinical_data: response });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = heartApiRuoter;