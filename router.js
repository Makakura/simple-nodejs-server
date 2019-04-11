const express = require('express')
const router = express.Router()
const AppDAO = require('./DAO/dao');
const PatientService = require('./DAO/patient-service');
const dao = new AppDAO('./database.sqlite3');
const patientDB = new PatientService(dao);

// middleware that is specific to this router
router.use(function (req, res, next) {
    next()
});

// Get all patient
router.get('/patients', function (req, res) {
    getAllPatients(res);
});

// Get patient by id
router.get('/patients/:_id', function (req, res) {
    const id = req.params._id;
    getPatientById(res, id);
});

// Add new patient
router.post('/patients', function (req, res) {
    addPatients(req, res);
});

// update patient name
router.put('/patients', function (req, res) {
    updateNamePatient(req, res);
});

// delete patient by id
router.delete('/patients/:_id', function (req, res) {
    const id = req.params._id;
    removePatient(res, id);
});

// delete all patient
router.delete('/patients', function (req, res) {
    removeAllPatients(res);
});

getPatientById = function (res, id) {
    patientDB.getById(id).then(data => {
        requestSuccess(res, data);
    }, err => {
        requestError(res, err);
    });
}

getAllPatients = function (res) {
    patientDB.getAll().then(data => {
        requestSuccess(res, data);
    }, err => {
        requestError(res, err);
    });
}

addPatients = function (req, res) {
    var jsonString = '';
    req.on('data', function (data) {
        jsonString += data;
    });
    req.on('end', function () {
        var patient = JSON.parse(jsonString)
        patientDB.create(patient.name).then(data => {
            requestSuccess(res, data);
        }, err => {
            requestError(res, err);
        });
    });
    
}

updateNamePatient = function (req, res) {
    var jsonString = '';
    req.on('data', function (data) {
        jsonString += data;
    });
    req.on('end', function () {
        var patient = JSON.parse(jsonString)
        patientDB.update(patient.id, patient.name).then(data => {
            requestSuccess(res, data);
        }, err => {
            requestError(res, err);
        });
    });
    
}

removePatient = function (res, id) {
    patientDB.delete(id).then(data => {
        requestSuccess(res, data);
    }, err => {
        requestError(res, err);
    });
}

removeAllPatients = function (res) {
    patientDB.deleteAll().then(data => {
        requestSuccess(res, data);
    }, err => {
        requestError(res, err);
    });
}

requestSuccess = function (res, data) {
    res.json({
        success: true,
        message: 'success',
        data: data
    });
}

requestError = function (res, error) {
    res.json({
        success: false,
        message: error,
        data: {}
    });
}

module.exports = router;