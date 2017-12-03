const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = function(req, res) {
    if (!req.body.phone) {
        return res.status(422).send({ error: 'You must provide a phone number' });
    }
    // validate the phone and force it to string if it was passed as number
    // and remove with regexp all characters that were not alphanumeric
    const phone = String(req.body.phone).replace(/[^\d]/g, "");

    // Find the user model
    admin.auth().getUser(phone)
    .then((userRecord) => {
        // generate the code
        const generatedCode = Math.floor(1000 + Math.random() * 9000);
        //send the code to the user using twilio
        return twilio.messages.create({
            'body': 'Code ' + generatedCode + ', do not reply.',
            'to': 'YOUR_PHONE',
            'from': 'TWILIO_FROM_PHONE'
        }).then((message) => {
            // create collection inside firebase because user model (from auth module)
            // allows just fields related to the user therefore we can't store the 'code'
            var usersRef = admin.database().ref('/users');
            var myRef = usersRef.child(phone);
            return myRef.update({ 'code': generatedCode, 'codeValid': true })
            .then((error) =>{
                if (!error) {
                    res.send({ success: true, code: generatedCode, id: message.sid});
                } else {
                    res.send({success: false, code: generatedCode});
                }
            }).catch((err) => {
                res.status(422).send({error0: err});
            });
        }).catch((err) => {
            res.status(422).send({error1: err});
        });
    }).catch((err) => {
        res.status(422).send({error2: err});
    });
}
