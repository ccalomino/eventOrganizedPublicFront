import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from './../config';



@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-backend-service',
  templateUrl: './backend-service.component.html',
  styleUrls: ['./backend-service.component.css']
})

export class BackendService {
  constructor(private http: HttpClient) { }

  // ---------------------------------------------------------
  // ---------------------------------------------------------
  
  getListaPlatos() {
    return this.http.get(`${API_BASE_URL}/platos`);
  }

  getAdditionalData(platoId: number) {
    const url = `${API_BASE_URL}/platos/${platoId}`;
    return this.http.get(url);
  }

  guardarDatosPlato(data: any) {
    return this.http.post(`${API_BASE_URL}/platos/guardarPlato`, data);
  }

  actualizarDatosPlato(platoId: number, data: any) {
    return this.http.put(`${API_BASE_URL}/platos/${platoId}`, data);
  }

  guardarImagen(platoId: number, imagen: File) {
    const formData = new FormData();
    formData.append('imagen', imagen);
    return this.http.post(`${API_BASE_URL}/platos/${platoId}/imagen`, formData);
  }
  
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  getListaVinos() {
    return this.http.get(`${API_BASE_URL}/vinos/datosCategUvas`);
  }

  getListaVinosCombo() {
    return this.http.get(`${API_BASE_URL}/vinos`);
  }
  // ---------------------------------------------------------
  // ---------------------------------------------------------

  getAdditionalDataVino(vinoId: number) {
    const url = `${API_BASE_URL}/vinos/datosVino/${vinoId}`;
    return this.http.get(url);
  }

  getAdditionalDataVinoImagen(vinoId: number) {
    const url = `${API_BASE_URL}/vinos/${vinoId}`;
    return this.http.get(url);
  }

  guardarDatosVino(data: any) {
    return this.http.post(`${API_BASE_URL}/vinos/guardarVino`, data);
  }

  actualizarDatosVino(vinoId: number, data: any) {
    return this.http.put(`${API_BASE_URL}/vinos/${vinoId}`, data);
  }

  guardarImagenVino(vinoId: number, imagen: File) {
    const formData = new FormData();
    formData.append('imagen', imagen);
    return this.http.post(`${API_BASE_URL}/vinos/${vinoId}/imagen`, formData);
  }

  // ---------------------------------------------------------
  // ---------------------------------------------------------

  getListaMaridajes() {
    return this.http.get(`${API_BASE_URL}/maridajes`);
  }

  getAdditionalDataMaridaje(maridajeId: number) {
    const url = `${API_BASE_URL}/maridajes/${maridajeId}`;
    return this.http.get(url);
  }
  // ---------------------------------------------------------
  // ---------------------------------------------------------

  
}
