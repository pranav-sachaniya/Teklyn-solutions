const fs = require('fs');

const htmlContent = `                <!-- Healthcare -->
                <div class="industry-card">
                    <img src="assets/images/industries/industry_healthcare.png" alt="Healthcare" class="industry-card-img">
                    <div class="industry-card-overlay"></div>
                    <span class="industry-card-name">Healthcare</span>
                </div>
                <!-- Retail -->
                <div class="industry-card">
                    <img src="assets/images/industries/industry_retail.png" alt="Retail" class="industry-card-img">
                    <div class="industry-card-overlay"></div>
                    <span class="industry-card-name">Retail</span>
                </div>
                <!-- Finance -->
                <div class="industry-card">
                    <img src="assets/images/industries/industry_finance.png" alt="Finance" class="industry-card-img">
                    <div class="industry-card-overlay"></div>
                    <span class="industry-card-name">Finance</span>
                </div>
                <!-- Education -->
                <div class="industry-card">
                    <img src="assets/images/industries/industry_education.png" alt="Education" class="industry-card-img">
                    <div class="industry-card-overlay"></div>
                    <span class="industry-card-name">Education</span>
                </div>
                <!-- Real Estate -->
                <div class="industry-card">
                    <img src="assets/images/industries/industry_realestate.png" alt="Real Estate" class="industry-card-img">
                    <div class="industry-card-overlay"></div>
                    <span class="industry-card-name">Real Estate</span>
                </div>
                <!-- Manufacturing -->
                <div class="industry-card">
                    <img src="assets/images/industries/industry_manufacturing.png" alt="Manufacturing" class="industry-card-img">
                    <div class="industry-card-overlay"></div>
                    <span class="industry-card-name">Manufacturing</span>
                </div>
                <!-- Transportation -->
                <div class="industry-card">
                    <img src="assets/images/industries/industry_transportation.png" alt="Transportation" class="industry-card-img">
                    <div class="industry-card-overlay"></div>
                    <span class="industry-card-name">Transportation</span>
                </div>
                <!-- Entertainment -->
                <div class="industry-card">
                    <img src="assets/images/industries/industry_entertainment.png" alt="Entertainment" class="industry-card-img">
                    <div class="industry-card-overlay"></div>
                    <span class="industry-card-name">Entertainment</span>
                </div>
                <!-- Hospitality -->
                <div class="industry-card">
                    <img src="assets/images/industries/industry_hospitality.png" alt="Hospitality" class="industry-card-img">
                    <div class="industry-card-overlay"></div>
                    <span class="industry-card-name">Hospitality</span>
                </div>
                <!-- Travel -->
                <div class="industry-card">
                    <img src="assets/images/industries/industry_travel.png" alt="Travel" class="industry-card-img">
                    <div class="industry-card-overlay"></div>
                    <span class="industry-card-name">Travel</span>
                </div>
                <!-- Legal -->
                <div class="industry-card">
                    <img src="assets/images/industries/industry_legal.png" alt="Legal" class="industry-card-img">
                    <div class="industry-card-overlay"></div>
                    <span class="industry-card-name">Legal</span>
                </div>
                <!-- Construction -->
                <div class="industry-card">
                    <img src="assets/images/industries/industry_construction.png" alt="Construction" class="industry-card-img">
                    <div class="industry-card-overlay"></div>
                    <span class="industry-card-name">Construction</span>
                </div>

                <!-- Duplicate cards for infinite scroll -->
                <div class="industry-card">
                    <img src="assets/images/industries/industry_healthcare.png" alt="Healthcare" class="industry-card-img">
                    <div class="industry-card-overlay"></div>
                    <span class="industry-card-name">Healthcare</span>
                </div>
                <div class="industry-card">
                    <img src="assets/images/industries/industry_retail.png" alt="Retail" class="industry-card-img">
                    <div class="industry-card-overlay"></div>
                    <span class="industry-card-name">Retail</span>
                </div>
                <div class="industry-card">
                    <img src="assets/images/industries/industry_finance.png" alt="Finance" class="industry-card-img">
                    <div class="industry-card-overlay"></div>
                    <span class="industry-card-name">Finance</span>
                </div>
                <div class="industry-card">
                    <img src="assets/images/industries/industry_education.png" alt="Education" class="industry-card-img">
                    <div class="industry-card-overlay"></div>
                    <span class="industry-card-name">Education</span>
                </div>
                <div class="industry-card">
                    <img src="assets/images/industries/industry_realestate.png" alt="Real Estate" class="industry-card-img">
                    <div class="industry-card-overlay"></div>
                    <span class="industry-card-name">Real Estate</span>
                </div>
                <div class="industry-card">
                    <img src="assets/images/industries/industry_manufacturing.png" alt="Manufacturing" class="industry-card-img">
                    <div class="industry-card-overlay"></div>
                    <span class="industry-card-name">Manufacturing</span>
                </div>
                <div class="industry-card">
                    <img src="assets/images/industries/industry_transportation.png" alt="Transportation" class="industry-card-img">
                    <div class="industry-card-overlay"></div>
                    <span class="industry-card-name">Transportation</span>
                </div>
                <div class="industry-card">
                    <img src="assets/images/industries/industry_entertainment.png" alt="Entertainment" class="industry-card-img">
                    <div class="industry-card-overlay"></div>
                    <span class="industry-card-name">Entertainment</span>
                </div>
                <div class="industry-card">
                    <img src="assets/images/industries/industry_hospitality.png" alt="Hospitality" class="industry-card-img">
                    <div class="industry-card-overlay"></div>
                    <span class="industry-card-name">Hospitality</span>
                </div>
                <div class="industry-card">
                    <img src="assets/images/industries/industry_travel.png" alt="Travel" class="industry-card-img">
                    <div class="industry-card-overlay"></div>
                    <span class="industry-card-name">Travel</span>
                </div>
                <div class="industry-card">
                    <img src="assets/images/industries/industry_legal.png" alt="Legal" class="industry-card-img">
                    <div class="industry-card-overlay"></div>
                    <span class="industry-card-name">Legal</span>
                </div>
                <div class="industry-card">
                    <img src="assets/images/industries/industry_construction.png" alt="Construction" class="industry-card-img">
                    <div class="industry-card-overlay"></div>
                    <span class="industry-card-name">Construction</span>
                </div>`;

const file = 'views/industries.html';
let content = fs.readFileSync(file, 'utf8');

// Replace everything inside <div class="industries-track" id="industriesTrack"> ... </div>
const startMarker = '<div class="industries-track" id="industriesTrack">';
const endMarker = '            </div>\n        </div>\n    </section>';

const startIndex = content.indexOf(startMarker) + startMarker.length;
const endIndex = content.indexOf('</div>\n        </div>\n    </section>', startIndex);

const newContent = content.substring(0, startIndex) + '\n' + htmlContent + '\n            ' + content.substring(endIndex);

fs.writeFileSync(file, newContent);
console.log('Successfully updated views/industries.html');
