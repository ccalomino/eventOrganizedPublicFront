  import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
  import { Router } from '@angular/router';
  import { VinoComponent } from './vino/vino.component';
  import { PlatoComponent } from './plato/plato.component';
  import { MaridajeComponent } from './maridaje/maridaje.component';
  import { MatMenuTrigger } from '@angular/material/menu';
  import { MatMenuPanel } from '@angular/material/menu';



  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })


  export class AppComponent implements OnInit {

    @ViewChild(VinoComponent, { static: true }) vinoComponent!: VinoComponent | null;
    @ViewChild(PlatoComponent, { static: true }) platoComponent!: PlatoComponent | null;
    @ViewChild(MaridajeComponent, { static: true }) maridajeComponent!: MaridajeComponent | null;
    @ViewChild('vinosMenu') vinosMenu!: MatMenuTrigger;
    @ViewChild('platosMenu') platosMenu!: MatMenuTrigger;
    @ViewChild('maridajesMenu') maridajesMenu!: MatMenuTrigger;

    mostrarContenidoListaVinos = false;
    mostrarContenidoListaPlatos = false;
    mostrarContenidoListaMaridajes = false;

    mostrarSubMenuVinos = false;
    mostrarSubMenuPlatos = false;
    imagenFondo: string = './../assets/img/menu4.jpg';



    constructor(private router: Router, private renderer: Renderer2) { 
      this.vinoComponent?.getListaVinosYDatosUva();
      this.platoComponent?.getListaPlatos();
      this.maridajeComponent?.getListaMaridajes();
    }

    ngOnInit() {
      this.vinoComponent?.getListaVinosYDatosUva();
      this.platoComponent?.getListaPlatos();
      this.maridajeComponent?.getListaMaridajes();
    }

/*     toggleRouterOutlet() {
      this.mostrarContenidoListaVinos = !this.mostrarContenidoListaVinos;
    } */

    toggleSubMenu(menu: string, submenu: string) {
      if (menu === 'vinos') {
        if (submenu === 'listado') {
          this.mostrarContenidoListaVinos = true;
          this.mostrarContenidoListaPlatos = false;
          this.mostrarContenidoListaMaridajes = false;
        } else if (submenu === 'agregar') {
          // Lógica para mostrar el formulario de agregar vino
        }
      } else 
        if (menu === 'platos') {
          if (submenu === 'listado') {
            this.mostrarContenidoListaVinos = false;
            this.mostrarContenidoListaPlatos = true;
            this.mostrarContenidoListaMaridajes = false;
          } else if (submenu === 'agregar') {
            // Lógica para mostrar el formulario de agregar plato
          }
      } else 
        if (menu === 'maridajes') {
          if (submenu === 'listado') {
            this.mostrarContenidoListaVinos = false;
            this.mostrarContenidoListaPlatos = false;
            this.mostrarContenidoListaMaridajes = true;
          } else if (submenu === 'agregar') {
            // Lógica para mostrar el formulario de agregar plato
          }
        }
    }
  

    cambiarImagenFondo(url: string) {
      const menuElement = document.querySelector('.menu');
      this.renderer.setStyle(menuElement, 'background-image', `url(${url})`);
    }


  }