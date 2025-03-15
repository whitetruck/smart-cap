// 初始化心率图表
let heartRateChart;
const heartRateData = {
    labels: Array(100).fill(''),
    datasets: [{
        label: '心率',
        data: Array(100).fill(75),
        borderColor: '#00ff9d',
        borderWidth: 4,
        fill: {
            target: 'origin',
            above: 'rgba(0, 255, 157, 0.2)'
        },
        tension: 0.2,
        pointRadius: 0
    }]
};

const chartConfig = {
    type: 'line',
    data: heartRateData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                display: false,
                grid: {
                    display: false
                }
            },
            y: {
                display: false,
                min: 35,
                max: 115,
                grid: {
                    display: false
                }
            }
        },
        animation: {
            duration: 0
        },
        elements: {
            line: {
                tension: 0.2
            }
        },
        layout: {
            padding: {
                top: 10,
                bottom: 0
            }
        }
    }
};

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    // 读取并显示用户和治疗模式信息
    const selectedUser = JSON.parse(localStorage.getItem('selectedUser'));
    const selectedTreatment = JSON.parse(localStorage.getItem('selectedTreatment'));

    if (selectedUser && selectedTreatment) {
        // 更新用户信息
        const userAvatar = document.querySelector('.avatar-container i');
        const userName = document.querySelector('.user-name');
        const treatmentMode = document.querySelector('.treatment-mode span');
        const treatmentIcon = document.querySelector('.treatment-mode i');
        const modeIcon = document.querySelector('.mode-icon i');
        const indexLabel = document.querySelector('.index-label');

        // 更新用户头像和姓名
        if (userAvatar && selectedUser.icon) {
            userAvatar.className = selectedUser.icon;
        }
        if (userName && selectedUser.name) {
            userName.textContent = selectedUser.name;
        }

        // 更新治疗模式信息
        if (treatmentMode && selectedTreatment.name) {
            treatmentMode.textContent = selectedTreatment.name;
        }
        if (treatmentIcon && selectedTreatment.icon) {
            treatmentIcon.className = selectedTreatment.icon;
        }
        if (modeIcon && selectedTreatment.icon) {
            modeIcon.className = selectedTreatment.icon;
        }
        
        // 更新指数名称，使用治疗模式名称的后两个字
        if (indexLabel && selectedTreatment.name) {
            const modeName = selectedTreatment.name;
            const lastTwoChars = modeName.slice(-2);
            indexLabel.textContent = lastTwoChars + '指数';
        }

        // 添加用户信息点击事件
        const userInfoLink = document.querySelector('.user-info-link');
        if (userInfoLink) {
            userInfoLink.addEventListener('click', () => {
                window.location.href = 'profile.html';
            });
        }
    } else {
        // 如果没有选择数据，返回首页
        window.location.href = 'index.html';
    }

    const ctx = document.getElementById('heartRateChart').getContext('2d');
    heartRateChart = new Chart(ctx, chartConfig);
    
    initializeProgressRing();
    startMonitoring();
    startTimer();
    
    // 生成示例心率数据
    generateSampleHeartRate();
    
    // 添加刻度线
    addScaleLines();
    
    // 初始化功率控制
    initializePowerControl();
    
    // 复制并重复波形模板
    repeatWavePattern();
});

// 生成示例心率波形
function generateSampleHeartRate() {
    const baseHeartRate = 75;
    const amplitude = 30;
    const period = Math.PI / 15;
    let time = 0;
    
    setInterval(() => {
        const newData = heartRateChart.data.datasets[0].data;
        // 生成更真实的心电图样波形
        const value = baseHeartRate + 
            (Math.sin(time) * amplitude * 1.5) + 
            (Math.sin(time * 2) * (amplitude / 1.2)) +
            (Math.sin(time * 3) * (amplitude / 2)) +
            (Math.sin(time * 4) * (amplitude / 4)) +
            (Math.random() * 3 - 1.5);
            
        newData.push(value);
        newData.shift();
        
        time += period;
        heartRateChart.update('none');
        
        document.querySelector('.heart-rate-value .value').textContent = 
            Math.round(baseHeartRate);
    }, 40);
}

// 添加刻度线
function addScaleLines() {
    const svg = document.querySelector('.energy-ring-large svg');
    const g = svg.querySelector('.scale-lines');
    const center = 18;
    const radius = 15.9155;
    
    for (let i = 0; i < 60; i++) {
        const angle = (i * 6) * Math.PI / 180;
        const isLongLine = i % 5 === 0;
        const lineLength = isLongLine ? 2 : 1;
        
        const x1 = center + (radius - lineLength) * Math.cos(angle);
        const y1 = center + (radius - lineLength) * Math.sin(angle);
        const x2 = center + radius * Math.cos(angle);
        const y2 = center + radius * Math.sin(angle);
        
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("stroke", "rgba(255, 255, 255, 0.2)");
        line.setAttribute("stroke-width", isLongLine ? "0.5" : "0.3");
        
        g.appendChild(line);
    }
    
    // 添加百分比标记
    const percentageMarks = svg.querySelector('.percentage-marks');
    const percentages = [0, 25, 50, 75, 100];
    
    percentages.forEach(percent => {
        const angle = (-90 + (percent * 3.6)) * Math.PI / 180; // 从-90度开始，每1%对应3.6度
        const x = center + (radius + 3.5) * Math.cos(angle);
        const y = center + (radius + 3.5) * Math.sin(angle);
        
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", x);
        text.setAttribute("y", y);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");
        text.setAttribute("fill", "rgba(255, 255, 255, 0.7)");
        text.setAttribute("font-size", "2.5");
        text.setAttribute("font-weight", "bold");
        text.textContent = percent;
        
        percentageMarks.appendChild(text);
    });
}

// 初始化进度环
function initializeProgressRing() {
    const circle = document.querySelector('.progress-ring');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;
    
    setProgress(0);
}

// 设置恢复指数进度
function setProgress(percent) {
    const circle = document.querySelector('.progress-ring');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percent / 100 * circumference);
    
    circle.style.strokeDashoffset = offset;
    
    // 更新颜色
    let color;
    if (percent < 30) {
        color = '#ff00b3';
    } else if (percent < 70) {
        color = '#00ff9d';
    } else {
        color = '#00ff9d';
    }
    circle.style.stroke = color;
    
    // 更新数值显示
    document.querySelector('.index-value').textContent = `${Math.round(percent)}%`;
}

// 更新心率数据
function updateHeartRate(value) {
    const data = heartRateChart.data.datasets[0].data;
    data.push(value);
    data.shift();
    heartRateChart.update();
    
    document.querySelector('.heart-rate-value .value').textContent = value;
}

// 更新温度显示
function updateTemperature(value) {
    document.querySelector('.temp-display').textContent = value.toFixed(1);
}

// 开始监控
function startMonitoring() {
    // 模拟数据更新
    setInterval(() => {
        // 模拟心率数据 (60-100)
        const heartRate = Math.floor(Math.random() * 40) + 60;
        updateHeartRate(heartRate);
        
        // 模拟恢复指数 (渐进增加)
        const currentIndex = parseInt(document.querySelector('.index-value').textContent);
        if (currentIndex < 100) {
            setProgress(currentIndex + Math.random());
        }
        
        // 模拟温度数据 (36-37.5)
        const temperature = 36 + Math.random() * 1.5;
        updateTemperature(temperature);
    }, 1000);
}

// 计时器功能
function startTimer() {
    const duration = 20 * 60; // 20分钟
    let timeLeft = duration;
    
    const timerDisplay = document.querySelector('.time-display');
    
    const timer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (--timeLeft < 0) {
            clearInterval(timer);
            timerDisplay.textContent = '00:00';
            alert('治疗已完成');
        }
    }, 1000);
}

// 停止按钮事件
document.querySelector('.stop-button').addEventListener('click', () => {
    if (confirm('确定要终止治疗吗？')) {
        window.location.href = 'index.html';
    }
});

// 初始化功率控制
function initializePowerControl() {
    const slider = document.querySelector('.power-slider');
    const valueDisplay = document.querySelector('.power-value span');
    const powerTrack = document.querySelector('.power-track');
    const powerPointer = document.querySelector('.power-pointer');
    const scaleLines = document.querySelector('.scale-lines');
    const indexValue = document.querySelector('.index-value');

    // 设置滑块的初始值为50
    slider.value = 50;

    // 创建刻度线
    for (let i = 0; i <= 100; i += 10) {
        const line = document.createElement('div');
        line.className = 'scale-line';
        line.style.left = `${i}%`;
        line.style.height = i % 20 === 0 ? '8px' : '4px';
        line.style.opacity = i % 20 === 0 ? '1' : '0.5';
        line.style.backgroundColor = '#00ff9d';
        scaleLines.appendChild(line);

        if (i % 20 === 0) {
            const value = document.createElement('div');
            value.className = 'scale-value';
            value.textContent = `${i}%`;
            value.style.left = `${i}%`;
            value.style.transform = 'translateX(-50%)';
            scaleLines.appendChild(value);
        }
    }

    function updatePower() {
        const value = parseInt(slider.value);
        
        // 更新功率显示
        if (valueDisplay) {
            valueDisplay.textContent = value;
        }
        
        // 更新右上角数字
        if (indexValue) {
            indexValue.textContent = `${value}%`;
        }
        
        // 更新进度条颜色
        if (powerTrack) {
            const gradient = `linear-gradient(to right, #ff00b3 ${value * 0.5}%, #00ff9d ${value}%, #00ff9d ${value * 1.5}%)`;
            powerTrack.style.background = gradient;
        }
        
        // 更新指针位置
        if (powerPointer) {
            powerPointer.style.left = `${value}%`;
        }
        
        // 更新刻度线颜色
        document.querySelectorAll('.scale-line').forEach(line => {
            const lineValue = parseInt(line.style.left);
            line.style.backgroundColor = lineValue <= value ? '#00ff9d' : 'rgba(0, 255, 157, 0.3)';
        });
    }

    // 添加事件监听器
    if (slider) {
        // 监听 input 事件实现实时更新
        slider.addEventListener('input', updatePower);
        // 监听 change 事件确保最终值更新
        slider.addEventListener('change', updatePower);
        // 监听 mousemove 事件以确保拖动时的平滑更新
        slider.addEventListener('mousemove', (e) => {
            if (e.buttons === 1) { // 当鼠标左键按下时
                updatePower();
            }
        });
        // 触摸设备支持
        slider.addEventListener('touchmove', updatePower);
    }

    // 初始化显示
    updatePower();
}

// 复制并重复波形模板
function repeatWavePattern() {
    const svg = document.querySelector('.wave-pattern svg');
    const path = svg.querySelector('.wave-template');
    const template = path.getAttribute('d');
    
    // 计算需要重复的次数
    const patternWidth = 16; // 原始波形的宽度
    const svgWidth = 100; // SVG的宽度
    const repeatCount = Math.ceil(svgWidth / patternWidth);
    
    let fullPattern = '';
    for (let i = 0; i < repeatCount; i++) {
        if (i === 0) {
            fullPattern = template;
        } else {
            // 移除前一个波形的起始点，拼接新的波形
            const segment = template.split('L').slice(1).join('L');
            fullPattern += ' L ' + segment;
        }
    }
    
    path.setAttribute('d', fullPattern);
} 