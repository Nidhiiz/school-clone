


    // show all content
    $('.show-all-content').on('click', function () {
        const content = $('.show-more-content');
        const buttoncontaine = $('.show-button-container')
        content.css('height', 'auto'); // Expand to full height
        buttoncontaine.css('display','none') // Hide button Container
        $(this).hide(); // Hide the button
    });
     // show all content
     $('#showAllBtn').on('click', function() {
         const content = $('.show-more-content');
         const buttoncontaine = $('.show-button-container')
         content.css('height', 'auto'); // Expand to full height
         buttoncontaine.css('display', 'none') // Hide button Container
         $(this).hide(); // Hide the button
     });

     

     // left side section fixed on scroll function   
     $(document).ready(function() {
         $('.leftSidebar, .content, .rightSidebar')
             .theiaStickySidebar({
                 additionalMarginTop: 30
             });
     });



     // search bar cross icon function
     const searchInput = document.getElementById("searchInput");
     const clearBtn = document.getElementById("clearBtn");

     if (searchInput && clearBtn) {
         searchInput.addEventListener("input", function() {
             clearBtn.style.display = this.value.length > 0 ? "block" : "none";
         });

         clearBtn.addEventListener("click", function() {
             searchInput.value = "";
             clearBtn.style.display = "none";
             searchInput.focus();
         });
     }



     // ticker js 
     $(document).ready(function() {
         const $inner = $('#tickerInner');
         const content = $inner.html();

         // Repeat until it's at least 2x wider than the parent
         while ($inner.width() < $('body').width() * 10) {
             $inner.append(content);
         }

         // Now set animation duration based on total width
         const totalWidth = $inner.width();
         const speed = 100; // pixels per second
         const duration = totalWidth / speed;

         $inner.css({
             animationDuration: duration + 's'
         });
     });


     // fixed important links
     $(window).on('scroll', function() {
         if ($(window).scrollTop() > 500) {
             $('#important_links_fixed').addClass('fixed-important-links').removeClass('hide');
         } else {
             $('#important_links_fixed').addClass('hide');
             setTimeout(function() {
                 $('#important_links_fixed').removeClass('fixed-important-links');
             }); // Match the CSS transition duration
         }
     });


     // grid view and list view
     const listViewButton = document.querySelector('.list-view-button');
     const gridViewButton = document.querySelector('.grid-view-button');
     const lists = document.querySelectorAll('.ttt'); // Select all .ttt elements

     if (listViewButton && gridViewButton && lists.length > 0) {

         listViewButton.onclick = function() {
             lists.forEach(list => {
                 list.classList.remove('grid-view-filter', 'col-lg-4');
                 list.classList.add('list-view-filter', 'col-lg-12');
             });

             // Update active class on buttons
             listViewButton.classList.add('active');
             gridViewButton.classList.remove('active');
         };

         gridViewButton.onclick = function() {
             lists.forEach(list => {
                 list.classList.remove('list-view-filter', 'col-lg-12');
                 list.classList.add('grid-view-filter', 'col-lg-4');
             });

             // Update active class on buttons
             gridViewButton.classList.add('active');
             listViewButton.classList.remove('active');
         };

     }


     // add class in 767px screen size function 
     function handleSidebarClassesMb() {
         const stickyInner = document.querySelector('.packages-right-inner');

         if (window.innerWidth <= 767) {
             stickyInner?.classList.add('explore-mockest-list');
         } else {
             stickyInner?.classList.remove('explore-mockest-list');
         }
     }
     handleSidebarClassesMb();
     window.addEventListener('resize', handleSidebarClassesMb);



     // remove class in 767px screen size function
     function handleSidebarClasses() {
         const sidebar = document.querySelector('.leftSidebar');
         const stickyInner = document.querySelector('.packages-right-side-navigation');

         if (window.innerWidth <= 767) {
             sidebar?.classList.remove('leftSidebar');
             stickyInner?.classList.remove('theiaStickySidebar');
             stickyInner?.classList.add('fixed-govt-exam');
         } else {
             sidebar?.classList.add('leftSidebar');
             stickyInner?.classList.add('theiaStickySidebar');
             stickyInner?.classList.remove('fixed-govt-exam');
         }
     }
     handleSidebarClasses();
     window.addEventListener('resize', handleSidebarClasses);


     $('.expore-mocktest').on('click', function() {
         $('.explore-mockest-list').toggleClass('transform-zero');
         $('.overlay_section').toggleClass('display-block');
         $('.clear-btn-mb').toggleClass('display-block');
         $('body').toggleClass('overflow-hidden');
     });


     $('.expore-mocktest-exam').on('click', function() {
         $('.fixed-govt-exam').toggleClass('transform-zero');
         $('.overlay_section').toggleClass('display-block');
         $('.clear-btn-mb').toggleClass('display-block');
         $('body').toggleClass('overflow-hidden');
     });

    $('.mob_item').on('click', function() { 
        $('.packages-right-inner').removeClass('transform-zero');
        $(".overlay_section").removeClass('display-block');
        $('body').removeClass('overflow-hidden');
    });

     $('.overlay_section, .clear-btn-mb').on('click', function() {
         $('.explore-mockest-list, .fixed-govt-exam').removeClass('transform-zero');
         $('.overlay_section').removeClass('display-block');
         $('.clear-btn-mb').removeClass('display-block');
         $('body').removeClass('overflow-hidden');
     });


    $('.close-announcementBar').on('click', function () {
        $('#announcementBar').hide(); // Adds display: none
    });


    $('.border.rounded.lightbluebackground').removeClass('border rounded lightbluebackground');


    // left side section fixed on scroll function   
	$(function () {
			$('.leftSidebar, .content, .rightSidebar')
					.theiaStickySidebar({
					additionalMarginTop: 30
			});
	});

    

         $('.read-more').click(function() {
             var moreText = $(this).siblings('.more-text');
             var dots = $(this).siblings('.dots');

             if (moreText.is(':visible')) {
                 moreText.hide();
                 dots.show();
                 $(this).text('Read More');
             } else {
                 moreText.show();
                 dots.hide();
                 $(this).text('Read Less');
             }
         });
 

    
// All exam packages search 

$(document).ready(function () {
    $('#input-drop-down1').on('input', function () {
      var val = $(this).val().trim().toLowerCase();
      var matchFound = false;

      if (val === '') {
        $('.leftSidebar').show();
        $('.rightSidePackages').removeClass('col-xl-12');
        $('#clear-search').hide();
        $('.exam-item').show();
        $('#filter_search1').hide(); // hide filter again
        return;
      } else {
        $('.leftSidebar').hide();
        $('.rightSidePackages').addClass('col-xl-12');
        $('#clear-search').show();
      }

      // Show filter block if hidden
      if ($('#filter_search1').css('display') === 'none') {
        $('#filter_search1').show();
      }

    
    });

    $('#clear-search').on('click', function () {
      $('#input-drop-down1').val('').trigger('input');
      $('[id="filter_search1"]').removeAttr('style');
      $('[id="filter_search1"] div').removeAttr('style');
    });
  });

//  End here

$(document).ready(function () {
    $(".embed-responsive.embed-responsive-16by9")
        .removeClass("embed-responsive embed-responsive-16by9")
        .addClass("ratio ratio-16x9");
});