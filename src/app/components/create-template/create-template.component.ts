import { Component, DestroyRef, input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TemplateService } from '../../services/template/template.service';
import { Router } from '@angular/router';

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
  maxButtons = 3;
  buttonCounter = 0;
  constructor(private _toastr: ToastrService, private _templateService: TemplateService, private _router: Router) {

  }
  resetForm() {
    this.title = '';
    this.description = '';
    this.footer = '';

  }


  addButton(): void {
    if (Object.keys(this.buttons).length < this.maxButtons) {
      this.buttonCounter++;
      this.buttons[this.buttonCounter] = '';
    }
  }
  buttonlength(): number {
    return Object.keys(this.buttons).length
  }

  removeButton(key: string): void {
    delete this.buttons[key];
  }
  bold() {
    let selected: string = window.getSelection()?.toString() || '';
    if (selected === '') {
      return;
    }
    const escapedSelected = this.escapeRegex(selected);  
    const regex = new RegExp(`(${escapedSelected})`, 'g');
    this.description = this.description.replace(regex, (match) => {
      if (!match.startsWith('*') || !match.endsWith('*')) {
        return `*${match}*`;
      }
      return match;
    });
    this.descriptionfunc();
  }

  italic() {
    let selected: string = window.getSelection()?.toString() || '';
    if (selected === '') {
      return;
    }
    const escapedSelected = this.escapeRegex(selected);

    const regex = new RegExp(`(${escapedSelected})`, 'g');


    this.description = this.description.replace(regex, (match) => {
      if (!match.startsWith('_') || !match.endsWith('_')) {
        return `_${match}_`;
      }
      return match;
    });
    this.descriptionfunc();
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
      if (this.description.indexOf(key) == -1) {
        delete this.Variables[key]
      }
      if (this.Variables[key]) {
        this.descriptionshow = this.descriptionshow.replace(new RegExp(this.escapeRegex(key), 'g'), this.Variables[key]);
      }
    }

  }

  footerfunc(inputText: string) {
    this.footer = inputText
  }
  saveMessage() {
    if (this.description.trim() == "") {
      this._toastr.error('please enter your message', 'error')
      return
    }
    const data = {
      title: this.title,
      description: this.description,
      footer: this.footer,
      buttons: this.buttons,
      Variables: this.Variables
    }
    this._templateService.template_create(data).subscribe(({
      next: (res: any) => {
        this._toastr.success(res.message, 'successfully')
        this._router.navigate(['home'])
      }
    }))
  }
}
