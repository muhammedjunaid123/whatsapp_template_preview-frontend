import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TemplateService } from '../../services/template/template.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Template } from '../../types/interface';

@Component({
  selector: 'app-template-edit',
  templateUrl: './template-edit.component.html',
  styleUrl: './template-edit.component.css'
})
export class TemplateEditComponent implements OnInit {

  id!: string
  template!: Template
  descriptionshow!: string
  maxButtons = 3;
  buttonCounter = 0;
  constructor(private _toastr: ToastrService, private _templateService: TemplateService, private _router: Router, private _activeRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this._activeRoute.queryParamMap.subscribe((res) => {
      this.id = res.get('id') || ''
      if (this.id == '') {
        this._router.navigate(['home'])
      }
      this._templateService.template_get(this.id).subscribe({
        next: (res: any) => {
          this.template = res['data']
          this.descriptionfunc()
        }
      })
    })
  }
  resetForm() {


  }


  addButton(): void {
    if (Object.keys(this.template['buttons']).length < this.maxButtons) {
      this.buttonCounter++;
      this.template['buttons'][this.buttonCounter] = '';
    }
  }
  buttonlength(): number {
    return Object.keys(this.template['buttons']).length
  }

  removeButton(key: string): void {
    delete this.template['buttons'][key];
  }
  bold() {
    let selected: string = window.getSelection()?.toString() || '';
    if (selected === '') {
      return;
    }
    const escapedSelected = this.escapeRegex(selected);
    const regex = new RegExp(`(${escapedSelected})`, 'g');
    this.template['description'] = this.template['description'].replace(regex, (match) => {
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


    this.template['description'] = this.template['description'].replace(regex, (match) => {
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

    this.descriptionshow = this.template['description']

    for (let key in this.template['Variables']) {
      if (this.template['Variables'][key]) {
        this.descriptionshow = this.descriptionshow.replace(new RegExp(this.escapeRegex(key), 'g'), this.template['Variables'][key]);
      }

    }
  }

  titlefunc(inputText: string) {
    this.template['title'] = inputText
  }

  trackByFn(index: number, item: any): any {
    return item.key;
  }

  descriptionfunc() {
    let pattern = /{{([^}]*)}}/g;
    let match;
    let indices = [];
    while ((match = pattern.exec(this.template['description'])) !== null) {
      indices.push(match.index);
    }
    for (let i = 0; i < indices.length; i++) {
      let c = 0
      let index = indices[i] + 2
      while (true) {
        index++
        if (this.template['description'][index] == '}') {
          c++
        }
        if (c == 2) {
          let key = this.template['description'].slice(indices[i], index + 1)
          if (!this.template['Variables'][key]) {
            this.template['Variables'][key] = ''
          }
          break;
        }
        if (this.template['description'].length < index) {
          break
        }
      }
    }
    this.descriptionshow = this.formatText(this.template['description'])
    for (let key in this.template['Variables']) {
      if (this.template['description'].indexOf(key) == -1) {
        delete this.template['Variables'][key]
      }
      if (this.template['Variables'][key]) {
        this.descriptionshow = this.descriptionshow.replace(new RegExp(this.escapeRegex(key), 'g'), this.template['Variables'][key]);
      }
    }

  }

  footerfunc(inputText: string) {
    this.template['footer'] = inputText
  }
  saveMessage() {
    if (this.template['description'].trim() == "") {
      this._toastr.error('please enter your message', 'error')
      return
    }
    const data:Template = {
      _id: this.id,
      title: this.template['title'],
      description: this.template['description'],
      footer: this.template['footer'],
      buttons: this.template['buttons'],
      Variables: this.template['Variables']
    }
    this._templateService.template_update(data).subscribe(({
      next: (res: any) => {
        this._toastr.success(res.message, 'successfully')
        this._router.navigate(['home'])
      }
    }))
  }
}
