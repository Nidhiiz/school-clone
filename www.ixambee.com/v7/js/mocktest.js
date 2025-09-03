function loadChapterTest() {
  if (
    $("#display_chapter_test").children().length > 0 &&
    !$("#display_chapter_test").find(".spinner_position").length
  ) {
    console.log("Chapter tests already loaded, skipping Axios call.");
    return;
  }

  console.log("ChapterTest Loading .............");
  $("#display_chapter_test").empty();
  $("#display_chapter_test").html('<div class="iframe_img_class spinner_position"><img src="https://www.ixambee.com/Spinner-0.7s-200px.gif" alt="loading"></div>');
  const postData = {
    exam_id: window.EXAM_ID,
    slug: window.MOCKTEST_SLUG,
    exam_name:  window.MT_EXAM_NAME,
    uri: "<?php echo $_SERVER['REQUEST_URI']; ?>"
  };

  axios.post(BASE_URL+"/get_cmts_users_ajax_paid_version_new7", postData, {
    headers: {
      "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
    }
  })
  .then(function (response) {
    $("#display_chapter_test").html(response.data);
  })
  .catch(function (error) {
    console.error("Error loading chapter test:", error);
    $("#display_chapter_test").html("<p>Error loading chapter test.</p>");
  });
}

function loadPYP() {
  if ($("#display_PYP").children().length > 0 && !$("#display_PYP").find(".spinner_position").length) {
    console.log("Previous year Papers already loaded, skipping Axios call.");
    return;
  }

  console.log('PYPs Loading............');
  $("#display_PYP").empty();
  //$("#display_PYP").html('<div class="iframe_img_class spinner_position"><img src="https://www.ixambee.com/Spinner-0.7s-200px.gif" alt="loading"></div>');

  const postData = {
    exam_id: window.EXAM_ID,
    slug: window.MOCKTEST_SLUG,
    exam_name:  window.MT_EXAM_NAME,
    uri: "<?php echo $_SERVER['REQUEST_URI']; ?>"
  };

  axios.post(BASE_URL+"/get_pyp_ajax7", postData, {
    headers: {
      "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
    }
  })
  .then(function (response) {
    $("#display_PYP").html(response.data);
  })
  .catch(function (error) {
    console.error("Error loading PYP:", error);
    $("#display_PYP").html("<p>Error loading PYP.</p>");
  });
}

function loadSubjectTest() {
  if ($("#display_Subject_test").children().length > 0 && !$("#display_Subject_test").find(".spinner_position").length) {
    console.log("Subject tests already loaded, skipping Axios call.");
    return;
  }

  console.log('Subject tests loading.................');
  $("#display_Subject_test").empty();
  $("#display_Subject_test").html('<div class="iframe_img_class spinner_position"><img src="https://www.ixambee.com/Spinner-0.7s-200px.gif" alt="loading"></div>');

  const postData = {
    exam_id: window.EXAM_ID,
    slug: window.MOCKTEST_SLUG,
    exam_name:  window.MT_EXAM_NAME,
    uri: "<?php echo $_SERVER['REQUEST_URI']; ?>"
  };

  axios.post(BASE_URL+"/get_subject_test_ajax7", postData, {
    headers: {
      "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
    }
  })
  .then(function (response) {
    $("#display_Subject_test").html(response.data);
  })
  .catch(function (error) {
    console.error("Error loading subject test:", error);
    $("#display_Subject_test").html("<p>Error loading subject test.</p>");
  });
}


function load_quiz() {
  const postData = {
    widget: 1,
    slug : window.MOCKTEST_SLUG
  };

  axios.post(BASE_URL+"/load_quiz7", postData, {
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

function load_ask_doubt() {
  const postData = {
    ask_doubt: 1
  };

  axios.post(BASE_URL+"/have_doubt_div", postData, {
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


$(function () {

  if(Number(window.USERID) > 0){

    function loadMockTest() {
      console.log('Mock tests loading.................');
      //$("#display_mock_test").empty();
      //$("#display_mock_test").html('<div class="iframe_img_class spinner_position"><img src="https://www.ixambee.com/Spinner-0.7s-200px.gif" alt="loading"></div>');

      const postData = {
        exam_id: window.EXAM_ID,
        slug: window.MOCKTEST_SLUG,
        exam_name: window.MT_EXAM_NAME,
        uri: "<?php echo $_SERVER['REQUEST_URI']; ?>"
      };

      axios.post(BASE_URL+"/get_fmts_users_ajax_paid_version_new7", postData, {
        headers: {
          "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
      })
      .then(function (response) {
        $("#display_mock_test").html(response.data);
      })
      .catch(function (error) {
        console.error("Axios error: ", error);
      });
    }

    loadMockTest();
  }

 });


