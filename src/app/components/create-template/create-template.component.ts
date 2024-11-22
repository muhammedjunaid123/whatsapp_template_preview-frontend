import { Component, DestroyRef, input } from '@angular/core';

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
  Variables: Record<string, string> = {};
  buttons: Record<string, string> = {};
  maxButtons = 3; // Maximum number of buttons allowed
  buttonCounter = 0; // Counter to generate unique keys
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

  // Add a new button
  addButton(): void {
    if (Object.keys(this.buttons).length < this.maxButtons) {
      this.buttonCounter++;
      this.buttons[this.buttonCounter] = ''; // Add new button with empty name
    }
  }
  buttonlength(): number {
    return Object.keys(this.buttons).length
  }
  // Remove a button
  removeButton(key: string): void {
    delete this.buttons[key]; // Remove button by key
  }
  bold() {
    let selected: string = window.getSelection()?.toString() || '';
    if (selected === '') {
      return;
    }
    const escapedSelected = this.escapeRegex(selected);

    // Create a regex pattern that matches the exact selected text
    const regex = new RegExp(`(${escapedSelected})`, 'g');

    // Wrap the selected text with markdown *bold* syntax
    this.description = this.description.replace(regex, (match) => {
      // Check if the match already has bold syntax, if so, avoid double formatting
      if (!match.startsWith('*') || !match.endsWith('*')) {
        return `*${match}*`;
      }
      return match;
    });

    // Trigger the function to update any related actions after modifying the description
    this.descriptionfunc();
  }

  italic() {
    let selected: string = window.getSelection()?.toString() || '';
    if (selected === '') {
      return;
    }
    const escapedSelected = this.escapeRegex(selected);

    // Create a regex pattern that matches the exact selected text
    const regex = new RegExp(`(${escapedSelected})`, 'g');

    // Wrap the selected text with markdown _italic_ syntax
    this.description = this.description.replace(regex, (match) => {
      // Check if the match already has italic syntax, if so, avoid double formatting
      if (!match.startsWith('_') || !match.endsWith('_')) {
        return `_${match}_`;
      }
      return match;
    });

    // Trigger the function to update any related actions after modifying the description
    this.descriptionfunc();
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
  escapeRegex(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  formateVariables() {

    this.descriptionshow = this.description

    for (let key in this.Variables) {
      if (this.Variables[key]) {
        this.descriptionshow = this.descriptionshow.replace(new RegExp(this.escapeRegex(key), 'g'), this.Variables[key]);
      }

    }
  }

  titlefunc(inputText: string) {
    this.title = inputText
  }

  trackByFn(index: number, item: any): any {
    return item.key;
  }

  descriptionfunc() {
    let pattern = /{{([^}]*)}}/g;
    let match;
    let indices = [];
    while ((match = pattern.exec(this.description)) !== null) {
      indices.push(match.index);
    }
    for (let i = 0; i < indices.length; i++) {
      let c = 0
      let index = indices[i] + 2
      while (true) {
        index++
        if (this.description[index] == '}') {
          c++
        }
        if (c == 2) {
          let key = this.description.slice(indices[i], index + 1)
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
    for (let key in this.Variables) {
      if (this.Variables[key]) {
        this.descriptionshow = this.descriptionshow.replace(new RegExp(this.escapeRegex(key), 'g'), this.Variables[key]);
      }
    }

  }

  footerfunc(inputText: string) {
    this.footer = inputText
  }
}
