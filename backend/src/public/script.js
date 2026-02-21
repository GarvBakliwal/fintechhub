// Toggle accordion section open/closed
function toggleGroup(headerEl) {
  const group = headerEl.closest('.api-group');
  const isOpen = group.classList.contains('open');

  // Close all groups
  document.querySelectorAll('.api-group.open').forEach(g => {
    if (g !== group) g.classList.remove('open');
  });

  // Toggle clicked group
  group.classList.toggle('open', !isOpen);
}

// Open the first group by default on load
document.addEventListener('DOMContentLoaded', () => {
  const first = document.querySelector('.api-group');
  if (first) first.classList.add('open');
});
