$(document).ready(function(){
  // localStorage.clear();
$('#newTaskForm').hide();

console.log(localStorage);

if(localStorage && localStorage.getItem('listo')){
  var listo = JSON.parse(localStorage.getItem('listo'));
  localStorage.clear();
} else{
    listo = [];
    localStorage.clear();
};

console.log(listo);

var Task = function(task){
  this.task = task;
  this.id = 'new';
};

var reloadTheStuff = function(listo){
  if (listo){
    for (var i = 0; i < listo.length; i++) {
      listo[i].loadStuff();
    }
  }
};

var loadStuff = function(){
  $('#newList').append(
    '<a href= "#finish" class="" id= "item">'+
    '<li class="list-group-item">'+
    '<h3>' + task.task +'</h3>'+
    '<span class="arrow pull-right">'+
    '<i class="glyphicon glyphicon-arrow-right">' +
    '</span>'+
    '</li>' +
    '</a>'
  );

};

var addTask = function (task) {
  if (task){
    task = new Task(task);
    listo.push(task);

    $('#newItemInput').val('');

    $('#newList').append(
      '<a href= "#finish" class="" id= "item">'+
      '<li class="list-group-item">'+
      '<h3>' + task.task +'</h3>'+
      '<span class="arrow pull-right">'+
      '<i class="glyphicon glyphicon-arrow-right">' +
      '</span>'+
      '</li>' +
      '</a>'
    );
  }
  $('#newTaskForm').slideToggle('fast','linear');
};

var advanceTask = function (task) {
  var modified = task.innerText.trim().toLowerCase();
  for (var i = 0; i < listo.length; i++) {
    if (listo[i].task === modified) {
      if(listo[i].id === 'new'){
        listo[i].id = 'inProgress';
      } else if(listo[i].id === 'inProgress'){

        listo[i].id = 'archived';
      } else {
        listo.splice(i, 1);
      }
      break;
    }
  }
  task.remove();
};


$(window).load(listo, reloadTheStuff());


$('#saveNewItem').on('click', function(e){
  e.preventDefault();
  var task = $('#newItemInput').val().trim();
  addTask(task);
});

$('#add-todo').on('click', function () {
  $('#newTaskForm').fadeToggle('fast', 'linear');
  $('#newItemInput').focus();
});

$('#cancel').on('click', function (e) {
  e.preventDefault();
  $('#newTaskForm').fadeToggle('fast', 'linear');
});

$(document).on('click', '#item', function (e) {
  e.preventDefault();
  var task = this;
  advanceTask(task);
  this.id = "inProgress";
  $('#currentList').append(this.outerHTML);
});

$(document).on('click', '#inProgress', function (e) {
  e.preventDefault();
  var task = this;
  task.id = "archived";
  var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
  advanceTask(task);
  $('#archivedList').append(changeIcon);
});

$(document).on('click', '#archived', function (e) {
  e.preventDefault();
  var task = this;
  advanceTask(task);
});

$('#newItemInput').bind('keypress', function(e){
 var key = e.which;
 if(key === 13){
   $('#saveNewItem').trigger('click');
 }
});

console.log(listo);

$(window).unload(function () {
  localStorage.setItem('listo', JSON.stringify(listo));
});

console.log(localStorage);

});
