const video = document.getElementById("videoInput")
const canvasFrame = document.getElementById("canvasFrame")
const posture = document.getElementById('posture');
const controls = document.getElementById('controls')
let audio = new Audio('meme-sound.mp3')
const stvtySelection = document.getElementById('sensitivity')
const soundSelection = document.getElementById('sound')
const brk = document.getElementById('break')
let minLevel = 0
let sensitivity = 8
navigator.mediaDevices.getUserMedia({video: true, audio: false})
	.then((stream) => {
		video.srcObject = stream
		video.play()
	}).catch((err) => {
		console.log(err)
	})		

stvtySelection.addEventListener('change', () => {
	const newSensitivity = parseInt(stvtySelection.value)
	minLevel = minLevel - sensitivity + newSensitivity
	sensitivity = newSensitivity
})

soundSelection.addEventListener('change', () => {
	audio = new Audio(soundSelection.value)
})

window.addEventListener('load', () => {
	cv['onRuntimeInitialized']=()=>{
		// playing video from webcam
			video.addEventListener("loadedmetadata", () => {
			video.height = video.videoHeight
			video.width = video.videoWidth
			controls.style.width = video.width.toString() + 'px'
			// play video on canvas
			fetch('haarcascade_frontalface_alt.xml')
			.then(res => res.arrayBuffer())
			.then(buffer => {
				cv.FS_createDataFile('/', 'haarcascade_frontalface_alt.xml', new Uint8Array(buffer), true, false, false)
				let src = new cv.Mat(video.height, video.width, cv.CV_8UC4)
				let dst = new cv.Mat(video.height, video.width, cv.CV_8UC1)
				let gray = new cv.Mat()
				let faces = new cv.RectVector()
				let classifier = new cv.CascadeClassifier('/haarcascade_frontalface_alt.xml');
				let captureMode = false
				let goodPosture = false
				let stop = false
				let playAudio = () => {};
				const cap = new cv.VideoCapture(video)
				function process_image() {
					let begin = Date.now()
					cap.read(src)
					src.copyTo(dst)
					cv.cvtColor(dst, gray, cv.COLOR_RGBA2GRAY, 0)
					classifier.detectMultiScale(gray, faces, 1.1, 3, 0)
					if (faces.size() == 1) {
						let face = faces.get(0)
						let faceBottom = face.y + face.height;
						let point1 = new cv.Point(face.x, face.y);
						let point2 = new cv.Point(face.x + face.width, faceBottom) 
						cv.rectangle(dst, point1, point2, [255, 0, 0, 255]);
						if (captureMode) {
							minLevel = Math.max(minLevel, faceBottom) 
						} else {
							if ((faceBottom >= minLevel)) {
								playAudio()
								if (goodPosture) {
									posture.innerText = "Bad Posture"
									posture.style.backgroundColor = 'rgb(255, 0, 0)'	
									goodPosture = false
								}
							} else if ((faceBottom < minLevel) && !goodPosture) {
								posture.innerText = "Good Posture"
								posture.style.backgroundColor = 'rgb(0, 255, 0)'
								goodPosture = true;
							}
						}
					}	
					cv.line(dst, new cv.Point(0, minLevel), new cv.Point(video.width - 1, minLevel), [0, 0, 255, 255])
					cv.imshow('canvasFrame', dst)
					let delay = (1000 / 60) - (Date.now() - begin)
					!stop && setTimeout(process_image, delay)
				}
				setTimeout(process_image, 0)
				const button = document.createElement('button');
				button.innerText = 'Capture Posture'
				function capturePosture() {
					captureMode = true;
					minLevel = 0;
					button.disabled = true;
					playAudio = () => {audio.play()}
					setTimeout(() => {captureMode = false; minLevel += sensitivity; button.disabled = false}, 3000)
				}
				button.addEventListener('click', capturePosture)
				controls.appendChild(button)
				brk.addEventListener('click', () => {if (stop) {setTimeout(process_image, 0); brk.innerText="Take a break"; button.disabled=false} else {brk.innerText="Resume"; button.disabled=true} stop=!stop})
			})	
		})
	};
})
