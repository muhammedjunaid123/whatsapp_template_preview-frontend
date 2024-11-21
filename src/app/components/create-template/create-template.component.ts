import { Component, DestroyRef } from '@angular/core';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrl: './create-template.component.css'
})
export class CreateTemplateComponent {
  title: string = '';
  description: string = '';
  footer: string = '';
  descriptionshow: string = '';
  currentTime!: string;
  Variables: any = {};
  constructor() {
    this.updateTime();
    setInterval(() => this.updateTime(), 60000); // Update time every minute
  }

  // Reset all input fields
  resetForm() {
    this.title = '';
    this.description = '';
    this.footer = '';

  }
  bold() {
    let selected: string[] = window.getSelection()?.toString().split('\n') || []
    if (selected[0] == '') {
      return
    }
    for (let i = 0; i < selected?.length; i++) {
      let regex = new RegExp(selected[i], 'g')
      this.description = this.description.replace(regex, `*${selected[i]}*`);
    }
    this.descriptionfunc()
  }
  italic() {
    let selected: string[] = window.getSelection()?.toString().split('\n') || []
    if (selected[0] == '') {
      return
    }
    for (let i = 0; i < selected?.length; i++) {
      let regex = new RegExp(selected[i], 'g')
      this.description = this.description.replace(regex, `_${selected[i]}_`);
    }
    this.descriptionfunc()
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


  descriptionfunc() {
    let pattern = /{{([^}]*)}}/g;
    let match;
    let indices = [];
    this.Variables={}
    while ((match = pattern.exec(this.description)) !== null) {
      indices.push(match.index);
    }
    for (let i = 0; i < indices.length; i++) {
      let c = 0
      let index = indices[i] + 2
      while (true) {
        index++
        if (this.description[index] == '}') {
          console.log(this.description[index]);

          c++
        }
        if (c == 2) {
          let key = this.description.slice(indices[i], index + 1)
          console.log(key);

          if (!this.Variables[key]) {
            this.Variables[key] = ''
          }
          break;
        }
        if (this.description.length < index) {
          break
        }
      }
    }

    this.descriptionshow = this.formatText(this.description)
  }

  footerfunc(inputText: string) {
    this.footer = inputText
  }
}
