import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

interface Hero {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  month: string;
}

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit, OnDestroy {
  months: string[] = [
    'Januar', 'Februar', 'Maj', 'Jun',
    'Juli', 'August', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'
  ];

  // Filter state
  selectedMonth: string | null = null;
  isFilterOpen = false;
  availableMonths: string[] = [];

  // Auto-slide toggle state
  isAutoSlideEnabled = true;

  heroes: Hero[] = [
    // January
    {
      id: 1,
      name: 'Crnomerović (Ćamil) Nezir',
      description: '06.01.1969 - 03.01.1994.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jan/crnomerovic-camil-nezir.jpg',
      month: 'Januar'
    },
    {
      id: 2,
      name: 'Pobrić (Mustafa) Saudin',
      description: '03.12.1968 - 14.01.1994.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jan/pobric-mustafa-saudin.jpg',
      month: 'Januar'
    },
    {
      id: 3,
      name: 'Kolčić (Alija) Šefik',
      description: '27.02.1972 - 22.01.1994.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jan/kolcic-alija-sefik.jpg',
      month: 'Januar'
    },
    {
      id: 4,
      name: 'Džafić (Alija) Šaban',
      description: '11.02.1961 - 25.01.1994.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jan/dzafic-alija-saban.jpg',
      month: 'Januar'
    },
    {
      id: 5,
      name: 'Zlomužica (Osman) Asad',
      description: '28.07.1976 - 31.01.1994.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jan/zlomuzica-osman-asad.jpg',
      month: 'Januar'
    },

    // February
    {
      id: 6,
      name: 'Husnić (Mehmed) Adem',
      description: '30.01.1961 - 12.02.1994.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/feb/husnic-mehmed-adem.jpg',
      month: 'Februar'
    },
    {
      id: 7,
      name: 'Husnić (Mujo) Dervo',
      description: '01.08.1950 - 12.02.1994.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/feb/husnic-mujo-dervo.jpg',
      month: 'Februar'
    },
    {
      id: 8,
      name: 'Nožić (Huso) Salko',
      description: '22.01.1949 - 14.02.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/feb/nozic-huso-salko.jpg',
      month: 'Februar'
    },

    // March - currently no heroes in the data

    // April - currently no heroes in the data

    // May
    {
      id: 9,
      name: 'Husnić (Meho) Halil',
      description: '12.05.1962 - 04.05.1995.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/may/husnic-meho-halil.jpg',
      month: 'Maj'
    },
    {
      id: 10,
      name: 'Husić (Omer) Dževad',
      description: '30.04.1975 - 10.05.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/may/husic-omer-dzevad.jpg',
      month: 'Maj'
    },
    {
      id: 11,
      name: 'Pobrić (Mehmed) Šefik',
      description: '25.01.1966 - 10.05.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/may/pobric-mehmed-sefik.jpg',
      month: 'Maj'
    },
    {
      id: 12,
      name: 'Husić (Mehmed) Esad',
      description: '02.06.1958 - 11.05.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/may/husic-mehmed-esad.jpg',
      month: 'Maj'
    },
    {
      id: 13,
      name: 'Puce (Bešir) Mehmed',
      description: '12.04.1959 - 11.05.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/may/puce-besir-mehmed.jpg',
      month: 'Maj'
    },
    {
      id: 14,
      name: 'Pintul (Murat) Izet',
      description: '11.03.1964 - 30.05.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/may/pintul-murat-izet.jpg',
      month: 'Maj'
    },

    // June
    {
      id: 15,
      name: 'Gosto (Avdo) Salko',
      description: '25.05.1960 - 07.06.1995.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jun/gosto-avdo-salko.jpg',
      month: 'Jun'
    },
    {
      id: 16,
      name: 'Memić (Murat) Osman',
      description: '13.03.1957 - 09.06.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jun/memic-murat-osman.jpg',
      month: 'Jun'
    },
    {
      id: 17,
      name: 'Husnić (Alija) Šefik',
      description: '22.02.1965 - 09.06.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jun/husnic-alija-sefik.jpg',
      month: 'Jun'
    },
    {
      id: 18,
      name: 'Isić (Osman) Safet',
      description: '11.12.1953 - 13.06.1992.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jun/isic-osman-safet.jpg',
      month: 'Jun'
    },
    {
      id: 19,
      name: 'Juklo (Ibro) Enez',
      description: '03.08.1968 - 13.06.1992.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jun/juklo-ibro-enez.jpg',
      month: 'Jun'
    },
    {
      id: 20,
      name: 'Juklo (Ibro) Jasminko',
      description: '21.04.1975 - 13.06.1992.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jun/juklo-ibro-jasminko.jpg',
      month: 'Jun'
    },
    {
      id: 21,
      name: 'Juklo (Adem) Mirzo',
      description: '25.08.1965 - 13.06.1992.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jun/juklo-adem-mirzo.jpg',
      month: 'Jun'
    },
    {
      id: 22,
      name: 'Marić (Osman) Ramo',
      description: '24.01.1966 - 13.06.1992.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jun/maric-osman-ramo.jpg',
      month: 'Jun'
    },
    {
      id: 23,
      name: 'Puce (Salko) Mustafa',
      description: '20.04.1961 - 13.06.1992.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jun/puce-salko-mustafa.jpg',
      month: 'Jun'
    },
    {
      id: 24,
      name: 'Ačkar (Mujo) Himzo',
      description: '09.11.1964 - 16.06.1992.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jun/ackar-mujo-himzo.jpg',
      month: 'Jun'
    },
    {
      id: 25,
      name: 'Pobrić (Alija) Ramo',
      description: '03.06.1952 - 16.06.1992.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jun/pobric-alija-ramo.jpg',
      month: 'Jun'
    },
    {
      id: 26,
      name: 'Gosto (Avdo) Huso',
      description: '14.01.1971 - 16.06.1992.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jun/gosto-avdo-huso.jpg',
      month: 'Jun'
    },
    {
      id: 27,
      name: 'Husnić (Bećir) Meho',
      description: '27.02.1949 - 16.06.1992.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jun/husnic-becir-meho.jpg',
      month: 'Jun'
    },
    {
      id: 28,
      name: 'Zlomužica (Ibro) Merkes',
      description: '10.12.1962 - 18.06.1992.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jun/zlomuzica-ibro-merkes.jpg',
      month: 'Jun'
    },
    {
      id: 29,
      name: 'Nožić (Mustafa) Narcis',
      description: '28.04.1972 - 23.06.1992.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jun/nozic-mustafa-narcis.jpg',
      month: 'Jun'
    },
    {
      id: 30,
      name: 'Smajkić (Murat) Ibrahim',
      description: '03.03.1958 - 23.06.1992.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jun/smajkic-murat-ibrahim.jpg',
      month: 'Jun'
    },
    {
      id: 31,
      name: 'Voljevica (Ibro) Mujo',
      description: '20.04.1962 - 25.06.1992.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jun/voljevica-ibro-mujo.jpg',
      month: 'Jun'
    },
    {
      id: 32,
      name: 'Maksumić (Mujo) Alija',
      description: '06.02.1955 - 26.06.1992.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jun/maksumic-mujo-alija.jpg',
      month: 'Jun'
    },
    {
      id: 33,
      name: 'Husnić (Huso) Selim',
      description: '04.01.1946 - 30.06.1992.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jun/husnic-huso-selim.jpg',
      month: 'Jun'
    },

    // July
    {
      id: 34,
      name: 'Dedić (Ahmet) Ramiz',
      description: '15.05.1953 - 01.07.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jul/dedic-ahmet-ramiz.jpg',
      month: 'Juli'
    },
    {
      id: 35,
      name: 'Husnić (Selim) Ramiz',
      description: '27.05.1956 - 01.07.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jul/husnic-selim-ramiz.jpg',
      month: 'Juli'
    },
    {
      id: 36,
      name: 'Jelovac (Meho) Mujo',
      description: '10.10.1953 - 01.07.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jul/jelovac-meho-mujo.jpg',
      month: 'Juli'
    },
    {
      id: 37,
      name: 'Dedić (Mustafa) Džemil',
      description: '19.08.1973 - 02.07.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jul/dedic-mustafa-dzemil.jpg',
      month: 'Juli'
    },
    {
      id: 38,
      name: 'Zlomušica (Omer) Seno',
      description: '01.02.1965 - 02.07.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jul/zlomusica-omer-seno.jpg',
      month: 'Juli'
    },
    {
      id: 39,
      name: 'Marić (Ibro) Osman',
      description: '13.04.1963 - 02.07.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jul/maric-ibro-osman.jpg',
      month: 'Juli'
    },
    {
      id: 40,
      name: 'Marić (Mujo) Smajo',
      description: '28.03.1967 - 03.07.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jul/maric-mujo-smajo.jpg',
      month: 'Juli'
    },
    {
      id: 41,
      name: 'Ačkar (Salko) Zulfo',
      description: '15.03.1970 - 07.07.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jul/ackar-salko-zulfo.jpg',
      month: 'Juli'
    },
    {
      id: 42,
      name: 'Pekušić (Ibro) Meho',
      description: '15.05.1947 - 10.07.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jul/pekusic-ibro-meho.jpg',
      month: 'Juli'
    },
    {
      id: 43,
      name: 'Crnomerović (Omer) Emin',
      description: '01.06.1971 - 13.07.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jul/crnomerovic-omer-emin.jpg',
      month: 'Juli'
    },
    {
      id: 44,
      name: 'Džiho (Ćamil) Ekrem',
      description: '20.05.1972 - 13.07.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jul/dziho-camil-ekrem.jpg',
      month: 'Juli'
    },
    {
      id: 45,
      name: 'Husnić (Alija) Ahmet',
      description: '26.09.1956 - 13.07.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jul/husnic-alija-ahmet.jpg',
      month: 'Juli'
    },
    {
      id: 46,
      name: 'Husnić (Alija) Himzo',
      description: '01.02.1963 - 13.07.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jul/husnic-alija-himzo.jpg',
      month: 'Juli'
    },
    {
      id: 47,
      name: 'Brkan (Mumin) Duran',
      description: '03.01.1959 - 15.07.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jul/brkan-mumin-duran.jpg',
      month: 'Juli'
    },
    {
      id: 48,
      name: 'Marić (Salko) Fadil',
      description: '20.02.1960 - 15.07.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jul/maric-salko-fadil.jpg',
      month: 'Juli'
    },
    {
      id: 49,
      name: 'Husić (Mumin) Arif',
      description: '23.10.1955 - 15.07.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jul/husic-mumin-arif.jpg',
      month: 'Juli'
    },
    {
      id: 50,
      name: 'Brkan (Mumin) Meho',
      description: '01.03.1954 - 16.07.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jul/brkan-mumin-meho.jpg',
      month: 'Juli'
    },
    {
      id: 51,
      name: 'Memić (Salko) Kasim',
      description: '09.02.1975 - 23.07.1995.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jul/memic-salko-kasim.jpg',
      month: 'Juli'
    },
    {
      id: 52,
      name: 'Maksumić (Murat) Osman',
      description: '10.03.1941 - 26.07.1992.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jul/maksumic-murat-osman.jpg',
      month: 'Juli'
    },
    {
      id: 53,
      name: 'Ćorić (Selim) Rasim',
      description: '03.09.1960 - 27.07.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jul/coric-selim-rasim.jpg',
      month: 'Juli'
    },
    {
      id: 54,
      name: 'Količić (Zulfo) Adnan',
      description: '20.05.1978 - 30.07.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jul/kolicic-zulfo-adnan.jpg',
      month: 'Juli'
    },

    // August
    {
      id: 55,
      name: 'Džafić (Meho) Hasan',
      description: '11.02.1950 - 03.08.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/aug/dzafic-meho-hasan.jpg',
      month: 'August'
    },
    {
      id: 56,
      name: 'Špago (Halil) Selim',
      description: '20.01.1967 - 07.08.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/aug/spago-halil-selim.jpg',
      month: 'August'
    },
    {
      id: 57,
      name: 'Puce (Hadže) Murat',
      description: '15.08.1958 - 09.08.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/aug/puce-hadze-murat.jpg',
      month: 'August'
    },
    {
      id: 58,
      name: 'Ćorić (Ibro) Halil',
      description: '11.03.1973 - 12.08.1995.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/aug/coric-ibro-halil.jpg',
      month: 'August'
    },
    {
      id: 59,
      name: 'Dedić (Omer) Nurif',
      description: '16.01.1958 - 12.08.1995.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/aug/dedic-omer-nurif.jpg',
      month: 'August'
    },
    {
      id: 60,
      name: 'Džiho (Salko) Ramiz',
      description: '07.06.1959 - 12.08.1995.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/aug/dziho-salko-ramiz.jpg',
      month: 'August'
    },
    {
      id: 61,
      name: 'Marić (Hajdar) Huso',
      description: '05.08.1974 - 21.08.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/aug/maric-hajdar-huso.jpg',
      month: 'August'
    },
    {
      id: 62,
      name: 'Marić (Mujo) Zukan',
      description: '01.04.1962 - 22.08.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/aug/maric-mujo-zukan.jpg',
      month: 'August'
    },
    {
      id: 63,
      name: 'Husnić (Mehmed) Omer',
      description: '29.09.1965 - 26.08.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/aug/husnic-mehmed-omer.jpg',
      month: 'August'
    },
    {
      id: 64,
      name: 'Isić (Ibrahim) Mumin',
      description: '10.04.1968 - 29.08.1995.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/aug/isic-ibrahim-mumin.jpg',
      month: 'August'
    },

    // September
    {
      id: 65,
      name: 'Špago (Osman) Mumin',
      description: '21.05.1971 - 07.09.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/sep/spago-osman-mumin.jpg',
      month: 'Septembar'
    },
    {
      id: 66,
      name: 'Krhan (Derviš) Selim',
      description: '29.05.1965 - 07.09.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/sep/krhan-dervis-selim.jpg',
      month: 'Septembar'
    },
    {
      id: 67,
      name: 'Marić (Mumin) Ćamil',
      description: '01.04.1964 - 10.09.1992.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/sep/maric-mumin-camil.jpg',
      month: 'Septembar'
    },
    {
      id: 68,
      name: 'Marić (Smajo) Bećir',
      description: '28.11.1963 - 11.09.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/sep/maric-smajo-becir.jpg',
      month: 'Septembar'
    },
    {
      id: 69,
      name: 'Pekušić (Ibro) Šaban',
      description: '15.08.1949 - 14.09.1992.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/sep/pekusic-ibro-saban.jpg',
      month: 'Septembar'
    },
    {
      id: 70,
      name: 'Puce (Meho) Mustafa',
      description: '02.01.1963 - 18.09.1992.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/sep/puce-meho-mustafa.jpg',
      month: 'Septembar'
    },
    {
      id: 71,
      name: 'Pobrić (Huso) Elvir',
      description: '27.05.1973 - 19.09.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/sep/pobric-huso-elvir.jpg',
      month: 'Septembar'
    },
    {
      id: 72,
      name: 'Zuhrić (Halil) Enes',
      description: '21.09.1973 - 19.09.1992.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/sep/zuhric-halil-enes.jpg',
      month: 'Septembar'
    },
    {
      id: 73,
      name: 'Nožić (Ramiz) Nedžad',
      description: '11.01.1972 - 21.09.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/sep/nozic-ramiz-nedzad.jpg',
      month: 'Septembar'
    },
    {
      id: 74,
      name: 'Brkan (Alija) Edin',
      description: '15.07.1973 - 23.09.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/sep/brkan-alija-edin.jpg',
      month: 'Septembar'
    },
    {
      id: 75,
      name: 'Pobrić (Šaban) Enez',
      description: '10.01.1971 - 23.09.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/sep/pobric-saban-enez.jpg',
      month: 'Septembar'
    },
    {
      id: 76,
      name: 'Dedić (Osman) Alija',
      description: '10.01.1950 - 23.09.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/sep/dedic-osman-alija.jpg',
      month: 'Septembar'
    },
    {
      id: 77,
      name: 'Maksumić (Alija) Rasim',
      description: '17.02.1964 - 23.09.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/sep/maksumic-alija-rasim.jpg',
      month: 'Septembar'
    },
    {
      id: 78,
      name: 'Crnalić (Meho) Junuz',
      description: '15.08.1968 - 25.09.1995.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/sep/crnalic-meho-junuz.jpg',
      month: 'Septembar'
    },

    // October
    {
      id: 79,
      name: 'Jelovac (Šaban) Tarik',
      description: '02.03.1973 - 12.10.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/oct/jelovac-saban-tarik.jpg',
      month: 'Oktobar'
    },
    {
      id: 80,
      name: 'Jelovac (Salko) Mustafa',
      description: '04.01.1954 - 12.10.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/oct/jelovac-salko-mustafa.jpg',
      month: 'Oktobar'
    },
    {
      id: 81,
      name: 'Džafić (Alija) Mirsad',
      description: '07.01.1971 - 14.10.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/oct/dzafic-alija-mirsad.jpg',
      month: 'Oktobar'
    },
    {
      id: 82,
      name: 'Dedić (Salih) Esad',
      description: '19.02.1964 - 15.10.1992.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/oct/dedic-salih-esad.jpg',
      month: 'Oktobar'
    },
    {
      id: 83,
      name: 'Juklo (Salko) Arif',
      description: '30.05.1950 - 18.10.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/oct/juklo-salko-arif.jpg',
      month: 'Oktobar'
    },

    // November
    {
      id: 84,
      name: 'Mušinović (Hasan) Adem',
      description: '11.01.1955 - 04.11.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/nov/musinovic-hasan-adem.jpg',
      month: 'Novembar'
    },
    {
      id: 85,
      name: 'Marić (Salih) Halil',
      description: '06.04.1960 - 07.11.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/nov/maric-salih-halil.jpg',
      month: 'Novembar'
    },
    {
      id: 86,
      name: 'Husnić (Meho) Izedin',
      description: '01.04.1969 - 11.11.1994.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/nov/husnic-meho-izedin.jpg',
      month: 'Novembar'
    },
    {
      id: 87,
      name: 'Husnić (Alija) Nusret',
      description: '16.04.1968 - 11.11.1994.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/nov/husnic-alija-nusret.jpg',
      month: 'Novembar'
    },
    {
      id: 88,
      name: 'Marić (Bajro) Adis',
      description: '04.02.1974 - 11.11.1994.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/nov/maric-bajro-adis.jpg',
      month: 'Novembar'
    },
    {
      id: 89,
      name: 'Mrndžić (Salko) Miralem',
      description: '23.09.1966 - 11.11.1994.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/nov/mrndzic-salko-miralem.jpg',
      month: 'Novembar'
    },
    {
      id: 90,
      name: 'Pekušić (Mumin) Osman',
      description: '20.08.1967 - 11.11.1994.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/nov/pekusic-mumin-osman.jpg',
      month: 'Novembar'
    },
    {
      id: 91,
      name: 'Pobrić (Halil) Ismet',
      description: '10.02.1954 - 11.11.1994.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/nov/pobric-halil-ismet.jpg',
      month: 'Novembar'
    },
    {
      id: 92,
      name: 'Špago (Ibrahim) Adem',
      description: '04.11.1958 - 11.11.1994.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/nov/spago-ibrahim-adem.jpg',
      month: 'Novembar'
    },
    {
      id: 93,
      name: 'Tojaga (Salih) Rasim',
      description: '14.07.1968 - 11.11.1994.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/nov/tojaga-salih-rasim.jpg',
      month: 'Novembar'
    },
    {
      id: 94,
      name: 'Ćorić (Alija) Ramo',
      description: '26.10.1955 - 17.11.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/nov/coric-alija-ramo.jpg',
      month: 'Novembar'
    },
    {
      id: 95,
      name: 'Voljevica (Huso) Salko',
      description: '19.10.1951 - 20.11.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/nov/voljevica-huso-salko.jpg',
      month: 'Novembar'
    },
    {
      id: 96,
      name: 'Fazlić (Ramo) Mirsad',
      description: '12.05.1967 - 20.11.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/nov/fazlic-ramo-mirsad.jpg',
      month: 'Novembar'
    },
    {
      id: 97,
      name: 'Husić (Mumin) Junuz',
      description: '26.04.1958 - 21.11.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/nov/husic-mumin-junuz.jpg',
      month: 'Novembar'
    },
    {
      id: 98,
      name: 'Pobrić (Osman) Alija',
      description: '28.09.1964 - 22.11.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/nov/pobric-osman-alija.jpg',
      month: 'Novembar'
    },
    {
      id: 99,
      name: 'Crnomerović (Ramo) Rasim',
      description: '23.02.1964 - 25.11.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/nov/crnomerovic-ramo-rasim.jpg',
      month: 'Novembar'
    },

    // December
    {
      id: 100,
      name: 'Marić (Arif) Safet',
      description: '18.07.1966 - 02.12.1992.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/dec/maric-arif-safet.jpg',
      month: 'Decembar'
    },
    {
      id: 101,
      name: 'Brkan (Bešir) Salko',
      description: '27.01.1954 - 12.12.1994.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/dec/brkan-besir-salko.jpg',
      month: 'Decembar'
    },
    {
      id: 102,
      name: 'Zuhrić (Omer) Osman',
      description: '18.05.1949 - 12.12.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/dec/zuhric-omer-osman.jpg',
      month: 'Decembar'
    },
    {
      id: 103,
      name: 'Špago (Ibro) Zijo',
      description: '13.01.1967 - 20.12.1992.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/dec/spago-ibro-zijo.jpg',
      month: 'Decembar'
    },
    {
      id: 104,
      name: 'Voljevica (Selim) Ramiz',
      description: '10.05.1962 - 20.12.1992.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/dec/voljevica-selim-ramiz.jpg',
      month: 'Decembar'
    },
    {
      id: 105,
      name: 'Jelovac (Meho) Ismet',
      description: '02.07.1969 - 20.12.1992.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/dec/jelovac-meho-ismet.jpg',
      month: 'Decembar'
    },
    {
      id: 106,
      name: 'Jelovac (Alija) Meho',
      description: '20.01.1972 - 20.12.1992.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/dec/jelovac-alija-meho.jpg',
      month: 'Decembar'
    },
    {
      id: 107,
      name: 'Mušinović (Ahmet) Senad',
      description: '28.03.1976 - 22.12.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/dec/musinovic-ahmet-senad.jpg',
      month: 'Decembar'
    },
    {
      id: 108,
      name: 'Dedić (Derviš) Ramo',
      description: '04.04.1957 - 23.12.1994.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/dec/dedic-dervis-ramo.jpg',
      month: 'Decembar'
    },
    {
      id: 109,
      name: 'Krhan (Mujo) Arif',
      description: '10.01.1938 - 23.12.1994.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/dec/krhan-mujo-arif.jpg',
      month: 'Decembar'
    },
    {
      id: 110,
      name: 'Gosto (Jusuf) Hamid',
      description: '17.09.1947 - 30.12.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/dec/gosto-jusuf-hamid.jpg',
      month: 'Decembar'
    }
  ];

  activeSlideIndices = new Map<string, number>();
  carouselIntervals = new Map<string, any>();

  private autoSlideInterval = 5000; // 5 seconds
  private slideTimers: { [month: string]: Subscription } = {};
  private progressTimers: { [month: string]: Subscription } = {};
  private progress: { [month: string]: number } = {};
  private userInteractionTimers: { [month: string]: any } = {};
  private isUserInteracting: { [month: string]: boolean } = {};
  private isTimerTriggered = false; // Flag to distinguish between timer and manual slide changes
  private readonly RESUME_DELAY = 3000; // Resume auto-slide after 3 seconds of no interaction

  isMobile = false;
  private readonly MOBILE_BREAKPOINT = 768;

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  constructor() {
    this.checkScreenSize();
    this.months.forEach(month => {
      this.activeSlideIndices.set(month, 0);
      this.isUserInteracting[month] = false;
    });
    this.initializeAvailableMonths();
  }

  private initializeAvailableMonths() {
    // Get only months that have heroes
    this.availableMonths = this.months.filter(month =>
      this.heroes.some(hero => hero.month === month)
    );
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= this.MOBILE_BREAKPOINT;
  }

  ngOnInit() {
    // Start auto-slide for each month that has heroes with a small initial delay
    setTimeout(() => {
      this.months.forEach(month => {
        if (this.getHeroesForMonth(month).length > 1) {
          this.startAutoSlide(month);
        }
      });
    }, 100); // Small delay to ensure DOM is ready
  }

  ngOnDestroy() {
    // Cleanup timers
    Object.values(this.slideTimers).forEach(timer => timer?.unsubscribe());
    Object.values(this.progressTimers).forEach(timer => timer?.unsubscribe());
    Object.values(this.userInteractionTimers).forEach(timer => clearTimeout(timer));
    
    // Clear all timers collections
    this.slideTimers = {};
    this.progressTimers = {};
    this.userInteractionTimers = {};
  }

  getHeroesForMonth(month: string): Hero[] {
    return this.heroes.filter(hero => hero.month === month);
  }

  getCurrentGroup(month: string): Hero[] {
    const heroes = this.getHeroesForMonth(month);
    if (heroes.length === 0) return [];

    const startIndex = this.activeSlideIndices.get(month) || 0;
    
    // For desktop, show three heroes at a time with circular navigation
    const result: Hero[] = [];
    for (let i = 0; i < 3; i++) {
      const index = (startIndex + i) % heroes.length;
      result.push(heroes[index]);
    }
    return result;
  }

  getCurrentHero(month: string): Hero {
    const heroes = this.getHeroesForMonth(month);
    if (heroes.length === 0) return heroes[0];
    
    const currentIndex = this.activeSlideIndices.get(month) || 0;
    return heroes[currentIndex];
  }

  private startAutoSlide(month: string) {
    // Reset any existing timers
    this.slideTimers[month]?.unsubscribe();
    this.progressTimers[month]?.unsubscribe();

    // Initialize progress
    this.progress[month] = 0;

    // Only start auto-slide if enabled
    if (!this.isAutoSlideEnabled) {
      return;
    }

    // Create progress timer (updates every 50ms) - only if not user interacting and auto-slide enabled
    this.progressTimers[month] = interval(50).subscribe(() => {
      if (!this.isUserInteracting[month] && this.isAutoSlideEnabled) {
        this.progress[month] = this.progress[month] + (50 / this.autoSlideInterval) * 100;
        // Ensure progress doesn't exceed 100
        if (this.progress[month] >= 100) {
          this.progress[month] = 100;
        }
      }
    });

    // Create slide timer - only advance if not user interacting and auto-slide enabled
    this.slideTimers[month] = interval(this.autoSlideInterval).subscribe(() => {
      if (!this.isUserInteracting[month] && this.isAutoSlideEnabled) {
        this.isTimerTriggered = true; // Mark as timer-triggered
        this.nextSlide(month);
        this.progress[month] = 0; // Reset progress after slide
        this.isTimerTriggered = false; // Reset flag
      }
    });
  }

  // Update progress methods for circular timer
  getCircleProgress(month: string): string {
    const progress = this.progress[month] || 0;
    return (100 - progress).toString(); // Reverse progress for countdown effect
  }

  getRemainingSeconds(month: string): string {
    const progress = this.progress[month] || 0;
    const remainingTime = Math.ceil((100 - progress) / 100 * 5);
    return remainingTime.toString();
  }

  // Add this method to get progress percentage for template
  getProgressPercentage(month: string): number {
    return this.progress[month] || 0;
  }

  private handleUserInteraction(month: string) {
    // Set user interaction flag
    this.isUserInteracting[month] = true;
    
    // Clear any existing resume timer
    if (this.userInteractionTimers[month]) {
      clearTimeout(this.userInteractionTimers[month]);
    }
    
    // Set timer to resume auto-slide after delay
    this.userInteractionTimers[month] = setTimeout(() => {
      this.isUserInteracting[month] = false;
      this.resetProgress(month);
    }, this.RESUME_DELAY);
  }

  // Modify existing slide methods to handle user interaction
  nextSlide(month: string) {
    const heroes = this.getHeroesForMonth(month);
    if (heroes.length === 0) return;

    let currentIndex = this.activeSlideIndices.get(month) || 0;
    currentIndex = (currentIndex + 1) % heroes.length;
    this.activeSlideIndices.set(month, currentIndex);
    
    // Only handle user interaction if this was called manually (not from timer)
    if (!this.isTimerTriggered) {
      this.handleUserInteraction(month);
    }
  }

  prevSlide(month: string) {
    const heroes = this.getHeroesForMonth(month);
    if (heroes.length === 0) return;

    let currentIndex = this.activeSlideIndices.get(month) || 0;
    currentIndex = (currentIndex - 1 + heroes.length) % heroes.length;
    this.activeSlideIndices.set(month, currentIndex);
    this.handleUserInteraction(month);
  }

  getNumberOfGroups(month: string): number {
    const heroes = this.getHeroesForMonth(month);
    if (this.isMobile) {
      return heroes.length;
    }
    return Math.ceil(heroes.length / 3);
  }

  getCurrentGroupIndex(month: string): number {
    const currentIndex = this.activeSlideIndices.get(month) || 0;
    if (this.isMobile) {
      return currentIndex;
    }
    return Math.floor(currentIndex / 3);
  }

  getCurrentSlideIndex(month: string): number {
    return this.activeSlideIndices.get(month) || 0;
  }

  goToSlide(month: string, index: number) {
    this.activeSlideIndices.set(month, index);
    this.handleUserInteraction(month);
  }

  private resetProgress(month: string) {
    // Properly cleanup existing timer first
    if (this.progressTimers[month]) {
      this.progressTimers[month].unsubscribe();
      delete this.progressTimers[month];
    }

    // Reset progress
    this.progress[month] = 0;

    // Only create new progress timer if auto-slide is enabled
    if (!this.isAutoSlideEnabled) {
      return;
    }

    // Create new progress timer
    this.progressTimers[month] = interval(50).subscribe(() => {
      if (!this.isUserInteracting[month] && this.isAutoSlideEnabled) {
        this.progress[month] = this.progress[month] + (50 / this.autoSlideInterval) * 100;
        // Ensure progress doesn't exceed 100
        if (this.progress[month] >= 100) {
          this.progress[month] = 100;
        }
      }
    });
  }

  // Filter methods
  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  selectMonth(month: string) {
    this.selectedMonth = month;
    this.isFilterOpen = false;

    // Restart auto-slide for the selected month if it has more than 1 hero
    setTimeout(() => {
      if (this.getHeroesForMonth(month).length > 1) {
        this.startAutoSlide(month);
      }
    }, 100);
  }

  clearFilter() {
    this.selectedMonth = null;
    this.isFilterOpen = false;

    // Restart auto-slide for all months
    setTimeout(() => {
      this.months.forEach(month => {
        if (this.getHeroesForMonth(month).length > 1) {
          this.startAutoSlide(month);
        }
      });
    }, 100);
  }

  getFilteredMonths(): string[] {
    if (this.selectedMonth) {
      return [this.selectedMonth];
    }
    return this.months;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.filter-dropdown')) {
      this.isFilterOpen = false;
    }
  }

  // Auto-slide toggle method
  toggleAutoSlide() {
    this.isAutoSlideEnabled = !this.isAutoSlideEnabled;

    if (this.isAutoSlideEnabled) {
      // Resume auto-slide for all visible months
      const visibleMonths = this.getFilteredMonths();
      setTimeout(() => {
        visibleMonths.forEach(month => {
          if (this.getHeroesForMonth(month).length > 1) {
            this.startAutoSlide(month);
          }
        });
      }, 100);
    } else {
      // Stop all auto-slide timers and reset progress
      Object.keys(this.slideTimers).forEach(month => {
        this.slideTimers[month]?.unsubscribe();
        this.progressTimers[month]?.unsubscribe();
        this.progress[month] = 0;
      });
    }
  }
} 