const express = require('express');
const dotenv = require('dotenv');
const app = new express();
dotenv.config();


function getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;



    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth')

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,    
        }),
        serviceUrl: api_url,            
    });
    return naturalLanguageUnderstanding;
}

function retrieveSentimentText(textToAnalyse,res){
    let naturaLanguageUnderstanding = getNLUInstance()
    const analyzeParams = {
        'features': {
                sentiment: {}
            },
        'text': textToAnalyse
    };
  
    naturaLanguageUnderstanding.analyze(analyzeParams)
    .then(analyzeResults => {
            result = analyzeResults.result.sentiment.document.label.toString()
            res.send(result);
        }).catch(err => {
          res.send(err.toString());
        });
}


function retrieveSentimentURL(urlToAnalyze,res){
    let naturaLanguageUnderstanding = getNLUInstance()
    const analyzeParams = {
        'features': {
                sentiment: {}
            },
        'url': urlToAnalyze
    };
  
    naturaLanguageUnderstanding.analyze(analyzeParams)
    .then(analyzeResults => {
            result = analyzeResults.result.sentiment.document.label.toString()
            res.send(result);
        }).catch(err => {
          res.send(err.toString());
        });
}

function retrieveEmotionText(textToAnalyse,res){
    let naturaLanguageUnderstanding = getNLUInstance()
    const analyzeParams = {
        'features': {
                emotion: {}
            },
        'text': textToAnalyse
    };
  
    naturaLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
            emotions = analysisResults.result.emotion.document.emotion
            res.send(emotions)
        }).catch(err => {
          res.send(err.toString());
        });
}

function retrieveEmotionUrl(urtlToAnalyze,res){
    let naturaLanguageUnderstanding = getNLUInstance()
    const analyzeParams = {
        'features': {
                emotion: {}
            },
        'url': urtlToAnalyze
    };
  
    naturaLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
            emotions = analysisResults.result.emotion.document.emotion
            res.send(emotions)
        }).catch(err => {
          res.send(err.toString());
        });
}



app.use(express.static('client'))
const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    let urtlToAnalyze = req.query.url
    retrieveEmotionUrl(urtlToAnalyze,res)
});

app.get("/url/sentiment", (req,res) => {
    let urtlToAnalyze = req.query.url
    retrieveSentimentURL(urtlToAnalyze,res)
});

app.get("/text/emotion", (req,res) => {
    let textForEmotions = req.query.text;
    retrieveEmotionText(textForEmotions,res);
});

app.get("/text/sentiment", (req,res) => {
    let textToCheck = req.query.text;
    retrieveSentimentText(textToCheck,res);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

