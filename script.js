// Switch between Search Tab and Register Tab
function switchTab(tabName) {
    const searchTab = document.getElementById('search-tab');
    const registerTab = document.getElementById('register-tab');
    
    if (tabName === 'search') {
        searchTab.style.display = 'block';
        registerTab.style.display = 'none';
    } else {
        searchTab.style.display = 'none';
        registerTab.style.display = 'block';
    }
}

// Handle Donor Form Submission
function handleDonorRegistration(event) {
    event.preventDefault();

    const name = document.getElementById('donor-name').value;
    const bloodGroup = document.getElementById('donor-blood').value;
    const location = document.getElementById('donor-location').value;
    const contact = document.getElementById('donor-contact').value;

    const newDonor = { name, bloodGroup, location, contact };

    // Get existing donors from browser storage or create empty array
    let donors = JSON.parse(localStorage.getItem('pureBloodDonors')) || [];
    donors.push(newDonor);

    // Save back to storage
    localStorage.setItem('pureBloodDonors', JSON.stringify(donors));

    alert("Thank you! You have successfully registered as a blood donor.");
    document.getElementById('donor-form').reset();
    switchTab('search');
}

// Search Donors Function
function searchDonors() {
    const selectedGroup = document.getElementById('search-blood-group').value;
    const resultsContainer = document.getElementById('donor-results');

    if (!selectedGroup) {
        resultsContainer.innerHTML = "<p style='color: red;'>Please select a blood group to search.</p>";
        return;
    }

    let donors = JSON.parse(localStorage.getItem('pureBloodDonors')) || [];
    
    // Filter matching donors
    const matchedDonors = donors.filter(donor => donor.bloodGroup === selectedGroup);

    if (matchedDonors.length === 0) {
        resultsContainer.innerHTML = `<p>No registered donors found for ${selectedGroup} right now. Try registering as the first donor!</p>`;
        return;
    }

    let html = `<ul style="list-style-type: none; padding: 0;">`;
    matchedDonors.forEach(donor => {
        html += `
            <li style="background: var(--bg-color); padding: 12px; margin-bottom: 10px; border-radius: 6px; border-left: 4px solid #d32f2f;">
                <strong>Name:</strong> ${donor.name} <br>
                <strong>Blood Group:</strong> ${donor.bloodGroup} <br>
                <strong>Location:</strong> ${donor.location} <br>
                <strong>Contact:</strong> <a href="https://wa.me/${donor.contact}" target="_blank" style="color: #d32f2f; font-weight: bold;">${donor.contact} (Chat on WhatsApp)</a>
            </li>
        `;
    });
    html += `</ul>`;

    resultsContainer.innerHTML = html;
}

// Simple language switcher function framework
function setLanguage(lang) {
    if (lang === 'ur') {
        alert("Urdu translation mode selected. (Next we will add full dictionary text!)");
    } else if (lang === 'bal') {
        alert("Balochi translation mode selected. (Next we will add full dictionary text!)");
    } else {
        alert("English mode selected.");
    }
}

console.log("Pure Blood app loaded successfully.");
