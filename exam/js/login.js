$(function () {
    const $modal = $('#enterUser');
    const $steps = $modal.find('.login-step');
    let type, username, dtc;
    const loader = '<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>';
    function showStep(id) {
        $steps.removeClass('active');
        $('#' + id).addClass('active');
    }

    function clearErrors() {
        $modal.find('small.text-danger').text('');
        $modal.find('small.text-success').text('');
    }

    $('#btn-send-otp').on('click', async function () {
        clearErrors();
        const $btn = $(this);
        const original = $btn.html();
        username = $('#js-value').val().trim();
        if (!username) {
            $('#err-value').text('Mobile or email is required');
            return;
        }
        type = /^\d{10}$/.test(username) ? 1 : 0;
        $btn.html(loader).prop('disabled', true);

        try {
                    const res = await axios.post(`${BASE_URL}/user-login`, {
                        username,
                        type
                    });
                    if (Array.isArray(res.data.emails) && res.data.emails.length > 1) {
                        const $list = $('#js-identities').empty();
                        res.data.emails.forEach(email => {
                            $list.append(`
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="identity" value="${email}" id="identity-${email}">
                                <label class="form-check-label" for="identity-${email}">${email}</label>
                            </div>
                            `);
                        });
                        showStep('step-select');
                    }else if (res.data.signupNeeded) {
                showStep('step-alternate');
                $('#js-alternate')
                    .attr('placeholder', type === 1 ? 'Your Email' : 'Your Mobile');
            } else {
                showStep('step-otp');
                $("#js-otp").focus();
                const e = res.data?.message || {};
                if (e) $('#suc-otp').text(e);
            }
        } catch (err) {
            $('#err-value').text(err.response?.data?.message || 'Server error');
        } finally {
            $btn.html(original).prop('disabled', false);
        }
    });

            $('#btn-confirm-identity').on('click', async function() {
                clearErrors();
                const selected = $('input[name="identity"]:checked').val();
                if (!selected) {
                $('#err-identity').text('Please select one identity');
                return;
                }
                const $btn = $(this);
                const original = $btn.html();
                $btn.html(loader).prop('disabled', true);

                try {
                const res = await axios.post(`${BASE_URL}/confirm-identity`, {
                    username, type, selected
                });
                dtc = 1;
                showStep('step-otp');
                $("#js-otp").focus();
                if (res.data.message) $('#suc-otp').text(res.data.message);
                } catch (err) {
                    const e = err.response?.data?.message || {};
                $('#err-value').text(e);
                } finally {
                $btn.html(original).prop('disabled', false);
                }
            });


    // STEP 2 → send OTP for signup
    $('#btn-send-otp-signup').on('click', async function () {
        clearErrors();
        const $btn = $(this);
        const original = $btn.html();
        const name = $('#js-name').val().trim(),
            alt = $('#js-alternate').val().trim();
        if (!name) { $('#err-name').text('Name is required'); return; }
        if (!alt) { $('#err-alt').text('Email/Mobile is required'); return; }
        $btn.html(loader).prop('disabled', true);

        try {
            const res = await axios.post(`${BASE_URL}/register-verify-user`, {
                username, type, signup: true, name, alternate: alt
            });
            showStep('step-otp');
            $("#js-otp").focus();
            const e = res.data?.message || {};
            if (e) $('#suc-otp').text(e);
            console.log(res);

        } catch (err) {
            const e = err.response?.data?.message || {};
            if (e) $('#err-alt').text(e);
        }finally {
            $btn.html(original).prop('disabled', false);
        }
    });

    // STEP 3 → verify OTP
    $('#btn-verify-otp').on('click', async function () {
        clearErrors();
                const selected = $('input[name="identity"]:checked').val();
        const $btn = $(this);
        const original = $btn.html();
        const code = $('#js-otp').val().trim();
        if (!/^\d{6}$/.test(code)) {
            $('#err-otp').text('Enter a valid 6-digit OTP');
            return;
        }
        const urlParams = new URLSearchParams(window.location.search);
        const cm = urlParams.get('cm') || '';
        const page_type = urlParams.get('page_type') || '';
        const dc = urlParams.get('dc') || '';
        const page_url = urlParams.get('page_url') || '';
        const remarks = urlParams.get('remarks') || '';
        const redirectTo = urlParams.get('redirect_to') || '';
        $btn.html(loader).prop('disabled', true);
        try {
                    await axios.post(`${BASE_URL}/verify-user`, {
                        username,
                        type,
                        code,
                        dtc,
                        selected,
                        cm,
                        page_type,
                        dc,
                        page_url,
                        remarks
                    });
                    $(".ixambee-loader").css("display", "block");
            showStep('step-done');
            $(window).trigger('logged-in');
            location.reload();
        } catch (err) {
            console.log(err);
            $('#err-otp').text(err.response?.data?.message || 'OTP failed');
        }finally {
            $btn.html(original).prop('disabled', false);
        }
    });

    // STEP 4 → close
    $('#btn-close').on('click', () => $modal.modal('hide'));
});
