const SERVER_CONFIG = {
    name: 'LYRA',
    fullName: 'LYRA 3 сезон | Minecraft Server',
    ip: 'Lyra.minerent.io',
    version: '1.21.11',
    maxPlayers: 100,
    social: {
        telegram: 'https://t.me/lyraminecraft',
        discord: 'https://discord.gg/s6uxptuxJY'
    },
    features: [
        { icon: 'fa-chart-line', title: 'Система роста', desc: 'Прогрессируйте, открывайте новые возможности и выростайте.' },
        { icon: 'fa-paw', title: 'Система животных', desc: 'Новая система животных, приручение и уникальные зачарования.' },
        { icon: 'fa-crown', title: 'Гильдии', desc: 'Объединяйтесь с друзьями, играйте вместе, стройте города и учавствуйте в событиях!' }
    ],
    getStatus: function() {
        return {
            online: true,
            players: Math.floor(Math.random() * 30) + 5
        };
    }
};
