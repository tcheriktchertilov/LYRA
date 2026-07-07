document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('applyForm');
    const formContainer = document.getElementById('formContainer');
    const successContainer = document.getElementById('successContainer');
    const alternativeBlock = document.getElementById('alternativeBlock');

    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const agreeRules = document.getElementById('agreeRules');
        const agreeTelegram = document.getElementById('agreeTelegram');

        if (!agreeRules.checked) {
            alert('❌ Необходимо согласиться с правилами сервера.');
            return;
        }

        if (!agreeTelegram.checked) {
            alert('❌ Вы должны быть подписаны на Telegram-канал LYRA.');
            return;
        }

        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';

        const formData = new FormData(form);

        try {
            const response = await fetch('https://formsubmit.co/ajax/nrudenko204@gmail.com', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                formContainer.style.display = 'none';
                successContainer.style.display = 'block';
                alternativeBlock.style.display = 'none';
                document.title = 'Заявка отправлена — LYRA';
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                throw new Error('Ошибка отправки');
            }
        } catch (error) {
            alert('❌ Ошибка отправки. Попробуйте позже.');
            console.error('Ошибка:', error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Отправить заявку';
        }
    });
});
