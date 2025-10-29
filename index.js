// Dark / light theme

let isDark = document.documentElement.getAttribute('data-theme') === 'dark';

function applyTheme(isThemeDark) {
	isDark = isThemeDark;
	document.documentElement.setAttribute(
		'data-theme',
		isThemeDark ? 'dark' : 'light'
		// NOTE: do NOT mutate button.innerHTML here — icons are embedded in HTML and toggled via CSS.
	);
}

function toggleTheme() {
	isDark = !isDark;
	applyTheme(isDark);
	try {
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
	} catch (e) {
		// if localStorage is unavailable
		console.warn('Nie udało się zapisać preferencji motywu:', e);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const colorSchemeBtn = document.querySelector('.dark-light-btn');
	// synchronizuj UI z atrybutem ustawionym wcześniej

	if (colorSchemeBtn) {
		// Ustaw aria-pressed / aria-label według obecnego stanu
		colorSchemeBtn.setAttribute('aria-pressed', String(isDark));
		colorSchemeBtn.setAttribute(
			'aria-label',
			isDark ? 'Przełącz motyw na jasny' : 'Przełącz motyw na ciemny'
		);

		colorSchemeBtn.addEventListener('click', () => {
			toggleTheme();
			// Zaktualizuj aria po przełączeniu
			colorSchemeBtn.setAttribute('aria-pressed', String(isDark));
			colorSchemeBtn.setAttribute(
				'aria-label',
				isDark ? 'Przełącz motyw na jasny' : 'Przełącz motyw na ciemny'
			);
		});
	}
});

// Intersection Observer

const headings = document.querySelectorAll('.sub-container > h1');
const articles = document.querySelectorAll('article > *, .contact-container');
const nav = document.querySelector('nav > ul');

const header = document.querySelector('header');
const footer = document.querySelector('footer');

const oneTimeObserver = new IntersectionObserver(
	entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('show');
				oneTimeObserver.unobserve(entry.target);
			}
		});
	},
	{
		rootMargin: '0px 0px 0px 0px',
	}
);

const constantObserver = new IntersectionObserver(
	entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('show');
			} else {
				entry.target.classList.remove('show');
			}
		});
	},
	{
		rootMargin: '0px 0px 0px 0px',
	}
);

headings.forEach(elem => oneTimeObserver.observe(elem));
articles.forEach(elem => oneTimeObserver.observe(elem));
oneTimeObserver.observe(nav);

constantObserver.observe(header);
constantObserver.observe(footer);
