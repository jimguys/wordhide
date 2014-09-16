$(function() {

  $(document).on("click", "#toggle-source", function(e) {
    e.preventDefault();
    var toggleSource = $("#toggle-source");
    var source = $("#source");

    if(toggleSource.text() === "Hide Source") {
      source.hide();
      toggleSource.text("Show Source");
    } else {
      source.show();
      toggleSource.text("Hide Source");
    }
  });

  $(document).on("click", "#check", function(e) {
    e.preventDefault();
    var source = $("#source").val();
    var practice = $("#practice").val();
    var resultMessage = $("#result-message");

    resultMessage.removeClass();
    resultMessage.text("");

    if(source === practice) {
      resultMessage.text("You matched it exactly!");
      resultMessage.addClass("success");
    } else {
      resultMessage.text("You didn't match it exactly!");
      resultMessage.addClass("failure");
    }
  });

});
