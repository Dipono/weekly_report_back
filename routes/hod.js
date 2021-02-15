const express = require('express');
const app = express();
const router = express.Router();
const connection = require('../config/config')

var subjCode = '';
var reportNo = '';
var numStudents = '';
var numAttended = '';
var weekTreachings = '';
var assess = '';
var challenges = '';

app.get('/', function (req, res, next) 
{

    connection.query(`SELECT r.reportNum, r.numStudents, r.attendAvg, r.activities, r.assess, r.challRecomm, s.subjCode
                        FROM reports r, lecture_subject ls, subject s, lecture l
                        WHERE ls.subjCode = s.subjCode 
                        AND ls.lecNum = l.lecNum
                        AND ls.lecSubId = r.lecSubId
                        `, function (error, results) {

        if (error) 
        {
            console.log('Error selecting from query ')
        }
        else if (results.length > 0) 
        {
            reportNo = results[0].reportNum
            numStudents = results[0].numStudents
            numAttended = results.numAttended
            weekTreachings = results[0].activities 
            assess = results[0].assess
            challenges = results[0].challRecomm
            subjCode = results[0].subjCode
        }
        else
        {
            console.log('Nothing was selected.')
        }
    
    });
}); 

//console.log('So far so good!')
module.exports = router