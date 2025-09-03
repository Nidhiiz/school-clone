//const BASE_URL = window.BASE_URL;

async function track_with_fun(page_url = '', dc = '', cm = '', page_type = '', remarks = 1) {
    try {
        // Skip tracking if not in production
        if (typeof window.IS_PRODUCTION === 'undefined' || window.IS_PRODUCTION !== true) return;

        if (!BASE_URL) {
            console.warn("BASE_URL is not defined. Tracking aborted.");
            return;
        }

        // Get CSRF token from meta tag
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
        if (!csrfToken) {
            console.warn("CSRF token not found. Tracking aborted.");
            return;
        }

        console.log("Tracking function called.");

        const response = await axios.post(
            `${BASE_URL}/tracker_ajax`,
            new URLSearchParams({
                page_url,
                dc,
                cm,
                page_type,
                remarks
            }),
            {
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        // Optional: handle response
        // console.log("Tracking result:", response.data);

    } catch (error) {
        console.error("Tracking error:", error);
    }
}


$(function () {
    track_with_fun(window.PAGE_PATH, window.dc, window.cm, window.PAGE_TYPE, "");

    // Open modal on click
    $('#request_call_back').on('click', function () {
        var modalEl = document.getElementById('callbackfrom');
        var modalInstance = new bootstrap.Modal(modalEl, {
            backdrop: 'static',
            keyboard: false
        });
        modalInstance.show();
    });

    // Submit form
    $("#submit_btn_new_new").on("click", function () {
        let isValid = true;
        const name = $("#name").val().trim();
        const mobile = $("#mobile").val().trim();
        const current_url = window.PAGE_PATH;
        const half_slug = window.LAST_SLUG;
        const user_id = '2859267';
        const check_sebi = $("#chkSebiphase2").is(":checked") ? 1 : 0;

        // Validate name
        if (!name) {
            $("#name").css("border", "1px solid #CE5454");
            $("#error_name").show();
            isValid = false;
        } else {
            $("#name").css("border", "1px solid green");
            $("#error_name").hide();
        }

        // Validate mobile
        const phoneno = /^\d{10}$/;
        if (!mobile || !phoneno.test(mobile)) {
            $("#mobile").css("border", "1px solid #CE5454");
            $("#error_mobile").show();
            isValid = false;
        } else {
            $("#mobile").css("border", "1px solid green");
            $("#error_mobile").hide();
        }

        if (!isValid) return false;

        axios.post(`${BASE_URL}/request-call-back7`, {
            name: name,
            mobile: mobile,
            current_url: current_url,
            half_slug: half_slug,
            sebi_check: check_sebi
        }, {
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        })
            .then(function (response) {
                $(".form-group_this_form").hide();
                $(".thankyou-msg").removeClass("d-none").addClass("d-block");
                $(".change_title").html("<span style='color:green'>Thank you</span>");
                $('#form_name').html(name);
                $('#mobile_number').html(mobile);
                $(".form_submit_success").show();
                $(".career_form").hide();

                setTimeout(function () {
                    const modalEl = document.getElementById('callbackfrom');
                    const modalInstance = bootstrap.Modal.getInstance(modalEl);
                    modalInstance.hide();
                }, 3000);
            })
            .catch(function (error) {
                let errorMsg = "An error occurred";
                if (error.response && error.response.data && error.response.data.message) {
                    errorMsg = error.response.data.message;
                }
                $('#error').html(errorMsg);
            });

        return false;
    });

    setTimeout(function () {
        $("iframe").each(function () {
            // console.log("this"); 
            var src = $(this).attr("data-yt-src");
            $(this).css({
                'width': '100%'
            });
            $(this).attr("src", src);
        })
    }, 3000);
});

$(function () {

    // $(".search_cross_button").on("click", function () {
    //     $(".suggestions_dropdown").css("display", "none");
    //     $("#input-drop-down").val("");
    // });
    // //search code starts here
    // $(".static-search").on("click", function () {
    //     const query = $(this).data("query");
    //     $("#input-drop-down").val(query).trigger("input");
    // });

    // const $inputField     = $("#input-drop-down");
    // const $suggestionsBox = $("#suggestions");
    // const csrfToken       = $('meta[name="csrf-token"]').attr("content");
    // const userId          = '2859267';
    // const pageUrl         = "";
    // let debounceTimeout;

    // let eventHandler;

    // function linkClicked(element) {
    //     let value = $(element).text();
    //     document.getElementById("input-drop-down").value = value;
    //     document.getElementById("submitButton").click();
    // }

    // function navigation() {
    //     if (eventHandler != null) {
    //         document.removeEventListener("keydown", eventHandler);
    //         console.log("eventHandler removed");
    //     }

    //     a = document.getElementById("suggestions");
    //     var li = a.getElementsByTagName("li");
    //     var current = -1;

    //     eventHandler = function(event) {
    //         const key = event.key;
    //         switch (key) {
    //             case "Enter":
    //                 event.preventDefault();
    //                 li[current].click();

    //                 break;
    //             case "ArrowUp":
    //                 if (current != -1) {
    //                     li[current].classList.remove("active");
    //                 }
    //                 if (current - 1 >= 0) {
    //                     current = current - 1;
    //                 } else {
    //                     current = li.length - 1;
    //                 }
    //                 li[current].classList.add("active");
    //                 break;
    //             case "ArrowDown":
    //                 if (current != -1) {
    //                     li[current].classList.remove("active");
    //                 }
    //                 current = (current + 1) % li.length;
    //                 li[current].classList.add("active");
    //                 break;
    //         }
    //     };

    //     document.addEventListener("keydown", eventHandler);
    // }

    // // Prevent form submission on Enter
    // $("#linkForm").on("keypress", function (event) {
    //     if (event.key === "Enter") {
    //         event.preventDefault();
    //     }
    // });
    // // Disable browser autocomplete
    // $inputField.attr("autocomplete", "off");
    // // Handle input with debounce
    // $inputField.on("input", function () {
    //     clearTimeout(debounceTimeout);
    //     debounceTimeout = setTimeout(function () {
    //         const param = $inputField.val().trim();

    //         if (param !== "") {
    //             axios.post(`${BASE_URL}/linksuggester`, {
    //                 param: param,
    //                 user_id: userId,
    //                 page_url: pageUrl
    //             }, {
    //                 headers: {
    //                     'X-CSRF-TOKEN': csrfToken
    //                 }
    //             })
    //             .then(function (response) {
    //                 $suggestionsBox.empty();

    //                 console.log("================");
    //                 console.log(response);
    //                 console.log("================");

    //                 if (response.data.length === 0) {
    //                     $suggestionsBox.append("<li>No result found, try something else</li>");
    //                 } else {
    //                     $.each(response.data, function (index, item) {
    //                         $suggestionsBox.append(
    //                             $("<li>").html(item.term).on("click", function () {
    //                                 linkClicked($(this));
    //                             })
    //                         );
    //                     });
    //                 }

    //                 $suggestionsBox.show();
    //                 navigation(); // if defined elsewhere
    //             })
    //             .catch(function (error) {
    //                 $suggestionsBox
    //                     .html(`<li>An error occurred: ${error.message}</li>`)
    //                     .show();
    //             });

    //         } else {
    //             $suggestionsBox.hide().empty();
    //         }
    //     }, 1000); // 1-second debounce
    // });
    //search code ends here

    function setupSearch(inputSelector, suggestionsSelector, formSelector, submitButtonSelector, staticSearchSelector = null) {

        const $inputField = $(inputSelector);
        const $suggestionsBox = $(suggestionsSelector);
        const $form = $(formSelector);
        const $submitButton = $(submitButtonSelector);
        const csrfToken = $('meta[name="csrf-token"]').attr("content");
        const pageUrl = "";
        let debounceTimeout;
        let eventHandler;

        // 🧠 Handles clicking on a suggestion
        function linkClicked(element) {
            const value = $(element).text();
            $inputField.val(value);
            $form.trigger('submit');
        }

        // function linkClicked(element) {
        //     let value = $(element).text();
        //     document.getElementById("input-drop-down").value = value;
        //     document.getElementById("submitButton").click();
        // }

        // 🧠 Handles up/down/enter keyboard navigation
        function navigation() {
            if (eventHandler) {
                document.removeEventListener("keydown", eventHandler);
            }

            const li = $suggestionsBox.find("li");
            let current = -1;

            eventHandler = function (event) {
                const key = event.key;
                if (!li.length) return;

                switch (key) {
                    case "Enter":
                        event.preventDefault();
                        if (current !== -1) li.eq(current).click();
                        break;
                    case "ArrowUp":
                        if (current !== -1) li.eq(current).removeClass("active");
                        current = (current - 1 + li.length) % li.length;
                        li.eq(current).addClass("active");
                        break;
                    case "ArrowDown":
                        if (current !== -1) li.eq(current).removeClass("active");
                        current = (current + 1) % li.length;
                        li.eq(current).addClass("active");
                        break;
                }
            };

            document.addEventListener("keydown", eventHandler);
        }

        // ❌ Prevent default form submit on Enter
        $form.on("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
            }
        });

        // 🧼 Disable browser autocomplete
        $inputField.attr("autocomplete", "off");

        // 🔍 Listen to typing (with debounce)
        $inputField.on("input", function () {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(function () {
                const param = $inputField.val().trim();

                if (param !== "") {
                    axios.post(`${BASE_URL}/linksuggester`, {
                        param: param,
                        page_url: pageUrl
                    }, {
                        headers: {
                            'X-CSRF-TOKEN': csrfToken
                        }
                    })
                        .then(function (response) {
                            $suggestionsBox.empty();
                            $(".search_cross_button").removeClass('d-none');
                            if (response.data.length === 0) {
                                $suggestionsBox.append("<li>No result found, try something else</li>");
                            } else {
                                $.each(response.data, function (index, item) {
                                    $suggestionsBox.append(
                                        `<li class="suggestion-item">${item.term}</li>`
                                    );
                                });
                            }

                            $suggestionsBox.show();
                            navigation();

                            // 🧠 Click listener for dynamic suggestions
                            $suggestionsBox.off("click").on("click", ".suggestion-item", function () {
                                linkClicked($(this));
                            });
                        })
                        .catch(function (error) {
                            $suggestionsBox
                                .html(`<li>An error occurred: ${error.message}</li>`)
                                .show();
                        });
                } else {
                    $suggestionsBox.hide().empty();
                }
            }, 1000); // 1 second debounce
        });

        // ❌ Clear button functionality
        $(".search_cross_button").on("click", function () {
            $inputField.val("");
            $suggestionsBox.hide().empty();
            $(".search_cross_button").addClass('d-none');
        });

        // 🧠 Optional: click handler for static pre-defined queries
        if (staticSearchSelector) {
            $(staticSearchSelector).on("click", function () {
                const query = $(this).data("query");
                $inputField.val(query).trigger("input");
            });
        }
    }

    // Header search (if exists)
    setupSearch(
        "#input-drop-down",         // inputSelector
        "#suggestions-header",      // suggestionsSelector
        "#linkFormHeader",          // formSelector
        "#submitButtonHeader"       // submitButtonSelector
    );

    setupSearch(
        "#input-drop-down-body",
        "#suggestions-body",
        "#linkFormBody",
        "#submitButtonBody",
        ".static-search"
    );
    // Body search (with static suggestion support)

    // Scroll to a specific element by ID (used on online course page)
    window.scroll_down = function (id) {
        const safeId = id.replace(/&/g, "and");
        const $element = $("#" + safeId);
        if ($element.length) {
            $('html, body').animate({
                scrollTop: $element.offset().top - 135
            }, 'fast');
        } else {
            console.warn("Element not found for ID:", safeId);
        }
    };

    // Scroll to next section on button click
    $("#scroll_to_next").on("click", function () {
        const $target = $(".show-more-content");
        if ($target.length) {
            $("html, body").animate({
                scrollTop: $target.offset().top - 200
            }, 800);
        }
    });

    // Show all content and hide button
    $(".show-all-content").on("click", function () {
        $(".show-more-content").addClass("showContentHeightAuto");
        $(".show-button-container").hide();
    });
});


axios.get(`${BASE_URL}/header7`)
    .then((response) => {
        $("#add_menu").html(response.data);
    })
    .catch(function (error) {
        let errorMsg = "An error occurred";
        if (error.response && error.response.data && error.response.data.message) {
            errorMsg = error.response.data.message;
        }
        $('#error').html(errorMsg);
    });


$(function () {
    function load_ask_doubt() {
        const postData = {
            ask_doubt: 1
        };

        axios.post(BASE_URL + "/have_doubt_div7", postData, {
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            }
        })
            .then(function (response) {
                console.log("ask doubt is loading");
                $("#ask-doubt").empty();
                $("#ask-doubt").html(response.data);
            })
            .catch(function (error) {
                console.error("Axios Error:", error);
            });
    }
    load_ask_doubt();
});


function submit_cddoubt() {
    var e = $.trim($("#id_mobile").val()),
        s = $.trim($("#email_test").val()),
        i = $.trim($("#doubt").val());


    $("#id_mobile").css("border", "");
    $("#error_id_mobile").css("display", "none");
    $("#doubt").css("border", "");
    $("#error_doubt").css("display", "none");

    if (s === "") {
        $("#email_alert_email").hide();
        $("#email_alert").show();
        $("#email_test").css({ "border": "1px solid #CE5454", "border-radius": "4px" });
        $(".loading-div, .yes_overlay, .ixambee-loader").hide();
        return false;
    }

    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(s)) {
        $("#email_alert").hide();
        $("#email_alert_email").show();
        $("#email_test").css({ "border": "1px solid #CE5454", "border-radius": "4px" });
        $(".loading-div, .yes_overlay, .ixambee-loader").hide();
        return false;
    }

    $("#email_alert_email, #email_alert").hide();
    $("#email_test").css({ "border": "1px solid green", "border-radius": "4px" });

    if (e === "") {
        $("#mobile_alert").show();
        $("#mobile_alert_valid").hide();
        $("#id_mobile").css({ "border": "1px solid #CE5454", "border-radius": "4px" });
        return false;
    }

    if (!/^[6789]\d{9}$/.test(e)) {
        $("#mobile_alert").hide();
        $("#mobile_alert_valid").show();
        $("#id_mobile").css({ "border": "1px solid #CE5454", "border-radius": "4px" });
        return false;
    }

    $("#mobile_alert, #mobile_alert_valid").hide();
    $("#id_mobile").css({ "border": "1px solid green", "border-radius": "4px" });

    if (i === "") {
        $("#doubt").css("border", "1px solid #CE5454");
        $("#error_doubt").css("display", "block");
        return false;
    }

    $("#doubt").css("border", "1px solid green");
    $("#error_doubt").css("display", "none");
    $("#daily_spin").removeClass("d-none");
    $("#remove_text").html("");


    var data = {
        mobile: e,
        user_id: window.user_id,
        doubt: i,
        exampage_url: window.PAGE_PATH,
        get_email: s
    };


    axios.post(window.BASE_URL + "/submit-doubt7", data, {
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
    })
        .then(function (response) {
            $(".group_this_form_leads").hide();
            $(".thankyou-msg").show();
        })
        .catch(function (error) {
            if (error.response && error.response.data) {
                $("#error").html(error.response.data);
            } else {
                $("#error").html("An unexpected error occurred.");
            }
        });

    return false;
}


// scroll back to top button

!function (n) {
    n.fn.backToTop = function (o) {
        var a = n.extend({
            iconName: "fas fa-chevron-up",
            trigger: 300,
            fxName: "fade",
            fxTransitionDuration: 300,
            scrollDuration: 300
        }, o),
            i = this,
            t = a.iconName,
            r = a.trigger,
            c = a.fxName,
            s = a.fxTransitionDuration,
            e = a.scrollDuration;

        return this.each(function () {
            // Only prepend icon if not already present
            if (i.find('i.' + t.replace(/\s+/g, '.')).length === 0) {
                i.prepend('<i class="' + t + '"></i>');
            }

            i.addClass(c);
            i.css({ transitionDuration: s + "ms" });

            n(window).scroll(function () {
                n(window).scrollTop() > r ? i.addClass("bck-on") : i.removeClass("bck-on");
            });

            i.on("click", function (o) {
                o.preventDefault();
                n("html, body").animate({ scrollTop: 0 }, e);
            });
        }), this;
    }
}(jQuery);


$(function () {
    $(".bck").backToTop({
        iconName: "fas fa-arrow-up",
        fxName: "rightToLeft"
    });
});

$(function () {
    function load_quiz() {
        const postData = {
            widget: 1,
            slug : window.PAGE_PATH
        };

        axios.post(BASE_URL + "/load_quiz7", postData, {
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            }
        })
            .then(function (response) {
                console.log('daily_quiz is loading...............');
                $("#load-quiz").empty();
                $("#load-quiz").append(response.data);
            })
            .catch(function (error) {
                console.error("Axios Error:", error);
            });
    }
    load_quiz();
});




