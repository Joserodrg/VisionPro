// ===============================================
// FICHAS TÉCNICAS
// ===============================================
const fichasTecnicas = {
  "la-teva-llibreria": {
    empresa: "La Teva Llibreria",
    audiencia: "Lectors",
    missatge: "Trànsit web i compra setmanal",
    plataformes: "TikTok, Instagram, YouTube",
    durada: "5s",
    disseny: "Verd, textura cuir",
    ias: "Google Labs",
    promptIA: "Crea un vídeo curt i elegant d'un llibre obrint-se sobre fons verd amb textura de cuir, estil publicitari, il·luminació suau, enfoc emocional i crida subtil a la compra."
  },
  "pablo-plato": {
    empresa: "Pablo Plato",
    audiencia: "Amants de la cuina",
    missatge: "Ganes de cuinar i buscar receptes",
    plataformes: "TikTok, Instagram, YouTube",
    durada: "Variable",
    disseny: "Cuina neta i minimal",
    ias: "Gemini",
    promptIA: "Vídeo dinàmic d'una recepta fàcil, mans cuinant en una cuina neta, estil YouTube food, plans curts, ritme àgil i resultat final apetible."
  },
  "centre-reparacio": {
    empresa: "Centre de reparació electrònica",
    audiencia: "Joves i adults amb urgències",
    missatge: "Solució ràpida i professional",
    plataformes: "TikTok, Instagram Reels",
    durada: "20s",
    disseny: "",
    ias: "Sora, 123apps, ElevenLabs",
    promptIA: "Vídeo urbà i directe mostrant la reparació ràpida d'un mòbil trencat, abans/després clar, estil professional i missatge de confiança."
  },
  "centre-veterinari": {
    empresa: "Centre Veterinari",
    audiencia: "Persones amb mascotes malaltes",
    missatge: "Confiança i seguretat",
    plataformes: "TikTok, Instagram Reels",
    durada: "16s",
    disseny: "",
    ias: "PixVerse, 123apps, ElevenLabs",
    promptIA: "Escenes emotives d'un veterinari cuidant mascotes, llum càlida, to tranquil, estil clínic però proper, transmetent seguretat."
  },
  "turisme-galicia-rural": {
    empresa: "Turisme Galícia Rural",
    audiencia: "Adults 25-40, parelles, natura",
    missatge: "Desconnexió i aventura",
    plataformes: "YouTube Ads, Facebook Watch",
    durada: "7s",
    disseny: "Hiperrealista, colors saturats",
    ias: "Gemini PRO VEO",
    promptIA: "Paisatges rurals de Galícia hiperrealistes, natura salvatge, boira matinal, colors vius, estil cinematic travel."
  },
  "moda-sostenible": {
    empresa: "Moda sostenible local",
    audiencia: "Joves, famílies eco",
    missatge: "Moda ètica i planeta",
    plataformes: "Reels, TikTok, Shorts",
    durada: "7s",
    disseny: "Garden core, lluminós",
    ias: "Sora, Gemini PRO VEO3",
    promptIA: "Models amb roba sostenible en entorn natural, estil garden core, colors suaus, llum natural i to optimista."
  },
  "botiga-jocs-taula": {
    empresa: "Botiga de jocs de taula",
    audiencia: "16-45, jugadors",
    missatge: "Diversió i proximitat",
    plataformes: "Reels, Shorts",
    durada: "15-20s",
    disseny: "",
    ias: "VEO 3, PixVerse, CapCut",
    promptIA: "Grup d'amics jugant a jocs de taula en una botiga acollidora, rialles, plans dinàmics, ambient divertit."
  },
  "agencia-viatges": {
    empresa: "Agència de viatges local",
    audiencia: "Joves, parelles, famílies",
    missatge: "Viatges personalitzats",
    plataformes: "Reels, TikTok",
    durada: "10-20s",
    disseny: "",
    ias: "Sora ChatGPT, CapCut",
    promptIA: "Escenes ràpides de diferents destinacions, maletes, somriures, estil inspiracional, viatge a mida."
  }
};

function initFichasTecnicas() {
  const fichaButtons = document.querySelectorAll(".ficha-btn");
  const fichaModal = document.getElementById("fichaModal");
  const fichaModalClose = document.querySelector(".ficha-modal-close");
  const fichaTitle = document.getElementById("fichaTitle");
  const fichaGrid = document.getElementById("fichaGrid");

  // Open modal on button click
  fichaButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = btn.closest(".video-card");
      const fichaId = card.dataset.fichaId;
      
      if (fichaId && fichasTecnicas[fichaId]) {
        openFichaModal(fichaId);
      }
    });
  });

  // Close modal
  if (fichaModalClose) {
    fichaModalClose.addEventListener("click", closeFichaModal);
  }

  if (fichaModal) {
    fichaModal.addEventListener("click", (e) => {
      if (e.target === fichaModal) {
        closeFichaModal();
      }
    });
  }

  // ESC key to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && fichaModal?.classList.contains("active")) {
      closeFichaModal();
    }
  });

  function openFichaModal(fichaId) {
    const ficha = fichasTecnicas[fichaId];
    
    // Set title
    fichaTitle.textContent = ficha.empresa;
    
    // Build table content
    let tableHTML = '<table class="ficha-table">';
    
    tableHTML += `
      <tr>
        <td class="ficha-label">Empresa</td>
        <td class="ficha-value">${ficha.empresa}</td>
      </tr>
      <tr>
        <td class="ficha-label">Audiència</td>
        <td class="ficha-value">${ficha.audiencia}</td>
      </tr>
      <tr>
        <td class="ficha-label">Missatge</td>
        <td class="ficha-value">${ficha.missatge}</td>
      </tr>
      <tr>
        <td class="ficha-label">Plataformes</td>
        <td class="ficha-value">${ficha.plataformes}</td>
      </tr>
      <tr>
        <td class="ficha-label">Durada</td>
        <td class="ficha-value">${ficha.durada}</td>
      </tr>
    `;
    
    if (ficha.disseny) {
      tableHTML += `
        <tr>
          <td class="ficha-label">Disseny</td>
          <td class="ficha-value">${ficha.disseny}</td>
        </tr>
      `;
    }
    
    tableHTML += `
      <tr>
        <td class="ficha-label">IAs</td>
        <td class="ficha-value">${ficha.ias}</td>
      </tr>
      <tr>
        <td class="ficha-label">Prompt IA</td>
        <td class="ficha-value prompt">${ficha.promptIA}</td>
      </tr>
    `;
    
    tableHTML += '</table>';
    fichaGrid.innerHTML = tableHTML;
    
    // Show modal
    fichaModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeFichaModal() {
    if (fichaModal) {
      fichaModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }
}
