API = "WS1R7Q9VAYGE1CFA8GTJXZA9LKBYF0HODCE"
var i = 0;
var speed = 20;
var reset = false;
const xhr = new XMLHttpRequest();

document.body.style.backgroundImage = 'url("./resources/148566.jpg")';

async function query(input) {
	const url = "https://api.betterapi.net/youchat?inputs=" + input.inputs.replace(/ /g, "%20") + "&key=" + API;
	console.log(url);
	let result;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			result = "Oh no, something went wrong on my end and I couldn't complete the task you requested.";
		} else {
			const json = await response.json();
			result = json.generated_text;
		}
	} catch (error) {
		console.error('Error occurred: ' + error.message + '2');
		result = "Oh no, something went wrong on my end and I couldn't complete the task you requested.";
	}
	if (result.includes("YouBot")) {
		result = result.replace("YouBot", "Samuel")
	}
	return result;
}

// function tts(data, num) {
// 	if (reset == false) {
// 		new Audio('./resources/greetings_'+num+'.mp3')
// 	}
// 	else if ('speechSynthesis' in window) {
// 		var utterance = new SpeechSynthesisUtterance(data)
// 		speechSynthesis.speak(utterance)
// 	} else {

// 	}
// 	reset = true
// }

var conversation_starter = [
	"Greetings, this is Samuel. What information may I assist you with today?",
	"Salutations! Samuel is the name. How can I enhance your day with information?",
	"Hello, Samuel is at your service. What queries do you have today?",
	"Good day to you. I am Samuel, standing by to engage in informative discourse. What would you like to discuss?",
	"Initiating conversation protocol. I am Samuel. How may I assist you in your quest for knowledge?",
	"System ready! This is your AI, Samuel. What fascinating topics shall we explore today?"
];

document.querySelector(".output-container").append("Samuel: ")
num = Math.floor(Math.random()*6)+1
r = conversation_starter[num-1]

var images = ['greetings_1.gif', 'greetings_2.gif', 'greetings_3.gif', 'greetings_4.gif', 'greetings_5.gif', 'greetings_6.gif', 'default.gif'];
var loadedImages = {};

images.forEach(function(src) {
    var img = new Image();
    img.src = './resources/' + src;
    loadedImages[src] = img;
});

const pfp = document.querySelector('.pfp');

function replaceimg(filename) {
    var imgElements = pfp.querySelectorAll('.pfp-img');
    var topImg = imgElements[0].style.opacity == '1' ? imgElements[0] : imgElements[1];
    var bottomImg = imgElements[0].style.opacity == '1' ? imgElements[1] : imgElements[0];

    bottomImg.src = './resources/' + filename;
    topImg.style.opacity = '0';
    bottomImg.style.opacity = '1';
}


t = 5000
if (num == 4){
	t = 4000
} else if (num == 6) {
	t = 6000
}

file = 'greetings_'+(num)+'.gif'

replaceimg(file)

setTimeout(
	function() {
		replaceimg("default.gif")
	}, t
)

typeWriter(".output-container", r)
// tts(r, num)

function main(){
	var input = document.getElementById("query").value;
	input = input.replace("\n", "")
	document.getElementById("query").value = "";
	document.querySelector(".output-container").append("\nUser: "+input);
	document.querySelector(".output-container").scrollTop = textarea.scrollHeight;
	query({"inputs": input}).then((response) => {
		console.log(response)
		document.querySelector(".output-container").append("\nSamuel: ")
		replaceimg("speak.gif")
		typeWriter(".output-container", response)
		// tts(response)
	});
}

var button = document.getElementById("send");

document.addEventListener("keypress", function (event) {
	if (!event.shiftKey && event.key === "Enter")
	main()
})
button.addEventListener("click", function(){
	main()
})

function typeWriter(elem, txt) {
	if (i < txt.length) {
		textarea = document.querySelector(elem)
		textarea.scrollTop = textarea.scrollHeight;
		textarea.innerHTML += txt.charAt(i);
		i++;
		setTimeout(() => {
			typeWriter(elem, txt)
		}, speed);
	} else {
		i = 0;
		if (!conversation_starter.includes(txt)) {
			replaceimg("default.gif")
		}
	}
}