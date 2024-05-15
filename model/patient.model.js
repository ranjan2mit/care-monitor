module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define( "patient", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        patient_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        orgid: {
            type: DataTypes.STRING,
            allowNull: true
        },
        clinical_data: {
            type: DataTypes.JSON,
            allowNull: true
        },
        analyze_data: {
            type: DataTypes.JSON,
            allowNull: true
        },
        createdat: {
            type: DataTypes.DATE,
            allowNull: true
        },
    }, {timestamps: false}, )
    return Patient
 }