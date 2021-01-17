import { Injectable } from '@angular/core';
import { version, title, date, description } from '../../../../../package.json';

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
  version: string = version;
  date: string = date;

  title: string = title;
  description: string = description;
  constructor() {

  }

  public get infos(): PackageJsonInfos {
    return {
      version,
      date,
      title,
      description
    }
  }
}
