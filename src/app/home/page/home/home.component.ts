import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { SubscribeComponent } from '../../../shared/subscribe/subscribe.component';
import { BannerComponent } from '../../../shared/banner/banner.component';
import { ServicesComponent } from '../../components/services/services.component';
import { GalleryComponent } from '../../components/gallery/gallery.component';
import { TeamComponent } from '../../components/team/team.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    BannerComponent,
    CommonModule,
    FooterComponent,
    SubscribeComponent,
    ServicesComponent,
    GalleryComponent,
    TeamComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export default class HomeComponent {}
