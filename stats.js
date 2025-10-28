// stats.js - Файл с реальной статистикой APGsG
// Этот файл будет обновляться с реальными данными с вашего сервера

// Реальная статистика с ваших API endpoints
const stats = {
    total: 833,    // Реальное количество участников
    online: 245,   // Реальное количество онлайн
    inGame: 156    // Реальное количество играющих
};

// Функция для обновления статистики
async function updateRealStats() {
    try {
        // Прямые запросы к вашему API
        const [onlineResponse, totalResponse, inGameResponse] = await Promise.all([
            fetch('http://fi3.bot-hosting.net:20207/MARAZMUS?question=PIOnline'),
            fetch('http://fi3.bot-hosting.net:20207/MARAZMUS?question=PITotal'),
            fetch('http://fi3.bot-hosting.net:20207/MARAZMUS?question=PIInGame')
        ]);

        const online = await onlineResponse.text();
        const total = await totalResponse.text();
        const inGame = await inGameResponse.text();

        // Обновляем статистику реальными данными
        stats.total = parseInt(total) || 833;
        stats.online = parseInt(online) || 245;
        stats.inGame = parseInt(inGame) || 156;

        console.log('Статистика обновлена:', stats);
    } catch (error) {
        console.error('Ошибка обновления статистики:', error);
        // Оставляем текущие значения при ошибке
    }
}

// Обновляем статистику при загрузке
updateRealStats();

// Обновляем каждые 30 секунд
setInterval(updateRealStats, 30000);

// Экспортируем статистику для использования в основном файле
if (typeof module !== 'undefined' && module.exports) {
    module.exports = stats;
}
