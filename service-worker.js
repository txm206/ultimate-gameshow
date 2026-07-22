self.addEventListener("install", () => {
    console.log("Service Worker installiert");
  });
  
  self.addEventListener("fetch", () => {
    // Netzwerk normal weiter nutzen
  });
  