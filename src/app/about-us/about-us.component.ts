import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'about-us',
  standalone: true,
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export default class AboutUsComponent implements OnInit {
  public randomImageUrl = signal('/assets/images/about-img-01.jpg');

  ngOnInit() {
    this.startImageRotation();
  }

  startImageRotation() {
    const images = [
      '/assets/images/about-img-01.jpg',
      '/assets/images/about-img-02.jpg',
      '/assets/images/about-img-03.jpg',
    ];

    let currentIndex = 0;

    setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      this.randomImageUrl.set(images[currentIndex]);
    }, 5000);
  }
}
