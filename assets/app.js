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
