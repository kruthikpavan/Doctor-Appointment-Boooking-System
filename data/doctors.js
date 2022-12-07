const mongoCollections = require("../config/mongoCollections");
const doctors = mongoCollections.doctors;
const helpers = require("../helpers");
const bcrypt = require("bcryptjs");
const saltRounds = 16;
async function createDoctor(
    docName,
    category,
    qualification,
    hospital_id,
    dob,
    gender,
    email,
    phoneNumber,
    password){
    try {
        
        //Add validation
        const doctorCollection  = await doctors();

        let userData = await doctorCollection.findOne({email: email.toLowerCase()});
        if(userData != null || userData != undefined) throw 'This E-mail has already been used to register';
        let hashed = await bcrypt.hash(password, saltRounds);

        let newUser = {
            name: docName,
            category: category,
            qualification:qualification,
            hospital_id: hospital_id,
            dob: dob,
            gender: gender,
            email: email,
            phoneNumber: phoneNumber,
            password: hashed,
        }
        
        const insertDoc = await doctorCollection.insertOne(newUser);
       
        } catch (e) {
            console.log(e);
        }
}

async function getDoctorByID(id){
    try {
        let checkID = helpers.checkID(id);
        if(checkID === false) throw 'ID provided is invalid';
        const doctorCollection  = await doctors();
        let docData = await doctorCollection.findOne({_id: ObjectID(id)});
        if(docData == null) throw `No doctor with this ID - ${id}`
        docData['_id'] = docData['_id'].toString();
        return docData;
    } catch (e) {
        console.log('Could not fetch user by id' + e);
    }

}

async function removeDoctor(id){
    try {
        let checkID = helpers.checkID(id);
        if(checkID === false) throw 'ID provided is invalid';
        const doctorCollection  = await doctors();
        let docData = await doctorCollection.deleteOne({_id: ObjectID(id)});
        if(docData == null) throw `No doctor with this ID - ${id} and cannot delete`
        docData['_id'] = docData['_id'].toString();
        return `Doctor with this ID - ${id} has been deleted`;
    } catch (e) {
        console.log('Could not fetch user by id' + e);
    }
}


module.exports = {
    createDoctor,
    getDoctorByID,
    removeDoctor,
}