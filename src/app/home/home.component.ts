import { Component, OnInit, HostListener } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.setupSmoothScroll();
    this.checkScroll();
    window.addEventListener('scroll', this.checkScroll);

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', this.sendEmail);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    this.checkScroll();
  }

  setupSmoothScroll() {
    const links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (event: MouseEvent) => {
        event.preventDefault();
        const targetId = (link.getAttribute('href') as string).substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }

  checkScroll = () => {
    const rows = document.querySelectorAll('.features-container.row');
    rows.forEach(row => {
      const rect = row.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        row.classList.add('in-view');
      }
    });

    const navbar = document.querySelector('.navbar') as HTMLElement;
    const menuLinks = document.querySelectorAll('.menu-link');

    if (window.pageYOffset > 0) {
      navbar.classList.add('scrolled');
      menuLinks.forEach(link => link.classList.add('scrolled'));
    } else {
      navbar.classList.remove('scrolled');
      menuLinks.forEach(link => link.classList.remove('scrolled'));
    }
  }

  sendEmail(event: Event) {
    event.preventDefault();

    emailjs.sendForm('service_oh8ju1n', 'template_n8kl7op', event.target as HTMLFormElement, 'mc0xMWk3udyljT1CP')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
        alert('Email sent successfully!');
      }, (error) => {
        console.log(error.text);
        alert('Failed to send email: ' + error.text);
      });
  }
}
