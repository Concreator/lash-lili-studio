// ============================================
// LASH LILI — Script
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------
  // NAVIGATION — scroll shadow
  // -------------------------------------------
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // -------------------------------------------
  // BURGER — mobile menu
  // -------------------------------------------
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');

  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('mobile-menu--open');
    document.body.style.overflow = mobileMenu.classList.contains('mobile-menu--open') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('mobile-menu--open');
      document.body.style.overflow = '';
    });
  });

  // -------------------------------------------
  // FLOATING CTA — show after 400px
  // -------------------------------------------
  const floating = document.getElementById('floating');
  window.addEventListener('scroll', () => {
    floating.classList.toggle('floating--visible', window.scrollY > 400);
  }, { passive: true });

  // -------------------------------------------
  // SERVICE TABS
  // -------------------------------------------
  const tabs = document.querySelectorAll('.services__tab');
  const panels = document.querySelectorAll('.services__panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('services__tab--active'));
      tab.classList.add('services__tab--active');
      panels.forEach(p => {
        p.classList.toggle('services__panel--active', p.id === `panel-${target}`);
      });
    });
  });

  // -------------------------------------------
  // PRICE TABLE — data + filtering
  // -------------------------------------------
  const prices = {
    lashes: [
      ['Наращивание 1,5D', 'от 2 500 ₽', '1ч 30м'],
      ['Наращивание 2D Лисий эффект', '2 600 ₽', '2ч'],
      ['Наращивание 2D Мокрый эффект', '2 600 ₽', '2ч'],
      ['Наращивание 2,5D', 'от 2 700 ₽', '2ч'],
      ['Наращивание 3D', '2 700 ₽', '2ч'],
      ['Наращивание 4D', '3 000 ₽', '2ч'],
      ['Трендовые эффекты', 'от 2 700 ₽', '2ч'],
      ['Выбор на месте', 'от 2 500 ₽', '2ч'],
    ],
    led: [
      ['LED Классика', '2 700 ₽', '1ч 30м'],
      ['LED 1,5D', 'от 2 700 ₽', '2ч'],
      ['LED 2D', '2 800 ₽', '2ч'],
      ['LED 2,5D', '3 000 ₽', '2ч'],
      ['LED 3D', 'от 2 900 ₽', '2ч'],
      ['LED 3,5D', 'от 3 200 ₽', '2ч'],
      ['LED 4D', 'от 3 200 ₽', '2ч'],
      ['LED 4,5D', 'от 3 400 ₽', '2ч'],
      ['LED 5D', 'от 3 400 ₽', '2ч'],
      ['Выбор на месте LED', 'от 2 700 ₽', '2ч'],
    ],
    effects: [
      ['Эффект Аниме', '2 800 ₽', '2ч'],
      ['Эффект Голливуд', '3 400 ₽', '2ч'],
      ['2D Лучи', 'от 2 800 ₽', '2ч'],
      ['3,5D (без LED)', '3 000 ₽', '2ч'],
      ['Скоростное 2D мокрый LED', '3 000 ₽', '1ч'],
      ['Скоростное 3D мокрый LED', '3 100 ₽', '1ч'],
      ['Скоростное Классика LED', '2 900 ₽', '1ч'],
      ['Наращивание уголков', '1 900 ₽', '1ч'],
      ['Нижние ресницы', '900–1 100 ₽', '1ч'],
      ['Цветные ресницы на уголках', '100 ₽', '15м'],
    ],
    correction: [
      ['Коррекция (до 15 дней)', '1 800 ₽', '1ч 30м'],
      ['Коррекция LED', 'от 1 900 ₽', '1ч 20м'],
      ['Снятие наращивания', '200 ₽', '20м'],
    ],
    nails: [
      ['Маникюр с покрытием (без снятия)', '1 499 ₽', '1ч 30м'],
      ['Маникюр с покрытием гель-лак (+снятие)', '1 699 ₽', '2ч 10м'],
      ['Коррекция ногтей', '1 800 ₽', '1ч 30м'],
      ['Наращивание ногтей длина 1-2', '1 900 ₽', '2ч'],
      ['Наращивание ногтей длина 3-4', '2 100 ₽', '3ч'],
      ['Наращивание ногтей длина 4-5', '2 300 ₽', '3ч'],
      ['Наращивание ногтей длина 6-7', '2 500 ₽', '2ч'],
      ['Педикюр (модель)', '800 ₽', '1ч'],
    ],
    training: [
      ['Обучение наращиванию ресниц', '6 000 ₽', '5ч'],
      ['Обучение LED (повышение квалификации)', '8 900 ₽', '6ч'],
      ['Обучение LED (полное)', '12 500 ₽', '5ч'],
      ['Наставничество (1 месяц)', '50 000 ₽', '4ч/день'],
    ],
  };

  const priceBody = document.getElementById('priceBody');
  const priceCats = document.querySelectorAll('.price__cat');

  function renderPrice(cat) {
    const data = prices[cat] || [];
    priceBody.innerHTML = data.map(([name, price, time]) =>
      `<tr><td>${name}</td><td>${price}</td><td>${time}</td></tr>`
    ).join('');
  }

  priceCats.forEach(btn => {
    btn.addEventListener('click', () => {
      priceCats.forEach(b => b.classList.remove('price__cat--active'));
      btn.classList.add('price__cat--active');
      renderPrice(btn.dataset.cat);
    });
  });

  renderPrice('lashes');

  // -------------------------------------------
  // SCROLL ANIMATIONS — IntersectionObserver
  // -------------------------------------------
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in--visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll(
    '.about__feature, .about__card, .service-card, .master-card, .review-card, .contacts__item'
  ).forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // -------------------------------------------
  // SMOOTH SCROLL — close mobile menu
  // -------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => {
      if (mobileMenu.classList.contains('mobile-menu--open')) {
        mobileMenu.classList.remove('mobile-menu--open');
        document.body.style.overflow = '';
      }
    });
  });
});
