document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('applyForm');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Собираем данные
        const email = document.getElementById('email').value.trim();
        const telegram = document.getElementById('telegram').value.trim();
        const agreeTelegram = document.getElementById('agreeTelegram').checked;
        const nickname = document.getElementById('nickname').value.trim();
        const streaming = document.getElementById('streaming').value.trim();
        const age = document.getElementById('age').value.trim();
        const timezone = document.getElementById('timezone').value.trim();
        const source = document.getElementById('source').value.trim();
        const twitch = document.getElementById('twitch').value.trim();
        const agreeRules = document.getElementById('agreeRules').checked;

        if (!email || !telegram || !nickname || !streaming || !age || !source || !twitch) {
            showNotification('Заполните все обязательные поля (отмечены звёздочкой).', 'error');
            return;
        }

        if (!agreeRules) {
            showNotification('Необходимо согласиться с правилами сервера.', 'error');
            return;
        }

        if (!agreeTelegram) {
            showNotification('Вы должны быть подписаны на Telegram-канал LYRA.', 'error');
            return;
        }

        if (age < 10 || age > 99) {
            showNotification('Укажите корректный возраст (от 10 до 99 лет).', 'error');
            return;
        }

        const formData = {
            email,
            telegram,
            agreeTelegram,
            nickname,
            streaming,
            age,
            timezone: timezone || 'Не указан',
            source,
            twitch
        };

        console.log('📝 Данные заявки:', formData);

        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';

        setTimeout(() => {

            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Заявка отправлена!';
            showNotification(
                '✅ Ваша заявка успешно отправлена! Мы свяжемся с вами в течение 24 часов.',
                'success'
            );

            form.reset();

            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Отправить заявку';
            }, 3000);

        }, 1500);
    });

    function showNotification(message, type = 'info') {
        // Удаляем старые уведомления
        const oldNotif = document.querySelector('.custom-notification');
        if (oldNotif) oldNotif.remove();

        const notif = document.createElement('div');
        notif.className = `custom-notification ${type}`;
        notif.innerHTML = `
            <div class="notif-content">
                <span>${message}</span>
                <button class="notif-close">&times;</button>
            </div>
        `;

        Object.assign(notif.style, {
            position: 'fixed',
            top: '90px',
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: '500px',
            width: '90%',
            padding: '16px 20px',
            borderRadius: '12px',
            zIndex: '9999',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
            fontFamily: "'Inter', sans-serif",
            fontSize: '15px',
            fontWeight: '600',
            animation: 'modalIn 0.3s ease',
            border: '1px solid var(--border-color)',
            background: 'var(--card-bg)',
            color: 'var(--text-primary)'
        });

        if (type === 'error') {
            notif.style.borderLeft = '4px solid #f87171';
        } else if (type === 'success') {
            notif.style.borderLeft = '4px solid #4ade80';
        } else {
            notif.style.borderLeft = '4px solid var(--orange-500)';
        }

        const closeBtn = notif.querySelector('.notif-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: var(--text-muted);
            font-size: 22px;
            cursor: pointer;
            padding: 0 8px;
        `;
        closeBtn.addEventListener('click', () => notif.remove());

        document.body.appendChild(notif);

        setTimeout(() => {
            if (notif.parentNode) notif.remove();
        }, 6000);
    }
});