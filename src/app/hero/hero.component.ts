import { Component } from '@angular/core';
import { concat, concatMap, delay, interval, map, mergeAll, of, repeat, take } from 'rxjs';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {

  private readonly alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',' ', '-'];

  private readonly words = [
    "Fullstack developer 💻",
    "Mountain biker 🚵",
    "Tech-driven 🤖",
    "Car enthusiast 🚗",
    "Software developer 👨‍💻",
    "Video game lover 🎮",
    "Angular developer 🅰️",
    "Subaru lover 🚙",
    "Computer scientist 👨‍🔬",
    "Formula One addict 🏎️",
    "Problem solver 🧩"
  ];

  readonly characters$ = of(this.words).pipe(
    mergeAll(),
    concatMap(word =>
      concat(
        interval(150).pipe(
          map(x => this.alphabet.includes(word.substring(x, x + 1).toLowerCase()) ?  word.substring(0, x + 1) : word),
          take(word.length)
        ),
        interval(100).pipe(
          map(x => this.alphabet.includes(word.split("").reverse().join("").substring(x, x - 1).toLowerCase()) ? word.substring(0, word.length - x - 1) : word),
          take(word.length),
          delay(1000)
        ),
        of("").pipe(delay(500))
      )
    ),
    repeat()
  )
}
