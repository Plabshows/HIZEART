export type Locale = "en" | "es";

type PageOverrides = Record<string, Record<string, unknown>>;

export const locales: Locale[] = ["en", "es"];

const localeLabels: Record<Locale, string> = {
  en: "EN",
  es: "ES"
};

const uiText = {
  en: {
    nav: {
      works: "Works",
      availableWorks: "Available Works",
      murals: "Murals",
      projects: "Projects",
      vrArt: "VR Art",
      exhibitions: "Exhibitions",
      about: "About",
      contact: "Contact",
      privacy: "Privacy",
      enquire: "Enquire"
    },
    footer: {
      description:
        "Spanish contemporary urban artist transforming graffiti into abstract paintings, murals and immersive visual experiences.",
      instagram: "Instagram",
      email: "Email",
      whatsapp: "WhatsApp",
      terms: "Terms"
    },
    language: {
      switchLabel: "Language switcher"
    },
    common: {
      workFilters: "Work filters",
      enquiries: "Enquiries",
      viewWork: "View Work",
      viewWorks: "View Works",
      viewProject: "View Project",
      viewDetails: "View Details",
      enquire: "Enquire",
      enquireWork: "Enquire about this work",
      backToWorks: "Back to Works",
      backToProjects: "Back to Projects",
      backToMurals: "Back to Murals",
      requestCatalogue: "Request Catalogue",
      contactArtist: "Contact the Artist",
      contactStudio: "Contact Studio",
      commissionMural: "Commission a Mural",
      startProject: "Start a Project",
      startConversation: "Start a Conversation",
      contactVrArt: "Contact for VR Art Projects",
      requestPerformanceDetails: "Request Performance Details",
      projectFilm: "Project Film",
      watchOnYouTube: "Watch on YouTube",
      projectVisuals: "Project Visuals",
      muralVisuals: "Mural Visuals",
      gallery: "Gallery",
      additionalViews: "Additional views",
      close: "Close",
      expandedGalleryImage: "Expanded gallery image",
      openFullSizeImage: "Open full-size image",
      year: "Year",
      technique: "Technique",
      size: "Size",
      status: "Status",
      price: "Price",
      location: "Location",
      type: "Type",
      client: "Client",
      sold: "Sold",
      available: "Available",
      archive: "Archive",
      commissionArchive: "Commission archive",
      priceOnRequest: "Price on request",
      commissionOnRequest: "Commission on request",
      siteSpecific: "Site-specific",
      selectedProjects: "Selected Projects",
      projectsHeading: "Exhibitions, interiors, brand collaborations and immersive projects.",
      projectsEyebrow: "Projects",
      projectFilmFallback:
        "A moving portrait of the project, showing the atmosphere and visual rhythm in context.",
      muralLabel: "Mural",
      projectLabel: "Project"
    },
    contactForm: {
      name: "Name",
      email: "Email",
      enquiryType: "Type of enquiry",
      message: "Message",
      send: "Send Enquiry",
      selectOption: "Select an option",
      fallback: "Secure form powered by Formspree. Direct email fallback:"
    },
    enquiryTypes: [
      "Available artwork",
      "Mural commission",
      "Brand collaboration",
      "Exhibition",
      "VR Art project",
      "Press / Gallery",
      "General enquiry"
    ],
    page404: {
      eyebrow: "404",
      title: "This page has moved or no longer exists.",
      backHome: "Back to Home",
      viewWorks: "View Works",
      contact: "Contact"
    },
    privacy: {
      eyebrow: "Privacy Policy",
      title: "Privacy Policy",
      seoTitle: "Privacy Policy | HIZE ART",
      seoDescription: "Privacy information for enquiries sent through HIZE ART.",
      paragraphs: [
        "This website collects the information you voluntarily submit through the contact form, including name, email, enquiry type and message. This information is used only to respond to artwork, mural, collaboration, exhibition, VR Art, press or general enquiries.",
        "The form is processed securely through Formspree and includes a direct email fallback to info@hizeart.com. No payment or store checkout is active in this implementation.",
        "To request access, correction or deletion of your enquiry data, contact info@hizeart.com."
      ]
    }
  },
  es: {
    nav: {
      works: "Obras",
      availableWorks: "Obras disponibles",
      murals: "Murales",
      projects: "Proyectos",
      vrArt: "VR Art",
      exhibitions: "Exposiciones",
      about: "Sobre Hize",
      contact: "Contacto",
      privacy: "Privacidad",
      enquire: "Contactar"
    },
    footer: {
      description:
        "Artista urbano contemporáneo español que transforma el graffiti en pintura abstracta, murales y experiencias visuales inmersivas.",
      instagram: "Instagram",
      email: "Email",
      whatsapp: "WhatsApp",
      terms: "Privacidad"
    },
    language: {
      switchLabel: "Selector de idioma"
    },
    common: {
      workFilters: "Filtros de obras",
      enquiries: "Consultas",
      viewWork: "Ver obra",
      viewWorks: "Ver obras",
      viewProject: "Ver proyecto",
      viewDetails: "Ver detalles",
      enquire: "Solicitar info",
      enquireWork: "Consultar esta obra",
      backToWorks: "Volver a obras",
      backToProjects: "Volver a proyectos",
      backToMurals: "Volver a murales",
      requestCatalogue: "Solicitar catálogo",
      contactArtist: "Contactar con el artista",
      contactStudio: "Contactar con el estudio",
      commissionMural: "Encargar mural",
      startProject: "Iniciar proyecto",
      startConversation: "Iniciar conversación",
      contactVrArt: "Contactar para VR Art",
      requestPerformanceDetails: "Solicitar detalles de la performance",
      projectFilm: "Vídeo del proyecto",
      watchOnYouTube: "Ver en YouTube",
      projectVisuals: "Imágenes del proyecto",
      muralVisuals: "Imágenes del mural",
      gallery: "Galería",
      additionalViews: "Vistas adicionales",
      close: "Cerrar",
      expandedGalleryImage: "Imagen ampliada de galería",
      openFullSizeImage: "Abrir imagen ampliada",
      year: "Año",
      technique: "Técnica",
      size: "Medidas",
      status: "Estado",
      price: "Precio",
      location: "Ubicación",
      type: "Tipo",
      client: "Cliente",
      sold: "Vendido",
      available: "Disponible",
      archive: "Archivo",
      commissionArchive: "Archivo de encargos",
      priceOnRequest: "Precio a consultar",
      commissionOnRequest: "Encargo a consultar",
      siteSpecific: "Intervención específica para el espacio",
      selectedProjects: "Proyectos seleccionados",
      projectsHeading: "Exposiciones, interiores, colaboraciones de marca y proyectos inmersivos.",
      projectsEyebrow: "Proyectos",
      projectFilmFallback:
        "Un retrato en movimiento del proyecto, mostrando la atmósfera y el ritmo visual en contexto.",
      muralLabel: "Mural",
      projectLabel: "Proyecto"
    },
    contactForm: {
      name: "Nombre",
      email: "Email",
      enquiryType: "Tipo de consulta",
      message: "Mensaje",
      send: "Enviar consulta",
      selectOption: "Selecciona una opción",
      fallback: "Formulario seguro gestionado por Formspree. Email directo alternativo:"
    },
    enquiryTypes: [
      "Obra disponible",
      "Encargo de mural",
      "Colaboración de marca",
      "Exposición",
      "Proyecto de VR Art",
      "Prensa / Galería",
      "Consulta general"
    ],
    page404: {
      eyebrow: "404",
      title: "Esta página se ha movido o ya no existe.",
      backHome: "Volver al inicio",
      viewWorks: "Ver obras",
      contact: "Contacto"
    },
    privacy: {
      eyebrow: "Política de privacidad",
      title: "Política de privacidad",
      seoTitle: "Política de Privacidad | HIZE ART",
      seoDescription: "Información de privacidad para las consultas enviadas a través de HIZE ART.",
      paragraphs: [
        "Esta web recopila la información que envías voluntariamente a través del formulario de contacto, incluyendo nombre, email, tipo de consulta y mensaje. Esta información se utiliza únicamente para responder a consultas sobre obra, murales, colaboraciones, exposiciones, VR Art, prensa o solicitudes generales.",
        "El formulario se procesa de forma segura a través de Formspree e incluye un email directo alternativo a info@hizeart.com. No hay pagos ni tienda activa en esta implementación.",
        "Para solicitar acceso, corrección o eliminación de tus datos de consulta, escribe a info@hizeart.com."
      ]
    }
  }
} as const;

const pageOverrides: Record<Locale, PageOverrides> = {
  en: {},
  es: {
    home: {
      cta: {
        text: "Solicita obras disponibles, plantea un mural o inicia un proyecto de marca, hospitality o cultural con Hize.",
        title: "Para obras, murales, encargos y colaboraciones.",
        primaryButtonLabel: "Solicitar obras disponibles",
        secondaryButtonLabel: "Contactar con el artista"
      },
      hero: {
        subtitle: "Graffiti abstracto nacido del movimiento, el ritmo y la memoria urbana.",
        primaryButtonLabel: "Ver obras",
        secondaryButtonLabel: "Encargar un proyecto"
      },
      vrArt: {
        lead: "Una extensión digital del graffiti, donde movimiento, gesto y tecnología se convierten en expresión visual en vivo.",
        title: "Una extensión digital del graffiti.",
        eyebrow: "VR Art & Graffiti digital",
        linkLabel: "Explorar VR Art"
      },
      seoTitle: "Hize Art | Artista Español de Graffiti Abstracto",
      commissions: {
        lead: "Obras personalizadas e intervenciones visuales a gran escala para colecciones privadas, espacios hospitality, marcas y proyectos culturales.",
        items: [
          {
            text: "Pinturas originales y obras por encargo para colecciones privadas e interiores.",
            title: "Coleccionistas privados"
          },
          {
            text: "Proyectos visuales para marcas, eventos y activaciones culturales con lenguaje de arte contemporáneo.",
            title: "Marcas y colaboraciones"
          },
          {
            text: "Murales e intervenciones visuales para hoteles, restaurantes y espacios arquitectónicos.",
            title: "Hospitality y espacios públicos"
          }
        ],
        title: "Obras personalizadas e intervenciones visuales a gran escala.",
        eyebrow: "Murales y encargos",
        linkLabel: "Ver murales",
        buttonLabel: "Encargar un proyecto"
      },
      selectedWorks: {
        title: "Graffiti abstracto transformado en lenguaje visual contemporáneo.",
        eyebrow: "Obras seleccionadas",
        linkLabel: "Ver todas las obras"
      },
      collaborations: {
        title: "Contextos internacionales, proyectos culturales y colaboraciones premium.",
        eyebrow: "Exposiciones y colaboraciones",
        linkLabel: "Ver cronología"
      },
      latestProjects: {
        title: "Proyectos, murales y colaboraciones seleccionadas.",
        eyebrow: "Últimos proyectos",
        linkLabel: "Ver todos los proyectos"
      },
      seoDescription:
        "Descubre a Hize, un artista visual español que transforma el graffiti tradicional en pintura abstracta, murales y experiencias inmersivas de VR art.",
      artistStatement: {
        lead: "Tras más de 25 años pintando graffiti, Hize traslada la estructura de las letras, el movimiento y la energía urbana a composiciones abstractas contemporáneas.",
        text: "Manuel Forner \"Hize\" es un artista visual español que transforma el lenguaje del graffiti en pintura abstracta, murales y experiencias visuales inmersivas.",
        title: "De la calle al estudio",
        eyebrow: "Declaración del artista",
        linkLabel: "Leer perfil del artista"
      }
    },
    about: {
      cta: {
        text: "Para galerías, prensa, marcas, coleccionistas y proyectos culturales.",
        title: "Solicita portfolio, press kit o información de colaboración.",
        primaryButtonLabel: "Contactar con el artista"
      },
      quote:
        "De la calle al estudio, Hize reinterpreta los fundamentos del graffiti más allá del muro, eliminando ruido para revelar movimiento, ritmo y memoria urbana.",
      title: "Traduciendo la energía cinética de la calle en contemplación disciplinada.",
      eyebrow: "Sobre Hize",
      metaTwo: "España / Internacional",
      seoTitle: "Sobre Hize | Manuel Forner, Artista Urbano Español",
      paragraphs: [
        "Manuel Forner \"Hize\" es un artista visual español cuya obra transforma el lenguaje del graffiti tradicional en composiciones abstractas contemporáneas. Con una trayectoria de más de 25 años, su evolución refleja un refinamiento continuo de la energía urbana cruda hacia formas sofisticadas y preparadas para galería.",
        "Nacida de más de 30 años pintando en la calle, su práctica explora las estructuras ocultas entre las letras, el ritmo del movimiento y la energía visual de la cultura urbana.",
        "Antes de desarrollar plenamente su práctica de estudio, Hize construyó una carrera paralela en danza y entretenimiento, trabajando internacionalmente como breakdancer, performer y director creativo. Esta conexión entre cuerpo, ritmo y gesto se convirtió en parte central de su lenguaje artístico."
      ],
      portfolioText:
        "Para currículum completo, materiales de prensa, adquisiciones privadas o representación en galería.",
      seoDescription:
        "Manuel Forner Hize es un artista español con más de 25 años en el graffiti, creando obra abstracta, murales y proyectos visuales en distintos contextos internacionales.",
      exhibitionsTitle: "Exposiciones, colaboraciones y proyectos internacionales.",
      contactButtonLabel: "Contactar con el estudio",
      exhibitionsEyebrow: "Exposiciones seleccionadas",
      portfolioButtonLabel: "Descargar portfolio",
      exhibitionsLinkLabel: "Cronología completa",
      collaborationsEyebrow: "Colaboraciones seleccionadas"
    },
    vrArt: {
      cta: {
        text: "Contacto para proyectos de VR Art, performances inmersivas y experiencias de marca.",
        title: "Encargar lo infinito",
        primaryButtonLabel: "Contactar para VR Art",
        secondaryButtonLabel: "Solicitar detalles de la performance"
      },
      seoTitle: "VR Art by Hize | Experiencias de Graffiti Digital",
      heroTitle:
        "VR Art es la extensión digital del lenguaje de graffiti de Hize, transformando gesto, movimiento y ritmo en experiencias visuales inmersivas.",
      introLead:
        "No es solo una traducción de la pintura física a un lienzo digital. Es la liberación del trazo del peso y la superficie, utilizando movimiento, gesto y dibujo espacial como expresión visual en vivo.",
      introText:
        "Esta práctica une la energía visceral y cinética del street art con herramientas digitales inmersivas, dando lugar a entornos que son al mismo tiempo crudos y meticulosamente construidos.",
      disciplines: [
        {
          text: "El público presencia el nacimiento de la forma y el color en movimiento, proyectados o vividos a través de formatos inmersivos.",
          title: "Arte espacial en tiempo real.",
          eyebrow: "Graffiti digital en vivo"
        },
        {
          text: "Performances comisariadas para galerías, festivales, instituciones culturales y eventos privados.",
          title: "Zonas temporales entre lo físico y lo digital.",
          eyebrow: "Eventos y performances"
        },
        {
          text: "La identidad de marca traducida a un lenguaje vanguardista de diseño espacial digital.",
          title: "Entornos virtuales a medida.",
          eyebrow: "Experiencias de marca"
        }
      ],
      introEyebrow: "Qué es VR Art",
      visualsTitle: "Visuales seleccionados",
      seoDescription:
        "VR art inmersivo y performances de graffiti digital de Hize, mezclando cultura urbana, movimiento y tecnología visual contemporánea.",
      disciplinesTitle: "Disciplinas principales"
    },
    works: {
      intro:
        "Explora obras originales de Hize, donde las estructuras del graffiti, el movimiento y el ritmo urbano se transforman en composiciones abstractas contemporáneas.",
      title: "Obras seleccionadas",
      eyebrow: "Obras",
      seoTitle: "Pinturas de Graffiti Abstracto de Hize",
      seoDescription:
        "Explora obra original de Hize, combinando estructura del graffiti, movimiento, color y composición abstracta contemporánea."
    },
    murals: {
      cta: {
        text: "Hoteles, restaurantes, villas privadas, marcas y espacios culturales.",
        title: "Encargar un mural",
        primaryButtonLabel: "Iniciar conversación"
      },
      process: {
        lead:
          "Cada mural se desarrolla a partir de la identidad del espacio, combinando las raíces de graffiti de Hize con composición abstracta, color y movimiento. La ejecución equilibra la energía cinética de la calle con la contención disciplinada de una instalación de galería.",
        steps: [
          "01. Análisis del espacio",
          "02. Desarrollo conceptual",
          "03. Ejecución e integración"
        ],
        title: "La autoridad de la vanguardia aplicada al espacio estructural.",
        eyebrow: "Proceso y ejecución"
      },
      seoTitle: "Murales de Hize | Graffiti Abstracto y Arte Urbano",
      heroTitle:
        "Murales abstractos de gran formato para marcas, interiores, espacios hospitality y proyectos culturales.",
      seoDescription:
        "Murales a gran escala y obras murales personalizadas de Hize para marcas, espacios hospitality, clientes privados y proyectos culturales.",
      selectedEyebrow: "Murales seleccionados"
    },
    contact: {
      intro:
        "Envía tu consulta a través del formulario o contacta directamente con el estudio. El plazo habitual de respuesta es de 48 horas.",
      paths: [
        {
          text: "Solicita las obras disponibles actuales, medidas, precios a consultar y detalles de envío.",
          title: "Solicitar catálogo de obras disponibles.",
          eyebrow: "Coleccionistas"
        },
        {
          text: "Comparte la ubicación, la escala, el calendario y el contexto del proyecto.",
          title: "Encargar una pintura, mural o proyecto visual a medida.",
          eyebrow: "Encargos"
        },
        {
          text: "Para exposiciones, editoriales, proyectos culturales, activaciones de marca y VR Art.",
          title: "Solicitar portfolio, press kit o detalles de colaboración.",
          eyebrow: "Galerías / Prensa / Marcas"
        },
        {
          text: "España / Internacional",
          title: "info@hizeart.com",
          eyebrow: "Email"
        }
      ],
      title: "Obras, murales, encargos y colaboraciones.",
      eyebrow: "Contacto y encargos",
      seoTitle: "Contactar con Hize | Obras, Murales y Encargos",
      seoDescription:
        "Contacta con Hize para obras originales, encargos de mural, colaboraciones de marca, exposiciones y proyectos inmersivos."
    },
    projects: {
      heroAlt: "Proyecto seleccionado de Hize con intervención contemporánea de graffiti abstracto",
      ctaTitle: "Encarga un proyecto visual con Hize.",
      seoTitle: "Proyectos de Hize | Exposiciones, Murales y Colaboraciones",
      heroTitle: "Proyectos y colaboraciones seleccionadas",
      ctaButtonLabel: "Iniciar proyecto",
      seoDescription:
        "Explora proyectos seleccionados, encargos hospitality, murales, colaboraciones de marca y experiencias visuales inmersivas del artista urbano español Hize.",
      intro:
        "Un archivo curado de proyectos internacionales, encargos hospitality, murales, colaboraciones de marca y experiencias visuales inmersivas de Hize."
    },
    exhibitions: {
      intro:
        "Una cronología de contextos culturales seleccionados, colaboraciones de marca, proyectos murales y performances de VR Art.",
      title: "Proyectos internacionales, exposiciones y colaboraciones.",
      eyebrow: "Exposiciones y colaboraciones",
      seoTitle: "Exposiciones de Hize | Proyectos Internacionales y Colaboraciones",
      seoDescription:
        "Explora exposiciones seleccionadas, proyectos internacionales, murales y colaboraciones del artista urbano contemporáneo español Hize."
    },
    availableWorks: {
      cta: {
        text: "Recibe las obras disponibles, precios a consultar y detalles para coleccionistas directamente desde el estudio.",
        title: "Solicitar catálogo completo",
        primaryButtonLabel: "Solicitar catálogo",
        secondaryButtonLabel: "Ver obras"
      },
      intro:
        "Explora las obras originales disponibles de Hize. Cada pieza nace de la estructura, el ritmo y la energía del graffiti, transformados en composiciones abstractas contemporáneas.",
      title: "Obras originales disponibles",
      eyebrow: "Obras disponibles",
      noteOne: "Certificado de autenticidad incluido",
      noteTwo: "Envío internacional disponible bajo consulta",
      seoTitle: "Obras Disponibles de Hize",
      infoCards: [
        {
          text: "Certificado de autenticidad incluido con las obras originales disponibles.",
          title: "Certificado incluido"
        },
        {
          text: "Envío internacional disponible bajo consulta.",
          title: "Consultas internacionales"
        },
        {
          text: "Solicita el catálogo actual para detalles, precios y confirmación de disponibilidad.",
          title: "Solicitud de catálogo"
        }
      ],
      seoDescription:
        "Consulta las obras originales disponibles de Hize y solicita detalles sobre pinturas, encargos y consultas para coleccionistas."
    }
  }
};

const categoryLabels: Record<Locale, Record<string, string>> = {
  en: {
    canvas: "Canvas",
    murals: "Murals",
    graffiti: "Graffiti",
    "vr-art": "VR Art"
  },
  es: {
    canvas: "Canvas",
    murals: "Murales",
    graffiti: "Graffiti",
    "vr-art": "VR Art"
  }
};

const availabilityLabels: Record<Locale, Record<string, string>> = {
  en: {
    available: "Available",
    sold: "Sold",
    archive: "Archive",
    "commission-archive": "Commission archive",
    "price-on-request": "Price on request",
    "commission-on-request": "Commission on request"
  },
  es: {
    available: "Disponible",
    sold: "Vendido",
    archive: "Archivo",
    "commission-archive": "Archivo de encargos",
    "price-on-request": "Precio a consultar",
    "commission-on-request": "Encargo a consultar"
  }
};

const projectTypeLabels: Record<Locale, Record<string, string>> = {
  en: {},
  es: {
    exhibition: "Exposición",
    murals: "Murales",
    collaboration: "Colaboración",
    "brand-collaboration": "Colaboración de marca",
    "international-project": "Proyecto internacional",
    "hospitality-project": "Proyecto hospitality",
    "digital-performance": "Performance digital",
    "international-collaboration": "Colaboración internacional"
  }
};

type LocalizedEntityMap = Record<Locale, Record<string, Record<string, Record<string, unknown>>>>;

const exactValueLabels: Record<Locale, Record<string, string>> = {
  en: {},
  es: {
    "size-on-request": "Medidas a consultar",
    "site-specific": "Específica para el espacio",
    "live-experience": "Experiencia en vivo",
    "project-on-request": "Proyecto a consultar",
    "price-on-request": "Precio a consultar",
    "not-for-sale": "No disponible para la venta",
    "private-commission": "Encargo privado",
    "private-and-public-commissions": "Encargos privados y públicos",
    "project-on-request-client": "Proyecto a consultar",
    "client-tbc": "Cliente por confirmar",
    "selected-archive": "Archivo seleccionado",
    ongoing: "En curso",
    archive: "Archivo",
    spain: "España",
    international: "Internacional",
    "spain-international": "España / Internacional",
    "spain-and-international": "España e internacional",
    "torreblanca-spain": "Torreblanca, España",
    "osaka-japan": "Osaka, Japón",
    "dubai-uae": "Dubái, EAU",
    "spray-paint-and-acrylic-on-wall": "Spray paint y acrílico sobre muro",
    "spray-paint-and-acrylic-on-a-van": "Spray paint y acrílico sobre furgoneta",
    "acrylic-and-spray-paint-on-wall": "Acrílico y spray sobre muro",
    "mixed-media-on-canvas": "Técnica mixta sobre lienzo",
    "immersive-vr-performance": "Performance inmersiva en VR",
    "live-digital-graffiti-performance": "Performance de graffiti digital en vivo",
    "copy-of-sharjah-uae": "Sharjah UAE",
    "hize-abstract-graffiti-artwork-on-canvas": "Obra abstracta de graffiti de Hize sobre lienzo",
    "hize-colorful-abstract-graffiti-artwork-on-canvas": "Obra abstracta de graffiti colorista de Hize sobre lienzo",
    "hize-abstract-painting-inspired-by-graffiti-letter-structures": "Pintura abstracta de Hize inspirada en estructuras de letras de graffiti",
    "hize-abstract-graffiti-canvas-with-pastel-color-movement": "Lienzo abstracto de graffiti de Hize con movimiento y color pastel",
    "hize-abstract-graffiti-canvas-with-black-background-and-colorful-shapes": "Lienzo abstracto de graffiti de Hize con fondo negro y formas de color",
    "hize-abstract-graffiti-canvas-with-colorful-letter-fragments": "Lienzo abstracto de graffiti de Hize con fragmentos de letra en color",
    "hize-graffiti-piece-in-sharjah-with-dynamic-letter-forms": "Pieza de graffiti de Hize con formas tipográficas dinámicas",
    "hize-vr-art-performance-creating-digital-graffiti-in-real-time": "Performance de VR Art de Hize creando graffiti digital en tiempo real",
    "hize-streetxo-visual-project-with-abstract-graffiti-energy": "Proyecto visual de Hize para StreetXO con energía de graffiti abstracto",
    "hize-brand-collaboration-with-contemporary-visual-artwork": "Colaboración de marca de Hize con lenguaje visual contemporáneo",
    "hize-art-project-at-expo-2020-dubai": "Proyecto artístico de Hize en Expo 2020 Dubái",
    "hize-graffiti-artwork-presented-in-osaka-japan": "Obra de graffiti de Hize presentada en Osaka, Japón",
    "hize-abstract-graffiti-mural-in-a-contemporary-space": "Mural abstracto de graffiti de Hize en un espacio contemporáneo",
    "hize-mural-with-abstract-graffiti-shapes-in-a-contemporary-space": "Mural de Hize con formas abstractas de graffiti en un espacio contemporáneo",
    "hize-mural-in-spain-combining-graffiti-and-abstract-shapes": "Mural de Hize en España que combina graffiti y formas abstractas",
    "hize-abstract-mural-with-colorful-graffiti-shapes-in-an-interior-space": "Mural abstracto de Hize con formas de graffiti coloristas en un espacio interior"
  }
};

const entityOverrides: LocalizedEntityMap = {
  en: {
    works: {},
    projects: {},
    murals: {},
    exhibitions: {}
  },
  es: {
    works: {
      "canvas-composition-01": {
        description:
          "Una obra de estudio que traduce el ritmo del graffiti, el color y la construcción de la letra en una composición abstracta contemporánea."
      },
      "wild-structures": {
        description:
          "Una composición abstracta basada en las estructuras ocultas entre las letras del graffiti, el movimiento y el ritmo urbano."
      },
      conexion: {
        description:
          "Una composición construida a partir de conexiones entre fragmentos de letra, movimiento y estructura urbana abstracta."
      },
      "conexion-3": {
        description:
          "Una obra sobre lienzo que explora equilibrio, gesto cinético y memoria visual de la escritura graffiti."
      },
      "expo-bohemia-negro": {
        description:
          "Una pieza panorámica de estudio con referencias al graffiti, contraste y ritmo abstracto."
      },
      "get-high": {
        description:
          "Una obra sobre lienzo que conecta la energía del graffiti tradicional con campos abstractos de color superpuestos."
      },
      ibiza: {
        description:
          "Una pieza de archivo de graffiti que muestra el origen estructural del lenguaje abstracto de estudio de Hize."
      },
      "sharjah-writing-2": {
        description:
          "Una pieza de archivo de graffiti que muestra el origen estructural del lenguaje abstracto de estudio de Hize."
      },
      "digital-graffiti-session": {
        description:
          "Una extensión digital en vivo del graffiti donde movimiento, gesto y tecnología se convierten en expresión visual."
      }
    },
    projects: {
      "streetxo-project": {
        description:
          "Para el proyecto StreetXO Dubai del reconocido chef Dabiz Muñoz, HIZE aportó a la atmósfera artística y a la identidad visual del espacio a través de una serie de obras e intervenciones inspiradas en la cultura urbana.\n\nMezclando graffiti, abstracción y estética street de energía cruda, el proyecto fue concebido para acompañar la intensidad explosiva y la personalidad rebelde de StreetXO: un concepto donde comida, música, diseño y arte colisionan en una experiencia totalmente inmersiva.\n\nLa intervención artística ayudó a transformar el entorno más allá del marco habitual de un restaurante, añadiendo capas de textura, movimiento y narrativa visual ligadas a la cultura urbana contemporánea.\n\nUna colaboración en la que el lenguaje del graffiti evolucionó hasta convertirse en parte de la experiencia sensorial que define la identidad audaz y disruptiva de StreetXO Dubai."
      },
      "brand-collaborations": {
        description:
          "Durante el lanzamiento exclusivo de la colección de Pharrell Williams en la flagship store de Louis Vuitton en Dubai Mall, HIZE fue invitado a crear una experiencia de personalización en vivo inspirada en el graffiti y la cultura urbana.\n\nRegalos de lujo y piezas seleccionadas de la colección fueron transformados en tiempo real mediante tags pintados a mano, lettering personalizado e intervenciones artísticas, uniendo la energía cruda del street art con el universo de la alta moda.\n\nLa colaboración llevó una presencia urbana auténtica al espacio de retail de lujo, generando piezas únicas e irrepetibles y una experiencia inmersiva para los invitados a la presentación.\n\nUn proyecto en el que el graffiti evolucionó más allá de la calle para entrar en el territorio de la moda, la artesanía y las experiencias de lujo."
      },
      "vr-art-performance": {
        description:
          "Performances de graffiti digital en vivo donde el gesto, el ritmo y las herramientas inmersivas generan estructuras visuales abstractas en tiempo real."
      },
      "expo-2020-dubai": {
        description:
          "Un proyecto cultural que presentó el lenguaje de graffiti abstracto de Hize a través del movimiento, el color y una presencia visual de gran escala en un contexto internacional."
      },
      "osaka-contemporary-art-museum": {
        description:
          "Un contexto expositivo en Japón que conecta la escritura graffiti, la composición abstracta y el lenguaje internacional del arte urbano contemporáneo."
      },
      "large-scale-murals": {
        description:
          "Una selección curada de obras murales específicas para el espacio, desarrolladas para contextos privados, hospitality, culturales y públicos."
      }
    },
    murals: {
      "new-mural": {
        description:
          "Durante el verano de 2024, Hize desarrolló una serie de experimentos murales urbanos abstractos junto a uno de sus artistas favoritos, Grems.\n\nCreadas a través de intervenciones espontáneas en el espacio público, estas piezas exploran la intersección entre graffiti, abstracción, movimiento y textura cruda, alejándose del lettering tradicional para entrar en un lenguaje visual más intuitivo y experimental.\n\nEl proceso estuvo guiado por la improvisación, las capas, el ritmo y la energía, transformando los muros en laboratorios abiertos de expresión donde el color, el gesto y la composición se convierten en el foco principal.\n\nEstas intervenciones reflejan la evolución continua de Hize desde sus raíces en el graffiti clásico hacia un enfoque más contemporáneo y abstracto, manteniendo intacta la espontaneidad y la esencia urbana de la cultura de calle."
      },
      "new-mural-2": {
        description:
          "Esta pieza transforma una furgoneta clásica en una composición viajera de color, ritmo y forma.\nConstruida a partir de capas, contrastes marcados y un movimiento visual fluido, la obra explora el equilibrio entre estructura y espontaneidad.\n\nEl vehículo se convierte en un lienzo móvil: un objeto reinterpretado como experiencia visual contemporánea que dialoga con su entorno desde todos los ángulos."
      },
      "puerto-visual-intervention": {
        description:
          "Creada para el festival Zedreart en Valencia, esta intervención de gran formato explora la relación entre arquitectura, movimiento y color a través de un lenguaje visual abstracto y vibrante.\n\nLa pieza transforma una estructura urbana industrial en un hito escultórico dinámico, utilizando gradientes superpuestos, formas geométricas afiladas y transiciones fluidas para generar una sensación constante de movimiento y energía desde cualquier ángulo.\n\nInspirado por la cultura del graffiti, la abstracción contemporánea y la experimentación espacial, el mural fue concebido para interactuar directamente con el entorno, cambiando visualmente según la luz, la perspectiva y la distancia.\n\nEste proyecto refleja el interés continuo de Hize por fusionar el arte urbano con el espacio arquitectónico, creando composiciones inmersivas que difuminan la frontera entre muralismo, instalación y arte público contemporáneo."
      },
      "torreblanca-mural": {
        description:
          "Un mural abstracto de gran escala desarrollado a partir de la identidad del espacio, combinando color, movimiento y ritmo estructural."
      },
      "abstract-interior-mural": {
        description:
          "Un mural interior site-specific que utiliza formas abstractas de graffiti para generar movimiento y atmósfera a lo largo del muro."
      },
      port: {
        description:
          "Creado para un entorno portuario, este mural fue concebido como una fusión entre abstracción geométrica y formas figurativas.\nLa composición deja ver sutilmente la silueta de un pez recorriendo el muro, fundiéndose con capas de color, movimiento orgánico y contrastes intensos característicos de mi lenguaje visual.\n\nLa pieza transforma la arquitectura en un paisaje costero vibrante: lúdico, inmersivo y profundamente conectado con su entorno."
      }
    },
    exhibitions: {
      "osaka-contemporary-art-museum": {
        description:
          "Contexto expositivo internacional para el lenguaje visual abstracto urbano de Hize."
      },
      "expo-2020-dubai": {
        description:
          "Un proyecto cultural que conecta graffiti, movimiento y abstracción contemporánea."
      },
      instagram: {
        description:
          "Una colaboración de marca que lleva el lenguaje visual de Hize, nacido del graffiti, hacia la cultura visual contemporánea pensada para entornos sociales."
      },
      bvlgari: {
        description:
          "Un contexto de marca premium para el lenguaje urbano abstracto de Hize, articulado a través de color, gesto y cultura contemporánea."
      },
      valentino: {
        description:
          "Una colaboración visual ligada a la moda que conecta la práctica de graffiti digital de Hize con movimiento, performance e imagen de lujo."
      },
      "international-mural-projects": {
        description:
          "Murales de gran formato por encargo para espacios privados, públicos y hospitality."
      },
      "vr-art-performances": {
        description:
          "Experiencias de graffiti digital en vivo para eventos, marcas y proyectos culturales."
      }
    }
  }
};

export function resolveLocale(pathname: string): Locale {
  return pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en";
}

export function localeLabel(locale: Locale): string {
  return localeLabels[locale];
}

export function getUiText(locale: Locale) {
  return uiText[locale];
}

export function stripLocaleFromPath(path: string): string {
  if (!isInternalPath(path)) return path;
  const { pathname, suffix } = splitInternalPath(path);
  const stripped = pathname === "/es" ? "/" : pathname.replace(/^\/es(?=\/)/, "") || "/";
  return `${stripped}${suffix}`;
}

export function localizePath(path: string, locale: Locale): string {
  if (!isInternalPath(path)) return path;

  const stripped = stripLocaleFromPath(path);
  if (locale === "en") return stripped;

  const { pathname, suffix } = splitInternalPath(stripped);
  const localized = pathname === "/" ? "/es/" : `/es${pathname}`;
  return `${localized}${suffix}`;
}

export function absoluteUrl(path: string): string {
  return new URL(path, "https://hizeart.vercel.app").toString();
}

export function getLocalizedPageContent<T extends Record<string, any>>(
  pageKey: string,
  baseContent: T,
  locale: Locale
): T {
  const overrides = pageOverrides[locale]?.[pageKey] || {};
  return localizeHrefKeys(deepMerge(baseContent, overrides), locale) as T;
}

export function localizeCategoryLabel(category: string, locale: Locale): string {
  const key = slugifyToken(category);
  return categoryLabels[locale][key] || category;
}

export function localizeAvailabilityLabel(value: string, locale: Locale): string {
  const key = slugifyToken(value);
  return availabilityLabels[locale][key] || value;
}

export function localizeProjectTypeLabel(value: string, locale: Locale): string {
  const key = slugifyToken(value);
  return projectTypeLabels[locale][key] || value;
}

export function getLocalizedWorkContent<T extends Record<string, any>>(item: T, locale: Locale): T {
  return localizeEntityContent("works", item, locale) as T;
}

export function getLocalizedProjectContent<T extends Record<string, any>>(item: T, locale: Locale): T {
  return localizeEntityContent("projects", item, locale) as T;
}

export function getLocalizedMuralContent<T extends Record<string, any>>(item: T, locale: Locale): T {
  return localizeEntityContent("murals", item, locale) as T;
}

export function getLocalizedExhibitionContent<T extends Record<string, any>>(item: T, locale: Locale): T {
  return localizeEntityContent("exhibitions", item, locale) as T;
}

function deepMerge(base: unknown, override: unknown): unknown {
  if (override === undefined) return base;
  if (Array.isArray(override)) return override;
  if (!isPlainObject(base) || !isPlainObject(override)) return override;

  const merged: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    merged[key] = deepMerge((base as Record<string, unknown>)[key], value);
  }
  return merged;
}

function localizeHrefKeys(value: unknown, locale: Locale, parentKey = ""): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => localizeHrefKeys(item, locale, parentKey));
  }

  if (!isPlainObject(value)) return value;

  return Object.entries(value).reduce<Record<string, unknown>>((result, [key, entry]) => {
    if (typeof entry === "string" && key.endsWith("Href")) {
      result[key] = localizePath(entry, locale);
      return result;
    }

    result[key] = localizeHrefKeys(entry, locale, key);
    return result;
  }, {});
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isInternalPath(path: string): boolean {
  return (
    Boolean(path) &&
    path.startsWith("/") &&
    !path.startsWith("//") &&
    !path.startsWith("/assets/") &&
    !path.startsWith("/_astro/")
  );
}

function splitInternalPath(path: string): { pathname: string; suffix: string } {
  const match = path.match(/^([^?#]*)(.*)$/);
  return {
    pathname: match?.[1] || "/",
    suffix: match?.[2] || ""
  };
}

function slugifyToken(value: string): string {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function localizeEntityContent(
  kind: "works" | "projects" | "murals" | "exhibitions",
  item: Record<string, any>,
  locale: Locale
): Record<string, any> {
  const key = entityKey(item);
  const overrides = entityOverrides[locale]?.[kind]?.[key] || {};
  const localized = deepMerge(item, overrides) as Record<string, any>;

  if (typeof localized.description === "string") {
    localized.description = localizeDescription(kind, localized, locale);
  }

  for (const field of ["location", "client", "technique", "size", "price", "alt", "year"]) {
    if (typeof localized[field] === "string") {
      localized[field] = localizeExactValue(localized[field], locale);
    }
  }

  if (localized.video && typeof localized.video === "object") {
    localized.video = {
      ...localized.video,
      title: typeof localized.video.title === "string" ? localizeExactValue(localized.video.title, locale) : localized.video.title,
      text: typeof localized.video.text === "string" ? localizeExactValue(localized.video.text, locale) : localized.video.text
    };
  }

  return localized;
}

function localizeDescription(
  kind: "works" | "projects" | "murals" | "exhibitions",
  item: Record<string, any>,
  locale: Locale
): string {
  const description = String(item.description || "").trim();
  if (kind === "works" && isPlaceholderDescription(description)) {
    return buildWorkFallbackDescription(item, locale);
  }

  return localizeExactValue(description, locale);
}

function buildWorkFallbackDescription(item: Record<string, any>, locale: Locale): string {
  const title = String(item.title || "").toLowerCase();

  if (title.includes("style is wild")) {
    return locale === "es"
      ? "Una obra de la serie Style is Wild, donde Hize expande su lenguaje de graffiti abstracto a través de gesto en capas, tensión cromática y ritmo estructural."
      : "Part of the Style is Wild series, this work extends Hize's abstract graffiti language through layered gesture, chromatic tension and structural rhythm.";
  }

  if (title.includes("wild encounters")) {
    return locale === "es"
      ? "Una obra de la serie Wild Encounters, donde contraste, movimiento y memoria fragmentada de la letra construyen una composición abstracta de energía abierta."
      : "Part of the Wild Encounters series, this work explores contrast, movement and fragmented letter memory through an open abstract composition.";
  }

  if (title === "hize" || title === "hize 2") {
    return locale === "es"
      ? "Un estudio directo del propio nombre de Hize como estructura visual, transformando memoria tipográfica, gesto y energía urbana en un campo abstracto."
      : "A direct study of Hize's own name as visual structure, turning letter memory, gesture and urban energy into an abstract field.";
  }

  if (title.includes("conexion")) {
    return locale === "es"
      ? "Una continuación de la serie Conexion, donde fragmentos enlazados, transiciones cromáticas y pausas rítmicas generan una composición abstracta contemporánea."
      : "A continuation of the Conexion series, where linked fragments, chromatic transitions and rhythmic spacing build a contemporary abstract composition.";
  }

  if (title.includes("black series")) {
    return locale === "es"
      ? "Parte de la Black Series, esta obra lleva la estructura del graffiti hacia una abstracción más densa y nocturna mediante fondo oscuro, contraste afilado y acentos cromáticos."
      : "Part of the Black Series, this work pushes graffiti structure toward a denser, nocturnal abstraction through dark ground, sharp contrast and chromatic accents.";
  }

  return locale === "es"
    ? "Obra original de Hize desarrollada desde la estructura del graffiti, el gesto y el ritmo visual para construir una composición abstracta contemporánea."
    : "An original work by Hize, developed from graffiti structure, gesture and visual rhythm to form a contemporary abstract composition.";
}

function isPlaceholderDescription(value: string): boolean {
  const normalized = value.trim().toLowerCase();
  return (
    normalized.length === 0 ||
    normalized === "add the collector-facing artwork description here." ||
    normalized === "add the collector-facing artwork description here"
  );
}

function entityKey(item: Record<string, any>): string {
  return slugifyToken(String(item.id || item.slug || item.title || ""));
}

function localizeExactValue(value: string, locale: Locale): string {
  if (locale === "en") return value;

  const trimmed = String(value || "").trim();
  if (!trimmed) return trimmed;

  const direct = exactValueLabels[locale][slugifyToken(trimmed)];
  if (direct) return direct;

  return trimmed
    .replace(/\bSpain and international\b/g, "España e internacional")
    .replace(/\bSpain \/ International\b/g, "España / Internacional")
    .replace(/\bTorreblanca, Spain\b/g, "Torreblanca, España")
    .replace(/\bDubai, UAE\b/g, "Dubái, EAU")
    .replace(/\bOsaka, Japan\b/g, "Osaka, Japón")
    .replace(/\bSpain\b/g, "España")
    .replace(/\bInternational\b/g, "Internacional")
    .replace(/\bSelected Archive\b/g, "Archivo seleccionado")
    .replace(/\bOngoing\b/g, "En curso");
}
