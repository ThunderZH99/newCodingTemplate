// this file set the global configurations for the whole system

// ----------------- Please configure the settings here --------------------
// const backendServerModes = ['localhost', 'hkust-server', 'aws-server']
// const curServerMode = backendServerModes[2]

// this.faceEmotionList = ['anger', 'contempt', 'disgust', 'fear', 'happiness', 'neutral', 'sadness', 'surprise']
    // this.audioEmotionList = ['neutral', 'calm', 'happy', 'sad', 'angry', 'fearful', 'disgust', 'surprised']
    // this.textEmotionList = ['anger', 'disgust', 'fear', 'joy', 'sadness']

    // origin happy <=> angry
    const emotionList = ['anger', 'disgust', 'fear', 'happiness', 'neutral', 'sadness', 'surprise', 'contempt']

    // zhaojian's style
    const emotionColor = {
        'anger': '#EB757F',
        'disgust': '#B89DCA',
        'fear': '#70B576',
        'happiness': '#F8E47F',
        'neutral': '#bdbdbd',
        'sadness': '#96B4D7',
        'surprise': '#76B6CB',
        'contempt': '#762a83',
        'calm': '#bdbdbd',
        'empty': 'black'
    }

    // original color style
    // const emotionColor = {
    //     'anger': '#fe6271',
    //     'disgust': '#aa81f3',
    //     'fear': '#45b0e2',
    //     'happiness': '#fbca35',
    //     'neutral': '#bdbdbd',
    //     'sadness': '#4667cc',
    //     'surprise': '#3ec845',
    //     'contempt': '#762a83',
    //     'calm': '#08519c'
    // }

    const emotionMapping = {
        'anger': 'anger',
        'angry': 'anger',
        'disgust': 'disgust',
        'fear': 'fear',
        'fearful': 'fear',
        'happiness': 'happiness',
        'happy': 'happiness',
        'joy': 'happiness',
        'sadness': 'sadness',
        'sad': 'sadness',
        'neutral': 'neutral',
        'surprise': 'surprise',
        'surprised': 'surprise',
        'suprised':'surprise',
        'contempt': 'contempt',
        'calm': 'calm',
        'empty': 'empty'
    }
    // one-hot encoding for audio_emotion
    const audio_emotion = {
        'neutral': [1,0,0,0,0,0,0,0],
        'calm':[0,1,0,0,0,0,0,0],
        'happy':[0,0,1,0,0,0,0,0],
        'sad':[0,0,0,1,0,0,0,0],
        'angry':[0,0,0,0,1,0,0,0],
        'fearful': [0,0,0,0,0,1,0,0],
        'disgust':[0,0,0,0,0,0,1,0],
        'suprised':[0,0,0,0,0,0,0,1],
        'surprised':[0,0,0,0,0,0,0,1]
    }
    //one-hot encoding for facial_emotion
    const facial_emotion = {
        'anger': [1,0,0,0,0,0,0,0],
        'contempt':[0,1,0,0,0,0,0,0],
        'disgust':[0,0,1,0,0,0,0,0],
        'fear':[0,0,0,1,0,0,0,0],
        'happiness':[0,0,0,0,1,0,0,0],
        'neutral': [0,0,0,0,0,1,0,0],
        'sadness':[0,0,0,0,0,0,1,0],
        'surprise':[0,0,0,0,0,0,0,1]
    }
    // one-hot encoding for text_emotion
    const text_emotion = {
        'anger': [1,0,0,0,0],
        'disgust':[0,1,0,0,0],
        'fear':[0,0,1,0,0],
        'joy':[0,0,0,1,0],
        'sadness':[0,0,0,0,1]
    }
    
    function emotion2Color(color) {
        return emotionColor[emotionMapping[color]]
    }

export default {
    emotionList,
    emotionColor,
    emotionMapping,
    emotion2Color,
    // one hot encoding for emotion
    audio_emotion,
    facial_emotion,
    text_emotion
}
