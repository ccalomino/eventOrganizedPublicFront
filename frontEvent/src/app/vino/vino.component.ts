import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './../popup/popup.component';
import { BackendService } from './../backend-service/backend-service.component';
import { BehaviorSubject } from 'rxjs';



@Component({
  selector: 'app-vino',
  templateUrl: './vino.component.html',
  styleUrls: ['./../app.component.css'],
})


export class VinoComponent implements OnInit {

  vinoData: any;
  listaCargada: boolean = false;
  imagenTemporal: any;
  vinoDataSubject: BehaviorSubject<PopupComponent[]> = new BehaviorSubject<PopupComponent[]>([]); 


  constructor(private http: HttpClient, private dialog: MatDialog, private backendService: BackendService) {
    this.vinoData = [];
   }

  ngOnInit() {
    this.getListaVinosYDatosUva();
  }


  getListaVinosYDatosUva() {

    this.backendService.getListaVinos().subscribe(
      (response) => {
        this.vinoData = response;
        console.log('Datos de vino obtenidos:', this.vinoData);
        this.listaCargada = true;
      },
      (error) => {
        console.error('Error al obtener datos de vino:', error);
      }
    );


  }

  updateVino(vinoId: number, vinoData: any) {
    this.http.put(`http://localhost:8098/vinos/${vinoId}`, vinoData).subscribe(
      (response) => {
        console.log('Vino actualizado:', response);
        // Realiza cualquier otra acción después de la actualización
      },
      (error) => {
        console.error('Error al actualizar el vino:', error);
        // Realiza cualquier otra acción en caso de error
      }
    );
  }

  subirImagen(event: Event, vinoId: string) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const imagen = inputElement.files[0];
      // Resto de la lógica para almacenar temporalmente la imagen
      this.imagenTemporal = imagen;
    }
  }
  
  guardarImagen(vinoId: string) {
    // Verifica que haya una imagen temporal seleccionada
    if (this.imagenTemporal) {
      // Crea un FormData para enviar la imagen al servidor
      const formData = new FormData();
      formData.append('imagen', this.imagenTemporal, this.imagenTemporal.name);
      formData.append('vinoId', vinoId);
  
      // Realiza la petición HTTP para guardar la imagen en el servidor
      this.http.post('/api/guardar-imagen', formData).subscribe(
        (response) => {
          // Lógica adicional después de guardar la imagen
          console.log('Imagen guardada exitosamente');
        },
        (error) => {
          console.error('Error al guardar la imagen:', error);
        }
      );
    }
  }

 

  openPopupVino(vinoId: number, modoEdicion: boolean = false, modo: any = 1): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { vinoId, modoEdicion, modo }
    });
  }

  openPopupVinoEdicion(vinoId: number, modoEdicion: boolean = true, modo: any = 1): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { vinoId, modoEdicion, modo }
    });
  }

  openPopupVinoEliminar(vinoId: number, modoEdicion: boolean = true, modo: any = 1): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { vinoId, modoEdicion, modo }
    });
  }
  

  
}

