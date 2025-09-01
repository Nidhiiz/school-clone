// trackAndDecision.js

const generateAnonId = () => {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:.TZ]/g, '');
    const random = Math.floor(Math.random() * 1000000);
    return `anon_${timestamp}_${random}`;
};

const getUTMParams = () => {
    const params = new URLSearchParams(window.location.search);
    const utm = {
        utm_source: params.get('utm_source') || null,
        utm_medium: params.get('utm_medium') || null,
        utm_campaign: params.get('utm_campaign') || null,
        utm_id: params.get('utm_id') || null
    };

    return utm;
};

(function () {
    const TRACKING_ENDPOINT = 'https://tracker.ixambee.com/api/tracker';

    let cachedAnonId = null;

    const getAnonId = () => {
        if (cachedAnonId) return cachedAnonId;

        const cookieName = 'anon_id';
        const cookies = document.cookie.split(';').map(c => c.trim());
        const existing = cookies.find(c => c.startsWith(cookieName + '='));
        if (existing) {
            cachedAnonId = existing.split('=')[1];
            return cachedAnonId;
        }

        cachedAnonId = generateAnonId();
        document.cookie = `${cookieName}=${cachedAnonId}; path=/; max-age=31536000`;
        return cachedAnonId;
    };


    const sendPayload = async (
        campaignName,
        eventData = {}
    ) => {
        const defaults = {

            coming_from: document.referrer || null,
        };

        // merge passed data with defaults
        const pageUrl = window.location.href.split('?')[0];
        const utmParams = getUTMParams();
        const mergedEventData = { ...defaults, ...eventData, campaignName, utm_parameters: utmParams };

        const payload = {
            user_id: window.user_id,
            anon_id: getAnonId(),
            campaign_id: mergedEventData.campaign_id || null,
            event_name: campaignName,
            page_url: pageUrl,
            event_data: mergedEventData,
            ip_address: '',
            device_type: navigator.userAgent.includes("Mobile") ? "m" : "d",
            user_agent: navigator.userAgent,
        };

        try {
            const response = await axios.post(TRACKING_ENDPOINT, payload);
            if (response.data.merge === true) {
                document.cookie = "anon_id=; path=/; max-age=0;";
                console.log("anon_id cookie removed after merge.");
            }
        } catch (error) {
            console.error('Tracking error:', error);
        }
    };

    window.sendPayload = sendPayload;

    window.addEventListener('load', function () {
        sendPayload('page_view'); // no overwrite → defaults apply
    });

    document.addEventListener('click', function (e) {
        const el = e.target.closest('[data-track-event]');
        if (!el) return;

        const campaignName = el.getAttribute('data-track-event');
        const campaignId = el.getAttribute('data-campaign-id');
        sendPayload(campaignName, { campaign_id: campaignId || null, impression: "click" });
    });


    //add this div in the blade of the page, jiska scroll track krna hai// <div id="enable-scroll-tracking" style="display:none;"></div>

    function initScrollTracking() {
        const scrollPoints = [50, 100];
        let flags = [false, false];

        window.addEventListener("scroll", function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            const scrollPercent = Math.floor((scrollTop / docHeight) * 100);

            scrollPoints.forEach((point, index) => {
                if (!flags[index] && scrollPercent >= point) {
                    sendPayload(`scroll_${point}`);
                    flags[index] = true;
                    console.log(`Scroll event fired: scroll_${point}`);
                }
            });
        });
    }

    window.addEventListener("load", function () {
        if (document.getElementById("enable-scroll-tracking")) {
            initScrollTracking();
        }
    });
})();


(function () {
    // Helper function to get user information (either from localStorage or generate anon_id)
    const getUserInfo = () => {
        const user_id = window.user_id || null;
        return { user_id }; // no anon_id needed
    };

    const displayPromoBanner = (campaign) => {
        const promoBannerHTML = `
        <div class="container" data-campaign-id="${campaign.campaign_id}" data-track-event="${campaign.campaign_name}">
            ${campaign.payload.campaign_body}   
        </div>
        `;

        // Select the container where the banner should be appended
        const container = document.getElementById('campaign-banner-append');
        if (container) {
            container.insertAdjacentHTML('beforeend', promoBannerHTML);
        } else {
            console.warn('Container #campaign-banner-append not found. Appending to body as fallback.');
        }
    };

    const observeCampaignImpression = (campaignId, campaignName) => {
        const el = document.querySelector('[data-track-event]');
        if (!el) {
            return;
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // ✅ Fire impression = 0 when div is visible
                    sendPayload(campaignName, { campaign_id: campaignId || null, impression: "view" });
                    obs.unobserve(entry.target); // only once
                }
            });
        }, { threshold: 1 });

        observer.observe(el);
    };



    // Function to get the best campaign from the decision API
    const getDecision = async () => {
        const { user_id } = getUserInfo();
        const page_url = window.location.pathname.replace(/^\/+/, '');

        const decisionPayload = { user_id, page_url };

        try {
            const response = await axios.post('https://campaign.ixambee.com/api/decision', decisionPayload);
            const decisionData = response.data;

            if (decisionData.success) {
                const campaign = decisionData.campaign;
                console.log('Selected campaign:', campaign);
                displayPromoBanner(campaign);

                // ✅ Observe for impression 0 once banner is shown
                observeCampaignImpression(campaign.campaign_id, campaign.campaign_name);
            } else {
                console.log('No matching campaign found.');
            }
        } catch (error) {
            console.error('Error fetching decision:', error);
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', getDecision);
    } else {
        getDecision();
    }
})();
