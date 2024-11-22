import { Component, OnInit } from '@angular/core';
import { marked } from 'marked';
import { TemplateService } from '../../services/template/template.service';
import { Template } from '../../types/interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  templates: Template[] = [];
  filteredTemplates: any[] = [];
  paginatedTemplates: any[] = [];
  searchTerm: string = '';

  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;

  constructor(private _templateService: TemplateService, private _router: Router) { }

  ngOnInit() {
    this._templateService.getAll().subscribe({
      next: (res: any) => {
        this.templates = res["data"];
        this.filteredTemplates = [...this.templates];
        this.updatePagination();
      },
    });
  }

  filterTemplates() {
    this.filteredTemplates = this.templates.filter(
      (template) =>
        template.title?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        template.description?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1; // Reset to first page
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredTemplates.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedTemplates = this.filteredTemplates.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
  call(id: string) {
    this._router.navigate(['edit_template'], { queryParams: { id: id } })
  }
}
