document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('.faq-list details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('.faq-list details').forEach((other) => {
      if (other !== item) other.removeAttribute('open');
    });
  });
});

const reviewsTrack = document.querySelector('.marquee-track');

if (reviewsTrack && reviewsTrack.children.length === 2) {
  const extraReviewSet = reviewsTrack.firstElementChild.cloneNode(true);
  extraReviewSet.setAttribute('aria-hidden', 'true');
  reviewsTrack.append(extraReviewSet);
}

const processSection = document.querySelector('.process');

if (processSection) {
  const timelineSteps = [...processSection.querySelectorAll('.timeline-grid article')];

  const updateTimeline = () => {
    const bounds = processSection.getBoundingClientRect();
    const travel = Math.max(bounds.height + window.innerHeight * 0.15, 1);
    const current = Math.min(1, Math.max(0, (window.innerHeight * 0.72 - bounds.top) / travel));

    processSection.style.setProperty('--timeline-progress', `${current * 100}%`);
    timelineSteps.forEach((step, index) => {
      const threshold = index / timelineSteps.length;
      step.classList.toggle('is-active', index === 0 || current >= threshold);
    });
  };

  window.addEventListener('scroll', updateTimeline, { passive: true });
  window.addEventListener('resize', updateTimeline);
  updateTimeline();
}
