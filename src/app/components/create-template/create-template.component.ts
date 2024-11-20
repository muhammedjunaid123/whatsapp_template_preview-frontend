import { Component } from '@angular/core';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrl: './create-template.component.css'
})
export class CreateTemplateComponent {
  title: string = '';
  description: string = '';
  footer: string = '';
  currentTime!: string;

  constructor() {
    this.updateTime();
    setInterval(() => this.updateTime(), 60000); // Update time every minute
  }

  // Reset all input fields
  resetForm() {
    console.log(this.title.split(' '));
    console.log(this.description.split(' '));

    this.title = '';
    this.description = '';
    this.footer = '';
  }

  // Update timestamp
  updateTime() {
    const now = new Date();
    this.currentTime = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
  }
  formatText(inputText: string) {
   
    // Bold formatting: *text*
    inputText = inputText.replace(/\*(.*?)\*/g, '<b>$1</b>');

    // Italic formatting: _text_
    inputText = inputText.replace(/_(.*?)_/g, '<i>$1</i>');

    return inputText;
  }

  titlefunc(inputText: string) {
    this.title = inputText
  }
  descriptionfunc(inputText: string) {
    this.description = this.formatText(inputText)
  }
  footerfunc(inputText: string) {
    this.footer = inputText
  }
}
