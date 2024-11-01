chrome.storage.local.get("visits", (data) => {
    const visits = data.visits || [];

    const siteCounts = {};
    visits.forEach(visit => {
        siteCounts[visit.site] = (siteCounts[visit.site] || 0) + 1;
    });

    const sites = Object.keys(siteCounts);
    const counts = Object.values(siteCounts);

    const maxCountIndex = counts.indexOf(Math.max(...counts));
    const mostVisitedSite = sites[maxCountIndex] || 'Bilgi Yok';

    const mostVisitedElement = document.getElementById('mostVisited');
    mostVisitedElement.innerText = `Utanmaz herif en çok girmeye çalıştığın siteye bak ${mostVisitedSite}`;

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const colors = sites.map(() => getRandomColor());

    const ctx = document.getElementById('visitChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sites,
            datasets: [{
                label: 'Ziyaret Edilen Siteler',
                data: counts,
                backgroundColor: colors,
                borderColor: colors.map(color => color.replace('0.5', '1')),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Siteler'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Ziyaret Sayısı'
                    },
                    beginAtZero: true
                }
            }
        }
    });
});
