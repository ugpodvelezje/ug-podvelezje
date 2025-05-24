import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembershipFormComponent } from '../membership-form/membership-form.component';
import { MembershipBenefit } from '../../interfaces/membership.interface';

@Component({
  selector: 'app-join-us',
  standalone: true,
  imports: [CommonModule, MembershipFormComponent],
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.scss']
})
export class JoinUsComponent {
  benefits: MembershipBenefit[] = [
    {
      icon: 'people',
      title: 'Umrežavanje',
      description: 'Povežite se sa istomišljenicima i izgradite trajne odnose unutar naše zajednice.'
    },
    {
      icon: 'event',
      title: 'Ekskluzivni Događaji',
      description: 'Prioritetni pristup našim događajima, radionicama i okupljanjima zajednice.'
    },
    {
      icon: 'volunteer_activism',
      title: 'Stvaranje Promjena',
      description: 'Direktno učestvujte u projektima razvoja zajednice i budite dio pozitivnih promjena.'
    },
    {
      icon: 'school',
      title: 'Edukacija',
      description: 'Pristup radionicama, treninzima i događajima za razmjenu znanja.'
    },
    {
      icon: 'groups',
      title: 'Liderske Pozicije',
      description: 'Mogućnost preuzimanja liderskih uloga i vođenja inicijativa u zajednici.'
    },
    {
      icon: 'diversity_3',
      title: 'Raznolike Aktivnosti',
      description: 'Učestvujte u različitim kulturnim, obrazovnim i društvenim aktivnostima tokom cijele godine.'
    }
  ];
}
