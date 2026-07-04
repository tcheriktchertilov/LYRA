document.addEventListener('DOMContentLoaded', function() {

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            const icon = this.querySelector('i');
            icon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        });
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        const icon = document.querySelector('#themeToggle i');
        if (icon) {
            icon.className = savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    const featuresGrid = document.getElementById('featuresGrid');
    if (featuresGrid && typeof SERVER_CONFIG !== 'undefined' && SERVER_CONFIG.features) {
        featuresGrid.innerHTML = SERVER_CONFIG.features.map(f => `
            <div class="feature-item">
                <i class="fas ${f.icon}"></i>
                <h4>${f.title}</h4>
                <p>${f.desc}</p>
            </div>
        `).join('');
    }

    const telegramLink = document.getElementById('telegramLink');
    const discordLink = document.getElementById('discordLink');

    if (telegramLink && typeof SERVER_CONFIG !== 'undefined' && SERVER_CONFIG.social) {
        telegramLink.href = SERVER_CONFIG.social.telegram;
        telegramLink.target = '_blank';
    }

    if (discordLink && typeof SERVER_CONFIG !== 'undefined' && SERVER_CONFIG.social) {
        discordLink.href = SERVER_CONFIG.social.discord;
        discordLink.target = '_blank';
    }

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            const isOpen = item.classList.contains('open');
            // Закрываем все
            faqItems.forEach(el => el.classList.remove('open'));
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });

    function updateStatus() {
        const statusText = document.getElementById('serverStatusText');
        const playerCount = document.getElementById('playerCount');
        const dot = document.querySelector('.status-dot');

        if (statusText && playerCount && dot && typeof SERVER_CONFIG !== 'undefined') {
            const status = SERVER_CONFIG.getStatus();

            statusText.textContent = status.online ? 'Онлайн' : 'Оффлайн';
            playerCount.textContent = status.players;
            dot.className = `status-dot ${status.online ? 'online' : 'offline'}`;
        }
    }

    updateStatus();
    setInterval(updateStatus, 30000);
});