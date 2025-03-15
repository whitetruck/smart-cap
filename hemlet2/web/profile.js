// 用户目标映射
const userGoals = {
    '1': ['缓解压力', '轻松睡眠'], // 老公
    '2': ['轻松睡眠', '快速放松大脑神经'], // 老婆
    '3': ['缓解老年认知障碍'], // 爷爷
    '4': ['考前冲刺', '注意力集中'] // 儿子
};

// 模拟使用记录数据
const mockHistory = [
    { date: '2024-03-20', time: '20:30', duration: '20分钟', mode: '神经康复' },
    { date: '2024-03-19', time: '21:00', duration: '20分钟', mode: '睡眠优化' },
    { date: '2024-03-18', time: '19:30', duration: '20分钟', mode: '情绪调适' }
];

document.addEventListener('DOMContentLoaded', () => {
    // 获取用户信息
    const selectedUser = JSON.parse(localStorage.getItem('selectedUser'));
    if (!selectedUser) {
        window.location.href = 'index.html';
        return;
    }

    // 更新用户信息
    const userAvatar = document.querySelector('.avatar-container i');
    const userName = document.querySelector('.user-name');
    const goalItems = document.querySelectorAll('.goal-item');
    const historyList = document.querySelector('.history-list');

    // 设置头像和姓名
    userAvatar.className = selectedUser.icon;
    userName.textContent = selectedUser.name;

    // 设置目标
    const goals = userGoals[selectedUser.id];
    goalItems.forEach((item, index) => {
        if (goals[index]) {
            item.querySelector('.goal-text').textContent = goals[index];
        } else {
            item.style.display = 'none';
        }
    });

    // 添加使用记录
    mockHistory.forEach(record => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-date">
                <span class="date">${record.date}</span>
                <span class="time">${record.time}</span>
            </div>
            <div class="history-details">
                <span class="duration">${record.duration}</span>
                <span class="mode">${record.mode}</span>
            </div>
        `;
        historyList.appendChild(historyItem);
    });

    // 返回按钮事件
    document.querySelector('.back-button').addEventListener('click', () => {
        window.history.back();
    });
}); 