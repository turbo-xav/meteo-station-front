import { Component, OnInit } from '@angular/core';
import { PackageJsonService } from '../../core/service/package-json.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  ngOnInit(): void {
  }

}
