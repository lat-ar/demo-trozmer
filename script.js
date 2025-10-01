
// Esconde el logotipo de carga al inicio
document.addEventListener("DOMContentLoaded", function () {
  $(window).on("load", function () {
    $(".logoload").delay(500).fadeOut("slow");
  });

  // Redirección al hacer clic en el botón
  const webButton = document.getElementById("web-button");
  if (webButton) {
    webButton.addEventListener("click", function () {
      window.open("https://lat-ar.com", "_blank");
    });
  }

  // Maneja el enfoque y desenfoque con MindAR
 function funciona() {
  const foveation = MindAR.device.getFoveation();
  const overlay = document.getElementById("example-scanning-overlay");
  const texto = document.getElementById("texto-a-ocultar");
  const logo = document.getElementById("logo"); // Obtener el elemento del logo

  if (overlay) {
    if (foveation.isOutOfFocus) {
      overlay.classList.add("visible");
      texto.classList.remove("oculto");
      logo.style.display = "block"; // Mostrar el logo
    } else {
      overlay.classList.remove("visible");
      texto.classList.add("oculto");
      logo.style.display = "none";   // Ocultar el logo
    }
  }
}

  const webButton2 = document.getElementById("web-button");
  if (webButton2) {
    webButton2.addEventListener("click", funciona);
  }

  // Deshabilitar clic derecho
  function disableIE() {
    return false;
  }

  function disableNS(e) {
    if (e.which === 2 || e.which === 3) {
      return false;
    }
  }

  if (document.layers) {
    document.captureEvents(Event.MOUSEDOWN);
    document.onmousedown = disableNS;
  } else {
    document.onmouseup = disableNS;
    document.oncontextmenu = disableIE;
  }

  document.oncontextmenu = () => false;

  // Referencias y acciones de botones
  const googleButton = document.getElementById("google-button");
  const openAIButton = document.getElementById("openai-button");
  const buttonContainer = document.getElementById("button-container");

  if (googleButton) {
    googleButton.addEventListener("click", function () {
      window.open("https://www.google.com", "_blank");
    });
  }

  if (openAIButton) {
    openAIButton.addEventListener("click", function () {
      window.open("https://www.openai.com", "_blank");
    });
  }

  const myTarget = document.getElementById("mytarget");
  if (myTarget) {
    // Fade-in del modelo 3D al detectar la imagen
    const gltfEl = document.querySelector('#mytarget a-gltf-model');
    let fadeMeshes = [];
    let hasInitializedOpacity = false;

    function collectMeshesAndSetTransparent(object3D) {
      const meshes = [];
      object3D.traverse((node) => {
        if (node.isMesh && node.material) {
          const materialArray = Array.isArray(node.material) ? node.material : [node.material];
          materialArray.forEach((mat) => {
            mat.transparent = true;
            mat.opacity = 0.0;
          });
          meshes.push(node);
        }
      });
      return meshes;
    }

    function setOpacityForMeshes(meshes, value) {
      meshes.forEach((mesh) => {
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((mat) => { mat.opacity = value; });
      });
    }

    function fadeTo(targetOpacity, durationMs = 1000) {
      if (!fadeMeshes.length) return;
      const startOpacity = (fadeMeshes[0] && (Array.isArray(fadeMeshes[0].material) ? fadeMeshes[0].material[0].opacity : fadeMeshes[0].material.opacity)) ?? 0;
      const startTime = performance.now();
      function step(now) {
        const t = Math.min(1, (now - startTime) / durationMs);
        const eased = t; // linear; swap for easing if desired
        const current = startOpacity + (targetOpacity - startOpacity) * eased;
        setOpacityForMeshes(fadeMeshes, current);
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    if (gltfEl) {
      gltfEl.addEventListener('model-loaded', () => {
        if (!hasInitializedOpacity) {
          fadeMeshes = collectMeshesAndSetTransparent(gltfEl.getObject3D('mesh'));
          hasInitializedOpacity = true;
        }
      });
    }

    myTarget.addEventListener("targetFound", function () {
      if (buttonContainer) {
        buttonContainer.style.display = "flex";
      }
      // Dispara el fade-in cuando se detecta el target
      if (hasInitializedOpacity && fadeMeshes.length) {
        fadeTo(1.0, 1000);
      }
    });

    myTarget.addEventListener("targetLost", function () {
      if (buttonContainer) {
        buttonContainer.style.display = "none";
      }
      // Opcional: ocultar nuevamente el modelo (para permitir re-revelar)
      if (hasInitializedOpacity && fadeMeshes.length) {
        setOpacityForMeshes(fadeMeshes, 0.0);
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const bottomButtons = document.getElementById("bottom-button-container");
  const googleLink = document.getElementById("google-link");
  const facebookLink = document.getElementById("facebook-link");
  const myTarget = document.getElementById("mytarget");

  // Redirección de botones
  googleLink.addEventListener("click", () => window.open("https://www.instagram.com/trozmercentrouniversitario/", "_blank"));
  facebookLink.addEventListener("click", () => window.open("https://trozmer.edu.mx/contacto/", "_blank"));

  // Mostrar/Ocultar botones al detectar imagen
  if (myTarget) {
    myTarget.addEventListener("targetFound", function () {
      bottomButtons.style.display = "flex";  // Mostrar los botones
    });

    myTarget.addEventListener("targetLost", function () {
      bottomButtons.style.display = "none";  // Ocultar los botones
    });
  }
});


