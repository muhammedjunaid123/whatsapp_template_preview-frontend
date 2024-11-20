import { Component, OnInit } from '@angular/core';
import { marked } from 'marked';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
   templates = [
    {
      id: 1,
      title: 'Welcome Message',
      description: `# Welcome to Our Service!
    
      Thank you for signing up with us.
       We are excited to have you on board. Here's what you can expect:
    
      - **Personalized recommendations** tailored just for you.
      - **Exclusive discounts** and offers sent straight to your inbox.
      - 24/7 **customer support** ready to assist you with any questions or issues.
    
      ## Getting Started
      To get started, [click here](#) to set up your profile and begin exploring our features.
    
      We hope you enjoy your experience with us!
    
      ---
      For more information, visit our [FAQs page](#) or contact our support team.
    
      ---
      _This message was sent by [Your Company Name] | All rights reserved | Terms and Conditions apply._`,
      footer: `Limited Time Only - Don't miss out!`,
      updatedAt: '2024-11-15'
    },
    {
      id: 2,
      title: 'Birthday Greeting',
      description: `# Happy Birthday!
    
      🎉 **_Happy Birthday!_** 🎂 We hope you have an amazing day filled with love, laughter, and joy.
        
      ## Celebrate in Style:
      - Enjoy **20% off** on all our services.
      - Get a **_special gift_** on your birthday with every purchase made.
      - Free **birthday cake** delivery to your doorstep!
    
      ### What's Included:
      - A customized **_birthday card_** with your name on it.
      - An exclusive **video message** from our team wishing you a fantastic year ahead.
    
      Don't forget to check out our **birthday playlist** for the ultimate celebration vibe!
    
      ## Enjoy Your Special Day
      If you're interested in more personalized birthday surprises, [click here](#) for our full list of offers.
    
      ---
      Wishing you all the best for the year ahead! 🎉
    
      ---
      _This message was sent by [Your Company Name] | All rights reserved | Terms and Conditions apply._`,
      footer: `Limited Time Only - Grab Your Gift Now!`,
      updatedAt: '2024-11-16'
    },
    {
      id: 3,
      title: 'Promotional Offer',
      description: `# Limited Time Offer: 20% Off!
    
      **_Don't miss out on this amazing offer!_** You have a limited time to enjoy a **20% discount** on your next purchase. Here’s how to redeem:
        
      - **Step 1**: Browse our collection of top-rated products.
      - **Step 2**: Add your favorites to your cart.
      - **Step 3**: Enter the promo code **OFFER20** at checkout to claim your discount.
        
      ## What’s Included:
      - **Free shipping** on all orders above $50.
      - **_Exclusive early access_** to our upcoming sales and promotions.
        
      ### Featured Products:
      1. **Luxury Leather Bags** - Now 20% off!
      2. **Smart Home Devices** - Save up to **20%**!
      3. **Fitness Equipment** - Huge discounts available.
        
      > Hurry! This offer expires in 48 hours.
        
      To redeem your offer, [click here](#) and start shopping now!
    
      ---
      *Offer terms and conditions apply.*
    
      ---
      _This message was sent by [Your Company Name] | All rights reserved | Terms and Conditions apply._`,
      footer: `Limited Time Only - Act Fast!`,
      updatedAt: '2024-11-17'
    },
    {
      id: 4,
      title: 'Holiday Sale Announcement',
      description: `# 🎄 Holiday Sale is Here! 🎄
    
      The **Holiday Sale** is finally here, and we’ve got incredible deals waiting for you! Whether you're shopping for gifts or treating yourself, we have something for everyone.
        
      ## Big Discounts:
      - **Up to 50% off** on selected items.
      - **_Buy one, get one free_** on all accessories.
      - **_Additional 10% off_** for our newsletter subscribers.
        
      ### Featured Categories:
      - **Electronics**: Laptops, smartphones, and more.
      - **Fashion**: Clothing, shoes, and accessories for all seasons.
      - **Home Decor**: Stylish furniture, lighting, and décor.
        
      **Sale ends on December 25th**, so don’t miss out!
        
      ## Shop Now
      Visit our website and start saving today! [Shop Now](#)
        
      ---
      *Terms and conditions apply.*
    
      ---
      _This message was sent by [Your Company Name] | All rights reserved | Terms and Conditions apply._`,
      footer: `Limited Time Only - Don't Wait, Shop Now!`,
      updatedAt: '2024-11-18'
    },
    {
      id: 5,
      title: 'Subscription Renewal Reminder',
      description: `# Subscription Renewal Reminder
    
      We hope you've enjoyed using our service! This is a friendly reminder that your **subscription** is about to expire in the next **7 days**. To continue enjoying uninterrupted access, please renew your subscription soon.
        
      ## Benefits of Renewing:
      - Access to **exclusive features** and content.
      - Priority **customer support** for faster resolution of your queries.
      - Regular updates with new features and improvements.
        
      ## How to Renew:
      1. Log in to your account.
      2. Visit the **Subscription** section.
      3. Choose the plan that best fits your needs.
      4. Confirm your payment details to complete the renewal process.
        
      If you need any assistance, [contact our support team](#) for help.
        
      We appreciate having you as a member and look forward to serving you in the future!
    
      ---
      *If you no longer wish to receive these reminders, please [click here](#).*
    
      ---
      _This message was sent by [Your Company Name] | All rights reserved | Terms and Conditions apply._`,
      footer: `Limited Time Only - Renew Now!`,
      updatedAt: '2024-11-19'
    },
    {
      id: 6,
      title: 'Welcome Message',
      description: `*HELLO*`,
      footer: `Limited Time Only - Don't miss out!`,
      updatedAt: '2024-11-15'
    },
  ];
  
  


  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 3;
  paginatedTemplates: any = [];

  ngOnInit() {
    this.convertTemplatesToHtml();  // Convert the templates data on initialization
    this.paginatedTemplates = this.paginate(this.templates);
  }

  get totalPages() {
    return Math.ceil(this.templates.length / this.itemsPerPage);
  }

  // Paginate the templates based on current page
  paginate(templates: any[]) {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return templates.slice(start, start + this.itemsPerPage);
  }

  // Filter templates based on the search term
  filterTemplates() {
    const filtered = this.templates.filter((template: any) =>
      template.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1;
    this.paginatedTemplates = this.paginate(filtered);
  }

  // Navigate to previous page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginatedTemplates = this.paginate(this.templates);
    }
  }

  // Navigate to next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginatedTemplates = this.paginate(this.templates);
    }
  }

  // Edit template handler
  editTemplate(id: number) {
    console.log(`Edit template with ID: ${id}`);
  }

  removeAllSpaces(input: string): string {
    return input.replace(/\s+/g, ' ').trim();
  }

  // Convert markdown content to HTML
  convertTemplatesToHtml() {
    this.templates = this.templates.map((template: any) => ({
      ...template,
      title: marked(this.removeAllSpaces(template.title)),
      description: marked(this.removeAllSpaces(template.description)),
      footer: marked(this.removeAllSpaces(template.footer))
    }));
  }
}
