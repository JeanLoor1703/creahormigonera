const SALES_PHONE = "593997528670";

const form = document.getElementById("quoteForm");
const summaryBox = document.getElementById("summaryBox");
const copyButton = document.getElementById("copySummary");
const whatsappLink = document.getElementById("whatsappLink");

const summaryStrength = document.getElementById("summaryStrength");
const summaryPlacement = document.getElementById("summaryPlacement");
const summaryVolume = document.getElementById("summaryVolume");

// ─── Referencias a campos a validar ──────────────────────────────────────────
const phoneInput  = form.querySelector('[name="phone"]');
const emailInput  = form.querySelector('[name="email"]');
const docInput    = form.querySelector('[name="document"]');
const submitButton = form.querySelector('button[type="submit"]');
const unitSelect = form.querySelector('[name="quantityUnit"]');
const thicknessInput = form.querySelector('[name="thickness"]');
const thicknessContainer = document.getElementById("thicknessFieldContainer");

// ─── Inyectar nodo para mensajes de error ────────────────────────────────────
function injectErrorMsg(input, message) {
  const field = input.closest(".field");
  let msg = field.querySelector(".field-error-msg");
  if (!msg) {
    msg = document.createElement("span");
    msg.className = "field-error-msg";
    field.appendChild(msg);
  }
  msg.textContent = message;
}

// ─── Validadores ──────────────────────────────────────────────────────────────
function isValidPhone(value) {
  // 10 dígitos empezando con 09, o formato +593 con 9 dígitos adicionales
  return /^09\d{8}$/.test(value) || /^\+593\d{9}$/.test(value);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function isValidDocument(value) {
  // Cédula: exactamente 10 dígitos | RUC: exactamente 13 dígitos
  return /^\d{10}$/.test(value) || /^\d{13}$/.test(value);
}

// ─── Feedback visual por campo ────────────────────────────────────────────────
function setFieldState(input, isValid, errorMessage) {
  const field = input.closest(".field");
  if (!field) return;

  if (isValid) {
    field.classList.add("field-success");
    field.classList.remove("field-error");
    const msg = field.querySelector(".field-error-msg");
    if (msg) msg.textContent = "";
  } else {
    field.classList.add("field-error");
    field.classList.remove("field-success");
    injectErrorMsg(input, errorMessage);
  }
}

// ─── Valida y bloquea/desbloquea botones ─────────────────────────────────────
function validateAndUpdateButtons() {
  const phoneValue = phoneInput.value.trim();
  const emailValue = emailInput.value.trim();

  let phoneOk = false;
  let emailOk = true; // Email es opcional; si está vacío no bloquea

  // Teléfono — campo requerido
  if (phoneValue.length > 0) {
    phoneOk = isValidPhone(phoneValue);
    setFieldState(
      phoneInput,
      phoneOk,
      "El número no es válido, por favor corrígelo."
    );
  } else {
    phoneInput.closest(".field")?.classList.remove("field-success", "field-error");
    phoneOk = false;
  }

  // Email — solo valida si tiene contenido
  if (emailValue.length > 0) {
    emailOk = isValidEmail(emailValue);
    setFieldState(
      emailInput,
      emailOk,
      "Ingresa un correo válido (ej. nombre@dominio.com)."
    );
  } else {
    emailInput.closest(".field")?.classList.remove("field-success", "field-error");
    emailOk = true;
  }

  const allOk = phoneOk && emailOk;

  // Botón "Preparar solicitud"
  if (submitButton) {
    submitButton.disabled = !allOk;
  }

  // Enlace de WhatsApp
  if (whatsappLink) {
    if (!allOk) {
      whatsappLink.classList.add("whatsapp-link-disabled");
      whatsappLink.setAttribute("aria-disabled", "true");
    } else {
      whatsappLink.classList.remove("whatsapp-link-disabled");
      whatsappLink.removeAttribute("aria-disabled");
    }
  }
}

// ─── Utilidades del formulario ────────────────────────────────────────────────
function getFormData() {
  return new FormData(form);
}

function getValue(name) {
  return getFormData().get(name)?.toString().trim() || "";
}

function resolveOption(name, otherName) {
  const selected = getValue(name);
  if (selected === "Otro") {
    return getValue(otherName) || "Otro";
  }
  return selected;
}

function calculateVolume(quantity, unit, thickness) {
  const numericQuantity = Number(quantity);
  const numericThickness = Number(thickness);

  let baseVolume = 0;
  if (!numericQuantity || numericQuantity <= 0) return 0;

  if (unit === "m3") {
    baseVolume = numericQuantity;
  } else {
    if (!numericThickness || numericThickness <= 0) return 0;
    baseVolume = numericQuantity * (numericThickness / 100);
  }

  // Añadir 5% de desperdicio sugerido
  return baseVolume * 1.05;
}

function formatVolume(volume) {
  return `${volume.toFixed(2)} m3`;
}

function buildSummary() {
  const fullName      = getValue("fullName");
  const phone         = getValue("phone");
  const documentId    = getValue("document");
  const businessName  = getValue("businessName");
  const email         = getValue("email");
  const company       = getValue("company");
  const location      = getValue("location");
  const projectType   = resolveOption("projectType", "projectTypeOther");
  const element       = resolveOption("element", "elementOther");
  const quantity      = getValue("quantity");
  const unit          = getValue("quantityUnit");
  const thickness     = getValue("thickness");
  const strength      = resolveOption("strength", "strengthOther");
  const placementType = getValue("placementType");
  const notes         = getValue("notes");

  const volume = calculateVolume(quantity, unit, thickness);

  summaryStrength.textContent  = strength || "-";
  summaryPlacement.textContent = placementType || "-";
  summaryVolume.textContent    = formatVolume(volume);

  const lines = [
    "SOLICITUD DE COTIZACION DE HORMIGON",
    "",
    `Cliente: ${fullName || "-"}`,
    `Telefono: ${phone || "-"}`,
    `Cedula/RUC: ${documentId || "-"}`,
    `Razon social: ${businessName || "-"}`,
    `Correo: ${email || "-"}`,
    `Empresa: ${company || "-"}`,
    `Ubicacion del proyecto: ${location || "-"}`,
    "",
    `Tipo de obra: ${projectType || "-"}`,
    `Elemento a vaciar: ${element || "-"}`,
    `Cantidad ingresada: ${quantity || "0"} ${unit || ""}`.trim(),
    `Espesor: ${thickness ? `${thickness} cm` : "-"}`,
    `Volumen estimado: ${formatVolume(volume)} (Incluye 5% de desperdicio sugerido)`,
    `Resistencia requerida: ${strength || "-"}`,
    `Tipo de vaciado: ${placementType || "-"}`,
    `Comentarios: ${notes || "-"}`,
  ];

  const summaryText = lines.join("\n");
  summaryBox.textContent = summaryText;
  whatsappLink.href = `https://wa.me/${SALES_PHONE}?text=${encodeURIComponent(summaryText)}`;

  return summaryText;
}

function toggleOtherFields() {
  document.querySelectorAll(".choice-card-other").forEach((card) => {
    const radio = card.querySelector('input[type="radio"]');
    const input = card.querySelector(".other-input");
    if (!radio || !input) return;

    if (radio.checked) {
      input.style.display = "block";
      input.disabled = false;
    } else {
      input.style.display = "none";
      input.disabled = true;
      input.value = "";
    }
  });
}

// ─── Event listeners ──────────────────────────────────────────────────────────
phoneInput.addEventListener("input", validateAndUpdateButtons);
emailInput.addEventListener("input", validateAndUpdateButtons);

unitSelect.addEventListener("change", () => {
  if (unitSelect.value === "m3") {
    thicknessContainer.classList.add("hidden");
    thicknessInput.removeAttribute("required");
    thicknessInput.value = "";
    const field = thicknessInput.closest(".field");
    if (field) field.classList.remove("field-success", "field-error");
  } else {
    thicknessContainer.classList.remove("hidden");
    thicknessInput.setAttribute("required", "required");
  }
  buildSummary();
  runGlobalValidation();
  validateAndUpdateButtons();
});

// ─── Validación en tiempo real: Cédula / RUC ─────────────────────────────────
docInput.addEventListener("input", () => {
  const value = docInput.value.trim();
  const field = docInput.closest(".field");
  if (!field) return;

  if (value.length === 0) {
    field.classList.remove("field-success", "field-label-check");
    return;
  }

  if (isValidDocument(value)) {
    field.classList.add("field-success", "field-label-check");
  } else {
    field.classList.remove("field-success", "field-label-check");
  }
});

// ─── Validación global de progreso ───────────────────────────────────────────
// Reglas para campos de texto por nombre
const TEXT_FIELD_RULES = {
  fullName:     (v) => v.length >= 3,
  phone:        isValidPhone,
  email:        (v) => v.length === 0 || isValidEmail(v), // opcional
  document:     (v) => v.length === 0 || isValidDocument(v), // opcional
  businessName: (v) => v.length > 0,
  company:      (v) => v.length > 0,
  location:     (v) => v.length >= 4,
  quantity:     (v) => Number(v) > 0,
  thickness:    (v) => Number(v) > 0, // se vuelve requerido u opcional dinámicamente
  notes:        (v) => v.length > 0, // opcional, siempre éxito si tiene algo
};

// Grupos radio que marcan éxito en la tarjeta seleccionada
const RADIO_GROUPS = ["projectType", "element", "strength", "placementType"];

function runGlobalValidation() {
  // ── Campos de texto / número / email / select ────────────────────────────
  Object.entries(TEXT_FIELD_RULES).forEach(([name, isOk]) => {
    const input = form.querySelector(`[name="${name}"]`);
    if (!input) return;
    const field = input.closest(".field");
    if (!field) return;

    const value = input.value.trim();

    // Campos especiales con lógica propia (phone/email ya los maneja validateAndUpdateButtons)
    if (name === "phone" || name === "email") return;

    // Cédula ya tiene su propio listener con .field-label-check
    if (name === "document") return;

    if (value.length === 0) {
      field.classList.remove("field-success", "field-error");
    } else if (isOk(value)) {
      field.classList.add("field-success");
      field.classList.remove("field-error");
      const msg = field.querySelector(".field-error-msg");
      if (msg) msg.textContent = "";
    } else {
      field.classList.remove("field-success");
    }
  });

  // ── Grupos de radio: marcar la tarjeta seleccionada en verde ─────────────
  RADIO_GROUPS.forEach((groupName) => {
    const allCards = form.querySelectorAll(
      `.choice-card input[type="radio"][name="${groupName}"]`
    );
    allCards.forEach((radio) => {
      const card = radio.closest(".choice-card");
      if (!card) return;
      // El CSS ya lo colorea verde con :has(:checked), pero también añadimos
      // la clase para otros posibles usos futuros sin duplicar estilos
      if (radio.checked) {
        card.classList.add("card-selected");
      } else {
        card.classList.remove("card-selected");
      }
    });
  });
}

form.addEventListener("input", () => {
  toggleOtherFields();
  buildSummary();
  runGlobalValidation();
  validateAndUpdateButtons();
});

form.addEventListener("change", () => {
  toggleOtherFields();
  buildSummary();
  runGlobalValidation();
  validateAndUpdateButtons();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // ── 1. Validar que todos los campos required tienen .field-success ──────
  const missingField = [...form.querySelectorAll("[required]")].find((input) => {
    const field = input.closest(".field");
    // Los radio buttons se validan por si el grupo tiene alguno chequeado
    if (input.type === "radio") {
      const groupChecked = form.querySelector(
        `input[type="radio"][name="${input.name}"]:checked`
      );
      return !groupChecked;
    }
    return field && !field.classList.contains("field-success");
  });

  if (missingField) {
    // Scroll suave al primer campo incompleto y sacude su contenedor
    const targetField = missingField.closest(".field") || missingField;
    targetField.scrollIntoView({ behavior: "smooth", block: "center" });
    targetField.style.animation = "none";
    requestAnimationFrame(() => {
      targetField.style.animation = "fieldShake 0.4s ease";
    });
    return; // Detener envío
  }

  // ── 2. Construir el resumen y el enlace ──────────────────────────────────
  const summaryText = buildSummary();
  const waUrl = `https://wa.me/${SALES_PHONE}?text=${encodeURIComponent(summaryText)}`;

  // ── 3. Abrir WhatsApp directamente (respuesta sincrónica al clic) ────────
  //    Llamar window.open() aquí, dentro del event handler, evita popup blockers
  window.open(waUrl, "_blank", "noopener,noreferrer");

  // ── 4. Feedback visual en el botón (estado de carga momentáneo) ──────────
  const originalText = submitButton.textContent;
  submitButton.textContent = "Abriendo WhatsApp...";
  submitButton.disabled = true;
  setTimeout(() => {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
    validateAndUpdateButtons(); // Restaura estado correcto del botón
  }, 2500);
});

copyButton.addEventListener("click", async () => {
  const summaryText = buildSummary();
  try {
    await navigator.clipboard.writeText(summaryText);
    copyButton.textContent = "Resumen copiado";
    setTimeout(() => { copyButton.textContent = "Copiar resumen"; }, 1800);
  } catch (error) {
    copyButton.textContent = "No se pudo copiar";
    setTimeout(() => { copyButton.textContent = "Copiar resumen"; }, 1800);
  }
});

// ─── Init ─────────────────────────────────────────────────────────────────────
toggleOtherFields();
buildSummary();
validateAndUpdateButtons();
runGlobalValidation();

// Cambiar texto del botón de envío sin modificar el HTML
if (submitButton) {
  submitButton.textContent = "Enviar Cotización por WhatsApp";
}

