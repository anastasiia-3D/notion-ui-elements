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
