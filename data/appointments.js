const mongoCollections = require("../config/mongoCollections");
const appointments = mongoCollections.appointments;

//schema
// { 
//     "_id":"1b6789b3-c0d4-4f8c-b20a-6a1d4b5b1234", 
//       "User_id":"rocky24@gmail.com", 
//       "doctor_id":"Manuel1902", 
//       "time":"08:30", 
//       "date":"02/02/2022", 
//         "status": 'pending'
//     } 

async function createAppointment(userID,doctorId,date,time){




}

async function getAppointmentByID(id){
    if(!id) throw 'Appointment ID is invalid';
    

}

async function removeAppointment(){

}

async function getAppointmentByUser(){
    
}



module.exports = {
    createAppointment,
    getAppointmentByID,
    removeAppointment,
    removeAppointment,
    getAppointmentByUser
}