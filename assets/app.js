const menuButton = document.getElementById('menuButton');
const menu = document.getElementById('menu');
menuButton?.addEventListener('click', () => { menu.hidden = !menu.hidden; });
document.getElementById('copyButton')?.addEventListener('click', async (event) => {
  const button = event.currentTarget;
  try {
    await navigator.clipboard.writeText('SALE25');
    button.textContent = 'Скопировано';
  } catch {
    button.textContent = 'SALE25';
  }
});
