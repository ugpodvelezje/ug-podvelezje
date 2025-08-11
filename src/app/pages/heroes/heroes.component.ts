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
    'Juli', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'
  ];

  heroes: Hero[] = [
    // January
    {
      id: 1,
      name: 'Crnomerović (Ćamil) Nezir',
      description: '6.1.1969 - 3.1.1994.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jan/crnomerovic-nezir.jpg',
      month: 'Januar'
    },
    {
      id: 2,
      name: 'Pobrić (Mustafa) Saudin',
      description: '3.12.1968 - 14.1.1994.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jan/pobric-saudin.jpg',
      month: 'Januar'
    },
    {
      id: 3,
      name: 'Količić (Alija) Šefik',
      description: '27.2.1972 - 22.1.1994.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jan/kolicic-sefik.jpg',
      month: 'Januar'
    },
    {
      id: 4,
      name: 'Džafic (Alija) Šaban',
      description: '11.2.1961 - 24.1.1994.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jan/dzafic-saban.jpg',
      month: 'Januar'
    },
    {
      id: 5,
      name: 'Zlomužica (Osman) Asad',
      description: '28.7.1976 - 31.1.1994.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/jan/zlomuzica-asad.jpg',
      month: 'Januar'
    },
    
    // February
    {
      id: 6,
      name: 'Husnić (Mehmed) Adem',
      description: '30.01.1961 - 12.02.1994.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/feb/husnic-adem.jpg',
      month: 'Februar'
    },
    {
      id: 7,
      name: 'Husnić (Mujo) Dervo',
      description: '01.08.1950 - 12.02.1994.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/feb/husnic-dervo.jpg',
      month: 'Februar'
    },
    {
      id: 8,
      name: 'Nožić (Huso) Salko',
      description: '22.01.1949 - 14.02.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/feb/nozic-salko.jpg',
      month: 'Februar'
    },

    // May
    {
      id: 9,
      name: 'Husić (Mehmed) Esad',
      description: '02.06.1958 - 11.05.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/may/husic-mehmed-esad.jpg',
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
      name: 'Husnić (Meho) Halil',
      description: '12.05.1962 - 04.05.1995.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/may/husnic-meho-halil.jpg',
      month: 'Maj'
    },
    {
      id: 12,
      name: 'Pintul (Murat) Izet',
      description: '11.03.1964 - 30.05.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/may/pintul-murat-izet.jpg',
      month: 'Maj'
    },
    {
      id: 13,
      name: 'Pobrić (Mehmed) Šefik',
      description: '25.01.1966 - 10.05.1993.',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/may/pobric-mehmed-sefik.jpg',
      month: 'Maj'
    },
    {
      id: 14,
      name: 'Puce (Bešir) Mehmed',
      description: '12.04.1959 - 11.05.1993',
      imageUrl: 'https://podvelezje.ba/assets/images/heroes/may/puce-besir-mehmed.jpg',
      month: 'Maj'
    },

    // June
    {
      id: 15,
      name: 'Enver Čolaković',
      description: '1913 - 1976.',
      imageUrl: 'assets/images/heroes/enver-colakovic.jpg',
      month: 'Jun'
    },
    {
      id: 16,
      name: 'Alija Isaković',
      description: '1932 - 1997.',
      imageUrl: 'assets/images/heroes/alija-isakovic.jpg',
      month: 'Jun'
    },
    {
      id: 17,
      name: 'Husein Đogo',
      description: '1886 - 1952.',
      imageUrl: 'assets/images/heroes/husein-dogo.jpg',
      month: 'Jun'
    },
    {
      id: 18,
      name: 'Muhamed Filipović',
      description: '1929 - 2020.',
      imageUrl: 'assets/images/heroes/muhamed-filipovic.jpg',
      month: 'Jun'
    },
    {
      id: 19,
      name: 'Derviš Sušić',
      description: '1925 - 1990.',
      imageUrl: 'assets/images/heroes/dervis-susic.jpg',
      month: 'Jun'
    },
    {
      id: 19,
      name: 'Derviš Sušić',
      description: '1925 - 1990.',
      imageUrl: 'assets/images/heroes/dervis-susic.jpg',
      month: 'Jun'
    },
    {
      id: 19,
      name: 'Derviš Sušić',
      description: '1925 - 1990.',
      imageUrl: 'assets/images/heroes/dervis-susic.jpg',
      month: 'Jun'
    },
    {
      id: 19,
      name: 'Derviš Sušić',
      description: '1925 - 1990.',
      imageUrl: 'assets/images/heroes/dervis-susic.jpg',
      month: 'Jun'
    },
    {
      id: 19,
      name: 'Derviš Sušić',
      description: '1925 - 1990.',
      imageUrl: 'assets/images/heroes/dervis-susic.jpg',
      month: 'Jun'
    },
    {
      id: 19,
      name: 'Derviš Sušić',
      description: '1925 - 1990.',
      imageUrl: 'assets/images/heroes/dervis-susic.jpg',
      month: 'Jun'
    },
    {
      id: 19,
      name: 'Derviš Sušić',
      description: '1925 - 1990.',
      imageUrl: 'assets/images/heroes/dervis-susic.jpg',
      month: 'Jun'
    },
    {
      id: 19,
      name: 'Derviš Sušić',
      description: '1925 - 1990.',
      imageUrl: 'assets/images/heroes/dervis-susic.jpg',
      month: 'Jun'
    },
    {
      id: 19,
      name: 'Derviš Sušić',
      description: '1925 - 1990.',
      imageUrl: 'assets/images/heroes/dervis-susic.jpg',
      month: 'Jun'
    },
    {
      id: 19,
      name: 'Derviš Sušić',
      description: '1925 - 1990.',
      imageUrl: 'assets/images/heroes/dervis-susic.jpg',
      month: 'Jun'
    },
    {
      id: 19,
      name: 'Derviš Sušić',
      description: '1925 - 1990.',
      imageUrl: 'assets/images/heroes/dervis-susic.jpg',
      month: 'Jun'
    },
    {
      id: 19,
      name: 'Derviš Sušić',
      description: '1925 - 1990.',
      imageUrl: 'assets/images/heroes/dervis-susic.jpg',
      month: 'Jun'
    },
    {
      id: 19,
      name: 'Derviš Sušić',
      description: '1925 - 1990.',
      imageUrl: 'assets/images/heroes/dervis-susic.jpg',
      month: 'Jun'
    },
    {
      id: 19,
      name: 'Derviš Sušić',
      description: '1925 - 1990.',
      imageUrl: 'assets/images/heroes/dervis-susic.jpg',
      month: 'Jun'
    },
    {
      id: 19,
      name: 'Derviš Sušić',
      description: '1925 - 1990.',
      imageUrl: 'assets/images/heroes/dervis-susic.jpg',
      month: 'Jun'
    },

    // July
    {
      id: 31,
      name: 'Hasan Kaimija',
      description: '17. stoljeće.',
      imageUrl: 'assets/images/heroes/hasan-kaimija.jpg',
      month: 'Juli'
    },
    {
      id: 32,
      name: 'Ahmed Muradbegović',
      description: '1898 - 1972.',
      imageUrl: 'assets/images/heroes/ahmed-muradbegovic.jpg',
      month: 'Juli'
    },
    {
      id: 33,
      name: 'Fadil Hadžić',
      description: '1922 - 2011.',
      imageUrl: 'assets/images/heroes/fadil-hadzic.jpg',
      month: 'Juli'
    },
    {
      id: 34,
      name: 'Izet Sarajlić',
      description: '1930 - 2002.',
      imageUrl: 'assets/images/heroes/izet-sarajlic.jpg',
      month: 'Juli'
    },
    {
      id: 35,
      name: 'Nedžad Ibrišimović',
      description: '1940 - 2011.',
      imageUrl: 'assets/images/heroes/nedzad-ibrisimovic.jpg',
      month: 'Juli'
    },
    {
      id: 32,
      name: 'Ahmed Muradbegović',
      description: '1898 - 1972.',
      imageUrl: 'assets/images/heroes/ahmed-muradbegovic.jpg',
      month: 'Juli'
    },
    {
      id: 32,
      name: 'Ahmed Muradbegović',
      description: '1898 - 1972.',
      imageUrl: 'assets/images/heroes/ahmed-muradbegovic.jpg',
      month: 'Juli'
    },
    {
      id: 32,
      name: 'Ahmed Muradbegović',
      description: '1898 - 1972.',
      imageUrl: 'assets/images/heroes/ahmed-muradbegovic.jpg',
      month: 'Juli'
    },
    {
      id: 32,
      name: 'Ahmed Muradbegović',
      description: '1898 - 1972.',
      imageUrl: 'assets/images/heroes/ahmed-muradbegovic.jpg',
      month: 'Juli'
    },
    {
      id: 32,
      name: 'Ahmed Muradbegović',
      description: '1898 - 1972.',
      imageUrl: 'assets/images/heroes/ahmed-muradbegovic.jpg',
      month: 'Juli'
    },
    {
      id: 32,
      name: 'Ahmed Muradbegović',
      description: '1898 - 1972.',
      imageUrl: 'assets/images/heroes/ahmed-muradbegovic.jpg',
      month: 'Juli'
    },
    {
      id: 32,
      name: 'Ahmed Muradbegović',
      description: '1898 - 1972.',
      imageUrl: 'assets/images/heroes/ahmed-muradbegovic.jpg',
      month: 'Juli'
    },
    {
      id: 32,
      name: 'Ahmed Muradbegović',
      description: '1898 - 1972.',
      imageUrl: 'assets/images/heroes/ahmed-muradbegovic.jpg',
      month: 'Juli'
    },
    {
      id: 32,
      name: 'Ahmed Muradbegović',
      description: '1898 - 1972.',
      imageUrl: 'assets/images/heroes/ahmed-muradbegovic.jpg',
      month: 'Juli'
    },
    {
      id: 32,
      name: 'Ahmed Muradbegović',
      description: '1898 - 1972.',
      imageUrl: 'assets/images/heroes/ahmed-muradbegovic.jpg',
      month: 'Juli'
    },
    {
      id: 32,
      name: 'Ahmed Muradbegović',
      description: '1898 - 1972.',
      imageUrl: 'assets/images/heroes/ahmed-muradbegovic.jpg',
      month: 'Juli'
    },
    {
      id: 32,
      name: 'Ahmed Muradbegović',
      description: '1898 - 1972.',
      imageUrl: 'assets/images/heroes/ahmed-muradbegovic.jpg',
      month: 'Juli'
    },
    {
      id: 32,
      name: 'Ahmed Muradbegović',
      description: '1898 - 1972.',
      imageUrl: 'assets/images/heroes/ahmed-muradbegovic.jpg',
      month: 'Juli'
    },
    {
      id: 32,
      name: 'Ahmed Muradbegović',
      description: '1898 - 1972.',
      imageUrl: 'assets/images/heroes/ahmed-muradbegovic.jpg',
      month: 'Juli'
    },
    {
      id: 32,
      name: 'Ahmed Muradbegović',
      description: '1898 - 1972.',
      imageUrl: 'assets/images/heroes/ahmed-muradbegovic.jpg',
      month: 'Juli'
    },
    {
      id: 32,
      name: 'Ahmed Muradbegović',
      description: '1898 - 1972.',
      imageUrl: 'assets/images/heroes/ahmed-muradbegovic.jpg',
      month: 'Juli'
    },

    // August
    {
      id: 36,
      name: 'Abdulvehab Ilhamija',
      description: '1773 - 1821.',
      imageUrl: 'assets/images/heroes/abdulvehab-ilhamija.jpg',
      month: 'Avgust'
    },
    {
      id: 37,
      name: 'Nafija Sarajlić',
      description: '1893 - 1970.',
      imageUrl: 'assets/images/heroes/nafija-sarajlic.jpg',
      month: 'Avgust'
    },
    {
      id: 38,
      name: 'Hamid Dizdar',
      description: '1907 - 1967.',
      imageUrl: 'assets/images/heroes/hamid-dizdar.jpg',
      month: 'Avgust'
    },
    {
      id: 39,
      name: 'Rizo Ramić',
      description: '1943 - 1994.',
      imageUrl: 'assets/images/heroes/rizo-ramic.jpg',
      month: 'Avgust'
    },
    {
      id: 40,
      name: 'Husein Lamekani',
      description: '16. stoljeće.',
      imageUrl: 'assets/images/heroes/husein-lamekani.jpg',
      month: 'Avgust'
    },
    {
      id: 37,
      name: 'Nafija Sarajlić',
      description: '1893 - 1970.',
      imageUrl: 'assets/images/heroes/nafija-sarajlic.jpg',
      month: 'Avgust'
    },
    {
      id: 37,
      name: 'Nafija Sarajlić',
      description: '1893 - 1970.',
      imageUrl: 'assets/images/heroes/nafija-sarajlic.jpg',
      month: 'Avgust'
    },
    {
      id: 37,
      name: 'Nafija Sarajlić',
      description: '1893 - 1970.',
      imageUrl: 'assets/images/heroes/nafija-sarajlic.jpg',
      month: 'Avgust'
    },
    {
      id: 37,
      name: 'Nafija Sarajlić',
      description: '1893 - 1970.',
      imageUrl: 'assets/images/heroes/nafija-sarajlic.jpg',
      month: 'Avgust'
    },
    {
      id: 37,
      name: 'Nafija Sarajlić',
      description: '1893 - 1970.',
      imageUrl: 'assets/images/heroes/nafija-sarajlic.jpg',
      month: 'Avgust'
    },

    // September
    {
      id: 41,
      name: 'Muhsin Rizvić',
      description: '1930 - 1994.',
      imageUrl: 'assets/images/heroes/muhsin-rizvic.jpg',
      month: 'Septembar'
    },
    {
      id: 42,
      name: 'Salih Ugljanin',
      description: '1870 - 1935.',
      imageUrl: 'assets/images/heroes/salih-ugljanin.jpg',
      month: 'Septembar'
    },
    {
      id: 43,
      name: 'Avdo Međedović',
      description: '1875 - 1953.',
      imageUrl: 'assets/images/heroes/avdo-medjedovic.jpg',
      month: 'Septembar'
    },
    {
      id: 44,
      name: 'Hamza Bey Biščević',
      description: '19. stoljeće.',
      imageUrl: 'assets/images/heroes/hamza-biscevic.jpg',
      month: 'Septembar'
    },
    {
      id: 45,
      name: 'Muhamed Nerkesi',
      description: '1584 - 1635.',
      imageUrl: 'assets/images/heroes/muhamed-nerkesi.jpg',
      month: 'Septembar'
    },
    {
      id: 42,
      name: 'Salih Ugljanin',
      description: '1870 - 1935.',
      imageUrl: 'assets/images/heroes/salih-ugljanin.jpg',
      month: 'Septembar'
    },
    {
      id: 42,
      name: 'Salih Ugljanin',
      description: '1870 - 1935.',
      imageUrl: 'assets/images/heroes/salih-ugljanin.jpg',
      month: 'Septembar'
    },
    {
      id: 42,
      name: 'Salih Ugljanin',
      description: '1870 - 1935.',
      imageUrl: 'assets/images/heroes/salih-ugljanin.jpg',
      month: 'Septembar'
    },
    {
      id: 42,
      name: 'Salih Ugljanin',
      description: '1870 - 1935.',
      imageUrl: 'assets/images/heroes/salih-ugljanin.jpg',
      month: 'Septembar'
    },
    {
      id: 42,
      name: 'Salih Ugljanin',
      description: '1870 - 1935.',
      imageUrl: 'assets/images/heroes/salih-ugljanin.jpg',
      month: 'Septembar'
    },
    {
      id: 42,
      name: 'Salih Ugljanin',
      description: '1870 - 1935.',
      imageUrl: 'assets/images/heroes/salih-ugljanin.jpg',
      month: 'Septembar'
    },
    {
      id: 42,
      name: 'Salih Ugljanin',
      description: '1870 - 1935.',
      imageUrl: 'assets/images/heroes/salih-ugljanin.jpg',
      month: 'Septembar'
    },
    {
      id: 42,
      name: 'Salih Ugljanin',
      description: '1870 - 1935.',
      imageUrl: 'assets/images/heroes/salih-ugljanin.jpg',
      month: 'Septembar'
    },
    {
      id: 42,
      name: 'Salih Ugljanin',
      description: '1870 - 1935.',
      imageUrl: 'assets/images/heroes/salih-ugljanin.jpg',
      month: 'Septembar'
    },

    // October
    {
      id: 46,
      name: 'Hasan Kafija Pruščak',
      description: '1544 - 1615.',
      imageUrl: 'assets/images/heroes/hasan-kafija.jpg',
      month: 'Oktobar'
    },
    {
      id: 47,
      name: 'Ahmed Vali',
      description: '17. stoljeće.',
      imageUrl: 'assets/images/heroes/ahmed-vali.jpg',
      month: 'Oktobar'
    },
    {
      id: 48,
      name: 'Fejzo Softa',
      description: '19. stoljeće.',
      imageUrl: 'assets/images/heroes/fejzo-softa.jpg',
      month: 'Oktobar'
    },
    {
      id: 49,
      name: 'Muhamed Hadžijamaković',
      description: '1916 - 1986.',
      imageUrl: 'assets/images/heroes/muhamed-hadzijamaković.jpg',
      month: 'Oktobar'
    },
    {
      id: 50,
      name: 'Ibrahim Krzović',
      description: '1924 - 2021.',
      imageUrl: 'assets/images/heroes/ibrahim-krzovic.jpg',
      month: 'Oktobar'
    },

    // November
    {
      id: 51,
      name: 'Osman Đikić',
      description: '1879 - 1912.',
      imageUrl: 'assets/images/heroes/osman-djikic.jpg',
      month: 'Novembar'
    },
    {
      id: 52,
      name: 'Abdurahman Sirri',
      description: '19. stoljeće.',
      imageUrl: 'assets/images/heroes/abdurahman-sirri.jpg',
      month: 'Novembar'
    },
    {
      id: 53,
      name: 'Muhamed Šefket Kurt',
      description: '1879 - 1963.',
      imageUrl: 'assets/images/heroes/muhamed-kurt.jpg',
      month: 'Novembar'
    },
    {
      id: 54,
      name: 'Safvet Halilović',
      description: '1940 - 2021.',
      imageUrl: 'assets/images/heroes/safvet-halilovic.jpg',
      month: 'Novembar'
    },
    {
      id: 55,
      name: 'Mustafa Ejubović',
      description: '1651 - 1707.',
      imageUrl: 'assets/images/heroes/mustafa-ejubovic.jpg',
      month: 'Novembar'
    },
    {
      id: 52,
      name: 'Abdurahman Sirri',
      description: '19. stoljeće.',
      imageUrl: 'assets/images/heroes/abdurahman-sirri.jpg',
      month: 'Novembar'
    },
    {
      id: 52,
      name: 'Abdurahman Sirri',
      description: '19. stoljeće.',
      imageUrl: 'assets/images/heroes/abdurahman-sirri.jpg',
      month: 'Novembar'
    },
    {
      id: 52,
      name: 'Abdurahman Sirri',
      description: '19. stoljeće.',
      imageUrl: 'assets/images/heroes/abdurahman-sirri.jpg',
      month: 'Novembar'
    },
    {
      id: 52,
      name: 'Abdurahman Sirri',
      description: '19. stoljeće.',
      imageUrl: 'assets/images/heroes/abdurahman-sirri.jpg',
      month: 'Novembar'
    },
    {
      id: 52,
      name: 'Abdurahman Sirri',
      description: '19. stoljeće.',
      imageUrl: 'assets/images/heroes/abdurahman-sirri.jpg',
      month: 'Novembar'
    },
    {
      id: 52,
      name: 'Abdurahman Sirri',
      description: '19. stoljeće.',
      imageUrl: 'assets/images/heroes/abdurahman-sirri.jpg',
      month: 'Novembar'
    },
    {
      id: 52,
      name: 'Abdurahman Sirri',
      description: '19. stoljeće.',
      imageUrl: 'assets/images/heroes/abdurahman-sirri.jpg',
      month: 'Novembar'
    },
    {
      id: 52,
      name: 'Abdurahman Sirri',
      description: '19. stoljeće.',
      imageUrl: 'assets/images/heroes/abdurahman-sirri.jpg',
      month: 'Novembar'
    },
    {
      id: 52,
      name: 'Abdurahman Sirri',
      description: '19. stoljeće.',
      imageUrl: 'assets/images/heroes/abdurahman-sirri.jpg',
      month: 'Novembar'
    },
    {
      id: 52,
      name: 'Abdurahman Sirri',
      description: '19. stoljeće.',
      imageUrl: 'assets/images/heroes/abdurahman-sirri.jpg',
      month: 'Novembar'
    },
    {
      id: 52,
      name: 'Abdurahman Sirri',
      description: '19. stoljeće.',
      imageUrl: 'assets/images/heroes/abdurahman-sirri.jpg',
      month: 'Novembar'
    },

    // December
    {
      id: 56,
      name: 'Ahmed Karabegović',
      description: '1908 - 1967.',
      imageUrl: 'assets/images/heroes/ahmed-karabegovic.jpg',
      month: 'Decembar'
    },
    {
      id: 57,
      name: 'Mustafa Muhibbi',
      description: '17. stoljeće.',
      imageUrl: 'assets/images/heroes/mustafa-muhibbi.jpg',
      month: 'Decembar'
    },
    {
      id: 58,
      name: 'Fadil Maglajlić',
      description: '1945 - 2016.',
      imageUrl: 'assets/images/heroes/fadil-maglajlic.jpg',
      month: 'Decembar'
    },
    {
      id: 59,
      name: 'Alija Bejtić',
      description: '1920 - 1981.',
      imageUrl: 'assets/images/heroes/alija-bejtic.jpg',
      month: 'Decembar'
    },
    {
      id: 60,
      name: 'Hamdija Kreševljaković',
      description: '1888 - 1959.',
      imageUrl: 'assets/images/heroes/hamdija-kresevljakovic.jpg',
      month: 'Decembar'
    },
    {
      id: 60,
      name: 'Hamdija Kreševljaković',
      description: '1888 - 1959.',
      imageUrl: 'assets/images/heroes/hamdija-kresevljakovic.jpg',
      month: 'Decembar'
    },
    {
      id: 60,
      name: 'Hamdija Kreševljaković',
      description: '1888 - 1959.',
      imageUrl: 'assets/images/heroes/hamdija-kresevljakovic.jpg',
      month: 'Decembar'
    },
    {
      id: 60,
      name: 'Hamdija Kreševljaković',
      description: '1888 - 1959.',
      imageUrl: 'assets/images/heroes/hamdija-kresevljakovic.jpg',
      month: 'Decembar'
    },
    {
      id: 60,
      name: 'Hamdija Kreševljaković',
      description: '1888 - 1959.',
      imageUrl: 'assets/images/heroes/hamdija-kresevljakovic.jpg',
      month: 'Decembar'
    },
    {
      id: 60,
      name: 'Hamdija Kreševljaković',
      description: '1888 - 1959.',
      imageUrl: 'assets/images/heroes/hamdija-kresevljakovic.jpg',
      month: 'Decembar'
    },
    {
      id: 60,
      name: 'Hamdija Kreševljaković',
      description: '1888 - 1959.',
      imageUrl: 'assets/images/heroes/hamdija-kresevljakovic.jpg',
      month: 'Decembar'
    }
  ];

  activeSlideIndices = new Map<string, number>();
  carouselIntervals = new Map<string, any>();

  private autoSlideInterval = 5000; // 5 seconds
  private slideTimers: { [month: string]: Subscription } = {};
  private progressTimers: { [month: string]: Subscription } = {};
  private progress: { [month: string]: number } = {};

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
    });
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= this.MOBILE_BREAKPOINT;
  }

  ngOnInit() {
    // Start auto-slide for each month that has heroes
    this.months.forEach(month => {
      if (this.getHeroesForMonth(month).length > 1) {
        this.startAutoSlide(month);
      }
    });
  }

  ngOnDestroy() {
    // Cleanup timers
    Object.values(this.slideTimers).forEach(timer => timer?.unsubscribe());
    Object.values(this.progressTimers).forEach(timer => timer?.unsubscribe());
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

    // Create progress timer (updates every 50ms)
    this.progressTimers[month] = interval(50).subscribe(() => {
      this.progress[month] = (this.progress[month] + (50 / this.autoSlideInterval) * 100) % 100;
    });

    // Create slide timer
    this.slideTimers[month] = interval(this.autoSlideInterval).subscribe(() => {
      this.nextSlide(month);
      this.progress[month] = 0; // Reset progress after slide
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

  // Modify existing slide methods to reset timers
  nextSlide(month: string) {
    const heroes = this.getHeroesForMonth(month);
    if (heroes.length === 0) return;

    let currentIndex = this.activeSlideIndices.get(month) || 0;
    currentIndex = (currentIndex + 1) % heroes.length;
    this.activeSlideIndices.set(month, currentIndex);
    this.resetProgress(month);
  }

  prevSlide(month: string) {
    const heroes = this.getHeroesForMonth(month);
    if (heroes.length === 0) return;

    let currentIndex = this.activeSlideIndices.get(month) || 0;
    currentIndex = (currentIndex - 1 + heroes.length) % heroes.length;
    this.activeSlideIndices.set(month, currentIndex);
    this.resetProgress(month);
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
    this.resetProgress(month);
  }

  private resetProgress(month: string) {
    this.progressTimers[month]?.unsubscribe();
    this.progress[month] = 0;
    this.progressTimers[month] = interval(50).subscribe(() => {
      this.progress[month] = (this.progress[month] + (50 / this.autoSlideInterval) * 100) % 100;
    });
  }
} 