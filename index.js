// Dark / light theme

const lightIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z" /></svg>`;

const darkIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,2C9.76,2 7.78,3.05 6.5,4.68L16.31,14.5C17.94,13.21 19,11.24 19,9A7,7 0 0,0 12,2M3.28,4L2,5.27L5.04,8.3C5,8.53 5,8.76 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H14.73L18.73,22L20,20.72L3.28,4M9,20V21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9Z" /></svg>`;

const themeDark = window.matchMedia('(prefers-color-scheme: dark)');
const colorSchemeBtn = document.querySelector('.dark-light-btn');
let isDark = themeDark.matches;

function applyTheme(isThemeDark) {
	isDark = isThemeDark;
	document.documentElement.setAttribute(
		'data-theme',
		isThemeDark ? 'dark' : 'light'
	);
	if (isDark) {
		colorSchemeBtn.innerHTML = darkIcon;
	} else {
		colorSchemeBtn.innerHTML = lightIcon;
	}
}

function toggleTheme() {
	isDark = !isDark;
	applyTheme(isDark);
	localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

document.addEventListener('DOMContentLoaded', () => {
	const savedTheme = localStorage.getItem('theme');
	if (savedTheme) {
		applyTheme(savedTheme === 'dark');
	} else {
		applyTheme(isDark);
	}
	colorSchemeBtn.addEventListener('click', toggleTheme);
});

// Nav hide / show

let lastScrollTop = 0;

window.addEventListener('scroll', () => {
	let nav = document.querySelector('nav');
	let scrollToTop = window.pageYOffset || document.documentElement.scrollTop;

	if (scrollToTop > lastScrollTop) {
		nav.style.top = '-100%';
	} else {
		nav.style.top = '0';
	}
	lastScrollTop = scrollToTop;
});

// Intersection Observer

const headings = document.querySelectorAll('.sub-container > h2');
const articles = document.querySelectorAll('article > *, .contact-container');

const observer = new IntersectionObserver(
	entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('show');
				console.log(entry.target);
				observer.unobserve(entry.target);
			}
		});
	},
	{
		rootMargin: '0px 0px 50px 0px',
	}
);

headings.forEach(elem => observer.observe(elem));
articles.forEach(elem => observer.observe(elem));
