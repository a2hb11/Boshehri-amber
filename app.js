/* Boshehri Amber — front end only.
   Cart, favorites, language, currency and theme live in this browser (localStorage). The login is a demo.
   Things you may want to edit are marked with  >>> EDIT  */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var page = document.body.getAttribute('data-page');
  var PER_PAGE = 8;
  var GIFT = 2.5;                       // >>> EDIT  gift box & card price in KWD
  var WA = '96560643311';               // >>> EDIT  WhatsApp number, country code first, no + or spaces

  /* ---------- currencies (1 KWD = rate) ---------- */
  // >>> EDIT  rates are approximate; update them now and then. KWD stays the real price.
  var CUR = {
    KWD: { rate: 1,     dec: 3, en: 'KWD', ar: 'د.ك' },
    SAR: { rate: 12.23, dec: 2, en: 'SAR', ar: 'ر.س' },
    AED: { rate: 11.97, dec: 2, en: 'AED', ar: 'د.إ' },
    QAR: { rate: 11.87, dec: 2, en: 'QAR', ar: 'ر.ق' },
    BHD: { rate: 1.227, dec: 3, en: 'BHD', ar: 'د.ب' },
    OMR: { rate: 1.254, dec: 3, en: 'OMR', ar: 'ر.ع' },
    USD: { rate: 3.26,  dec: 2, en: 'USD', ar: 'دولار' },
    IQD: { rate: 4270,  dec: 0, en: 'IQD', ar: 'د.ع' }
  };

  var T = {
    en: {
      home: 'Home', login: 'Log in', account: 'My account', cartfav: 'My cart & favorites', order: 'Order summary',
      tagline: 'Hand-picked amber misbah, from Kuwait to the Gulf.', kicker: 'Kuwait · Gulf · worldwide',
      heroTitle: 'Amber misbah, chosen one by one.', heroShop: 'Shop misbah', heroGift: 'Gift box & card',
      count: '{n} misbah', sample: 'Sample items', sortBy: 'Sort by', sNew: 'Newest first', sOld: 'Oldest first', sCheap: 'Price: low to high', sExp: 'Price: high to low',
      priceNote: 'Prices are set in KWD. Other currencies are approximate.',
      photo: 'Photo coming', newTag: 'New', add: 'Add to cart', added: 'Added ✓', gift: 'Gift box & card · +{p}', giftOn: 'Gift box added · +{p}',
      beads: '{n} beads', beadSize: '{n} mm beads', beadsL: 'Beads', sizeL: 'Bead size', details: 'Details',
      favorites: 'Favorites', favSub: 'Misbah you saved with the heart.', favEmpty: 'No favorites yet. Tap the heart on any misbah to save it here.', saved: '{n} saved',
      giftTitle: 'Gift box and card', giftText: 'Any misbah can be prepared in a gift box with a card for <b>{p}</b>. Add it to a single misbah from its card, or to your whole order here.',
      giftAll: 'Add gift box & card to my order · +{p}', giftAllOn: 'Gift box & card added to my order ✓', giftShort: 'Gift +{p}', giftShortOn: 'Gift added ✓',
      faq: 'Delivery & FAQ', faqSub: 'Quick answers before you order.',
      q1: 'How do I order?', a1: 'Add misbah to your cart, then press Checkout. Your order is sent to us on WhatsApp and we confirm everything with you there.',
      q2: 'Delivery inside Kuwait', a2: '[Delivery time] · [Delivery price] — fill this in.',
      q3: 'Delivery to the Gulf and Iraq', a3: '[Countries, delivery time and price] — fill this in.',
      q4: 'Payment', a4: 'Payment is agreed on WhatsApp after we confirm your order. The accepted methods are listed below.',
      q5: 'Returns & exchanges', a5: '[Your return and exchange policy] — fill this in.',
      q6: 'Are the photos real?', a6: 'Items marked “Sample items” are placeholders. Real photos are being added one by one.',
      contact: 'Contact', contactSub: 'All kinds of buyers are welcome, in Kuwait or the Gulf.', call: 'Call us', wa: 'WhatsApp',
      payments: 'Payment methods', paySub: 'Accepted in Kuwait and the Gulf.',
      knet: 'KNET', visa: 'Visa', mc: 'Mastercard', apay: 'Apple Pay', gpay: 'Google Pay', tabby: 'Tabby', deema: 'Deema', bank: 'Bank transfer', cash: 'Cash on delivery',
      copy: '© 2026 Boshehri Amber · Kuwait', demo: 'Version two · accounts, cart and orders saved',
      menu: 'Menu', shop: 'Shop', allMisbah: 'All misbah', savedItems: 'Saved items', cart: 'Cart', yourItems: 'Your items',
      settings: 'Settings', language: 'Language', currency: 'Currency', appearance: 'Appearance', light: 'Light', dark: 'Dark', install: 'Install app', installSub: 'Add to home screen',
      total: 'Total', checkout: 'Checkout', cartNote: 'Checkout opens an order summary that you send to us on WhatsApp. No payment is taken online.',
      cartEmpty: 'Your cart is empty.', remove: 'Remove', giftLine: 'Gift box & card × {n}', each: '{p} each', addGift: 'Add gift box +{p}', giftAdded: 'Gift added',
      loginHint: 'Your cart, favorites and orders follow you to any device.', secureB: 'Your account is protected by Supabase Auth.',
      secureT: 'Your password is encrypted before it is stored — the shop never sees it. Your cart, favorites, currency and orders are saved to your account.', fullName: 'Your name', phName: 'e.g. Ali', signIn: 'Log in', signup: 'Create account', createAcct: 'Create account', shortPass: 'Password must be at least 6 characters.', checkEmail: 'Account created ✓ Check your email for the confirmation link, then log in.', badLogin: 'Wrong email or password.', exists: 'This email already has an account — log in instead.', confirmFirst: 'Please confirm your email first (check your inbox).', authErr: 'Something went wrong. Please try again.', noDb: 'The account service is not reachable right now.', orders: 'My orders', noOrders: 'No orders yet.', emailL: 'Email',
      email: 'Email', password: 'Password', phEmail: 'you@example.com', phPass: 'at least 6 characters', err: 'Please type an email and a password.', enter: 'Enter the members area',
      membersArea: 'Members area', welcome: 'Welcome, {n} — you’re logged in.',
      acctSub: 'This is your account page. Your cart and favorites from the shop are summarised below; the shop itself is under Home.',
      statCart: 'items in your cart', statFavs: 'favorites saved', statTotal: 'cart total', openCart: 'Open my cart & favorites', keep: 'Keep shopping',
      acctNote: 'Your cart, favorites, currency, language and orders are saved to this account and follow you to any device.',
      logout: 'Log out', hi: 'Hi {n}. Everything you’ve picked, in one place.', addMore: 'Add more', ask: 'To ask about an item',
      orderNo: 'Order', name: 'Name', sendWa: 'Send order on WhatsApp', sent: 'Order sent ✓ We’ll reply to you on WhatsApp.', back: 'Back to shop',
      orderNote: 'The order is saved to your account and sent to the shop as a WhatsApp message. Payment and delivery are agreed there.', orderEmpty: 'Your cart is empty — add a misbah first.', inKwd: 'in KWD',
      desc: 'Natural amber beads, hand-strung with a matching tassel. Sample description — the real details for this misbah will be added with its photos.',
      share: 'Share', copied: 'Link copied', addedToast: 'Added to cart', favOn: 'Saved to favorites', favOff: 'Removed from favorites',
      installIos: 'On iPhone or iPad: tap Share, then “Add to Home Screen”.', installNa: 'Open this site in Chrome or Safari on your phone to install it.', installed: 'App installed ✓',
      prev: 'Previous page', next: 'Next page', toTop: 'Back to top', close: 'Close', item: 'Amber Misbah',
      waHello: 'Hello Boshehri Amber 👋', waOrder: 'Order', waName: 'Name', waGift: 'gift box',
      weight: '{n} g', weightL: 'Weight', delivery: 'Delivery', deliveryNote: 'Delivery is added at checkout: 3 KWD inside Kuwait, 10 KWD to the Gulf and Iraq.',
      shipTitle: 'Delivery details', country: 'Country', city: 'City / area', address: 'Address', phone: 'Phone (WhatsApp)', phAddress: 'Block, street, house or building, floor, apartment…', phCity: 'e.g. Salmiya', phPhone: '+965 …', needAddress: 'Please choose a country and type your address.', saveAddr: 'Saved to your account for next time.',
      KW: 'Kuwait', SA: 'Saudi Arabia', AE: 'United Arab Emirates', QA: 'Qatar', BH: 'Bahrain', OM: 'Oman', IQ: 'Iraq',
      google: 'Continue with Google', apple: 'Continue with Apple', orSep: 'or', oauthOff: 'This sign-in method is not switched on yet — use email for now.', waAddress: 'Address', waPhone: 'Phone', subtotal: 'Items'
    },
    ar: {
      home: 'الرئيسية', login: 'تسجيل الدخول', account: 'حسابي', cartfav: 'سلتي ومفضلتي', order: 'ملخص الطلب',
      tagline: 'مسابيح عنبر مختارة بعناية، من الكويت إلى الخليج.', kicker: 'الكويت · الخليج · العالم',
      heroTitle: 'مسابيح عنبر، مختارة حبةً حبة.', heroShop: 'تسوّق المسابيح', heroGift: 'علبة هدية وكرت',
      count: '{n} مسبحة', sample: 'عناصر تجريبية', sortBy: 'ترتيب حسب', sNew: 'الأحدث أولاً', sOld: 'الأقدم أولاً', sCheap: 'السعر: من الأقل إلى الأعلى', sExp: 'السعر: من الأعلى إلى الأقل',
      priceNote: 'الأسعار محددة بالدينار الكويتي. العملات الأخرى تقريبية.',
      photo: 'الصورة قريباً', newTag: 'جديد', add: 'أضف إلى السلة', added: 'أُضيف ✓', gift: 'علبة هدية وكرت · +{p}', giftOn: 'أُضيفت علبة الهدية · +{p}',
      beads: '{n} حبة', beadSize: 'حبات {n} مم', beadsL: 'الحبات', sizeL: 'حجم الحبة', details: 'التفاصيل',
      favorites: 'المفضلة', favSub: 'المسابيح التي حفظتها بالقلب.', favEmpty: 'لا توجد مفضلات بعد. اضغط القلب على أي مسبحة لحفظها هنا.', saved: '{n} محفوظة',
      giftTitle: 'علبة هدية وكرت', giftText: 'يمكن تجهيز أي مسبحة في علبة هدية مع كرت مقابل <b>{p}</b>. أضفها لمسبحة واحدة من كرتها، أو لطلبك كاملاً من هنا.',
      giftAll: 'أضف علبة هدية وكرت لطلبي · +{p}', giftAllOn: 'أُضيفت علبة الهدية والكرت لطلبي ✓', giftShort: 'هدية +{p}', giftShortOn: 'أُضيفت الهدية ✓',
      faq: 'التوصيل والأسئلة الشائعة', faqSub: 'إجابات سريعة قبل أن تطلب.',
      q1: 'كيف أطلب؟', a1: 'أضف المسابيح إلى السلة ثم اضغط إتمام الطلب. يُرسل طلبك إلينا عبر واتساب ونؤكد كل شيء معك هناك.',
      q2: 'التوصيل داخل الكويت', a2: '[مدة التوصيل] · [سعر التوصيل] — أكمل هذا.',
      q3: 'التوصيل إلى الخليج والعراق', a3: '[الدول ومدة التوصيل والسعر] — أكمل هذا.',
      q4: 'الدفع', a4: 'يُتفق على الدفع عبر واتساب بعد تأكيد طلبك. طرق الدفع المقبولة مذكورة أدناه.',
      q5: 'الاستبدال والاسترجاع', a5: '[سياسة الاستبدال والاسترجاع] — أكمل هذا.',
      q6: 'هل الصور حقيقية؟', a6: 'العناصر المعلَّمة «عناصر تجريبية» مؤقتة. تتم إضافة الصور الحقيقية واحدة بعد الأخرى.',
      contact: 'تواصل معنا', contactSub: 'نرحب بجميع المشترين، في الكويت أو الخليج.', call: 'اتصل بنا', wa: 'واتساب',
      payments: 'طرق الدفع', paySub: 'مقبولة في الكويت والخليج.',
      knet: 'كي نت', visa: 'فيزا', mc: 'ماستركارد', apay: 'آبل باي', gpay: 'جوجل باي', tabby: 'تابي', deema: 'ديما', bank: 'تحويل بنكي', cash: 'الدفع عند الاستلام',
      copy: '© 2026 Boshehri Amber · الكويت', demo: 'النسخة الثانية · الحسابات والسلة والطلبات محفوظة',
      menu: 'القائمة', shop: 'المتجر', allMisbah: 'كل المسابيح', savedItems: 'العناصر المحفوظة', cart: 'السلة', yourItems: 'عناصرك',
      settings: 'الإعدادات', language: 'اللغة', currency: 'العملة', appearance: 'المظهر', light: 'فاتح', dark: 'داكن', install: 'تثبيت التطبيق', installSub: 'أضف إلى الشاشة الرئيسية',
      total: 'الإجمالي', checkout: 'إتمام الطلب', cartNote: 'إتمام الطلب يفتح ملخصاً ترسله إلينا عبر واتساب. لا يُدفع أي مبلغ عبر الموقع.',
      cartEmpty: 'سلتك فارغة.', remove: 'إزالة', giftLine: 'علبة هدية وكرت × {n}', each: '{p} للواحدة', addGift: 'أضف علبة هدية +{p}', giftAdded: 'أُضيفت الهدية',
      loginHint: 'سلتك ومفضلتك وطلباتك تتبعك إلى أي جهاز.', secureB: 'حسابك محمي بواسطة Supabase Auth.',
      secureT: 'كلمة مرورك تُشفَّر قبل حفظها — المتجر لا يراها أبداً. تُحفظ سلتك ومفضلتك وعملتك وطلباتك في حسابك.', fullName: 'اسمك', phName: 'مثال: علي', signIn: 'تسجيل الدخول', signup: 'إنشاء حساب', createAcct: 'إنشاء حساب', shortPass: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل.', checkEmail: 'تم إنشاء الحساب ✓ افتح بريدك واضغط رابط التأكيد، ثم سجّل الدخول.', badLogin: 'البريد أو كلمة المرور غير صحيحة.', exists: 'هذا البريد لديه حساب بالفعل — سجّل الدخول.', confirmFirst: 'الرجاء تأكيد بريدك أولاً (تحقق من صندوق الوارد).', authErr: 'حدث خطأ. حاول مرة أخرى.', noDb: 'خدمة الحسابات غير متاحة حالياً.', orders: 'طلباتي', noOrders: 'لا توجد طلبات بعد.', emailL: 'البريد الإلكتروني',
      email: 'البريد الإلكتروني', password: 'كلمة المرور', phEmail: 'you@example.com', phPass: '6 أحرف على الأقل', err: 'الرجاء كتابة بريد إلكتروني وكلمة مرور.', enter: 'ادخل منطقة الأعضاء',
      membersArea: 'منطقة الأعضاء', welcome: 'أهلاً {n} — تم تسجيل دخولك.',
      acctSub: 'هذه صفحة حسابك. سلتك ومفضلتك من المتجر ملخّصة أدناه؛ المتجر نفسه في الرئيسية.',
      statCart: 'عناصر في سلتك', statFavs: 'مفضلات محفوظة', statTotal: 'إجمالي السلة', openCart: 'افتح سلتي ومفضلتي', keep: 'تابع التسوق',
      acctNote: 'تُحفظ سلتك ومفضلتك وعملتك ولغتك وطلباتك في هذا الحساب وتتبعك إلى أي جهاز.',
      logout: 'تسجيل الخروج', hi: 'أهلاً {n}. كل ما اخترته في مكان واحد.', addMore: 'أضف المزيد', ask: 'للاستفسار عن عنصر',
      orderNo: 'طلب رقم', name: 'الاسم', sendWa: 'أرسل الطلب عبر واتساب', sent: 'تم إرسال الطلب ✓ سنرد عليك عبر واتساب.', back: 'العودة للمتجر',
      orderNote: 'يُحفظ الطلب في حسابك ويُرسل إلى المتجر كرسالة واتساب. يُتفق على الدفع والتوصيل هناك.', orderEmpty: 'سلتك فارغة — أضف مسبحة أولاً.', inKwd: 'بالدينار الكويتي',
      desc: 'حبات عنبر طبيعية مرصوفة يدوياً مع شرّابة مناسبة. وصف تجريبي — ستُضاف التفاصيل الحقيقية لهذه المسبحة مع صورها.',
      share: 'مشاركة', copied: 'تم نسخ الرابط', addedToast: 'أُضيفت إلى السلة', favOn: 'حُفظت في المفضلة', favOff: 'أُزيلت من المفضلة',
      installIos: 'على الآيفون أو الآيباد: اضغط مشاركة ثم «إضافة إلى الشاشة الرئيسية».', installNa: 'افتح الموقع في كروم أو سفاري على هاتفك لتثبيته.', installed: 'تم تثبيت التطبيق ✓',
      prev: 'الصفحة السابقة', next: 'الصفحة التالية', toTop: 'العودة للأعلى', close: 'إغلاق', item: 'مسبحة عنبر',
      waHello: 'مرحباً Boshehri Amber 👋', waOrder: 'طلب رقم', waName: 'الاسم', waGift: 'علبة هدية',
      weight: '{n} غ', weightL: 'الوزن', delivery: 'التوصيل', deliveryNote: 'يُضاف التوصيل عند إتمام الطلب: 3 د.ك داخل الكويت، 10 د.ك إلى الخليج والعراق.',
      shipTitle: 'بيانات التوصيل', country: 'الدولة', city: 'المدينة / المنطقة', address: 'العنوان', phone: 'الهاتف (واتساب)', phAddress: 'القطعة، الشارع، المنزل أو المبنى، الطابق، الشقة…', phCity: 'مثال: السالمية', phPhone: '+965 …', needAddress: 'الرجاء اختيار الدولة وكتابة العنوان.', saveAddr: 'حُفظ في حسابك للمرة القادمة.',
      KW: 'الكويت', SA: 'السعودية', AE: 'الإمارات', QA: 'قطر', BH: 'البحرين', OM: 'عُمان', IQ: 'العراق',
      google: 'المتابعة بحساب Google', apple: 'المتابعة بحساب Apple', orSep: 'أو', oauthOff: 'طريقة الدخول هذه غير مفعّلة بعد — استخدم البريد حالياً.', waAddress: 'العنوان', waPhone: 'الهاتف', subtotal: 'المنتجات'
    }
  };


  /* ---------- Supabase (the part that remembers) ---------- */
  // >>> EDIT  project URL + publishable key (safe to expose: the database rules decide what each user may do)
  var SB_URL = 'https://ydoivovackxyltqndvkd.supabase.co';
  var SB_KEY = 'sb_publishable_4o_PTWq712y6d6fV2WonRg_BMgSrGGX';
  var sb = null;
  try { if (window.supabase && window.supabase.createClient) sb = window.supabase.createClient(SB_URL, SB_KEY, { auth: { persistSession: true, autoRefreshToken: true } }); } catch (e) { sb = null; }
  var user = null, profile = null;      // signed-in account (null = guest)

  /* ---------- local settings (guests) ---------- */
  function load(k, def) { try { var v = localStorage.getItem(k); return v === null ? def : JSON.parse(v); } catch (e) { return def; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  var lang = load('ba-lang', 'en'); if (!T[lang]) lang = 'en';
  var cur = load('ba-cur', 'KWD'); if (!CUR[cur]) cur = 'KWD';
  var theme = load('ba-theme', 'dark');
  function narrow() { try { return window.matchMedia('(max-width:700px)').matches; } catch (e) { return false; } }
  function t(k, vars) { var s = (T[lang][k] !== undefined ? T[lang][k] : T.en[k]) || k; if (vars) for (var v in vars) s = s.split('{' + v + '}').join(vars[v]); return s; }
  function money(kwd, opts) {
    var c = CUR[cur], n = kwd * c.rate;
    var s = n.toFixed(c.dec); if (c.dec > 0) s = s.replace(/\.?0+$/, '');
    s = s.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    var code = c[lang] || c.en;
    return (opts && opts.plain) ? s + ' ' + code : s + ' <small>' + code + '</small>';
  }
  function moneyKwd(kwd) { var s = Number(kwd).toFixed(3).replace(/\.?0+$/, ''); return s + ' ' + (lang === 'ar' ? 'د.ك' : 'KWD'); }
  function giftP() { return money(GIFT, { plain: true }); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---------- catalogue: from the database, with the old samples as a fallback ---------- */
  var ITEMS = [];
  function sampleItems() {
    var out = [], prices = [45, 120, 38, 260, 75, 480, 32, 150, 95, 210, 58, 330, 42, 180, 68, 400, 29, 135, 88, 240, 52, 310, 36, 165];
    var beadsArr = [33, 99, 33, 66, 33, 99, 33, 66, 99, 33, 33, 99, 66, 33, 33, 99, 33, 66, 33, 99, 33, 66, 33, 99], sizes = [8, 10, 8, 12, 10, 12, 8, 10, 8, 12, 8, 10, 10, 12, 8, 12, 8, 10, 8, 12, 8, 10, 8, 12];
    for (var i = 0; i < 24; i++) { var d = new Date(2026, 8, 8); d.setDate(d.getDate() - i * 3); var no = String(i + 1).padStart(2, '0');
      out.push({ id: 'm' + (i + 1), nameEn: 'Amber Misbah ' + no, nameAr: 'مسبحة عنبر ' + no, price: prices[i], added: d.getTime(), isNew: i < 4, beads: beadsArr[i], size: sizes[i], photo: null, descEn: null, descAr: null, inStock: true, sort: i + 1 }); }
    return out;
  }
  function fromRow(r) { return { id: r.id, nameEn: r.name_en, nameAr: r.name_ar, price: Number(r.price_kwd), added: new Date(r.created_at).getTime(), isNew: !!r.is_new, beads: r.beads, size: r.bead_mm, weight: r.weight_g || null, photo: r.photo_url || null, descEn: r.description_en, descAr: r.description_ar, inStock: r.in_stock !== false, sort: r.sort_order || 0 }; }
  function nameOf(it) { return (lang === 'ar' ? it.nameAr : it.nameEn) || it.nameEn; }
  function descOf(it) { return (lang === 'ar' ? it.descAr : it.descEn) || t('desc'); }
  function byId(id) { for (var i = 0; i < ITEMS.length; i++) if (ITEMS[i].id === id) return ITEMS[i]; return null; }
  async function loadCatalogue() {
    ITEMS = load('ba-products-cache', null) || sampleItems();
    if (!sb) return;
    try {
      var s = await sb.from('settings').select('key,value');
      if (s.data) s.data.forEach(function (row) {
        if (row.key === 'gift_price_kwd') GIFT = Number(row.value) || GIFT;
        if (row.key === 'whatsapp_number') WA = String(row.value) || WA;
        if (row.key === 'currency_rates' && row.value) for (var c in row.value) if (CUR[c]) CUR[c].rate = Number(row.value[c]) || CUR[c].rate;
        if (row.key === 'delivery_fees' && row.value) for (var f in row.value) FEES[f] = Number(row.value[f]);
        if (row.key === 'faq' && row.value) ['en', 'ar'].forEach(function (l) { if (row.value[l]) for (var k in row.value[l]) T[l][k] = row.value[l][k]; });
      });
      var p = await sb.from('products').select('*').eq('in_stock', true).order('sort_order');
      if (p.data && p.data.length) { ITEMS = p.data.map(fromRow); save('ba-products-cache', ITEMS); }
    } catch (e) {}
  }

  /* ---------- cart & favorites (guest: this browser · member: the database) ---------- */
  var cart = load('ba-cart', {});      // id -> {qty, gift}
  var favs = load('ba-favs', []);      // [id]
  var giftAll = load('ba-giftall', false);
  function cleanCart() { for (var k in cart) if (!byId(k)) delete cart[k]; favs = favs.filter(byId); }
  function cartCount() { var n = 0; for (var k in cart) n += cart[k].qty; return n; }
  function giftCount() { var n = 0; for (var k in cart) if (cart[k].gift) n += cart[k].qty; if (giftAll && !n && cartCount()) n = 1; return n; }
  function giftTotal() { return giftCount() * GIFT; }
  function itemsTotal() { var s = 0; for (var k in cart) s += byId(k).price * cart[k].qty; return s; }
  var FEES = { KW: 3, GCC: 10, IQ: 10 };                 // >>> EDIT (or edit the delivery_fees row in settings)
  var COUNTRIES = ['KW', 'SA', 'AE', 'QA', 'BH', 'OM', 'IQ'];
  var ship = load('ba-ship', { country: '', city: '', address: '', phone: '' });
  function feeFor(c) { if (!c) return 0; return c === 'KW' ? FEES.KW : c === 'IQ' ? FEES.IQ : FEES.GCC; }
  function deliveryFee() { return page === 'order' ? feeFor(ship.country) : 0; }
  function cartTotal() { return itemsTotal() + giftTotal() + deliveryFee(); }
  function persistLocal() { save('ba-cart', cart); save('ba-favs', favs); save('ba-giftall', giftAll); }
  // remote writes (fire and forget; the local copy is already updated so the UI never waits)
  function dbCartUpsert(id) { if (!sb || !user || !cart[id]) return; sb.from('cart_items').upsert({ user_id: user.id, product_id: id, qty: cart[id].qty, gift: !!cart[id].gift }).then(function () {}); }
  function dbCartDelete(id) { if (!sb || !user) return; sb.from('cart_items').delete().match({ user_id: user.id, product_id: id }).then(function () {}); }
  function dbFav(id, on) { if (!sb || !user) return; (on ? sb.from('favorites').upsert({ user_id: user.id, product_id: id }) : sb.from('favorites').delete().match({ user_id: user.id, product_id: id })).then(function () {}); }
  function dbProfile(patch) { if (!sb || !user) return; sb.from('profiles').update(patch).eq('id', user.id).then(function () {}); }
  async function syncAfterLogin() {
    // 1) whatever the guest put in the cart before logging in goes up to the account
    var localCart = cart, localFavs = favs;
    var r = await sb.from('cart_items').select('product_id,qty,gift').eq('user_id', user.id);
    var f = await sb.from('favorites').select('product_id').eq('user_id', user.id);
    var merged = {}; (r.data || []).forEach(function (x) { if (byId(x.product_id)) merged[x.product_id] = { qty: x.qty, gift: !!x.gift }; });
    var pushes = [];
    for (var id in localCart) { if (!byId(id)) continue; if (!merged[id]) { merged[id] = localCart[id]; pushes.push({ user_id: user.id, product_id: id, qty: localCart[id].qty, gift: !!localCart[id].gift }); } }
    var mf = (f.data || []).map(function (x) { return x.product_id; }).filter(byId), pf = [];
    localFavs.forEach(function (id) { if (byId(id) && mf.indexOf(id) < 0) { mf.push(id); pf.push({ user_id: user.id, product_id: id }); } });
    if (pushes.length) await sb.from('cart_items').upsert(pushes);
    if (pf.length) await sb.from('favorites').upsert(pf);
    cart = merged; favs = mf;
    // 2) preferences live on the profile
    var pr = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
    profile = pr.data || null;
    if (profile) {
      if (profile.preferred_currency && CUR[profile.preferred_currency]) cur = profile.preferred_currency;
      if (profile.preferred_lang && T[profile.preferred_lang]) lang = profile.preferred_lang;
      if (profile.theme) theme = profile.theme;
      giftAll = !!profile.gift_all;
      if (profile.country || profile.address) ship = { country: profile.country || '', city: profile.city || '', address: profile.address || '', phone: profile.phone || '' }; save('ba-ship', ship);
      save('ba-lang', lang); save('ba-cur', cur); save('ba-theme', theme);
      dbProfile({ last_seen_at: new Date().toISOString() });
    }
    persistLocal();
  }
  function displayName() { if (profile && profile.full_name) return profile.full_name; if (user && user.user_metadata && user.user_metadata.full_name) return user.user_metadata.full_name; if (user && user.email) { var n = user.email.split('@')[0].replace(/[._-]+/g, ' '); return n.charAt(0).toUpperCase() + n.slice(1); } return 'Member'; }

  /* ---------- icons ---------- */
  var ICO = {
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 20.5s-7.5-4.6-7.5-10A4.5 4.5 0 0 1 12 7.6a4.5 4.5 0 0 1 7.5 2.9c0 5.4-7.5 10-7.5 10z"/></svg>',
    bead: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="5" r="2.2"/><circle cx="17.5" cy="8" r="2.2"/><circle cx="18.5" cy="14" r="2.2"/><circle cx="14" cy="18.5" r="2.2"/><circle cx="8" cy="18" r="2.2"/><circle cx="5.2" cy="12.5" r="2.2"/><circle cx="7" cy="7" r="2.2"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 1.9 3 4.6 4.1 1.7.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>'
  };
  function photoBox(it, cls) { return it.photo ? '<img class="pimg" src="' + esc(it.photo) + '" alt="' + esc(nameOf(it)) + '" loading="lazy">' : ICO.bead + '<small>' + t('photo') + '</small>'; }

  /* ---------- apply language / currency / theme ---------- */
  function applyLang() {
    document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    $$('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    $$('[data-i18n-html]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n-html'), { p: giftP() }); });
    $$('[data-i18n-ph]').forEach(function (el) { el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph'))); });
    $$('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria'))); });
    $$('[data-lang-btn]').forEach(function (b) { b.textContent = lang === 'ar' ? 'EN' : 'ع'; b.setAttribute('aria-label', lang === 'ar' ? 'English' : 'العربية'); });
    $$('[data-lang-pick]').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-lang-pick') === lang); });
    $$('select[data-cur]').forEach(function (s) { s.innerHTML = Object.keys(CUR).map(function (c) { return '<option value="' + c + '"' + (c === cur ? ' selected' : '') + '>' + (lang === 'ar' ? c + ' · ' + CUR[c].ar : c) + '</option>'; }).join(''); });
    $$('[data-theme-btn]').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-theme-btn') === theme); });
    if (page) { var map = { home: 'Boshehri Amber', login: t('login') + ' · Boshehri Amber', dashboard: t('account') + ' · Boshehri Amber', members: t('cartfav') + ' · Boshehri Amber', order: t('order') + ' · Boshehri Amber' }; if (map[page]) document.title = map[page]; }
  }
  function setLang(l) { lang = l; save('ba-lang', l); dbProfile({ preferred_lang: l }); applyLang(); refresh(); }
  function setCur(c) { if (!CUR[c]) return; cur = c; save('ba-cur', c); dbProfile({ preferred_currency: c }); applyLang(); refresh(); }
  function setTheme(th) { theme = th; save('ba-theme', th); dbProfile({ theme: th }); document.documentElement.setAttribute('data-theme', th); applyLang(); var m = $('meta[name=theme-color]'); if (m) m.setAttribute('content', th === 'light' ? '#F6F2EA' : '#0C0C0C'); }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-lang-btn]'); if (b) { setLang(lang === 'ar' ? 'en' : 'ar'); return; }
    var p = e.target.closest('[data-lang-pick]'); if (p) { setLang(p.getAttribute('data-lang-pick')); return; }
    var th = e.target.closest('[data-theme-btn]'); if (th) { setTheme(th.getAttribute('data-theme-btn')); return; }
    var tg = e.target.closest('[data-theme-toggle]'); if (tg) { setTheme(theme === 'light' ? 'dark' : 'light'); return; }
  });
  document.addEventListener('change', function (e) { if (e.target.matches('select[data-cur]')) setCur(e.target.value); });

  /* ---------- toast ---------- */
  var toastEl = $('#toast'), toastTimer;
  function toast(msg, ms) { if (!toastEl) return; toastEl.textContent = msg; toastEl.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, ms || 1800); }

  /* ---------- badges ---------- */
  function bump(el) { el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }
  function badges() {
    $$('[data-badge="cart"]').forEach(function (b) { var n = cartCount(); if (b.textContent != n) bump(b); b.textContent = n; b.classList.toggle('on', n > 0); });
    $$('[data-badge="favs"]').forEach(function (b) { if (b.textContent != favs.length) bump(b); b.textContent = favs.length; b.classList.toggle('on', favs.length > 0); });
  }

  /* ---------- drawers & modal ---------- */
  function openDrawer(id) { var d = $('#' + id); if (!d) return; closeDrawers(); d.classList.add('open'); document.body.style.overflow = 'hidden'; if (id === 'cart-drawer') renderCart(); if (id === 'fav-drawer') renderFavs(); }
  function closeDrawers() { $$('.drawer.open, .modal.open').forEach(function (d) { d.classList.remove('open'); }); document.body.style.overflow = ''; }
  $$('[data-open]').forEach(function (b) { b.addEventListener('click', function (e) { e.preventDefault(); openDrawer(b.getAttribute('data-open')); }); });
  $$('.drawer .bg, .drawer .x, .modal .bg, .modal .x').forEach(function (b) { b.addEventListener('click', closeDrawers); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDrawers(); });

  /* ---------- catalog ---------- */
  var sortSel = $('#sort'), grid = $('#grid'), pageNo = 1;
  function sorted() {
    var v = sortSel ? sortSel.value : 'new', a = ITEMS.slice();
    if (v === 'new') a.sort(function (x, y) { return y.added - x.added; });
    if (v === 'old') a.sort(function (x, y) { return x.added - y.added; });
    if (v === 'cheap') a.sort(function (x, y) { return x.price - y.price; });
    if (v === 'exp') a.sort(function (x, y) { return y.price - x.price; });
    return a;
  }
  function giftLabel(on) { return narrow() ? (on ? t('giftShortOn') : t('giftShort', { p: giftP() })) : (on ? t('giftOn', { p: giftP() }) : t('gift', { p: giftP() })); }
  function card(it, idx) {
    var inCart = !!cart[it.id], gift = inCart && cart[it.id].gift, fav = favs.indexOf(it.id) > -1;
    return '<article class="item" data-id="' + it.id + '" style="animation-delay:' + ((idx || 0) * 45) + 'ms">' +
      '<div class="ph" data-view="' + it.id + '">' + photoBox(it) + (it.isNew ? '<span class="new">' + t('newTag') + '</span>' : '') +
      '<button class="fav' + (fav ? ' on' : '') + '" data-fav="' + it.id + '" aria-label="' + t('favorites') + '">' + ICO.heart + '</button>' +
      '<button class="shr" data-share="' + it.id + '" aria-label="' + t('share') + '">' + ICO.share + '</button></div>' +
      '<div class="info"><h3 data-view="' + it.id + '">' + esc(nameOf(it)) + '</h3><div class="spec">' + [it.beads ? t('beads', { n: it.beads }) : '', it.size ? t('beadSize', { n: it.size }) : '', it.weight ? t('weight', { n: it.weight }) : ''].filter(Boolean).join(' · ') + '</div>' + (it.descEn || it.descAr ? '<p class="cdesc">' + esc(descOf(it)) + '</p>' : '') + '<div class="price">' + money(it.price) + '</div>' +
      '<div class="acts"><button class="btn sm gold" data-add="' + it.id + '">' + (inCart ? t('added') : t('add')) + '</button>' +
      '<button class="gift-b' + (gift ? ' on' : '') + '" data-gift="' + it.id + '">🎁 ' + giftLabel(gift) + '</button></div></div></article>';
  }
  function skeletons(n) { var s = ''; for (var i = 0; i < n; i++) s += '<div class="item sk" style="animation-delay:' + (i * 45) + 'ms"><div class="ph"></div><div class="info"><div class="bar w60"></div><div class="bar w40"></div><div class="bar w30 tall"></div><div class="bar"></div></div></div>'; return s; }
  var skTimer;
  function renderGrid(opts) {
    if (!grid) return; opts = opts || {};
    var list = sorted(), pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
    if (pageNo > pages) pageNo = pages;
    var slice = list.slice((pageNo - 1) * PER_PAGE, pageNo * PER_PAGE);
    $('#count').textContent = t('count', { n: list.length });
    $('#pg').innerHTML = pageNo + ' <span>/ ' + pages + '</span>';
    $('#next').disabled = pageNo >= pages; $('#prev').disabled = pageNo <= 1;
    var paint = function () { grid.innerHTML = slice.map(card).join(''); };
    clearTimeout(skTimer);
    if (opts.skeleton) { grid.innerHTML = skeletons(slice.length || 8); skTimer = setTimeout(paint, 420); } else paint();
    if (opts.scroll) $('#shop').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  if (grid) {
    sortSel.addEventListener('change', function () { pageNo = 1; renderGrid({ skeleton: true }); });
    $('#next').addEventListener('click', function () { pageNo++; renderGrid({ skeleton: true, scroll: true }); });
    $('#prev').addEventListener('click', function () { if (pageNo > 1) { pageNo--; renderGrid({ skeleton: true, scroll: true }); } });
  }

  /* ---------- product popup ---------- */
  var modal = $('#pm'), viewing = null;
  function openItem(id) {
    var it = byId(id); if (!it || !modal) return; viewing = id;
    var fav = favs.indexOf(id) > -1, inCart = !!cart[id], gift = inCart && cart[id].gift;
    $('#pm-body').innerHTML =
      '<div class="pm-ph">' + photoBox(it) + (it.isNew ? '<span class="new">' + t('newTag') + '</span>' : '') + '</div>' +
      '<div class="pm-info"><span class="tag">' + (it.photo ? t('item') : t('sample')) + '</span><h2>' + esc(nameOf(it)) + '</h2><div class="price big">' + money(it.price) + '</div>' +
      (cur !== 'KWD' ? '<div class="mini">' + moneyKwd(it.price) + ' · ' + t('priceNote') + '</div>' : '') +
      '<dl class="specs">' + (it.beads ? '<div><dt>' + t('beadsL') + '</dt><dd>' + it.beads + '</dd></div>' : '') + (it.size ? '<div><dt>' + t('sizeL') + '</dt><dd>' + it.size + ' mm</dd></div>' : '') + (it.weight ? '<div><dt>' + t('weightL') + '</dt><dd>' + t('weight', { n: it.weight }) + '</dd></div>' : '') + '</dl>' +
      '<p class="desc">' + esc(descOf(it)) + '</p>' +
      '<div class="acts"><button class="btn gold" data-add="' + id + '">' + (inCart ? t('added') : t('add')) + '</button>' +
      '<button class="gift-b' + (gift ? ' on' : '') + '" data-gift="' + id + '">🎁 ' + giftLabel(gift) + '</button></div>' +
      '<div class="acts sub"><button class="btn ghost sm' + (fav ? ' on' : '') + '" data-fav="' + id + '">' + ICO.heart + ' ' + t('favorites') + '</button><button class="btn ghost sm" data-share="' + id + '">' + ICO.share + ' ' + t('share') + '</button></div></div>';
    modal.classList.add('open'); document.body.style.overflow = 'hidden';
    try { history.replaceState(null, '', location.pathname + '?item=' + id + location.hash); } catch (e) {}
  }
  if (modal) { $$('.modal .bg, .modal .x', modal).forEach(function (b) { b.addEventListener('click', function () { try { history.replaceState(null, '', location.pathname + location.hash); } catch (e) {} }); }); }
  document.addEventListener('click', function (e) { var v = e.target.closest('[data-view]'); if (v && !e.target.closest('button')) openItem(v.getAttribute('data-view')); });

  /* ---------- share ---------- */
  function shareItem(id) {
    var it = byId(id); var base = location.href.split('?')[0].split('#')[0]; if (page !== 'home') base = base.replace(/[^\/]*$/, 'index.html');
    var url = base + '?item=' + id, text = nameOf(it) + ' · ' + money(it.price, { plain: true }) + ' · Boshehri Amber';
    if (navigator.share) { navigator.share({ title: nameOf(it), text: text, url: url }).catch(function () {}); return; }
    var done = function () { toast(t('copied')); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, function () { prompt('', url); });
    else prompt('', url);
  }

  /* ---------- actions (delegated) ---------- */
  document.addEventListener('click', function (e) {
    var tgt = e.target.closest('[data-add],[data-fav],[data-gift],[data-remove],[data-qty],[data-giftall],[data-share]');
    if (!tgt) return;
    e.preventDefault();
    var id = tgt.getAttribute('data-add') || tgt.getAttribute('data-fav') || tgt.getAttribute('data-gift') || tgt.getAttribute('data-remove') || tgt.getAttribute('data-qty') || tgt.getAttribute('data-share');
    if (tgt.hasAttribute('data-share')) { shareItem(id); return; }
    if (tgt.hasAttribute('data-add')) { cart[id] = cart[id] || { qty: 0, gift: false }; cart[id].qty += 1; dbCartUpsert(id); toast(t('addedToast')); }
    if (tgt.hasAttribute('data-fav')) { var i = favs.indexOf(id); if (i > -1) { favs.splice(i, 1); dbFav(id, false); toast(t('favOff')); } else { favs.push(id); dbFav(id, true); toast(t('favOn')); } }
    if (tgt.hasAttribute('data-gift')) { cart[id] = cart[id] || { qty: 1, gift: false }; cart[id].gift = !cart[id].gift; dbCartUpsert(id); }
    if (tgt.hasAttribute('data-remove')) { delete cart[id]; dbCartDelete(id); }
    if (tgt.hasAttribute('data-qty')) { var d = parseInt(tgt.getAttribute('data-d'), 10); if (cart[id]) { cart[id].qty += d; if (cart[id].qty <= 0) { delete cart[id]; dbCartDelete(id); } else dbCartUpsert(id); } }
    if (tgt.hasAttribute('data-giftall')) { giftAll = !giftAll; dbProfile({ gift_all: giftAll }); }
    persistLocal();
    refresh();
    if (viewing && modal && modal.classList.contains('open')) openItem(viewing);
  });
  function refresh() { badges(); if (grid) renderGrid(); renderCart(); renderFavs(); renderGiftAll(); renderMembers(); renderOrder(); }

  /* ---------- cart ---------- */
  function cartLines() {
    var ids = Object.keys(cart);
    if (!ids.length) return '<div class="empty">' + t('cartEmpty') + '</div>';
    var h = ids.map(function (id) { var it = byId(id), c = cart[id];
      return '<div class="line"><div class="ph" data-view="' + id + '">' + (it.photo ? '<img class="pimg" src="' + esc(it.photo) + '" alt="">' : ICO.bead) + '</div><div><b>' + esc(nameOf(it)) + '</b><div class="meta">' + money(it.price) + (c.gift ? ' · 🎁 +' + money(GIFT * c.qty) : '') + '</div>' +
        '<div class="acts" style="margin-top:6px"><span class="qty"><button data-qty="' + id + '" data-d="-1" aria-label="−">−</button><span>' + c.qty + '</span><button data-qty="' + id + '" data-d="1" aria-label="+">+</button></span>' +
        '<button class="gift-b' + (c.gift ? ' on' : '') + '" data-gift="' + id + '">🎁 ' + (c.gift ? t('giftAdded') : t('addGift', { p: giftP() })) + '</button>' +
        '<button class="btn sm ghost" data-remove="' + id + '">' + t('remove') + '</button></div></div>' +
        '<div class="price">' + money(it.price * c.qty) + '</div></div>'; }).join('');
    if (giftCount()) h += '<div class="line gl"><div><b>🎁 ' + t('giftLine', { n: giftCount() }) + '</b><div class="meta">' + t('each', { p: giftP() }) + '</div></div><div class="price">' + money(giftTotal()) + '</div></div>';
    if (page === 'order') h += '<div class="line gl"><div><b>🚚 ' + t('delivery') + (ship.country ? ' · ' + t(ship.country) : '') + '</b><div class="meta">' + (ship.country ? '' : t('deliveryNote')) + '</div></div><div class="price">' + (ship.country ? money(deliveryFee()) : '—') + '</div></div>';
    else h += '<div class="mini" style="padding:10px 0 0">🚚 ' + t('deliveryNote') + '</div>';
    return h;
  }
  function renderCart() {
    $$('.cart-lines').forEach(function (box) { box.innerHTML = cartLines(); });
    $$('.cart-total').forEach(function (el) { el.innerHTML = money(cartTotal()); });
    $$('.cart-kwd').forEach(function (el) { el.textContent = cur === 'KWD' ? '' : moneyKwd(cartTotal()) + ' ' + t('inKwd'); });
  }
  function renderFavs() {
    var html = favs.length ? favs.map(function (id, i) { return card(byId(id), i); }).join('') : '<div class="empty">' + t('favEmpty') + '</div>';
    $$('.fav-lines').forEach(function (box) { box.innerHTML = favs.length ? favs.map(function (id) { var it = byId(id); return '<div class="line"><div class="ph" data-view="' + id + '">' + (it.photo ? '<img class="pimg" src="' + esc(it.photo) + '" alt="">' : ICO.bead) + '</div><div><b>' + esc(nameOf(it)) + '</b><div class="meta">' + money(it.price) + '</div></div><div class="acts"><button class="btn sm gold" data-add="' + id + '">' + t('add') + '</button><button class="fav on" data-fav="' + id + '" aria-label="' + t('remove') + '">' + ICO.heart + '</button></div></div>'; }).join('') : '<div class="empty">' + t('favEmpty') + '</div>'; });
    var sec = $('#fav-grid'); if (sec) sec.innerHTML = html;
    var fc = $('#fav-count'); if (fc) fc.textContent = favs.length ? t('saved', { n: favs.length }) : '';
  }
  function renderGiftAll() { $$('[data-giftall]').forEach(function (b) { b.classList.toggle('on', giftAll); b.textContent = giftAll ? t('giftAllOn') : t('giftAll', { p: giftP() }); }); }

  /* ---------- accounts (Supabase Auth — passwords are hashed by Supabase, the shop never sees them) ---------- */
  $$('[data-checkout]').forEach(function (co) { co.addEventListener('click', function (e) { e.preventDefault(); if (!cartCount()) { toast(t('orderEmpty')); return; } location.href = user ? 'order.html' : 'login.html?next=order'; }); });

  var form = $('#login-form'), mode = 'login';
  function setMode(m) { mode = m; $$('[data-mode]').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-mode') === m); }); var nm = $('#name-row'); if (nm) nm.hidden = m !== 'signup'; var btn = $('#auth-btn'); if (btn) btn.textContent = m === 'signup' ? t('createAcct') : t('enter'); var er = $('#err'); if (er) er.style.display = 'none'; }
  $$('[data-mode]').forEach(function (b) { b.addEventListener('click', function () { setMode(b.getAttribute('data-mode')); }); });
  function showErr(msg) { var er = $('#err'); if (!er) return; er.textContent = msg; er.style.display = 'block'; }
  if (form) form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var email = form.email.value.trim(), pass = form.password.value, name = form.fullname ? form.fullname.value.trim() : '';
    if (!email || !pass) { showErr(t('err')); return; }
    if (!sb) { showErr(t('noDb')); return; }
    var btn = $('#auth-btn'); btn.disabled = true;
    try {
      var res;
      if (mode === 'signup') {
        if (pass.length < 6) { showErr(t('shortPass')); btn.disabled = false; return; }
        res = await sb.auth.signUp({ email: email, password: pass, options: { data: { full_name: name || email.split('@')[0], currency: cur, lang: lang } } });
        if (res.error) throw res.error;
        if (!res.data.session) { form.password.value = ''; $('#auth-ok').hidden = false; $('#auth-ok').textContent = t('checkEmail'); btn.disabled = false; return; }
      } else {
        res = await sb.auth.signInWithPassword({ email: email, password: pass });
        if (res.error) throw res.error;
      }
      form.password.value = '';
      user = res.data.user; await loadCatalogue(); await syncAfterLogin();
      var next = /[?&]next=order/.test(location.search) && cartCount() ? 'order.html' : 'dashboard.html';
      location.href = next;
    } catch (err) {
      var m = (err && err.message) || '';
      showErr(/Invalid login/i.test(m) ? t('badLogin') : /already registered/i.test(m) ? t('exists') : /confirm/i.test(m) ? t('confirmFirst') : m || t('authErr'));
      btn.disabled = false;
    }
  });
  $$('[data-oauth]').forEach(function (b) { b.addEventListener('click', async function () {
    if (!sb) { showErr(t('noDb')); return; }
    var back = location.href.split('#')[0];
    var r = await sb.auth.signInWithOAuth({ provider: b.getAttribute('data-oauth'), options: { redirectTo: back } });
    if (r && r.error) showErr(/not enabled|Unsupported provider/i.test(r.error.message) ? t('oauthOff') : r.error.message);
  }); });
  var out = $('#logout'); if (out) out.addEventListener('click', async function (e) { e.preventDefault(); if (sb) await sb.auth.signOut(); cart = {}; favs = []; giftAll = false; persistLocal(); location.href = 'index.html'; });

  /* ---------- members-only pages ---------- */
  var GATED = page === 'dashboard' || page === 'members' || page === 'order';
  function renderMembers() {
    if (page !== 'dashboard' && page !== 'members') return;
    var el;
    if ((el = $('#m-cart'))) el.textContent = cartCount();
    if ((el = $('#m-favs'))) el.textContent = favs.length;
    if ((el = $('#m-total'))) el.innerHTML = money(cartTotal());
    if ((el = $('#m-email')) && user) el.textContent = user.email || '';
  }
  var STATUS = { en: { pending: 'Sent on WhatsApp', confirmed: 'Confirmed', paid: 'Paid', shipped: 'Shipped', delivered: 'Delivered', cancelled: 'Cancelled' }, ar: { pending: 'أُرسل عبر واتساب', confirmed: 'مؤكد', paid: 'مدفوع', shipped: 'تم الشحن', delivered: 'تم التسليم', cancelled: 'ملغي' } };
  async function renderOrders() {
    var box = $('#orders'); if (!box || !sb || !user) return;
    var r = await sb.from('orders').select('order_no,status,total_kwd,created_at,currency_shown,total_shown').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10);
    var rows = r.data || [];
    box.innerHTML = rows.length ? rows.map(function (o) { return '<div class="rl"><span><span class="tag">' + esc(o.order_no) + '</span> <span class="mini">' + new Date(o.created_at).toLocaleDateString(lang === 'ar' ? 'ar-KW' : 'en-GB') + '</span></span><span>' + moneyKwd(o.total_kwd) + ' <span class="mini">· ' + ((STATUS[lang] || STATUS.en)[o.status || 'pending'] || o.status || '') + '</span></span></div>'; }).join('') : '<div class="empty">' + t('noOrders') + '</div>';
  }

  /* ---------- order summary page ---------- */
  var orderNo = null;
  function waMessage(no, nm) {
    var L = [t('waHello'), t('waOrder') + ' ' + no, ''];
    for (var id in cart) { var it = byId(id), c = cart[id]; L.push('• ' + nameOf(it) + ' ×' + c.qty + ' — ' + moneyKwd(it.price * c.qty) + (c.gift ? ' (+' + t('waGift') + ')' : '')); }
    if (giftCount()) L.push('• 🎁 ' + t('giftLine', { n: giftCount() }) + ' — ' + moneyKwd(giftTotal()));
    if (ship.country) L.push('• 🚚 ' + t('delivery') + ' (' + t(ship.country) + ') — ' + moneyKwd(deliveryFee()));
    L.push('', t('total') + ': ' + moneyKwd(cartTotal()) + (cur !== 'KWD' ? ' (≈ ' + money(cartTotal(), { plain: true }) + ')' : ''), t('waName') + ': ' + nm);
    if (ship.phone) L.push(t('waPhone') + ': ' + ship.phone);
    if (ship.address) L.push(t('waAddress') + ': ' + [t(ship.country), ship.city, ship.address].filter(Boolean).join(', '));
    return L.join('\n');
  }
  function renderOrder() {
    if (page !== 'order') return;
    var lo = load('ba-last-order', null), box = $('#order-box');
    if (!cartCount() && lo && lo.sent) {
      box.innerHTML = '<div class="sent">✓</div><h2>' + t('sent') + '</h2><p class="mini"><span class="tag">' + t('orderNo') + ' ' + esc(lo.no) + '</span> · ' + moneyKwd(lo.total) + '</p>' +
        '<div class="receipt">' + lo.lines.map(function (l) { return '<div class="rl"><span>' + esc(l[0]) + '</span><span>' + esc(l[1]) + '</span></div>'; }).join('') + '</div>' +
        '<div class="acts"><a class="btn gold" href="index.html#shop">' + t('back') + '</a><a class="btn ghost" href="dashboard.html">' + t('account') + '</a></div>';
      return;
    }
    if (!cartCount()) { box.innerHTML = '<div class="empty">' + t('orderEmpty') + '</div><div class="acts" style="margin-top:16px"><a class="btn gold" href="index.html#shop">' + t('back') + '</a></div>'; return; }
    if (!orderNo) orderNo = 'BA-' + String(Date.now()).slice(-6);
    var nm = displayName();
    var opts = '<option value="">' + t('country') + '…</option>' + COUNTRIES.map(function (c) { return '<option value="' + c + '"' + (ship.country === c ? ' selected' : '') + '>' + t(c) + '</option>'; }).join('');
    box.innerHTML = '<div class="row"><span class="tag">' + t('orderNo') + ' ' + orderNo + '</span><span class="mini">' + t('name') + ': ' + esc(nm) + '</span></div>' +
      '<div class="cart-lines">' + cartLines() + '</div>' +
      '<div class="ship"><h2>' + t('shipTitle') + '</h2><div class="grid2">' +
        '<label>' + t('country') + '<select id="sh-country" class="sel">' + opts + '</select></label>' +
        '<label>' + t('city') + '<input id="sh-city" type="text" value="' + esc(ship.city) + '" placeholder="' + t('phCity') + '"></label>' +
        '<label class="full">' + t('address') + '<textarea id="sh-address" rows="2" placeholder="' + t('phAddress') + '">' + esc(ship.address) + '</textarea></label>' +
        '<label>' + t('phone') + '<input id="sh-phone" type="tel" value="' + esc(ship.phone) + '" placeholder="' + t('phPhone') + '"></label>' +
      '</div><p class="err" id="sh-err">' + t('needAddress') + '</p></div>' +
      '<div class="total" style="margin-top:14px"><span>' + t('total') + '</span><span>' + money(cartTotal()) + '</span></div>' +
      (cur !== 'KWD' ? '<div class="mini" style="text-align:end">' + moneyKwd(cartTotal()) + ' ' + t('inKwd') + '</div>' : '') +
      '<div class="acts" style="margin-top:20px"><a class="btn wa" id="send-wa" href="https://wa.me/' + WA + '?text=' + encodeURIComponent(waMessage(orderNo, nm)) + '" target="_blank" rel="noopener">' + ICO.wa + ' ' + t('sendWa') + '</a><a class="btn ghost" href="index.html#shop">' + t('addMore') + '</a></div>' +
      '<p class="note" style="margin-top:22px">' + t('orderNote') + '</p>';
    var shipT;
    function readShip() { ship = { country: $('#sh-country').value, city: $('#sh-city').value.trim(), address: $('#sh-address').value.trim(), phone: $('#sh-phone').value.trim() }; save('ba-ship', ship); }
    $('#sh-country').addEventListener('change', function () { readShip(); renderOrder(); });
    ['#sh-city', '#sh-address', '#sh-phone'].forEach(function (s) { $(s).addEventListener('input', function () { readShip(); clearTimeout(shipT); shipT = setTimeout(function () { $('#send-wa').setAttribute('href', 'https://wa.me/' + WA + '?text=' + encodeURIComponent(waMessage(orderNo, nm))); }, 300); }); });
    $('#send-wa').addEventListener('click', function (e) {
      readShip();
      if (!ship.country || !ship.address) { e.preventDefault(); $('#sh-err').style.display = 'block'; $('#sh-country').focus(); return; }
      this.setAttribute('href', 'https://wa.me/' + WA + '?text=' + encodeURIComponent(waMessage(orderNo, nm)));
      dbProfile({ country: ship.country, city: ship.city, address: ship.address, phone: ship.phone });
      var lines = [], items = [];
      for (var id in cart) { var it = byId(id), c = cart[id]; lines.push([nameOf(it) + ' ×' + c.qty + (c.gift ? ' 🎁' : ''), moneyKwd(it.price * c.qty)]); items.push({ product_id: id, name_snapshot: it.nameEn, unit_price_kwd: it.price, qty: c.qty, gift: !!c.gift }); }
      if (giftCount()) lines.push(['🎁 ' + t('giftLine', { n: giftCount() }), moneyKwd(giftTotal())]);
      lines.push(['🚚 ' + t('delivery') + ' · ' + t(ship.country), moneyKwd(deliveryFee())]);
      lines.push([t('total'), moneyKwd(cartTotal())]);
      var snapshot = { no: orderNo, at: Date.now(), total: cartTotal(), lines: lines, sent: true };
      if (sb && user) {
        sb.from('orders').insert({ order_no: orderNo, user_id: user.id, customer_name: nm, items_total_kwd: itemsTotal(), gift_total_kwd: giftTotal(), total_kwd: cartTotal(), delivery_fee_kwd: deliveryFee(), shipping_country: ship.country, shipping_city: ship.city, shipping_address: ship.address, customer_phone: ship.phone, currency_shown: cur, total_shown: cartTotal() * CUR[cur].rate, lang: lang, whatsapp_sent_at: new Date().toISOString() }).select('id').single()
          .then(function (r) { if (r.data) { items.forEach(function (x) { x.order_id = r.data.id; }); return sb.from('order_items').insert(items); } })
          .then(function () { return sb.from('cart_items').delete().eq('user_id', user.id); })
          .then(function () { dbProfile({ gift_all: false }); }).catch(function () {});
      }
      save('ba-last-order', snapshot);
      cart = {}; giftAll = false; persistLocal();
      setTimeout(refresh, 600);
    });
  }

  /* ---------- back to top ---------- */
  var tt = $('#totop');
  if (tt) { window.addEventListener('scroll', function () { tt.classList.toggle('show', window.scrollY > 500); }, { passive: true }); tt.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); }); }

  /* ---------- scroll reveal ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    $$('.reveal').forEach(function (el) { io.observe(el); });
  } else $$('.reveal').forEach(function (el) { el.classList.add('in'); });

  /* ---------- install as app ---------- */
  var deferred = null;
  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferred = e; });
  window.addEventListener('appinstalled', function () { toast(t('installed')); });
  $$('[data-install]').forEach(function (b) { b.addEventListener('click', function (e) {
    e.preventDefault();
    if (deferred) { deferred.prompt(); deferred = null; return; }
    var ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    toast(ios ? t('installIos') : t('installNa'), 4200);
  }); });
  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) { window.addEventListener('load', function () { navigator.serviceWorker.register('./sw.js').catch(function () {}); }); }

  var wasNarrow = narrow(), rzT;
  window.addEventListener('resize', function () { clearTimeout(rzT); rzT = setTimeout(function () { if (narrow() !== wasNarrow) { wasNarrow = narrow(); refresh(); } }, 200); });

  /* ---------- go ---------- */
  function paintAccount() {
    var nm = displayName();
    $$('[data-name]').forEach(function (el) { el.textContent = nm; });
    $$('[data-welcome]').forEach(function (el) { el.textContent = t(el.getAttribute('data-welcome'), { n: nm }); });
    var lg = $('#login-link'); if (lg && user) { lg.setAttribute('href', 'dashboard.html'); lg.setAttribute('data-i18n-aria', 'account'); }
    $$('[data-login-menu]').forEach(function (a) { if (user) { a.setAttribute('href', 'dashboard.html'); a.setAttribute('data-i18n', 'account'); a.querySelector('span') && (a.querySelector('span').setAttribute('data-i18n', 'account')); } });
  }
  (async function init() {
    document.documentElement.setAttribute('data-theme', theme);
    applyLang();
    if (sb) { try { var s = await sb.auth.getSession(); user = s.data && s.data.session ? s.data.session.user : null; } catch (e) { user = null; } }
    await loadCatalogue();
    cleanCart();
    if (user) { try { await syncAfterLogin(); } catch (e) {} }
    if (GATED && !user) { location.replace('login.html' + (page === 'order' ? '?next=order' : '')); return; }
    if (page === 'login' && user && !/[?&]next=order/.test(location.search)) { location.replace('dashboard.html'); return; }
    if (page === 'login' && user) { location.replace('order.html'); return; }
    document.documentElement.setAttribute('data-theme', theme);
    applyLang(); paintAccount(); setMode('login');
    $$('.gate').forEach(function (el) { el.classList.remove('gate'); });
    refresh();
    if (grid) renderGrid({ skeleton: true });
    if (grid) { var m = location.search.match(/[?&]item=(m\d+|[\w-]+)/); if (m && byId(m[1])) openItem(m[1]); }
    renderOrders();
    document.body.classList.add('ready');
    if (sb) sb.auth.onAuthStateChange(function (ev) { if (ev === 'SIGNED_OUT' && GATED) location.replace('login.html'); });
  })();
})();
