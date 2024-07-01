import { Component, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  showMobileMenu = false;

  toggleMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  ngAfterViewInit() {
    const internalLinks = document.querySelectorAll('.menu-link[href^="#"]');

    internalLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href) {
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
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
}
