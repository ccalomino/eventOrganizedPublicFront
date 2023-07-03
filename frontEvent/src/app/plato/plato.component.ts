import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './../popup/popup.component';
import { BackendService } from './../backend-service/backend-service.component';



@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./../app.component.css']
})


export class PlatoComponent {

  platoData: any;
  listaCargadaPlatos: boolean = false;
  modoEdicion: boolean = false;

  

  constructor(private http: HttpClient, private dialog: MatDialog, private backendService: BackendService) {
    this.platoData = [];
 
   }

  ngOnInit() {
    this.getListaPlatos();
  }



  getListaPlatos() {

    this.backendService.getListaPlatos().subscribe(
      (response) => {
        this.platoData = response;
        console.log('Datos de platos obtenidos:', this.platoData);
        this.listaCargadaPlatos = true;
      },
      (error) => {
        console.error('Error al obtener datos de plato:', error);
      }
    );

   
  }

  openPopupPlato(platoId: number, modoEdicion: boolean = false, modo: any = 2): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { platoId, modoEdicion, modo }
    });
  }

  openPopupPlatoEdicion(platoId: number, modoEdicion: boolean = true, modo: any = 2): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { platoId, modoEdicion, modo }
    });
  }

  openPopupPlatoEliminar(platoId: number, modoEdicion: boolean = true, modo: any = 2): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { platoId, modoEdicion, modo }
    });
  }


}
