function openSidebar() {
    document.getElementById("sidebar").style.left = "0";
    const body = document.body;
    body.classList.add("mobile-nav-active");
}

function closeSidebar() {
    document.getElementById("sidebar").style.left = "-75%";
     const body = document.body;
    body.classList.remove("mobile-nav-active");
}

document.addEventListener("DOMContentLoaded", function () {
  const buttons = [
   { btn: "read-more-btn", content: "hidden-content" },
    { btn: "read-more-btn01", content: "content-part01" },
    { btn: "read-more-btn10", content: "hidden-content10" },
    { btn: "read-more-btn02", content: "content-part02" },
    { btn: "read-more-btn12", content: "content12" },
    { btn: "read-more-btn13", content: "content03" },
    { btn: "read-more-btn14", content: "content04" },
    { btn: "read-more-btn15", content: "content05" },
    { btn: "read-more-btn16", content: "content06" },
    { btn: "read-more-btn17", content: "content07" },
    { btn: "read-more-btn18", content: "content08" },
    { btn: "read-more-btn19", content: "content09" },
    { btn: "read-more-btn20", content: "content20" },
    { btn: "read-more-btn21", content: "content21" },
  ];


  buttons.forEach(({ btn, content }) => {
    let button = document.getElementById(btn);
    let contentDiv = document.getElementById(content);

    if (button && contentDiv) {
      button.addEventListener("click", function () {
        if (contentDiv.style.display === "none" || contentDiv.style.display === "") {
          contentDiv.style.display = "block";
          button.textContent = "Read Less";
        } else {
          contentDiv.style.display = "none";
          button.textContent = "Read More";
        }
      });
    } else {
      console.warn(`Element not found: button="${btn}", content="${content}"`);
    }
  });
});


  function showPopup() {
    document.getElementById("videoPopup").style.display = "flex";
    document.getElementById("popupVideo").play();
}

function hidePopup() {
    document.getElementById("videoPopup").style.display = "none";
    document.getElementById("popupVideo").pause();
}



function openTab(event, tabId) {
  var i, tabContent, tabLinks;

  // Hide all tab contents
  tabContent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = "none";
  }

  // Remove active class from all tab buttons
  tabLinks = document.getElementsByClassName("tab-link");
  for (i = 0; i < tabLinks.length; i++) {
      tabLinks[i].classList.remove("active");
  }

  // Show the selected tab content and add active class to the clicked button
  document.getElementById(tabId).style.display = "block";
  event.currentTarget.classList.add("active");
}




const icons = document.querySelectorAll('.play-video-button');

icons.forEach(icon => {
    icon.addEventListener('click', function() {
        const videoSrc = this.getAttribute('data-video');
        document.getElementById('videoIframe').src = videoSrc + "?rel=0";
        document.getElementById('videoOverlay').style.display = 'flex';
    });
});


document.getElementById('closeBtn01').addEventListener('click', function() {
    document.getElementById('videoOverlay').style.display = 'none';
    document.getElementById('videoIframe').src = "";
});



document.getElementById("toggleIcon").addEventListener("click", function () {
  let footerLinks = document.getElementById("footerLinks");
  let icon = document.getElementById("toggleIcon");

  if (footerLinks.style.display === "none" || footerLinks.style.display === "") {
      footerLinks.style.display = "block"; // Show the list
      icon.classList.remove("fa-plus");
      icon.classList.add("fa-minus");
  } else {
      footerLinks.style.display = "none"; // Hide the list
      icon.classList.remove("fa-minus");
      icon.classList.add("fa-plus");
  }
});


document.getElementById("toggleIcon01").addEventListener("click", function () {
  let footerLinks = document.getElementById("footerLinks01");
  let icon = document.getElementById("toggleIcon01");

  if (footerLinks.style.display === "none" || footerLinks.style.display === "") {
      footerLinks.style.display = "block"; // Show the list
      icon.classList.remove("fa-plus");
      icon.classList.add("fa-minus");
  } else {
      footerLinks.style.display = "none"; // Hide the list
      icon.classList.remove("fa-minus");
      icon.classList.add("fa-plus");
  }
});




let lastScrollTop = 0;
const topNavbar = document.querySelector(".top-navbar");
const mobileNavbar = document.querySelector(".mobile-navbar");

window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Hide top-navbar and fix mobile-navbar at top
        topNavbar.style.display = "none";
        mobileNavbar.style.position = "fixed";
        mobileNavbar.style.top = "0";
        mobileNavbar.style.width = "100%";
        mobileNavbar.style.zIndex = "1000";
         mobileNavbar.classList.add("sticky");
        mobileNavbar.style.background = "#fff"; // Optional: Ensure visibility
    } else if (scrollTop === 0) {
        // Show top-navbar again when scrolled to top
        topNavbar.style.display = "block";
        mobileNavbar.style.position = "relative";
        mobileNavbar.classList.remove("sticky");
    }
    
    lastScrollTop = scrollTop;
});


document.querySelectorAll('.custom-dropdown-submenu > a').forEach(item => {
  item.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      let submenu = this.nextElementSibling;
      submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
  });
});


  