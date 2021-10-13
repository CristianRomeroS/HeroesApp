import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {
  termino:string='';
  heroes:Heroe[]=[];
  heroeSeleccionado!:Heroe|undefined;
  constructor(private heroesService:HeroesService) { }

  ngOnInit(): void {
  }
  buscando(){
    this.heroesService.getSugerencias(this.termino.trim())
      .subscribe(heroes=>this.heroes=heroes)
      console.log(this.termino)
  }
  opcionSeleccionada(event:MatAutocompleteSelectedEvent){
    //validad si viene un string vacio
    if(!event.option.value){
      this.heroeSeleccionado=undefined
      return
    }else{
      const heroe:Heroe=event.option.value;
    this.termino=heroe.superhero;
    this.heroesService.getHeroePorId(heroe.id!).
    subscribe(heroe=>this.heroeSeleccionado=heroe)
    }
    
    
    

  }
}