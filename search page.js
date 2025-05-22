// script.js
// Mobile sort
const mBtn = document.getElementById('mobileSortBtn');
const mOpts = document.getElementById('mobileSortOptions');
mBtn.addEventListener('click', () => {
  const open = mOpts.classList.toggle('open');
  mBtn.textContent = open ? 'Sort by ↑' : 'Sort by ↓';
});
mOpts.querySelectorAll('li').forEach(li => {
  li.addEventListener('click', () => {
    mOpts.querySelectorAll('li').forEach(x => x.classList.remove('active'));
    li.classList.add('active');
    mOpts.classList.remove('open');
    mBtn.textContent = li.textContent;
  });
});
document.addEventListener('click', e => {
  if (!mBtn.contains(e.target) && !mOpts.contains(e.target)) {
    mOpts.classList.remove('open');
  }
});

// Desktop sort
const dBtn = document.getElementById('desktopSortBtn');
const dOpts = document.getElementById('desktopSortOptions');
dBtn.addEventListener('click', () => {
  const open = dOpts.classList.toggle('open');
  dBtn.textContent = open ? 'Sort by ↑' : 'Sort by ↓';
});
dOpts.querySelectorAll('li').forEach(li => {
  li.addEventListener('click', () => {
    dOpts.querySelectorAll('li').forEach(x => x.classList.remove('active'));
    li.classList.add('active');
    dOpts.classList.remove('open');
    dBtn.textContent = li.textContent;
  });
});
document.addEventListener('click', e => {
  if (!dBtn.contains(e.target) && !dOpts.contains(e.target)) {
    dOpts.classList.remove('open');
  }
});
