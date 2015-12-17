/*global PIXI, requestAnimationFrame*/
var renderer,
    stage,
    aviones,
    framesAvion,
    currentLoop,
    fps;

function agregarAvion() {
    "use strict";
    var i,
        nuevoAvion;

    for (i = 0; i < 10; i += 1) {
        nuevoAvion = new PIXI.extras.MovieClip(framesAvion);
        nuevoAvion.position.set(Math.random() * renderer.width, Math.random() * renderer.height);
        nuevoAvion.anchor.set(0.5);
        nuevoAvion.animationSpeed = 0.5;
        nuevoAvion.play();
        stage.addChild(nuevoAvion);
        aviones.push(nuevoAvion);
    }
}

function animate() {
    "use strict";

    var i,
        thisLoop;

    for (i = 0; i < aviones.length; i += 1) {
        aviones[i].rotation += 0.01;
    }

    renderer.render(stage);

    thisLoop = new Date().getSeconds();

    if (currentLoop === thisLoop) {
        fps += 1;
    } else {
        document.getElementById("textoRendimiento").innerHTML = aviones.length + " aviones (" + fps + "FPS)";

        if (fps > 30) {
            agregarAvion();
        }

        fps = 0;
        currentLoop = thisLoop;
    }

    requestAnimationFrame(animate);
}

function inicioAplicacion() {
    "use strict";

    aviones = [];
    renderer = PIXI.autoDetectRenderer(window.screen.width - 15, window.screen.height - 210);
    document.body.appendChild(renderer.view);
    stage = new PIXI.Container();
    PIXI.loader
        .add("img/fighter.json")
        .load(function () {
            var i;

            framesAvion = [];

            for (i = 0; i < 30; i += 1) {
                framesAvion.push(PIXI.Texture.fromFrame("rollSequence00" + (i < 10 ? "0" + i : i) + ".png"));
            }

            agregarAvion();
            animate();
        });
}