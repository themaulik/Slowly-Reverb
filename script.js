// State Management
let currentStep = 1;
let audioFile = null;
let audioBuffer = null;
let processedBlob = null;
let processedFileName = '';

// DOM Elements
const steps = {
    1: document.getElementById('step-upload'),
    2: document.getElementById('step-preferences'),
    3: document.getElementById('step-processing'),
    4: document.getElementById('step-download')
};

const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const trackNameEl = document.getElementById('track-name');
const trackSizeEl = document.getElementById('track-size');
const speedSlider = document.getElementById('speed-slider');
const speedValue = document.getElementById('speed-value');
const reverbSlider = document.getElementById('reverb-slider');
const reverbValue = document.getElementById('reverb-value');
const processingStatus = document.getElementById('processing-status');

// Step Navigation
function goToStep(step) {
    Object.values(steps).forEach(el => el.classList.remove('active'));
    steps[step].classList.add('active');
    currentStep = step;
}

// File Upload Handling
dropZone.addEventListener('click', () => fileInput.click());

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFile(files[0]);
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) handleFile(e.target.files[0]);
});

function handleFile(file) {
    if (!file.type.startsWith('audio/')) {
        alert('Please upload a valid audio file (MP3, WAV, OGG, etc.)');
        return;
    }
    
    audioFile = file;
    processedFileName = file.name.replace(/\.[^/.]+$/, '') + '_slowlywood.mp3';
    
    trackNameEl.textContent = file.name;
    trackSizeEl.textContent = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
    
    goToStep(2);
}

// Slider Updates
speedSlider.addEventListener('input', (e) => {
    speedValue.textContent = e.target.value + 'x';
});

reverbSlider.addEventListener('input', (e) => {
    reverbValue.textContent = e.target.value + '%';
});

// Navigation Buttons
document.getElementById('btn-back-upload').addEventListener('click', () => {
    goToStep(1);
    fileInput.value = '';
    audioFile = null;
});

document.getElementById('btn-reset').addEventListener('click', () => {
    goToStep(1);
    fileInput.value = '';
    audioFile = null;
    processedBlob = null;
    speedSlider.value = 0.8;
    speedValue.textContent = '0.8x';
    reverbSlider.value = 50;
    reverbValue.textContent = '50%';
});

document.getElementById('btn-process').addEventListener('click', processAudio);
document.getElementById('btn-download').addEventListener('click', downloadAudio);

// Audio Processing
async function processAudio() {
    goToStep(3);
    
    try {
        processingStatus.textContent = 'Reading audio file...';
        const arrayBuffer = await audioFile.arrayBuffer();
        
        processingStatus.textContent = 'Decoding audio data...';
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        
        processingStatus.textContent = 'Applying slow & reverb effects...';
        const processedBuffer = await applyEffects(audioBuffer, audioContext);
        
        processingStatus.textContent = 'Encoding to MP3...';
        processedBlob = encodeMP3(processedBuffer);
        
        processingStatus.textContent = 'Finalizing...';
        setTimeout(() => {
            goToStep(4);
        }, 500);
        
    } catch (error) {
        console.error('Processing error:', error);
        alert('An error occurred while processing the audio. Please try a different file.');
        goToStep(1);
    }
}

async function applyEffects(buffer, context) {
    const speed = parseFloat(speedSlider.value);
    const reverbAmount = parseInt(reverbSlider.value) / 100;
    
    // Calculate new length based on speed
    const newLength = Math.ceil(buffer.length / speed);
    const sampleRate = buffer.sampleRate;
    
    // Create offline context for rendering
    const offlineContext = new OfflineAudioContext(
        buffer.numberOfChannels,
        newLength,
        sampleRate
    );
    
    // Create source
    const source = offlineContext.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = speed;
    
    // Create reverb (convolver)
    const convolver = offlineContext.createConvolver();
    convolver.buffer = createReverbImpulseResponse(offlineContext, 2.0, 2.0); // 2 seconds decay
    
    // Create gain nodes for mixing
    const dryGain = offlineContext.createGain();
    const wetGain = offlineContext.createGain();
    
    dryGain.gain.value = 1.0;
    wetGain.gain.value = reverbAmount;
    
    // Connect graph: source -> dryGain -> destination
    //              source -> convolver -> wetGain -> destination
    source.connect(dryGain);
    source.connect(convolver);
    convolver.connect(wetGain);
    
    dryGain.connect(offlineContext.destination);
    wetGain.connect(offlineContext.destination);
    
    source.start(0);
    
    return await offlineContext.startRendering();
}

function createReverbImpulseResponse(context, duration, decay) {
    const sampleRate = context.sampleRate;
    const length = sampleRate * duration;
    const impulse = context.createBuffer(2, length, sampleRate);
    
    for (let channel = 0; channel < 2; channel++) {
        const channelData = impulse.getChannelData(channel);
        for (let i = 0; i < length; i++) {
            // Exponential decay with random noise
            channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
        }
    }
    
    return impulse;
}

// MP3 Encoding using LameJS
function encodeMP3(audioBuffer) {
    const numChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    
    // Initialize MP3 encoder (128kbps)
    const mp3encoder = new lamejs.Mp3Encoder(numChannels, sampleRate, 128);
    
    // Convert float32 to int16 PCM
    const left = floatTo16BitPCM(audioBuffer.getChannelData(0));
    const right = numChannels > 1 ? floatTo16BitPCM(audioBuffer.getChannelData(1)) : left;
    
    const sampleBlockSize = 1152; // LAME works best with 1152 sample blocks
    const mp3Data = [];
    
    for (let i = 0; i < left.length; i += sampleBlockSize) {
        const leftChunk = left.subarray(i, i + sampleBlockSize);
        const rightChunk = right.subarray(i, i + sampleBlockSize);
        
        const mp3buf = mp3encoder.encodeBuffer(leftChunk, rightChunk);
        if (mp3buf.length > 0) {
            mp3Data.push(mp3buf);
        }
    }
    
    // Flush remaining data
    const end = mp3encoder.flush();
    if (end.length > 0) {
        mp3Data.push(end);
    }
    
    return new Blob(mp3Data, { type: 'audio/mp3' });
}

function floatTo16BitPCM(input) {
    const output = new Int16Array(input.length);
    for (let i = 0; i < input.length; i++) {
        // Clamp to [-1, 1]
        const s = Math.max(-1, Math.min(1, input[i]));
        // Convert to 16-bit integer
        output[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    return output;
}

// Download Handler
function downloadAudio() {
    if (!processedBlob) return;
    
    const url = URL.createObjectURL(processedBlob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = processedFileName;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}
