import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { BackendService } from './../backend-service/backend-service.component';
import { DomSanitizer, SafeResourceUrl  } from '@angular/platform-browser';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./../app.component.css']
})


export class PopupComponent implements OnInit{

  @Input() additionalData: any;
  @Input() additionalDataVino: any;
  @Input() additionalDataMaridaje: any;
  @Input() additionalDataVinoImg: any;
  @Input() listaVinosCombo: any;
  @Input() modoEdicion: boolean = false;
  @Input() modoEliminar: boolean = false;
  @Input() modo: any = 0;
  @Input() darkTheme: boolean = false;
  selectedVinoCombo: any;

  selectedImage: File | null = null;
  @Input() imagenBase64: SafeResourceUrl | null;

  constructor(public dialogRef: MatDialogRef<PopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any,  private http: HttpClient, private backendService: BackendService, private sanitizer: DomSanitizer) {
    this.imagenBase64 = [];
    this.listaVinosCombo = [];
    this.selectedVinoCombo = "";
  }

  ngOnInit() {
    this.modoEdicion = this.data.modoEdicion;
    this.modo = this.data.modo;
    //this.getListaVinos();

    if (this.modo === 1)
      this.getAdditionalDataVino();
    
    if (this.modo === 2)
      this.getAdditionalData();

    if (this.modo === 3){
      this.getListaVinos();
      this.getAdditionalDataMaridaje();
    }
      
  }

  closePopup() {
    this.dialogRef.close();
  }



  // ----------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------
  
  convertirImagenBase64(imagen: number[]): void {
    if (imagen && imagen.length > 0) {
      const TYPED_ARRAY = new Uint8Array(imagen);
      const STRING_CHAR = String.fromCharCode.apply(null, Array.from(TYPED_ARRAY));
      const base64String = btoa(STRING_CHAR);
      const imageUrl = 'data:image/jpeg;base64,' + base64String;
      this.imagenBase64 = this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
    } else {
      this.imagenBase64 = null;
    }
  }
  
  getAdditionalData() {
    this.backendService.getAdditionalData(this.data.platoId).subscribe(
      (response) => {
        this.additionalData = response;
        // Reemplazar literales "\n" por saltos de línea reales
        this.additionalData.ingredientes1 = this.additionalData.ingredientes1.replace(/\\n/g, '\n');
        this.additionalData.instrucciones = this.additionalData.instrucciones.replace(/\\n/g, '\n');

        this.imagenBase64 = this.additionalData.imagen;
        //this.convertirImagenBase64(this.additionalData.imagen);
      },
      (error) => {
        console.error('Error al obtener datos adicionales del plato:', error);
      }
    );
  }



  // ----------------------------------------------------------------------------------
  // GUARDAR CAMBIOS PLATO
  // ----------------------------------------------------------------------------------

  guardarCambios(): void {

    this.backendService.actualizarDatosPlato(this.additionalData.id, this.additionalData).subscribe(
      (response) => {
        this.additionalData = response;
        this.closePopup();
        console.log('Datos adicionales del plato:', this.additionalData);
      },
      (error) => {
        console.error('Error al obtener datos adicionales del plato:', error);
      }
    );

    this.guardarImagen();

  }


  guardarImagen(): void {

    if (this.selectedImage) 
    {
      this.backendService.guardarImagen(this.additionalData.id, this.selectedImage).subscribe(
        (response) => {
          console.log('Imagen guardada correctamente');
        },
        (error) => {
          console.error('Error al guardar la imagen:', error);
        }
      );
    } else {
      console.log('No se ha seleccionado ninguna imagen');
    }
  }
  

  
  getImageUrl(): string | null {
    if (this.selectedImage) {
      return URL.createObjectURL(this.selectedImage);
    }
    return null;
  }


  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  // ----------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------





  // ----------------------------------------------------------------------------------
  // GUARDAR CAMBIOS VINO
  // ----------------------------------------------------------------------------------

  guardarCambiosVino(): void {

    const additionalDataVino2 = {
      nombre: this.additionalDataVino.nombreVino,
      variedad: this.additionalDataVino.variedad,
      bodega: this.additionalDataVino.bodega,
      anno: this.additionalDataVino.anno
    };


    this.backendService.actualizarDatosVino(this.additionalDataVino.id, additionalDataVino2).subscribe(
      (response) => {
        this.additionalDataVino = response;
        this.closePopup();
        console.log('Datos adicionales del plato:', additionalDataVino2);
      },
      (error) => {
        console.error('Error al obtener datos adicionales del plato:', error);
      }
    );

    this.guardarImagenVino();

  }


  guardarImagenVino(): void {

    if (this.selectedImage) 
    {
      this.backendService.guardarImagenVino(this.additionalDataVino.id, this.selectedImage).subscribe(
        (response) => {
          console.log('Imagen guardada correctamente');
        },
        (error) => {
          console.error('Error al guardar la imagen:', error);
        }
      );
    } else {
      console.log('No se ha seleccionado ninguna imagen');
    }
  }
  


  getAdditionalDataVino() 
  {
    this.backendService.getAdditionalDataVino(this.data.vinoId).subscribe(
      (response) => {
        this.additionalDataVino = response;
        console.log(this.additionalDataVino)
      },
      (error) => {
        console.error('Error al obtener datos adicionales del vino:', error);
      }
    );

    this.backendService.getAdditionalDataVinoImagen(this.data.vinoId).subscribe(
      (response) => {
        this.additionalDataVinoImg = response;
        console.log(this.additionalDataVinoImg)
      },
      (error) => {
        console.error('Error al obtener datos adicionales del vino:', error);
      }
    );
  }
 

// ----------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------



// ----------------------------------------------------------------------------------
// MARIDAJE
// ----------------------------------------------------------------------------------


  getAdditionalDataMaridaje() 
  {   

    this.backendService.getAdditionalDataMaridaje(this.data.maridajeId).subscribe(
      (response) => {
        this.additionalDataMaridaje = response;
        this.selectedVinoCombo = this.additionalDataMaridaje.vino.nombre;
      },
      (error) => {
        console.error('Error al obtener datos adicionales del maridaje:', error);
      }
    );
  }




  mostrarDatosVino() {
    const vinoSeleccionado = this.additionalDataMaridaje.vino;
    const uvaSeleccionadaElement = document.getElementById("uvaSeleccionada");
    const bodegaElement = document.getElementById("bodegaSeleccionada");
    
    if (uvaSeleccionadaElement && bodegaElement && vinoSeleccionado) {
      uvaSeleccionadaElement.innerText = vinoSeleccionado.uva.nombre;
      bodegaElement.innerText = vinoSeleccionado.bodega;
    }
  }
  

  

  getListaVinos() {
    this.backendService.getListaVinosCombo().subscribe(
      (response) => {
        this.listaVinosCombo = response;
      },
      (error) => {
        console.error('Error al obtener datos', error);
      }
    );
  }




  guardarMaridaje(){

  }

// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------


}

