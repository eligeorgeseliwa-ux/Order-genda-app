import React, { useState, useEffect } from "react";

const STORAGE_KEY = "order_genda_mvp_v3";
const THEME_KEY = "order_genda_theme_v1";
const SUB_KEY = "order_genda_subscription_v1";
const LANG_KEY = "order_genda_lang_v1";

const TRIAL_DAYS = 30;
const DAY_MS = 24 * 60 * 60 * 1000;

const TRANSLATIONS = {
  fr: {
    badgeLight: "Mode Clair · Vert & Blanc",
    badgeDark: "Mode Sombre · Vert & Blanc",
    subHeader: "Commandes WhatsApp, encaissements & agenda · Abonnement direct développeur",
    lightMode: "Mode clair",
    darkMode: "Mode sombre",
    subButtonActive: (days) => `Abonnement (${days}j)`,
    subButtonExpired: "Abonnement (Activer)",
    clearAll: "Tout vider",
    confirmClear: "Voulez-vous vraiment vider toutes vos commandes enregistrées ?",
    tabDashboard: "Tableau de bord",
    tabWhatsApp: "1. Coller depuis WhatsApp",
    tabNewOrder: "2. + Nouvelle commande",
    tabOrders: (count) => `3. Agenda & Commandes (${count})`,
    tabSubscription: "Abonnement Premium",
    expiredBannerTitle: "Période gratuite d'1 mois terminée",
    expiredBannerText: (currency) =>
      `Pour continuer à saisir vos commandes, importer depuis WhatsApp et gérer votre agenda, activez l'abonnement mensuel (200 à 300 ${currency} chaque fin de mois / cycle de 30 jours) vers le compte développeur.`,
    expiredBannerBtn: "Accéder au paiement d'abonnement",
    kpiTotal: "Volume total des commandes",
    kpiPaid: "Paiements encaissés (clients)",
    kpiPending: "Reste à encaisser (clients)",
    kpiSubDays: "Abonnement · Jours restants",
    daysSuffix: (days) => `${days} j`,
    subTitle: "Abonnement Premium ORDER GENDA (Paiement Développeur)",
    subDesc: (devName) =>
      `Les encaissements de vos clients restent enregistrés dans vos commandes. L'abonnement mensuel est réglé directement vers ${devName} après le 1er mois gratuit.`,
    subStatusLine: (active, days) =>
      `Statut actuel : ${active ? "ACTIF" : "EXPIRÉ"} · ${days} jour(s) restant(s)`,
    devNumbersLine: (mtn, airtel) =>
      `Réception développeur — MTN MoMo : ${mtn} · Airtel Money : ${airtel}`,
    monthlyAmountLabel: (currency) => `Montant mensuel (${currency})`,
    planOption: (amount, currency) => `${amount} ${currency} / fin de mois`,
    paymentMethodLabel: "Moyen de paiement",
    payerCardPlaceholder: "Titulaire / 4 derniers chiffres (test local)",
    payerPhonePlaceholder: "Numéro de téléphone payeur",
    payerCardInputPlaceholder: "Ex: Carte •••• 4242",
    payerPhoneInputPlaceholder: "Ex: +250788000000",
    paymentRefLabel: "Référence de transaction / reçu",
    paymentRefPlaceholder: "Ex: ID transfert MoMo / Airtel",
    confirmSubBtn: (amount, currency) => `Valider le paiement (${amount} ${currency} · +30 jours)`,
    simulateEndBtn: "Tester la fin d'essai (simulation)",
    simExpiredMsg: "Période gratuite terminée (simulation). Active l'abonnement mensuel pour continuer.",
    subActivatedMsg: (method, amount, currency) =>
      `Abonnement activé (+30 jours) via ${method} pour ${amount} ${currency}.`,
    subStatusActiveLabel: (plan, days) => `${plan} · ${days} j restants`,
    subStatusExpiredLabel: "Abonnement requis · Fin de période",
    recentTitle: "Commandes dans l'agenda",
    importWhatsAppBtn: "+ Importer depuis WhatsApp",
    manualEntryBtn: "+ Saisie manuelle",
    emptyDashboardTitle: "Aucune commande enregistrée pour l'instant",
    emptyDashboardText: "Colle un message WhatsApp ou ajoute une commande pour remplir ton agenda.",
    pasteWhatsAppBtn: "Coller une commande WhatsApp",
    scheduledAt: (date, time) => `Prévu le ${date} à ${time}`,
    addToCalendar: "+ Agenda",
    whatsappTitle: "Prendre une commande depuis WhatsApp",
    whatsappDesc:
      "Colle le message reçu sur WhatsApp. Tu peux soit vérifier les champs détectés avant d'enregistrer, soit ajouter directement la commande.",
    whatsappPlaceholder:
      "Exemple :\nNom : Eliwa\nTéléphone : +250788000000\nArticle : Chaussure\nQuantité : 3\nPrix unitaire : 30000\nAdresse : Kigali",
    verifyBeforeSave: "Vérifier avant d'enregistrer",
    addDirect1Click: "Ajouter directement en 1 clic",
    clearText: "Effacer",
    extractedPreview: (name, product, qty, priceFormatted) =>
      `Extrait : ${name} · ${product} (x${qty}) · Prix unitaire : ${priceFormatted}`,
    addedOrderMsg: (id, totalFormatted) => `Commande ${id} enregistrée (${totalFormatted}).`,
    newOrderTitle: "Planifier une commande dans l'agenda",
    clientNameLabel: "Nom du client *",
    clientNamePlaceholder: "Ex: Eliwa",
    phoneLabel: "Numéro WhatsApp",
    phonePlaceholder: "Ex: +250788000000",
    productLabel: "Produit / Article *",
    productPlaceholder: "Ex: Chaussure",
    quantityLabel: "Quantité",
    unitPriceLabel: (currency) => `Prix unitaire (${currency})`,
    dateLabel: "Date dans l'agenda",
    timeLabel: "Heure de livraison",
    addressLabel: "Lieu / Adresse",
    addressPlaceholder: "Ex: Kigali",
    paymentLabel: "Paiement client",
    payPending: "En attente",
    payDeposit: "Acompte",
    payPaid: "Payé",
    deliveryLabel: "Statut livraison",
    delPrep: "À préparer",
    delShip: "En livraison",
    delDone: "Livré",
    notesLabel: "Message WhatsApp / Notes",
    notesPlaceholder: "Détails de la commande...",
    totalCalculated: (qty, unitFormatted, totalFormatted) =>
      `Total calculé (${qty} × ${unitFormatted}) : ${totalFormatted}`,
    saveOrderBtn: "Enregistrer dans ORDER GENDA",
    ordersListTitle: "Agenda complet des commandes",
    searchPlaceholder: "Rechercher client, article...",
    allStatuses: "Tous les statuts",
    filterPayPending: "Paiement : En attente",
    filterPayDeposit: "Paiement : Acompte",
    filterPayPaid: "Paiement : Payé",
    filterDelPrep: "Livraison : À préparer",
    filterDelShip: "Livraison : En livraison",
    filterDelDone: "Livraison : Livré",
    emptyOrdersList: "Aucune commande planifiée pour le moment.",
    unitPriceShort: "Prix unitaire",
    totalShort: "Total",
    phoneShort: "Tél",
    addressShort: "Lieu",
    noteShort: "Note",
    replyWhatsApp: "Répondre WhatsApp",
    deleteBtn: "Supprimer",
    closeBtn: "Fermer",
    waMsg: (ord, totalFormatted) =>
      `Bonjour ${ord.clientName}, votre commande ${ord.id} (${ord.product} x${ord.quantity}) est enregistrée dans ORDER GENDA pour le ${ord.deliveryDate} à ${ord.deliveryTime}. Total : ${totalFormatted}. Paiement : ${ord.paymentStatus}.`,
    calTitle: (ord) => `Livraison ORDER GENDA : ${ord.clientName} (${ord.product})`,
    calDetails: (ord, totalFormatted) =>
      `Commande : ${ord.id}\nClient : ${ord.clientName}\nTéléphone : ${ord.phone}\nArticle : ${ord.product} (x${ord.quantity})\nTotal : ${totalFormatted}\nPaiement : ${ord.paymentStatus}\nNotes : ${ord.notes}`,
  },
  en: {
    badgeLight: "Light Mode · Green & White",
    badgeDark: "Dark Mode · Green & White",
    subHeader: "WhatsApp orders, payments & schedule · Direct developer subscription",
    lightMode: "Light mode",
    darkMode: "Dark mode",
    subButtonActive: (days) => `Subscription (${days}d)`,
    subButtonExpired: "Subscription (Activate)",
    clearAll: "Clear all",
    confirmClear: "Are you sure you want to clear all saved orders?",
    tabDashboard: "Dashboard",
    tabWhatsApp: "1. Paste from WhatsApp",
    tabNewOrder: "2. + New order",
    tabOrders: (count) => `3. Schedule & Orders (${count})`,
    tabSubscription: "Premium Subscription",
    expiredBannerTitle: "1-month free trial ended",
    expiredBannerText: (currency) =>
      `To continue recording orders, importing from WhatsApp, and managing your schedule, activate the monthly subscription (200 to 300 ${currency} each month-end / 30-day cycle) to the developer account.`,
    expiredBannerBtn: "Go to subscription payment",
    kpiTotal: "Total order volume",
    kpiPaid: "Collected payments (customers)",
    kpiPending: "Remaining to collect (customers)",
    kpiSubDays: "Subscription · Days left",
    daysSuffix: (days) => `${days} d`,
    subTitle: "ORDER GENDA Premium Subscription (Developer Payment)",
    subDesc: (devName) =>
      `Customer collections stay recorded in your orders. The monthly subscription is paid directly to ${devName} after the first free month.`,
    subStatusLine: (active, days) =>
      `Current status: ${active ? "ACTIVE" : "EXPIRED"} · ${days} day(s) remaining`,
    devNumbersLine: (mtn, airtel) =>
      `Developer payout — MTN MoMo: ${mtn} · Airtel Money: ${airtel}`,
    monthlyAmountLabel: (currency) => `Monthly amount (${currency})`,
    planOption: (amount, currency) => `${amount} ${currency} / month-end`,
    paymentMethodLabel: "Payment method",
    payerCardPlaceholder: "Cardholder / Last 4 digits (local test)",
    payerPhonePlaceholder: "Payer phone number",
    payerCardInputPlaceholder: "Ex: Card •••• 4242",
    payerPhoneInputPlaceholder: "Ex: +250788000000",
    paymentRefLabel: "Transaction reference / receipt",
    paymentRefPlaceholder: "Ex: MoMo / Airtel transfer ID",
    confirmSubBtn: (amount, currency) => `Confirm payment (${amount} ${currency} · +30 days)`,
    simulateEndBtn: "Test trial expiration (simulation)",
    simExpiredMsg: "Free trial ended (simulation). Activate the monthly subscription to continue.",
    subActivatedMsg: (method, amount, currency) =>
      `Subscription activated (+30 days) via ${method} for ${amount} ${currency}.`,
    subStatusActiveLabel: (plan, days) => `${plan} · ${days} d left`,
    subStatusExpiredLabel: "Subscription required · Period ended",
    recentTitle: "Orders in schedule",
    importWhatsAppBtn: "+ Import from WhatsApp",
    manualEntryBtn: "+ Manual entry",
    emptyDashboardTitle: "No orders recorded yet",
    emptyDashboardText: "Paste a WhatsApp message or add an order to fill your schedule.",
    pasteWhatsAppBtn: "Paste a WhatsApp order",
    scheduledAt: (date, time) => `Scheduled ${date} at ${time}`,
    addToCalendar: "+ Calendar",
    whatsappTitle: "Take an order from WhatsApp",
    whatsappDesc:
      "Paste the message received on WhatsApp. You can either review detected fields before saving or add the order directly.",
    whatsappPlaceholder:
      "Example:\nName: Eliwa\nPhone: +250788000000\nItem: Shoes\nQuantity: 3\nUnit price: 30000\nAddress: Kigali",
    verifyBeforeSave: "Review before saving",
    addDirect1Click: "Add directly in 1 click",
    clearText: "Clear",
    extractedPreview: (name, product, qty, priceFormatted) =>
      `Extracted: ${name} · ${product} (x${qty}) · Unit price: ${priceFormatted}`,
    addedOrderMsg: (id, totalFormatted) => `Order ${id} saved (${totalFormatted}).`,
    newOrderTitle: "Schedule an order in calendar",
    clientNameLabel: "Customer name *",
    clientNamePlaceholder: "Ex: Eliwa",
    phoneLabel: "WhatsApp number",
    phonePlaceholder: "Ex: +250788000000",
    productLabel: "Product / Item *",
    productPlaceholder: "Ex: Shoes",
    quantityLabel: "Quantity",
    unitPriceLabel: (currency) => `Unit price (${currency})`,
    dateLabel: "Schedule date",
    timeLabel: "Delivery time",
    addressLabel: "Location / Address",
    addressPlaceholder: "Ex: Kigali",
    paymentLabel: "Customer payment",
    payPending: "Pending",
    payDeposit: "Deposit",
    payPaid: "Paid",
    deliveryLabel: "Delivery status",
    delPrep: "To prepare",
    delShip: "Out for delivery",
    delDone: "Delivered",
    notesLabel: "WhatsApp message / Notes",
    notesPlaceholder: "Order details...",
    totalCalculated: (qty, unitFormatted, totalFormatted) =>
      `Calculated total (${qty} × ${unitFormatted}): ${totalFormatted}`,
    saveOrderBtn: "Save to ORDER GENDA",
    ordersListTitle: "Full order schedule",
    searchPlaceholder: "Search customer, item...",
    allStatuses: "All statuses",
    filterPayPending: "Payment: Pending",
    filterPayDeposit: "Payment: Deposit",
    filterPayPaid: "Payment: Paid",
    filterDelPrep: "Delivery: To prepare",
    filterDelShip: "Delivery: Out for delivery",
    filterDelDone: "Delivery: Delivered",
    emptyOrdersList: "No orders scheduled yet.",
    unitPriceShort: "Unit price",
    totalShort: "Total",
    phoneShort: "Phone",
    addressShort: "Location",
    noteShort: "Note",
    replyWhatsApp: "Reply WhatsApp",
    deleteBtn: "Delete",
    closeBtn: "Close",
    waMsg: (ord, totalFormatted) =>
      `Hello ${ord.clientName}, your order ${ord.id} (${ord.product} x${ord.quantity}) is scheduled in ORDER GENDA on ${ord.deliveryDate} at ${ord.deliveryTime}. Total: ${totalFormatted}. Payment: ${ord.paymentStatus}.`,
    calTitle: (ord) => `ORDER GENDA Delivery: ${ord.clientName} (${ord.product})`,
    calDetails: (ord, totalFormatted) =>
      `Order: ${ord.id}\nCustomer: ${ord.clientName}\nPhone: ${ord.phone}\nItem: ${ord.product} (x${ord.quantity})\nTotal: ${totalFormatted}\nPayment: ${ord.paymentStatus}\nNotes: ${ord.notes}`,
  },
};

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem(LANG_KEY) === "en" ? "en" : "fr";
    } catch {
      return "fr";
    }
  });

  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;

  // Remplace ces valeurs par tes propres coordonnées développeur
  const DEVELOPER_CONFIG = {
    name: "ORDER GENDA Developer",
    mtnMomoNumber: "+250 780 000 000",
    airtelMoneyNumber: "+250 730 000 000",
    cardNote:
      lang === "fr"
        ? "Paiement par carte (à connecter à une passerelle en production)"
        : "Card payment (connect to a payment gateway in production)",
  };

  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) || "light";
    } catch {
      return "light";
    }
  });

  const [subscription, setSubscription] = useState(() => {
    const now = Date.now();
    try {
      const saved = localStorage.getItem(SUB_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignorer
    }
    return {
      trialStartedAt: now,
      paidUntil: now + TRIAL_DAYS * DAY_MS,
      planType: lang === "fr" ? "Essai gratuit (1 mois)" : "Free trial (1 month)",
      lastPaymentMethod: null,
      lastPaymentRef: "",
    };
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currency, setCurrency] = useState("RWF");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [selectedPlanAmount, setSelectedPlanAmount] = useState(200);
  const [paymentMethod, setPaymentMethod] = useState("MTN MoMo");
  const [payerContact, setPayerContact] = useState("");
  const [paymentRef, setPaymentRef] = useState("");
  const [subMessage, setSubMessage] = useState("");

  const todayISO = new Date().toISOString().split("T")[0];

  const [newOrder, setNewOrder] = useState({
    clientName: "",
    phone: "",
    product: "",
    quantity: 1,
    unitPrice: "",
    deliveryDate: todayISO,
    deliveryTime: "14:00",
    paymentStatus: "En attente",
    deliveryStatus: "À préparer",
    address: "",
    notes: "",
  });

  const [rawWhatsAppText, setRawWhatsAppText] = useState("");
  const [parseFeedback, setParseFeedback] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      // Ignorer
    }
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // Ignorer
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Ignorer
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(SUB_KEY, JSON.stringify(subscription));
    } catch {
      // Ignorer
    }
  }, [subscription]);

  const nowTs = Date.now();
  const isSubscriptionActive = nowTs < (subscription.paidUntil || 0);
  const daysRemaining = Math.max(
    0,
    Math.ceil(((subscription.paidUntil || 0) - nowTs) / DAY_MS)
  );

  const isDark = theme === "dark";

  const palette = isDark
    ? {
        bgPage: "#0b1f14",
        bgSurface: "#122b1d",
        bgSubtle: "#183826",
        bgGreenBar: "#14532d",
        bgGreenTab: "#166534",
        border: "#27543a",
        borderStrong: "#4ade80",
        text: "#f0fdf4",
        textMuted: "#bbf7d0",
        btnPrimaryBg: "#22c55e",
        btnPrimaryText: "#052e16",
        btnSecondaryBg: "#ffffff",
        btnSecondaryText: "#052e16",
        dangerText: "#fecaca",
        dangerBg: "#3f1515",
        dangerBorder: "#f87171",
      }
    : {
        bgPage: "#bbf7d0",
        bgSurface: "#ffffff",
        bgSubtle: "#f0fdf4",
        bgGreenBar: "#4ade80",
        bgGreenTab: "#22c55e",
        border: "#86efac",
        borderStrong: "#111111",
        text: "#0a0a0a",
        textMuted: "#111111",
        btnPrimaryBg: "#16a34a",
        btnPrimaryText: "#ffffff",
        btnSecondaryBg: "#ffffff",
        btnSecondaryText: "#0a0a0a",
        dangerText: "#0a0a0a",
        dangerBg: "#dcfce7",
        dangerBorder: "#111111",
      };

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.width = "100%";
    document.body.style.backgroundColor = palette.bgPage;
    const root = document.getElementById("root");
    if (root) {
      root.style.maxWidth = "100%";
      root.style.width = "100%";
      root.style.margin = "0";
      root.style.padding = "0";
    }
  }, [palette.bgPage]);

  const toCleanNumber = (val) => {
    if (typeof val === "number") return Number.isFinite(val) ? Math.max(0, val) : 0;
    const digitsOnly = String(val || "").replace(/[^\d]/g, "");
    return digitsOnly ? Number(digitsOnly) : 0;
  };

  const formatAmount = (value) => {
    const num = toCleanNumber(value);
    const locale = lang === "en" ? "en-US" : "fr-FR";
    return `${num.toLocaleString(locale)} ${currency}`;
  };

  const handleOrderFieldChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prev) => ({ ...prev, [name]: value }));
  };

  const createOrderRecord = (data) => {
    const qty = Math.max(1, toCleanNumber(data.quantity) || 1);
    const price = toCleanNumber(data.unitPrice);
    const locale = lang === "en" ? "en-US" : "fr-FR";
    return {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toLocaleDateString(locale),
      clientName: (data.clientName || "").trim(),
      phone: (data.phone || "").trim(),
      product: (data.product || "").trim(),
      quantity: qty,
      unitPrice: price,
      total: qty * price,
      deliveryDate: data.deliveryDate || todayISO,
      deliveryTime: data.deliveryTime || "14:00",
      paymentStatus: data.paymentStatus || "En attente",
      deliveryStatus: data.deliveryStatus || "À préparer",
      address: (data.address || "").trim(),
      notes: (data.notes || "").trim(),
    };
  };

  const handleAddOrder = (e) => {
    e.preventDefault();
    if (!isSubscriptionActive) {
      setActiveTab("subscription");
      return;
    }
    if (!newOrder.clientName.trim() || !newOrder.product.trim()) return;

    const item = createOrderRecord(newOrder);
    setOrders((prev) => [item, ...prev]);

    setNewOrder({
      clientName: "",
      phone: "",
      product: "",
      quantity: 1,
      unitPrice: "",
      deliveryDate: todayISO,
      deliveryTime: "14:00",
      paymentStatus: "En attente",
      deliveryStatus: "À préparer",
      address: "",
      notes: "",
    });
    setParseFeedback("");
    setActiveTab("orders");
  };

  const extractWhatsAppFields = (text) => {
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    let clientName = "";
    let phone = "";
    let product = "";
    let quantity = 1;
    let unitPrice = 0;
    let address = "";

    const phonePattern = /(\+?\d[\d\s\-]{7,15}\d)/;

    for (const line of lines) {
      if (/^(nom|client|name)\b/i.test(line)) {
        clientName = line.replace(/^[^:\-]+[:\-]\s*/, "").trim();
      } else if (/^(t[eé]l|t[eé]l[eé]phone|num[eé]ro|phone|whatsapp)\b/i.test(line)) {
        const m = line.match(phonePattern);
        phone = m ? m[1].replace(/\s+/g, "") : line.replace(/^[^:\-]+[:\-]\s*/, "").trim();
      } else if (/^(article|produit|commande|item|product)\b/i.test(line)) {
        product = line.replace(/^[^:\-]+[:\-]\s*/, "").trim();
      } else if (/^(qt[eé]|quantit[eé]|qty|quantity)\b/i.test(line)) {
        const qMatch = line.match(/(\d+)/);
        if (qMatch) quantity = Math.max(1, Number(qMatch[1]) || 1);
      } else if (/^(prix|montant|tarif|co[uû]t|total|price|amount)\b/i.test(line)) {
        const cleanLine = line.replace(phonePattern, " ");
        const pMatch = cleanLine.match(/(\d[\d\s.,]*)/);
        if (pMatch) unitPrice = toCleanNumber(pMatch[1]);
      } else if (/^(adresse|quartier|lieu|livraison|address|location)\b/i.test(line)) {
        address = line.replace(/^[^:\-]+[:\-]\s*/, "").trim();
      }
    }

    if (!phone) {
      const globalPhone = text.match(phonePattern);
      if (globalPhone) phone = globalPhone[1].replace(/\s+/g, "");
    }

    if (quantity === 1) {
      const inlineQty = text.match(
        /(?:\bx\s*|qt[eé]\s*[:\-]?\s*|quantit[eé]\s*[:\-]?\s*|qty\s*[:\-]?\s*|quantity\s*[:\-]?\s*)(\d+)\b/i
      );
      if (inlineQty) quantity = Math.max(1, Number(inlineQty[1]) || 1);
    }

    if (unitPrice === 0) {
      const textWithoutPhone = phone ? text.split(phone).join(" ") : text;
      const currencyMatch = textWithoutPhone.match(/(\d[\d\s.,]{1,12})\s*(?:rwf|fcfa|eur|usd|\$|€)/i);
      if (currencyMatch) {
        unitPrice = toCleanNumber(currencyMatch[1]);
      } else {
        const numbers = textWithoutPhone.match(/\b\d[\d\s.,]{2,}\b/g) || [];
        const validNums = numbers.map((n) => toCleanNumber(n)).filter((n) => n >= 50);
        if (validNums.length > 0) {
          unitPrice = validNums[validNums.length - 1];
        }
      }
    }

    if (!clientName && lines[0]) {
      clientName = lines[0].replace(/^[^:\-]+[:\-]\s*/, "").slice(0, 40);
    }

    if (!product) {
      const candidateLines = lines.filter(
        (l) =>
          !/^(nom|client|name|t[eé]l|t[eé]l[eé]phone|num[eé]ro|phone|adresse|quartier|lieu|livraison|address|location|prix|montant|total|price|amount)\b/i.test(
            l
          )
      );
      product = (candidateLines[0] || lines[0] || (lang === "en" ? "WhatsApp Order" : "Commande WhatsApp")).slice(
        0,
        80
      );
    }

    return {
      clientName: clientName || (lang === "en" ? "WhatsApp Customer" : "Client WhatsApp"),
      phone,
      product,
      quantity,
      unitPrice: unitPrice > 0 ? String(unitPrice) : "",
      address,
    };
  };

  const handleParseWhatsApp = (saveDirectly = false) => {
    if (!isSubscriptionActive) {
      setActiveTab("subscription");
      return;
    }
    if (!rawWhatsAppText.trim()) return;

    const extracted = extractWhatsAppFields(rawWhatsAppText);
    const mergedData = {
      ...newOrder,
      clientName: extracted.clientName,
      phone: extracted.phone,
      product: extracted.product,
      quantity: extracted.quantity,
      unitPrice: extracted.unitPrice,
      address: extracted.address,
      notes: rawWhatsAppText.trim(),
    };

    if (saveDirectly) {
      const record = createOrderRecord(mergedData);
      setOrders((prev) => [record, ...prev]);
      setRawWhatsAppText("");
      setParseFeedback(t.addedOrderMsg(record.id, formatAmount(record.total)));
      setActiveTab("orders");
    } else {
      setNewOrder(mergedData);
      setParseFeedback(
        t.extractedPreview(
          mergedData.clientName,
          mergedData.product,
          mergedData.quantity,
          formatAmount(mergedData.unitPrice)
        )
      );
      setActiveTab("new-order");
    }
  };

  const handleStatusChange = (id, field, value) => {
    if (!isSubscriptionActive) {
      setActiveTab("subscription");
      return;
    }
    setOrders((prev) =>
      prev.map((ord) => (ord.id === id ? { ...ord, [field]: value } : ord))
    );
  };

  const handleDeleteOrder = (id) => {
    if (!isSubscriptionActive) {
      setActiveTab("subscription");
      return;
    }
    setOrders((prev) => prev.filter((ord) => ord.id !== id));
  };

  const handleResetWorkspace = () => {
    if (window.confirm(t.confirmClear)) {
      setOrders([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleSimulateTrialEnd = () => {
    const expiredTs = Date.now() - DAY_MS;
    setSubscription((prev) => ({
      ...prev,
      paidUntil: expiredTs,
      planType: lang === "fr" ? "Essai expiré (simulation)" : "Trial expired (simulation)",
    }));
    setSubMessage(t.simExpiredMsg);
    setActiveTab("subscription");
  };

  const handleConfirmSubscriptionPayment = (e) => {
    e.preventDefault();
    const baseTime = Math.max(Date.now(), subscription.paidUntil || 0);
    const nextPaidUntil = baseTime + TRIAL_DAYS * DAY_MS;

    setSubscription({
      trialStartedAt: subscription.trialStartedAt || Date.now(),
      paidUntil: nextPaidUntil,
      planType:
        lang === "fr"
          ? `Premium Mensuel (${selectedPlanAmount} ${currency} / mois)`
          : `Monthly Premium (${selectedPlanAmount} ${currency} / mo)`,
      lastPaymentMethod: paymentMethod,
      lastPaymentRef: paymentRef.trim() || `TX-${Date.now().toString().slice(-6)}`,
      payerContact: payerContact.trim(),
    });

    setSubMessage(t.subActivatedMsg(paymentMethod, selectedPlanAmount, currency));
    setPaymentRef("");
    setActiveTab("dashboard");
  };

  const buildWhatsAppConfirmation = (ord) => {
    const cleanPhone = ord.phone.replace(/[^\d]/g, "");
    const text = encodeURIComponent(t.waMsg(ord, formatAmount(ord.total)));
    return cleanPhone ? `https://wa.me/${cleanPhone}?text=${text}` : `https://wa.me/?text=${text}`;
  };

  const buildGoogleCalendarUrl = (ord) => {
    const dateClean = (ord.deliveryDate || todayISO).replace(/-/g, "");
    const timeClean = (ord.deliveryTime || "14:00").replace(":", "") + "00";
    const start = `${dateClean}T${timeClean}`;
    const endHour = String(
      Math.min(23, Number((ord.deliveryTime || "14:00").split(":")[0]) + 1)
    ).padStart(2, "0");
    const endMin = (ord.deliveryTime || "14:00").split(":")[1] || "00";
    const end = `${dateClean}T${endHour}${endMin}00`;

    const title = encodeURIComponent(t.calTitle(ord));
    const details = encodeURIComponent(t.calDetails(ord, formatAmount(ord.total)));
    const location = encodeURIComponent(ord.address || "");

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
  };

  const totalRevenue = orders.reduce((acc, o) => acc + toCleanNumber(o.total), 0);
  const paidAmount = orders
    .filter((o) => o.paymentStatus === "Payé")
    .reduce((acc, o) => acc + toCleanNumber(o.total), 0);
  const pendingPaymentAmount = orders
    .filter((o) => o.paymentStatus !== "Payé")
    .reduce((acc, o) => acc + toCleanNumber(o.total), 0);
  const pendingDeliveries = orders.filter((o) => o.deliveryStatus !== "Livré").length;

  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      ord.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ||
      ord.paymentStatus === statusFilter ||
      ord.deliveryStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const styles = {
    page: {
      minHeight: "100vh",
      width: "100%",
      backgroundColor: palette.bgPage,
      color: palette.text,
      fontFamily: "'Segoe UI', Roboto, Arial, sans-serif",
      paddingBottom: "56px",
      boxSizing: "border-box",
      transition: "background-color 0.2s ease, color 0.2s ease",
    },
    topbar: {
      backgroundColor: palette.bgGreenBar,
      color: palette.text,
      borderBottom: `2px solid ${palette.borderStrong}`,
      padding: "18px 28px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "14px",
    },
    brandTag: {
      display: "inline-block",
      backgroundColor: "#ffffff",
      color: "#0a0a0a",
      fontWeight: 800,
      fontSize: "11px",
      padding: "4px 10px",
      borderRadius: "999px",
      marginBottom: "6px",
      letterSpacing: "0.6px",
      textTransform: "uppercase",
      border: "1px solid #0a0a0a",
    },
    brandTitle: {
      margin: 0,
      fontSize: "24px",
      fontWeight: 900,
      color: palette.text,
      letterSpacing: "0.4px",
    },
    brandSub: {
      margin: "3px 0 0",
      fontSize: "13px",
      fontWeight: 600,
      color: palette.textMuted,
    },
    container: {
      width: "100%",
      padding: "22px 28px 0",
      boxSizing: "border-box",
    },
    navBar: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
      marginBottom: "22px",
      backgroundColor: palette.bgGreenBar,
      padding: "8px",
      borderRadius: "12px",
      border: `1.5px solid ${palette.borderStrong}`,
    },
    navBtn: (active) => ({
      padding: "10px 18px",
      borderRadius: "8px",
      border: `1.5px solid ${palette.borderStrong}`,
      cursor: "pointer",
      fontWeight: 800,
      fontSize: "14px",
      backgroundColor: active ? "#ffffff" : palette.bgGreenTab,
      color: active ? "#0a0a0a" : isDark ? "#ffffff" : "#0a0a0a",
    }),
    kpiGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "16px",
      marginBottom: "24px",
    },
    kpiCard: {
      backgroundColor: palette.bgSurface,
      borderRadius: "12px",
      padding: "20px",
      border: `1.5px solid ${palette.borderStrong}`,
    },
    kpiLabel: {
      fontSize: "13px",
      fontWeight: 700,
      color: palette.textMuted,
      marginBottom: "8px",
    },
    kpiValue: {
      fontSize: "24px",
      fontWeight: 900,
      color: palette.text,
    },
    card: {
      backgroundColor: palette.bgSurface,
      borderRadius: "12px",
      padding: "24px",
      border: `1.5px solid ${palette.borderStrong}`,
      marginBottom: "20px",
    },
    sectionTitle: {
      margin: "0 0 14px",
      fontSize: "18px",
      fontWeight: 800,
      color: palette.text,
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "14px",
    },
    label: {
      display: "block",
      fontSize: "13px",
      marginBottom: "6px",
      fontWeight: 700,
      color: palette.text,
    },
    input: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: "8px",
      border: `1.5px solid ${palette.borderStrong}`,
      fontSize: "14px",
      fontWeight: 600,
      boxSizing: "border-box",
      backgroundColor: palette.bgSubtle,
      color: palette.text,
    },
    textarea: {
      width: "100%",
      minHeight: "130px",
      padding: "12px",
      borderRadius: "8px",
      border: `1.5px solid ${palette.borderStrong}`,
      fontSize: "14px",
      fontWeight: 600,
      boxSizing: "border-box",
      fontFamily: "inherit",
      backgroundColor: palette.bgSubtle,
      color: palette.text,
    },
    primaryBtn: {
      backgroundColor: palette.btnPrimaryBg,
      color: palette.btnPrimaryText,
      border: `1.5px solid ${palette.borderStrong}`,
      padding: "11px 18px",
      borderRadius: "8px",
      fontWeight: 800,
      fontSize: "14px",
      cursor: "pointer",
    },
    secondaryBtn: {
      backgroundColor: palette.btnSecondaryBg,
      color: palette.btnSecondaryText,
      border: `1.5px solid ${palette.borderStrong}`,
      padding: "11px 18px",
      borderRadius: "8px",
      fontWeight: 800,
      fontSize: "14px",
      cursor: "pointer",
    },
    ghostBtn: {
      backgroundColor: "#ffffff",
      color: "#0a0a0a",
      border: "1.5px solid #0a0a0a",
      padding: "8px 12px",
      borderRadius: "8px",
      fontWeight: 700,
      fontSize: "13px",
      cursor: "pointer",
      textDecoration: "none",
      display: "inline-block",
    },
    badge: {
      display: "inline-block",
      padding: "3px 9px",
      borderRadius: "999px",
      fontSize: "12px",
      fontWeight: 800,
      border: `1px solid ${palette.borderStrong}`,
      backgroundColor: palette.bgGreenBar,
      color: isDark ? "#ffffff" : "#0a0a0a",
    },
    emptyBox: {
      textAlign: "center",
      padding: "40px 20px",
      border: `1.5px dashed ${palette.borderStrong}`,
      borderRadius: "10px",
      color: palette.textMuted,
      backgroundColor: palette.bgSubtle,
    },
  };

  const estimatedTotal =
    Math.max(1, toCleanNumber(newOrder.quantity) || 1) * toCleanNumber(newOrder.unitPrice);

  return (
    <div style={styles.page}>
      <header style={styles.topbar}>
        <div>
          <span style={styles.brandTag}>
            {isSubscriptionActive
              ? t.subStatusActiveLabel(subscription.planType, daysRemaining)
              : t.subStatusExpiredLabel}
          </span>
          <h1 style={styles.brandTitle}>ORDER GENDA</h1>
          <p style={styles.brandSub}>{t.subHeader}</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => setLang((prev) => (prev === "fr" ? "en" : "fr"))}
            style={styles.secondaryBtn}
            aria-label="Language switcher"
          >
            {lang === "fr" ? "FR → EN" : "EN → FR"}
          </button>

          <button
            onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
            style={styles.secondaryBtn}
          >
            {isDark ? t.lightMode : t.darkMode}
          </button>

          <button onClick={() => setActiveTab("subscription")} style={styles.primaryBtn}>
            {isSubscriptionActive ? t.subButtonActive(daysRemaining) : t.subButtonExpired}
          </button>

          <select
            aria-label="Currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            style={{
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1.5px solid #0a0a0a",
              fontWeight: 800,
              backgroundColor: "#ffffff",
              color: "#0a0a0a",
            }}
          >
            <option value="RWF">RWF</option>
            <option value="FCFA">FCFA</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>

          <button onClick={handleResetWorkspace} style={styles.ghostBtn}>
            {t.clearAll}
          </button>
        </div>
      </header>

      <main style={styles.container}>
        <nav style={styles.navBar}>
          <button style={styles.navBtn(activeTab === "dashboard")} onClick={() => setActiveTab("dashboard")}>
            {t.tabDashboard}
          </button>
          <button style={styles.navBtn(activeTab === "whatsapp")} onClick={() => setActiveTab("whatsapp")}>
            {t.tabWhatsApp}
          </button>
          <button style={styles.navBtn(activeTab === "new-order")} onClick={() => setActiveTab("new-order")}>
            {t.tabNewOrder}
          </button>
          <button style={styles.navBtn(activeTab === "orders")} onClick={() => setActiveTab("orders")}>
            {t.tabOrders(orders.length)}
          </button>
          <button
            style={styles.navBtn(activeTab === "subscription")}
            onClick={() => setActiveTab("subscription")}
          >
            {t.tabSubscription}
          </button>
        </nav>

        {subMessage && (
          <div
            style={{
              marginBottom: "18px",
              padding: "12px 16px",
              borderRadius: "10px",
              border: `1.5px solid ${palette.borderStrong}`,
              backgroundColor: palette.bgSurface,
              fontSize: "14px",
              fontWeight: 700,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span>{subMessage}</span>
            <button style={styles.ghostBtn} onClick={() => setSubMessage("")}>
              {t.closeBtn}
            </button>
          </div>
        )}

        {parseFeedback && (
          <div
            style={{
              marginBottom: "18px",
              padding: "12px 16px",
              borderRadius: "10px",
              border: `1.5px solid ${palette.borderStrong}`,
              backgroundColor: palette.bgSurface,
              fontSize: "14px",
              fontWeight: 700,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span>{parseFeedback}</span>
            <button style={styles.ghostBtn} onClick={() => setParseFeedback("")}>
              {t.closeBtn}
            </button>
          </div>
        )}

        {!isSubscriptionActive && activeTab !== "subscription" && (
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>{t.expiredBannerTitle}</h2>
            <p style={{ fontSize: "14px", fontWeight: 600, color: palette.textMuted }}>
              {t.expiredBannerText(currency)}
            </p>
            <button style={styles.primaryBtn} onClick={() => setActiveTab("subscription")}>
              {t.expiredBannerBtn}
            </button>
          </div>
        )}

        <section style={styles.kpiGrid}>
          <div style={styles.kpiCard}>
            <div style={styles.kpiLabel}>{t.kpiTotal}</div>
            <div style={styles.kpiValue}>{formatAmount(totalRevenue)}</div>
          </div>
          <div style={styles.kpiCard}>
            <div style={styles.kpiLabel}>{t.kpiPaid}</div>
            <div style={styles.kpiValue}>{formatAmount(paidAmount)}</div>
          </div>
          <div style={styles.kpiCard}>
            <div style={styles.kpiLabel}>{t.kpiPending}</div>
            <div style={styles.kpiValue}>{formatAmount(pendingPaymentAmount)}</div>
          </div>
          <div style={styles.kpiCard}>
            <div style={styles.kpiLabel}>{t.kpiSubDays}</div>
            <div style={styles.kpiValue}>{t.daysSuffix(daysRemaining)}</div>
          </div>
        </section>

        {activeTab === "subscription" && (
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>{t.subTitle}</h2>
            <p style={{ fontSize: "14px", fontWeight: 600, color: palette.textMuted, marginTop: 0 }}>
              {t.subDesc(DEVELOPER_CONFIG.name)}
            </p>

            <div
              style={{
                padding: "14px 16px",
                borderRadius: "10px",
                backgroundColor: palette.bgSubtle,
                border: `1.5px solid ${palette.borderStrong}`,
                marginBottom: "18px",
                fontSize: "13px",
                fontWeight: 700,
              }}
            >
              <div>{t.subStatusLine(isSubscriptionActive, daysRemaining)}</div>
              <div style={{ marginTop: "4px" }}>
                {t.devNumbersLine(DEVELOPER_CONFIG.mtnMomoNumber, DEVELOPER_CONFIG.airtelMoneyNumber)}
              </div>
              <div style={{ marginTop: "4px", fontWeight: 600 }}>{DEVELOPER_CONFIG.cardNote}</div>
            </div>

            <form onSubmit={handleConfirmSubscriptionPayment}>
              <div style={styles.formGrid}>
                <div>
                  <label style={styles.label}>{t.monthlyAmountLabel(currency)}</label>
                  <select
                    value={selectedPlanAmount}
                    onChange={(e) => setSelectedPlanAmount(Number(e.target.value))}
                    style={styles.input}
                  >
                    <option value={200}>{t.planOption(200, currency)}</option>
                    <option value={250}>{t.planOption(250, currency)}</option>
                    <option value={300}>{t.planOption(300, currency)}</option>
                  </select>
                </div>

                <div>
                  <label style={styles.label}>{t.paymentMethodLabel}</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={styles.input}
                  >
                    <option value="MTN MoMo">MTN MoMo</option>
                    <option value="Airtel Money">Airtel Money</option>
                    <option value="Carte bancaire">
                      {lang === "fr" ? "Carte bancaire" : "Bank card"}
                    </option>
                  </select>
                </div>

                <div>
                  <label style={styles.label}>
                    {paymentMethod === "Carte bancaire"
                      ? t.payerCardPlaceholder
                      : t.payerPhonePlaceholder}
                  </label>
                  <input
                    type="text"
                    placeholder={
                      paymentMethod === "Carte bancaire"
                        ? t.payerCardInputPlaceholder
                        : t.payerPhoneInputPlaceholder
                    }
                    value={payerContact}
                    onChange={(e) => setPayerContact(e.target.value)}
                    style={styles.input}
                  />
                </div>

                <div>
                  <label style={styles.label}>{t.paymentRefLabel}</label>
                  <input
                    type="text"
                    placeholder={t.paymentRefPlaceholder}
                    value={paymentRef}
                    onChange={(e) => setPaymentRef(e.target.value)}
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={{ marginTop: "18px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button type="submit" style={styles.primaryBtn}>
                  {t.confirmSubBtn(selectedPlanAmount, currency)}
                </button>
                <button type="button" style={styles.ghostBtn} onClick={handleSimulateTrialEnd}>
                  {t.simulateEndBtn}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "dashboard" && (
          <div style={styles.card}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <h2 style={{ ...styles.sectionTitle, margin: 0 }}>{t.recentTitle}</h2>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button style={styles.primaryBtn} onClick={() => setActiveTab("whatsapp")}>
                  {t.importWhatsAppBtn}
                </button>
                <button style={styles.secondaryBtn} onClick={() => setActiveTab("new-order")}>
                  {t.manualEntryBtn}
                </button>
              </div>
            </div>

            {orders.length === 0 ? (
              <div style={styles.emptyBox}>
                <p style={{ margin: "0 0 10px", fontWeight: 800, fontSize: "16px", color: palette.text }}>
                  {t.emptyDashboardTitle}
                </p>
                <p style={{ margin: "0 0 18px", fontSize: "14px", fontWeight: 600 }}>
                  {t.emptyDashboardText}
                </p>
                <button style={styles.primaryBtn} onClick={() => setActiveTab("whatsapp")}>
                  {t.pasteWhatsAppBtn}
                </button>
              </div>
            ) : (
              <div style={{ display: "grid", gap: "12px" }}>
                {orders.slice(0, 6).map((ord) => (
                  <div
                    key={ord.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "14px 16px",
                      border: `1.5px solid ${palette.borderStrong}`,
                      borderRadius: "10px",
                      backgroundColor: palette.bgSubtle,
                      flexWrap: "wrap",
                      gap: "12px",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "15px" }}>
                        {t.scheduledAt(ord.deliveryDate, ord.deliveryTime)} · {ord.clientName} —{" "}
                        {ord.product} (x{ord.quantity})
                      </div>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: palette.textMuted, marginTop: "4px" }}>
                        {ord.id}
                        {ord.phone ? ` · ${t.phoneShort} : ${ord.phone}` : ""}
                        {ord.address ? ` · ${t.addressShort} : ${ord.address}` : ""}
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontWeight: 900, fontSize: "15px" }}>{formatAmount(ord.total)}</div>
                        <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end", marginTop: "4px" }}>
                          <span style={styles.badge}>{ord.paymentStatus}</span>
                          <span style={styles.badge}>{ord.deliveryStatus}</span>
                        </div>
                      </div>
                      <a
                        href={buildGoogleCalendarUrl(ord)}
                        target="_blank"
                        rel="noreferrer"
                        style={styles.ghostBtn}
                      >
                        {t.addToCalendar}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "whatsapp" && (
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>{t.whatsappTitle}</h2>
            <p style={{ fontSize: "14px", fontWeight: 600, color: palette.textMuted, marginTop: 0 }}>
              {t.whatsappDesc}
            </p>
            <textarea
              placeholder={t.whatsappPlaceholder}
              value={rawWhatsAppText}
              onChange={(e) => setRawWhatsAppText(e.target.value)}
              style={styles.textarea}
            />
            <div style={{ marginTop: "14px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button style={styles.primaryBtn} onClick={() => handleParseWhatsApp(false)}>
                {t.verifyBeforeSave}
              </button>
              <button style={styles.secondaryBtn} onClick={() => handleParseWhatsApp(true)}>
                {t.addDirect1Click}
              </button>
              {rawWhatsAppText && (
                <button style={styles.ghostBtn} onClick={() => setRawWhatsAppText("")}>
                  {t.clearText}
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === "new-order" && (
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>{t.newOrderTitle}</h2>
            <form onSubmit={handleAddOrder}>
              <div style={styles.formGrid}>
                <div>
                  <label style={styles.label}>{t.clientNameLabel}</label>
                  <input
                    type="text"
                    name="clientName"
                    placeholder={t.clientNamePlaceholder}
                    value={newOrder.clientName}
                    onChange={handleOrderFieldChange}
                    required
                    style={styles.input}
                  />
                </div>

                <div>
                  <label style={styles.label}>{t.phoneLabel}</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder={t.phonePlaceholder}
                    value={newOrder.phone}
                    onChange={handleOrderFieldChange}
                    style={styles.input}
                  />
                </div>

                <div>
                  <label style={styles.label}>{t.productLabel}</label>
                  <input
                    type="text"
                    name="product"
                    placeholder={t.productPlaceholder}
                    value={newOrder.product}
                    onChange={handleOrderFieldChange}
                    required
                    style={styles.input}
                  />
                </div>

                <div>
                  <label style={styles.label}>{t.quantityLabel}</label>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={newOrder.quantity}
                    onChange={handleOrderFieldChange}
                    style={styles.input}
                  />
                </div>

                <div>
                  <label style={styles.label}>{t.unitPriceLabel(currency)}</label>
                  <input
                    type="number"
                    name="unitPrice"
                    min="0"
                    placeholder="0"
                    value={newOrder.unitPrice}
                    onChange={handleOrderFieldChange}
                    style={styles.input}
                  />
                </div>

                <div>
                  <label style={styles.label}>{t.dateLabel}</label>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={newOrder.deliveryDate}
                    onChange={handleOrderFieldChange}
                    style={styles.input}
                  />
                </div>

                <div>
                  <label style={styles.label}>{t.timeLabel}</label>
                  <input
                    type="time"
                    name="deliveryTime"
                    value={newOrder.deliveryTime}
                    onChange={handleOrderFieldChange}
                    style={styles.input}
                  />
                </div>

                <div>
                  <label style={styles.label}>{t.addressLabel}</label>
                  <input
                    type="text"
                    name="address"
                    placeholder={t.addressPlaceholder}
                    value={newOrder.address}
                    onChange={handleOrderFieldChange}
                    style={styles.input}
                  />
                </div>

                <div>
                  <label style={styles.label}>{t.paymentLabel}</label>
                  <select
                    name="paymentStatus"
                    value={newOrder.paymentStatus}
                    onChange={handleOrderFieldChange}
                    style={styles.input}
                  >
                    <option value="En attente">{t.payPending}</option>
                    <option value="Acompte">{t.payDeposit}</option>
                    <option value="Payé">{t.payPaid}</option>
                  </select>
                </div>

                <div>
                  <label style={styles.label}>{t.deliveryLabel}</label>
                  <select
                    name="deliveryStatus"
                    value={newOrder.deliveryStatus}
                    onChange={handleOrderFieldChange}
                    style={styles.input}
                  >
                    <option value="À préparer">{t.delPrep}</option>
                    <option value="En livraison">{t.delShip}</option>
                    <option value="Livré">{t.delDone}</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: "14px" }}>
                <label style={styles.label}>{t.notesLabel}</label>
                <input
                  type="text"
                  name="notes"
                  placeholder={t.notesPlaceholder}
                  value={newOrder.notes}
                  onChange={handleOrderFieldChange}
                  style={styles.input}
                />
              </div>

              <div
                style={{
                  marginTop: "18px",
                  paddingTop: "14px",
                  borderTop: `1.5px solid ${palette.borderStrong}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <div style={{ fontSize: "16px", fontWeight: 900 }}>
                  {t.totalCalculated(
                    Math.max(1, toCleanNumber(newOrder.quantity) || 1),
                    formatAmount(newOrder.unitPrice),
                    formatAmount(estimatedTotal)
                  )}
                </div>
                <button type="submit" style={styles.primaryBtn}>
                  {t.saveOrderBtn}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "orders" && (
          <div style={styles.card}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <h2 style={{ ...styles.sectionTitle, margin: 0 }}>{t.ordersListTitle}</h2>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ ...styles.input, width: "220px" }}
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{ ...styles.input, width: "190px" }}
                >
                  <option value="ALL">{t.allStatuses}</option>
                  <option value="En attente">{t.filterPayPending}</option>
                  <option value="Acompte">{t.filterPayDeposit}</option>
                  <option value="Payé">{t.filterPayPaid}</option>
                  <option value="À préparer">{t.filterDelPrep}</option>
                  <option value="En livraison">{t.filterDelShip}</option>
                  <option value="Livré">{t.filterDelDone}</option>
                </select>
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div style={styles.emptyBox}>{t.emptyOrdersList}</div>
            ) : (
              <div style={{ display: "grid", gap: "12px" }}>
                {filteredOrders.map((ord) => (
                  <div
                    key={ord.id}
                    style={{
                      border: `1.5px solid ${palette.borderStrong}`,
                      borderRadius: "10px",
                      padding: "16px",
                      backgroundColor: palette.bgSubtle,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "12px",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: 800, color: palette.textMuted, marginBottom: "4px" }}>
                        {t.scheduledAt(ord.deliveryDate, ord.deliveryTime)} · {ord.id}
                      </div>
                      <div style={{ fontWeight: 800, fontSize: "16px" }}>
                        {ord.clientName} — {ord.product} (x{ord.quantity})
                      </div>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: palette.textMuted, marginTop: "4px" }}>
                        {t.unitPriceShort} : {formatAmount(ord.unitPrice)} · {t.totalShort} :{" "}
                        <strong style={{ color: palette.text }}>{formatAmount(ord.total)}</strong>
                        {ord.phone ? ` · ${t.phoneShort} : ${ord.phone}` : ""}
                        {ord.address ? ` · ${t.addressShort} : ${ord.address}` : ""}
                      </div>
                      {ord.notes && (
                        <div style={{ fontSize: "12px", fontWeight: 600, color: palette.textMuted, marginTop: "4px" }}>
                          {t.noteShort} : {ord.notes}
                        </div>
                      )}
                    </div>

                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                      <select
                        value={ord.paymentStatus}
                        onChange={(e) => handleStatusChange(ord.id, "paymentStatus", e.target.value)}
                        style={{
                          padding: "8px",
                          borderRadius: "8px",
                          border: `1.5px solid ${palette.borderStrong}`,
                          backgroundColor: palette.bgSurface,
                          color: palette.text,
                          fontWeight: 700,
                          fontSize: "13px",
                        }}
                      >
                        <option value="En attente">{t.payPending}</option>
                        <option value="Acompte">{t.payDeposit}</option>
                        <option value="Payé">{t.payPaid}</option>
                      </select>

                      <select
                        value={ord.deliveryStatus}
                        onChange={(e) => handleStatusChange(ord.id, "deliveryStatus", e.target.value)}
                        style={{
                          padding: "8px",
                          borderRadius: "8px",
                          border: `1.5px solid ${palette.borderStrong}`,
                          backgroundColor: palette.bgSurface,
                          color: palette.text,
                          fontWeight: 700,
                          fontSize: "13px",
                        }}
                      >
                        <option value="À préparer">{t.delPrep}</option>
                        <option value="En livraison">{t.delShip}</option>
                        <option value="Livré">{t.delDone}</option>
                      </select>

                      <a
                        href={buildGoogleCalendarUrl(ord)}
                        target="_blank"
                        rel="noreferrer"
                        style={styles.ghostBtn}
                      >
                        {t.addToCalendar}
                      </a>

                      <a
                        href={buildWhatsAppConfirmation(ord)}
                        target="_blank"
                        rel="noreferrer"
                        style={styles.ghostBtn}
                      >
                        {t.replyWhatsApp}
                      </a>

                      <button
                        onClick={() => handleDeleteOrder(ord.id)}
                        style={{
                          ...styles.ghostBtn,
                          color: palette.dangerText,
                          backgroundColor: palette.dangerBg,
                          borderColor: palette.dangerBorder,
                        }}
                      >
                        {t.deleteBtn}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}