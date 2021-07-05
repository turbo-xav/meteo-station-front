import { Injectable } from '@angular/core';
import pkg from '../../../../../package.json';

export interface PackageJsonInfos {
  version: string;
  date: string;

  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class PackageJsonService {
  version: string = pkg.version;
  date: string = pkg.date;

  title: string = pkg.title;
  description: string = pkg.description;
  constructor() {}

  public get infos(): PackageJsonInfos {
    return {
      version: this.version,
      date: this.date,
      title: this.title,
      description: this.description
    };
  }
}
