import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
declare var webkitSpeechRecognition: any;
@Component({
  selector: 'app-vot',
  templateUrl: './vot.component.html',
  styleUrls: ['./vot.component.scss'],
})
export class VotComponent implements OnInit {
  @Input() mic: boolean = false;
  @Output() voiceText = new EventEmitter();
  text = '';
recognition:any;
  ngOnInit() {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      this.recognition = new webkitSpeechRecognition();

      // Configure recognition settings
      this.recognition.continuous = true;
      this.recognition.interimResults = true;

      // Handle recognition results
      this.recognition.onresult = (event:any) => {
        const result = event.results[event.results.length - 1];
        const transcript = result[0].transcript;
        //emit transcript
        console.log(transcript)
        this.voiceText.emit(transcript);
      };

      // Handle recognition errors
      this.recognition.onerror = (event:any) => {
        console.error('Speech recognition error:', event.error);
      };
    } else {
      //outputText.textContent = "Speech recognition not supported in this browser.";
    }
  }

  startService(e:any){
    this.recognition.start();
    this.mic=true;
  }

  stopService(e:any){
    this.recognition.stop();
    this.mic=false;
  }
}
