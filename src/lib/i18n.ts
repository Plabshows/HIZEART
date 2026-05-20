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
