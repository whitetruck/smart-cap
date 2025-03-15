let selectedProfile = null;
let selectedTreatment = null;
const startButton = document.getElementById('startButton');
const userSelect = document.getElementById('userSelect');
const userAvatar = document.querySelector('.user-avatar i');

// 用户头像映射
const avatarIcons = {
    '1': 'fas fa-user-tie', // 老公 - 西装商务人士
    '2': 'fas fa-female', // 老婆 - 优雅女性
    '3': 'fas fa-user-graduate', // 爷爷 - 智慧长者
    '4': 'fas fa-child' // 儿子 - 保持不变
};

// 用户名称映射
const userNames = {
    '1': '老公',
    '2': '老婆',
    '3': '爷爷',
    '4': '儿子'
};

// 治疗模式映射
const treatments = {
    '1': { name: '神经康复', icon: 'fas fa-brain' },
    '2': { name: '睡眠优化', icon: 'fas fa-moon' },
    '3': { name: '情绪调适', icon: 'fas fa-heart' },
    '4': { name: '专注增强', icon: 'fas fa-bullseye' },
    '5': { name: '脑波调节', icon: 'fas fa-wave-square' },
    '6': { name: '认知改善', icon: 'fas fa-lightbulb' }
};

// 添加选择用户事件监听
userSelect.addEventListener('change', (e) => {
    selectedProfile = e.target.value;
    updateStartButton();
    
    // 更新头像
    if (selectedProfile) {
        userAvatar.className = avatarIcons[selectedProfile];
        userAvatar.style.transform = 'scale(0.8)';
        setTimeout(() => {
            userAvatar.style.transform = 'scale(1)';
        }, 150);
    } else {
        userAvatar.className = 'fas fa-user-circle';
    }
});

// 为所有治疗卡片添加点击事件
document.querySelectorAll('.treatment-card').forEach(card => {
    card.addEventListener('click', () => {
        const treatmentId = card.dataset.id;
        
        // 移除其他选中状态
        document.querySelectorAll('.treatment-card').forEach(c => {
            c.classList.remove('selected');
        });
        
        // 添加选中状态和动画
        card.classList.add('selected');
        
        selectedTreatment = treatmentId;
        updateStartButton();
    });
});

function updateStartButton() {
    const isEnabled = selectedProfile && selectedTreatment;
    startButton.disabled = !isEnabled;
    
    if (isEnabled) {
        startButton.classList.add('enabled');
    } else {
        startButton.classList.remove('enabled');
    }
}

startButton.addEventListener('click', () => {
    if (!selectedProfile || !selectedTreatment) return;
    
    const profiles = {
        1: '老公',
        2: '老婆',
        3: '爷爷',
        4: '儿子'
    };
    
    const treatments = {
        1: '神经康复',
        2: '睡眠优化',
        3: '情绪调适',
        4: '专注增强',
        5: '脑波调节',
        6: '认知改善'
    };
    
    // 添加启动动画
    startButton.classList.add('starting');
    setTimeout(() => {
        alert(`开始为${profiles[selectedProfile]}进行${treatments[selectedTreatment]}治疗`);
        startButton.classList.remove('starting');
    }, 500);
});

// 更新能量环
function updateEnergyRing(percentage) {
    const energyPath = document.querySelector('.energy-path');
    const energyText = document.querySelector('.energy-text');
    const dashArray = `${percentage}, 100`;
    
    energyPath.style.strokeDasharray = dashArray;
    energyText.textContent = `${percentage}%`;
    
    // 更新颜色
    if (percentage < 20) {
        energyPath.style.stroke = 'var(--error)';
    } else if (percentage < 50) {
        energyPath.style.stroke = 'var(--warning)';
    } else {
        energyPath.style.stroke = 'var(--primary)';
    }
}

// 模拟设备状态更新
function updateDeviceStatus() {
    const batteryLevel = Math.floor(Math.random() * 20 + 80); // 80-100之间
    updateEnergyRing(batteryLevel);
}

// 添加连接状态闪烁动画
function blinkConnectionStatus() {
    const bluetoothIcon = document.querySelector('.device-status .fa-bluetooth-b');
    bluetoothIcon.style.opacity = '0.5';
    
    setTimeout(() => {
        bluetoothIcon.style.opacity = '1';
    }, 1000);
}

// 每30秒更新一次设备状态
setInterval(updateDeviceStatus, 30000);
// 每2秒闪烁一次连接状态
setInterval(blinkConnectionStatus, 2000);

// 初始化
updateStartButton();
updateDeviceStatus();

document.addEventListener('DOMContentLoaded', () => {
    const userSelect = document.getElementById('userSelect');
    const startButton = document.getElementById('startButton');
    const treatmentCards = document.querySelectorAll('.treatment-card');
    let selectedTreatment = null;

    // 用户选择处理
    userSelect.addEventListener('change', () => {
        const selectedValue = userSelect.value;
        if (selectedValue) {
            // 更新头像
            userAvatar.className = avatarIcons[selectedValue];
            userAvatar.style.transform = 'scale(0.8)';
            setTimeout(() => {
                userAvatar.style.transform = 'scale(1)';
            }, 150);
        } else {
            userAvatar.className = 'fas fa-user-circle';
        }
        updateStartButton();
    });

    // 治疗模式选择处理
    treatmentCards.forEach(card => {
        card.addEventListener('click', () => {
            // 移除其他卡片的选中状态
            treatmentCards.forEach(c => c.classList.remove('selected'));
            // 添加当前卡片的选中状态
            card.classList.add('selected');
            selectedTreatment = {
                id: card.dataset.id,
                name: treatments[card.dataset.id].name,
                icon: treatments[card.dataset.id].icon
            };
            updateStartButton();
        });
    });

    // 更新启动按钮状态
    function updateStartButton() {
        const isUserSelected = userSelect.value !== '';
        startButton.disabled = !isUserSelected || !selectedTreatment;
    }

    // 启动按钮点击处理
    startButton.addEventListener('click', () => {
        const selectedValue = userSelect.value;
        if (!selectedValue || !selectedTreatment) return;

        const selectedUser = {
            id: selectedValue,
            name: userNames[selectedValue],
            icon: avatarIcons[selectedValue]
        };

        // 将选择的数据存储到 localStorage
        localStorage.setItem('selectedUser', JSON.stringify(selectedUser));
        localStorage.setItem('selectedTreatment', JSON.stringify(selectedTreatment));

        // 跳转到治疗页面
        window.location.href = 'treatment.html';
    });

    // 初始化
    updateStartButton();
    updateDeviceStatus();
}); 