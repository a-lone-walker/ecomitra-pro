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
    registerServiceWorker();
    
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
function updateHistoryStats() {
    // Update history stats in the history section
    if (carbonHistory.length > 0) {
        // Calculate total calculations
        const totalCalculations = carbonHistory.length;
        document.getElementById('total-calculations').textContent = totalCalculations;
        
        // Calculate average footprint
        const totalFootprint = carbonHistory.reduce((sum, entry) => sum + entry.totalCarbon, 0);
        const averageFootprint = totalFootprint / totalCalculations;
        document.getElementById('average-footprint').textContent = `${averageFootprint.toFixed(1)} kg`;
        
        // Find best footprint
        const bestFootprint = Math.min(...carbonHistory.map(entry => entry.totalCarbon));
        document.getElementById('best-footprint').textContent = `${bestFootprint.toFixed(1)} kg`;
    } else {
        // Set default values when no history
        document.getElementById('total-calculations').textContent = '0';
        document.getElementById('average-footprint').textContent = '0 kg';
        document.getElementById('best-footprint').textContent = '0 kg';
    }
}

// Trend analysis function removed

function compareWithHistory(index) {
    const historyEntry = carbonHistory[index];
    const timestamp = historyEntry.timestamp || historyEntry.datetime;
    const date = new Date(timestamp);
    
    alert(`Comparing with your calculation from ${date.toLocaleDateString()}:\n\n` +
          `Carbon Footprint: ${historyEntry.totalCarbon} kg CO₂\n` +
          `Lifestyle: ${historyEntry.state}, ${historyEntry.vehicleType}, ${historyEntry.foodType}\n\n` +
          `This feature would show a detailed comparison chart in the full version.`);
}

function deleteHistoryItem(index) {
    if (confirm('Are you sure you want to delete this history entry?')) {
        carbonHistory.splice(index, 1);
        saveHistoryToStorage();
        updateHistoryDisplay();
    }
}
function updateHistoryDisplay() {
    const historyList = document.getElementById('history-list');
    
    if (!historyList) return;
    
    // Update history stats
    updateHistoryStats();
    
    if (carbonHistory.length === 0) {
        historyList.innerHTML = `
            <div class="history-empty">
                <div class="history-empty-icon">📊</div>
                <div class="history-empty-text">No tracking history yet</div>
                <div class="history-empty-subtext">Calculate your footprint to start tracking your progress!</div>
            </div>
        `;
        return;
    }

    const historyHTML = carbonHistory.map((entry, index) => {
        // Handle both old and new timestamp formats
        const timestamp = entry.timestamp || entry.datetime;
        const date = new Date(timestamp);
        const dateString = date.toLocaleDateString('en-IN');
        const timeString = date.toLocaleTimeString('en-IN', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        
        // Format lifestyle tags with icons
        const lifestyleTags = `
            <div class="lifestyle-tag">
                <span class="lifestyle-icon">🏠</span>
                ${entry.state.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </div>
            <div class="lifestyle-tag">
                <span class="lifestyle-icon">🚗</span>
                ${entry.vehicleType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </div>
            <div class="lifestyle-tag">
                <span class="lifestyle-icon">🍽️</span>
                ${entry.foodType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </div>
        `;
        
        return `
            <div class="history-item" style="animation-delay: ${index * 0.1}s;">
                <div class="history-date">
                    <div class="history-date-main">${dateString}</div>
                    <div class="history-date-time">${timeString}</div>
                </div>
                <div class="history-details">
                    <div class="history-carbon">
                        <span class="history-carbon-value">${entry.totalCarbon.toLocaleString()}</span>
                        <span class="history-carbon-unit">kg CO₂</span>
                    </div>
                    <div class="history-lifestyle">
                        ${lifestyleTags}
                    </div>
                </div>
                <div class="history-actions">
                    <button class="history-delete-btn" onclick="deleteHistoryItem(${index})">
                        🗑️ Delete
                    </button>
                </div>
            </div>
        `;
    }).join('');

    historyList.innerHTML = historyHTML;
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

    const updateComparison = (valueId, descriptionId, average, label) => {
        const valueElement = document.getElementById(valueId);
        const descriptionElement = document.getElementById(descriptionId);
        
        if (valueElement && descriptionElement) {
            const percentage = (totalCarbon / average * 100);
            
            let description = '';
            if (percentage <= 80) description = 'Well below target';
            else if (percentage <= 100) description = 'On track';
            else if (percentage <= 120) description = 'Slightly above';
            else description = 'Above target';
            
            valueElement.textContent = percentage.toFixed(0) + '%';
            descriptionElement.textContent = description;
            
            // Update status class
            const item = valueElement.closest('.impact-item-enhanced');
            if (item) {
                item.classList.remove('status-good', 'status-warning', 'status-bad');
                if (percentage <= 80) item.classList.add('status-good');
                else if (percentage <= 100) item.classList.add('status-good');
                else if (percentage <= 120) item.classList.add('status-warning');
                else item.classList.add('status-bad');
            }
        }
    };

    updateComparison('india-comparison', 'india-description', indianAverage, 'vs Indian Average');
    updateComparison('global-comparison', 'global-description', globalAverage, 'vs Global Average');
    updateComparison('paris-comparison', 'paris-description', parisTarget, 'vs Paris Target');

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

    const studentName = document.getElementById('student-name')?.value?.trim() || 'Student';
    const treesNeeded = Math.ceil(totalCarbon / 21);
    const category = getCarbonCategory(totalCarbon);
    
    // Create a shareable image
    createShareableImage(studentName, totalCarbon, treesNeeded, category);
}

function createShareableImage(name, carbon, trees, category) {
    // Create a canvas for the shareable image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size for social media (1200x630 is optimal for most platforms)
    canvas.width = 1200;
    canvas.height = 630;
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#2E8B57');
    gradient.addColorStop(1, '#32CD32');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add white content area
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);
    
    // Add border
    ctx.strokeStyle = '#32CD32';
    ctx.lineWidth = 8;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);
    
    // Set text properties
    ctx.fillStyle = '#2E8B57';
    ctx.textAlign = 'center';
    
    // Title
    ctx.font = 'bold 48px Arial';
    ctx.fillText('🌍 My Carbon Footprint Results', canvas.width / 2, 150);
    
    // Student name
    ctx.font = 'bold 36px Arial';
    ctx.fillText(name, canvas.width / 2, 220);
    
    // Carbon footprint
    ctx.font = 'bold 72px Arial';
    ctx.fillStyle = '#667eea';
    ctx.fillText(`${Math.round(carbon)} kg CO₂/year`, canvas.width / 2, 320);
    
    // Details
    ctx.font = '28px Arial';
    ctx.fillStyle = '#333';
    ctx.fillText(`🌳 Trees needed to offset: ${trees} trees`, canvas.width / 2, 380);
    ctx.fillText(`📊 Category: ${category}`, canvas.width / 2, 420);
    
    // Footer
    ctx.font = '24px Arial';
    ctx.fillStyle = '#666';
    ctx.fillText('Calculate yours with EcoMitra Pro!', canvas.width / 2, 500);
    ctx.fillText('CBSE Science Exhibition 2025', canvas.width / 2, 540);
    
    // Convert canvas to blob and share
    canvas.toBlob(function(blob) {
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], 'carbon-footprint.png', { type: 'image/png' })] })) {
            const file = new File([blob], 'carbon-footprint.png', { type: 'image/png' });
            navigator.share({
                title: 'My Carbon Footprint Results',
                text: `🌍 My carbon footprint is ${Math.round(carbon)} kg CO₂/year. Calculate yours with EcoMitra Pro! #ClimateAction #CBSE2025`,
                files: [file]
            }).catch(() => {
                // Fallback to download
                downloadImage(canvas);
            });
        } else {
            // Fallback to download
            downloadImage(canvas);
        }
    }, 'image/png');
}

function downloadImage(canvas) {
    const link = document.createElement('a');
    link.download = 'my-carbon-footprint.png';
    link.href = canvas.toDataURL();
    link.click();
    
    // Also copy text to clipboard
    const totalCarbon = parseFloat(document.getElementById('total-carbon')?.textContent) || 0;
    const treesNeeded = Math.ceil(totalCarbon / 21);
    const shareText = `🌍 My carbon footprint is ${Math.round(totalCarbon)} kg CO₂/year. I need to plant ${treesNeeded} trees to offset it. Calculate yours with EcoMitra Pro! #ClimateAction #CarbonFootprint #CBSE2025`;
    
    navigator.clipboard.writeText(shareText).then(() => {
        alert('📱 Image downloaded and text copied to clipboard! Share both with your friends and school.');
    });
}

function generateCertificate() {
    const totalCarbon = parseFloat(document.getElementById('total-carbon')?.textContent) || 0;
    if (totalCarbon === 0) {
        alert('Please calculate your carbon footprint first to generate your certificate!');
        return;
    }
    
    const studentName = document.getElementById('student-name')?.value?.trim() || 'Student';
    const treesNeeded = Math.ceil(totalCarbon / 21);
    const currentDate = new Date().toLocaleString('en-IN', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
    }); // Current date and time: 07 October 2025, 02:10 PM IST

    const certificateHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Carbon Footprint Certificate - EcoMitra Pro</title>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
            <style>
                @page {
                    size: A4 landscape;
                    margin: 0;
                }
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: 'Georgia', serif;
                    width: 297mm;
                    height: 210mm;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: white;
                    padding: 0;
                }
                .certificate {
                    width: 297mm;
                    height: 210mm;
                    position: relative;
                    border: 4px solid #32CD32;
                    border-radius: 5mm;
                    padding: 10mm;
                    background: linear-gradient(to right, #f0f8f0, #ffffff);
                    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }
                .header {
                    text-align: center;
                    margin-bottom: 8mm;
                }
                .badge {
                    font-size: 3.5rem;
                    color: #32CD32;
                    margin-bottom: 4mm;
                }
                .title {
                    font-size: 2.2rem;
                    color: #2E8B57;
                    font-weight: bold;
                    text-transform: uppercase;
                    margin-bottom: 2mm;
                }
                .subtitle {
                    font-size: 1rem;
                    color: #4a4a4a;
                    margin-bottom: 3mm;
                }
                .school-highlight {
                    font-size: 1.2rem;
                    color: #FFD700;
                    font-weight: bold;
                    background: #2E8B57;
                    padding: 2mm 4mm;
                    border-radius: 3mm;
                    display: inline-block;
                }
                .content {
                    flex: 1;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    gap: 10mm;
                    padding: 0 5mm;
                }
                .left-section, .right-section {
                    flex: 1;
                    text-align: center;
                }
                .student-name {
                    font-size: 1.6rem;
                    color: #2E8B57;
                    font-style: italic;
                    margin: 5mm 0;
                    border-bottom: 2px dashed #32CD32;
                    padding-bottom: 2mm;
                    display: inline-block;
                }
                .results-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 5mm;
                    max-width: 100%;
                }
                .result-item {
                    background: #e8f5e8;
                    padding: 5mm;
                    border-radius: 3mm;
                    border: 1px solid #32CD32;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                }
                .result-label {
                    font-weight: bold;
                    color: #2E8B57;
                    margin-bottom: 2mm;
                }
                .result-value {
                    font-size: 1.3rem;
                    color: #667eea;
                    font-weight: bold;
                }
                .description {
                    font-size: 0.9rem;
                    color: #555;
                    line-height: 1.5;
                    text-align: justify;
                    max-width: 90%;
                    margin: 0 auto 5mm;
                }
                .seal {
                    position: absolute;
                    bottom: 15mm;
                    right: 15mm;
                    width: 25mm;
                    height: 25mm;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(50, 205, 50, 0.3) 0%, transparent 70%);
                    opacity: 0.5;
                }
                .footer {
                    text-align: center;
                    color: #666;
                    font-size: 0.8rem;
                    margin-top: 5mm;
                }
                .date {
                    margin-bottom: 2mm;
                }
                .motto {
                    font-style: italic;
                    color: #32CD32;
                    margin-top: 2mm;
                }
                @media print {
                    body { padding: 0; margin: 0; }
                    .certificate { border: none; box-shadow: none; border-radius: 0; }
                    .no-print { display: none; }
                }
                @media screen and (max-width: 768px) {
                    .certificate { 
                        width: 100%;
                        height: auto;
                        min-height: 210mm;
                        padding: 8mm;
                        flex-direction: column;
                    }
                    .content { flex-direction: column; gap: 5mm; }
                    .left-section, .right-section { width: 100%; }
                    .title { font-size: 1.8rem; }
                    .student-name { font-size: 1.4rem; }
                    .result-value { font-size: 1.2rem; }
                    .description { font-size: 0.85rem; }
                    .seal { bottom: 10mm; right: 10mm; width: 20mm; height: 20mm; }
                }
            </style>
        </head>
        <body>
            <div class="certificate">
                <div class="header">
                    <div class="badge">🏆</div>
                    <div class="title">Certificate of Environmental Excellence</div>
                    <div class="subtitle">CBSE Science Exhibition 2025</div>
                    <div class="subtitle">Developed by <span class="school-highlight">Delhi Public School</span></div>
                    <div class="subtitle">Powered by EcoMitra Pro - xAI Advanced Carbon Intelligence</div>
                </div>
                
                <div class="content">
                    <div class="left-section">
                        <p class="description">This certificate is proudly awarded to</p>
                        <div class="student-name">${studentName}</div>
                        
                        <p class="description">for their outstanding contribution to environmental awareness by completing a comprehensive Carbon Footprint Analysis as part of the CBSE Science Exhibition 2025. This initiative, developed by <span class="school-highlight">Delhi Public School</span>, aligns with India's commitment to the Paris Agreement and the goal of achieving net-zero emissions by 2070.</p>
                    </div>
                    <div class="right-section">
                        <div class="results-grid">
                            <div class="result-item">
                                <div class="result-label">Annual Carbon Footprint</div>
                                <div class="result-value">${Math.round(totalCarbon)} kg CO₂</div>
                            </div>
                            <div class="result-item">
                                <div class="result-label">Trees Needed to Offset</div>
                                <div class="result-value">${treesNeeded}</div>
                            </div>
                            <div class="result-item">
                                <div class="result-label">Performance Category</div>
                                <div class="result-value">${getCarbonCategory(totalCarbon)}</div>
                            </div>
                            <div class="result-item">
                                <div class="result-label">Climate Impact Score</div>
                                <div class="result-value">${calculateImpactScore(totalCarbon)}%</div>
                            </div>
                        </div>
                        
                        <p class="description">This assessment, based on IPCC AR6 methodologies and Indian-specific emission factors, evaluates lifestyle impacts across electricity, transport, food, waste, and more. The student has received personalized action plans to reduce their carbon footprint and contribute to a sustainable future.</p>
                    </div>
                </div>
                
                <div class="seal"></div>
                
                <div class="footer">
                    <p class="date">Issued on: ${currentDate} IST</p>
                    <p>Certified by <span class="school-highlight">Delhi Public School</span> in collaboration with EcoMitra Pro</p>
                    <p class="motto">🌱 "Together for a Greener India" 🇮🇳</p>
                </div>
            </div>
            
            <div class="no-print" style="text-align: center; margin-top: 20px;">
                <button onclick="window.print()" style="padding: 12px 25px; font-size: 1rem; background: #32CD32; color: white; border: none; border-radius: 25px; cursor: pointer; margin: 5px;">
                    🖨️ Print Certificate
                </button>
                <button onclick="downloadAsPDF()" style="padding: 12px 25px; font-size: 1rem; background: #FF6B6B; color: white; border: none; border-radius: 25px; cursor: pointer; margin: 5px;">
                    📄 Download PDF
                </button>
                <button onclick="window.close()" style="padding: 12px 25px; font-size: 1rem; background: #666; color: white; border: none; border-radius: 25px; cursor: pointer; margin: 5px;">
                    ❌ Close
                </button>
            </div>
        </body>
        </html>
    `;
    
    // Open in new window
    const printWindow = window.open('', '_blank', 'width=1000,height=700'); // Adjusted for landscape preview
    printWindow.document.write(certificateHTML);
    printWindow.document.close();

    // Ensure jsPDF is loaded before attempting download
    setTimeout(() => {
        downloadAsPDF();
    }, 500); // Delay to allow HTML rendering
}

// Ensure these functions are defined in script.js
function calculateImpactScore(totalCarbon) {
    const indianAverage = 1910;
    return Math.max(0, Math.min(100, Math.round(100 - (totalCarbon / indianAverage * 50))));
}

function getCarbonCategory(totalCarbon) {
    if (totalCarbon <= 1500) return '🟢 Excellent - Climate Champion';
    if (totalCarbon <= 2500) return '🟡 Good - Below Average';
    if (totalCarbon <= 4000) return '🟠 Average - Room for Improvement';
    if (totalCarbon <= 6000) return '🔴 High - Action Needed';
    return '🔴 Very High - Urgent Action Required';
}

function downloadAsPDF() {
    if (typeof window.jspdf === 'undefined') {
        alert('PDF download failed. Please ensure an internet connection to load the jsPDF library.');
        return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('l', 'mm', 'a4'); // 'l' for landscape
    
    const element = printWindow.document.querySelector('.certificate');
    if (element) {
        doc.html(element, {
            callback: function (doc) {
                doc.save(`carbon-footprint-certificate-${studentName}-${currentDate.replace(/[:/]/g, '-')}.pdf`);
            },
            x: 0,
            y: 0,
            width: 297, // A4 landscape width
            windowWidth: element.scrollWidth
        });
    } else {
        alert('PDF generation failed. Please try again or use the print option.');
    }
}

function getCarbonCategory(totalCarbon) {
    if (totalCarbon <= 1500) return '🟢 Excellent - Climate Champion';
    if (totalCarbon <= 2500) return '🟡 Good - Below Average';
    if (totalCarbon <= 4000) return '🟠 Average - Room for Improvement';
    if (totalCarbon <= 6000) return '🔴 High - Action Needed';
    return '🔴 Very High - Urgent Action Required';
}

function saveToHistory(totalCarbon, inputs) {
    const now = new Date();
    const entry = {
        timestamp: now.toISOString(), // Store ISO timestamp for consistency
        datetime: now.toLocaleString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }),
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

// Service Worker Registration for PWA
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    }
}

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
