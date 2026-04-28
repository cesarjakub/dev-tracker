class TimerBeep extends HTMLElement {
    constructor() {
        super();
        this._context = null;
    }

    static get observedAttributes() {
        return ["frequency", "duration"];
    }

    beep(){
        if (!this._context){
            this._context = new AudioContext();
        }

        const context = this._context;
        const frequency = parseFloat(this.getAttribute("frequency") || '800');
        const duration = parseFloat(this.getAttribute("duration") || '200') / 1000;

        const oscillator = context.createOscillator();
        const gainNode = context.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(context.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, context.currentTime);

        gainNode.gain.setValueAtTime(0.3, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);

        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + duration);
    }
}

customElements.define("timer-beep", TimerBeep);

export default TimerBeep;