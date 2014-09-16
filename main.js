$(function() {

  updatePassagesList();

  $(document).on("click", "#add-passage-button", function(e) {
    e.preventDefault();
    $("#passages").hide();
    $("#practice-passage-button").hide();
    $("#add-passage-button").hide();
    $("#add-passage-form").show();
    $("#save-passage-button").show();
  });

  $(document).on("click", "#save-passage-button", function(e) {
    e.preventDefault();
    var passage = {};
    passage.reference = $("#new-passage-reference").val();
    passage.text = $("#new-passage-text").val();
    storePassage(passage);
    updatePassagesList();
    $("#add-passage-form").hide();
    $("#passages").show();
    $("#practice-passage-button").show();
    $("#add-passage-button").show();
  });

  $(document).on("click", "#practice-passage-button", function(e) {
    var reference = $("#passages").val();
    var passage = getPassageByReference(reference);
    practicePassage(passage);
  });

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

function updatePassagesList() {
  var passagesSelect = $("#passages");
  passagesSelect.empty();
  var option;
  var passages = getPassages();
  passages.forEach(function(passage) {
    option = '<option value="' + passage.reference + '">' + passage.reference + '</option>';
    passagesSelect.append(option);
  });
}

function practicePassage(passage) {
  $("#manage-passages").hide();
  $("#source").text(passage.text);
  $("#practice-form").show();
  $("#practice").focus();
}

function getPassageByReference(reference) {
  return _.find(getPassages(), function(passage) {
    return passage.reference === reference;
  });
}

function storePassage(passage) {
  var passages = JSON.parse(localStorage.getItem("passages")) || [];
  passages.push(passage);
  localStorage.setItem("passages", JSON.stringify(passages));
}

function getPassages() {
  return JSON.parse(localStorage.getItem("passages"));
}
