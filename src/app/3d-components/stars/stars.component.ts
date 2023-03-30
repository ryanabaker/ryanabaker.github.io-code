import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';


import * as THREE from "three";
import { Group } from 'three';
import { Base3DRendererComponent } from '../base-3d-renderer.component';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html'
})
export class StarsComponent extends Base3DRendererComponent {

  private stars!: THREE.Points;

  protected override createScene() {

    this.scene = new THREE.Scene();

    const vertices = [];
    for ( let i = 0; i < 100000; i ++ ) {
      const x = THREE.MathUtils.randFloatSpread(100);
      const y = THREE.MathUtils.randFloatSpread(100);
      const z = THREE.MathUtils.randFloatSpread(500);

      vertices.push( x, y, z );
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

    const material = new THREE.PointsMaterial( { color: 0xffffff } );
    this.stars = new THREE.Points( geometry, material );
    this.stars.frustumCulled = true;
    this.scene.add( this.stars );
  }

  private animateStars() {
    this.stars.rotateY(0.0001);
    this.stars.rotateX(0.00005);
  }

  protected override startRenderingLoop() {
    this.renderer = new THREE.WebGLRenderer(Base3DRendererComponent.constructDefaultWebGlRendererParams(this.canvas));
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: StarsComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateStars();
      component.renderer.render(component.scene, component.camera);
    }());
  }
}