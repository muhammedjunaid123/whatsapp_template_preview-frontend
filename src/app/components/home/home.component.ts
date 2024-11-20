import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  templates = [
    { id: 1, title: 'Welcome Message', description: 'Greeting new users.', updatedAt: '2024-11-19' },
    { id: 2, title: 'Order Confirmation', description: 'Confirm orders.', updatedAt: '2024-11-15' },
    { id: 3, title: 'Event Reminder', description: 'Remind events.', updatedAt: '2024-11-18' },
    { id: 4, title: 'Thank You Note', description: 'Express gratitude.', updatedAt: '2024-11-17' },
    // Add more data for testing pagination
  ];

  searchTerm = '';
  sortedBy = '';
  currentPage = 1;
  itemsPerPage = 3;
  paginatedTemplates = this.templates;

  get totalPages() {
    return Math.ceil(this.templates.length / this.itemsPerPage);
  }

  filterTemplates() {
    const filtered = this.templates.filter((template) =>
      template.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1;
    this.paginatedTemplates = this.paginate(filtered);
  }

  sortBy(key: string) {
   
    this.paginatedTemplates = this.paginate(this.templates);
  }

  paginate(templates: any[]) {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return templates.slice(start, start + this.itemsPerPage);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginatedTemplates = this.paginate(this.templates);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginatedTemplates = this.paginate(this.templates);
    }
  }

  editTemplate(id: number) {
    console.log(`Edit template with ID: ${id}`);
  }

  ngOnInit() {
    this.paginatedTemplates = this.paginate(this.templates);
  }
}
