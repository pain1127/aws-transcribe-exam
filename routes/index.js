const express = require('express');
const router = new express.Router();
const AWS = require('aws-sdk');


AWS.config.update({
  region: 'ap-northeast-2',
});

const transcribeService = new AWS.TranscribeService();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/transcribe', function(req, res, next) {

  const params = 
  {
    TranscriptionJobName: 'vcast-stt-transcribe-03',
    Media: {MediaFileUri : 's3://vcast-dev-catenoid-s3-storage/transcribe/input/ronaldo_audio.mp4'},
    MediaFormat: 'mp4',
    OutputBucketName: 'vcast-dev-catenoid-s3-storage',
    LanguageCode: 'ko-KR', // english india or use en-US for US
    OutputKey: 'transcribe/output/vcast-stt-transcribe-03.json',
    Subtitles: {
      Formats: ['vtt', 'srt']
    }
  }

  transcribeService.startTranscriptionJob(params, function(err, data) {
    if (err) res.send(err, err.stack); // an error occurred
    else     res.send(data);           // successful response
  });

 //  res.render('index', { title: 'Express' });
});

module.exports = router;
