// Advanced emission factors database with seasonal variations
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
    shopping: 0.0008,
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
    },
    electronics: {
        'smartphone': 85,
        'laptop': 200,
        'tablet': 100,
        'tv': 250
    }
};

// Advanced features data
const communityImpact = {
    totalUsers: 1247,
    totalCO2Reduced: 124700,
    treesPlanted: 5952,
    moneySaved: 748000
};

const challenges = [
    {
        id: 1,
        title: "🌱 Plant 5 Trees",
        description: "Plant trees in your school or community and upload photos as proof",
        target: 5,
        current: 0,
        completed: false,
        type: "tree_planting",
        reward: "Tree Champion Badge",
        proofRequired: true
    },
    {
        id: 2,
        title: "🚗 Car-Free Week",
        description: "Use public transport or cycling for 7 consecutive days and log your trips",
        target: 7,
        current: 0,
        completed: false,
        type: "transport",
        reward: "Eco Commuter Badge",
        proofRequired: true
    },
    {
        id: 3,
        title: "💡 Energy Saver",
        description: "Reduce electricity usage by 20% for one month - submit before/after electricity bills",
        target: 20,
        current: 0,
        completed: false,
        type: "energy",
        reward: "Power Saver Badge",
        proofRequired: true
    },
    {
        id: 4,
        title: "♻️ Waste Warrior",
        description: "Properly recycle 50 items and start composting - document your process",
        target: 50,
        current: 0,
        completed: false,
        type: "waste",
        reward: "Recycling Expert Badge",
        proofRequired: true
    },
    {
        id: 5,
        title: "💧 Water Conservation",
        description: "Install rainwater harvesting or reduce water usage by 30% for one month",
        target: 30,
        current: 0,
        completed: false,
        type: "water",
        reward: "Water Guardian Badge",
        proofRequired: true
    }
];

const schoolsLeaderboard = [
    { name: "Kendriya Vidyalaya", co2Reduced: 2500, students: 1200 },
    { name: "Delhi Public School", co2Reduced: 1800, students: 1500 },
    { name: "St. Xavier's School", co2Reduced: 1650, students: 1100 },
    { name: "Sanskriti School", co2Reduced: 1420, students: 900 },
    { name: "Modern School", co2Reduced: 1280, students: 1300 }
];

const climateNews = [
    {
        title: "India's Renewable Energy Capacity Crosses 70 GW",
        source: "Ministry of New and Renewable Energy",
        date: "2024-01-15"
    },
    {
        title: "Global CO2 Levels Reach New High in 2024",
        source: "World Meteorological Organization",
        date: "2024-01-12"
    },
    {
        title: "CBSE Launches Green School Initiative",
        source: "CBSE Official Announcement",
        date: "2024-01-10"
    },
    {
        title: "Electric Vehicle Sales Surge by 45% in India",
        source: "Society of Indian Automobile Manufacturers",
        date: "2024-01-08"
    },
    {
        title: "New Study Shows Benefits of Plant-Based Diets for Climate",
        source: "Nature Climate Change Journal",
        date: "2024-01-05"
    }
];

// Carbon tracking storage
let carbonHistory = [];
let userAchievements = [];

// Current active tab
let currentTab = 'calculator';

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadHistoryFromStorage();
    initializeAdvancedFeatures();
    
    // Add animation delay to input groups
    const inputGroups = document.querySelectorAll('.input-group');
    inputGroups.forEach((group, index) => {
        group.style.animationDelay = (index * 0.1) + 's';
    });

    // Initialize slider
    updateSliderValue('green-energy', 'green-energy-value');

    // Start live data updates
    startLiveDataUpdates();
    initializeCarbonVisualization();
    loadChallenges();
    updateCommunityImpact();
    loadSchoolLeaderboard();
    loadClimateNews();
    updateHistoryDisplay();
});

function loadHistoryFromStorage() {
    const storedHistory = localStorage.getItem('carbonHistory');
    if (storedHistory) {
        carbonHistory = JSON.parse(storedHistory);
    }
    
    const storedAchievements = localStorage.getItem('userAchievements');
    if (storedAchievements) {
        userAchievements = JSON.parse(storedAchievements);
    }
}

function saveHistoryToStorage() {
    localStorage.setItem('carbonHistory', JSON.stringify(carbonHistory));
    localStorage.setItem('userAchievements', JSON.stringify(userAchievements));
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('history-list');
    const totalCalculations = document.getElementById('total-calculations');
    const averageFootprint = document.getElementById('average-footprint');
    const bestFootprint = document.getElementById('best-footprint');
    
    if (!historyList) return;
    
    // Update stats
    if (totalCalculations) {
        totalCalculations.textContent = carbonHistory.length;
    }
    
    if (averageFootprint && carbonHistory.length > 0) {
        const avg = carbonHistory.reduce((sum, entry) => sum + entry.totalCarbon, 0) / carbonHistory.length;
        averageFootprint.textContent = Math.round(avg) + ' kg';
    }
    
    if (bestFootprint && carbonHistory.length > 0) {
        const best = Math.min(...carbonHistory.map(entry => entry.totalCarbon));
        bestFootprint.textContent = Math.round(best) + ' kg';
    }
    
    // Update history list
    historyList.innerHTML = '';
    
    if (carbonHistory.length === 0) {
        historyList.innerHTML = '<div class="no-history">No calculations yet. Use the calculator to get started!</div>';
        return;
    }
    
    carbonHistory.forEach((entry, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-date">${entry.date}</div>
            <div class="history-carbon">${Math.round(entry.totalCarbon)} kg CO₂</div>
            <div class="history-details">
                <span>${entry.state} • ${entry.vehicleType} • ${entry.foodType}</span>
            </div>
            <button class="history-delete" onclick="deleteHistoryEntry(${index})">🗑️</button>
        `;
        historyList.appendChild(historyItem);
    });
}

function deleteHistoryEntry(index) {
    carbonHistory.splice(index, 1);
    saveHistoryToStorage();
    updateHistoryDisplay();
}

function clearHistory() {
    if (confirm("Are you sure you want to clear your calculation history? This action cannot be undone.")) {
        carbonHistory = [];
        saveHistoryToStorage();
        updateHistoryDisplay();
    }
}

function exportHistory() {
    if (carbonHistory.length === 0) {
        alert("No history to export!");
        return;
    }
    
    const exportData = {
        exportedAt: new Date().toISOString(),
        totalEntries: carbonHistory.length,
        history: carbonHistory
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `carbon-history-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
}

function initializeAdvancedFeatures() {
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

    // Initialize interactive elements
    initializeInteractiveElements();
}

function switchTab(tabName) {
    document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');
    
    currentTab = tabName;
    
    if (tabName === 'impact') {
        updateCarbonVisualization();
    } else if (tabName === 'challenges') {
        updateChallengesProgress();
    } else if (tabName === 'history') {
        updateHistoryDisplay();
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
        shopping: parseFloat(document.getElementById('shopping')?.value) || 0,
        greenEnergy: parseFloat(document.getElementById('green-energy')?.value) || 0,
        recycling: document.getElementById('recycling')?.value || 'none',
        electronics: parseFloat(document.getElementById('electronics')?.value) || 1
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
    
    const airTravelCarbon = inputs.airTravel * emissionFactors.aviation * 2.7 / inputs.householdSize;
    
    const shoppingCarbon = inputs.shopping * emissionFactors.shopping * 12 / inputs.householdSize;

    // Electronics embodied carbon
    const electronicsCarbon = inputs.electronics * emissionFactors.electronics.smartphone;

    // Total carbon footprint
    const totalCarbon = electricityCarbon + transportCarbon + foodCarbon + 
                       wasteCarbon + waterCarbon + airTravelCarbon + 
                       shoppingCarbon + electronicsCarbon;

    // Trees needed and offset cost
    const treesNeeded = Math.ceil(totalCarbon / 21);

    // Update all results
    updateResults({
        totalCarbon,
        electricityCarbon,
        transportCarbon,
        foodCarbon,
        wasteCarbon,
        waterCarbon,
        airTravelCarbon: airTravelCarbon + shoppingCarbon + electronicsCarbon,
        treesNeeded,
        inputs
    });

    // Save to history
    saveToHistory(totalCarbon, inputs);

    // Update challenges
    updateChallengesWithNewData(inputs, totalCarbon);
}

function getComparisonEmoji(percentage) {
    if (percentage <= 80) return '🎉';
    if (percentage <= 100) return '✅';
    if (percentage <= 120) return '⚠️';
    return '🔴';
}

function updateResults(data) {
    const {
        totalCarbon, electricityCarbon, transportCarbon, foodCarbon, 
        wasteCarbon, waterCarbon, airTravelCarbon, treesNeeded, inputs
    } = data;

    // Update main results
    const totalCarbonElement = document.getElementById('total-carbon');
    const treesCountElement = document.getElementById('trees-count');
    
    if (totalCarbonElement) totalCarbonElement.textContent = Math.round(totalCarbon);
    if (treesCountElement) treesCountElement.textContent = treesNeeded;

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
    const indianAverage = 1910;
    const globalAverage = 4800;
    const parisTarget = 2300;

    const updateComparison = (id, average, label) => {
        const element = document.getElementById(id);
        if (element) {
            const percentage = (totalCarbon / average * 100);
            const isAbove = totalCarbon > average;
            
            let description = '';
            if (percentage <= 80) description = 'Well below target';
            else if (percentage <= 100) description = 'On track';
            else if (percentage <= 120) description = 'Slightly above';
            else description = 'Above target';
            
            element.innerHTML = `
                <span class="impact-emoji-enhanced">${getComparisonEmoji(percentage)}</span>
                <div class="impact-title-enhanced">${label}</div>
                <div class="impact-value-enhanced">${percentage.toFixed(0)}%</div>
                <div class="impact-description-enhanced">${description}</div>
            `;
            
            // Add status class
            const item = element.closest('.impact-item-enhanced');
            if (item) {
                item.classList.remove('status-good', 'status-warning', 'status-bad');
                if (percentage <= 80) item.classList.add('status-good');
                else if (percentage <= 100) item.classList.add('status-good');
                else if (percentage <= 120) item.classList.add('status-warning');
                else item.classList.add('status-bad');
            }
        }
    };

    updateComparison('india-comparison', indianAverage, 'vs Indian Average');
    updateComparison('global-comparison', globalAverage, 'vs Global Average');
    updateComparison('paris-comparison', parisTarget, 'vs Paris Target');

    // Animate progress bar
    setTimeout(() => {
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            progressFill.style.width = progressPercent + '%';
        }
    }, 500);

    // Generate personalized tips and action plan
    generateAdvancedTips(data);
    generateActionPlan(data);

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
        tips.push('⚡ Switch to LED bulbs - they use 75% less energy and last 25 times longer');
        tips.push('🔌 Unplug electronics when not in use - phantom loads account for 5-10% of home energy use');
        
        if (inputs.greenEnergy < 30) {
            tips.push('☀️ Consider rooftop solar - can reduce electricity emissions by 60-80% with payback in 5-7 years');
        }
        
        if (inputs.state === 'rajasthan' || inputs.state === 'gujarat') {
            tips.push('🌞 Your state has excellent solar potential - explore government subsidies for solar installations');
        }
    }

    // Transport tips
    if (transportCarbon > 800) {
        if (inputs.vehicleType.includes('petrol') || inputs.vehicleType.includes('diesel')) {
            tips.push('🚗 Consider carpooling - sharing rides with 2 others can cut your transport emissions by 66%');
        }
        
        tips.push('🚌 Use public transport for daily commute - emits 45% less CO2 per passenger than private cars');
        tips.push('🚲 Cycle or walk for trips under 5km - zero emissions and health benefits');
        
        if (inputs.distance > 1000) {
            tips.push('🛵 Consider switching to electric scooter - emits 70% less CO2 than petrol vehicles');
        }
    }

    // Food tips
    if (inputs.foodType === 'heavy-meat') {
        tips.push('🥬 Replace red meat with plant proteins 2-3 times/week - can reduce food emissions by 30%');
    } else if (inputs.foodType === 'mixed') {
        tips.push('🌱 Try "Meatless Mondays" - going vegetarian one day/week saves approximately 285kg CO2/year');
    }
    
    tips.push('🥗 Buy local and seasonal produce - reduces transportation emissions and supports local farmers');

    // Air travel tip
    if (inputs.airTravel > 1000) {
        tips.push(`✈️ Consider train travel for domestic trips under 800km - emits 85% less CO2 than flying`);
    }

    // Waste tips
    if (inputs.recycling === 'none' || inputs.recycling === 'minimal') {
        tips.push('♻️ Start segregating waste - proper recycling can reduce landfill emissions by 30%');
        tips.push('🍂 Compost kitchen waste - reduces methane emissions from landfills and creates natural fertilizer');
    }

    // Water tips
    if (inputs.water > 200) {
        tips.push('💧 Install low-flow showerheads - can reduce water heating emissions by 15%');
        tips.push('🚿 Take shorter showers - reducing shower time by 2 minutes saves 1,825 liters per person monthly');
    }

    // Shopping tips
    if (inputs.shopping > 5000) {
        tips.push('🛒 Buy quality products that last longer - reduces manufacturing emissions from frequent replacements');
        tips.push('👕 Choose second-hand clothing - the fashion industry accounts for 10% of global carbon emissions');
    }

    // Electronics tips
    if (inputs.electronics > 2) {
        tips.push('📱 Extend smartphone lifespan to 3+ years - manufacturing a new phone generates 85kg CO2');
    }

    // Regional specific tips
    if (inputs.state === 'delhi' || inputs.state === 'punjab') {
        tips.push('🌾 Support local initiatives against stubble burning - major contributor to winter air pollution');
    }
    
    if (['uttarakhand', 'himachal-pradesh'].includes(inputs.state)) {
        tips.push('🌲 Participate in local reforestation programs - Himalayan forests are crucial carbon sinks');
    }

    // General tips based on total footprint
    if (totalCarbon > 3000) {
        tips.push(`🌳 Plant ${Math.ceil(totalCarbon/21)} native trees - each tree absorbs approximately 21kg CO2 annually`);
        tips.push('🏠 Improve home insulation - can reduce heating/cooling energy needs by 30%');
    }

    // Add some positive reinforcement
    if (totalCarbon <= 2000) {
        tips.push('🌟 Excellent work! Share your eco-friendly practices with friends and family');
        tips.push('📢 Become a climate advocate in your community - collective action drives real change');
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

function generateActionPlan(data) {
    const { totalCarbon, electricityCarbon, transportCarbon, foodCarbon, inputs } = data;
    const actionSteps = document.getElementById('action-steps');
    let actions = [];

    // High priority actions
    if (electricityCarbon > 1500) {
        actions.push({
            priority: 'HIGH',
            title: 'Switch to Energy Efficient Appliances',
            description: 'Replace old appliances with 5-star BEE rated models',
            impact: 'Reduce electricity consumption by 20-30%',
            timeline: 'Immediate - 3 months'
        });
    }

    if (transportCarbon > 1000) {
        actions.push({
            priority: 'HIGH',
            title: 'Optimize Transportation',
            description: 'Use public transport, carpool, or switch to electric vehicle',
            impact: 'Reduce transport emissions by 40-60%',
            timeline: 'Immediate - 1 year'
        });
    }

    // Medium priority actions
    if (foodCarbon > 2000) {
        actions.push({
            priority: 'MEDIUM',
            title: 'Adjust Diet',
            description: 'Reduce meat consumption and choose local, seasonal foods',
            impact: 'Reduce food emissions by 25%',
            timeline: 'Immediate'
        });
    }

    if (inputs.water > 250) {
        actions.push({
            priority: 'MEDIUM',
            title: 'Water Conservation',
            description: 'Install low-flow fixtures and fix leaks',
            impact: 'Reduce water-related emissions by 30%',
            timeline: '2-4 weeks'
        });
    }

    // Low priority actions
    actions.push({
        priority: 'LOW',
        title: 'Home Energy Audit',
        description: 'Conduct a professional energy audit to identify savings opportunities',
        impact: 'Identify 15-30% additional energy savings',
        timeline: '1-2 months'
    });

    // Generate HTML for action steps
    if (actionSteps) {
        const actionsHTML = actions.map(action => `
            <div class="action-step">
                <div class="step-priority priority-${action.priority.toLowerCase()}">
                    ${action.priority} PRIORITY
                </div>
                <h4>${action.title}</h4>
                <p>${action.description}</p>
                <div class="action-details">
                    <strong>Impact:</strong> ${action.impact}<br>
                    <strong>Timeline:</strong> ${action.timeline}
                </div>
            </div>
        `).join('');

        actionSteps.innerHTML = actionsHTML;
    }
}

// Live Data Functions
function startLiveDataUpdates() {
    updateLiveAQI();
    setInterval(updateLiveAQI, 60000); // Update every minute
    setInterval(updateCarbonVisualization, 5000); // Update visualization
    setInterval(loadClimateNews, 300000); // Update news every 5 minutes
}

async function updateLiveAQI() {
    try {
        // Using a demo API - in production, use real AQI API with proper token
        const response = await fetch('https://api.waqi.info/feed/delhi/?token=demo');
        const data = await response.json();
        
        const aqiValue = data.data?.aqi || 156;
        const aqiLevel = getAQILevel(aqiValue);
        
        document.getElementById('live-aqi').textContent = `🌬️ Live AQI: ${aqiValue} (${aqiLevel})`;
        document.getElementById('live-aqi-value').textContent = aqiValue;
        document.getElementById('aqi-level').textContent = aqiLevel;
        
    } catch (error) {
        // Fallback to simulated data
        const simulatedAQI = 120 + Math.floor(Math.random() * 80);
        const aqiLevel = getAQILevel(simulatedAQI);
        
        document.getElementById('live-aqi').textContent = `🌬️ Live AQI: ${simulatedAQI} (${aqiLevel})`;
        document.getElementById('live-aqi-value').textContent = simulatedAQI;
        document.getElementById('aqi-level').textContent = aqiLevel;
    }
}

function getAQILevel(aqi) {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
}

// Climate News
function loadClimateNews() {
    const newsContainer = document.getElementById('news-container');
    if (!newsContainer) return;

    // Shuffle news for variety
    const shuffledNews = [...climateNews].sort(() => 0.5 - Math.random()).slice(0, 3);
    
    const newsHTML = shuffledNews.map(news => `
        <div class="news-item">
            <div class="news-title">${news.title}</div>
            <div class="news-source">${news.source} • ${news.date}</div>
        </div>
    `).join('');
    
    newsContainer.innerHTML = newsHTML;
}

// Carbon Visualization
function initializeCarbonVisualization() {
    updateCarbonVisualization();
}

function updateCarbonVisualization() {
    const particleSystem = document.getElementById('carbon-particle-system');
    if (!particleSystem) return;

    // Clear existing particles
    particleSystem.innerHTML = '';

    // Create particles based on community impact
    const particleCount = Math.min(Math.floor(communityImpact.totalCO2Reduced / 1000), 200);
    
    document.getElementById('particle-count').textContent = particleCount;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'carbon-particle';
        
        // Random position
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        // Random animation delay and duration
        const delay = Math.random() * 6;
        const duration = 4 + Math.random() * 4;
        
        particle.style.left = left + '%';
        particle.style.top = top + '%';
        particle.style.animationDelay = delay + 's';
        particle.style.animationDuration = duration + 's';
        
        // Random size and opacity for visual interest
        const size = 2 + Math.random() * 4;
        const opacity = 0.3 + Math.random() * 0.7;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.opacity = opacity;
        
        particleSystem.appendChild(particle);
    }
}

// Challenges System
function loadChallenges() {
    const container = document.getElementById('challenges-container');
    if (!container) return;

    const challengesHTML = challenges.map(challenge => `
        <div class="challenge-card ${challenge.completed ? 'completed' : ''}">
            <div class="challenge-header">
                <span class="challenge-icon">${challenge.title.split(' ')[0]}</span>
                <span class="challenge-title">${challenge.title}</span>
            </div>
            <p class="challenge-description">${challenge.description}</p>
            ${challenge.proofRequired ? '<div class="proof-required">📸 Photo proof required</div>' : ''}
            <div class="challenge-progress">
                <div class="progress-bar-inner" style="width: ${(challenge.current / challenge.target) * 100}%"></div>
            </div>
            <div class="challenge-stats">
                Progress: ${challenge.current}/${challenge.target}
            </div>
            <button class="challenge-btn ${challenge.completed ? 'completed' : ''}" 
                    onclick="updateChallenge(${challenge.id})"
                    ${challenge.completed ? 'disabled' : ''}>
                ${challenge.completed ? '✅ Completed' : 'Start Challenge'}
            </button>
            ${!challenge.completed ? `<button class="proof-btn" onclick="submitProof(${challenge.id})">📸 Submit Proof</button>` : ''}
        </div>
    `).join('');

    container.innerHTML = challengesHTML;
}

function updateChallenge(challengeId) {
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge && !challenge.completed) {
        challenge.current += 1;
        if (challenge.current >= challenge.target) {
            challenge.completed = true;
            userAchievements.push(challenge.reward);
            updateAchievements();
            saveHistoryToStorage();
        }
        updateChallengesProgress();
    }
}

function submitProof(challengeId) {
    alert(`For challenge ${challengeId}, please upload photos or documentation showing your progress. In a real application, this would open a file upload dialog.`);
}

function updateChallengesProgress() {
    loadChallenges(); // Reload challenges to update progress
}

function updateChallengesWithNewData(inputs, totalCarbon) {
    // Update challenges based on new calculation data
    challenges.forEach(challenge => {
        if (!challenge.completed) {
            switch (challenge.type) {
                case 'tree_planting':
                    // Could integrate with actual tree planting data
                    break;
                case 'transport':
                    if (inputs.distance < 500) {
                        challenge.current = Math.min(challenge.current + 1, challenge.target);
                    }
                    break;
                case 'energy':
                    if (inputs.electricity < 200) {
                        challenge.current = Math.min(challenge.current + 1, challenge.target);
                    }
                    break;
                case 'water':
                    if (inputs.water < 150) {
                        challenge.current = Math.min(challenge.current + 1, challenge.target);
                    }
                    break;
            }
            
            if (challenge.current >= challenge.target) {
                challenge.completed = true;
                userAchievements.push(challenge.reward);
                saveHistoryToStorage();
            }
        }
    });
    
    updateChallengesProgress();
    updateAchievements();
}

function updateAchievements() {
    const achievementsList = document.getElementById('achievements-list');
    if (!achievementsList) return;

    const achievements = document.querySelectorAll('.achievement-item');
    achievements.forEach((achievement, index) => {
        if (index < userAchievements.length) {
            achievement.classList.remove('locked');
            achievement.classList.add('unlocked');
        }
    });
}

// Community Impact
function updateCommunityImpact() {
    document.getElementById('total-users').textContent = communityImpact.totalUsers.toLocaleString();
    document.getElementById('total-co2-reduced').textContent = (communityImpact.totalCO2Reduced / 1000).toFixed(1) + 'T';
    document.getElementById('total-trees').textContent = communityImpact.treesPlanted.toLocaleString();
}

// School Leaderboard
function loadSchoolLeaderboard() {
    const leaderboard = document.getElementById('school-leaderboard');
    if (!leaderboard) return;

    const sortedSchools = [...schoolsLeaderboard].sort((a, b) => b.co2Reduced - a.co2Reduced);
    
    const leaderboardHTML = sortedSchools.map((school, index) => `
        <div class="leaderboard-item">
            <span class="rank">#${index + 1}</span>
            <span class="school-name">${school.name}</span>
            <span class="carbon-saved">-${school.co2Reduced} kg</span>
        </div>
    `).join('');

    leaderboard.innerHTML = leaderboardHTML;
}

function joinSchoolChallenge() {
    alert('🎯 School Challenge Joined! Your school will now appear on the leaderboard as you reduce carbon emissions. For CBSE Science Exhibition, document your climate actions with photos and data.');
    // In a real implementation, this would connect to a backend service
}

// Export Functions
function exportPDF() {
    alert('📄 PDF export feature would generate a detailed climate action report');
    // In real implementation, use libraries like jsPDF
}

function exportJSON() {
    const totalCarbon = parseFloat(document.getElementById('total-carbon')?.textContent) || 0;
    if (totalCarbon === 0) {
        alert('Please calculate your carbon footprint first!');
        return;
    }

    const exportData = {
        timestamp: new Date().toISOString(),
        carbonFootprint: totalCarbon,
        treesNeeded: Math.ceil(totalCarbon / 21),
        recommendations: Array.from(document.querySelectorAll('#tips-list li')).map(li => li.textContent),
        actionPlan: Array.from(document.querySelectorAll('.action-step')).map(step => ({
            title: step.querySelector('h4').textContent,
            priority: step.querySelector('.step-priority').textContent,
            description: step.querySelector('p').textContent
        }))
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `carbon-footprint-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
}

function shareResults() {
    const totalCarbon = parseFloat(document.getElementById('total-carbon')?.textContent) || 0;
    if (totalCarbon === 0) {
        alert('Please calculate your carbon footprint first!');
        return;
    }

    const treesNeeded = Math.ceil(totalCarbon / 21);
    const shareText = `🌍 My carbon footprint is ${Math.round(totalCarbon)} kg CO₂/year. I need to plant ${treesNeeded} trees to offset it. Calculate yours with EcoMitra Pro! #ClimateAction #CarbonFootprint`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Carbon Footprint Results',
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            alert('📋 Results copied to clipboard! Share it with your friends.');
        });
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
    
    if (carbonHistory.length > 50) {
        carbonHistory = carbonHistory.slice(0, 50);
    }

    saveHistoryToStorage();
    updateHistoryDisplay();
}

function closeInfoModal() {
    const modal = document.getElementById('info-modal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function closeExportModal() {
    const modal = document.getElementById('export-modal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function initializeInteractiveElements() {
    document.querySelectorAll('.breakdown-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

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
                switchTab('history');
                break;
            case '3':
                event.preventDefault();
                switchTab('impact');
                break;
            case '4':
                event.preventDefault();
                switchTab('challenges');
                break;
            case '5':
                event.preventDefault();
                switchTab('community');
                break;
            case '6':
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
    
    if (event.key === 'Escape') {
        closeInfoModal();
        closeExportModal();
    }
});

// Auto-save functionality
let autoSaveTimer;
document.addEventListener('input', function() {
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(() => {
        const electricity = document.getElementById('electricity')?.value;
        const distance = document.getElementById('distance')?.value;
        
        if (electricity && parseFloat(electricity) > 0 || distance && parseFloat(distance) > 0) {
            // Auto calculation could be enabled here
        }
    }, 2000);
});
