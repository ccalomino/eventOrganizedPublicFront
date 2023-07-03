import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BackendService } from './../backend-service/backend-service.component';
import { PopupComponent } from './../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-maridaje',
  templateUrl: './maridaje.component.html',
  styleUrls: ['./../app.component.css']
})
export class MaridajeComponent {

  maridajeData: any;
  listaCargadaMaridajes: boolean = false;

  constructor(private http: HttpClient,  private dialog: MatDialog, private backendService: BackendService) {
    this.maridajeData = [];
   }

  ngOnInit() {
    this.getListaMaridajes();
  }

  getListaMaridajes() {
    this.backendService.getListaMaridajes().subscribe(
      (response) => {
        this.maridajeData = response;
        console.log('Datos de maridajes obtenidos:', this.maridajeData);
        this.listaCargadaMaridajes = true;
      },
      (error) => {
        console.error('Error al obtener datos de maridajes:', error);
      }
    );
  }



  openPopupMaridaje(maridajeId: number, modoEdicion: boolean = false, modo: any = 3): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { maridajeId, modoEdicion, modo }
    });
  }

  openPopupMaridajeEdicion(maridajeId: number, modoEdicion: boolean = true, modo: any = 3): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { maridajeId, modoEdicion, modo }
    });
  }

  openPopupMaridajeEliminar(maridajeId: number, modoEdicion: boolean = true, modo: any = 3): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { maridajeId, modoEdicion, modo }
    });
  }

}
