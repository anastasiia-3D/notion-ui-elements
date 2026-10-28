const menuButton = document.getElementById('menuButton');
const menu = document.getElementById('menu');
menuButton?.addEventListener('click', () => { menu.hidden = !menu.hidden; });

document.getElementById('copyButton')?.addEventListener('click', async (event) => {
  const button = event.currentTarget;
  try {
    await navigator.clipboard.writeText('SALE25');
    button.textContent = 'Скопировано';
  } catch { button.textContent = 'Копировать'; }
});

const buttonState = document.getElementById('buttonState');
document.getElementById('orderButton')?.addEventListener('click', () => {
  if (buttonState) buttonState.textContent = 'Сейчас: оформляем заказ';
});
document.getElementById('draftButton')?.addEventListener('click', () => {
  if (buttonState) buttonState.textContent = 'Сейчас: черновик сохранён';
});
document.getElementById('cancelButton')?.addEventListener('click', () => {
  if (buttonState) buttonState.textContent = 'Сейчас: действие отменено';
});

document.getElementById('submitButton')?.addEventListener('click', (event) => {
  const button = event.currentTarget;
  const state = document.getElementById('submitState');
  button.disabled = true;
  button.textContent = 'Отправляем…';
  if (state) state.textContent = 'Сейчас: идёт загрузка';
  setTimeout(() => {
    button.disabled = false;
    button.textContent = 'Отправить заявку';
    if (state) state.textContent = 'Сейчас: заявка отправлена';
  }, 1400);
});

const termsCheck = document.getElementById('termsCheck');
const payButton = document.getElementById('payButton');
const checkState = document.getElementById('checkState');
termsCheck?.addEventListener('change', () => {
  const checked = termsCheck.checked;
  if (payButton) payButton.disabled = !checked;
  if (checkState) checkState.textContent = checked ? 'включена, кнопка доступна' : 'выключена, пока нет галочки';
});
payButton?.addEventListener('click', () => {
  if (checkState) checkState.textContent = 'условия приняты';
});

const notificationsSwitch = document.getElementById('notificationsSwitch');
const darkSwitch = document.getElementById('darkSwitch');
const switchState = document.getElementById('switchState');
function updateSwitchState() {
  if (!switchState) return;
  switchState.textContent = (notificationsSwitch?.checked ? 'включены' : 'выключены') + ', тёмная тема ' + (darkSwitch?.checked ? 'включена' : 'выключена');
}
notificationsSwitch?.addEventListener('change', updateSwitchState);
darkSwitch?.addEventListener('change', updateSwitchState);


// Product cards add items to the demo cart.
const cartCount = document.getElementById('cartCount');
let cartItems = 0;
document.querySelectorAll('.badge-demo .product[data-product]').forEach((product) => {
  const addToCart = () => {
    cartItems += 1;
    if (cartCount) cartCount.textContent = `Корзина: ${cartItems} ${cartItems === 1 ? 'товар' : cartItems < 5 ? 'товара' : 'товаров'}`;
    const name = product.dataset.product;
    const status = document.querySelector('.badge-demo .demo-status strong');
    if (status) status.textContent = `${name} добавлен(а) в корзину`;
  };
  product.addEventListener('click', addToCart);
  product.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      addToCart();
    }
  });
});

// Hovering or focusing an avatar switches the displayed fictional team member.
const avatarNodes = document.querySelectorAll('.avatar-demo .avatars .avatar[data-name]');
const selectedAvatar = document.getElementById('selectedAvatar');
const selectedName = document.getElementById('selectedName');
const selectedRole = document.getElementById('selectedRole');
avatarNodes.forEach((avatar) => {
  const selectPerson = () => {
    if (selectedAvatar) {
      selectedAvatar.textContent = avatar.textContent.trim();
      selectedAvatar.classList.toggle('online', avatar.dataset.role.includes('онлайн'));
      selectedAvatar.style.background = getComputedStyle(avatar).backgroundColor;
    }
    if (selectedName) selectedName.textContent = avatar.dataset.name;
    if (selectedRole) selectedRole.textContent = avatar.dataset.role;
  };
  avatar.addEventListener('mouseenter', selectPerson);
  avatar.addEventListener('focus', selectPerson);
});


// Interactive form examples: validation, counters, selects, options and inputs.
const demoEmail = document.getElementById('demoEmail');
const demoPhone = document.getElementById('demoPhone');
const contactStatus = document.getElementById('contactStatus');
const contactError = document.getElementById('contactError');
function updateContactStatus() {
  if (!contactStatus) return;
  const email = demoEmail?.value.trim() || '';
  const phone = demoPhone?.value.trim() || '';
  if (!email && !phone) contactStatus.textContent = 'поля пустые, ошибок нет';
  else contactStatus.textContent = 'заполнено: ' + [email && 'почта', phone && 'телефон'].filter(Boolean).join(' и ');
}
demoEmail?.addEventListener('blur', () => {
  if (!demoEmail.value.trim()) { contactError.textContent = ''; demoEmail.setCustomValidity(''); }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(demoEmail.value.trim())) {
    demoEmail.setCustomValidity('Введите корректный адрес почты');
    contactError.textContent = 'Проверьте адрес почты, например anna@mail.ru';
  } else { demoEmail.setCustomValidity(''); contactError.textContent = ''; }
  updateContactStatus();
});
demoEmail?.addEventListener('input', () => { demoEmail.setCustomValidity(''); contactError.textContent = ''; updateContactStatus(); });
demoPhone?.addEventListener('blur', () => {
  const digits = demoPhone.value.replace(/\D/g, '');
  if (demoPhone.value.trim() && digits.length < 10) {
    demoPhone.setCustomValidity('Введите полный номер телефона');
    contactError.textContent = 'Похоже, номер неполный. Проверьте цифры.';
  } else { demoPhone.setCustomValidity(''); contactError.textContent = ''; }
  updateContactStatus();
});
demoPhone?.addEventListener('input', () => { demoPhone.setCustomValidity(''); contactError.textContent = ''; updateContactStatus(); });

const orderComment = document.getElementById('orderComment');
const commentCount = document.getElementById('commentCount');
orderComment?.addEventListener('input', () => { if (commentCount) commentCount.textContent = (120 - orderComment.value.length) + ' символов'; });

const catalogSearch = document.getElementById('catalogSearch');
const searchStatus = document.getElementById('searchStatus');
catalogSearch?.addEventListener('input', () => { if (searchStatus) searchStatus.textContent = catalogSearch.value.trim() ? 'поиск: «' + catalogSearch.value.trim() + '»' : 'запрос пустой'; });
document.getElementById('clearSearch')?.addEventListener('click', () => { if (catalogSearch) { catalogSearch.value = ''; catalogSearch.focus(); } if (searchStatus) searchStatus.textContent = 'запрос пустой'; });

const citySelect = document.getElementById('citySelect');
const pickupSelect = document.getElementById('pickupSelect');
const deliveryTime = document.getElementById('deliveryTime');
function updateDelivery() { const out = document.getElementById('deliveryStatus'); if (out) out.textContent = [citySelect?.value, pickupSelect?.value, (deliveryTime?.value || '').toLowerCase()].filter(Boolean).join(', '); }
[citySelect, pickupSelect, deliveryTime].forEach(el => el?.addEventListener('change', updateDelivery));

const toppings = Array.from(document.querySelectorAll('.topping'));
function updateToppings() {
  const chosen = toppings.filter(el => el.checked);
  const total = 90 + chosen.reduce((sum, el) => sum + Number(el.dataset.price || 0), 0);
  const out = document.getElementById('toppingTotal');
  const status = document.getElementById('toppingStatus');
  if (out) out.textContent = total + ' ₴';
  if (status) status.textContent = chosen.length + (chosen.length === 1 ? ' дополнение' : chosen.length > 1 && chosen.length < 5 ? ' дополнения' : ' дополнений');
}
toppings.forEach(el => el.addEventListener('change', updateToppings));
const shippingOptions = Array.from(document.querySelectorAll('input[name="shipMethod"]'));
function updateShipping() {
  const chosen = shippingOptions.find(el => el.checked);
  shippingOptions.forEach(el => el.closest('.radio-option')?.classList.toggle('selected', el.checked));
  const price = chosen ? Number(chosen.dataset.price) : 0;
  const total = 690 + price;
  const totalEl = document.getElementById('shippingTotal');
  const status = document.getElementById('shippingStatus');
  if (totalEl) totalEl.textContent = total + ' ₴';
  if (status && chosen) status.textContent = chosen.value.toLowerCase() + ', ' + chosen.dataset.time;
}
shippingOptions.forEach(el => el.addEventListener('change', updateShipping));

const priceRange = document.getElementById('priceRange');
priceRange?.addEventListener('input', () => { const out = document.getElementById('priceValue'); if (out) out.textContent = priceRange.value + ' ₴'; });

const calendarMonthNames = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'];
function dateKey(date) { return date.getFullYear() + '-' + String(date.getMonth()+1).padStart(2,'0') + '-' + String(date.getDate()).padStart(2,'0'); }
function dateLabel(date) { return date.toLocaleDateString('ru-RU', {day:'numeric',month:'long',year:'numeric'}); }
function setupCalendar(demo, daysId, titleId, statusId, mode) {
  const daysEl = document.getElementById(daysId);
  const titleEl = document.getElementById(titleId);
  const statusEl = document.getElementById(statusId);
  if (!daysEl || !titleEl || !statusEl) return;
  let month = new Date(); month.setDate(1);
  let selected = null, rangeStart = null, rangeEnd = null;
  const today = new Date(); today.setHours(0,0,0,0);
  function render() {
    titleEl.textContent = calendarMonthNames[month.getMonth()] + ' ' + month.getFullYear();
    daysEl.innerHTML = '';
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7;
    const count = new Date(month.getFullYear(), month.getMonth()+1, 0).getDate();
    for (let i=0;i<offset;i++) daysEl.appendChild(document.createElement('span'));
    for (let d=1;d<=count;d++) {
      const date = new Date(month.getFullYear(), month.getMonth(), d); date.setHours(0,0,0,0);
      const btn = document.createElement('button'); btn.type='button'; btn.textContent=d;
      btn.disabled = date < today;
      const key = dateKey(date);
      if ((mode==='single' && selected===key) || (mode==='range' && (rangeStart===key || rangeEnd===key)) || (mode==='quick' && selected===key)) btn.classList.add('selected');
      if (mode==='range' && rangeStart && rangeEnd && date > new Date(rangeStart+'T00:00:00') && date < new Date(rangeEnd+'T00:00:00')) btn.classList.add('in-range');
      btn.addEventListener('click', () => {
        if (mode==='range') {
          if (!rangeStart || rangeEnd) { rangeStart=key; rangeEnd=null; statusEl.textContent='начало: '+dateLabel(date)+' · выберите конец'; }
          else {
            if (key < rangeStart) { rangeEnd=rangeStart; rangeStart=key; } else rangeEnd=key;
            statusEl.textContent=dateLabel(new Date(rangeStart+'T00:00:00'))+' — '+dateLabel(new Date(rangeEnd+'T00:00:00'));
          }
        } else { selected=key; statusEl.textContent=dateLabel(date); }
        render();
      });
      daysEl.appendChild(btn);
    }
  }
  demo.querySelectorAll('[data-month]').forEach(btn => btn.addEventListener('click', () => { month.setMonth(month.getMonth()+Number(btn.dataset.month)); render(); }));
  if (mode==='quick') {
    demo.querySelectorAll('[data-quick]').forEach(btn => btn.addEventListener('click', () => {
      const d = new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate()+Number(btn.dataset.quick));
      selected=dateKey(d); month=new Date(d.getFullYear(),d.getMonth(),1); statusEl.textContent=dateLabel(d); render();
    }));
  }
  render();
}
const singleDemo = document.getElementById('calendarDays')?.closest('.form-demo');
const rangeDemo = document.getElementById('rangeCalendarDays')?.closest('.form-demo');
const quickDemo = document.getElementById('quickCalendarDays')?.closest('.form-demo');
if (singleDemo) setupCalendar(singleDemo,'calendarDays','calendarTitle','dateStatus','single');
if (rangeDemo) setupCalendar(rangeDemo,'rangeCalendarDays','rangeCalendarTitle','dateRangeStatus','range');
if (quickDemo) setupCalendar(quickDemo,'quickCalendarDays','quickCalendarTitle','quickDateStatus','quick');

const fileInput = document.getElementById('fileInput');
const fileName = document.getElementById('fileName');
const fileDrop = document.querySelector('.file-drop');
function showFile(file) { if (fileName) fileName.textContent = file ? file.name + ' · ' + Math.ceil(file.size/1024) + ' КБ' : 'Файл не выбран'; }
fileInput?.addEventListener('change', () => showFile(fileInput.files?.[0]));
fileDrop?.addEventListener('dragover', event => { event.preventDefault(); fileDrop.classList.add('dragging'); });
fileDrop?.addEventListener('dragleave', () => fileDrop.classList.remove('dragging'));
fileDrop?.addEventListener('drop', event => { event.preventDefault(); fileDrop.classList.remove('dragging'); const file=event.dataTransfer.files?.[0]; if(file) showFile(file); });

const otpInputs = Array.from(document.querySelectorAll('.otp-inputs input'));
otpInputs.forEach((input,index) => {
  input.addEventListener('input', () => {
    input.value = input.value.replace(/\D/g,'').slice(-1);
    if (input.value && otpInputs[index+1]) otpInputs[index+1].focus();
    const code = otpInputs.map(el=>el.value).join('');
    const status=document.getElementById('otpStatus');
    if(status) status.textContent = code.length===4 ? 'Код введён: '+code : 'Осталось ввести '+(4-code.length)+' цифры';
  });
  input.addEventListener('keydown', event => { if(event.key==='Backspace' && !input.value && otpInputs[index-1]) otpInputs[index-1].focus(); });
  input.addEventListener('paste', event => {
    const text=event.clipboardData?.getData('text') || '';
    if(text) { event.preventDefault(); text.replace(/\D/g,'').slice(0,4).split('').forEach((digit,i)=>{ if(otpInputs[i]) otpInputs[i].value=digit; }); otpInputs[Math.min(text.replace(/\D/g,'').length,3)]?.focus(); const code=otpInputs.map(el=>el.value).join(''); const status=document.getElementById('otpStatus'); if(status) status.textContent=code.length===4?'Код введён: '+code:'Осталось ввести '+(4-code.length)+' цифры'; }
  });
});

let quantity = 2;
const quantityValue = document.getElementById('quantityValue');
const quantityStatus = document.getElementById('quantityStatus');
const quantityMinus = document.getElementById('quantityMinus');
const quantityPlus = document.getElementById('quantityPlus');
function updateQuantity() { if(quantityValue) quantityValue.textContent=quantity; if(quantityStatus) quantityStatus.textContent=quantity+' шт.'; if(quantityMinus) quantityMinus.disabled=quantity<=1; if(quantityPlus) quantityPlus.disabled=quantity>=5; }
quantityMinus?.addEventListener('click',()=>{ quantity=Math.max(1,quantity-1); updateQuantity(); });
quantityPlus?.addEventListener('click',()=>{ quantity=Math.min(5,quantity+1); updateQuantity(); });
updateQuantity();

const tagBox = document.getElementById('tagBox');
const tagInput = document.getElementById('tagInput');
function addTag(value) {
  const tag=value.trim().replace(/,$/,'');
  if(!tag || !tagBox || Array.from(tagBox.querySelectorAll('.tag-chip')).some(el=>el.firstChild?.textContent.trim().toLowerCase()===tag.toLowerCase())) return;
  const chip=document.createElement('span'); chip.className='tag-chip';
  const label=document.createTextNode(tag+' ');
  const remove=document.createElement('button'); remove.type='button'; remove.textContent='×'; remove.setAttribute('aria-label','Удалить '+tag);
  remove.addEventListener('click',()=>chip.remove()); chip.append(label,remove); tagBox.insertBefore(chip,tagInput);
}
tagInput?.addEventListener('keydown',event=>{ if(event.key==='Enter' || event.key===','){event.preventDefault();addTag(tagInput.value);tagInput.value='';} });
tagBox?.querySelectorAll('.tag-chip button').forEach(btn=>btn.addEventListener('click',()=>btn.closest('.tag-chip')?.remove()));

const swatchHex = document.getElementById('swatchHex');
const swatchPreview = document.getElementById('swatchPreview');
const swatchStatus = document.getElementById('swatchStatus');
function setSwatchColor(value) {
  if(!/^#[0-9a-f]{6}$/i.test(value)) return;
  if(swatchHex) swatchHex.value=value.toUpperCase();
  if(swatchPreview) swatchPreview.style.background=value;
  if(swatchStatus) swatchStatus.textContent=value.toUpperCase();
  document.querySelectorAll('.swatches [data-color]').forEach(btn=>btn.classList.toggle('active',btn.dataset.color.toLowerCase()===value.toLowerCase()));
}
document.querySelectorAll('.swatches [data-color]').forEach(btn=>btn.addEventListener('click',()=>setSwatchColor(btn.dataset.color)));
swatchHex?.addEventListener('input',()=>setSwatchColor(swatchHex.value));
setSwatchColor('#315FB8');

const colorPicker = document.getElementById('colorPicker');
const pickerHex = document.getElementById('pickerHex');
const pickerSwatch = document.getElementById('pickerSwatch');
const pickerStatus = document.getElementById('pickerStatus');
function setPickerColor(value) {
  if(!/^#[0-9a-f]{6}$/i.test(value)) return;
  if(colorPicker) colorPicker.value=value;
  if(pickerHex) pickerHex.value=value.toUpperCase();
  if(pickerSwatch) pickerSwatch.style.background=value;
  if(pickerStatus) pickerStatus.textContent=value.toUpperCase();
}
colorPicker?.addEventListener('input',()=>setPickerColor(colorPicker.value));
pickerHex?.addEventListener('input',()=>setPickerColor(pickerHex.value));


// Navigation dropdown interactions: tabs, breadcrumbs, pagination, checkout stepper and menus.
const tabContent = {
  'Описание':'Хлопковая футболка плотностью 180 г/м².',
  'Отзывы':'Покупатели отмечают мягкий хлопок и удобную посадку. Средняя оценка: 4,8 из 5.',
  'Доставка':'Доставка по Украине курьером или в отделение. Срок обычно 1–3 рабочих дня.'
};
document.querySelectorAll('.tabs-widget [data-tab]').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.tabs-widget [data-tab]').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-selected',b===btn?'true':'false');});
  const copy=document.getElementById('tabCopy'),status=document.getElementById('tabStatus');
  if(copy) copy.textContent=tabContent[btn.dataset.tab]||'';
  if(status) status.textContent='«'+btn.dataset.tab+'»';
}));
const crumbStatus=document.getElementById('crumbStatus'), crumbCurrent=document.getElementById('crumbCurrent');
document.querySelectorAll('.breadcrumbs [data-crumb]').forEach(btn=>btn.addEventListener('click',()=>{
  const name=btn.dataset.crumb;
  if(crumbStatus) crumbStatus.textContent='«'+name+'»';
  if(crumbCurrent) crumbCurrent.textContent=name;
  const domain=document.getElementById('crumbDomain');
  if(domain) domain.textContent='lavka.example/'+({Главная:'',Каталог:'catalog',Обувь:'catalog/shoes'}[name]||'');
}));
let currentPage=1;
const pageProducts=document.getElementById('pageProducts');
const pageStatus=document.getElementById('pageStatus');
const pageItems=[
 ['Кроссовки бежевые','Футболка базовая','Худи oversize'],
 ['Рюкзак городской','Кепка хлопковая','Носки в рубчик'],
 ['Куртка лёгкая','Сумка через плечо','Шарф мягкий']
];
function renderProducts(){
  if(pageProducts) pageProducts.innerHTML=pageItems[currentPage-1].map((name,i)=>'<div>'+(i+1+(currentPage-1)*3)+' <span>'+name+'</span></div>').join('');
  document.querySelectorAll('.pagination-controls [data-page]').forEach(btn=>{
    const n=btn.dataset.page==='next'?3:btn.dataset.page==='-1'?1:Number(btn.dataset.page);
    btn.classList.toggle('active',n===currentPage && btn.dataset.page!=='next' && btn.dataset.page!=='-1');
  });
  if(pageStatus) pageStatus.textContent=currentPage+' из 3';
  const status=pageStatus?.parentElement;
  if(status) status.lastChild.textContent=', товары '+((currentPage-1)*3+1)+'–'+(currentPage*3);
}
document.querySelectorAll('.pagination-controls [data-page]').forEach(btn=>btn.addEventListener('click',()=>{
  if(btn.dataset.page==='next') currentPage=Math.min(3,currentPage+1);
  else if(btn.dataset.page==='-1') currentPage=Math.max(1,currentPage-1);
  else currentPage=Number(btn.dataset.page);
  renderProducts();
}));
let currentStep=2;
const stepNames={1:'корзина',2:'доставка',3:'оплата'};
const stepDescriptions={
  1:'В корзине 3 товара. Проверьте количество и перейдите к оформлению.',
  2:'Курьером завтра до 18:00 по адресу: ул. Крещатик, 22.',
  3:'Выберите удобный способ оплаты: картой онлайн или при получении.'
};
function renderStep(){
 document.querySelectorAll('.stepper-steps [data-step]').forEach(btn=>{
   const n=Number(btn.dataset.step); btn.classList.toggle('active',n===currentStep); btn.classList.toggle('done',n<currentStep);
 });
 const desc=document.getElementById('stepDescription'),status=document.getElementById('stepStatus'),back=document.getElementById('stepBack'),next=document.getElementById('stepNext');
 if(desc) desc.textContent=stepDescriptions[currentStep];
 if(status) status.textContent=currentStep+' из 3 — '+stepNames[currentStep];
 if(back) back.disabled=currentStep===1;
 if(next) next.textContent=currentStep===3?'Готово':'Далее';
}
document.querySelectorAll('.stepper-steps [data-step]').forEach(btn=>btn.addEventListener('click',()=>{currentStep=Number(btn.dataset.step);renderStep();}));
document.getElementById('stepBack')?.addEventListener('click',()=>{currentStep=Math.max(1,currentStep-1);renderStep();});
document.getElementById('stepNext')?.addEventListener('click',()=>{currentStep=currentStep===3?1:currentStep+1;renderStep();});

const hamburgerToggle=document.getElementById('hamburgerToggle'), hamburgerPanel=document.getElementById('hamburgerPanel'), hamburgerStatus=document.getElementById('hamburgerStatus');
hamburgerToggle?.addEventListener('click',()=>{
 const opened=hamburgerToggle.getAttribute('aria-expanded')!=='true';
 hamburgerToggle.setAttribute('aria-expanded',String(opened));
 hamburgerToggle.textContent=opened?'×':'☰';
 hamburgerToggle.setAttribute('aria-label',opened?'Закрыть меню':'Открыть меню');
 if(hamburgerPanel) hamburgerPanel.hidden=!opened;
 if(hamburgerStatus) hamburgerStatus.textContent=opened?'меню открыто':'меню закрыто';
});
document.querySelectorAll('.site-header-demo nav button, .footer-demo button, #hamburgerPanel button').forEach(btn=>btn.addEventListener('click',()=>{
  const label=btn.textContent.trim();
  const status=btn.closest('.nav-demo')?.querySelector('.demo-status strong');
  if(status) status.textContent='выбрано: '+label;
}));
document.querySelectorAll('.sidebar-demo button').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('.sidebar-demo button').forEach(b=>b.classList.toggle('active',b===btn));
 const name=btn.textContent.replace(/[⌂▤◉⚙]/g,'').replace(/\d+/g,'').trim();
 const cur=document.getElementById('sidebarCurrent'),stat=document.getElementById('sidebarStatus');
 if(cur) cur.textContent=name;if(stat) stat.textContent='«'+name+'»';
}));
document.querySelectorAll('.nested-layout [data-folder]').forEach(btn=>btn.addEventListener('click',()=>{
 const children=btn.parentElement.querySelector('.folder-children');
 if(children){children.hidden=!children.hidden;btn.textContent=(children.hidden?'▸ ':'▾ ')+btn.dataset.folder;}
 else {const cur=document.getElementById('folderCurrent'),stat=document.getElementById('folderStatus');if(cur)cur.textContent=btn.dataset.folder;if(stat)stat.textContent='открыт раздел «'+btn.dataset.folder+'»';}
}));
document.querySelectorAll('.nested-layout [data-folder-child]').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('.nested-layout [data-folder-child]').forEach(b=>b.classList.toggle('active',b===btn));
 const cur=document.getElementById('folderCurrent'),stat=document.getElementById('folderStatus');
 if(cur)cur.textContent=btn.dataset.folderChild;if(stat)stat.textContent='открыт раздел «'+btn.dataset.folderChild+'»';
}));
const scrollTopDemo=document.querySelector('.scroll-top-demo'), scrollTopButton=document.getElementById('scrollTopDemo');
scrollTopDemo?.addEventListener('scroll',()=>scrollTopButton?.classList.toggle('visible',scrollTopDemo.scrollTop>20));
scrollTopButton?.addEventListener('click',()=>scrollTopDemo?.scrollTo({top:0,behavior:'smooth'}));
const tocCopyByTitle={
 'С чего начать':'Сначала решите, где будете ездить: по городу, по лесу или по трассе. От этого зависит всё остальное.',
 'Размер рамы':'Подберите размер рамы под рост и посадку, чтобы поездки были удобными.',
 'Колёса':'Диаметр колёс влияет на накат, устойчивость и манёвренность.',
 'Тормоза':'Выбирайте тормоза с учётом маршрутов, погоды и обслуживания.'
};
document.querySelectorAll('.toc-widget [data-toc]').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('.toc-widget [data-toc]').forEach(b=>b.classList.toggle('active',b===btn));
 const name=btn.dataset.toc,cur=document.getElementById('tocCurrent'),copy=document.getElementById('tocCopy'),status=document.getElementById('tocStatus');
 if(cur)cur.textContent=name;if(copy)copy.textContent=tocCopyByTitle[name]||'';if(status)status.textContent='«'+name+'»';
}));


// Page structure examples: realistic local interactions for product cards, pricing, dialogs and content blocks.
const favoriteToggle=document.querySelector('.favorite-toggle');
favoriteToggle?.addEventListener('click',()=>{
 const active=favoriteToggle.classList.toggle('active');
 favoriteToggle.textContent=active?'♥':'♡';
 favoriteToggle.setAttribute('aria-label',active?'Убрать из избранного':'Добавить в избранное');
});
const productAdd=document.getElementById('productAdd');
productAdd?.addEventListener('click',()=>{
 const status=document.getElementById('productCartStatus');
 if(status){status.textContent='Добавлено в корзину';status.style.color='#31845B';}
 productAdd.textContent='В корзине ✓';
 productAdd.style.background='#31845B';
});
document.getElementById('serviceBook')?.addEventListener('click',()=>{
 const status=document.getElementById('serviceBookStatus');
 if(status) status.textContent='Заявка выбрана. Заполните форму записи справа.';
 document.getElementById('bookingForm')?.querySelector('input')?.focus();
});
const faqItems=Array.from(document.querySelectorAll('.faq-widget details'));
faqItems.forEach(item=>item.addEventListener('toggle',()=>{
 if(item.open) faqItems.forEach(other=>{if(other!==item)other.open=false;});
 const status=document.getElementById('faqStatus');
 if(status && item.open) status.textContent='«'+item.querySelector('summary').textContent+'»';
}));
const deleteStatus=document.getElementById('deleteStatus');
document.getElementById('cancelDelete')?.addEventListener('click',()=>{if(deleteStatus)deleteStatus.textContent='Действие отменено';});
document.getElementById('confirmDelete')?.addEventListener('click',()=>{
 const box=document.querySelector('.modal-box-demo');
 if(box){box.innerHTML='<strong>Макет удалён</strong><p>Демонстрационное действие выполнено.</p><button type="button" class="brand-outline" id="restoreMock">Восстановить</button>';box.querySelector('#restoreMock')?.addEventListener('click',()=>location.reload());}
});
document.getElementById('closeBooking')?.addEventListener('click',()=>{
 const form=document.getElementById('bookingForm');
 if(form){form.reset();const status=document.getElementById('bookingStatus');if(status)status.textContent='Форма очищена';}
});
document.getElementById('bookingForm')?.addEventListener('submit',event=>{
 event.preventDefault();
 const form=event.currentTarget;
 if(!form.reportValidity()) return;
 const name=form.elements.name.value.trim();
 const status=document.getElementById('bookingStatus');
 if(status) status.textContent='Спасибо, '+name+'! Демозаявка отправлена.';
 form.querySelector('button[type="submit"]').textContent='Отправлено ✓';
});
const slideNames=['Работа 1','Работа 2','Работа 3'];
let activeSlide=1;
function renderSlide(){
 const title=document.getElementById('slideTitle'),status=document.getElementById('slideStatus');
 if(title)title.textContent=slideNames[activeSlide-1];
 if(status)status.textContent=activeSlide+' из 3';
 document.querySelectorAll('.slide-dots [data-slide]').forEach(btn=>btn.classList.toggle('active',Number(btn.dataset.slide)===activeSlide));
}
document.getElementById('slidePrev')?.addEventListener('click',()=>{activeSlide=activeSlide===1?3:activeSlide-1;renderSlide();});
document.getElementById('slideNext')?.addEventListener('click',()=>{activeSlide=activeSlide===3?1:activeSlide+1;renderSlide();});
document.querySelectorAll('.slide-dots [data-slide]').forEach(btn=>btn.addEventListener('click',()=>{activeSlide=Number(btn.dataset.slide);renderSlide();}));
document.querySelectorAll('.table-widget tbody tr').forEach(row=>row.addEventListener('click',()=>{
 document.querySelectorAll('.table-widget tbody tr').forEach(other=>other.classList.toggle('chosen',other===row));
 const status=document.getElementById('tableStatus');
 if(status)status.textContent='«'+row.cells[0].textContent+'»';
}));
document.querySelectorAll('.pricing-cards [data-plan]').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('.pricing-cards [data-plan]').forEach(other=>{other.classList.toggle('selected',other===btn);const em=other.querySelector('em');if(em && other!==btn)em.remove();});
 const status=document.getElementById('planStatus');
 if(status)status.textContent='выбран тариф «'+btn.dataset.plan+'»';
 if(!btn.querySelector('em')){const em=document.createElement('em');em.textContent='Выбран';btn.appendChild(em);}
}));
let billingMode='month';
function renderBilling(){
 const basic=document.getElementById('basicPrice'),full=document.getElementById('fullPrice'),label=document.getElementById('billingLabel'),status=document.getElementById('billingStatus');
 if(basic)basic.textContent=billingMode==='month'?'$12':'$120';
 if(full)full.textContent=billingMode==='month'?'$21':'$210';
 if(label)label.textContent=billingMode==='month'?'в месяц':'в год';
 if(status)status.textContent=billingMode==='month'?'помесячно':'за год';
 document.querySelectorAll('[data-billing]').forEach(btn=>btn.classList.toggle('active',btn.dataset.billing===billingMode));
}
document.querySelectorAll('[data-billing]').forEach(btn=>btn.addEventListener('click',()=>{billingMode=btn.dataset.billing;renderBilling();}));
document.querySelectorAll('[data-month-plan]').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('[data-month-plan]').forEach(other=>other.classList.toggle('selected',other===btn));
 const status=document.getElementById('billingStatus');if(status)status.textContent=(billingMode==='month'?'помесячно':'за год')+', выбран тариф «'+btn.dataset.monthPlan+'»';
}));
const reviewMore=document.getElementById('reviewMore');
reviewMore?.addEventListener('click',()=>{
 const list=document.getElementById('reviewsList');
 if(!list)return;
 if(!list.querySelector('[data-extra-review]')){
   const review=document.createElement('div');review.className='review';review.dataset.extraReview='true';
   review.innerHTML='<span style="background:#31845B">ІП</span><div><b>Ирина П.</b><strong>★★★★★</strong><p>Всё разложено по полочкам, наконец стало понятно, с чего начать.</p><small>28 августа</small></div>';
   list.appendChild(review);reviewMore.textContent='Скрыть';
   const status=document.getElementById('reviewStatus');if(status)status.textContent='3 отзыва из 3';
 } else {
   list.querySelector('[data-extra-review]').remove();reviewMore.textContent='Показать ещё';
   const status=document.getElementById('reviewStatus');if(status)status.textContent='2 отзыва из 3';
 }
});
let lightboxIndex=1;
const lightboxOverlay=document.getElementById('lightboxOverlay');
function renderLightbox(){const title=document.getElementById('lightboxTitle');if(title)title.textContent='Изображение '+lightboxIndex;}
function closeLightbox(){if(lightboxOverlay)lightboxOverlay.hidden=true;}
document.querySelectorAll('[data-lightbox]').forEach(btn=>btn.addEventListener('click',()=>{lightboxIndex=Number(btn.dataset.lightbox);renderLightbox();if(lightboxOverlay)lightboxOverlay.hidden=false;}));
document.getElementById('lightboxClose')?.addEventListener('click',closeLightbox);
document.getElementById('lightboxPrev')?.addEventListener('click',()=>{lightboxIndex=lightboxIndex===1?3:lightboxIndex-1;renderLightbox();});
document.getElementById('lightboxNext')?.addEventListener('click',()=>{lightboxIndex=lightboxIndex===3?1:lightboxIndex+1;renderLightbox();});
lightboxOverlay?.addEventListener('click',event=>{if(event.target===lightboxOverlay)closeLightbox();});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeLightbox();if(lightboxOverlay && !lightboxOverlay.hidden && event.key==='ArrowRight'){lightboxIndex=lightboxIndex===3?1:lightboxIndex+1;renderLightbox();}if(lightboxOverlay && !lightboxOverlay.hidden && event.key==='ArrowLeft'){lightboxIndex=lightboxIndex===1?3:lightboxIndex-1;renderLightbox();}});
let timelineStep=3;
const timelineLabels=['Заказ оформлен','Собран на складе','Передан в доставку','Прибыл в пункт выдачи','Получен'];
const timelineDetails=['Оплата картой прошла · 12 сен, 10:12','Склад собрал заказ · 12 сен, 18:40','Трек-номер UA123456789 · 13 сен, 09:05','Заказ ждёт вас в пункте выдачи','Заказ получен'];
function renderTimeline(){
 const list=document.getElementById('timelineList'),status=document.getElementById('timelineStatus');
 if(list)list.innerHTML=timelineLabels.map((label,index)=>'<li class="'+(index+1<timelineStep?'done':index+1===timelineStep?'current':'')+'"><b>'+label+'</b><small>'+timelineDetails[index]+'</small></li>').join('');
 if(status)status.textContent='«'+timelineLabels[timelineStep-1]+'», пройдено этапов '+(timelineStep-1)+' из 4';
 const next=document.getElementById('timelineNext');if(next)next.disabled=timelineStep===timelineLabels.length;
}
document.getElementById('timelineNext')?.addEventListener('click',()=>{timelineStep=Math.min(timelineLabels.length,timelineStep+1);renderTimeline();});
document.getElementById('timelineReset')?.addEventListener('click',()=>{timelineStep=1;renderTimeline();});


// Status, notifications and feedback demo interactions.
let toastTimer;
const toastTrigger=document.getElementById('toastTrigger');
toastTrigger?.addEventListener('click',()=>{
 const toast=document.getElementById('toastMessage');if(!toast)return;
 toast.hidden=false;toast.textContent='Сохранено';
 clearTimeout(toastTimer);toastTimer=setTimeout(()=>{toast.hidden=true;},3200);
});
let loadingTimer=null,progressValue=48;
document.getElementById('loadingToggle')?.addEventListener('click',event=>{
 const fill=document.getElementById('progressFill'),percent=document.getElementById('progressPercent'),skeletons=document.querySelector('.skeleton-stack'),button=event.currentTarget;
 if(loadingTimer){clearInterval(loadingTimer);loadingTimer=null;button.textContent='Показать загрузку';if(fill)fill.style.width='48%';if(percent)percent.textContent='48%';skeletons?.classList.remove('loading');return;}
 progressValue=0;button.textContent='Остановить загрузку';skeletons?.classList.add('loading');
 loadingTimer=setInterval(()=>{
  progressValue=Math.min(100,progressValue+Math.floor(Math.random()*13)+5);
  if(fill)fill.style.width=progressValue+'%';if(percent)percent.textContent=progressValue+'%';
  if(progressValue>=100){clearInterval(loadingTimer);loadingTimer=null;button.textContent='Загрузка завершена';skeletons?.classList.remove('loading');}
 },350);
});
document.querySelectorAll('[data-tooltip]').forEach(button=>{
 const show=()=>{const popup=document.getElementById('tooltipPopup');if(popup){popup.textContent=button.dataset.tooltip;popup.hidden=false;}};
 const hide=()=>{const popup=document.getElementById('tooltipPopup');if(popup)popup.hidden=true;};
 button.addEventListener('mouseenter',show);button.addEventListener('focus',show);
 button.addEventListener('click',()=>{const popup=document.getElementById('tooltipPopup');if(popup){popup.hidden=!popup.hidden;if(!popup.hidden)popup.textContent=button.dataset.tooltip;}});
 button.addEventListener('mouseleave',hide);button.addEventListener('blur',hide);
});
document.getElementById('retryPayment')?.addEventListener('click',()=>{
 const status=document.getElementById('paymentStatus');if(status)status.textContent='Проверьте данные карты и попробуйте снова.';
});
function dismissCookie(choice){
 const banner=document.getElementById('cookieBanner'),status=document.getElementById('cookieStatus');
 if(banner)banner.innerHTML='Вы выбрали: '+choice+'. Спасибо за ответ.';
 if(status)status.textContent='выбор сохранён: '+choice.toLowerCase();
}
document.getElementById('cookieAccept')?.addEventListener('click',()=>dismissCookie('Принять cookies'));
document.getElementById('cookieReject')?.addEventListener('click',()=>dismissCookie('Отклонить необязательные cookies'));
document.getElementById('catalogButton')?.addEventListener('click',()=>{
 const status=document.getElementById('emptyCartStatus');if(status)status.textContent='Каталог готов к открытию в настоящем магазине.';
});
const notificationBell=document.getElementById('notificationBell');
notificationBell?.addEventListener('click',()=>{
 const panel=document.getElementById('notificationPanel'),status=document.getElementById('notificationStatus'),count=notificationBell.querySelector('span');
 if(panel){panel.hidden=!panel.hidden;if(!panel.hidden){if(count)count.textContent='0';if(status)status.textContent='список открыт, уведомления отмечены прочитанными';}}
});
document.getElementById('clearNotifications')?.addEventListener('click',()=>{
 const panel=document.getElementById('notificationPanel'),status=document.getElementById('notificationStatus');
 if(panel)panel.hidden=true;if(status)status.textContent='все уведомления прочитаны';
});
const tourCopy=['Здесь появляются новые уроки','Откройте урок, чтобы увидеть материалы и задания','Отслеживайте прогресс и возвращайтесь к обучению'];
let tourIndex=1;
function renderTour(){
 const step=document.getElementById('tourStep'),copy=document.getElementById('tourCopy'),status=document.getElementById('tourStatus'),next=document.getElementById('tourNext');
 if(step)step.textContent=tourIndex+' из 3';if(copy)copy.textContent=tourCopy[tourIndex-1];if(status)status.textContent='обучающий тур, шаг '+tourIndex+' из 3';
 if(next)next.textContent=tourIndex===3?'Завершить':'Далее';
}
document.getElementById('tourNext')?.addEventListener('click',()=>{
 if(tourIndex===3){tourIndex=1;const card=document.getElementById('tourCard');if(card)card.hidden=true;const status=document.getElementById('tourStatus');if(status)status.textContent='обучение завершено';}
 else{tourIndex++;renderTour();}
});
document.getElementById('tourClose')?.addEventListener('click',()=>{
 const card=document.getElementById('tourCard'),status=document.getElementById('tourStatus');if(card)card.hidden=true;if(status)status.textContent='обучающий тур закрыт';
});
document.getElementById('offlineRetry')?.addEventListener('click',()=>{
 const status=document.getElementById('offlineStatus'),button=document.getElementById('offlineRetry');
 if(status)status.textContent='проверка соединения не удалась в демо-режиме; сохранённые данные доступны';
 button.textContent='Повторить ещё раз';
});
document.getElementById('homeButton')?.addEventListener('click',()=>{
 const status=document.getElementById('errorNavigationStatus');if(status)status.textContent='В реальном проекте здесь откроется главная страница.';
});
document.getElementById('searchButton')?.addEventListener('click',()=>{
 const status=document.getElementById('errorNavigationStatus');if(status)status.textContent='В реальном проекте здесь откроется поиск по сайту.';
});
