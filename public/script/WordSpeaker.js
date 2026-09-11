import {Cards} from './Cards.js';

class WordSpeaker {
    constructor() {
        //words, lang = "de-DE"
        this.words = words;
        this.lang = lang;
        this.voices = [];
        this.voice = null;

        this.initVoices();
    }

    initVoices() {
        const loadVoices = () => {
            this.voices = speechSynthesis.getVoices();
            this.voice = this.voices.find(v => v.lang === this.lang) || null;
        };

        loadVoices();
        speechSynthesis.onvoiceschanged = loadVoices;
    }

    speak(word) {
        if (!word) return;

        speechSynthesis.cancel(); // остановить предыдущую речь

        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = this.lang;
        utterance.voice = this.voice;
        utterance.rate = 0.9;
        utterance.pitch = 1;

        speechSynthesis.speak(utterance);
    }

    speakByIndex(index) {
        const word = this.words[index];
        this.speak(word);
    }

    speakAll(delay = 1200) {
        let i = 0;

        const speakNext = () => {
            if (i >= this.words.length) return;
            this.speak(this.words[i]);
            i++;
            setTimeout(speakNext, delay);
        };

        speakNext();
    }
}
