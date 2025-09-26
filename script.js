// Advanced emission factors database
const emissionFactors = {
    electricity: {
        'national': 0.82,
        'delhi': 0.71,
        'maharashtra': 0.79,
        'karnataka': 0.75,
        'tamil-nadu': 0.69,
        'gujarat': 0.85,
        'rajasthan': 0.88,
        'west-bengal': 0.95,
        'andhra-pradesh': 0.91,
        'telangana': 0.89,
        'punjab': 0.73,
        'haryana': 0.87,
        'kerala': 0.62,
        'odisha': 1.08,
        'jharkhand': 1.10,
        'assam': 0.68,
        'bihar': 0.92,
        'chhattisgarh': 1.05,
        'uttarakhand': 0.58,
        'himachal-pradesh': 0.15,
        'goa': 0.71
    },
    transport: {
        'petrol-car': 0.21,
        'diesel-car': 0.19,
        'cng-car': 0.16,
        'hybrid-car': 0.15,
        'electric-car': 0.05,
        'motorcycle-petrol': 0.084,
        'motorcycle-electric': 0.02,
        'auto-rickshaw': 0.12,
        'bus': 0.08,
        'metro': 0.03,
        'bicycle': 0.0,
        'walking': 0.0
    },
    food: {
        'vegan': 1200,
        'vegetarian': 1500,
        'lacto-vegetarian': 1800,
        'eggetarian': 2000,
        'pescatarian': 2300,
        'mixed': 2800,
        'heavy-meat': 3500
    },
    waste: 0.5,
    water: 0.0003,
    aviation: 0.25,
    shopping: 0.0008, // per rupee spent
    heating: {
        'minimal': 200,
        'moderate': 800,
        'heavy': 1500,
        'central': 2500
    },
    recycling: {
        'none': 1.0,
        'minimal': 0.9,
        'moderate': 0.7,
        'extensive': 0.5,
        'comprehensive': 0.3
    }
};

// Carbon tracking storage (using in-memory storage for Claude.ai compatibility)
let carbonHistory = [];

// Current active tab
let currentTab = 'calculator';

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Load history from memory on page load
    loadHistoryFromMemory();
    
    // Add animation delay to input groups
    const inputGroups = document.querySelectorAll('.input-group');
    inputGroups.forEach((group, index) => {
        group.style.animationDelay = (index * 0.1) + 's';
    });

    // Add focus effects to inputs
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    // Initialize slider
    updateSliderValue('green-energy', 'green-energy-value');
});

function switchTab(tabName) {
    // Remove active class from all tabs and contents
    document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    event.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');
    
    currentTab = tabName;
    
    if (tabName === 'tracker') {
        updateTrackingHistory();
    }
}

function updateSliderValue(sliderId, displayId) {
    const slider = document.getElementById(sliderId);
    const display = document.getElementById(displayId);
    if (slider && display) {
        display.textContent = slider.value;
    }
}

function toggleAdvanced() {
    const content = document.getElementById('advanced-content');
    const arrow = document.getElementById('advanced-arrow');
    
    if (content.classList.contains('show')) {
        content.classList.remove('show');
        arrow.textContent = '▼';
    } else {
        content.classList.add('show');
        arrow.textContent = '▲';
    }
}

function showTooltip(element, text) {
    // Create tooltip if it doesn't exist
    let tooltip = element.parentElement.querySelector('.input-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'input-tooltip';
        element.parentElement.appendChild(tooltip);
    }
    
    tooltip.textContent = text;
    tooltip.classList.add('show');
    
    setTimeout(() => {
        tooltip.classList.remove('show');
    }, 3000);
}

function calculateAdvancedCarbon() {
    // Get all input values with fallbacks
    const inputs = {
        electricity: parseFloat(document.getElementById('electricity')?.value) || 0,
        state: document.getElementById('state')?.value || 'national',
        distance: parseFloat(document.getElementById('distance')?.value) || 0,
        vehicleType: document.getElementById('vehicle-type')?.value || 'petrol-car',
        waste: parseFloat(document.getElementById('waste')?.value) || 0,
        water: parseFloat(document.getElementById('water')?.value) || 0,
        foodType: document.getElementById('food-type')?.value || 'vegetarian',
        householdSize: parseFloat(document.getElementById('household-size')?.value) || 4,
        airTravel: parseFloat(document.getElementById('air-travel')?.value) || 0,
        heatingCooling: document.getElementById('heating-cooling')?.value || 'minimal',
        shopping: parseFloat(document.getElementById('shopping')?.value) || 0,
        greenEnergy: parseFloat(document.getElementById('green-energy')?.value) || 0,
        recycling: document.getElementById('recycling')?.value || 'none'
    };

    // Validate inputs
    if (inputs.electricity === 0 && inputs.distance === 0) {
        alert('Please enter at least your electricity usage or transportation distance to get meaningful results.');
        return;
    }

    // Calculate emissions for each category
    const electricityFactor = emissionFactors.electricity[inputs.state] || emissionFactors.electricity['national'];
    const greenMultiplier = (100 - inputs.greenEnergy) / 100;
    const electricityCarbon = inputs.electricity * electricityFactor * 12 * greenMultiplier / inputs.householdSize;
    
    const transportFactor = emissionFactors.transport[inputs.vehicleType] || emissionFactors.transport['petrol-car'];
    const transportCarbon = inputs.distance * transportFactor * 12 / inputs.householdSize;
    
    const foodCarbon = emissionFactors.food[inputs.foodType] / inputs.householdSize;
    
    const recyclingMultiplier = emissionFactors.recycling[inputs.recycling];
    const wasteCarbon = inputs.waste * emissionFactors.waste * 12 * recyclingMultiplier / inputs.householdSize;
    
    const waterCarbon = inputs.water * emissionFactors.water * 365 / inputs.householdSize;
    
    const airTravelCarbon = inputs.airTravel * emissionFactors.aviation * 2.7 / inputs.householdSize; // RFI factor
    
    const heatingCarbon = emissionFactors.heating[inputs.heatingCooling] / inputs.householdSize;
    
    const shoppingCarbon = inputs.shopping * emissionFactors.shopping * 12 / inputs.householdSize;

    // Total carbon footprint
    const totalCarbon = electricityCarbon + transportCarbon + foodCarbon + 
                       wasteCarbon + waterCarbon + airTravelCarbon + 
                       heatingCarbon + shoppingCarbon;

    // Trees needed and offset cost
    const treesNeeded = Math.ceil(totalCarbon / 21);
    const offsetCost = Math.round(totalCarbon * 0.6); // ₹600 per tonne average

    // Update all results
    updateResults({
        totalCarbon,
        electricityCarbon,
        transportCarbon,
        foodCarbon,
        wasteCarbon,
        waterCarbon,
        airTravelCarbon: airTravelCarbon + heatingCarbon + shoppingCarbon,
        treesNeeded,
        offsetCost,
        inputs
    });

    // Save to history
    saveToHistory(totalCarbon, inputs);
}

function updateResults(data) {
    const {
        totalCarbon, electricityCarbon, transportCarbon, foodCarbon, 
        wasteCarbon, waterCarbon, airTravelCarbon, treesNeeded, offsetCost
    } = data;

    // Update main results
    const totalCarbonElement = document.getElementById('total-carbon');
    const treesCountElement = document.getElementById('trees-count');
    const offsetCostElement = document.getElementById('offset-cost');
    
    if (totalCarbonElement) totalCarbonElement.textContent = Math.round(totalCarbon);
    if (treesCountElement) treesCountElement.textContent = treesNeeded;
    if (offsetCostElement) offsetCostElement.textContent = offsetCost;

    // Update breakdown with null checks
    const updateElement = (id, value) => {
        const element = document.getElementById(id);
        if (element) element.textContent = Math.round(value) + ' kg';
    };

    updateElement('electricity-carbon', electricityCarbon);
    updateElement('transport-carbon', transportCarbon);
    updateElement('food-carbon', foodCarbon);
    updateElement('waste-carbon', wasteCarbon);
    updateElement('water-carbon', waterCarbon);
    updateElement('travel-carbon', airTravelCarbon);

    // Update percentages
    const categories = [
        { id: 'electricity-percent', value: electricityCarbon },
        { id: 'transport-percent', value: transportCarbon },
        { id: 'food-percent', value: foodCarbon },
        { id: 'waste-percent', value: wasteCarbon },
        { id: 'water-percent', value: waterCarbon },
        { id: 'travel-percent', value: airTravelCarbon }
    ];

    categories.forEach(cat => {
        const element = document.getElementById(cat.id);
        if (element) {
            const percentage = totalCarbon > 0 ? ((cat.value / totalCarbon) * 100).toFixed(1) : '0.0';
            element.textContent = percentage + '%';
        }
    });

    // Carbon level assessment
    let carbonLevel, progressPercent, comparisonText;
    
    if (totalCarbon <= 1500) {
        carbonLevel = '🟢 Excellent! Well Below Indian Average';
        progressPercent = 20;
        comparisonText = 'You\'re a climate champion! 🌟';
    } else if (totalCarbon <= 2500) {
        carbonLevel = '🟡 Good! Below Indian Average';
        progressPercent = 40;
        comparisonText = 'Better than most Indians, keep improving! 👍';
    } else if (totalCarbon <= 4000) {
        carbonLevel = '🟠 Average - Room for Improvement';
        progressPercent = 65;
        comparisonText = 'Close to global average, time to act! ⚠️';
    } else if (totalCarbon <= 6000) {
        carbonLevel = '🔴 High - Action Needed!';
        progressPercent = 85;
        comparisonText = 'Above global average, significant changes needed! 🚨';
    } else {
        carbonLevel = '🔴 Very High - Urgent Action Required!';
        progressPercent = 100;
        comparisonText = 'Well above sustainable levels! 🚨🚨';
    }

    const carbonLevelElement = document.getElementById('carbon-level');
    const comparisonTextElement = document.getElementById('comparison-text');
    
    if (carbonLevelElement) carbonLevelElement.textContent = carbonLevel;
    if (comparisonTextElement) comparisonTextElement.textContent = comparisonText;

    // Update comparisons
    const indianAverage = 1910; // kg CO2
    const globalAverage = 4800; // kg CO2
    const parisTarget = 2300; // kg CO2

    const updateComparison = (id, average, label) => {
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = 
                `<strong>${(totalCarbon/average * 100).toFixed(0)}%</strong><br>
                <small>${totalCarbon > average ? 'Above' : 'Below'} ${label}</small>`;
        }
    };

    updateComparison('india-comparison', indianAverage, 'average');
    updateComparison('global-comparison', globalAverage, 'average');
    updateComparison('paris-comparison', parisTarget, 'target');

    // Animate progress bar
    setTimeout(() => {
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            progressFill.style.width = progressPercent + '%';
        }
    }, 500);

    // Generate personalized tips
    generateAdvancedTips(data);

    // Show results
    const resultsDiv = document.getElementById('results');
    if (resultsDiv) {
        resultsDiv.style.display = 'block';
        setTimeout(() => {
            const resultsCard = document.querySelector('.results-card');
            if (resultsCard) {
                resultsCard.classList.add('show');
            }
        }, 100);

        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }
}

function generateAdvancedTips(data) {
    const { totalCarbon, electricityCarbon, transportCarbon, foodCarbon, inputs } = data;
    const tipsList = document.getElementById('tips-list');
    let tips = [];

    // Electricity tips
    if (electricityCarbon > 1200) {
        const stateSpecific = inputs.state === 'national' ? 'solar panels' : 'state renewable programs';
        tips.push(`⚡ High electricity usage! Switch to LED bulbs, unplug devices, use ${stateSpecific}`);
        if (inputs.greenEnergy < 30) {
            tips.push('☀️ Consider rooftop solar - can reduce emissions by 60-80%');
        }
    }

    // Transport tips
    if (transportCarbon > 800) {
        if (inputs.vehicleType.includes('petrol') || inputs.vehicleType.includes('diesel')) {
            tips.push('🚗 Consider electric/hybrid vehicle for long-term savings and lower emissions');
        }
        tips.push('🚌 Use public transport or carpool - can reduce transport emissions by 50%');
        tips.push('🚲 Cycle/walk for trips under 5km');
    }

    // Food tips
    if (inputs.foodType === 'heavy-meat') {
        tips.push('🥬 Reduce meat consumption by 2-3 meals/week to cut food emissions by 30%');
    } else if (inputs.foodType === 'mixed') {
        tips.push('🌱 Try "Meatless Mondays" - going vegetarian one day/week saves 285kg CO2/year');
    }

    // Air travel tip
    if (inputs.airTravel > 1000) {
        tips.push(`✈️ Your air travel generates ${Math.round(inputs.airTravel * 0.675)} kg CO2. Consider fewer flights or carbon offsets`);
    }

    // Regional tips
    if (inputs.state === 'delhi' || inputs.state === 'punjab') {
        tips.push('🌾 Support local initiatives against stubble burning - major pollution source');
    }
    
    if (['rajasthan', 'gujarat'].includes(inputs.state)) {
        tips.push('☀️ Your state has excellent solar potential - consider solar water heaters');
    }

    // Waste tips
    if (inputs.recycling === 'none' || inputs.recycling === 'minimal') {
        tips.push('♻️ Start composting kitchen waste - reduces methane emissions significantly');
        tips.push('📱 Recycle e-waste at authorized centers - contains toxic materials');
    }

    // General tips based on total footprint
    if (totalCarbon > 3000) {
        tips.push(`🌳 Plant ${Math.ceil(totalCarbon/21)} trees or donate ₹${Math.round(totalCarbon * 0.6)} for verified carbon offsets`);
        tips.push('🏠 Improve home insulation to reduce AC/heating needs by 30%');
    }

    // Water tips
    if (inputs.water > 200) {
        tips.push('💧 Fix leaks, install low-flow fixtures - can reduce water emissions by 25%');
    }

    // Shopping tips
    if (inputs.shopping > 5000) {
        tips.push('🛒 Buy local products, repair instead of replacing - reduce consumption emissions');
    }

    // Add some positive reinforcement
    if (totalCarbon <= 2000) {
        tips.push('🌟 Excellent work! Share your eco-friendly lifestyle with friends and family');
        tips.push('📢 Become a climate advocate in your community');
    }

    // Ensure we have at least some tips
    if (tips.length === 0) {
        tips.push('💡 Switch to LED bulbs and energy-efficient appliances');
        tips.push('🚌 Use public transport or cycle more often');
        tips.push('♻️ Reduce, reuse, and recycle waste');
        tips.push('🌳 Plant trees in your community');
        tips.push('☀️ Consider renewable energy sources like solar panels');
    }

    // Update tips list
    if (tipsList) {
        tipsList.innerHTML = tips.map(tip => `<li>${tip}</li>`).join('');
    }
}

function saveToHistory(totalCarbon, inputs) {
    const entry = {
        date: new Date().toLocaleDateString('en-IN'),
        timestamp: Date.now(),
        totalCarbon: Math.round(totalCarbon),
        state: inputs.state,
        vehicleType: inputs.vehicleType,
        foodType: inputs.foodType
    };

    carbonHistory.unshift(entry);
    
    // Keep only last 10 entries
    if (carbonHistory.length > 10) {
        carbonHistory = carbonHistory.slice(0, 10);
    }

    // Save to memory (in a real app, this would be localStorage)
    saveHistoryToMemory();
}

function updateTrackingHistory() {
    const historyList = document.getElementById('history-list');
    
    if (!historyList) return;
    
    if (carbonHistory.length === 0) {
        historyList.innerHTML = `
            <p style="text-align: center; color: #666; padding: 20px;">
                No tracking history yet. Calculate your footprint to start tracking!
            </p>
        `;
        return;
    }

    const historyHTML = carbonHistory.map((entry, index) => `
        <div class="history-item" style="animation-delay: ${index * 0.1}s;">
            <div>
                <strong>📅 ${entry.date}</strong><br>
                <small>🏠 ${entry.state} | 🚗 ${entry.vehicleType} | 🍽️ ${entry.foodType}</small>
            </div>
            <div>
                <strong style="color: #667eea; font-size: 1.2rem;">${entry.totalCarbon} kg</strong><br>
                <small>CO₂ per year</small>
            </div>
        </div>
    `).join('');

    historyList.innerHTML = historyHTML;
    
    // Add trend analysis if we have multiple entries
    if (carbonHistory.length >= 2) {
        const latest = carbonHistory[0].totalCarbon;
        const previous = carbonHistory[1].totalCarbon;
        const change = latest - previous;
        const changePercent = ((change / previous) * 100).toFixed(1);
        
        let trendIcon = change > 0 ? '📈' : '📉';
        let trendColor = change > 0 ? '#FF6B6B' : '#32CD32';
        let trendText = change > 0 ? 'increased' : 'decreased';
        
        const trendHTML = `
            <div style="background: ${trendColor}20; padding: 15px; border-radius: 10px; margin-top: 15px; text-align: center;">
                <h4>${trendIcon} Trend Analysis</h4>
                <p>Your carbon footprint has <strong>${trendText}</strong> by 
                <strong style="color: ${trendColor};">${Math.abs(change)} kg (${Math.abs(changePercent)}%)</strong> since last calculation.</p>
            </div>
        `;
        
        historyList.innerHTML += trendHTML;
    }
}

function clearHistory() {
    if (confirm('Are you sure you want to clear all tracking history?')) {
        carbonHistory = [];
        saveHistoryToMemory();
        updateTrackingHistory();
    }
}

// Modal functions for methodology
function showInfoModal(title, content) {
    const modal = document.getElementById('info-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    if (modal && modalTitle && modalBody) {
        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        modal.classList.add('show');
    }
}

function closeInfoModal() {
    const modal = document.getElementById('info-modal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('info-modal');
    if (modal && event.target === modal) {
        closeInfoModal();
    }
});

// Memory storage functions (for Claude.ai compatibility)
function saveHistoryToMemory() {
    // In a real application, this would use localStorage
    // localStorage.setItem('carbonHistory', JSON.stringify(carbonHistory));
    // For now, data persists only during the session
}

function loadHistoryFromMemory() {
    // In a real application, this would load from localStorage
    // carbonHistory = JSON.parse(localStorage.getItem('carbonHistory') || '[]');
    // For now, start with empty history
    carbonHistory = [];
}

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey || event.metaKey) {
        switch(event.key) {
            case '1':
                event.preventDefault();
                switchTab('calculator');
                break;
            case '2':
                event.preventDefault();
                switchTab('tracker');
                break;
            case '3':
                event.preventDefault();
                switchTab('insights');
                break;
            case '4':
                event.preventDefault();
                switchTab('methodology');
                break;
            case 'Enter':
                event.preventDefault();
                if (currentTab === 'calculator') {
                    calculateAdvancedCarbon();
                }
                break;
        }
    }
    
    // Escape to close modal
    if (event.key === 'Escape') {
        closeInfoModal();
    }
});

// Auto-save functionality
let autoSaveTimer;
document.addEventListener('input', function() {
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(() => {
        // Auto-calculate if all required fields are filled
        const electricity = document.getElementById('electricity')?.value;
        const distance = document.getElementById('distance')?.value;
        
        if (electricity && parseFloat(electricity) > 0 || distance && parseFloat(distance) > 0) {
            // Auto calculation could be enabled here
            // calculateAdvancedCarbon();
        }
    }, 2000);
});

// Export functionality (for sharing results)
function exportResults() {
    if (carbonHistory.length === 0) {
        alert('No data to export. Calculate your carbon footprint first!');
        return;
    }

    const latest = carbonHistory[0];
    const exportData = {
        date: latest.date,
        carbonFootprint: latest.totalCarbon,
        state: latest.state,
        vehicleType: latest.vehicleType,
        foodType: latest.foodType,
        treesNeeded: Math.ceil(latest.totalCarbon / 21),
        message: `My carbon footprint is ${latest.totalCarbon} kg CO₂/year. I need to plant ${Math.ceil(latest.totalCarbon / 21)} trees to offset it. Calculate yours at EcoMitra Pro! 🌍`
    };

    // Create downloadable text file
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `carbon-footprint-${latest.date.replace(/\//g, '-')}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
}

// Print functionality
function printResults() {
    const resultsDiv = document.getElementById('results');
    if (!resultsDiv || resultsDiv.style.display === 'none') {
        alert('Please calculate your carbon footprint first!');
        return;
    }

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Carbon Footprint Report</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .print-header { text-align: center; margin-bottom: 30px; }
                .results-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
                .result-box { border: 1px solid #ddd; padding: 15px; border-radius: 8px; }
            </style>
        </head>
        <body>
            <div class="print-header">
                <h1>🌍 EcoMitra Pro - Carbon Footprint Report</h1>
                <p>Generated on: ${new Date().toLocaleDateString()}</p>
            </div>
            ${resultsDiv.innerHTML}
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Initialize tooltips and interactive elements
function initializeInteractiveElements() {
    // Add hover effects to breakdown items
    document.querySelectorAll('.breakdown-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects to calculate button
    const calculateBtn = document.querySelector('.calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-1px) scale(0.98)';
        });
        
        calculateBtn.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px) scale(1)';
        });
    }
}

// Call initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeInteractiveElements);
