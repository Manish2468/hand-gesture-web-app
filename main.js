prediction1= ""
prediction2=""
Webcam.set({
    width:350,
    heigth:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera")
Webcam.attach('#camera')

function take_snapshot(){
    Webcam.snap(function(data_URI){
        document.getElementById("result").innerHTML='<img id="capture_image" src="'+ data_URI +'"/>'
    });
}

console.log('ml5 version ',ml5.version)
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/00e_Y2D9Q/model.json',modelLoaded )
function modelLoaded(){
    console.log('model is loaded')
}

function speak(){
    var s=window.speechSynthesis
speakData1="The first prediction is " + prediction1
speakData2="The second prediction is " + prediction2
var utterThis=new SpeechSynthesisUtterance(speakData1+speakData2)
s.speak(utterThis)
}

function check(){
    img=document.getElementById("capture_image")                                       
    classifier.classify(img,gotResult)
}

function gotResult(error,result){
if(error){
    console.error(error)
}    
else{
    console.log(result)
    document.getElementById("result_emotion_name_1").innerHTML=result[0].label
    document.getElementById("result_emotion_name_2").innerHTML=result[1].label
    prediction1= result[0].label
    prediction2=result[1].label  
    speak()
    if(result[0].label=="happy"){
        document.getElementById("update_emoji_1").innerHTML="&#128512;"
    }
    if(result[0].label=="sad"){
        document.getElementById("update_emoji_1").innerHTML="&#128532;"
    }
    if(result[0].label=="angry"){
        document.getElementById("update_emoji_1").innerHTML="&#128544;"
    }
    if(result[1].label=="happy"){
        document.getElementById("update_emoji_2").innerHTML="&#128512;"
    }
    if(result[1].label=="sad"){
        document.getElementById("update_emoji_2").innerHTML="&#128532;"
    }
    if(result[1].label=="angry"){
        document.getElementById("update_emoji_2").innerHTML="&#128544;"
    }   
}
}