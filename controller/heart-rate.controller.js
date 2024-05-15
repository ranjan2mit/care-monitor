function groupMeasurementsByIntervalWithMinMax(data) {
    const interval = 15 * 60 * 1000;
    const groupedMeasurements = {};

    // Iterate through the data
    data.forEach(item => {
        const date = new Date(item.on_date);

        const intervalStart = new Date(Math.floor(date.getTime() / interval) * interval);
        const intervalStartISO = intervalStart.toISOString();
        if (!groupedMeasurements[intervalStartISO]) {
            groupedMeasurements[intervalStartISO] = {
                from_date: intervalStartISO,
                to_date: new Date(new Date(intervalStartISO).getTime() + interval).toISOString(),
                measurement :{
                    low: Number(item.measurement),
                    high: Number(item.measurement)
                }
            };
        } else {
            if(Number(item.measurement) < groupedMeasurements[intervalStartISO].measurement.low) {
                groupedMeasurements[intervalStartISO].measurement.low = Number(item.measurement) 
            }
            if(Number(item.measurement) > groupedMeasurements[intervalStartISO].measurement.high) {
                groupedMeasurements[intervalStartISO].measurement.high = Number(item.measurement) 
            }
         } 
    });
    let groupedMeasurementsRes = [];
     Object.keys(groupedMeasurements).forEach((key) => groupedMeasurementsRes.push(groupedMeasurements[key]));
    
    return groupedMeasurementsRes;
}

exports.groupMeasurementsByIntervalWithMinMax = groupMeasurementsByIntervalWithMinMax